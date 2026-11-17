# Build plan: Surya's portfolio

Concept: **the main menu of a sleek, futuristic game.** Start screen, levels, side quests, unlocks.
Rule above all others: *effects stay quiet and secondary to reading.*

## Phase A: files and content data
- [x] Read every file in /assets (photo, resume PDF, logos)
- [x] Compress headshot (2.1 MB → under 500 KB), fix its rotation, make a social preview image
- [x] PLAN.md (this file) and MISSING.md
- [x] `content.js`: one labeled object holding every word on the site
- [x] `index.html`: landmarks, meta description, title with my name, Open Graph tags, SVG "SM" favicon
- [x] Facts only from the resume. No made-up roles, dates, numbers, awards or links
- [x] No phone number or street address anywhere (city only)
- [x] All copy written fresh, in my voice (warm, patient, helpful), with no borrowed taglines or section names

## Phase B: layout and responsive styling
- [x] Colors: #111111 / #FAFAFA / #3D5AFE, day + night modes, AA contrast checked for every pair
- [x] 2 Google Fonts max (display: Chakra Petch, body: Atkinson Hyperlegible)
- [x] Top bar: SM emblem, plain section links, active item highlighted, Download Resume, mode toggle, XP-style progress bar
- [x] Phone menu: menu button (aria-expanded), closes on link tap and Escape; resume + toggle still reachable
- [x] Hero start screen: player portrait, name + "Surya", headline (≤10 words), 1–2 sentence subline, two menu-option buttons, "press start" scroll cue
- [x] Experience: SADA logo, L4 above L2, level-up path from L2 to L4, 2–3 headline numbers per level, expandable details
- [x] Side quests: 2 project cards (what I did, who it was for, result) with themed placeholder art
- [x] Training grounds: CMU + GEC with logos, courses, scholarship, GPA, publication
- [x] Guild: IEEE Region 10 leadership
- [x] Unlocked: 5 certifications + 2 story badges as achievement badges with a lock/shield motif
- [x] Loadout: skills grouped by category, deduplicated, no empty group, no extra skills
- [x] Between sessions: D&D + video games with my own lines and a d20 detail
- [x] Contact: closing line, email as text + copy button + mailto, LinkedIn SVG icon link, year set by JS
- [x] Mobile first, checked at 360 / 768 / 1024 / 1440 px: no horizontal scroll, 44px tap targets, body text ≥16px

## Phase C: animations and interactions
- [x] Day/night toggle: system default, saved in localStorage (try/catch), color change under 300ms
- [x] Heading scramble: section headings only, once each, under 1s, real text in DOM, animated layer aria-hidden, off for reduced motion
- [x] Hidden easter egg (type `d20`): rolls a die in the corner, never blocks reading or clicking
- [x] Quiet hero entrance, staggered scroll reveals (IntersectionObserver)
- [x] Achievement "unlock" state change on scroll into view (decoration only, always readable)
- [x] Skills filter tabs, keyboard friendly, with a live announcement
- [x] Hover/focus states on everything clickable, menu-style selector indicator
- [x] Only transform + opacity animated (except the requested theme color fade), nothing loops or bounces
- [x] prefers-reduced-motion respected everywhere; content never stuck invisible if JS fails

## Phase D: QA
- [x] Every number checked against the resume
- [x] Contrast pairs computed and logged
- [x] Screenshots at 360 / 768 / 1024 / 1440 in both modes
- [x] No console errors, no horizontal scroll
- [x] Resume download, nav links, active state, phone menu, toggle memory, easter egg all tested
- [x] Definition of Done reported item by item

## QA log (Phase D)
- Layout checked in headless Chrome at 360 / 768 / 1024 / 1440 px, day + night: no horizontal scroll, no tap target under 44px, no broken images, body text ≥16px.
- 36 interaction checks passed: active nav for all 8 sections, nav jump lands below the sticky bar, theme toggle + saved choice survives reload, level log expand/collapse, skills filter + live announcement, 20 unique skills, d20 easter egg (pointer-events: none), copy email, resume PDF served with download attribute, mailto/LinkedIn/year, phone menu open / Escape (focus returns) / closes on link tap, reduced motion (no scramble, nothing hidden, badges unlocked).
- Console: 0 errors, 0 warnings.
- Every resume number found in content.js; no phone number or street address in any site file.

