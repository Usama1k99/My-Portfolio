import { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  personal: {
    name: "Syed Usama",
    headline: "ServiceNow Developer & Software Engineer",
    bio: "Computer Science Engineer with 1 year of hands-on enterprise experience as a ServiceNow Developer at Cynosure Technologies. Specialized in CMDB architecture, Common Service Data Model (CSDM), ITOM workflows, and modern web application engineering.",
    location: "Hyderabad, Telangana, India",
    email: "usama1k999@gmail.com",
    githubUsername: "Usama1k99",
    experienceYears: "1 Year",
    status: "ServiceNow Developer at Cynosure Technologies",
    resumePdfPath: "/Syed_Usama_CV_new.pdf",
  },

  experience: [
    {
      company: "Cynosure Technologies",
      role: "ServiceNow Developer",
      location: "Hyderabad, India",
      period: "2025 – Present",
      duration: "1 Year",
      description: "Spearheading enterprise ServiceNow implementations with a focus on CMDB health, data architecture, and workflow automation.",
      highlights: [
        "Architected and maintained enterprise CMDB aligned with the ServiceNow Common Service Data Model (CSDM 4.0) framework.",
        "Configured Identification and Reconciliation Engine (IRE) rules to eliminate duplicates and maintain CI data integrity.",
        "Engineered automated workflows, Flow Designer actions, Business Rules, Client Scripts, and Script Includes.",
        "Constructed REST integrations connecting ServiceNow with enterprise monitoring and infrastructure systems."
      ],
      technologies: ["ServiceNow", "CMDB", "CSDM", "ITOM", "JavaScript", "Flow Designer", "REST APIs"]
    }
  ],

  certifications: [
    {
      name: "ServiceNow CIS-DF",
      code: "CIS-DF",
      fullName: "Certified Implementation Specialist – Data Foundations (CMDB & CSDM)",
      issuer: "ServiceNow",
      status: "Active",
      skillsCovered: [
        "CMDB Health & Architecture",
        "Common Service Data Model (CSDM 4.0)",
        "Identification & Reconciliation Engine (IRE)",
        "Data Governance & Lifecycle Management"
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor of Technology (B.Tech) / B.E.",
      field: "Computer Science & Engineering",
      institution: "Shadan College of Engineering and Technology",
      location: "Hyderabad, Telangana",
      completionYear: 2025,
      status: "Completed",
      highlights: [
        "Completed engineering degree curriculum in 2025 covering Data Structures, Algorithms, Networks, and Systems.",
        "Engineered capstone projects in applied cryptography, security tooling, and distributed automation."
      ]
    }
  ],

  skills: [
    {
      category: "Enterprise ServiceNow",
      description: "Core platform development and data architecture",
      skills: [
        { name: "CMDB & CSDM 4.0 Architecture", level: "Advanced" },
        { name: "ServiceNow Scripting (Client & Server)", level: "Advanced" },
        { name: "Flow Designer & Workflow Studio", level: "Proficient" },
        { name: "IRE & Data Foundations", level: "Advanced" },
        { name: "REST API Integration", level: "Proficient" }
      ]
    },
    {
      category: "Frontend & Web Engineering",
      description: "Core web standards, responsive UI, and styling",
      skills: [
        { name: "HTML / HTML5", level: "Advanced" },
        { name: "CSS / CSS3", level: "Advanced" },
        { name: "JavaScript (ES6+)", level: "Advanced" },
        { name: "Bootstrap", level: "Proficient" },
        { name: "Tailwind CSS", level: "Advanced" }
      ]
    },
    {
      category: "Backend & Systems",
      description: "Server architecture, cryptography, and automation",
      skills: [
        { name: "Python & Django", level: "Advanced" },
        { name: "Node.js & Express", level: "Advanced" },
        { name: "C++ & C", level: "Proficient" },
        { name: "MongoDB", level: "Proficient" },
        { name: "Git & Version Control", level: "Advanced" }
      ]
    }
  ],

  projects: [
    {
      id: "encryptify",
      title: "Encryptify (encsite) — Cryptographic Suite",
      category: "Web Engineering",
      language: "Python / Django",
      description: "Full-stack cryptographic web platform and core algorithm suite integrating custom block ciphers, image pixel scrambling, steganography, and multi-cipher text encryption.",
      technicalDetails: [
        "1MB Enigmatrix block cipher utilizing 1024x1024 NumPy uint8 matrix permutations, multi-round XOR masks, and reversible modular arithmetic.",
        "Image Encryptor engine with deterministic 32-bit PRNG seed derivation for reversible cryptographic pixel scrambling.",
        "Steganography engine (Steganos) embedding encrypted payloads into RGB image channels with signature headers.",
        "Python & Django web architecture with modular REST endpoints and interactive cipher playgrounds."
      ],
      githubUrl: "https://github.com/Usama1k99/Encryptify",
      liveUrl: "https://github.com/Usama1k99/Encryptify",
      featured: true,
      tags: ["Python", "Django", "NumPy", "Cryptography", "Steganography", "Security"]
    },
    {
      id: "enigmatrix",
      title: "Enigmatrix Cryptographic Suite",
      category: "Web Engineering",
      language: "TypeScript / React",
      description: "Modern cryptography playground and cipher suite implementing multi-stage algorithmic encryptions, hashing verification, and visual transformation workflows.",
      technicalDetails: [
        "Multi-algorithm visual transformation supporting classic and modern encryption routines.",
        "Zero external tracking, client-side browser execution using Web Cryptography API.",
        "Sub-millisecond transformation times with high-density cryptographic metrics."
      ],
      githubUrl: "https://github.com/Usama1k99/Enigmatrix",
      liveUrl: "https://github.com/Usama1k99/Enigmatrix",
      featured: true,
      tags: ["TypeScript", "React", "Cryptography", "Security"]
    },
    {
      id: "darkpad",
      title: "DarkPad Minimalist Editor",
      category: "Desktop App",
      language: "JavaScript / Node.js",
      description: "Distraction-free dark mode text editor tailored for developers and technical writers, with local auto-save, syntax highlighting, and zero latency.",
      technicalDetails: [
        "Instant keystroke rendering with custom virtualized buffer management.",
        "Air-gapped local storage with automatic periodic state snapshots.",
        "Engineered with dark slate UI avoiding visual fatigue during late-night coding sessions."
      ],
      githubUrl: "https://github.com/Usama1k99/DarkPad",
      liveUrl: "https://github.com/Usama1k99/DarkPad",
      featured: true,
      tags: ["JavaScript", "Desktop GUI", "Productivity", "Slate UI"]
    },
    {
      id: "encryptor",
      title: "Encryptor Desktop Security Tool",
      category: "Desktop App",
      language: "Python",
      description: "Cryptographic desktop application implementing an expanded polyalphabetic substitution algorithm over an extended ASCII domain.",
      technicalDetails: [
        "Extended character mapping beyond standard 26 alphabets to full ASCII character range.",
        "Custom key matrix generation with reversible transformation passes.",
        "Native desktop GUI built for cross-platform file and text encryption."
      ],
      githubUrl: "https://github.com/Usama1k99/Encryptor",
      liveUrl: "https://github.com/Usama1k99/Encryptor",
      featured: true,
      tags: ["Python", "Cryptography", "Desktop GUI", "Security"]
    },
    {
      id: "password-manager",
      title: "Offline Password Manager",
      category: "Desktop App",
      language: "Python",
      description: "Local, air-gapped credential vault utilizing automated cryptographic key derivation and zero-cloud encrypted local storage.",
      technicalDetails: [
        "Zero external network dependencies ensuring complete privacy and isolation from cloud leaks.",
        "Automated cryptographic salt and key generation flow.",
        "Encrypted local database with secure master key authentication."
      ],
      githubUrl: "https://github.com/Usama1k99/Offline-Password-Manager",
      liveUrl: "https://github.com/Usama1k99/Offline-Password-Manager",
      featured: true,
      tags: ["Python", "Security", "Local Storage", "Encryption"]
    },
    {
      id: "discord-bot",
      title: "Discord Bot Automation Engine",
      category: "Backend / Bot",
      language: "Python",
      description: "Multi-functional asynchronous community automation bot backed by MongoDB for persistent state management and command telemetry.",
      technicalDetails: [
        "Asynchronous event loop handling concurrent user interactions across servers.",
        "MongoDB persistent document store for configuration, moderation logs, and user state.",
        "Modular command handler architecture designed for horizontal feature expansion."
      ],
      githubUrl: "https://github.com/Usama1k99/Discord-Bot-using-py",
      featured: false,
      tags: ["Python", "MongoDB", "AsyncIO", "API Integration"]
    },
    {
      id: "ciphers",
      title: "Ciphers & 2-Layered Decipher Engine",
      category: "Systems / C++",
      language: "C++",
      description: "High-performance console application executing multi-pass polyalphabetic cipher routines with low memory overhead.",
      technicalDetails: [
        "Dual-pass algorithmic transformation with variable offset key vectors.",
        "Optimized C++ memory allocation and direct pointer character buffer operations.",
        "Comprehensive CLI interface with automated encoding and decoding verification."
      ],
      githubUrl: "https://github.com/Usama1k99/Cipher-Decipher-using-Cpp",
      featured: false,
      tags: ["C++", "Algorithms", "Cryptography", "CLI"]
    }
  ],

  socials: [
    {
      platform: "GitHub",
      url: "https://github.com/Usama1k99",
      handle: "Usama1k99",
      iconName: "Github"
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/syed-usama-190697228/",
      handle: "Syed Usama",
      iconName: "Linkedin",
      disabled: true
    },
    {
      platform: "Email",
      url: "mailto:usama1k999@gmail.com",
      handle: "usama1k999@gmail.com",
      iconName: "Mail"
    }
  ]
};
