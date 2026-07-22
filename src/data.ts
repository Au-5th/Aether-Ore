export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  inventory: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  location: string;
}

export interface Product {
  id: string;
  code: string;
  title: string;
  category: string;
  price: number;
  subscriptionPrice: number;
  size: string;
  scent: string;
  description: string;
  ritual: string[];
  variants: ProductVariant[];
  image: string;
  images: string[];
  isFlagship: boolean;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  frequentlyBoughtWithIds: string[];
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: "prod_1",
    code: "AO-THF-01",
    title: "Anodized Titanium Flask",
    category: "Hardware",
    price: 120,
    subscriptionPrice: 96,
    size: "500ml",
    scent: "None",
    description: "Grade-5 vacuum-insulated tactical titanium flask with micro-milled tactile exterior grip. Engineered to survive Arctic storms and rocky drops alike without compromising heat retention.",
    ritual: [
      "Sterilize with boiling water prior to departure.",
      "Fill with active warm hydration brew or volcanic mineral infusion.",
      "Engage double-thread airtight security cap.",
      "Wipe clean after contact with high-altitude alpine ice."
    ],
    variants: [
      { id: "v1_raw", name: "Raw Brushed Titanium", sku: "THF-RAW-500", inventory: 42 },
      { id: "v1_basalt", name: "Anodized Basalt Black", sku: "THF-BSL-500", inventory: 15 },
      { id: "v1_copper", name: "Forged Copper Accent", sku: "THF-COP-500", inventory: 8 }
    ],
    image: "/assets/hero photograph of an anodized dark titanium flask with knurled copper cap.webp",
    images: [
      "/assets/hero photograph of an anodized dark titanium flask with knurled copper cap.webp",
      "/assets/Raw Brushed Titanium Flask Studio View.webp",
      "/assets/Anodized Basalt Black Titanium Flask View.webp",
      "/assets/Top-down macro studio shot of a knurled solid brass twist-cap mechanism on a dark basalt flask.webp",
      "/assets/an Arctic field researcher inspecting equipment inside a mountain shelter.webp"
    ],
    isFlagship: true,
    rating: 4.95,
    reviewCount: 148,
    reviews: [
      {
        id: "rev_101",
        author: "Capt. Soren Lindqvist",
        rating: 5,
        date: "2026-06-14",
        title: "Survived 14 Days on Denali Ridge",
        comment: "Zero heat loss across 8-hour sub-zero traverses. The knurled copper cap is effortless to operate with thick expedition gloves.",
        verified: true,
        location: "Troumsø, Norway"
      },
      {
        id: "rev_102",
        author: "Elena Rostova",
        rating: 5,
        date: "2026-05-29",
        title: "Pure Engineering Perfection",
        comment: "The raw brushed grade-5 titanium doesn't scratch or dent. Feels indestructible in hand.",
        verified: true,
        location: "Zurich, Switzerland"
      }
    ],
    frequentlyBoughtWithIds: ["prod_2", "prod_6"]
  },
  {
    id: "prod_2",
    code: "AO-VEB-02",
    title: "Basalt Volcanic Exfoliating Block",
    category: "Apothecary",
    price: 35,
    subscriptionPrice: 28,
    size: "150g",
    scent: "Bergamot & Smoked Ash",
    description: "Hand-poured block infused with Icelandic volcanic ash and crushed obsidian powder. Delivers supreme dermabrasion to strip urban pollution and industrial grime.",
    ritual: [
      "Activate block under high-temp streaming water.",
      "Work into a dense, charcoal-grey micro-lather.",
      "Apply in high-pressure circular motions over raw skin surfaces.",
      "Rinse with freezing water to close pores and lock in essential basalt minerals."
    ],
    variants: [
      { id: "v2_standard", name: "Standard Block", sku: "VEB-STD-150", inventory: 124 },
      { id: "v2_dual", name: "Dual-Grit Extreme (Coarse)", sku: "VEB-EXT-150", inventory: 56 }
    ],
    image: "/assets/Basalt Volcanic Exfoliating Block Studio View.webp",
    images: [
      "/assets/Basalt Volcanic Exfoliating Block Studio View.webp",
      "/assets/a dark anodized skincare bottle sitting next to crushed black obsidian rocks and a single iceberg water droplet.webp",
      "/assets/basalt rocks resting in shallow icy water with subtle copper mineral veins.webp",
      "/assets/knolling flat lay photograph of disassembled skincare packaging.webp"
    ],
    isFlagship: false,
    rating: 4.88,
    reviewCount: 92,
    reviews: [
      {
        id: "rev_201",
        author: "Marcus Thorne",
        rating: 5,
        date: "2026-07-02",
        title: "Strips Industrial Grime Effortlessly",
        comment: "After working with industrial lubricants all day, this is the only bar that cleans skin completely without drying it out.",
        verified: true,
        location: "Reykjavík, Iceland"
      }
    ],
    frequentlyBoughtWithIds: ["prod_6", "prod_3"]
  },
  {
    id: "prod_3",
    code: "AO-TBC-03",
    title: "Thermophile Alpine Barrier Cream",
    category: "Skincare",
    price: 48,
    subscriptionPrice: 38,
    size: "50ml",
    scent: "Pine Needle & Cedarwood",
    description: "Water-resistant lipid shield enriched with deep-sea extreme thermophiles. Creates a second-skin micro-barrier that completely halts windburn and frost-induced cellular damage.",
    ritual: [
      "Warm a dime-sized amount between palms until oil liquefies.",
      "Press firmly onto high-exposure facial zones (cheeks, bridge of nose).",
      "Apply 15 minutes before wind or freezing exposure.",
      "Reapply post-ascent or when skin temperature drops."
    ],
    variants: [
      { id: "v3_standard", name: "Single Tube", sku: "TBC-STD-50", inventory: 89 },
      { id: "v3_heavy", name: "Heavy Expedition Jar", sku: "TBC-JAR-100", inventory: 30 }
    ],
    image: "/assets/Isolated commercial studio shot of AETHER & ORE Glacial Barrier Balm.webp",
    images: [
      "/assets/Isolated commercial studio shot of AETHER & ORE Glacial Barrier Balm.webp",
      "/assets/close-up macro photograph of a dense, frosted cream emulsion being scooped by a brushed titanium spatula.webp",
      "/assets/Close-up shot of a man's hands with clean cuticles applying dense barrier cream onto his cheekbones.webp",
      "/assets/three matte black refillable skincare pods encased in a dark wool felt travel wrap.webp"
    ],
    isFlagship: false,
    rating: 4.92,
    reviewCount: 116,
    reviews: [
      {
        id: "rev_301",
        author: "Aris Vance",
        rating: 5,
        date: "2026-06-20",
        title: "No More Windburn",
        comment: "Tested on sub-zero ski tours in northern Sweden. Completely stopped wind chapping on cheeks.",
        verified: true,
        location: "Kiruna, Sweden"
      }
    ],
    frequentlyBoughtWithIds: ["prod_5", "prod_1"]
  },
  {
    id: "prod_4",
    code: "AO-CHB-04",
    title: "Tactile Carbon Hand Balm",
    category: "Apothecary",
    price: 24,
    subscriptionPrice: 19,
    size: "75ml",
    scent: "Smoked Vetiver",
    description: "High-absorption, non-greasy conditioning compound containing micro-carbon molecules. Increases friction coefficient while restoring damaged skin tissue on worked hands.",
    ritual: [
      "Massage generously into palms, knuckle joints, and split fingertips.",
      "Allow 60 seconds for complete carbon absorption.",
      "Optimal before climbing, heavy lifting, or technical handling.",
      "Re-apply at night for intensive cell recovery."
    ],
    variants: [
      { id: "v4_standard", name: "Aluminium Squeeze Tube", sku: "CHB-ALU-75", inventory: 240 }
    ],
    image: "/assets/Tactile Carbon Hand Balm Tube View.webp",
    images: [
      "/assets/Tactile Carbon Hand Balm Tube View.webp",
      "/assets/Clean studio profile view of an anodized titanium skincare bottle.webp",
      "/assets/close-up macro photograph of a dense, frosted cream emulsion being scooped by a brushed titanium spatula.webp",
      "/assets/Close-up shot of a man's hands with clean cuticles applying dense barrier cream onto his cheekbones.webp"
    ],
    isFlagship: false,
    rating: 4.87,
    reviewCount: 64,
    reviews: [
      {
        id: "rev_401",
        author: "Liam K.",
        rating: 5,
        date: "2026-05-18",
        title: "Climber Essential",
        comment: "Restores torn calluses overnight without leaving oily residue on gear.",
        verified: true,
        location: "Innsbruck, Austria"
      }
    ],
    frequentlyBoughtWithIds: ["prod_2", "prod_1"]
  },
  {
    id: "prod_5",
    code: "AO-UIS-05",
    title: "UV-Hazard Glacier Shield",
    category: "Skincare",
    price: 40,
    subscriptionPrice: 32,
    size: "60ml",
    scent: "Unscented / Mineral",
    description: "Physical broad-spectrum SPF 50+ mineral screen. Specifically engineered to bounce dangerous high-altitude UV rays and intense reflective glacial glare.",
    ritual: [
      "Apply evenly across face and neck areas.",
      "Use under protective goggles to prevent sweat run-off.",
      "Reapply every 2 hours on glacier fields.",
      "Remove at night with Volcanic Exfoliating Block."
    ],
    variants: [
      { id: "v5_standard", name: "Active Flask Dispenser", sku: "UIS-FLK-60", inventory: 98 }
    ],
    image: "/assets/UV-Hazard Glacier Shield Dispenser Studio View.webp",
    images: [
      "/assets/UV-Hazard Glacier Shield Dispenser Studio View.webp",
      "/assets/a hand holding a dark aluminum flask under a freezing alpine waterfall.webp",
      "/assets/frozen glacial water crystals expanding under a polarized light microscope.webp",
      "/assets/landscape photography of windswept sub-zero alpine mountain peaks.webp"
    ],
    isFlagship: false,
    rating: 4.91,
    reviewCount: 88,
    reviews: [
      {
        id: "rev_501",
        author: "Dr. K. Lindberg",
        rating: 5,
        date: "2026-06-30",
        title: "Glacier Radiation Protection",
        comment: "Zero sunburn on high-altitude snowfields. Does not run into eyes when sweating.",
        verified: true,
        location: "Chamonix, France"
      }
    ],
    frequentlyBoughtWithIds: ["prod_3", "prod_1"]
  },
  {
    id: "prod_6",
    code: "AO-MTV-06",
    title: "Milled Brass Travel Vault",
    category: "Hardware",
    price: 85,
    subscriptionPrice: 68,
    size: "Fits 150g Soap",
    scent: "None",
    description: "Indestructible marine-grade brass container milled to 0.02mm tolerances. Features high-tactile cross-knurling and dual drainage gaskets to store soap blocks dry in transit.",
    ritual: [
      "Rinse soap block and shake excess moisture off.",
      "Place flat inside the milled vault grid.",
      "Screw thread fully down to engage airtight gasket seals.",
      "Wipe exterior clean with dry canvas cloth."
    ],
    variants: [
      { id: "v6_raw", name: "Raw Milled Brass", sku: "MTV-BRS-150", inventory: 12 },
      { id: "v6_black", name: "Cerakote Tactical Black", sku: "MTV-BLK-150", inventory: 22 }
    ],
    image: "/assets/Milled Brass Travel Vault Studio View.webp",
    images: [
      "/assets/Milled Brass Travel Vault Studio View.webp",
      "/assets/Top-down macro studio shot of a knurled solid brass twist-cap mechanism on a dark basalt flask.webp",
      "/assets/three matte black refillable skincare pods encased in a dark wool felt travel wrap.webp"
    ],
    isFlagship: false,
    rating: 4.96,
    reviewCount: 105,
    reviews: [
      {
        id: "rev_601",
        author: "Henrik V.",
        rating: 5,
        date: "2026-07-10",
        title: "Built Like a Tank",
        comment: "The threads are liquid smooth and keep the soap block bone dry inside my duffel bag.",
        verified: true,
        location: "Oslo, Norway"
      }
    ],
    frequentlyBoughtWithIds: ["prod_2", "prod_1"]
  }
];

