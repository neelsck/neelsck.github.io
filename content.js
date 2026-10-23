// Everything on the site lives here. Edit this file to change what the palette shows.
//
// The palette opens on `home`: a short list of categories and commands.
// Opening a category shows its entries in the results and its overview in the preview.
//
// Category:
//   id           also the link: neelsck.github.io/#projects
//   title        name in the results
//   subtitle     grey text next to the name in the results
//   description  intro shown at the top of the category's page
//   icon         one of: user, build, work, research, award, mail, link, copy, file
//
// Item (an entry inside a category, or a top-level command like About):
//   id        also the link: neelsck.github.io/#healthbridge
//   category  which category it belongs to (leave out for top-level items)
//   title     name in the results
//   subtitle  short grey text next to the name in the results
//   meta      small text on the right of the row (a year, "active", "AGU 2025")
//   icon      optional; defaults to the category's icon
//   keywords  extra words that should find this item in search
//   eyebrow   small line above the title in the preview
//   lede      one-sentence summary under the title
//   image     optional { src: "assets/file.png", alt: "what it shows" }
//   stats     optional [{ value, label }]
//   body      optional paragraphs
//   facts     optional [{ label, value }] rows
//   links     optional [{ label, url }]  (links without a url are hidden)
//   action    optional "copy-email" (makes the item do something)
//
// Light/dark mode is the icon in the palette's bottom bar, not a search item.

