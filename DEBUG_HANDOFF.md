# Marker layout investigation
Two bounded text-label placement variants failed hit testing (desktop feather, small-desktop Dutch acorn). Stop increasing displacement: long localized names cannot reliably fit between projected clues.
New hypothesis: fixed 44px interaction targets with 26px speech icons on narrow screens remove the source of overlap. Names remain available via accessible labels and dialogue; desktop visual name decoration is pointer-transparent. Clues remain exactly projected, without connectors.
Disproof: existing nine-profile Chinese/Dutch five-point hit test plus screenshots and mobile interactions. Status: pending.

Resolved: narrow landscape additionally required testing against the HUD rectangles, not just other markers. Added nearby side/below candidates and HUD avoidance for dialogue bubbles only. Nine viewports in both languages pass five-point target testing; iPhone X portrait/landscape screenshots inspected. Clues never displaced and no connector lines.

2026-10-26: Previous leader/marker issue superseded: clue DOM markers removed by user request. Full-case test resize issue resolved by waiting for the resize event before reading projected coordinates; full test passes. No open investigation.

Orchard: first old-save test seeded localStorage before reload and was overwritten by beforeunload autosave. Test now seeds once via addInitScript; production saves unchanged. Test passes. No open defect hypothesis.

2026-10-27 footprint readability: root cause was tiny low-contrast soles and toes on dark mud. Enlarged separated silhouettes, pale mud and vivid red heels verified visually at 375x812; direct-touch evidence and full orchard flow pass. No unresolved defect.

2026-10-27 studio: no repeated unresolved runtime defect. A syntax error introduced while replacing hard-coded clue counts was caught by node --check and fixed before runtime testing. Full third-case and both prior-case flows pass. No known blocking defect.
Final studio visual check found a straight escort path crossing the sink. Replaced with a fixed path behind the easels and down the clear center aisle; output/studio/escort.png visually verifies the corrected route, full studio flow and skill client passed again.