export const BRAND_SYSTEM = {
  tagline: "FORMULATED FOR THE BORDERLAND OF WATER AND ROCK",
  manifesto: "We do not formulate for cosmetic vanity. We forge protective barriers for extreme physical environments. Born from Alpine fjords, refined through engineering, AETHER & ORE supplies high-performance dermatological armor and machined lifestyle hardware designed to outlast the user. Our zero-compromise formula features volcanic minerals, deep sea thermophiles, and grade-5 titanium architecture.",
  colors: [
    { name: "Basalt Slate", hex: "#0B0D0E", desc: "The primary obsidian dark canvas of all packaging." },
    { name: "Canvas White", hex: "#F0F4F8", desc: "Clean off-white contrasting typeface for tactical markings." },
    { name: "Forged Copper", hex: "#D96B43", desc: "Accent of heat-treated metals and premium technical detailing." },
    { name: "Nordic Navy", hex: "#0A1C36", desc: "Deep oceanic color denoting liquid hydration barriers." },
    { name: "Hazard Red", hex: "#D01C24", desc: "Status indicators, critical alerts, and high-exposure warnings." }
  ],
  typography: {
    display: "Monument Extended (Industrial display, raw mechanical strength, wide tracking)",
    body: "Inter (Supreme digital readability, neutral geometric frame)",
    mono: "JetBrains Mono (Technical telemetry values, SKU markings, and ingredient logs)"
  },
  packaging: {
    vessel: "Drawn impact-extruded aluminum tubes with deep screw threads.",
    outer: "100% recycled unbleached kraft board lined with water-soluble natural binder.",
    marking: "Laser-etched high-fidelity batch stamps and geographic coordinates."
  }
};

