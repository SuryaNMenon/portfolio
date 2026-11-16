# MISSING.md: open items and questions

Everything here has a safe default already live on the site, so nothing is broken while you decide.
Tick a box once it's handled. Each item has a ready-to-paste prompt for a future Claude session.

---

## Top 3 to do first

1. **Project images** (items 6 and 7). The two Side Quest cards use placeholder art.
2. **Pick your headline** (item 1). Two alternatives are below.
3. **Set your live URL after deploying** (item 8) so LinkedIn and Slack link previews show your photo.

---

## Questions for you (defaults in use until you answer)

- [ ] **1. Headline.** The site uses:
  > **Security belongs on day one. I help teams get there.**

  Alternatives:
  - A. *I make security the part teams care about first.*
  - B. *Turning fuzzy problems into clear plans, with security built in.*

  Where: `content.js` → `hero.headline` (and `hero.highlight`, the words shown in blue)
  Prompt: `Use headline option A from MISSING.md on my site. Highlight the words "care about first." in blue. Keep everything else the same.`

- [ ] **2. Company name.** Your form said "Insight", your resume says "SADA, an Insight company". The site uses the resume version, and the SADA logo already reads "An Insight company".
  Where: `content.js` → `experience.company`
  Prompt: `Confirmed: keep "SADA, an Insight company" everywhere. Tick item 2 in MISSING.md.`

- [ ] **3. IEEE title.** The resume header line says "Vice Chair, Information Management Committee". A bullet says "Vice Chair of Content & Socials". The site uses the header-line title.
  Where: `content.js` → `leadership.role`
  Prompt: `Change my IEEE role on the site to "Vice Chair, Content & Socials (Information Management Committee)" and tick item 3 in MISSING.md.`

- [ ] **4. Headshot and resume.** Both found and in use:
  - `assets/images/headshot.JPG` (2.1 MB original, not loaded by the site). The site uses compressed copies I made: `assets/images/headshot-1000.jpg` (132 KB) and `assets/images/og-image.jpg` (80 KB, for link previews).
  - `assets/docs/resume.pdf` → "Download Resume" button.
  - **Heads-up:** your resume PDF includes your phone number. The website itself never shows it, but anyone who downloads the PDF will see it. If you'd rather not share it, export a copy without the phone line and save it over `assets/docs/resume.pdf`.
  Prompt: `I replaced assets/docs/resume.pdf with a version without my phone number. Check the download button still works and tick item 4 in MISSING.md.`

- [ ] **5. Unused logos.** I found `assets/logos/Johnson___Johnson/` (3 files) and `assets/logos/insight.png` + `assets/logos/Insight_Enterprises/`. Johnson & Johnson isn't on your resume, so it's **not** on the site (I won't invent a role). The Insight logo isn't needed because the SADA logo already says "An Insight company".
  Prompt (if J&J is a new role or internship): `Add my new role at Johnson & Johnson to the site as a new "World 2" above SADA in the Experience section. Title: ___, dates: ___, location: ___, 2–3 results: ___. Use assets/logos/Johnson___Johnson/Johnson___Johnson_Logo_0.svg. Update MISSING.md.`
  Prompt (if not needed): `Delete the Johnson___Johnson and Insight_Enterprises folders and insight.png from assets/logos, then tick item 5 in MISSING.md.`

## Placeholders on the site

- [ ] **6. Patient monitor project image.** Right now it shows a themed placeholder (a monitor with a waveform drawing). A real screenshot, poster or photo of the visualization would make this card come alive. Blur any patient data first.
  Where: save as `assets/images/patient-monitor.jpg`, then `content.js` → `projects.items[0].imageSrc` and `imageAlt`
  Prompt: `I added assets/images/patient-monitor.jpg. Replace the placeholder art on the patient monitor project card with it, write good alt text, compress it if it's over 500KB, and keep everything else the same.`

- [ ] **7. Campus network project image.** Placeholder (a network-map drawing). A GNS3 architecture diagram would fit perfectly.
  Where: save as `assets/images/campus-network.png`, then `content.js` → `projects.items[1].imageSrc` and `imageAlt`
  Prompt: `I added assets/images/campus-network.png. Replace the placeholder art on the campus network project card with it, write good alt text, compress it if it's over 500KB, and keep everything else the same.`

- [ ] **8. Live URL for link previews.** Open Graph images need a full web address to show up on LinkedIn, Slack and iMessage. Right now they use a relative path (`assets/images/og-image.jpg`).
  Where: `index.html` → the `og:image` and `twitter:image` tags (add an `og:url` tag too)
  Prompt: `My site is live at https://YOUR-SITE.vercel.app. Update the og:image, twitter:image and og:url tags in index.html to use full URLs, then tick item 8 in MISSING.md.`

## Projects: want to add more?

- [ ] **9. Project links.** Neither project has a link yet (paper, repo, slides, demo).
  Prompt: `Add a link button to my patient monitor project card that goes to ___ with the label "___". Add a links field in content.js so I can edit it later.`

- [ ] **10. A third side quest.** The site shows the two projects from your resume.
  Prompt: `Add a third side quest to my Projects section. Title: ___. Who it was for: ___. What I did: ___, ___, ___. Results (exact numbers): ___. Product moves: ___. Use a themed placeholder image and log it in MISSING.md.`

## Small things I decided (tell me if you want them changed)

- [ ] **11. "SOC Analysis" skill.** It's in your form's skill list but not on your resume. I kept it because you listed it.
  Prompt: `Remove "SOC Analysis" from my skills.` / `Keep "SOC Analysis" and tick item 11 in MISSING.md.`

- [ ] **12. "Merit" scholarship.** Your resume says "25% scholarship recipient", and your form says "25% merit scholarship". These don't conflict, so the site says "25% merit scholarship".
  Prompt: `Change "25% merit scholarship" to "25% scholarship" everywhere on my site.`

- [ ] **13. Skill groups.** Your resume puts Jenkins and Helm under Technical Skills. The site follows your form and shows them under DevOps. No skill was added or dropped (20 total, no duplicates).

- [x] **14. Blue text in night mode (accessibility note).** Electric blue `#3D5AFE` on `#111111` is **3.68:1**. That passes AA for large text and UI parts (3:1) but not for small text (4.5:1). So in night mode, blue is used only for large text, borders, the selected-item indicator, focus rings and button fills (white text on blue is 4.92:1, a pass). Links in night mode are off-white with a blue underline. In day mode, blue on `#FAFAFA` is 4.92:1, so blue text is fine at any size.

## Things that exist so you know about them

- [x] **15. Hidden easter egg.** Type **d20** anywhere on the page (not inside a text box) and a small die rolls in the bottom-right corner with a friendly message. Natural 20s and natural 1s get their own lines. It never blocks clicks, disappears on its own, and doesn't spin for visitors who prefer reduced motion. Messages live in `content.js` → `easterEgg`.
- [x] **16. File names.** Your files were named slightly differently from the prompt (`headshot.JPG`, `carnegie-mellon.jpeg`, `gec-barton-hill.jpg`). The site points at the real names, which matters because Vercel is case-sensitive.
- [ ] **17. Optional cleanup.** The 2.1 MB original `assets/images/headshot.JPG` isn't used by the page, but it gets uploaded with the site.
  Prompt: `Move assets/images/headshot.JPG out of the project folder (the site uses headshot-1000.jpg) and tick item 17 in MISSING.md.`
