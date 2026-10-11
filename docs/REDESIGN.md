# Portfolio redesign — implementation plan

## Direction

An original, Soulsborne-inspired field journal: abyssal backgrounds, tarnished gold,
engraved serif headings, precise technical annotations, a coiled sword and pixel crest.
No game assets, manufactured performance figures, or automated audio playback.

## Work breakdown

1. Inspect existing content and reference code; preserve the six original project dossiers.
2. Extend Tailwind tokens, self-host licensed fonts, add original SVG identity and favicon.
3. Replace the presentation layer; retain skills, contact details, education and projects.
4. Add the KJSIM prequalifier achievement, evidence excerpt, team credit, source-linked
   architecture and an interactive pipeline demonstration with explicitly illustrative data.
5. Add reduced-motion-aware GSAP, optional Web Audio ambience, keyboard-safe navigation,
   native project disclosures and clipboard feedback.
6. Validate production build, changed-file lint, browser interactions, responsive layouts,
   reduced motion and automated accessibility checks.

## Evidence and editorial boundaries

- The owner clarified **Runner-Up, KJSIM Hackathon 2026, Smart India Hackathon
  Pre-qualifiers**, September 23, 2026. Do not claim a national championship or world first.
- The supplied LinkedIn excerpt is owner-provided. The short URL
  https://lnkd.in/p/dnCh8ZQR is retained; network policy blocked resolution, so no fabricated
  LinkedIn activity ID or iframe is used.
- Hackathon source inspected at `akkisavi/Hackathon`, commit
  `db4785bdfa17204cf9f7d1f237e8799456923b19`. Code confirms NASA FIRMS, DBSCAN, PostGIS,
  LightGBM, Isolation Forest, FastAPI, React/MapLibre, and Gemini. The documented 93.8%
  validation is **96 reference-labelable sources**, not accuracy across all 4,984 sources.
- No public hackathon deployment URL was provided. The local interactive walkthrough is
  illustrative; it is not a live satellite feed or inference service. Source runbook linked.
- Arbitrage source inspected at `sahilas-gif/Arbitrage`, commit
  `c28a673690d0ac92eb8999d6e981ac753a83ef9f`. Present as a local research engine,
  not a deployed trading service or a demonstrated financial return.
- Existing portfolio is the source for AqiLizer, Zenhospitality, education and experience.
  External production availability could not be checked through this network.
- The uploaded award photo can be viewed in chat but is not exposed as a downloadable
  workspace asset. Do not substitute generated award imagery. Add the authentic file later
  if supplied as a workspace-accessible attachment.
- Direct Figma access was unavailable. The owner supplied a screenshot of the retro
  gaming portfolio (`otNeYYnhPQpjxPHu51DILO`, node `7:13136`). Its chapter progression,
  character panels and level-selection ideas informed the accessible ChapterMap and HUD.
  No purple palette, gated content, artificial loaders or third-party assets were copied.

## Non-destructive scope

`src/data/originalProjects.ts` preserves all six original case studies. Other projects stay
available in the archive. Existing image assets, dependencies, and lockfile are retained.
The presentation and App integration are replaced in version control; no backend required.

## Delivered files

- `src/App.tsx`: page composition, motion preference, global chapter selection.
- `src/sections/`: Hero, Championship, Skills, Projects, About, Experience, Education,
  Contact and Navigation. All existing sections remain represented.
- `src/components/portfolio/`: original bonfire illustration, ember canvas, opt-in
  ambience, chapter selector, thermal schematic, shared section headings.
- `src/hooks/usePortfolioMotion.ts`: GSAP timelines, scoped ScrollTriggers, cleanup,
  live OS reduced-motion support and the manual pause control. CSS contains the selector
  hooks and visible resting states; JavaScript timelines do not belong in a stylesheet.
- `src/data/conquest.ts`: achievement wording, team, LinkedIn evidence and source links.
  Add a verified public URL to `liveDemo` to enable the platform link. Until then the
  source runbook and explicitly illustrative local walkthrough are available.
- `src/data/originalProjects.ts`: complete original six-project content archive.
- `src/index.css` and `tailwind.config.js`: responsive design, gold/ash/rot/spectral
  tokens, typography, motion fallbacks, focus styles and interactive states.
- `public/crest.svg`: original pixel-art coiled-sword, great-rune and laurel mark;
  used in the header, contact section, chapter selector and favicon.
- `public/fonts/`: three self-hosted Latin variable WOFF2 fonts with OFL licenses.
  There are no runtime Google Fonts or Figma requests and no Figma credentials in the app.

## Run and deploy

Use the existing checkout; no new workspace or dependencies are required.

```sh
cd /workspace/portfolio_website
# Only if dependencies need reinstalling; preserve the lockfile and integrity checks:
npm ci --cache /workspace/.npm-cache --registry=https://registry.npmjs.org --replace-registry-host=always --no-audit --no-fund
npm run dev -- --host 0.0.0.0 --port 3000 --strictPort
```

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

Deploy the generated `dist/` folder to a static host. Fonts and illustrations are local;
no API keys or running backend are needed. Keep HTTPS enabled for the Clipboard API;
manual selection is provided when permission is denied. No deployment was published.
The existing relative Vite base is preserved. The CSP retains the existing inline/eval
allowances and adds development WebSocket connectivity; production hosts may supply a
stricter response-header CSP tailored to their deployment.

## Validation

- TypeScript and production build: passed (Node 24.19.0, npm 11.9.0).
- ESLint for every changed/new TS/TSX file: passed.
- Full repository lint: the same eight pre-existing errors remain in unused UI templates
  (seven Fast Refresh export warnings configured as errors, one `Math.random` render
  purity error in `sidebar.tsx`). Rules and unrelated UI templates were not changed.
- Chromium development and production pages: no uncaught errors or failed local assets;
  all eight main content areas, all images and three fonts render.
- Viewports: 320, 390, 768, 1024, 1440 and 1920px; no horizontal overflow, including with
  project dossiers and the original-project archive expanded.
- Verified pipeline stage switching/restart, project disclosures, archive preservation,
  evidence excerpt/team, sound on/off, clipboard success and denied-permission fallback,
  mobile menu/Escape, chapter map/Escape and current-section tracking.
- OS reduced motion: visible content, no GSAP reveal transforms, no flame animation,
  automatic scrolling and no active ember loop. Manual motion pause also works.
- axe-core 4.14.0 WCAG 2/2.1 A/AA checks: no detected violations on the expanded desktop
  page or the production mobile page with chapter navigation open. Automated checks are
  supplemented by keyboard and visual review; they do not certify every assistive device.
- External links preserve supplied destinations; restricted egress prevents verifying
  the current availability of LinkedIn and external project deployments.

## Asset follow-up

The award photo supplied in chat has no downloadable file handle in this session, so it
was not fabricated or replaced with generated imagery. The owner-provided post excerpt,
exact award and linked original evidence are already in the achievement section. To add
that photo later, save the authentic file in `public/` and insert a descriptive image and
caption in the evidence panel; keep the original image and credit intact.
