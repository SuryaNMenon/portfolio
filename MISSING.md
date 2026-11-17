# MISSING.md: open items and questions

Everything here has a safe default already live on the site, so nothing is broken while you decide.
Tick a box once it's handled. Each item has a ready-to-paste prompt for a future Claude session.

---

## Top 3 to do first

1. **Confirm your IEEE Vice Chair dates and title** (item 1). Your resume and your LinkedIn disagree.
2. **Move the source files out of the public folder** (item 6) before you deploy.
3. **Set your live URL after deploying** (item 5) so LinkedIn and Slack link previews show your photo.

---

## Questions for you (defaults in use until you answer)

- [ ] **1. IEEE Vice Chair: dates and title.** Two sources disagree:
  - Resume: "Vice Chair - Information Management Committee", **Dec 2024 – Jan 2026**
  - LinkedIn screenshot: "Vice Chair, Content and Socials - Information Management Committee", **Jan 2025 – Present**

  The site uses the resume version (your rule: the resume wins). If the role is still ongoing, the resume needs updating too.
  Where: `content.js` → `leadership.featured.role` and `leadership.featured.dates`
  Prompt: `Change my IEEE Vice Chair role on the site to "Vice Chair, Content and Socials, Information Management Committee" with dates "Jan 2025 – Present", and tick item 1 in MISSING.md.`

- [ ] **2. Statewide rank wording.** The site says "Ranked 10th statewide in the graduating cohort" on the GEC Barton Hill card. This isn't on your resume, so please confirm the wording (for example, should it name the university or the branch?).
  Where: `content.js` → `education.schools[1].highlights`
  Prompt: `Change my rank line on the GEC card to "___" and tick item 2 in MISSING.md.`

- [ ] **3. Both resume PDFs show your phone number.** The website never shows it, but anyone who downloads either resume (the two PDFs in `assets/docs/`) will see it. If you'd rather not share it, export copies without the phone line and save them over the files in `assets/docs/`.
  Prompt: `I replaced both PDFs in assets/docs with versions without my phone number. Check both download options still work and tick item 3 in MISSING.md.`