## Revision 2 (2026-11-16): professional profile first, theme as visuals only
Feedback: the first build leaned too hard into the game theme. Changes made:
- [x] Plain section headings (Experience, Projects, Education, Leadership, Certifications & Awards, Skills, Hobbies, Contact) and plain labels in every card. No game wording carries information.
- [x] Intro rebuilt: name, new tagline, plain "View my experience" / "Contact me" buttons, an "At a glance" strip (Now, Looking for, Background, Recent result). Player card and "Press start" cue removed.
- [x] Headshot is now a circle cropped to the full head and top of the suit.
- [x] L2 summary replaced with the exact supplied sentence.
- [x] Top-left emblem removed (text "Surya" only). Tab icon is the letter S in the site colors.
- [x] Real project screenshots: BIS events chart, whole-campus and main-block GNS3 diagrams (cropped, rotated upright, compressed, with a two-image switch and full-size links).
- [x] "Hand-built" footer line removed.
- [x] SADA and Insight logos both shown in Experience.
- [x] Publication moved inside the GEC Barton Hill card; statewide rank and four courses added.
- [x] Leadership expanded from LinkedIn screenshots into a featured role plus a five-role timeline.
- [x] Kept as visual theme only: grid backdrop, corner brackets, typeface, heading scramble, progress bar, menu selector marks, badge icon change on scroll, hidden d20 easter egg.
- [x] Re-tested: 4 widths x 2 modes (no horizontal scroll, 44px targets, no broken images), 36 interaction checks, 0 console errors.

## Revision 3 (2026-11-16): polish round
- [x] Top-left name is plain text (not a link). Tab icon is a simple S.
- [x] Certification logos added (backgrounds removed, trimmed, on light plates).
- [x] Campus network card shows only the whole-campus diagram with the supplied caption.
- [x] Skills: Bash moved to DevOps; Jenkins Plugin Manager added (21 skills).
- [x] Resume button redesigned: outlined "Resume" button that opens two download choices (product management / engineering).
- [x] Intro: "security in mind" tagline; "graduating December 2027"; looking for a product management or security engineering internship.
- [x] Experience: Insight logo only; L2/L4 removed from titles (kept on the path line); new Senior role summary.
- [x] CMU card: two assistantships.
- [x] Leadership: Junior Executive Committee and GEC Barton Hill Secretary roles removed; intro notes these are some of the leadership roles.
- [x] Hobbies: clickable d20; D&D community story (0 to 250 members); new video games line.
- [x] Contact: short hook line. Footer: centered, no copyright symbol, thank-you line.
- [x] Floating back-to-top button (replaces the footer link).
- [x] Hover corner highlights on every box.
- [x] Scroll animation: section rule draws itself with a blue tracer; reveals smoothed; content already scrolled past appears instantly.
- [x] Skim review: project Results moved above What I did; phone layouts for hobbies, footer and resume menu tidied.
- [x] Re-tested: 4 widths x 2 modes (no horizontal scroll, 44px targets, 16px text, no broken images), 44 interaction checks, 0 console errors.

## Revision 4 (2026-11-16)
- [x] Associate Recognition Award (3 times: Q2 2024, Q1 2025, Q3 2025) added to the company card in Experience.
- [x] Education cards ordered: accomplishments, coursework, then assistantships / publication.
- [x] Accomplishments in Education use the same star style as the project award.
- [x] Resume downloads fixed: saved under each PDF's own file name; opens in a new tab where a browser won't download (local files).
- [x] Re-tested: 44 interaction checks, 4 widths x 2 modes, 0 console errors.

## Revision 5 (2026-11-16)
- [x] "Read the report" button with a GitHub icon at the bottom of each project card (opens the PDF on GitHub in a new tab).
