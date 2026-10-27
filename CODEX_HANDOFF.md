# CODEX_HANDOFF

## Project Goal
Offline animal detective game in Chinese and Dutch, European vintage comic art. Cases 1 and 2 are implemented. User correction: one complete game screen; all UI inside the scene, no webpage layout, permanent notebook sidebar or document scrolling. Apply guangyuspace/codex-gamestudio-skill.

## Current Phase
- Phase: 3D playable slice / mobile playtest
- Status: two-case playable build validated; orchard release being packaged
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

## iPhone X marker polish — 2026-10-25
- User physical iPhone X feedback: Uil/Praten labels obscure scene, star leader lines unclear.
- game.js/game-screen.css: phone <=900px shows 26px speech bubbles; desktop short names without Praten. Both retain 44px touch buttons and accessible names. 28px magnifier/check icons remain on exact clue projections; no leader lines. Dialogue bubbles avoid clues and HUD using nearby positions.
- sw.js cache bumped to animal-detective-3d-v3.
- Nine layout profiles passed both languages, including 375x812, 812x375 and 375x635 browser area; screenshots visually inspected. Mobile offline/touch flow and skill action client passed. Actual Safari device retest remains with user. DEBUG_HANDOFF.md records resolved collision investigation.

Marker polish deployed successfully: Site version 3, source 5fbeda1f2a6ee4bc1f9000746cf19d0ab5d4e70a, deployment appgdep_6ade3fdde0d88191b3ce59e62ad3837f. URL and public audience unchanged.

## Immersive exploration + music — 2026-10-26
- Removed clue marker DOM entirely. Canvas rays hit small object pick volumes at acorn/feather/tunnel or animal models; empty ground only navigates. Existing pathfinding, collision, save and evidence flow retained.
- Accusation opens immediately from dock/notebook; only discovered evidence is offered. Can submit without evidence: false suspect keeps 2-star retry penalty; correct suspect still needs supporting evidence to close case. Full testimony collection no longer gates accusation.
- Play HUD hides title/objective, compacts currencies/dock, keeps music/fullscreen controls visible on mobile. Larger portrait overhead perspective and continuous ground fill viewport. Fullscreen feature detected; unsupported browsers get localized Safari home-screen instructions.
- Original Web Audio 32-note melody with chord accompaniment, starts on Start user gesture; mute saved in v1 optional music field, visibility suspend/resume. No audio downloads or external licenses needed.
- PASSED exploration.test.mjs (real touch picking, blank lawn, early accusation, unrevealed evidence hidden, music/mute persistence); full case including retry/reward and both languages; nine-profile layout; mobile service-worker offline; direct file zero-network; skill client. Screenshots inspected. Browser resize test now waits for resize handler before reading projected object coordinates.
- sw cache animal-detective-3d-v4. Pending physical iPhone/Safari fullscreen and audio volume comfort checks.

2026-10-26 publication succeeded: Site version 4, source e1f9d391797493d410a20f56270f27e3ab69b433, deployment appgdep_6adfa159fd448191a266b40e14366f0c. Public audience and URL unchanged.

