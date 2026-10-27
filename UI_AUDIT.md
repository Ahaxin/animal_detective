# 单一游戏主画面验收

采用 [GameStudio skill](https://github.com/guangyuspace/codex-gamestudio-skill) 的 UI/UX、工程与最小改动流程。阶段：第一关垂直切片的界面打磨。角色视角：UI/UX、游戏工程、QA；未启动额外代理。

## 问题与处理

- 原版 P1：网页式页头、常驻手记侧栏和页脚分散注意力；手机需要滚动整页。现统一为铺满窗口的游戏舞台，手记、背包、菜单、证物、指认、对话和结算都属于同一舞台。
- 原版 P1：横向背景在竖屏下拉长。新增独立竖版花园，横竖屏均通过等比覆盖相机显示；人物、物证标记和热点独立渲染。
- 实测 P1：手机荷兰语标题挤压任务提示。调整标题字距与信息位置，保留正文可读字号。
- 实测 P1：矮横屏底部工具栏遮住场景下方。改为左侧紧凑竖排工具栏，保留同一游戏主画面。
- 待验证 P2：物理手机上的安全区、六英寸实际阅读效果、屏幕亮度与辅助功能体验。当前只有浏览器尺寸和触控配置验证。
- 后续 P3：可选择增强小型资源值、工具计数的对比。它们属于次级信息；正文、对话和主要操作采用独立浅色底板。
- 后续 P4：行走和结尾动画可进一步丰富；本次保持原剧情与既有动画范围。

## 信息层级

★★★★★ 花园中的侦探、动物与闪光线索

★★★★☆ 当前目标、对话和必要操作

★★☆☆☆ 手记、背包与指认入口

★☆☆☆☆ 资源值及设置

手记与背包按需显示；台词框展开时收起工具栏。没有新增常驻详情侧栏或网页内容区。

## 可读性、交互与首次体验

- 正文与对话使用 16–18px 起的字号，场景、台词和卡片均采用深墨色文字及浅纸色背景。资源计数与辅助说明较小，未声称完成物理屏幕对比度测量。
- 高频工具与场景热点至少 44 CSS px，逐个检查中心及四个内侧点可点击；中文和荷兰语均通过。
- ✔ 进入游戏后知道目标：寻找失踪宝石，顶部显示当前调查步骤。
- ✔ 知道如何操作：点击移动、交谈与调查闪光点；工具栏提供手记、背包、指认与提示。
- ✔ 知道进展：线索和证词计数更新，收集后有场景内反馈。
- ✔ 能恢复：自动存档、关闭手记与背包、误判重开且保留永久道具。
- △ 前 30 秒继续意愿：启发式评分 4/5，目标与反馈清晰；并非实际留存数据。
- Google Play UI 投诉风险估计：20%，依据是尚无物理设备验证及部分辅助信息字号偏小；不是商店评分预测，本版也未提交商店。

## 验证证据

- `node --check game.js`：通过。
- `node tests/game.test.mjs`：完整第一关、两种指认失败、奖励、重试、放大镜、麦克狐、付费提示、手记、背包、语言和存档通过。
- `node tests/screen-layout.test.mjs`：1440×900、960×600、844×390、720×1280、1080×2400、390×844，均无页面横向或纵向滚动；保留旧 v1 存档；两种语言的触控区域检查通过。
- `node tests/offline.test.mjs`：直接打开本地 HTML 的交互与存档续玩通过，零 HTTP(S) 请求。
- 截图和 JSON 结果：`output/single-screen/`；尺寸矩阵截图：`output/single-screen/layout/`。
- 未测试：物理手机、安全区真实开孔、长时间热/电池表现、原生安装包与商店发布。

==========

UI Score

Readable
8/10

UX
8/10

Accessibility
7/10

Commercial
8/10（离线免费切片的界面可信度；不代表计费或商店验证）

Retention
7/10（启发式评估，未测实际留存）

Google Play Risk
3/10（10 为最高风险）

==========

Priority

P0
已验证范围内未发现阻断阅读、交互或破案的问题。

P1
单屏、遮挡、背景比例和荷兰语排版问题已修复并回归。

P2
后续做物理设备、实际安全区和辅助功能验证。

P3
可进一步打磨辅助计数的对比和道具图标。

P4
扩展角色行走和结尾动画。

## 3D mobile audit (2026-10-25)
P2: Characters are small in portrait overview; physical phone readability/performance still need user playtest. Fixed camera only. P1 resolved: Dutch squirrel label overlapped acorn; layout now separates labels with anchor connector lines.
Readability 4/5 (browser preview): backed labels, preserved dialogue sizes; all six profiles and Chinese/Dutch passed hit testing. Joystick replaces detective badge; no extra resource panels. Focus: garden/player ★★★★★, clues ★★★★, objective ★★★. Real touch drag/release, pause, collision, offline reload verified. First 30 seconds: movement ✔, goal ✔, free tool ✔, progress ✔. Continued-play appeal 4/5 is a design heuristic, not measured retention. Store UI complaint risk estimated 20%, principally portrait character scale and untested physical devices.
==========
UI Score
Readable 8/10
UX 8/10
Accessibility 6/10
Commercial 9/10
Retention 7/10
Google Play Risk 2/10
Priority
P0 None observed in tests
P1 None outstanding in browser matrix
P2 Physical phone character scale, WebGL compatibility and frame pacing
P3 Richer materials and character silhouettes
P4 Camera follow/orbit and richer animations
==========

## iPhone X feedback pass
P1 resolved: repeated action/name pills and long leaders obscured scenery. At <=900px replace labels with 26px speech bubbles, retain accessible names and dialogue names. Magnifier faces 28px; touch targets 44px; fixed clue projection. No new permanent HUD. Nine viewport profiles/Chinese+Dutch passed; screenshots inspected for iPhone X portrait/landscape; real phone retest pending. First-action clarity: dialogue bubble ✔, magnifier ✔, recorded check ✔. Retention heuristic 4/5; estimated UI complaint risk 15%, no measured store data.
==========
UI Score
Readable 8/10
UX 8/10
Accessibility 7/10
Commercial 9/10
Retention 7/10
Google Play Risk 2/10
Priority
P0 None observed
P1 Resolved label occlusion and long leaders
P2 Confirm icon clarity on physical iPhone X
P3 Optional HUD compactness
P4 None
==========

## Immersive viewport, 2026-10-26
P1 addressed: remove clue overlays, title and objective from play HUD; add no permanent panels. Music/fullscreen accessible on phones; compact resources and dock, larger portrait garden. Nine profiles in both languages passed; 375x812 screenshot and real touch object hits inspected. P2 remains: small real clues require careful tapping; physical iPhone fullscreen/audio not verified. Dialogues remain full-size readable. First steps: movement ✔, object investigation ✔ (intro + equipment), progress ✔ (dock); no shop/purchase changes. Continued-play heuristic 4/5; estimated complaint risk 15%, not measured.
==========
UI Score
Readable 8/10
UX 8/10
Accessibility 6/10
Commercial 9/10
Retention 8/10
Google Play Risk 2/10
Priority
P0 None observed
P1 Resolved scene obstruction
P2 Physical-device clue tap comfort and music volume
P3 Optional environmental detail
P4 None
==========

## Orchard case audit — 2026-10-26
P1 resolved: old toast could cover the tool offers / confirmation; modal opening now clears toast. P2: east paint bucket sits near the portrait edge, but its center is visible and real touch picking passes. No extra persistent panel: only a 23px red ! on existing Tas until tape equipped. Visible 1-heart / 5-coin prices, rental duration, disabled insufficient-funds offers and an exit to case 1. Multi-select has outlines, aria-pressed and 1/2, 2/2 count. Nine profiles in zh/nl pass hit/layout checks; phone tool and combination screenshots inspected. First 30 seconds: next goal ✔, bag tool ✔, price/tenure ✔, movement ✔, progress ✔. Continued-play heuristic 4/5; estimated UI complaint risk 15%, not measured. Physical iPhone retest pending.
==========
UI Score
Readable 8/10
UX 8/10
Accessibility 7/10
Commercial 9/10
Retention 8/10
Google Play Risk 2/10
Priority
P0 None observed
P1 Resolved toast occlusion
P2 Physical-device high-branch/east-bucket tap comfort
P3 Character detail
P4 Richer ending animation
==========

## 2026-10-27 footprint patch
Readability 4/5: three separated dark soles with five toes on light mud, red heels visible at 375x812. No added HUD information. Touch collection passed; physical device verification pending.

## Ice Studio / 2026-10-27
Readability 4/5; touch 4/5; HUD load 5/5. Added no permanent HUD, counts adapt to 2 clues/3 statements. Portraits expand in parallel with explicit color names; palette close-up shows labeled RGB paint, not color-only information. Dialogue/choices stay in existing internal-scroll overlays. Nine viewport profiles in Chinese/Dutch passed page-overflow and 44px control hit checks. 375x812 portrait, 812x375 landscape and Dutch portrait comparison screenshots inspected. Physical iPhone readability remains user validation.