export const MIDJOURNEY_PROMPTS = [
  {
    title: "Hero Banner Asset",
    prompt: "Anodized tactical grade-5 titanium flask with micro-milled exterior grip, resting on frosted Icelandic basalt rock. Behind it, breathtaking Nordic alpine fjords with icy water and dramatic low-lying fog, dramatic cinematic sunlight cutting through heavy dark storm clouds. Epic atmosphere, cold temperature color grade, hyper-realistic, photorealistic, 8k resolution, extreme details, shot on 35mm lens, f/8, split lighting --ar 16:9"
  },
  {
    title: "PDP Multi-Angle Suite: Studio Clean Front View",
    prompt: "Aether & Ore Anodized Titanium Flask, centered in studio light. Clean, perfectly level front angle shot. Placed on flat raw textured slate block, completely matte black background. Studio directional lighting highlighting the knurled metal textures and technical white printed brand lettering. Photorealistic, clean crisp focus, commercial product photography, 8k --ar 4:3"
  },
  {
    title: "PDP Multi-Angle Suite: 360/Side Profile",
    prompt: "Detailed side profile shot of Aether & Ore tactical flask showing the double-threaded airtight screw cap, tactile steel security wire, and precision laser-etched GPS coordinates at the neck. Industrial design showcase, highly polished macro photography, soft dramatic side key-light, matte dark grey concrete background --ar 4:3"
  },
  {
    title: "PDP Multi-Angle Suite: Micro-Texture Closeup",
    prompt: "Macro extreme close up shot of titanium metal surface knurling of an e-commerce tactical container. Beautiful texture detail showing raw metallic imperfections, anodized volcanic charcoal finish, and laser engraving lines. Sharp focal plane, extremely shallow depth of field, metallic glints, award-winning industrial design close up --ar 4:3"
  },
  {
    title: "PDP Multi-Angle Suite: Exploded Knolling Flat Lay",
    prompt: "Deconstructed exploded view flat lay of an industrial skincare bottle and machined steel cap. Precision alignment of components: titanium body, inner silicone double-seal gasket, metal spring, threaded nozzle. Placed on blueprint drafting paper with technical line grids. Symmetrical, surgical clean layout, architectural product knolling, studio lighting --ar 4:3"
  },
  {
    title: "Lifestyle & Editorial Campaign",
    prompt: "Rugged Nordic alpine climber with weather-beaten face, climbing a dark granite rock wall in high winds. Natural hard direct sunlight casting dramatic high-contrast shadows. Clothed in high-tech minimalist black gear. Deep emotional grit, realistic skin details, atmospheric dust particles, dramatic raw adventure photography --ar 16:9"
  },
  {
    title: "Mobile-First Storefront UI Render",
    prompt: "High-fidelity UI UX mobile screen mockup displaying e-commerce app dark mode. Screen displays Aether & Ore brand product with buy buttons, minimalist clean spacing, bold sans-serif lettering, absolute dark mode Basalt Slate background, crisp vivid contrast, iPhone 16 Pro mockup isolated on clean slate stone --ar 9:16"
  }
];

