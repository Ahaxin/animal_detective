# CODEX_HANDOFF

## Project Goal
Offline animal detective game in Chinese and Dutch, European vintage comic art. Only case 1 is in scope. User correction: one complete game screen; all UI inside the scene, no webpage layout, permanent notebook sidebar or document scrolling. Apply guangyuspace/codex-gamestudio-skill.

## Current Phase
- Phase: 3D playable slice / mobile playtest
- Status: 3D slice validated; existing Site update in progress
- Roles used: UI/UX, gameplay engineering, QA. One agent; no background role simulation.

## Latest Work
- Installed and read GameStudio skill and its UI/UX, engineering, minimal workflow and handoff references.
- Replaced page header/sidebar/footer with a full-viewport game stage, in-scene resource HUD, objective, detective badge and bottom action dock.
- Notebook is an on-demand open book; backpack and accusation are in-scene overlays. Reading pauses movement. Existing saves and rules are preserved.
- Title screen is integrated into the garden rather than a webpage-style card.
- Added portrait garden variant and aspect-preserving camera. Short landscape screens use a left-side action dock; small portrait screens hide duplicate detective badge and tiny instruction line.
- Added mobile safe-area handling, standalone manifest/home-screen icons and service-worker shell caching. Current v1 save format remains unchanged.
- Runtime images optimized from 11,376,328 to 1,997,584 bytes (82% reduction), original PNG art retained.

## Important Modified Files
- index.html, game-screen.css, game.js, mobile.js, sw.js, manifest.webmanifest
- assets/*.webp, assets/icon-192.png, assets/icon-512.png, assets/garden-portrait.png
- scripts/build-mobile.cjs
- tests/game.test.mjs, tests/screen-layout.test.mjs, tests/offline.test.mjs, tests/mobile-release.test.mjs
- UI_AUDIT.md, README.md, assets/ART-NOTES.md, assets/garden-scene.json
- style.css is retained from the prior design but no longer loaded.

## Verification
- `node --check game.js`: passed.
- Full first-case test passed, including notebook/backpack, paused movement, failure/retry, rewards, fox, hints, languages and reload.
- Six viewport profiles (1440x900, 960x600, 844x390, 720x1280, 1080x2400, 390x844) passed both languages, 44px touch-hit areas, no page scrolling and v1 save compatibility. Evidence: output/single-screen/.
- Mobile touch + service-worker offline reload passed, including saved evidence, dialogue and notebook; no console errors. Evidence: output/mobile-release/.
- Native Sites publish result: succeeded. URL: https://animal-detective-sunshine-garden.bradin.chatgpt.site

## Published Site / Future Updates
- GitHub source destination: https://github.com/Ahaxin/animal_detective , branch main. The root project is the source checkout; publish/ is an ignored, separate Sites deployment checkout.
- Reuse project_id: appgprj_6ade2c95d3dc8191b525e4b7c78654f0. Do NOT create a duplicate Site.
- Canonical hosting manifest and source checkout: publish/animal-detective/.openai/hosting.json and publish/animal-detective/.
- Audience: public, confirmed by get_site on 2026-10-25; preserve public audience.
- Published source commit: f1f0ecd76ef8f7fc73149dae8871f11613eb03a6.
- Deployment: appgdep_6ade2e0fa2608191adbd4e6bed53d4b2; saved version: appgprj_6ade2c95d3dc8191b525e4b7c78654f0~appgver_ec491bd711e0819193b165d19698b8c6.
- Edit root source, bump sw.js cache version when runtime assets change, run scripts/build-mobile.cjs with bundled sharp available through NODE_PATH, validate, then use Sites source workflow for this checkout. Refresh source credentials through connector; never save tokens.

## Known Risks / Untested Areas
- No physical phone or native package verification. Browser viewport tests only.
- Original 2D art retained for portraits/menu; gameplay now uses procedural 3D models. No new cases or house system.
- Physical phone, real notches/gesture bars, thermal/battery and native app packaging are not verified. No claim of store release.
- Device/origin-local saves: localhost, file:// and published URL saves are separate, as are different phones/browsers.
- DEBUG_HANDOFF.md was not created: no repeated unresolved defect hypothesis remained.

## Next Safest Task
User mobile playtest on the published URL. Address concrete touch/readability/safe-area feedback before adding cases or more systems.

## Latest 3D Slice — 2026-10-25
- world3d.js owns Three.js scene, original procedural models, shadows, projection, ray/ground picking, circular collision and grid pathfinding. world3d.bundle.js is the offline IIFE distribution; build via npm run build:3d. MIT license retained.
- game.js retains case/economy/save v1; player normalized values now map onto 24m world X/Z, invalid or obstructed old positions safely return to entrance. Evidence/resources remain intact.
- Keyboard + pointer-captured touch joystick, animated legs/facing; UI pauses movement. Hotspots resolve label overlap with connector lines. Camera is fixed elevated perspective, not orbit/first-person.
- Mobile geometry batched: measured 77 draw calls, ~20,672 triangles in headless browser (not device FPS). Pixel ratio capped at 1.5.
- PASSED: full case, false accusations/retry, rewards, fox, both languages; six viewport profiles and >=44px unobstructed targets; real CDP touch joystick, collision/bounds/pause/position persistence; file:// zero-network and HTTP cached offline play; mandated skill client. Screenshots visually inspected in output/3d and output/single-screen/layout.
- sw cache: animal-detective-3d-v2. Sites source 0454e9beb48af898afcc036ee31d1fdb326390c3. Archive output/3d/animal-detective-3d.tar.gz.
- Limitations: WebGL2 required; no physical phone FPS/thermal testing, camera rotation, skeletal animation, or high-detail character models. UI audit appended. No repeated unresolved root cause; DEBUG_HANDOFF.md not needed.

Deployment succeeded: appgdep_6ade3c07deec8191801bc12fc21ebb2a; version appgprj_6ade2c95d3dc8191b525e4b7c78654f0~appgver_564de2a5c9e881918f9257d1d0a0e19d; public URL unchanged. 3D update is live.
