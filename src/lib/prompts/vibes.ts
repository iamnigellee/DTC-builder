/**
 * Complete CSS variable blocks per Vibe.
 * Injected into CODE_GENERATION_SYSTEM_PROMPT so the AI produces
 * exact, consistent globals.css values instead of guessing.
 */

export const VIBE_CSS: Record<string, string> = {
  A: `/* Vibe A — Dark Luxury */
:root {
  --bg: #050508;
  --bg-secondary: #0d0d14;
  --bg-card: rgba(255, 255, 255, 0.03);
  --primary: #6d28d9;
  --secondary: #4f46e5;
  --accent: #f59e0b;
  --text: #f1f5f9;
  --text-muted: #94a3b8;
  --text-subtle: #475569;
  --border: rgba(255, 255, 255, 0.07);
  --border-strong: rgba(255, 255, 255, 0.12);
  --shadow-primary: rgba(109, 40, 217, 0.35);
}`,

  B: `/* Vibe B — Clean Pro */
:root {
  --bg: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-card: #ffffff;
  --primary: #2563eb;
  --secondary: #7c3aed;
  --accent: #0ea5e9;
  --text: #0f172a;
  --text-muted: #475569;
  --text-subtle: #94a3b8;
  --border: #e2e8f0;
  --border-strong: #cbd5e1;
  --shadow-primary: rgba(37, 99, 235, 0.15);
}`,

  C: `/* Vibe C — Bold Expressive */
:root {
  --bg: #09090b;
  --bg-secondary: #111113;
  --bg-card: rgba(255, 255, 255, 0.04);
  --primary: #ff3d00;
  --secondary: #00ff87;
  --accent: #ffbe0b;
  --text: #fafafa;
  --text-muted: #a1a1aa;
  --text-subtle: #52525b;
  --border: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.15);
  --shadow-primary: rgba(255, 61, 0, 0.4);
}`,

  D: `/* Vibe D — Warm Organic */
:root {
  --bg: #faf7f2;
  --bg-secondary: #f5f0e8;
  --bg-card: #ffffff;
  --primary: #d97706;
  --secondary: #15803d;
  --accent: #9f1239;
  --text: #1c1310;
  --text-muted: #6b5744;
  --text-subtle: #a8927a;
  --border: #e8ddd0;
  --border-strong: #d4c4b0;
  --shadow-primary: rgba(217, 119, 6, 0.2);
}`,

  E: `/* Vibe E — Ultra Minimal */
:root {
  --bg: #ffffff;
  --bg-secondary: #fafafa;
  --bg-card: #f4f4f5;
  --primary: #18181b;
  --secondary: #3f3f46;
  --accent: #18181b;
  --text: #09090b;
  --text-muted: #71717a;
  --text-subtle: #a1a1aa;
  --border: #f4f4f5;
  --border-strong: #e4e4e7;
  --shadow-primary: rgba(0, 0, 0, 0.08);
}`,

  F: `/* Vibe F — Warm Ivory Luxury */
:root {
  --bg: #faf8f4;
  --bg-secondary: #f5f0e8;
  --bg-card: #ffffff;
  --primary: #b08d57;
  --secondary: #8b6f4e;
  --accent: #c9a882;
  --text: #2c2418;
  --text-muted: #6b5744;
  --text-subtle: #a8927a;
  --border: rgba(176, 141, 87, 0.2);
  --border-strong: rgba(176, 141, 87, 0.35);
  --shadow-primary: rgba(176, 141, 87, 0.2);
}`,
}

/** Shared baseline rules that go in every globals.css */
export const GLOBALS_BASELINE = `
* { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans, system-ui, -apple-system, sans-serif);
  -webkit-font-smoothing: antialiased;
}

::selection { background: var(--primary); color: #fff; }

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 99px; }

/* Reduced motion baseline */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Shimmer keyframe for skeleton loading */
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.animate-shimmer {
  background: linear-gradient(90deg, var(--bg-card) 25%, var(--border) 50%, var(--bg-card) 75%);
  background-size: 200% auto;
  animation: shimmer 1.5s linear infinite;
}
`

export function getVibeCss(vibe: string | undefined): string {
  const key = (vibe || 'A').toUpperCase()
  return (VIBE_CSS[key] || VIBE_CSS['A']) + '\n' + GLOBALS_BASELINE
}