- [ ] **4. Johnson & Johnson logos.** `assets/logos/Johnson___Johnson/` isn't used because J&J isn't on your resume (I won't invent a role).
  Prompt (if it's a new role): `Add my new role at Johnson & Johnson above SADA in the Experience section. Title: ___, dates: ___, location: ___, 2–3 results: ___. Use the logo in assets/logos/Johnson___Johnson. Update MISSING.md.`
  Prompt (if not needed): `Delete the Johnson___Johnson folder from assets/logos, then tick item 4 in MISSING.md.`

## To do around deploying

- [ ] **5. Live URL for link previews.** Open Graph images need a full web address to show up on LinkedIn, Slack and iMessage. Right now they use a relative path.
  Where: `index.html` → the `og:image` and `twitter:image` tags (add an `og:url` tag too)
  Prompt: `My site is live at https://YOUR-SITE.vercel.app. Update the og:image, twitter:image and og:url tags in index.html to use full URLs, then tick item 5 in MISSING.md.`

- [ ] **6. Source files are inside the public folder.** These are only raw material, but because they sit in `assets/` they get uploaded with the site and anyone with the link could open them:
  - `assets/images/`: the two LinkedIn screenshots, the three full report pages (`bis events.png`, `net college.png`, `net1.png`), the 2.1 MB original `headshot.JPG`, and `headshot-1000.jpg`
  - `assets/logos/`: the original certification files (`ccna-logo-544x306.avif`, `ceh.gif`, `gc pcne.png`, `gc pcse.png`, `gc psc.webp`), `sada.png`, and the `Insight_Enterprises` folder

  The site only uses the cleaned copies I made (`headshot-circle.jpg`, `project-*.jpg`, `cert-*.png`) plus `insight.png`, the two school logos and `og-image.jpg`.
  Prompt: `Move the unused source files listed in item 6 of MISSING.md out of the portfolio folder into ../portfolio-sources, confirm the site still works, and tick item 6.`

## Facts on the site that are not on either resume

You gave me these directly, so they're on the site. Listing them so you can keep your resumes in step if you want.

- [ ] **7. Assistantships** on the CMU card: "Research Assistant, Tech Policy Student Engagement & Outreach" and "Teaching Assistant, NoSQL Database Management".
- [ ] **8. "Jenkins Plugin Manager"** under DevOps skills, and **"SOC Analysis"** under Security operations.
- [ ] **8b. Associate Recognition Award** on the SADA card: three times, in Q2 2024, Q1 2025 and Q3 2025.
- [ ] **9. D&D community:** "grew it from 0 to 250 unique members organically".
- [ ] **10. "Merit"** in "25% merit scholarship" (the resumes say "25% scholarship recipient").
- [ ] **11. The two resumes differ slightly.** The site follows the Product resume. The engineering resume words some bullets differently, for example "8 enterprise clients against SOC 2 and NIST frameworks". Nothing on the site contradicts either, but tell me if you'd like any of the engineering wording used.
  Prompt: `Remove ___ from my site.` / `Change ___ to "___".`

## Want to add more?

- [ ] **12. Project links.** Neither project has a link yet (paper, report, slides, demo).
  Prompt: `Add a link button to my patient monitor project card that goes to ___ with the label "___". Add a links field in content.js so I can edit it later.`

- [ ] **13. A third project.**
  Prompt: `Add a third project to my Projects section. Title: ___. In association with: ___. Who it was for: ___. What I did: ___, ___, ___. Results (exact numbers): ___. Product skills: ___. I added an image at assets/images/___.`

- [ ] **14. Social Media Manager details.** Your LinkedIn has no description for the Region 10 Social Media Manager role (Feb 2024 – Feb 2025), so the site shows only the title and dates.
  Prompt: `Add these points to my Social Media Manager role in the Leadership section: ___.`

## Small things I decided (tell me if you want them changed)

- [x] **15. Resume downloads.** Each download is saved under the PDF's own file name. To swap a resume, put the new PDF in `assets/docs` and update `file` in `content.js` → `topBar.resumes`. If you open the site by double-clicking `index.html`, browsers won't download local files, so the PDF opens in a new tab instead. On the live site it downloads normally.

- [ ] **16. Contact line.** "Hiring for Summer 2027, or just want to talk product and security? I'd love to hear from you."
  Where: `content.js` → `contact.closing`

- [ ] **17. Project cards show Results before What I did.** I moved the big numbers up so a quick skim catches them first, the same order as the Experience cards.
  Prompt: `In my project cards, put "What I did" back above "Results".`

- [ ] **18. L2 summary vs. details.** Your L2 summary says "multiple security frameworks". The detail bullet under "Show details" still follows the resume: "a standardized cloud security framework (IAM, network segmentation and encryption)". Tell me if the bullet should change too.

- [x] **19. Certification logos sit on white plates in both modes.** The CCNA and CEH marks use black lettering, which disappears on the dark background, so every logo gets the same light plate (like your school logos). I removed the white backgrounds and trimmed the empty space.

- [x] **20. Blue text in night mode (accessibility note).** Electric blue `#3D5AFE` on `#111111` is 3.68:1. That passes AA for large text and UI parts (3:1) but not small text (4.5:1). So in night mode, blue is used only for large text, borders, icons, focus rings and button fills (white on blue is 4.92:1, a pass).

## Things that exist so you know about them

- **The d20.** Click the die on the Dungeons and Dragons card, or type **d20** anywhere on the page, and a small die rolls in the bottom-right corner with a friendly message. It never blocks clicks and disappears on its own. Messages are in `content.js` → `easterEgg`.
- **Scroll animation.** As each section scrolls in, the thin rule beside its number draws itself from left to right, led by a short blue tracer; the heading settles and the boxes rise into place. Content you have already scrolled past appears instantly, and everything is switched off for visitors who ask for reduced motion.
- **Level marks.** L2 and L4 appear only on the career path line beside the Experience cards, not in the job titles.
