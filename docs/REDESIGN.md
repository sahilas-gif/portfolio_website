# Tarnished Architect portfolio

React / Vite / TypeScript, Tailwind and GSAP. Static output; no runtime credentials or backend required.

## Development

Use the existing checkout, without creating a worktree:

```sh
cd /workspace/portfolio_website
npm ci --cache /workspace/.npm-cache --registry=https://registry.npmjs.org --replace-registry-host=always --no-audit --no-fund
npm run dev -- --host 0.0.0.0 --port 3000 --strictPort
npm run build
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

The registry override preserves lockfile integrity verification while avoiding the old mirror URL. Build validated with Node 24.19 and npm 11.9. Relative asset URLs support root and GitHub Pages subpath deployment.

## Implementation

- `src/sections/Hero.tsx`: supplied suit portrait with an oversized Greatsword edit, gold vignette, character HUD, ember canvas and explicit motion / audio controls. Original `public/IMG_2401.jpg` is preserved untouched.
- `src/sections/Projects.tsx`: four selected projects and three visible archive projects, full images and expandable engineering dossiers.
- `src/sections/Championship.tsx`: authentic team award photograph and dashboard gallery, pipeline walkthrough, source evidence and team credit.
- `src/sections/Experience.tsx`: illustrated bonfire scene, Zenhospitality, Zeu and SavvyDigitech.
- `src/components/portfolio/ImageModal.tsx`: native modal dialog with focus containment/restoration, 1–4× zoom, bounded pan, wheel/pinch, keyboard controls, original download, Escape and touch swipe dismissal. At 100%, horizontal swipes browse; downward swipes dismiss. At larger scales, gestures pan.
- `ProjectGallery.tsx`: reusable image trigger and visible thumbnails. Images use contain sizing without crop or recoloring.
- `Timeline.tsx`: keyboard-operable milestone tabs, December 2025 through September 2026; factual project durations remain explicit.
- `CustomCursor.tsx`: decorative sword reticle and bounded canvas ember pool. Native cursor remains available. Touch, reduced motion, manual pause and hidden-tab cleanup are respected.
- `src/hooks/usePortfolioMotion.ts`: scoped GSAP reveals, fine-pointer parallax, card border shimmers, cleanup and reduced motion. `src/index.css` contains selector hooks and resting states; timelines are TypeScript.
- `tailwind.config.js`: gold, abyss, ash, crimson, spectral, typography and grace effect tokens. Self-hosted fonts retain their OFL licenses.

## Evidence and imagery

The event was **Runner-Up, KJSIM Hackathon 2026, Smart India Hackathon Pre-qualifiers**, on **23 September 2026**. It was not a national championship or world first. The timeline extends into September to preserve that date.

Hackathon source inspected at `akkisavi/Hackathon`, commit `db4785bdfa17204cf9f7d1f237e8799456923b19`. The reported 93.8% validation is for 96 reference-labelable sources, not all 4,984 sources. No public demo was supplied; the interactive pipeline is explicitly illustrative and the repository runbook is linked.

`public/projects/kjsim-award-{1,2,3,4}.jpg` are the authentic public images downloaded from Sahil's LinkedIn post:
https://www.linkedin.com/posts/sahil-singh-88aab7395_kjsim-sih2026-smartindiahackathon-activity-7509290257385881600-7AVk

Image 2 is the exact team award photograph, featured visibly in the conquest section and included with Give Teas. The available LinkedIn renditions are 800px wide; existing project screenshots retain their native higher resolutions. No screenshots were fabricated or upscaled. `src/data/projectMedia.ts` stores image dimensions, captions and alt text.

`public/art/portrait-greatsword.webp` is a fantasy edit of the supplied portrait, approved by the owner. `public/art/bonfire-rest.webp` is generated fantasy artwork, described as an illustration in alt text. These are decorative, not evidence of the hackathon. Original source images and documentary screenshots remain intact.

## Branches and rollback

- `backup/pre-architect-overhaul-20261011`: complete pre-overhaul checkpoint, commit `1a05ac8`.
- `feature/tarnished-architect-gallery`: source changes for review, leaving `main` intact.
- `deploy/tarnished-architect`: static deployment output.

To revert the design, check out the backup branch, run the production build, and publish its `dist/` output to the static deployment branch. Keep `.nojekyll` at the deployment root. Never include environment files in deployment output.

## Validation

Production build and lint for the changed application files pass. Browser verification covers all project images, seven cards, keyboard zoom and pan, gallery navigation, focus restoration, Escape, timeline keyboard operation and widths 320 / 390 / 768 / 1024 / 1440 / 1920 without page overflow. axe-core WCAG 2/2.1 A/AA scans of the page and open modal report no violations; automated checks do not certify all assistive technologies.

Full repository lint has eight pre-existing errors in unused UI template files (Fast Refresh exports and a sidebar render-purity error). No rules have been disabled and dependencies are unchanged.