window.SITE = {
  name: "Neel Kansara",
  email: "kansara@berkeley.edu",

  // What the results show before anyone types, in order.
  home: ["about", "projects", "work", "research", "awards", "contact"],

  categories: [
    {
      id: "projects",
      title: "Projects",
      subtitle: "Startups, hackathons, builds",
      description: "Companies, products, hackathon builds and a nonprofit I've founded or led.",
      icon: "build"
    },
    {
      id: "work",
      title: "Work & internships",
      subtitle: "Product, ML and research roles",
      description: "Product and machine learning roles at a clinical AI startup and NASA, and research internships at Dartmouth, George Mason and UC Irvine.",
      icon: "work"
    },
    {
      id: "research",
      title: "Research",
      subtitle: "Papers, preprints and talks",
      description: "Machine learning on messy biological and scientific data: EEG, antibodies and satellite observations.",
      icon: "research"
    },
    {
      id: "awards",
      title: "Awards",
      subtitle: "Honors, scholarships and wins",
      description: "Scholarships, competition wins and recognition, most recent first.",
      icon: "award"
    },
    {
      id: "contact",
      title: "Contact & links",
      subtitle: "Email, LinkedIn, GitHub, resume",
      description: "Best for health startups, AI in clinical settings, research collaborations and internships.",
      icon: "mail"
    }
  ],

  items: [
    {
      id: "about",
      title: "About",
      subtitle: "Who I am and what I'm working on",
      icon: "user",
      keywords: "bio who me neel berkeley student intro",
      eyebrow: "about",
      lede: "I build software for healthcare. Right now that means Healthbridge, which writes EMT reports in real time.",
      body: [
        "I study Bioengineering and EECS at Berkeley. Before college I did ML research at NASA and Dartmouth, and shipped a few products of my own.",
        "This site works like a command palette. Open a section to see what's inside, or type to search everything."
      ],
      facts: [
        { label: "based in", value: "Berkeley, CA" },
        { label: "studying", value: "Bioengineering + EECS, class of 2030" },
        { label: "into", value: "health AI, agents, startups" }
      ]
    },

    // Hidden: never listed, only found by typing one of its `triggers` exactly.
    {
      id: "go-bears",
      hidden: true,
      triggers: ["go bears", "oski", "fiat lux", "golden bears", "cal bears"],
      title: "Go Bears",
      subtitle: "You found it",
      icon: "user",
      eyebrow: "37.8721° N, 122.2578° W",
      lede: "Fiat lux. Let there be light.",
      body: [
        "Written somewhere between Soda Hall and Bechtel, usually after the Campanile had already rung midnight."
      ]
    },

    // ---------- Projects ----------
    {
      id: "healthbridge",
      category: "projects",
      title: "Healthbridge",
      subtitle: "Live EMT reporting and triage",
      meta: "active",
      keywords: "startup company ems emt health ai llm founder ceo medical assistant",
      eyebrow: "founder & CEO · Jun 2024 – now",
      lede: "Live EMT report building and triage, connected directly to the hospital EMR.",
      image: null,
      stats: [
        { value: "90%", label: "reports accepted" },
        { value: "10", label: "pilot clinics" },
        { value: "$50K", label: "angel funding" },
        { value: "6", label: "engineers" }
      ],
      body: [
        "An LLM system drafts the run report while the paramedic is still with the patient, so they review instead of type. I raised the first round from angels and recruited engineers from IIT, UCLA and MIT."
      ],
      links: []
    },
    {
      id: "sell2agents",
      category: "projects",
      title: "Sell2Agents",
      subtitle: "1st place, YC agents hackathon",
      meta: "2026",
      keywords: "hackathon y combinator yc agents mcp seller negotiation stripe armature ecommerce first place",
      eyebrow: "hackathon · Y Combinator “Make Something Agents Want” · 1st place",
      lede: "Seller agents that negotiate with AI buying agents, so vendors win when ChatGPT or Claude is doing the shopping.",
      stats: [
        { value: "1st", label: "best agent experience" },
        { value: "64%", label: "deals closed vs 41%" },
        { value: "24h", label: "build time" }
      ],
      body: [
        "Sell2Agents plugs into a store over MCP. Instead of one list price, the seller agent negotiates with each buying agent, never goes below the floor the vendor sets, and gets better with every negotiation. Run live against real buyer agents, it closed 64% of deals versus 41% for a static listing.",
        "Built in 24 hours with Vivan Doshi, Esha Verma and Ananya Pradhan, on Manufact, Stripe, Armature and Inkbox."
      ],
      links: []
    },
    {
      id: "robodojo",
      category: "projects",
      title: "RoboDojo",
      subtitle: "Memory for robot agents",
      meta: "2026",
      keywords: "hackathon y combinator yc robotics robot arm memory agents physical intelligence memorable gbrain award",
      eyebrow: "hackathon · YC “Own Your Intelligence” · Memorable track award",
      lede: "A sparring ground where agents compete in parallel sandboxes to solve physical tasks on a simulated robot arm.",
      stats: [
        { value: "225", label: "builders competing" },
        { value: "Award", label: "Memorable track" }
      ],
      body: [
        "Memorable holds the episodic memory: every attempt, every miss, and why. GBrain holds the procedural memory: the winning strategy is distilled into a skill that future agents start from instead of a blank prompt. A scoring layer picks the winner on task completion, time, collisions and energy."
      ],
      links: []
    },
    {
      id: "medilingua",
      category: "projects",
      title: "MediLingua",
      subtitle: "Emergency interpreter app",
      meta: "2023",
      keywords: "app translation whisper language congressional app challenge capitol",
      eyebrow: "founder & lead developer · Sep 2023 – Jun 2025",
      lede: "Emergency speech interpretation in 50+ languages.",
      stats: [
        { value: "50+", label: "languages" },
        { value: "1st", label: "Congressional App Challenge" },
        { value: "1,000+", label: "Capitol demo audience" }
      ],
      body: [
        "A full-stack app on Whisper and the OpenAI API that interprets speech during emergencies. It won the 2023 Congressional App Challenge in Illinois's 16th District, and I demoed it at the U.S. Capitol."
      ],
      links: []
    },
    {
      id: "voluntier",
      category: "projects",
      title: "VolunTier",
      subtitle: "Congressional App Challenge",
      meta: "2021",
      keywords: "app volunteer congressional app challenge new jersey",
      eyebrow: "app · 2021",
      lede: "Won the 2021 Congressional App Challenge in New Jersey's 11th District.",
      links: []
    },
    {
      id: "bytebuilders",
      category: "projects",
      title: "ByteBuilders",
      subtitle: "Free CS education nonprofit",
      meta: "nonprofit",
      keywords: "nonprofit education teaching cs 501c3",
      eyebrow: "co-founder & president · Mar 2023 – now",
      lede: "A 501(c)(3) teaching computer science for free.",
      stats: [
        { value: "5,600+", label: "members" },
        { value: "$80K+", label: "free instruction" },
        { value: "200+", label: "officers" }
      ],
      body: [
        "We grew internationally through corporate and NGO partnerships, including an education partnership with orphanages through GSNP+."
      ],
      links: []
    },
    {
      id: "frc",
      category: "projects",
      title: "FRC Team 115",
      subtitle: "Monta Vista Robotics",
      meta: "robotics",
      keywords: "robotics frc first worlds swerve monta vista",
      eyebrow: "VP of engineering · Oct 2022 – May 2026",
      lede: "Two trips to the FRC World Championships.",
      body: [
        "I led every engineering division, wrote control software and machined a swerve drivetrain. I also directed our FLL outreach program, reaching 100+ students across the Bay Area."
      ]
    },

    // ---------- Work & internships ----------
    {
      id: "qualified-health",
      category: "work",
      title: "Qualified Health",
      subtitle: "Clinical AI product intern",
      meta: "2026",
      keywords: "internship product clinical ai databricks sql pm enterprise health systems",
      eyebrow: "clinical AI product intern · Jun – Aug 2026 · Palo Alto",
      lede: "Took a core product from concept to pilot at a 200-person clinical AI startup.",
      stats: [
        { value: "3", label: "health systems" },
        { value: "$125M", label: "Series B startup" }
      ],
      body: [
        "I was the direct contact for physicians and administrators at Mercy, Sanford Health and Emory. I built a HIPAA-compliant Databricks and SQL pipeline feeding live KPI dashboards, then an LLM tool that maps every product into reusable tasks for the PM team and Chief Medical Officer."
      ]
    },
    {
      id: "nasa",
      category: "work",
      title: "NASA",
      subtitle: "Machine learning intern, GLOBE",
      meta: "2025",
      keywords: "internship machine learning ml clustering globe climate mosaic agu",
      eyebrow: "machine learning intern · May 2025 – Jan 2026 · remote",
      lede: "Built MOSAIC, an unsupervised pipeline that flags anomalies in GLOBE mission data.",
      stats: [
        { value: "millions", label: "observations" },
        { value: "AGU", label: "first-author talk" }
      ],
      body: [
        "MOSAIC classifies unlabeled geospatial temperature points and was benchmarked against scientist-labeled ground truth. The wider team now uses it, and I presented the results as first author at the AGU 2025 Annual Meeting in New Orleans."
      ],
      links: []
    },
    {
      id: "dartmouth",
      category: "work",
      title: "Dartmouth",
      subtitle: "Research intern, Ackerman Lab",
      meta: "2023",
      keywords: "internship research thayer dartmouth ackerman lab immunology antibody igg4 vaccine r statistics",
      eyebrow: "research intern · Thayer School of Engineering · Jul 2023 – Jan 2026",
      lede: "Statistical analysis of antibody profiling data on maternal-to-fetal immunity after mRNA vaccination.",
      body: [
        "I ran statistical analysis in R on high-dimensional antibody data across pregnant and non-pregnant cohorts, shaped the manuscript's central findings and made its figures. The work became a preprint under review at the Journal of Virology and an oral presentation at the MADI annual meeting at Yale."
      ]
    },
    {
      id: "george-mason",
      category: "work",
      title: "George Mason University",
      subtitle: "Exoplanet researcher",
      meta: "2025",
      keywords: "internship research exoplanets astronomy habitable george mason gmu",
      eyebrow: "student researcher · May – Aug 2025 · remote",
      lede: "Searching for habitable exoplanets.",
      body: []
    },
    {
      id: "uc-irvine",
      category: "work",
      title: "UC Irvine",
      subtitle: "ML student researcher",
      meta: "2024",
      keywords: "internship research eeg stroke pca logistic regression irvine brainwave",
      eyebrow: "machine learning student researcher · Jun – Aug 2024 · Irvine",
      lede: "Predicting emergency stroke diagnoses from EEG.",
      stats: [
        { value: "0.90", label: "AUC" },
        { value: "500+", label: "poster audience" }
      ],
      body: [
        "PCA filtered noisy signals before logistic regression, giving assistive triage far faster than standard stroke detection. I presented the work as a poster to 500+ attendees and designed the residential program's website."
      ]
    },

    // ---------- Research ----------
    {
      id: "igg4",
      category: "research",
      title: "Late IgG4 induction",
      subtitle: "mRNA vaccine antibodies",
      meta: "bioRxiv",
      keywords: "paper publication preprint immunology vaccine covid dartmouth ackerman journal of virology",
      eyebrow: "preprint · bioRxiv · May 2026 · co-author · under review at J. Virology",
      lede: "Late Induction of IgG4 Following SARS-CoV-2 mRNA Vaccination in Pregnant and Non-Pregnant Individuals Includes Clonotypes Raised Early in the Response.",
      body: [
        "From my work in the Ackerman Lab at Dartmouth. Presented orally at the MADI annual meeting at Yale."
      ],
      links: []
    },
    {
      id: "mosaic",
      category: "research",
      title: "MOSAIC",
      subtitle: "Anomaly detection",
      meta: "AGU 2025",
      keywords: "paper publication anomaly clustering first author nasa geospatial temperature",
      eyebrow: "paper · American Geophysical Union · Jul 2025 · first author · oral",
      lede: "Metadata Optimization and Statistical Anomaly Detection Using Unsupervised Clustering for Geospatial Temperature Data.",
      body: [
        "Compares unsupervised methods for classifying unlabeled NASA GLOBE mission data. Presented as an oral talk at the AGU Annual Meeting in New Orleans."
      ],
      links: []
    },
    {
      id: "asd-eeg",
      category: "research",
      title: "ASD recognition in EEG",
      subtitle: "Filtering-driven CNN",
      meta: "IEEE 2024",
      keywords: "paper publication eeg cnn autism first author icce consumer electronics",
      eyebrow: "paper · IEEE ICCE · Feb 2024 · first author",
      lede: "Enhancing Autism Spectrum Disorder Recognition in EEG Data Through a Filtering-Driven CNN Approach.",
      stats: [
        { value: "92%+", label: "accuracy" },
        { value: "Best", label: "session presentation" }
      ],
      links: []
    },

    // ---------- Awards ----------
    {
      id: "award-yc-agents",
      category: "awards",
      title: "YC hackathon, 1st place",
      subtitle: "Sell2Agents",
      meta: "2026",
      keywords: "award hackathon y combinator yc first place winner agents sell2agents armature prize",
      eyebrow: "Y Combinator · “Make Something Agents Want” · Armature track",
      lede: "First place for best agent experience, with a $2K prize, for Sell2Agents.",
      body: [
        "Built in 24 hours with Vivan Doshi, Esha Verma and Ananya Pradhan."
      ]
    },
    {
      id: "award-yc-memorable",
      category: "awards",
      title: "YC hackathon, track award",
      subtitle: "RoboDojo",
      meta: "2026",
      keywords: "award hackathon y combinator yc memorable track robodojo own your intelligence",
      eyebrow: "Y Combinator · “Own Your Intelligence” · Memorable track",
      lede: "Award in the Memorable track for RoboDojo, among 225 builders.",
      body: []
    },
    {
      id: "award-afrotc",
      category: "awards",
      title: "AFROTC Type 4 Scholarship",
      subtitle: "Department of the Air Force",
      meta: "2026",
      keywords: "award scholarship air force rotc afrotc type 4 technical",
      eyebrow: "scholarship · Department of the Air Force · Jan 2026",
      lede: "Type 4 Technical Air Force ROTC Scholarship.",
      stats: [
        { value: "$36K", label: "per year" }
      ]
    },
    {
      id: "award-national-merit",
      category: "awards",
      title: "National Merit Finalist",
      subtitle: "Top <1% of PSAT takers",
      meta: "2025",
      keywords: "award scholarship national merit finalist psat",
      eyebrow: "National Merit Scholarship Corporation · Jan 2025",
      lede: "National Merit Scholarship Finalist, in the top 1% of PSAT takers nationally.",
      stats: [
        { value: "<1%", label: "nationally" }
      ]
    },
    {
      id: "award-ieee",
      category: "awards",
      title: "Best Session Presentation",
      subtitle: "IEEE ICCE",
      meta: "2024",
      keywords: "award ieee icce best session presentation consumer electronics eeg autism",
      eyebrow: "Institute of Electrical and Electronics Engineers · Jan 2024",
      lede: "Best Session Presentation Award at the IEEE International Conference on Consumer Electronics.",
      body: [
        "Recognized for technical communication and research significance among peer-reviewed conference papers, for my first-author paper on recognizing autism spectrum disorder in EEG data."
      ]
    },
    {
      id: "award-cac-2023",
      category: "awards",
      title: "Congressional App Challenge",
      subtitle: "1st place, MediLingua · 2023",
      keywords: "award congressional app challenge first place winner medilingua capitol illinois lahood",
      eyebrow: "U.S. House of Representatives · Dec 2023",
      lede: "First place in Rep. Darin LaHood's district, Illinois's 16th, for MediLingua.",
      body: [
        "I led the team and demoed the app at the U.S. Capitol."
      ]
    },
    {
      id: "award-cac-2021",
      category: "awards",
      title: "Congressional App Challenge",
      subtitle: "1st place, VolunTier · 2021",
      keywords: "award congressional app challenge first place winner voluntier new jersey sherrill",
      eyebrow: "U.S. House of Representatives · Dec 2021",
      lede: "First place in Rep. Mikie Sherrill's district, New Jersey's 11th, for VolunTier."
    },
    {
      id: "award-frc-worlds",
      category: "awards",
      title: "FRC World Championships",
      subtitle: "Qualified twice, Team 115",
      meta: "2×",
      keywords: "award robotics frc first world championships worlds qualifier monta vista",
      eyebrow: "FIRST Robotics Competition · Monta Vista Robotics",
      lede: "Qualified for the FRC World Championships twice with Team 115."
    },

    // ---------- Contact & links ----------
    {
      id: "email",
      category: "contact",
      title: "Copy email",
      subtitle: "kansara@berkeley.edu",
      meta: "copy",
      icon: "copy",
      keywords: "contact email reach hire talk message",
      eyebrow: "email",
      lede: "kansara@berkeley.edu",
      body: [
        "Best for health startups, AI in clinical settings, research collaborations and internships."
      ],
      action: "copy-email"
    },
    {
      id: "linkedin",
      category: "contact",
      title: "LinkedIn",
      subtitle: "Full work history",
      meta: "link",
      icon: "link",
      keywords: "linkedin profile",
      eyebrow: "elsewhere",
      lede: "My full work history and everything else.",
      links: [{ label: "Open LinkedIn", url: "https://www.linkedin.com/in/neel-kansara-17689525b/" }]
    },
    {
      id: "github",
      category: "contact",
      title: "GitHub",
      subtitle: "github.com/neelsck",
      meta: "link",
      icon: "link",
      keywords: "github code repos",
      eyebrow: "elsewhere",
      lede: "Code and side projects.",
      links: [{ label: "Open GitHub", url: "https://github.com/neelsck" }]
    },
    {
      id: "resume",
      category: "contact",
      title: "Resume",
      subtitle: "One page, PDF",
      meta: "pdf",
      icon: "file",
      keywords: "resume cv pdf download",
      eyebrow: "resume",
      lede: "One page: experience, ventures, publications and awards.",
      links: []
    }
  ]
};