## Orchard release — 2026-10-26
- New orchard.js: Chinese/Dutch second-case clues, suspects, dialogue and paired-evidence confrontation. New procedural orchard in world3d.js: apple trees, central broken branch/banana peel, painted bare footprints, eastern paint pot, stream, honey bear, booted raccoon and monkey. Returned golden apple travels to detective; measuring tape and red soles visible at ending. Original SVG portraits in assets/.
- game.js retains top-level v1 active-case fields and adds caseId, cases snapshots, completed, tapeOwned and per-case tapeRented. Shared resources/characters never overwritten when switching. Old solved saves mark garden completed. Case selection and first-case Next lead to orchard; both cases available without a hard unlock gate.
- Bag / Tas red ! until tape available. Buy 1 heart permanent or rent 5 coins; balance and duplicate guards; rental persists reload, switching and wrong-accusation retries, clears on explicit replay. No funds: disabled offers and route back to case archive. No real money.
- Orchard accusation multi-selects exactly footprint+branch; one/wrong pair gives feedback without charge. Incorrect suspect retains existing 2-star capped penalty; evidence reset only for active case. Rewards garden 3/1/10, orchard 3/1/12 once per completed round; explicit replay earns again as before.
- First-case magnifier, early accusation, no clue overlays, mobile joystick/music/fullscreen remain. Toasts clear on modal open to prevent blocking tool/combination controls.
- Passed: full orchard flow incl rental/permanent, old save, no-funds escape, case switching, wrong evidence/retry, both locales and reward-once reload; original full case and nine-layout matrix; orchard nine profiles+two locales and service-worker offline clues/portraits/dialogue. Skill input client completed. Screenshots in output/orchard inspected. Physical iPhone remains user playtest.
- Runtime additions orchard.js, assets/bear.svg/raccoon.svg/monkey.svg included by build-mobile and SW cache animal-detective-orchard-v5. world3d.bundle.js rebuilt.
- Narrative fix: monkey covers last night as well as today; paint from entry bucket remains an alternative, not a proven roof match. Weight, footwear and food preference are statements, not independent proof of innocence.
- Known limits: stylized procedural models and simple ending animation; no third case or house-building implementation. New tool is auto-equipped on acquisition; permanent ownership applies on future replays.

Orchard release published successfully: Site version 5, source 4da387ce6bbe31fa9cd12b89006bffae18a78d3b, deployment appgdep_6adfa80b706081918c527e45492ee4ba. Same public URL.

## Footprint readability — 2026-10-27
- Maintenance: enlarged orchard mud patch and three separated bare footprints; dark soles/five toes, brighter red heels. Flattened pick volume follows the visible patch. No HUD additions or save/economy changes.
- Passed orchard full mobile flow (375x812), real-touch clue collection, equipment, retry, paired evidence, rewards, reload and locales; required skill client passed. Screenshots inspected in output/orchard/01-phone-garden.png and output/footprints/skill-client/shot-0.png.
- Cache bumped to orchard-v6. Physical iPhone Safari remains user validation; previous Site version 5 is rollback point.
Published version 6: source 5b445f1052091bb571689bdd755c3f72a62694fc, deployment appgdep_6ae0e8c58d5c8191a8bfa879bc53df7f succeeded; public URL unchanged.

## Studio release — 2026-10-27
- Added third case (studio.js), original ice studio (studio-scene.js + world3d.js), three SVG suspects, portrait comparison/palette close-ups. No tool gate; two physical clues, three statements. Any painting collects the same portrait group.
- User approved return-visit timeline: skunk really posed at 15:00; parrot returned later, killed the master and repainted his own feathers. No forged skunk portrait. CASE03_STUDIO.md is the current design; studio.js owns full bilingual dialogue.
- Evidence options now support a discovered testimony card: palette + parrot-habit required. No unrevealed statement leak. Skunk false accusation has bespoke dialogue, hidden detective, immediate saved investigation reset and existing capped 2-star penalty. Standard rabbit false accusation remains.
- Rewards 3/1/15 once per round. Return to case archive; orchard Next enters studio. Shared v1 resources, permanent tools and per-case progress retained. Cache animal-detective-studio-v7.
- Passed: third-case complete real-touch flow, no-tool/early accusation, evidence gate, skunk failure/reload, paired evidence, reward-once, Dutch/offline; nine viewports x two locales; original garden and orchard full regression. Screenshots in output/studio/ visually inspected. Required skill input client also run.
- Risks: actual iPhone Safari/FPS not measured. Police escort is simple programmatic motion; victim is non-graphic. House-building remains unavailable. Next safest task: user physical-phone playtest.
Studio release published: version 7, source b9d8b231f80721f541ff057b607fbe61f4caed55, deployment appgdep_6ae0f0cc699481919defd5dbb982eb1d succeeded. Public URL unchanged. Version 6 remains the rollback point.
