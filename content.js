/* =====================================================================
   SITE CONTENT: every word on the site lives here.
   ---------------------------------------------------------------------
   Edit the text between the quotes and refresh the page. You never have
   to touch index.html, styles.css or main.js to change wording.

   A few tips:
   - Keep the quotes. If your text has a double quote inside it, use
     single curly quotes instead, or put a backslash before it: \"
   - Lists use square brackets [ ]. Each item ends with a comma.
   - Numbers are written as text on purpose, so "7+" and "Up to 60%"
     show exactly as typed.
   - The browser-tab title, search description and link previews live
     at the top of index.html (search engines read those before any
     script runs).
   ===================================================================== */

window.SITE_CONTENT = {

  /* ---------- Basics ---------- */
  meta: {
    fullName: "Suryanarayan Menon Anilkumar",
    playerName: "Surya",
    email: "suryanmenon@cmu.edu",
    linkedin: "https://www.linkedin.com/in/suryanarayan-menon/",
    location: "Pittsburgh, PA",
    resumeFile: "assets/docs/resume.pdf",
    resumeDownloadName: "Suryanarayan-Menon-Anilkumar-Resume.pdf"
  },

  /* ---------- Top bar ---------- */
  topBar: {
    homeLabel: "Surya, back to the start screen",
    resumeLabel: "Download Resume",
    resumeShort: "Resume",
    menuOpen: "Menu",
    menuClose: "Close",
    navLabel: "Sections",
    themeLabel: "Night mode",
    themeDay: "Day",
    themeNight: "Night"
  },

  /* ---------- Start screen (hero) ---------- */
  hero: {
    tag: "Player 1",
    headline: "Security belongs on day one. I help teams get there.",
    // Word(s) from the headline to highlight in blue:
    highlight: "day one.",
    name: "Suryanarayan Menon Anilkumar",
    nameNote: "Surya works too.",
    subline: "I take the fuzzy problems customer-facing teams bring me and turn them into clear ones, with a plan attached. After 3 years in cloud security, I’m studying Information Systems at Carnegie Mellon and looking for a Product Management internship for Summer 2027.",
    menuLabel: "Start menu",
    menu: [
      { label: "See my levels", hint: "Experience", href: "#experience" },
      { label: "Start a co-op", hint: "Contact", href: "#contact" }
    ],
    scrollCue: "Press start",
    scrollCueTarget: "#experience",
    portraitSrc: "assets/images/headshot-1000.jpg",
    portraitWidth: 667,
    portraitHeight: 1000,
    portraitAlt: "Portrait of Surya smiling, wearing glasses and a navy blazer, standing in front of palm leaves.",
    cardTitle: "Player card",
    cardStatus: "Ready",
    stats: [
      { label: "Class", value: "Cloud security, now product" },
      { label: "Base", value: "Pittsburgh, PA" },
      { label: "Training", value: "MISM, Carnegie Mellon · Dec 2027" },
      { label: "Quest", value: "PM internship · Summer 2027" },
      { label: "XP", value: "3 years in cloud security" }
    ],
    bestRun: {
      label: "Best run",
      value: "SOC 2 audit review done in 1.5 months, compressed from an initial 4 months"
    }
  },

  /* ---------- Section names ----------
     navLabel = the short plain name in the top bar
     title    = the game-menu heading on the page                       */
  sections: {
    experience: {
      navLabel: "Experience",
      title: "Levels Cleared",
      intro: "The question I kept asking at work: why don’t more teams care about security in their product? These two levels are how I started answering it, one client at a time."
    },
    projects: {
      navLabel: "Projects",
      title: "Side Quests",
      intro: "Two quests from before the day job. Both taught me the same habit: start with the people, write down what they need, then build."
    },
    education: {
      navLabel: "Education",
      title: "Training Grounds",
      intro: "Where I learned the craft, and where I’m sharpening it now."
    },
    leadership: {
      navLabel: "Leadership",
      title: "Guild Hall",
      intro: "Volunteering taught me that the best teams are built on clear roles and shared goals."
    },
    achievements: {
      navLabel: "Certifications",
      title: "Unlocked",
      intro: "Five certifications and two moments I’m proud of. Every one of them started out locked."
    },
    skills: {
      navLabel: "Skills",
      title: "Loadout",
      intro: "What I bring to the party. Pick a slot to focus on one kind of skill."
    },
    hobbies: {
      navLabel: "Hobbies",
      title: "Between Sessions",
      intro: "When I log off, you’ll usually find me at a game table or holding a controller."
    },
    contact: {
      navLabel: "Contact",
      title: "Two-Player Mode",
      intro: ""
    }
  },

  /* ---------- Experience (the levels) ---------- */
  experience: {
    worldLabel: "World 1",
    company: "SADA, an Insight company",
    location: "Kerala, India",
    span: "June 2023 – July 2026",
    logoSrc: "assets/logos/sada.png",
    logoAlt: "SADA, an Insight company logo",
    logoWidth: 400,
    logoHeight: 101,
    levelUp: {
      label: "Level up",
      detail: "L2 → L4 · April 2025",
      srText: "Promoted from Level 2 to Level 4 in April 2025."
    },
    showDetails: "Open level log",
    hideDetails: "Close level log",
    levels: [
      {
        level: "L4",
        levelName: "Level 4",
        role: "Senior Cloud Security Engineer",
        dates: "April 2025 – July 2026",
        location: "Kerala, India",
        summary: "Stepped in as interim cybersecurity lead for an enterprise client, owned a client’s 15-endpoint API library as the single point of contact, and patched 5 exposed credentials within a week.",
        stats: [
          { value: "1.5 months", label: "SOC 2 audit review, compressed from an initial 4 months" },
          { value: "15", label: "API endpoints owned, roadmap to lifecycle" },
          { value: "5 leaks", label: "of exposed credentials closed in one week" }
        ],
        details: [
          "Co-led the interim Director of Cybersecurity responsibilities for an enterprise client. Together we compressed an initial 4-month SOC 2 audit review into a 1.5-month sprint, then drove a year-long, cross-functional remediation plan for the 5 flagged exceptions.",
          "Served as primary contact for a B2B client and owned the roadmap and lifecycle for their library of 15 API endpoints: gathering requirements, prioritizing fixes, and keeping technical and business stakeholders aligned. The engagement went on to create two years of follow-on work.",
          "Traced exposed credentials across CI/CD pipelines back to their root cause, then led a cross-team fix that closed 5 leaks within one week using automated key rotation and access hardening on Google Cloud KMS. A potential data breach, averted."
        ]
      },
      {
        level: "L2",
        levelName: "Level 2",
        role: "Associate Cloud Security Engineer",
        dates: "June 2023 – April 2025",
        location: "Kerala, India",
        summary: "Took a cloud security assessment to market, wrote the incident playbooks clients relied on, and rolled out one security framework across 200+ assets.",
        stats: [
          { value: "Up to 60%", label: "lift in customers’ compliance scores" },
          { value: "7+", label: "clients on standardized incident response playbooks" },
          { value: "200+", label: "assets secured for 9 customers" }
        ],
        details: [
          "Took a standardized cloud security assessment to market: pitching it to customers and designing tailored remediation plans that lifted their compliance scores by up to 60%.",
          "Designed standardized incident response playbooks across Google Cloud’s managed SOC service, so the response stayed consistent across 7+ clients.",
          "Owned the rollout of a standardized cloud security framework (IAM, network segmentation and encryption) across 200+ assets for 9 customers, migrating their infrastructure to Google Cloud Platform with Terraform-based IaC and reducing operational costs by 30%."
        ]
      }
    ]
  },

  /* ---------- Side quests (projects) ---------- */
  projects: {
    labels: {
      quest: "Side quest",
      client: "Quest giver",
      party: "Who it was for",
      did: "What I did",
      rewards: "Rewards",
      pmMoves: "Product moves"
    },
    items: [
      {
        art: "monitor", // placeholder illustration until a real image is added
        imageSrc: "",   // e.g. "assets/images/patient-monitor.jpg"
        imageAlt: "",
        title: "Custom software for patient monitors",
        client: "Sri Chitra Tirunal Institute for Medical Sciences and Technology, Trivandrum",
        party: "5 clinicians running an intraoperative monitoring research study",
        badge: "IBS Award · Best Original Paper Presentation",
        did: [
          "Led product discovery and user interviews, acting as the main stakeholder liaison for 5 clinicians.",
          "Gathered requirements, defined user personas, and built a proof-of-concept anomaly-detection algorithm and visualization suite for hemodynamic signals, validated against hundreds of historical surgical cases.",
          "Translated Philips Intellivue Monitor data protocols into a Product Requirement Document (PRD), so two engineering teams could build directly on the findings with no extra discovery."
        ],
        rewards: [
          { value: "80%", label: "less time to detect an anomaly" },
          { value: "2", label: "engineering teams building from one PRD" }
        ],
        pmMoves: ["Product discovery", "User interviews", "Personas", "Requirements", "PRD"]
      },
      {
        art: "network",
        imageSrc: "",
        imageAlt: "",
        title: "Campus network audit",
        client: "Government Engineering College, Barton Hill, Trivandrum",
        party: "10+ IT staff keeping the campus network running",
        badge: "",
        did: [
          "Led an end-to-end audit, from stakeholder scoping meetings to GNS3 network architecture diagrams.",
          "Ran a vulnerability assessment with Kali Linux tools, fixed 29 critical risks, and presented the findings with a remediation roadmap to the college’s stakeholders.",
          "Owned a zero-to-one proof of concept replacing the legacy firewall with pfSense, backed by a competitive analysis against the incumbent vendor."
        ],
        rewards: [
          { value: "60%", label: "less troubleshooting time" },
          { value: "29", label: "critical risks found and fixed" },
          { value: "$17,000", label: "in potential savings" },
          { value: "100%+", label: "future traffic growth supported" }
        ],
        pmMoves: ["Stakeholder scoping", "Competitive analysis", "Zero-to-one PoC", "Roadmap"]
      }
    ]
  },

  /* ---------- Training grounds (education) ---------- */
  education: {
    labels: {
      current: "Now training",
      done: "Cleared",
      courses: "Modules",
      publication: "Published"
    },
    schools: [
      {
        name: "Carnegie Mellon University",
        location: "Pittsburgh, PA",
        degree: "Master of Information Systems Management",
        date: "Dec 2027",
        current: true,
        highlight: "25% merit scholarship",
        courses: [
          "Product Management Essentials I/II",
          "Economic Analysis",
          "Statistics for IT Managers",
          "Database Management",
          "Cybersecurity for AI and ML",
          "Python for Software Development"
        ],
        logoSrc: "assets/logos/carnegie-mellon.jpeg",
        logoAlt: "Carnegie Mellon University logo",
        logoWidth: 372,
        logoHeight: 372
      },
      {
        name: "Government Engineering College, Barton Hill",
        location: "Trivandrum, Kerala, India",
        degree: "Bachelor of Technology in Information Technology",
        date: "June 2023",
        current: false,
        highlight: "GPA 3.84/4",
        courses: [],
        logoSrc: "assets/logos/gec-barton-hill.jpg",
        logoAlt: "Government Engineering College, Barton Hill logo",
        logoWidth: 400,
        logoHeight: 400
      }
    ],
    publication: {
      title: "Routing Algorithms for SDN Performance Optimization",
      venue: "IEEE ICCSC-10143010",
      // Link taken from the resume PDF:
      url: "https://ieeexplore.ieee.org/document/10143010",
      linkLabel: "Read on IEEE Xplore"
    }
  },

  /* ---------- Guild (leadership) ---------- */
  leadership: {
    org: "IEEE Region 10 Asia Pacific",
    role: "Vice Chair, Information Management Committee",
    dates: "Dec 2024 – Jan 2026",
    summary: "I led a 5-member volunteer team spread across Asia-Pacific and drove our content strategy and student outreach.",
    partyLabel: "Party of 5",
    partyNote: "Volunteers across Asia-Pacific",
    stats: [
      { value: "5", label: "volunteers on the team" },
      { value: "65,000+", label: "annual impressions from our content" },
      { value: "4", label: "outreach events, engaging hundreds of students globally" }
    ]
  },

  /* ---------- Unlocked (certifications + story badges) ---------- */
  achievements: {
    lockedLabel: "Locked",
    unlockedLabel: "Unlocked",
    certGroupLabel: "Certifications",
    storyGroupLabel: "Story badges",
    certs: [
      { name: "Cisco Certified Network Associate", tag: "Networking" },
      { name: "Google Professional Security Operations Engineer", tag: "Security operations" },
      { name: "Google Professional Cloud Security Engineer", tag: "Cloud security" },
      { name: "Google Professional Cloud Network Engineer", tag: "Cloud networking" },
      { name: "Certified Ethical Hacker", tag: "Ethical hacking" }
    ],
    story: [
      { name: "IBS Award, Best Original Paper Presentation", tag: "Patient monitor study" },
      { name: "25% merit scholarship", tag: "Carnegie Mellon University" }
    ]
  },

  /* ---------- Loadout (skills) ----------
     Add or remove skills inside a group. Empty groups are hidden.   */
  skills: {
    allLabel: "All",
    filterLabel: "Filter skills by category",
    statusTemplate: "Showing {count} skills: {group}",
    groups: [
      {
        id: "product",
        name: "Product & collaboration",
        items: ["Agile Methodology", "Communication", "Stakeholder Management", "KPI Tracking", "AI Evaluation"]
      },
      {
        id: "technical",
        name: "Technical",
        items: ["Python", "SQL", "Terraform", "Bash", "Artificial Intelligence (AI)", "Google Cloud Platform"]
      },
      {
        id: "secops",
        name: "Security operations",
        items: ["IAM", "SIEM", "SOAR", "Incident Response Management", "Google SecOps", "SOC Analysis"]
      },
      {
        id: "devops",
        name: "DevOps",
        items: ["CI/CD", "Jenkins", "Helm"]
      }
    ]
  },

  /* ---------- Between sessions (hobbies) ---------- */
  hobbies: [
    {
      icon: "d20",
      title: "Dungeons and Dragons",
      line: "Most of my adult money goes into collecting dice."
    },
    {
      icon: "controller",
      title: "Video games",
      line: "I’ll probably pass my game libraries on to my children."
    }
  ],

  /* ---------- Two-player mode (contact) ---------- */
  contact: {
    eyebrow: "Save point",
    closing: "Got a fuzzy problem, a product that should be secure from day one, or a question you’re not sure how to ask? Send it my way. I’m always happy to help you find the first move.",
    emailLabel: "Email",
    copyLabel: "Copy email",
    copiedLabel: "Copied!",
    copiedStatus: "Email address copied to your clipboard.",
    copyFailStatus: "Couldn’t copy automatically. The address is selected, so press Ctrl+C or Cmd+C.",
    mailLabel: "Send an email",
    linkedinLabel: "Connect on LinkedIn"
  },

  /* ---------- Footer ---------- */
  footer: {
    saved: "Progress saved",
    backToTop: "Back to start",
    builtWith: "Hand-built with HTML, CSS and JavaScript."
  },

  /* ---------- Hidden easter egg ----------
     Type d20 anywhere on the page (not in a text box) to roll.       */
  easterEgg: {
    trigger: "d20",
    title: "You rolled a {n}",
    messages: {
      nat20: "Natural 20! Critical success. Let’s build something secure together.",
      nat1: "Natural 1. It happens to every party. Good plans always have a backup.",
      high: "A strong roll. Proceed with confidence.",
      mid: "Decent odds. A little planning tips the rest your way.",
      low: "A rough roll. Nothing a clear plan can’t recover from."
    }
  }
};