export const FLOW_AUTOMATIONS = [
  {
    id: "flow_1",
    name: "VIP Segmenter & Elite Vanguard Allocation",
    trigger: "Order Created",
    condition: "Customer Total Spend >= $1,000 OR Order contains Flagship Flask and Apothecary Vault",
    action: "Add Shopify Customer Tag 'VIP_VANGUARD', update custom metafield 'vanguard_status' to 'Elite Active', and queue custom email dispatching private invitations to next-cycle hardware drops.",
    impact: "Boosts 12-Month LTV by 38% through prestige loop reinforcement and exclusive access."
  },
  {
    id: "flow_2",
    name: "High-Risk Fraud Escrow & Auto-Hold",
    trigger: "Order Paid",
    condition: "Shopify Risk Analysis Level == 'HIGH' OR (Shipping Country != Billing Country AND Total Amount > $500)",
    action: "Transition order to Hold fulfillment state. Tag 'RISK_ESCROW', send immediate Slack notification to Fraud Mitigation Lead, and freeze digital inventory allocation to avoid chargeback loss.",
    impact: "Reduces fraud chargebacks to <0.02% of total enterprise volume."
  },
  {
    id: "flow_3",
    name: "Automated B2B Restock PO Drafts",
    trigger: "Inventory Levels Updated",
    condition: "Product Stock Level <= 10 units AND Product Variant contains SKU 'THF-'",
    action: "Trigger draft Purchase Order creation inside ERP system, email automated fulfillment notification to Baltic manufacturing plant with bulk packaging manifest and pre-filled logistics sheet.",
    impact: "Ensures flagship items maintain 99.8% in-stock availability without human intervention."
  }
];

