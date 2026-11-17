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
    shortName: "Surya",
    email: "suryanmenon@cmu.edu",
    linkedin: "https://www.linkedin.com/in/suryanarayan-menon/",
    location: "Pittsburgh, PA"
  },

  /* ---------- Top bar ---------- */
  topBar: {
    // The Resume button opens a small menu with these download choices.
    // To swap a resume: put the new PDF in assets/docs and update "file".
    // The download is saved under the PDF's own file name.
    resumeButton: "Resume",
    resumeMenuLabel: "Choose a resume to download",
    resumes: [
      {
        label: "Product",
        note: "PDF",
        file: "assets/docs/Suryanarayan Menon A Product Resume.pdf"
      },
      {
        label: "Engineering",
        note: "PDF",
        file: "assets/docs/Suryanarayan Menon A Engineering Resume.pdf"
      }
    ],
    menuOpen: "Menu",
    menuClose: "Close",
    navLabel: "Sections",
    themeLabel: "Night mode",
    themeDay: "Day",
    themeNight: "Night"
  },

  /* ---------- Intro (top of the page) ---------- */
  hero: {
    name: "Suryanarayan Menon Anilkumar",
    nameNote: "Surya for short",
    headline: "I help customers build solutions with security in mind from day 0.",
    // Word(s) from the headline to highlight in blue:
    highlight: "day 0.",
    subline: "I’ve spent 3 years leading cloud security engagements, turning ambiguous customer problems into defined ones with a clear plan to solve them.",
    buttons: [
      { label: "View my experience", href: "#experience", primary: true },
      { label: "Contact me", href: "#contact", primary: false }
    ],
    portraitSrc: "assets/images/headshot-circle.jpg",
    portraitWidth: 720,
    portraitHeight: 720,
    portraitAlt: "Surya smiling, with curly hair and glasses, wearing a navy blazer.",
    factsLabel: "At a glance",
    facts: [
      { label: "Now", value: "Master of Information Systems Management student at Carnegie Mellon University, graduating December 2027" },
      { label: "Looking for", value: "A product management or security engineering internship for Summer 2027" },
      { label: "Background", value: "3 years in cloud security at SADA, an Insight company" },
      { label: "Recent result", value: "An enterprise client’s SOC 2 audit review done in 1.5 months, compressed from an initial 4 months" }
    ]
  },

  /* ---------- Section names ----------
     navLabel = the short name in the top bar
     title    = the heading on the page                                 */
  sections: {
    experience: {
      navLabel: "Experience",
      title: "Experience",
      intro: "The question I kept asking at work: why don’t more teams care about security in their product? These two roles are how I started answering it, one client at a time."
    },
    projects: {
      navLabel: "Projects",
      title: "Projects",
      intro: "Two projects from before my full-time work. Both taught me the same habit: start with the people, write down what they need, then build."
    },
    education: {
      navLabel: "Education",
      title: "Education",
      intro: "Where I learned the craft, and where I’m sharpening it now."
    },
    leadership: {
      navLabel: "Leadership",
      title: "Leadership",
      intro: "I’ve volunteered with IEEE since April 2020. These are some of the roles where I’ve served in a leadership capacity."
    },
    achievements: {
      navLabel: "Certifications",
      title: "Certifications & Awards",
      intro: "Six professional certifications and two recognitions I’m proud of."
    },
    skills: {
      navLabel: "Skills",
      title: "Skills",
      intro: "What I bring to a team. This list is a work in progress that expands as I learn new things!"
    },
    hobbies: {
      navLabel: "Hobbies",
      title: "Hobbies",
      intro: "When I log off, you’ll usually find me rolling dice or mulling over my Steam library."
    },
    contact: {
      navLabel: "Contact",
      title: "Contact",
      intro: ""
    }
  },

  /* ---------- Experience ---------- */
  experience: {
    company: "SADA, an Insight company",
    location: "Kerala, India",
    span: "June 2023 – July 2026",
    logos: [
      { src: "assets/logos/insight.png", alt: "Insight logo", width: 800, height: 244 }
    ],
    // Shown on the company card, beside the name.
    recognition: {
      label: "Recognition",
      title: "Associate Recognition Award",
      count: "3X",
      when: ["Q2 2024", "Q1 2025", "Q3 2025"]
    },
    promotion: {
      label: "Promoted",
      detail: "L2 → L4 · April 2025",
      srText: "Promoted from L2 to L4 in April 2025."
    },
    showDetails: "Show details",
    hideDetails: "Hide details",
    levels: [
      {
        level: "L4",
        role: "Senior Cloud Security Engineer",
        dates: "April 2025 – July 2026",
        location: "Kerala, India",
        summary: "The direct point of contact for customers across our security engineering engagements. I co-led an enterprise client’s interim cybersecurity leadership, owned the roadmap for a 15-endpoint API library, and led a cross-team fix that closed 5 credential leaks within a week.",
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
        role: "Associate Cloud Security Engineer",
        dates: "June 2023 – April 2025",
        location: "Kerala, India",
        summary: "Conducted cloud security assessments and prescribed secure go to market strategies, wrote the incident playbooks clients relied on, and rolled out multiple security frameworks across 200+ assets.",
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

  /* ---------- Projects ----------
     Each project can have one or more images. With two or more, the
     card shows small buttons to switch between them.                  */
  projects: {
    labels: {
      client: "In association with",
      party: "Who it was for",
      did: "What I did",
      results: "Results",
      pmSkills: "Product skills used",
      views: "Choose an image",
      fullSize: "Open the full-size image in a new tab"
    },
    items: [
      {
        title: "Custom software for patient monitors",
        client: "Sri Chitra Tirunal Institute for Medical Sciences and Technology, Trivandrum",
        party: "5 clinicians running an intraoperative monitoring research study",
        badge: "IBS Award · Best Original Paper Presentation",
        images: [
          {
            src: "assets/images/project-bis-events.jpg",
            width: 1600,
            height: 867,
            alt: "Line chart of the AVGBIS signal over time with a dotted threshold line at 50. Three stretches where the signal stays below the threshold are shaded red and counted as significant events.",
            caption: "Detection output from the project report: three significant events flagged where the signal stays below its threshold.",
            tab: "Detection output"
          }
        ],
        did: [
          "Led product discovery and user interviews, acting as the main stakeholder liaison for 5 clinicians.",
          "Gathered requirements, defined user personas, and built a proof-of-concept anomaly-detection algorithm and visualization suite for hemodynamic signals, validated against hundreds of historical surgical cases.",
          "Translated Philips Intellivue Monitor data protocols into a Product Requirement Document (PRD), so two engineering teams could build directly on the findings with no extra discovery."
        ],
        results: [
          { value: "80%", label: "less time to detect an anomaly" },
          { value: "2", label: "engineering teams building from one PRD" }
        ],
        pmSkills: ["Product discovery", "User interviews", "Personas", "Requirements", "PRD"],
        link: {
          label: "Read the report",
          url: "https://github.com/SuryaNMenon/College-docs/blob/main/Bispectral_Index_Visualiser_Report-9.pdf"
        }
      },
      {
        title: "Campus network audit",
        client: "Government Engineering College, Barton Hill, Trivandrum",
        party: "10+ IT staff keeping the campus network running",
        badge: "",
        images: [
          {
            src: "assets/images/project-network-campus.jpg",
            width: 1800,
            height: 1027,
            alt: "Network diagram of the entire college, simulated in GNS3: a central switch connects by fiber and UTP links to department switches, labs and dozens of computers.",
            caption: "A GNS3 simulation of my undergraduate university’s entire network infrastructure.",
            tab: "Whole campus"
          }
        ],
        did: [
          "Led an end-to-end audit, from stakeholder scoping meetings to GNS3 network architecture diagrams.",
          "Ran a vulnerability assessment with Kali Linux tools, fixed 29 critical risks, and presented the findings with a remediation roadmap to the college’s stakeholders.",
          "Owned a zero-to-one proof of concept replacing the legacy firewall with pfSense, backed by a competitive analysis against the incumbent vendor."
        ],
        results: [
          { value: "60%", label: "less troubleshooting time" },
          { value: "29", label: "critical risks found and fixed" },
          { value: "$17,000", label: "in potential savings" },
          { value: "100%+", label: "future traffic growth supported" }
        ],
        pmSkills: ["Stakeholder scoping", "Competitive analysis", "Zero-to-one PoC", "Roadmap"],
        link: {
          label: "Read the report",
          url: "https://github.com/SuryaNMenon/College-docs/blob/main/Analysis_and_Audit_of_Campus_Network.pdf"
        }
      }
    ]
  },

  /* ---------- Education ---------- */
  education: {
    labels: {
      current: "In progress",
      done: "Graduated",
      courses: "Coursework",
      assistantships: "Assistantships",
      publication: "Publication"
    },
    schools: [
      {
        name: "Carnegie Mellon University",
        location: "Pittsburgh, PA",
        degree: "Master of Information Systems Management",
        date: "Dec 2027",
        current: true,
        highlights: ["25% merit scholarship"],
        assistantships: [
          { role: "Research Assistant", area: "Tech Policy Student Engagement & Outreach" },
          { role: "Teaching Assistant", area: "NoSQL Database Management" }
        ],
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
        highlights: ["GPA 3.84/4", "Ranked 10th statewide in the graduating cohort"],
        courses: [
          "Cryptography and Network Security",
          "Cyber and Network Forensics",
          "Network Science",
          "Management for Software Engineers"
        ],
        publication: {
          title: "Routing Algorithms for SDN Performance Optimization",
          venue: "IEEE ICCSC-10143010",
          // Link taken from the resume PDF:
          url: "https://ieeexplore.ieee.org/document/10143010",
          linkLabel: "Read on IEEE Xplore"
        },
        logoSrc: "assets/logos/gec-barton-hill.jpg",
        logoAlt: "Government Engineering College, Barton Hill logo",
        logoWidth: 400,
        logoHeight: 400
      }
    ]
  },

  /* ---------- Leadership (volunteering) ----------
     "featured" is the main role from the resume.
     "roles" are the earlier roles, most recent first.                 */
  leadership: {
    featured: {
      role: "Vice Chair, Information Management Committee",
      org: "IEEE Region 10 Asia Pacific",
      dates: "Dec 2024 – Jan 2026",
      summary: "I led a 5-member volunteer team spread across Asia-Pacific and drove our content strategy and student outreach.",
      teamLabel: "Team of 5",
      teamNote: "Volunteers across Asia-Pacific",
      stats: [
        { value: "5", label: "volunteers on the team" },
        { value: "65,000+", label: "annual impressions from our content" },
        { value: "4", label: "outreach events, engaging hundreds of students globally" }
      ]
    },
    earlierTitle: "Earlier IEEE roles",
    roles: [
      {
        role: "Social Media Manager, Information Management Committee",
        org: "IEEE Region 10 (Asia-Pacific Region)",
        dates: "Feb 2024 – Feb 2025",
        points: [],
        chipsLabel: "",
        chips: []
      },
      {
        role: "Secretary, Student-Young Professionals",
        org: "IEEE Computer Society Kerala Chapter",
        dates: "Feb 2023 – Feb 2024",
        points: [
          "Core organizer of the chapter’s major events, including SlashKey 3.0 and the All India Computer Society Student and Young Professionals Congress 2023.",
          "Worked with student leadership teams to coordinate student volunteers across Kerala for professional events."
        ],
        chipsLabel: "",
        chips: []
      },
      {
        role: "Content Curator",
        org: "IEEE Student Branch, GEC Barton Hill",
        dates: "Jan 2022 – Jan 2023",
        points: [
          "Led the teams drafting the student branch’s award and funding proposals, including the documentation behind the recognitions below.",
          "Mentored a group of content writers through the year and oversaw every content release from the student branch."
        ],
        chipsLabel: "Proposals and documentation I led",
        chips: [
          "Darrel Chong Student Activity Award 2022 (Gold)",
          "IEEE R10 Outstanding Student Branch Award 2022",
          "IEEE India Council Outstanding Student Volunteer 2022",
          "IEEE India Council Outstanding Volunteer 2022",
          "IEEE India Council Outstanding WiE Volunteer 2022",
          "IEEE CS Chapter Grants",
          "IEEE RAS Chapter Grants"
        ]
      }
    ]
  },

  /* ---------- Certifications & awards ---------- */
  achievements: {
    certGroupLabel: "Professional certifications",
    awardGroupLabel: "Awards and scholarships",
    certs: [
      { name: "Cisco Certified Network Associate", tag: "Networking", logoSrc: "assets/logos/cert-ccna.png", logoWidth: 299, logoHeight: 196, logoAlt: "Cisco Certified CCNA logo" },
      { name: "Google Professional Security Operations Engineer", tag: "Security operations", logoSrc: "assets/logos/cert-google-psoe.png", logoWidth: 256, logoHeight: 256, logoAlt: "Google Cloud Certified Professional Security Operations Engineer badge" },
      { name: "Google Professional Cloud Security Engineer", tag: "Cloud security", logoSrc: "assets/logos/cert-google-pcse.png", logoWidth: 256, logoHeight: 256, logoAlt: "Google Cloud Certified Professional Cloud Security Engineer badge" },
      { name: "Google Professional Cloud Network Engineer", tag: "Cloud networking", logoSrc: "assets/logos/cert-google-pcne.png", logoWidth: 256, logoHeight: 256, logoAlt: "Google Cloud Certified Professional Cloud Network Engineer badge" },
      { name: "Google Associate Cloud Engineer", tag: "Cloud engineering", logoSrc: "assets/logos/cert-google-ace.png", logoWidth: 256, logoHeight: 256, logoAlt: "Google Cloud Certified Associate Cloud Engineer badge" },
      { name: "Certified Ethical Hacker", tag: "Ethical hacking", logoSrc: "assets/logos/cert-ceh.png", logoWidth: 257, logoHeight: 194, logoAlt: "Certified Ethical Hacker logo" }
    ],
    awards: [
      { name: "IBS Award, Best Original Paper Presentation", tag: "Patient monitor study" },
      { name: "25% merit scholarship", tag: "Carnegie Mellon University" }
    ]
  },

  /* ---------- Skills ----------
     Add or remove skills inside a group. Empty groups are hidden.   */
  skills: {
    allLabel: "All",
    filterLabel: "Filter skills by category",
    countOne: "skill",
    countMany: "skills",
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
        items: ["Python", "SQL", "Terraform", "Artificial Intelligence (AI)", "Google Cloud Platform"]
      },
      {
        id: "secops",
        name: "Security operations",
        items: ["IAM", "SIEM", "SOAR", "Incident Response Management", "Google SecOps", "SOC Analysis"]
      },
      {
        id: "devops",
        name: "DevOps",
        items: ["CI/CD", "Jenkins", "Jenkins Plugin Manager", "Helm", "Bash"]
      }
    ]
  },

  /* ---------- Hobbies ----------
     "text" is the main paragraph. "aside" is an optional extra line.
     The d20 icon is a button: clicking it rolls the hidden die.        */
  hobbies: {
    rollLabel: "Roll the d20",
    items: [
      {
        icon: "d20",
        title: "Dungeons and Dragons",
        text: "I love this game enough to want everyone playing it. So I started a community back home to make it easier to get into, and grew it from 0 to 250 unique members organically.",
        aside: "Most of my adult money goes into collecting dice."
      },
      {
        icon: "controller",
        title: "Video games",
        text: "My dad introduced me to video games, and I grew up with them. One day I’ll probably pass my library on to my children.",
        aside: ""
      }
    ]
  },

  /* ---------- Contact ---------- */
  contact: {
    closing: "Hiring for Summer 2027, or just want to talk product and security? I’d love to hear from you.",
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
    thanks: "Thanks for making it this far! :)",
    backToTop: "Back to top"
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
