export type NavItem = {
  label: string;
  href: string;
};

export type ExpertiseItem = {
  name: string;
  description: string;
};

export type ServiceItem = {
  number: string;
  title: string;
  description: string;
};

export type ProjectItem = {
  name: string;
  category: string;
  description: string;
  technology: string[];
  accent: string;
  features: string[];
  preview: "warehouse" | "mobile" | "inventory" | "pos" | "guard";
};

export const personalProfile = {
  name: "Hamza Imtiaz",
  location: "Karachi, Pakistan",
  title: "Software Developer | Web & Mobile App Developer",
  intro: "Building digital experiences through code, creativity, and technology.",
  about:
    "I am Hamza Imtiaz, a software developer passionate about creating modern digital experiences. My work focuses on web applications, mobile applications, and custom software solutions.",
  email: "hello@hamzaimtiaz.dev",
  linkedinUrl: "https://www.linkedin.com/in/your-profile",
  githubUrl: "https://github.com/Hamza-bug",
  whatsappUrl: "https://wa.me/0000000000",
  cvUrl: "",
  navItems: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Expertise", href: "#expertise" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ] as NavItem[],
  expertise: [
    {
      name: "JavaScript",
      description:
        "Modern JavaScript development for interactive interfaces, scalable frontend systems, and product-focused experiences.",
    },
    {
      name: "Angular",
      description:
        "Structured application architecture and robust component-driven development for enterprise-grade experiences.",
    },
    {
      name: "React.js",
      description:
        "Fast, dynamic user interfaces built with component reusability, performance awareness, and modern patterns.",
    },
    {
      name: "React Native",
      description:
        "Cross-platform mobile applications with smooth experiences across devices and touch-first product flows.",
    },
    {
      name: "Next.js",
      description:
        "Production-ready web experiences powered by server rendering, SEO support, and polished user journeys.",
    },
    {
      name: "Node.js",
      description:
        "Reliable backend logic, APIs, and product infrastructure designed to support real-world business needs.",
    },
  ] as ExpertiseItem[],
  services: [
    {
      number: "01",
      title: "Website Development",
      description:
        "High-impact websites designed for performance, clarity, and brand presence across modern digital channels.",
    },
    {
      number: "02",
      title: "Web Application Development",
      description:
        "Custom web products and dashboards built to streamline processes, improve workflows, and support business growth.",
    },
    {
      number: "03",
      title: "Mobile Application Development",
      description:
        "Responsive mobile experiences tailored for convenience, usability, and business-driven functionality.",
    },
    {
      number: "04",
      title: "Frontend Development",
      description:
        "Clean, maintainable interfaces with thoughtful UX, strong interaction design, and production-level quality.",
    },
    {
      number: "05",
      title: "Backend Development",
      description:
        "Reliable APIs, logic layers, and system integrations that keep digital products stable and scalable.",
    },
    {
      number: "06",
      title: "Custom Software Development",
      description:
        "Tailored software solutions designed around practical business workflows and modern technical standards.",
    },
  ] as ServiceItem[],
  projects: [
    {
      name: "ONESHIP",
      category: "Warehouse & Order Management",
      description:
        "A complete warehouse and order management platform designed to manage warehouse operations and order workflows.",
      technology: ["JavaScript", "Angular", "Node.js"],
      accent: "from-sky-500/30 via-cyan-400/20 to-transparent",
      preview: "warehouse",
      features: [
        "Warehouse operations management",
        "Order workflow automation",
        "Operational reporting and visibility",
      ],
    },
    {
      name: "DEALER360",
      category: "Mobile Application",
      description:
        "A React Native mobile application designed for buying and selling cars.",
      technology: ["React Native", "JavaScript"],
      accent: "from-violet-500/30 via-fuchsia-400/20 to-transparent",
      preview: "mobile",
      features: [
        "Vehicle listing and discovery",
        "Buyer and seller workflow",
        "Mobile-first user experience",
      ],
    },
    {
      name: "INVENTORY360",
      category: "Auto Parts Management",
      description:
        "A React Native application focused on providing car parts.",
      technology: ["React Native", "JavaScript"],
      accent: "from-emerald-500/30 via-teal-400/20 to-transparent",
      preview: "inventory",
      features: [
        "Parts catalog and inventory flow",
        "Product search and management",
        "Mobile inventory operations",
      ],
    },
    {
      name: "POS SYSTEM",
      category: "Desktop Point of Sale",
      description:
        "A complete offline-first desktop Point of Sale application built using JavaScript.",
      technology: ["JavaScript", "Offline-first"],
      accent: "from-amber-500/30 via-orange-400/20 to-transparent",
      preview: "pos",
      features: [
        "Offline-first transaction handling",
        "Retail workflow management",
        "Fast sales operations",
      ],
    },
    {
      name: "GUARDWATCH",
      category: "Visitor Management SaaS",
      description:
        "A visitor management SaaS platform for gated communities with QR-based access and resident notifications.",
      technology: ["React.js", "Node.js"],
      accent: "from-red-500/30 via-rose-400/20 to-transparent",
      preview: "guard",
      features: [
        "QR-based visitor passes",
        "Guard mobile application",
        "Resident notifications",
        "Management dashboard and visitor logs",
      ],
    },
  ] as ProjectItem[],
};

export const socialLinks = [
  { label: "GitHub", href: personalProfile.githubUrl },
  { label: "LinkedIn", href: personalProfile.linkedinUrl },
  { label: "Email", href: `mailto:${personalProfile.email}` },
  { label: "WhatsApp", href: personalProfile.whatsappUrl },
];