export const CASE_STUDY_METRICS = {
  overview: "AETHER & ORE migrated from a standard monolithic commerce setup to a Shopify Plus headless high-performance edge network combined with custom Rust-compiled checkout discount functions. This case study details the 6-month pre vs post migration telemetry.",
  metrics: [
    { label: "Overall Conversion Rate (CR)", before: "1.84%", after: "3.12%", lift: "+69.5%", metric: "percentage" },
    { label: "Mobile Conversion Rate", before: "1.12%", after: "2.45%", lift: "+118.7%", metric: "percentage" },
    { label: "Average Order Value (AOV)", before: "$54.20", after: "$88.50", lift: "+63.3%", metric: "currency" },
    { label: "Checkout Completion Rate", before: "68.2%", after: "82.4%", lift: "+20.8%", metric: "percentage" },
    { label: "Customer Lifetime Value (12-Mo LTV)", before: "$112.00", after: "$194.00", lift: "+73.2%", metric: "currency" },
    { label: "6-Mo Subscription Retention", before: "34.0%", after: "61.5%", lift: "+80.8%", metric: "percentage" },
    { label: "Lighthouse Performance Score", before: "45", after: "98", lift: "+117.8%", metric: "score" }
  ],
  learnings: [
    { title: "LCP Reductions Yield Immediate CRO", text: "Preloading the main above-the-fold Hero panel and lazy loading subsequent collection grids dropped our LCP to 0.95 seconds. Mobile bounce rates immediately fell from 58% to 22%." },
    { title: "One-Click Upsells Maximize Vault Uptake", text: "By using Checkout Extensibility with dynamic, tiered progress bars in the AJAX cart slideout, over 28% of customers added the Milled Brass Travel Vault ($85) to their order to unlock the 'free gift tier'." },
    { title: "Rust Checkout Functions Eliminate Discount Lag", text: "Standard script calculators used to cause a 150ms-300ms layout delay in checkout totals. Migrating to server-side Rust WASM Shopify Functions reduced execution to 1.8ms, preventing checkout drop-offs." }
  ]
};
