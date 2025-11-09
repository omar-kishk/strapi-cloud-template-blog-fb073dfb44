# BAB Pharma — Cursor Project Rules

## Scope
- Next.js 14 + TypeScript + Tailwind + Shadcn/UI
- AR-first (RTL) + EN secondary
- 3D via @react-three/fiber, drei, three, 3Dmol.js

## Authoring Guidelines
- Prefer server components; client only for interactivity
- Tailwind-only styling; semantic HTML; a11y-first
- Early returns; shallow nesting; minimal try/catch
- Descriptive names; event handlers prefixed with `handle`
- Exported APIs typed explicitly; avoid `any`

## Brand & UX
- Use brand tokens from `tailwind.config.ts` (bab-purple, bab-turquoise, bab-charcoal, bab-whisper)
- Typography per Brand-Guidelines.pdf (Lora/Quicksand, Bukra/Somar)
- Follow `PHARMACEUTICAL_3D_BACKGROUND.md` for motion/perf/accessibility

## Docs Alignment
- `docs/requirements.md`
- `docs/architecture.md`
- `docs/site-map.md`
- `docs/content-strategy.md`
- `docs/Implementation-Roadmap.md`

## Definition of Done
- Lint/type clean; a11y checks; Core Web Vitals unaffected
- Arabic mirrored, English verified
- Docs updated if behavior/contracts change

## Testing
- Unit/integration for logic/components; E2E for search → detail → inquiry

## Security
- Validate with Zod; never leak secrets; enforce RBAC server-side


