import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { CODE_GENERATION_SYSTEM_PROMPT } from '@/lib/prompts/system'
import { buildRefinementPrompt } from '@/lib/prompts/codegen'
import { GeneratedFile } from '@/lib/types'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const { files, userRequest }: { files: GeneratedFile[]; userRequest: string } =
    await req.json()

  const filesMap: Record<string, string> = {}
  for (const file of files) {
    filesMap[file.path] = file.content
  }

  const prompt = buildRefinementPrompt(filesMap, userRequest)
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const anthropicStream = await anthropic.messages.create({
          model: 'claude-sonnet-4-6',
          max_tokens: 16000,
          system: CODE_GENERATION_SYSTEM_PROMPT,
          messages: [{ role: 'user', content: prompt }],
          stream: true,
        })

        for await (const event of anthropicStream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            const data = JSON.stringify({ type: 'text', content: event.delta.text })
            controller.enqueue(encoder.encode(`data: ${data}\n\n`))
          }
        }

        controller.enqueue(encoder.encode('data: {"type":"done"}\n\n'))
        controller.close()
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error'
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: 'error', error: msg })}\n\n`)
        )
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
