const navLinks = [
  {
    name: "Home",
    link: "#hero",
  },
  {
    name: "Projects",
    link: "#work",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "About",
    link: "#about",
  },
];

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 6, suffix: "+", label: "Years of Coding" },
  { value: 1.5, suffix: "+", label: "Years Professional Experience" },
  { value: 30, suffix: "+", label: "Completed Projects" },
  { value: 3, suffix: " ", label: "MVPs Launched" },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
  },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Quality Focus",
    desc: "Delivering high-quality results while maintaining attention to every detail.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Reliable Communication",
    desc: "Keeping you updated at every step to ensure transparency and clarity.",
  },
  {
    imgPath: "/images/time.png",
    title: "On-Time Delivery",
    desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
  },
];

const techStackImgs = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
];

const techStackIcons = [
  {
    name: "C++ Developer",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python Developer",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Manager",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    review:
      "Built a computer-vision pipeline to automate hydrophobicity analysis for biomedical surfaces. Integrated real-time droplet detection/angle estimation with a lightweight UI to streamline lab workflows and data capture.",
    imgPath: "/images/UM2.jpeg",
    logoPath: "/images/M.png",
    title: "Software Developer / Researcher",
    date: "May 2025 - August 2025",
    responsibilities: [
      "Designed OpenCV + Haar Cascade pipeline for contact-angle measurement; reduced manual error ~40%.",
      "Trained/validated classifiers on annotated biomedical datasets (catheter/ECMO tubing) to predict SNAT solubility.",
      "Built a web UI to configure tests, auto-log metadata, and standardize lab runs.",
      "Contributed methods/results to a peer-reviewed clinical publication on biomedical surface analysis.",
    ],
  },
  {
    review:
      "Consulted via Michigan Data Science Team to model baggage scan timing and distribution types across U.S. airports. Delivered ML prototypes that informed resource planning at major hubs.",
    imgPath: "/images/AA2.png",
    logoPath: "/images/AA.png",
    title: "Full Stack Developer",
    date: "Jan 2025 - May 2025",
    responsibilities: [
      "Built/tuned MLPClassifier to classify scan-time distributions; improved turnaround prediction accuracy.",
      "Ran EDA at scale with Snowflake SQL to surface station/hub patterns and peak risks.",
      "Mitigated class imbalance via clustering + resampling; improved model generalization ~25%.",
      "Shipped Random Forest baselines with engineered temporal features for robust out-of-sample performance.",
      "Presented findings to AA stakeholders; models piloted at Phoenix/Dallas for staffing + surge planning.",
    ],
  },
  {
    review:
      "Led ML/NLP features for an AI real-estate MVP that automates document analysis and buyer support. Combined LLMs with rule-based checks to flag risk and draft compliant outputs.",
    imgPath: "/images/HS2.jpeg",
    logoPath: "/images/H.png",
    title: "Software Engineer",
    date: "Jul 2024 - Feb 2025",
    responsibilities: [
      "Built Python backend with ML + LLM pipelines for disclosure parsing (TDS/SDN) and risk extraction.",
      "Automated draft generation for agreements and summaries; saved buyers ≈$10K per transaction on average.",
      "Implemented intake, metadata tagging, and retrieval flows for fast, auditable responses.",
      "Secured $15K non-dilutive funding (Dare to Dream, Fuel Startup, Michigan Business Challenge).",
    ],
  },
  {
    review:
      "Co-founded a hyper-local advertising startup paying homeowners to host digital displays. Built the content and monitoring infra; grew a pilot network across Ann Arbor.",
    imgPath: "/images/HS2.", // <- looks like a typo in your original path; confirm your asset name
    logoPath: "/images/AV.png",
    title: "Co-Founder",
    date: "Jul 2023 - Apr 2024",
    responsibilities: [
      "Won Lurie Institute Startup Grant; recruited and onboarded 10+ residential hosts.",
      "Designed/installed screen hardware; built backend to monitor content delivery/uptime.",
      "Ran geo-targeted campaigns for local SMBs; improved neighborhood brand visibility up to ~25%.",
      "Managed client ops, placements, and reporting to validate CAC/LTV for a scalable model.",
    ],
  },
];

const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];

const testimonials = [
  {
    name: "Esther Howard",
    mentions: "@estherhoward",
    review:
      "I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Wade Warren",
    mentions: "@wadewarren",
    review:
      "Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Guy Hawkins",
    mentions: "@guyhawkins",
    review:
      "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Marvin McKinney",
    mentions: "@marvinmckinney",
    review:
      "Adrian was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that’s both modern and easy to navigate. Fantastic work overall.",
    imgPath: "/images/client5.png",
  },
  {
    name: "Floyd Miles",
    mentions: "@floydmiles",
    review:
      "Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional!",
    imgPath: "/images/client4.png",
  },
  {
    name: "Albert Flores",
    mentions: "@albertflores",
    review:
      "Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend and backend dev are top-notch.",
    imgPath: "/images/client6.png",
  },
];

const socialImgs = [
  {
    name: "insta",
    imgPath: "/images/insta.png",
  },
  {
    name: "fb",
    imgPath: "/images/fb.png",
  },
  {
    name: "x",
    imgPath: "/images/x.png",
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
