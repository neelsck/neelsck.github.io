// Everything on the site lives here. Edit this file to change what the palette shows.
//
// Each item:
//   id        short name, also the link: neelkansara.com/#id
//   group     which section it sits under (see `groups` below)
//   title     name in the list
//   hint      small grey text on the right of the list row
//   keywords  extra words that should find this item in search
//   eyebrow   small line above the title in the preview
//   lede      one-sentence summary under the title
//   image     optional { src: "assets/file.png", alt: "what it shows" }
//   stats     optional [{ value, label }]
//   body      optional paragraphs
//   facts     optional [{ label, value }] rows
//   links     optional [{ label, url }]
//   action    optional "copy-email" | "theme" (makes the item do something)

window.SITE = {
  name: "Neel Kansara",
  tagline: "Software for healthcare · Bioengineering + EECS at Berkeley",
  status: "building Healthbridge",
  email: "kansara@berkeley.edu",
  updated: "Oct 2026",

  groups: ["Start here", "Building", "Work", "Research", "Actions"],

  items: [
    {
      id: "about",
      group: "Start here",
      title: "About Neel",
      hint: "intro",
      keywords: "bio who me neel berkeley student",
      eyebrow: "about",
      lede: "I build software for healthcare. Right now that means Healthbridge, which writes EMT reports in real time.",
      image: null,
      body: [
        "I study Bioengineering and EECS at Berkeley. Before college I did ML research at NASA and Dartmouth, and shipped a few products of my own.",
        "Everything on this site lives in this one card. Click an item or use the arrow keys to look around, or start typing."
      ],
      facts: [
        { label: "based in", value: "Berkeley, CA" },
        { label: "studying", value: "Bioengineering + EECS, class of 2030" },
        { label: "into", value: "health AI, clinical data, startups" }
      ]
    },

    {
      id: "healthbridge",
      group: "Building",
      title: "Healthbridge",
      hint: "active",
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
      group: "Building",
      title: "MediLingua",
      hint: "2023",
      keywords: "app translation whisper language congressional",
      eyebrow: "founder & lead developer · 2023 – 2025",
      lede: "Emergency speech interpretation in 50+ languages.",
      image: null,
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
      group: "Building",
      title: "ByteBuilders",
      hint: "nonprofit",
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
      group: "Building",
      title: "FRC Team 115",
      hint: "robotics",
      keywords: "robotics frc first worlds swerve",
      eyebrow: "VP of engineering · 2022 – 2026",
      lede: "Two trips to the FRC World Championships.",
      body: [
        "I led every engineering division, wrote control software and machined a swerve drivetrain. I also ran our FLL outreach program for 100+ Bay Area students."
      ]
    },

    {
      id: "qualified-health",
      group: "Work",
      title: "Qualified Health",
      hint: "2026",
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
      group: "Work",
      title: "NASA",
      hint: "2025",
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

    {
      id: "mosaic",
      group: "Research",
      title: "MOSAIC",
      hint: "AGU 2025",
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
      group: "Research",
      title: "ASD recognition in EEG",
      hint: "IEEE 2024",
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
      group: "Research",
      title: "Late IgG4 induction",
      hint: "bioRxiv",
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
      group: "Research",
      title: "Stroke triage from EEG",
      hint: "UCI 2024",
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

    {
      id: "email",
      group: "Actions",
      title: "Copy email",
      hint: "action",
      keywords: "contact email reach hire talk message",
      eyebrow: "contact",
      lede: "kansara@berkeley.edu",
      body: [
        "Best for health startups, AI in clinical settings, research collaborations and internships."
      ],
      action: "copy-email"
    },
    {
      id: "links",
      group: "Actions",
      title: "GitHub & LinkedIn",
      hint: "links",
      keywords: "github linkedin social code profile",
      eyebrow: "elsewhere",
      lede: "Code on GitHub, everything else on LinkedIn.",
      links: [
        { label: "GitHub", url: "https://github.com/neelsck" },
        { label: "LinkedIn", url: "https://www.linkedin.com/in/neel-kansara-17689525b/" }
      ]
    },
    {
      id: "theme",
      group: "Actions",
      title: "Switch theme",
      hint: "light / dark",
      keywords: "theme dark light mode appearance",
      eyebrow: "appearance",
      lede: "Change how the site looks. Your choice is remembered on this device.",
      action: "theme"
    }
  ]
};
