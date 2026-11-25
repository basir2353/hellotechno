# Hello Techno

Marketing site for **Hello Techno Solutions** — your business communication
partner for hospitality, clinics, restaurants, automobile dealerships and growing
businesses across the GCC. Reference and content modelled on heyservo.ai, rebuilt around
our own three-step story (Unified Communication → Fast, Connected Intelligence
→ Saved, Analyzed and Delivered).

## Run it

```sh
bun install
bun run dev        # http://localhost:5305 (Vite + the Worker in workerd)
bun run build      # dist/client (assets) + dist/creative_agency/index.js (Worker)
bun run typecheck
```

## Where things live

- **`src/data.ts`** — every string, plan and figure. `SITE` holds the contact
  details (`sales@hellotechnosolutions.com`, `+974 31637274`), `HERO`, `NAV`,
  `CHANNELS`, `INTEGRATIONS`, `CAPABILITIES`, `INDUSTRIES`, `RESULTS`, `PLANS`,
  `CREDIT_NOTES`, `FAQ`, `DEMO`.
- **Brand artwork:**
  - `public/images/hello-techno-logo.png` — the supplied logo, used by
    `Brand` in the header, footer and (via the icon link) the favicon. If the
    file is missing, `Brand` draws the vector lockup instead, so nothing breaks.
  - `src/components/Logo.tsx` — that vector fallback: the brain-mesh + signal +
    handset mark (`Mark`) and the `Hello Techno` wordmark (`Wordmark`,
    `BrandLockup`). `public/favicon.svg` is its alternate icon.
  - `src/components/Diagram.tsx` — the three-panel
    **AI-Powered Customer Communication** diagram as live HTML/SVG, with flowing
    connectors, animated gauge, live dots and role KPI cards.
- **`src/pages/Home.tsx`** — the single page: hero, channel marquee, diagram,
  platform capabilities, industry switcher, business case, pricing, FAQ and the
  demo/contact block.
- **`src/components/Ui.tsx`** — `Reveal`, `CountUp`, `PulseDot`, `Btn`,
  `SectionHead`, `Accordion`.
- **`src/components/ContactForm.tsx`** — demo request form with inline errors.
- **`src/styles.css`** — design tokens (blue → iris → teal), Sora + Inter Tight,
  motion keyframes (`float`, `drift`, `marquee`, `dash`, `wave`, `pulse-ring`).

## Worker

`src/worker/index.ts` (Hono) validates `POST /api/contact` with the rules in
`src/shared/validation.ts`, shared with the form, and returns `201` with a
reference (`HT-XXXXXX`), `422` with `fieldErrors` for bad fields, `400` for a
non-JSON body. `GET /api/health` returns `{ ok: true }`. To keep the requests,
connect that route to email, a CRM or a D1 table.

## Deploy with Freebuff Sites

`deploy.json` already points at the build output. After `bun run build`, deploy
with the `sites_deploy` tool from this directory.

Note: the Worker name in `wrangler.jsonc` is still `creative-agency`, so the
build outputs to `dist/creative-agency/`. Rename it there if you want the
output folder to match the brand.
