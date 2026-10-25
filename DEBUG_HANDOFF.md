# Marker layout investigation
Two bounded text-label placement variants failed hit testing (desktop feather, small-desktop Dutch acorn). Stop increasing displacement: long localized names cannot reliably fit between projected clues.
New hypothesis: fixed 44px interaction targets with 26px speech icons on narrow screens remove the source of overlap. Names remain available via accessible labels and dialogue; desktop visual name decoration is pointer-transparent. Clues remain exactly projected, without connectors.
Disproof: existing nine-profile Chinese/Dutch five-point hit test plus screenshots and mobile interactions. Status: pending.

Resolved: narrow landscape additionally required testing against the HUD rectangles, not just other markers. Added nearby side/below candidates and HUD avoidance for dialogue bubbles only. Nine viewports in both languages pass five-point target testing; iPhone X portrait/landscape screenshots inspected. Clues never displaced and no connector lines.
