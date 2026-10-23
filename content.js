// Everything on the site lives here. Edit this file to change what the palette shows.
//
// The palette opens on `home`: a short list of categories and commands.
// Opening a category shows its entries in the results and its overview in the preview.
//
// Category:
//   id           also the link: neelsck.github.io/#building
//   title        name in the results
//   subtitle     grey text next to the name in the results
//   description  intro shown at the top of the category's page
//   icon         one of: user, build, work, research, mail, moon, link, copy
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
  home: ["about", "building", "work", "research", "contact"],

  categories: [
    {
      id: "building",
      title: "Building",
      subtitle: "Startups and projects",
      description: "Companies, products and a nonprofit I've founded or led.",
      icon: "build"
    },
    {
      id: "work",
      title: "Work",
      subtitle: "Internships and roles",
      description: "Product and machine learning roles, at a clinical AI startup and at NASA.",
      icon: "work"
    },
    {
      id: "research",
      title: "Research",
      subtitle: "Papers, labs and talks",
      description: "Machine learning on messy biological and scientific data: EEG, antibodies and satellite observations.",
      icon: "research"
    },
    {
      id: "contact",
      title: "Contact",
      subtitle: "Email, GitHub, LinkedIn",
      description: "Best for health startups, AI in clinical settings, research collaborations and internships.",
      icon: "mail"
    }
  ],

  items: [
    {
      id: "about",
      title: "About Neel",
      subtitle: "Who I am and what I'm working on",
      icon: "user",
      keywords: "bio who me neel berkeley student intro",
      eyebrow: "about",
      lede: "I build software for healthcare. Right now that means Healthbridge, which writes EMT reports in real time.",
      body: [
        "I study Bioengineering and EECS at Berkeley. Before college I did ML research at NASA and Dartmouth, and shipped a few products of my own.",
        "This site works like a command palette. Open a category to see what's inside, or type to search everything."
      ],
      facts: [
        { label: "based in", value: "Berkeley, CA" },
        { label: "studying", value: "Bioengineering + EECS, class of 2030" },
        { label: "into", value: "health AI, clinical data, startups" }
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

    // ---------- Building ----------
    {
      id: "healthbridge",
      category: "building",
      title: "Healthbridge",
      subtitle: "Live EMT reporting and triage",
      meta: "active",
      keywords: "startup company ems emt health ai llm founder ceo",
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
      id: "medilingua",
      category: "building",
      title: "MediLingua",
      subtitle: "Emergency interpreter, 50+ languages",
      meta: "2023",
      keywords: "app translation whisper language congressional",
      eyebrow: "founder & lead developer · 2023 – 2025",
      lede: "Emergency speech interpretation in 50+ languages.",
      stats: [
        { value: "50+", label: "languages" },
        { value: "1st", label: "Congressional App Challenge" }
      ],
      body: [
        "A full-stack app on Whisper and the OpenAI API that interprets speech during emergencies. It won the 2023 Congressional App Challenge, and I demoed it at the U.S. Capitol."
      ],
      links: []
    },
    {
      id: "bytebuilders",
      category: "building",
      title: "ByteBuilders",
      subtitle: "Free CS education nonprofit",
      meta: "nonprofit",
      keywords: "nonprofit education teaching cs 501c3",
      eyebrow: "co-founder & president · 2023 – now",
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
      category: "building",
      title: "FRC Team 115",
      subtitle: "Robotics, VP of engineering",
      meta: "2022",
      keywords: "robotics frc first worlds swerve",
      eyebrow: "VP of engineering · 2022 – 2026",
      lede: "Two trips to the FRC World Championships.",
      body: [
        "I led every engineering division, wrote control software and machined a swerve drivetrain. I also ran our FLL outreach program for 100+ Bay Area students."
      ]
    },

    // ---------- Work ----------
    {
      id: "qualified-health",
      category: "work",
      title: "Qualified Health",
      subtitle: "Clinical AI product intern",
      meta: "2026",
      keywords: "internship product clinical ai databricks sql pm",
      eyebrow: "clinical AI product intern · summer 2026 · Palo Alto",
      lede: "Took a core product from concept to pilot at a 200-person clinical AI startup.",
      stats: [
        { value: "3", label: "health systems" },
        { value: "daily", label: "automated data pulls" }
      ],
      body: [
        "I was the direct contact for physicians and administrators at Mercy, Sanford Health and Emory. I built a HIPAA-compliant Databricks and SQL pipeline feeding live KPI dashboards, then an LLM tool that maps every product into reusable tasks for the PM team and CMO."
      ]
    },
    {
      id: "nasa",
      category: "work",
      title: "NASA",
      subtitle: "Machine learning intern, GLOBE",
      meta: "2025",
      keywords: "internship machine learning ml clustering globe climate mosaic",
      eyebrow: "machine learning intern · May 2025 – Jan 2026 · remote",
      lede: "Built MOSAIC, an unsupervised pipeline that flags anomalies in GLOBE mission data.",
      stats: [
        { value: "millions", label: "observations" },
        { value: "AGU", label: "first-author talk" }
      ],
      body: [
        "MOSAIC classifies unlabeled geospatial temperature points and was benchmarked against scientist-labeled ground truth. The wider team now uses it."
      ],
      links: []
    },

    // ---------- Research ----------
    {
      id: "mosaic",
      category: "research",
      title: "MOSAIC",
      subtitle: "Unsupervised anomaly detection",
      meta: "AGU 2025",
      keywords: "paper publication anomaly clustering first author nasa",
      eyebrow: "paper · AGU 2025 · first author · oral",
      lede: "Metadata Optimization and Statistical Anomaly Detection Using Unsupervised Clustering for Geospatial Temperature Data.",
      body: [
        "Compares unsupervised methods for classifying unlabeled mission data. Presented as an oral talk at the AGU Annual Meeting in New Orleans."
      ],
      links: []
    },
    {
      id: "asd-eeg",
      category: "research",
      title: "ASD recognition in EEG",
      subtitle: "Filtering-driven CNN",
      meta: "IEEE 2024",
      keywords: "paper publication eeg cnn autism first author",
      eyebrow: "paper · IEEE ICCE 2024 · first author",
      lede: "Enhancing Autism Spectrum Disorder Recognition in EEG Data Through a Filtering-Driven CNN Approach.",
      stats: [
        { value: "92%+", label: "accuracy" },
        { value: "Best", label: "session presentation" }
      ],
      links: []
    },
    {
      id: "igg4",
      category: "research",
      title: "Late IgG4 induction",
      subtitle: "Antibody response to mRNA vaccines",
      meta: "bioRxiv",
      keywords: "paper publication immunology vaccine covid dartmouth ackerman",
      eyebrow: "preprint · bioRxiv 2026 · co-author · under review at J. Virology",
      lede: "Late Induction of IgG4 Following SARS-CoV-2 mRNA Vaccination in Pregnant and Non-Pregnant Individuals Includes Clonotypes Raised Early in the Response.",
      body: [
        "From my work in the Ackerman Lab at Dartmouth, running statistical analysis in R on high-dimensional antibody profiling data. Presented orally at the MADI annual meeting at Yale."
      ],
      links: []
    },
    {
      id: "stroke-eeg",
      category: "research",
      title: "Stroke triage from EEG",
      subtitle: "PCA and logistic regression",
      meta: "UCI 2024",
      keywords: "eeg stroke pca logistic regression irvine",
      eyebrow: "student researcher · UC Irvine · summer 2024",
      lede: "Predicting emergency stroke diagnoses from EEG.",
      stats: [
        { value: "0.90", label: "AUC" },
        { value: "500+", label: "poster audience" }
      ],
      body: [
        "PCA filtered noisy signals before logistic regression, giving triage far faster than standard stroke detection."
      ]
    },

    // ---------- Contact ----------
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
      id: "linkedin",
      category: "contact",
      title: "LinkedIn",
      subtitle: "Full work history",
      meta: "link",
      icon: "link",
      keywords: "linkedin profile resume cv",
      eyebrow: "elsewhere",
      lede: "My full work history and everything else.",
      links: [{ label: "Open LinkedIn", url: "https://www.linkedin.com/in/neel-kansara-17689525b/" }]
    }
  ]
};
