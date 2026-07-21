import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingBag,
  Sliders,
  Database,
  Cpu,
  Layers,
  Activity,
  Check,
  ChevronRight,
  Plus,
  Minus,
  Trash2,
  Copy,
  FileCode,
  Terminal,
  ArrowRight,
  Clock,
  ShieldAlert,
  Sparkles,
  Sun,
  Wind,
  Zap,
  BookOpen,
  Award,
  Coins,
  Truck,
  Info,
  X,
  Building2
} from "lucide-react";
import { PRODUCTS_DATA, BRAND_SYSTEM, MIDJOURNEY_PROMPTS, FLOW_AUTOMATIONS, CASE_STUDY_METRICS, Product, ProductVariant } from "./data";
import { CODEBASE_FILES, CodeFile } from "./codebaseData";

export default function App() {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState<"storefront" | "codebase" | "architecture" | "case-study">("storefront");
  
  // Cart State (stored in localStorage for premium persistent headless experience)
  const [cart, setCart] = useState<Array<{
    product: Product;
    variant: ProductVariant;
    quantity: number;
    isSubscription: boolean;
  }>>(() => {
    const saved = localStorage.getItem("aether_ore_cart");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [cartOpen, setCartOpen] = useState(false);
  const [cartBump, setCartBump] = useState(false);

  // Sync Cart to localStorage
  useEffect(() => {
    localStorage.setItem("aether_ore_cart", JSON.stringify(cart));
  }, [cart]);

  // Dynamic Announcement Bar State
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const announcements = [
    "FORMULATED FOR THE BORDERLAND OF WATER AND ROCK",
    "ENTERPRISE VIP: METAFIELED 'VIP_VANGUARD' REWARDS DETECTED",
    "SHIPPED WORLDWIDE WITH EXPEDITION-GRADE SATCOM TELEMETRY"
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Sticky bottom bar visibility
  const [showStickyBar, setShowStickyBar] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── PILLAR 3: Lead-Capture Popup — 10s idle OR 50% scroll depth ──────────
  // Stores permanent dismissal flag in localStorage so it never re-triggers.
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const leadCaptureTriggered = useRef(false);

  const dismissLeadCapture = useCallback(() => {
    setShowLeadCapture(false);
    localStorage.setItem("ao_lead_dismissed", "1");
  }, []);

  useEffect(() => {
    // Never show if already dismissed permanently
    if (localStorage.getItem("ao_lead_dismissed")) return;

    let idleTimer: ReturnType<typeof setTimeout>;

    const triggerOnce = () => {
      if (leadCaptureTriggered.current) return;
      leadCaptureTriggered.current = true;
      setShowLeadCapture(true);
    };

    // Trigger 1: 10 second idle
    idleTimer = setTimeout(triggerOnce, 10000);

    // Trigger 2: 50% scroll depth — passive listener, no layout cost
    const handleLeadScroll = () => {
      const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPct >= 0.5) triggerOnce();
    };
    window.addEventListener("scroll", handleLeadScroll, { passive: true });

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener("scroll", handleLeadScroll);
    };
  }, []);

  // ─── PILLAR 5: Global ESC key handler — closes cart drawer + modal ─────────
  // Modal state declared here so it's available to the ESC handler below
  const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);
  const [modalActiveImage, setModalActiveImage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedProductDetails) {
          setSelectedProductDetails(null);
          setModalActiveImage(null);
        } else if (cartOpen) {
          setCartOpen(false);
        } else if (showLeadCapture) {
          dismissLeadCapture();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [cartOpen, selectedProductDetails, showLeadCapture, dismissLeadCapture]);

  // ─── PILLAR 5: Focus trap for product modal ────────────────────────────────
  // When modal opens, focus it. When it closes, return focus to the trigger.
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const openProductProtocol = (product: Product) => {
    lastFocusedElement.current = document.activeElement as HTMLElement;
    setSelectedProductDetails(product);
    setModalActiveImage(product.image);
    // Defer focus to after render
    requestAnimationFrame(() => {
      modalRef.current?.focus();
    });
  };

  const closeModal = useCallback(() => {
    setSelectedProductDetails(null);
    setModalActiveImage(null);
    lastFocusedElement.current?.focus();
  }, []);
  // Fast-Lane Hero Selector State
  const flagshipProduct = PRODUCTS_DATA[0]; // Flask
  const [heroSubscription, setHeroSubscription] = useState(false);
  const [heroVariant, setHeroVariant] = useState<ProductVariant>(flagshipProduct.variants[0]);
  const [heroQuantity, setHeroQuantity] = useState(1);
  const [heroActiveImage, setHeroActiveImage] = useState(flagshipProduct.image);

  // Synchronize Hero Image with Selected Variant
  useEffect(() => {
    if (heroVariant.id === "v1_raw") {
      setHeroActiveImage("/assets/Clean studio profile view of an anodized titanium skincare bottle.jpg");
    } else if (heroVariant.id === "v1_basalt") {
      setHeroActiveImage("/assets/a dark anodized skincare bottle sitting next to crushed black obsidian rocks and a single iceberg water droplet.jpg");
    } else if (heroVariant.id === "v1_copper") {
      setHeroActiveImage("/assets/Top-down macro studio shot of a knurled solid brass twist-cap mechanism on a dark basalt flask.jpg");
    }
  }, [heroVariant]);

  // Climate Contextualizer State
  const [selectedEnvironment, setSelectedEnvironment] = useState<"subzero" | "friction" | "uv">("subzero");
  
  // B2B Wholesale Portal State
  const [wholesaleQuantities, setWholesaleQuantities] = useState<Record<string, number>>({});
  const [b2bSimulationStatus, setB2bSimulationStatus] = useState<"idle" | "review" | "ordered">("idle");
  const [b2bTermsAccepted, setB2bTermsAccepted] = useState(false);

  // Rust WASM Shopify Functions Simulator State
  const [rustCustomerTag, setRustCustomerTag] = useState<"STANDARD" | "ELITE" | "VIP_VANGUARD">("VIP_VANGUARD");
  const [rustFlaskQty, setRustFlaskQty] = useState(3);
  const [rustOrderTotal, setRustOrderTotal] = useState(360);
  const [rustRunState, setRustRunState] = useState<"idle" | "running" | "success">("idle");
  const [rustTerminalOutput, setRustTerminalOutput] = useState<string[]>([]);

  // Headless Codebase Viewer State
  const [selectedCodeFile, setSelectedCodeFile] = useState<CodeFile>(CODEBASE_FILES[0]);
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  // KPI Dashboard Multiplier (Case Study Interactive Slider)
  const [croEfficiencyFactor, setCroEfficiencyFactor] = useState(1.0);

  // Core Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = item.isSubscription ? item.product.subscriptionPrice : item.product.price;
      return sum + price * item.quantity;
    }, 0);
  }, [cart]);

  // Tiered Free Gift Calculation
  // Tier 1: Over $80 -> Basalt Volcanic Exfoliating Block (Free Gift worth $35)
  // Tier 2: Over $150 -> Brass Travel Vault (Free Gift worth $85)
  const freeGiftProgress = useMemo(() => {
    if (cartSubtotal >= 150) return { percent: 100, nextTier: "MAX", needed: 0, unlocked: "vault" };
    if (cartSubtotal >= 80) return { percent: Math.round(((cartSubtotal - 80) / 70) * 100), nextTier: "Brass Travel Vault ($150)", needed: 150 - cartSubtotal, unlocked: "block" };
    return { percent: Math.round((cartSubtotal / 80) * 100), nextTier: "Volcanic Exfoliating Block ($80)", needed: 80 - cartSubtotal, unlocked: "none" };
  }, [cartSubtotal]);

  // Auto-Inject Free Gift into list view if unlocked
  const activeCartItemsWithGifts = useMemo(() => {
    const list = [...cart];
    if (freeGiftProgress.unlocked === "block" || freeGiftProgress.unlocked === "vault") {
      const giftProd = PRODUCTS_DATA[1]; // Basalt block
      list.push({
        product: giftProd,
        variant: giftProd.variants[0],
        quantity: 1,
        isSubscription: false,
        // flag as free gift
        isFreeGift: true
      } as any);
    }
    if (freeGiftProgress.unlocked === "vault") {
      const giftProd = PRODUCTS_DATA[5]; // Brass travel vault
      list.push({
        product: giftProd,
        variant: giftProd.variants[0],
        quantity: 1,
        isSubscription: false,
        isFreeGift: true
      } as any);
    }
    return list;
  }, [cart, freeGiftProgress]);

  // Helper to add item to cart
  const handleAddToCart = (product: Product, variant: ProductVariant, qty: number, isSub: boolean) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.product.id === product.id && item.variant.id === variant.id && item.isSubscription === isSub
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += qty;
        return updated;
      } else {
        return [...prevCart, { product, variant, quantity: qty, isSubscription: isSub }];
      }
    });
    setCartBump(true);
    setTimeout(() => setCartBump(false), 350);
    setCartOpen(true);
  };

  const handleUpdateCartQty = (idx: number, delta: number) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      const newQty = updated[idx].quantity + delta;
      if (newQty <= 0) {
        updated.splice(idx, 1);
      } else {
        updated[idx].quantity = newQty;
      }
      return updated;
    });
  };

  const handleRemoveFromCart = (idx: number) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      updated.splice(idx, 1);
      return updated;
    });
  };

  // Run the Rust WASM simulator
  const runRustSimulator = () => {
    setRustRunState("running");
    setRustTerminalOutput([]);
    
    const logs: string[] = [];
    logs.push("[wasm-runner] Initializing WebAssembly context...");
    logs.push("[wasm-runner] Loading raw module size: 24.3KB");
    logs.push(`[wasm-runner] Resolving Shopify Function context... Input: { customer_tags: ["${rustCustomerTag}"], cart_quantity: ${rustFlaskQty}, cart_subtotal: $${rustOrderTotal}.00 }`);
    
    setTimeout(() => {
      logs.push("[rust-runtime] Invoking AETHER_ORE::function_main()");
      logs.push(`[rust-runtime] Found active customer tag: ${rustCustomerTag}`);
      
      let discountPercentage = 0;
      let reason = "No discount thresholds achieved.";
      
      if (rustCustomerTag === "VIP_VANGUARD") {
        discountPercentage = 25;
        reason = "Applied 25% VIP Vanguard Storefront Shield Discount.";
      } else if (rustCustomerTag === "ELITE") {
        discountPercentage = 15;
        reason = "Applied 15% Elite Tier Discount.";
      }
      
      if (rustFlaskQty >= 5) {
        discountPercentage = Math.max(discountPercentage, 30);
        reason = "Volume Discount Activated: 30% discount on raw flasks.";
      }
      
      const discountedVal = rustOrderTotal * (1 - discountPercentage / 100);
      
      logs.push(`[rust-runtime] Discount calculated: ${discountPercentage}%`);
      logs.push(`[rust-runtime] Rule applied: "${reason}"`);
      logs.push(`[rust-runtime] Checkout subtotal transformed from $${rustOrderTotal}.00 to $${discountedVal.toFixed(2)}`);
      logs.push("[rust-runtime] WASM Execution successfully completed in 1.48ms. Returning response to Shopify Plus core.");
      
      setRustTerminalOutput(logs);
      setRustRunState("success");
    }, 1200);
  };

  // Wholesale bulk totals
  const wholesaleTotals = useMemo(() => {
    let rawTotal = 0;
    let totalItems = 0;

    PRODUCTS_DATA.forEach((prod) => {
      prod.variants.forEach((v) => {
        const qty = wholesaleQuantities[`${prod.id}_${v.id}`] || 0;
        if (qty > 0) {
          rawTotal += prod.price * qty;
          totalItems += qty;
        }
      });
    });

    // Wholesale discounts based on volumes
    let discountPct = 0;
    if (totalItems >= 100) discountPct = 40;
    else if (totalItems >= 50) discountPct = 25;
    else if (totalItems >= 10) discountPct = 15;

    const discountAmount = rawTotal * (discountPct / 100);
    const netTotal = rawTotal - discountAmount;

    return {
      rawTotal,
      discountPct,
      discountAmount,
      netTotal,
      totalItems
    };
  }, [wholesaleQuantities]);

  const handleWholesaleQtyChange = (prodId: string, varId: string, val: string) => {
    const num = parseInt(val) || 0;
    setWholesaleQuantities((prev) => ({
      ...prev,
      [`${prodId}_${varId}`]: num >= 0 ? num : 0
    }));
  };

  const handleCopyCode = (file: CodeFile) => {
    navigator.clipboard.writeText(file.content);
    setCopiedFile(file.name);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  // Climate environmental recommendation routine
  const climateRoutine = useMemo(() => {
    switch (selectedEnvironment) {
      case "subzero":
        return {
          title: "SUB-ZERO ANTIDOTE ROUTINE",
          climate: "Polar Expeditions & Ice Glare (-40°C to -5°C)",
          description: "High-density thermal preservation. Halts cellular freeze and wind desiccation under freezing mountain winds.",
          products: [PRODUCTS_DATA[0], PRODUCTS_DATA[2], PRODUCTS_DATA[4]], // Flask, Barrier Cream, Hand Balm
          instructions: "Activate Thermophile Alpine Barrier Cream on all high-altitude exposure points. Fill Titanium Flask with boiled mineral broth. Keep Carbon Hand Balm close for split-skin joint therapy."
        };
      case "friction":
        return {
          title: "URBAN INDUSTRIAL POLISH ROUTINE",
          climate: "Heavy Friction & Industrial Environments",
          description: "Debris scrubbing, particulate decontamination, and high-friction skin armor designed for extreme physical tasks.",
          products: [PRODUCTS_DATA[1], PRODUCTS_DATA[3], PRODUCTS_DATA[5]], // Volcanic block, Hand Balm, Milled Vault
          instructions: "Perform rigorous dermabrasion using the Basalt Volcanic block. Work Tactile Carbon Hand balm deep into calluses prior to physical work. Stow block in Brass Travel Vault dry."
        };
      case "uv":
        return {
          title: "HIGH-UV GLACIAL ARMOR ROUTINE",
          climate: "Alpine Glaciers & Exposed High-Altitude Radiation",
          description: "Reflective glacier broad-spectrum shielding. Neutralizes dangerous atmospheric ultraviolet rays.",
          products: [PRODUCTS_DATA[0], PRODUCTS_DATA[4], PRODUCTS_DATA[3]], // Flask, UV Shield, Hand balm
          instructions: "Generously coat face and neck with physical Glacier Shield SPF 50+. Hydrate frequently from Grade-5 Titanium Flask to counteract cellular moisture vapor loss."
        };
    }
  }, [selectedEnvironment]);

  return (
    <div className="min-h-screen bg-basalt text-canvas font-sans selection:bg-copper selection:text-basalt relative overflow-hidden">
      
      {/* Background Decorative Large Text Overlays */}
      <div className="absolute top-[20%] left-[5%] pointer-events-none z-0 select-none">
        <div className="text-[14vw] font-black opacity-[0.02] leading-none tracking-tighter" style={{ fontFamily: '"Arial Black", sans-serif' }}>
          ORE
        </div>
      </div>
      <div className="absolute bottom-[20%] right-[5%] pointer-events-none z-0 select-none">
        <div className="text-[14vw] font-black opacity-[0.02] leading-none tracking-tighter" style={{ fontFamily: '"Arial Black", sans-serif' }}>
          AETHER
        </div>
      </div>

      {/* 1. Multi-Tier Rotating Announcement Bar */}
      <div 
        id="announcement-bar"
        className="h-8 bg-copper text-basalt overflow-hidden fixed top-0 w-full z-50 flex items-center justify-between px-6 font-mono text-[10px] font-bold tracking-widest uppercase"
      >
        <div className="flex-1 text-center sm:text-left pr-4 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={announcementIndex}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="truncate"
            >
              {announcements[announcementIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="hidden sm:block text-[10px] font-mono font-bold text-basalt flex-shrink-0">
          V.06.24.1
        </div>
      </div>

      {/* Main Container padding to account for fixed Announcement Bar */}
      <div className="pt-8">
        
        {/* Navigation Header */}
        <header id="main-header" className="sticky top-8 bg-basalt/95 border-b border-neutral-800 z-40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            
            <div className="flex items-center gap-3">
              <span className="h-5 w-2 bg-copper"></span>
              <a href="#" className="font-display font-bold text-lg tracking-[0.2em] hover:text-copper transition-colors uppercase" style={{ fontFamily: '"Arial Black", sans-serif' }}>
                AETHER & ORE
              </a>
              <span className="font-mono text-[9px] text-neutral-500 border border-neutral-800 px-2 py-0.5">
                PLUS // STOREFRONT
              </span>
            </div>

            {/* Core Tabs Navigator */}
            <nav role="tablist" aria-label="Site sections" className="flex flex-wrap items-center justify-center gap-1 bg-neutral-900/50 p-1 border border-neutral-800">
              <button
                id="tab-storefront-btn"
                role="tab"
                aria-selected={activeTab === "storefront"}
                aria-controls="storefront-view"
                onClick={() => setActiveTab("storefront")}
                className={`min-h-[44px] px-3 py-2 text-xs font-mono tracking-wider transition-all rounded-none focus-visible:outline-2 focus-visible:outline-copper focus-visible:outline-offset-1 ${
                  activeTab === "storefront"
                    ? "bg-copper text-basalt font-bold"
                    : "text-neutral-400 hover:text-canvas hover:bg-neutral-800/50"
                }`}
              >
                1. STOREFRONT
              </button>
              <button
                id="tab-codebase-btn"
                role="tab"
                aria-selected={activeTab === "codebase"}
                aria-controls="codebase-view"
                onClick={() => setActiveTab("codebase")}
                className={`min-h-[44px] px-3 py-2 text-xs font-mono tracking-wider transition-all rounded-none focus-visible:outline-2 focus-visible:outline-copper focus-visible:outline-offset-1 ${
                  activeTab === "codebase"
                    ? "bg-copper text-basalt font-bold"
                    : "text-neutral-400 hover:text-canvas hover:bg-neutral-800/50"
                }`}
              >
                2. HEADLESS CODEBASE
              </button>
              <button
                id="tab-architecture-btn"
                role="tab"
                aria-selected={activeTab === "architecture"}
                aria-controls="architecture-view"
                onClick={() => setActiveTab("architecture")}
                className={`min-h-[44px] px-3 py-2 text-xs font-mono tracking-wider transition-all rounded-none focus-visible:outline-2 focus-visible:outline-copper focus-visible:outline-offset-1 ${
                  activeTab === "architecture"
                    ? "bg-copper text-basalt font-bold"
                    : "text-neutral-400 hover:text-canvas hover:bg-neutral-800/50"
                }`}
              >
                3. SHOPIFY PLUS CORE
              </button>
              <button
                id="tab-case-study-btn"
                role="tab"
                aria-selected={activeTab === "case-study"}
                aria-controls="case-study-view"
                onClick={() => setActiveTab("case-study")}
                className={`min-h-[44px] px-3 py-2 text-xs font-mono tracking-wider transition-all rounded-none focus-visible:outline-2 focus-visible:outline-copper focus-visible:outline-offset-1 ${
                  activeTab === "case-study"
                    ? "bg-copper text-basalt font-bold"
                    : "text-neutral-400 hover:text-canvas hover:bg-neutral-800/50"
                }`}
              >
                4. CASE STUDY
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <button
                id="cart-trigger-btn"
                onClick={() => setCartOpen(true)}
                aria-label={`Open cart, ${cart.reduce((s, i) => s + i.quantity, 0)} items`}
                aria-expanded={cartOpen}
                aria-controls="cart-drawer"
                className={`relative min-h-[44px] px-4 py-2 border border-neutral-700 bg-neutral-950 font-mono text-xs font-bold tracking-widest hover:border-copper hover:text-copper transition-all flex items-center gap-2 rounded-none cursor-pointer focus-visible:outline-2 focus-visible:outline-copper focus-visible:outline-offset-2 ${
                  cartBump ? "animate-cartBump border-copper text-copper" : ""
                }`}
              >
                <ShoppingBag size={14} aria-hidden="true" />
                BAG [<span className="text-copper" aria-hidden="true">{cart.reduce((s, i) => s + i.quantity, 0)}</span>]
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Views Content Router */}
        <main className="pb-24">
          
          {/* ========================================================================= */}
          {/* VIEW 1: STOREFRONT */}
          {/* ========================================================================= */}
          {activeTab === "storefront" && (
            <div id="storefront-view" className="animate-fade-in">
              
              {/* 2. Fast-Lane Split Hero Section */}
              <section className="border-b border-neutral-800 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-140px)]">
                
                {/* Brand Narrative Column (Left) */}
                <div className="lg:col-span-7 p-6 sm:p-12 lg:p-20 flex flex-col justify-center border-r border-neutral-800 relative overflow-hidden bg-[#1A1C1E] z-10">
                  {/* Nordic Fjord Abstract Background Gradient */}
                  <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-gradient-to-tr from-[#0B0D0E] to-[#0A1C36] z-0"></div>
                  
                  <div className="space-y-6 max-w-2xl relative z-10">
                    <div className="flex items-center gap-2 text-copper font-mono text-xs tracking-[0.2em] font-semibold">
                      <span className="w-1.5 h-1.5 bg-copper rounded-none inline-block"></span>
                      DUKE SUPPLY CO // ENGINEERED FORMULATIONS
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[0.85] tracking-tighter text-canvas uppercase" style={{ fontFamily: '"Arial Black", sans-serif' }}>
                      TACTILE<br/>PHYSICAL ARMOR.
                    </h1>
                    
                    <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-sans">
                      {BRAND_SYSTEM.manifesto}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-800/60">
                      <div>
                        <div className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">LAUNCH ORIGIN</div>
                        <div className="text-xs font-mono text-canvas mt-1">REYKJAVÍK, ICELAND</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">SPECIFICATION</div>
                        <div className="text-xs font-mono text-canvas mt-1">GRADE-5 TITANIUM ARCHITECTURE</div>
                      </div>
                    </div>

                    <div className="bg-neutral-900 border-l-2 border-copper p-4 font-mono text-xs text-neutral-300">
                      <span className="text-copper font-bold block mb-1">GEOGRAPHIC TARGET AREA</span>
                      64°08'47.1"N 21°56'24.8"W • ARCTIC TELEMETRY ACTIVE
                    </div>
                  </div>
                </div>

                {/* Transactional Quick-Add Panel (Right) */}
                <div className="lg:col-span-5 p-6 sm:p-12 lg:p-16 flex flex-col justify-center items-center bg-neutral-950">
                  <div className="w-full max-w-md space-y-6">
                    
                    {/* Explicit CSS Aspect Ratio bounding box to prevent CLS */}
                    <div className="relative border border-neutral-800 bg-basalt overflow-hidden aspect-[4/3] w-full">
                      <img 
                        src={heroActiveImage} 
                        alt="Aether & Ore Anodized Titanium Flask on frosted Basalt stone" 
                        className="object-cover w-full h-full filter grayscale hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                        fetchPriority="high"
                      />
                      <div className="absolute top-3 left-3 bg-basalt text-copper border border-copper font-mono text-[9px] px-2 py-0.5 tracking-widest font-bold">
                        SYSTEM BEST SELLER
                      </div>
                    </div>

                    {/* Interactive Gallery Indicators */}
                    <div className="flex gap-2 justify-center" role="group" aria-label="Product image gallery">
                      {flagshipProduct.images.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setHeroActiveImage(imgUrl)}
                          aria-label={`View product image ${idx + 1}`}
                          aria-pressed={heroActiveImage === imgUrl}
                          className={`w-12 h-12 border overflow-hidden transition-all duration-200 rounded-none focus-visible:outline-2 focus-visible:outline-copper focus-visible:outline-offset-2 ${
                            heroActiveImage === imgUrl ? "border-copper" : "border-neutral-800 hover:border-neutral-500"
                          }`}
                        >
                          <img 
                            src={imgUrl} 
                            alt={`${flagshipProduct.title} — view ${idx + 1}`}
                            className="w-full h-full object-cover filter grayscale"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>

                    {/* Transaction Box - Zero Border Radius, Heavy Tactile Style */}
                    <div className="border-2 border-neutral-800 p-6 bg-neutral-950/90 shadow-[4px_4px_0px_0px_#0B0D0E] space-y-4">
                      
                      <div className="flex justify-between items-start border-b border-neutral-800 pb-3">
                        <div>
                          <span className="font-mono text-[10px] text-neutral-400 tracking-widest uppercase">FLAGSHIP HARDWARE</span>
                          <h3 className="font-display font-bold text-lg tracking-wider text-canvas mt-0.5">{flagshipProduct.title}</h3>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-xs text-neutral-400 line-through block">$150.00</span>
                          <span className="font-mono text-lg font-bold text-copper" id="hero-active-price">
                            ${heroSubscription ? flagshipProduct.subscriptionPrice.toFixed(2) : flagshipProduct.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-[10px] font-mono text-neutral-400 tracking-widest uppercase">PURCHASE PROTOCOL</label>
                        
                        {/* One-Time vs Subscription Toggles */}
                        <div className="grid grid-cols-1 gap-2">
                          <button
                            type="button"
                            onClick={() => setHeroSubscription(false)}
                            className={`flex items-center justify-between p-3 border text-left rounded-none transition-all ${
                              !heroSubscription 
                                ? "border-copper bg-copper/5 text-canvas" 
                                : "border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${!heroSubscription ? "border-copper" : "border-neutral-600"}`}>
                                {!heroSubscription && <div className="w-1.5 h-1.5 bg-copper rounded-full"></div>}
                              </div>
                              <span className="text-xs font-mono tracking-wider font-medium">ONE-TIME DELIVERY</span>
                            </div>
                            <span className="font-mono text-xs font-bold">${flagshipProduct.price.toFixed(2)}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setHeroSubscription(true)}
                            className={`flex items-center justify-between p-3 border text-left rounded-none transition-all ${
                              heroSubscription 
                                ? "border-copper bg-copper/5 text-canvas" 
                                : "border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${heroSubscription ? "border-copper" : "border-neutral-600"}`}>
                                {heroSubscription && <div className="w-1.5 h-1.5 bg-copper rounded-full"></div>}
                              </div>
                              <div>
                                <span className="text-xs font-mono tracking-wider font-medium block">AUTOPILOT SUBSCRIPTION</span>
                                <span className="text-[9px] font-mono text-copper tracking-wider font-semibold uppercase">LOCK IN 20% DISCOUNT + FREE UPGRADES</span>
                              </div>
                            </div>
                            <span className="font-mono text-xs font-bold">${flagshipProduct.subscriptionPrice.toFixed(2)}</span>
                          </button>
                        </div>
                      </div>

                      {/* Variant and Stepper Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-mono text-neutral-400 tracking-widest uppercase">TACTICAL FINISH</label>
                          <select 
                            value={heroVariant.id}
                            onChange={(e) => {
                              const found = flagshipProduct.variants.find(v => v.id === e.target.value);
                              if (found) setHeroVariant(found);
                            }}
                            className="w-full bg-neutral-900 border border-neutral-800 px-3 py-2 text-xs font-mono text-canvas rounded-none outline-none focus:border-copper"
                          >
                            {flagshipProduct.variants.map((v) => (
                              <option key={v.id} value={v.id}>
                                {v.name} ({v.inventory} left)
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-mono text-neutral-400 tracking-widest uppercase">QUANTITY</label>
                          <div className="flex items-center border border-neutral-800 bg-neutral-900 h-[44px]">
                            <button 
                              type="button" 
                              onClick={() => setHeroQuantity(q => Math.max(1, q - 1))}
                              aria-label="Decrease quantity"
                              className="min-w-[44px] h-full text-neutral-400 hover:text-copper transition-colors flex items-center justify-center focus-visible:outline-2 focus-visible:outline-copper"
                            >
                              <Minus size={12} aria-hidden="true" />
                            </button>
                            <span className="flex-1 text-center font-mono text-xs text-canvas select-none" aria-live="polite" aria-atomic="true">
                              {heroQuantity}
                            </span>
                            <button 
                              type="button" 
                              onClick={() => setHeroQuantity(q => q + 1)}
                              aria-label="Increase quantity"
                              className="min-w-[44px] h-full text-neutral-400 hover:text-copper transition-colors flex items-center justify-center focus-visible:outline-2 focus-visible:outline-copper"
                            >
                              <Plus size={12} aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddToCart(flagshipProduct, heroVariant, heroQuantity, heroSubscription)}
                        aria-label={`Add ${heroQuantity} × ${flagshipProduct.title} (${heroVariant.name}) to cart`}
                        className="w-full bg-canvas hover:bg-copper hover:text-basalt font-sans font-black text-xs sm:text-sm tracking-[0.2em] py-5 text-basalt uppercase transition-all duration-250 rounded-none cursor-pointer focus-visible:outline-2 focus-visible:outline-copper focus-visible:outline-offset-2"
                      >
                        DEPLOY TO ACTIVE BAG
                      </button>

                    </div>
                  </div>
                </div>
              </section>

              {/* 3. Climate Contextualizer Widget Section */}
              <section id="climate-widget" className="border-b border-neutral-800 bg-neutral-950 py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  <div className="max-w-3xl space-y-4 mb-12">
                    <span className="font-mono text-xs text-copper uppercase tracking-[0.2em] font-semibold">
                      MERCHANDISING INTELLIGENCE // REAL-TIME CONTEXTUALIZER
                    </span>
                    <h2 className="text-3xl font-display tracking-tight text-canvas">
                      TACTICAL ENVIRONMENT ROUTINE PLANNER
                    </h2>
                    <p className="text-neutral-400 text-sm">
                      Select your operational environment below. Our system dynamically analyzes physical environmental hazards and pre-configures recommended combinations of defensive physical armor.
                    </p>
                  </div>

                  {/* Climate Selectors */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
                    <button
                      onClick={() => setSelectedEnvironment("subzero")}
                      className={`p-6 border text-left transition-all rounded-none cursor-pointer flex flex-col justify-between h-40 ${
                        selectedEnvironment === "subzero"
                          ? "border-copper bg-copper/5 shadow-[4px_4px_0px_0px_#D96B43]"
                          : "border-neutral-800 bg-neutral-900/30 hover:border-neutral-700"
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="font-mono text-xs font-bold text-neutral-500">ZONE 01 // ACCENT</span>
                        <Wind className={selectedEnvironment === "subzero" ? "text-copper" : "text-neutral-500"} size={20} />
                      </div>
                      <div>
                        <h4 className="font-display text-sm font-bold text-canvas tracking-wider">SUB-ZERO FJORD EXPEDITION</h4>
                        <p className="text-[11px] text-neutral-400 font-mono mt-1">Extreme Windburn & Glacial Dehydration</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setSelectedEnvironment("friction")}
                      className={`p-6 border text-left transition-all rounded-none cursor-pointer flex flex-col justify-between h-40 ${
                        selectedEnvironment === "friction"
                          ? "border-copper bg-copper/5 shadow-[4px_4px_0px_0px_#D96B43]"
                          : "border-neutral-800 bg-neutral-900/30 hover:border-neutral-700"
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="font-mono text-xs font-bold text-neutral-500">ZONE 02 // ACCENT</span>
                        <Zap className={selectedEnvironment === "friction" ? "text-copper" : "text-neutral-500"} size={20} />
                      </div>
                      <div>
                        <h4 className="font-display text-sm font-bold text-canvas tracking-wider">URBAN INDUSTRIAL FRICTION</h4>
                        <p className="text-[11px] text-neutral-400 font-mono mt-1">Heavy Particulates & Friction Contact</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setSelectedEnvironment("uv")}
                      className={`p-6 border text-left transition-all rounded-none cursor-pointer flex flex-col justify-between h-40 ${
                        selectedEnvironment === "uv"
                          ? "border-copper bg-copper/5 shadow-[4px_4px_0px_0px_#D96B43]"
                          : "border-neutral-800 bg-neutral-900/30 hover:border-neutral-700"
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="font-mono text-xs font-bold text-neutral-500">ZONE 03 // ACCENT</span>
                        <Sun className={selectedEnvironment === "uv" ? "text-copper" : "text-neutral-500"} size={20} />
                      </div>
                      <div>
                        <h4 className="font-display text-sm font-bold text-canvas tracking-wider">HIGH-UV MOUNTAIN GLARE</h4>
                        <p className="text-[11px] text-neutral-400 font-mono mt-1">High Reflective UV Glacial Radiation</p>
                      </div>
                    </button>
                  </div>

                  {/* Contextualizer Output Frame - Zero border radius */}
                  <div className="border border-neutral-800 p-6 sm:p-8 bg-basalt">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      
                      <div className="lg:col-span-4 space-y-4">
                        <div className="inline-block bg-copper/10 text-copper border border-copper font-mono text-[9px] px-2 py-0.5 uppercase tracking-widest font-bold">
                          RECOMMENDED SYSTEM ROUTINE
                        </div>
                        <h3 className="text-xl font-display font-bold tracking-wider text-canvas">{climateRoutine.title}</h3>
                        <div className="text-xs font-mono text-neutral-400">OPERATIONAL CONTEXT: {climateRoutine.climate}</div>
                        <p className="text-neutral-300 text-xs leading-relaxed">{climateRoutine.description}</p>
                        <div className="p-3 bg-neutral-900 border-l border-copper font-mono text-[11px] text-neutral-400">
                          <span className="text-copper font-bold block mb-1">TACTICAL INSTRUCTION:</span>
                          {climateRoutine.instructions}
                        </div>
                      </div>

                      <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {climateRoutine.products.map((prod) => (
                            <div key={prod.id} className="border border-neutral-800 bg-neutral-950 p-4 flex flex-col justify-between h-full">
                              <div>
                                <div className="aspect-[4/3] w-full bg-neutral-900 overflow-hidden mb-3 border border-neutral-800">
                                  <img 
                                    src={prod.image} 
                                    alt={prod.title} 
                                    className="object-cover w-full h-full filter grayscale"
                                    loading="lazy"
                                  />
                                </div>
                                <span className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase">{prod.category}</span>
                                <h5 className="font-display font-semibold text-xs tracking-wider text-canvas mt-0.5 line-clamp-1">{prod.title}</h5>
                                <p className="text-neutral-400 text-[11px] mt-1 line-clamp-2">{prod.description}</p>
                              </div>
                              <div className="mt-4 pt-3 border-t border-neutral-900 flex justify-between items-center">
                                <span className="font-mono text-xs font-bold text-copper">${prod.price}</span>
                                <button
                                  onClick={() => handleAddToCart(prod, prod.variants[0], 1, false)}
                                  className="text-[10px] font-mono font-bold tracking-wider uppercase text-canvas hover:text-copper border-b border-copper/30 hover:border-copper transition-colors"
                                >
                                  QUICK ADD
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </section>

              {/* 4. Asymmetric Product Collection Grid */}
              <section id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
                  <div>
                    <span className="font-mono text-xs text-copper uppercase tracking-[0.2em] font-semibold">SYSTEM OVERVIEW</span>
                    <h2 className="text-3xl font-display font-bold tracking-wider text-canvas mt-2">TACTICAL COLLECTION</h2>
                  </div>
                  <div className="text-neutral-500 font-mono text-xs uppercase">
                    SHOWING 6 ENGINEERED SOLUTIONS // 100% IN-STOCK READY
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* Flagship Product: Double cell (occupies 2 columns on lg screen) */}
                  <div className="lg:col-span-2 border-2 border-neutral-800 bg-neutral-950 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-copper shadow-[4px_4px_0px_0px_rgba(11,13,14,1)] hover:shadow-[4px_4px_0px_0px_#D96B43]">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="bg-copper text-basalt font-mono text-[9px] font-bold px-2 py-0.5 tracking-wider uppercase">
                            FLAGSHIP HARDWARE SYSTEM
                          </span>
                          <h3 className="font-display font-bold text-xl tracking-wider text-canvas mt-2">
                            {flagshipProduct.title}
                          </h3>
                        </div>
                        <span className="font-mono text-lg font-extrabold text-copper">${flagshipProduct.price}</span>
                      </div>

                      {/* aspect-video = 16/9. The colon syntax "16:9" is not valid CSS — slash form required. */}
                      <div className="aspect-video w-full bg-basalt overflow-hidden border border-neutral-800">
                        <img 
                          src={flagshipProduct.image} 
                          alt="Anodized Titanium Flask Detail" 
                          className="object-cover w-full h-full filter grayscale hover:grayscale-0 transition-all duration-500"
                          loading="lazy"
                        />
                      </div>

                      <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                        {flagshipProduct.description}
                      </p>

                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-neutral-800/60 text-center text-[10px] font-mono text-neutral-400">
                        <div>
                          <span className="block text-[8px] text-neutral-500 uppercase">CONTAINER SIZE</span>
                          {flagshipProduct.size}
                        </div>
                        <div>
                          <span className="block text-[8px] text-neutral-500 uppercase">THERMAL RATING</span>
                          -50°C TO 120°C
                        </div>
                        <div>
                          <span className="block text-[8px] text-neutral-500 uppercase">VESSEL RATING</span>
                          MIL-STD Grade 5
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2 justify-between items-center">
                      <button
                        onClick={() => openProductProtocol(flagshipProduct)}
                        className="text-xs font-mono text-canvas hover:text-copper border-b border-copper/30 hover:border-copper py-1 uppercase tracking-wider cursor-pointer"
                      >
                        VIEW APPLICATION PROTOCOL
                      </button>
                      <button
                        onClick={() => handleAddToCart(flagshipProduct, flagshipProduct.variants[0], 1, false)}
                        className="bg-copper hover:bg-canvas hover:text-basalt font-mono text-xs font-bold text-basalt py-2 px-4 rounded-none uppercase transition-colors cursor-pointer"
                      >
                        ADD TO SYSTEM
                      </button>
                    </div>
                  </div>

                  {/* Rest of the 5 products in asymmetric standard grid */}
                  {PRODUCTS_DATA.filter(p => !p.isFlagship).map((prod) => (
                    <div 
                      key={prod.id}
                      className="border-2 border-neutral-800 bg-neutral-950 p-5 flex flex-col justify-between transition-all duration-300 hover:border-copper hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(11,13,14,1)] hover:shadow-[4px_4px_0px_0px_#D96B43]"
                    >
                      <div>
                        <div className="aspect-[4/3] w-full bg-basalt overflow-hidden border border-neutral-800 mb-4 relative">
                          <img 
                            src={prod.image} 
                            alt={prod.title} 
                            className="object-cover w-full h-full filter grayscale hover:grayscale-0 transition-all duration-500"
                            loading="lazy"
                          />
                          <span className="absolute bottom-2 left-2 bg-basalt text-canvas border border-neutral-800 font-mono text-[8px] px-1.5 py-0.5">
                            {prod.size}
                          </span>
                        </div>

                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <span className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase">{prod.category}</span>
                            <h4 className="font-display font-semibold text-xs tracking-wider text-canvas line-clamp-1 mt-0.5">
                              {prod.title}
                            </h4>
                          </div>
                          <span className="font-mono text-xs font-bold text-copper">${prod.price}</span>
                        </div>

                        <p className="text-neutral-400 text-[11px] leading-relaxed mt-2 line-clamp-3">
                          {prod.description}
                        </p>

                        <div className="mt-3 font-mono text-[9px] text-neutral-500 flex items-center gap-1.5 bg-neutral-900 px-2 py-1 border border-neutral-800/40">
                          <span className="text-copper uppercase font-bold">SCENT:</span>
                          {prod.scent}
                        </div>
                      </div>

                      <div className="mt-6 pt-3 border-t border-neutral-900 flex justify-between items-center">
                        <button
                          onClick={() => openProductProtocol(prod)}
                          className="text-[10px] font-mono text-neutral-400 hover:text-canvas hover:underline uppercase cursor-pointer"
                        >
                          PROTOCOL
                        </button>
                        <button
                          onClick={() => handleAddToCart(prod, prod.variants[0], 1, false)}
                          className="bg-neutral-900 border border-neutral-800 hover:border-copper hover:bg-copper/5 hover:text-copper text-xs font-mono font-bold text-canvas py-1.5 px-3 rounded-none uppercase transition-all cursor-pointer"
                        >
                          QUICK ADD
                        </button>
                      </div>
                    </div>
                  ))}

                </div>
              </section>

              {/* BRAND CAMPAIGN & FIELD LOGS BENTO GRID */}
              <section className="py-20 border-t border-neutral-800 bg-neutral-900/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                  <div className="text-center max-w-3xl mx-auto space-y-3">
                    <span className="font-mono text-[10px] text-copper uppercase tracking-[0.25em] font-bold">
                      LABORATORY TELEMETRY & ALPINE DEPLOYMENT
                    </span>
                    <h2 className="font-display font-bold text-2xl tracking-wider text-canvas uppercase">
                      FIELD PERFORMANCE GRAPHICS & LOGS
                    </h2>
                    <p className="text-neutral-400 text-xs font-mono">
                      SURFACE ASSESSMENTS • CLINICAL ANALYSIS • TARGET COORDINATE DOCUMENTATION
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Item 1: Wide Banner - Alpine climber */}
                    <div className="md:col-span-8 group relative overflow-hidden border border-neutral-800 bg-neutral-950 flex flex-col justify-between p-6 h-[340px]">
                      <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                        <img 
                          src="/assets/portrait of a 38-year-old alpine climber with weathered, healthy skin and crisp focus.jpg" 
                          alt="Alpine field deployment — subject testing barrier cream at -14°C on Nordic Ridge" 
                          className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                      <div className="relative z-10 flex justify-between items-start">
                        <span className="bg-copper text-basalt font-mono text-[9px] font-bold px-2 py-0.5 uppercase">
                          ACTIVE FIELD DEPLOYMENT
                        </span>
                        <span className="font-mono text-[10px] text-neutral-400">LOG #409-A</span>
                      </div>
                      <div className="relative z-10 space-y-2 bg-neutral-950/80 p-4 border border-neutral-800 max-w-md backdrop-blur-sm">
                        <h4 className="font-display font-bold text-xs tracking-wider text-canvas">
                          HIGH-EXPOSURE ZONE DEPLOYMENT
                        </h4>
                        <p className="text-neutral-400 font-mono text-[10px] leading-relaxed">
                          Subject testing Alpine Barrier Cream during vertical ascent in Zone 01 (Nordic Ridge). Temperature: -14°C. Relative humidity: 88%. Absolute skin lipid shield confirmed.
                        </p>
                      </div>
                    </div>

                    {/* Item 2: Vertical Box - Scientists in lab */}
                    <div className="md:col-span-4 group relative overflow-hidden border border-neutral-800 bg-neutral-950 flex flex-col justify-between p-6 h-[340px]">
                      <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                        <img 
                          src="/assets/two cosmetic formulation engineers in dark charcoal lab coats discussing liquid active samples inside an industrial minimalist studio.jpg" 
                          alt="Two AETHER & ORE formulation engineers reviewing liquid active samples in studio lab" 
                          className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                      <div className="relative z-10 flex justify-between items-start">
                        <span className="bg-neutral-800 text-canvas border border-neutral-700 font-mono text-[9px] font-bold px-2 py-0.5 uppercase">
                          CLINICAL SYNTHESIS
                        </span>
                        <span className="font-mono text-[10px] text-neutral-400">LOG #011</span>
                      </div>
                      <div className="relative z-10 space-y-2 bg-neutral-950/80 p-4 border border-neutral-800 backdrop-blur-sm">
                        <h4 className="font-display font-bold text-xs tracking-wider text-canvas">
                          MOLECULAR VALIDATION
                        </h4>
                        <p className="text-neutral-400 font-mono text-[10px] leading-relaxed">
                          Dr. Rostova monitoring deep-sea thermophile liposomes. Gasket-sealed climate bioreactor running at 0.02 micron shear force.
                        </p>
                      </div>
                    </div>

                    {/* Item 3: Quad Box Left - Industrial stainless tanks */}
                    <div className="md:col-span-4 group relative overflow-hidden border border-neutral-800 bg-neutral-950 flex flex-col justify-between p-6 h-[280px]">
                      <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                        <img 
                          src="/assets/high-tech cleanroom formulation lab in Zurich.jpg" 
                          alt="High-tech cleanroom formulation lab — Zurich manufacturing facility" 
                          className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                      <div className="relative z-10 flex justify-between items-start">
                        <span className="bg-neutral-800 text-neutral-400 border border-neutral-800 font-mono text-[9px] px-2 py-0.5 uppercase">
                          MANUFACTURING
                        </span>
                        <span className="font-mono text-[10px] text-neutral-500">SYS_V_09</span>
                      </div>
                      <div className="relative z-10 bg-neutral-950/90 p-3 border border-neutral-900 font-mono text-[10px] text-neutral-300">
                        <div className="text-copper font-extrabold mb-1">STAINLESS BIOTANKS</div>
                        Milling and extraction of Icelandic Volcanic Basalt minerals. Sterile batch tracking active.
                      </div>
                    </div>

                    {/* Item 4: Quad Box Middle - Liquid drop splashing */}
                    <div className="md:col-span-4 group relative overflow-hidden border border-neutral-800 bg-neutral-950 flex flex-col justify-between p-6 h-[280px]">
                      <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                        <img 
                          src="/assets/a molten copper drop hitting cold water alongside recycled aluminum shavings.jpg" 
                          alt="Molten copper drop hitting cold water — viscosity shear dispersion diagnostic" 
                          className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                      <div className="relative z-10 flex justify-between items-start">
                        <span className="bg-neutral-800 text-neutral-400 border border-neutral-800 font-mono text-[9px] px-2 py-0.5 uppercase">
                          VISCOSITY DIAGNOSTICS
                        </span>
                        <span className="font-mono text-[10px] text-neutral-500">VISC_SHR_2</span>
                      </div>
                      <div className="relative z-10 bg-neutral-950/90 p-3 border border-neutral-900 font-mono text-[10px] text-neutral-300">
                        <div className="text-copper font-extrabold mb-1">SHEAR DISPERSION</div>
                        Micro-carbon lubrication balm demonstrating high viscosity and zero friction breakdown.
                      </div>
                    </div>

                    {/* Item 5: Quad Box Right - Gold flake ice lattice */}
                    <div className="md:col-span-4 group relative overflow-hidden border border-neutral-800 bg-neutral-950 flex flex-col justify-between p-6 h-[280px]">
                      <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                        <img 
                          src="/assets/frozen glacial water crystals expanding under a polarized light microscope.jpg" 
                          alt="Frozen glacial water crystals under polarized light microscope — cryo-crystallization analysis" 
                          className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                      <div className="relative z-10 flex justify-between items-start">
                        <span className="bg-neutral-800 text-neutral-400 border border-neutral-800 font-mono text-[9px] px-2 py-0.5 uppercase">
                          CRYO-CRYSTALLIZATION
                        </span>
                        <span className="font-mono text-[10px] text-neutral-500">CRY_02</span>
                      </div>
                      <div className="relative z-10 bg-neutral-950/90 p-3 border border-neutral-900 font-mono text-[10px] text-neutral-300">
                        <div className="text-copper font-extrabold mb-1">CELLULAR GEOMETRY</div>
                        Micro-snowflake golden lattice stabilization. Molecular gold formulation layer.
                      </div>
                    </div>

                    {/* Item 6: Wide Bottom Left - Volcanic cracked kintsugi stone */}
                    <div className="md:col-span-6 group relative overflow-hidden border border-neutral-800 bg-neutral-950 flex flex-col justify-between p-6 h-[300px]">
                      <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                        <img 
                          src="/assets/basalt rocks resting in shallow icy water with subtle copper mineral veins.jpg" 
                          alt="Basalt rocks in icy water with copper mineral veins — Icelandic ore extraction source" 
                          className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                      <div className="relative z-10 flex justify-between items-start">
                        <span className="bg-copper text-basalt font-mono text-[9px] font-bold px-2 py-0.5 uppercase">
                          BASALT EXTRACTION SOURCE
                        </span>
                        <span className="font-mono text-[10px] text-neutral-400">COORD 64°08'N</span>
                      </div>
                      <div className="relative z-10 space-y-1">
                        <h4 className="font-display font-bold text-xs tracking-wider text-canvas">
                          KINTSUGI ORE FIELD
                        </h4>
                        <p className="text-neutral-400 font-mono text-[10px] leading-relaxed max-w-md">
                          Cracked volcanic bedrock containing rich sulfurous veins and micro-abrasive obsidian. Ground and processed into our signature volcanic exfoliating block.
                        </p>
                      </div>
                    </div>

                    {/* Item 7: Wide Bottom Right - Refill canister pouch on ice */}
                    <div className="md:col-span-6 group relative overflow-hidden border border-neutral-800 bg-neutral-950 flex flex-col justify-between p-6 h-[300px]">
                      <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                        <img 
                          src="/assets/three matte black refillable skincare pods encased in a dark wool felt travel wrap.jpg" 
                          alt="Three matte black refillable skincare pods in dark wool felt travel wrap — zero-waste packaging" 
                          className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                      <div className="relative z-10 flex justify-between items-start">
                        <span className="bg-neutral-800 text-canvas border border-neutral-700 font-mono text-[9px] font-bold px-2 py-0.5 uppercase">
                          ZERO-WASTE ARCHITECTURE
                        </span>
                        <span className="font-mono text-[10px] text-neutral-400">REFILL PK-02</span>
                      </div>
                      <div className="relative z-10 space-y-1">
                        <h4 className="font-display font-bold text-xs tracking-wider text-canvas">
                          GLACIAL REPLENISHMENT VESSEL
                        </h4>
                        <p className="text-neutral-400 font-mono text-[10px] leading-relaxed max-w-md">
                          High-density grey wool transit pouch protecting aluminum replenishment canisters on glacier fields. Zero waste packaging designed for complete system loops.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Bottom Brand System Overview Accent Banner */}
              <section className="bg-neutral-950 border-t border-neutral-800 py-16 text-center">
                <div className="max-w-4xl mx-auto px-4 space-y-4">
                  <h3 className="font-display text-lg tracking-[0.2em] text-canvas">AETHER & ORE PACKAGING PROTOCOL</h3>
                  <p className="text-neutral-400 text-xs max-w-2xl mx-auto">
                    {BRAND_SYSTEM.packaging.vessel} {BRAND_SYSTEM.packaging.outer} Marking system: {BRAND_SYSTEM.packaging.marking}
                  </p>
                  <div className="flex justify-center gap-6 text-[10px] font-mono text-neutral-500">
                    <span>99.8% BIO-DEGRADABLE SYSTEM</span>
                    <span>•</span>
                    <span>100% RECYCLED MARINE MATERIALS</span>
                    <span>•</span>
                    <span>ZERO SYNTHETIC RESIDUE</span>
                  </div>
                </div>
              </section>

            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 2: HEADLESS CODEBASE FILE TREE BROWSER */}
          {/* ========================================================================= */}
          {activeTab === "codebase" && (
            <div id="codebase-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
              <div className="space-y-4 mb-8">
                <span className="font-mono text-xs text-copper uppercase tracking-[0.2em] font-semibold">
                  DEVELOPER SUITE // RAW STACK Telemetry
                </span>
                <h2 className="text-3xl font-display tracking-tight text-canvas">
                  HEADLESS ENTERPRISE CODEBASE
                </h2>
                <p className="text-neutral-400 text-sm max-w-3xl">
                  To achieve an ultra-performant <strong>Core Web Vitals</strong> footprint (LCP &lt; 1.2s, CLS = 0.00, INP &lt; 35ms), we bypass heavy runtime frameworks and compile down to zero-dependency raw Vanilla CSS variables, lightweight DOM bindings, and structural HTML5 elements. Use the workspace file browser below to inspect these production-ready structures.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-neutral-800 bg-neutral-950">
                
                {/* File Tree Selector Sidebar */}
                <div className="lg:col-span-4 p-4 border-r border-neutral-800 bg-neutral-950">
                  <span className="block font-mono text-[10px] text-neutral-500 tracking-widest uppercase mb-4 border-b border-neutral-800 pb-2">
                    WORKSPACE FILE TREE
                  </span>
                  
                  <div className="space-y-1 font-mono text-xs">
                    <div className="p-2 bg-neutral-900 border-l-2 border-copper flex items-center gap-2 text-neutral-400 mb-2">
                      <Building2 size={12} className="text-copper" />
                      <span>aether-ore-headless-core/</span>
                    </div>

                    {CODEBASE_FILES.map((file) => {
                      const isSelected = selectedCodeFile.name === file.name;
                      return (
                        <button
                          key={file.name}
                          onClick={() => setSelectedCodeFile(file)}
                          className={`w-full text-left p-2.5 flex items-center justify-between rounded-none border transition-all cursor-pointer ${
                            isSelected
                              ? "border-copper bg-copper/5 text-canvas font-bold"
                              : "border-transparent text-neutral-400 hover:bg-neutral-900 hover:text-canvas"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <FileCode size={13} className={isSelected ? "text-copper" : "text-neutral-500"} />
                            <span>{file.name}</span>
                          </div>
                          <span className="text-[9px] text-neutral-500 uppercase bg-neutral-900 px-1.5 py-0.5 border border-neutral-800">
                            {file.language}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-8 p-4 bg-neutral-900 border border-neutral-800 space-y-3 font-mono text-[11px] text-neutral-400">
                    <span className="text-copper font-bold block uppercase tracking-wider">Enterprise Compile Rule</span>
                    <p className="text-[10px] leading-relaxed">
                      Deploy process automatically preloads primary image tags with <code>fetchpriority="high"</code> and compiles CSS dependencies under raw post-build engines to achieve sub-100KB bundle sizes.
                    </p>
                  </div>
                </div>

                {/* File Code Codeblock viewer */}
                <div className="lg:col-span-8 p-4 flex flex-col bg-basalt">
                  <div className="flex justify-between items-center border-b border-neutral-800 pb-3 mb-4">
                    <div className="font-mono text-xs">
                      <span className="text-neutral-500">Path: </span>
                      <span className="text-canvas font-semibold">{selectedCodeFile.path}</span>
                    </div>
                    
                    <button
                      onClick={() => handleCopyCode(selectedCodeFile)}
                      className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 hover:border-copper hover:text-copper font-mono text-[11px] flex items-center gap-2 text-canvas transition-colors cursor-pointer rounded-none"
                    >
                      <Copy size={12} />
                      {copiedFile === selectedCodeFile.name ? "COPIED VALUE!" : "COPY SOURCE"}
                    </button>
                  </div>

                  <div className="flex-1 min-h-[400px] max-h-[600px] overflow-y-auto font-mono text-xs p-4 bg-neutral-950 text-emerald-400 border border-neutral-800 leading-relaxed whitespace-pre select-all selection:bg-neutral-800">
                    {selectedCodeFile.content}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 3: SHOPIFY PLUS CORE ADMIN AUTOMATIONS & B2B */}
          {/* ========================================================================= */}
          {activeTab === "architecture" && (
            <div id="architecture-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-12">
              
              {/* Header explanation */}
              <div className="space-y-4">
                <span className="font-mono text-xs text-copper uppercase tracking-[0.2em] font-semibold">
                  SHOPIFY PLUS ENTERPRISE // SERVER SIDE ENGINES
                </span>
                <h2 className="text-3xl font-display tracking-tight text-canvas">
                  SHOPIFY PLUS CORE ARCHITECTURE
                </h2>
                <p className="text-neutral-400 text-sm max-w-3xl">
                  Inspect the mission-critical core engines driving Aether & Ore. This includes our Rust-compiled server-side checkout discount functions, Shopify Flow back-office automation schemas, and a live Wholesale Quick-Order matrix portal.
                </p>
              </div>

              {/* Row 1: Rust WASM Shopify Functions Simulator */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Code and concept */}
                <div className="lg:col-span-7 border border-neutral-800 p-6 bg-neutral-950 space-y-4">
                  <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Terminal size={16} className="text-copper" />
                      <span className="font-mono text-xs font-bold text-canvas uppercase tracking-wider">
                        Shopify Functions // WASM Code Reader
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-neutral-500 uppercase border border-neutral-800 px-2 py-0.5">
                      src/main.rs (Rust)
                    </span>
                  </div>

                  <p className="text-neutral-400 text-xs">
                    Shopify Functions execute WASM logic directly in the core checkout engine under 5ms, avoiding the database lock latency of legacy Shopify Scripts. This custom script checks customer metafields and calculates bulk tier promotions.
                  </p>

                  {/* Simulated Rust code block */}
                  <div className="p-4 bg-basalt text-neutral-300 font-mono text-[11px] leading-relaxed overflow-x-auto border border-neutral-800 h-[260px]">
{`use shopify_function::prelude::*;
use serde::{Deserialize, Serialize};

#[shopify_function]
fn function_main(input: Input) -> Result<Output, Error> {
    let mut discounts = Vec::new();
    let has_vanguard_tag = input.cart.buyer_identity
        .map(|bi| bi.customer.tags.contains(&"VIP_VANGUARD".to_string()))
        .unwrap_or(false);

    // Apply 25% checkout-wide discount to Elite VIPs
    if has_vanguard_tag {
        discounts.push(Discount {
            value: DiscountValue::Percentage(25.0),
            message: "VIP Vanguard Elite discount applied".to_string()
        });
    } else if input.cart.lines.iter().any(|l| l.quantity >= 5) {
        // High Volume discount tier
        discounts.push(Discount {
            value: DiscountValue::Percentage(30.0),
            message: "WASM Bulk Volume Tier Discount".to_string()
        });
    }

    Ok(Output { discounts })
}`}
                  </div>
                </div>

                {/* Live simulator widget */}
                <div className="lg:col-span-5 border-2 border-copper bg-neutral-950 p-6 space-y-4 shadow-[4px_4px_0px_0px_#D96B43]">
                  <div>
                    <span className="font-mono text-[10px] text-copper uppercase tracking-widest font-bold">LIVE TELEMETRY SIMULATOR</span>
                    <h3 className="font-display font-bold text-base text-canvas tracking-wider mt-1">
                      RUST WASM RUNTIME EVALUATOR
                    </h3>
                    <p className="text-neutral-400 text-[11px] mt-1">
                      Configure your checkout state and fire the simulated Rust-WASM engine.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Customer Profile Tag</label>
                      <select 
                        value={rustCustomerTag}
                        onChange={(e: any) => setRustCustomerTag(e.target.value)}
                        className="w-full bg-basalt border border-neutral-800 px-3 py-2 text-xs font-mono text-canvas rounded-none outline-none focus:border-copper"
                      >
                        <option value="STANDARD">Standard Customer (No Tags)</option>
                        <option value="ELITE">Metafield "VIP_ELITE" (15% Off)</option>
                        <option value="VIP_VANGUARD">Metafield "VIP_VANGUARD" (25% Off)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Titanium Flask Qty</label>
                        <input 
                          type="number"
                          value={rustFlaskQty}
                          min={1}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 1;
                            setRustFlaskQty(val);
                            setRustOrderTotal(val * 120);
                          }}
                          className="w-full bg-basalt border border-neutral-800 px-3 py-1.5 text-xs font-mono text-canvas rounded-none outline-none focus:border-copper"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Calculated Cart Total</label>
                        <div className="w-full bg-neutral-900 border border-neutral-800 px-3 py-1.5 text-xs font-mono text-copper font-bold">
                          ${rustOrderTotal}.00
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={runRustSimulator}
                      disabled={rustRunState === "running"}
                      className="w-full bg-copper hover:bg-canvas text-basalt font-display font-bold text-xs tracking-wider py-3 border border-basalt rounded-none cursor-pointer uppercase transition-colors"
                    >
                      {rustRunState === "running" ? "COMPILING WASM..." : "EXECUTE WASM ENGINE"}
                    </button>
                  </div>

                  {/* Terminal output */}
                  <div className="p-3 bg-basalt border border-neutral-800/80 font-mono text-[10px] h-36 overflow-y-auto space-y-1 text-neutral-400">
                    <span className="text-[9px] text-neutral-500 uppercase block tracking-wider font-semibold border-b border-neutral-900 pb-1 mb-2">WASM CONSOLE TERMINAL OUTPUT:</span>
                    {rustTerminalOutput.length === 0 ? (
                      <div className="text-neutral-500 italic">Configure values above and click Execute to view Rust micro-runtime logs.</div>
                    ) : (
                      rustTerminalOutput.map((l, i) => (
                        <div key={i} className={l.includes("error") ? "text-hazard" : l.includes("rust") ? "text-amber-400" : l.includes(" transformed ") ? "text-emerald-400 font-semibold" : "text-neutral-400"}>
                          {l}
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

              {/* Row 2: B2B Wholesale Matrix Table (#b2b) */}
              <div id="b2b" className="border border-neutral-800 bg-neutral-950 p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800 pb-4">
                  <div>
                    <span className="font-mono text-xs text-copper uppercase tracking-[0.2em] font-semibold">WHOLESALE INTEGRATION</span>
                    <h3 className="font-display font-bold text-xl tracking-wider text-canvas mt-1">B2B QUICK-ORDER MATRIX</h3>
                  </div>
                  <div className="bg-neutral-900 border border-neutral-800 px-4 py-2 font-mono text-[11px] text-neutral-400">
                    WHOLESALE STATUS: <span className="text-copper font-bold">NET-30 APPLICABLE</span>
                  </div>
                </div>

                <p className="text-neutral-400 text-xs">
                  Enterprise B2B commercial accounts require rapid entry matrix inputs. Place bulk quantities across product variants below. Tier discounts apply automatically: <strong>10+ units = 15% off</strong> | <strong>50+ units = 25% off</strong> | <strong>100+ units = 40% off</strong>.
                </p>

                {/* Wholesale Order Matrix */}
                <div className="overflow-x-auto">
                  <table className="w-full font-mono text-xs text-left border-collapse border border-neutral-900">
                    <thead>
                      <tr className="bg-neutral-900 border-b border-neutral-800 text-neutral-400 uppercase text-[10px]">
                        <th className="p-3">SKU CODE</th>
                        <th className="p-3">PRODUCT</th>
                        <th className="p-3">VARIANT / SIZE</th>
                        <th className="p-3">UNIT PRICE</th>
                        <th className="p-3 w-32">ORDER QTY</th>
                        <th className="p-3 text-right">LINE SUB-TOTAL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900">
                      {PRODUCTS_DATA.map((prod) => (
                        prod.variants.map((v) => {
                          const valKey = `${prod.id}_${v.id}`;
                          const qty = wholesaleQuantities[valKey] || 0;
                          const sub = prod.price * qty;
                          return (
                            <tr key={valKey} className="hover:bg-neutral-900/40 transition-colors">
                              <td className="p-3 text-neutral-500">{v.sku}</td>
                              <td className="p-3 font-display text-[11px] font-bold tracking-wide text-canvas">{prod.title}</td>
                              <td className="p-3 text-neutral-400">{v.name} ({prod.size})</td>
                              <td className="p-3 text-neutral-300">${prod.price.toFixed(2)}</td>
                              <td className="p-3">
                                <input
                                  type="number"
                                  min="0"
                                  placeholder="0"
                                  value={qty || ""}
                                  onChange={(e) => handleWholesaleQtyChange(prod.id, v.id, e.target.value)}
                                  className="w-20 bg-basalt border border-neutral-800 p-1 text-center font-bold text-copper rounded-none outline-none focus:border-copper"
                                />
                              </td>
                              <td className="p-3 text-right text-canvas font-bold">${sub.toFixed(2)}</td>
                            </tr>
                          );
                        })
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Wholesale Summary & B2B Checkout Simulation */}
                <div className="p-6 bg-neutral-900 border border-neutral-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="space-y-2">
                    <div className="font-mono text-xs uppercase text-neutral-400">Total Commercial Units: <span className="text-canvas font-bold font-sans">{wholesaleTotals.totalItems}</span></div>
                    <div className="font-mono text-xs uppercase text-neutral-400">Base Wholesale Cost: <span className="text-canvas font-bold font-sans">${wholesaleTotals.rawTotal.toFixed(2)}</span></div>
                    {wholesaleTotals.discountPct > 0 && (
                      <div className="font-mono text-xs text-copper uppercase font-bold">
                        Volume Discount Activated ({wholesaleTotals.discountPct}%): -${wholesaleTotals.discountAmount.toFixed(2)}
                      </div>
                    )}
                  </div>

                  <div className="text-right w-full md:w-auto space-y-4">
                    <div>
                      <span className="font-mono text-[10px] text-neutral-500 uppercase block">NET-30 PAYABLE</span>
                      <span className="font-display font-extrabold text-2xl text-copper">${wholesaleTotals.netTotal.toFixed(2)}</span>
                    </div>

                    {b2bSimulationStatus === "idle" && (
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 cursor-pointer text-left justify-end">
                          <input 
                            type="checkbox"
                            checked={b2bTermsAccepted}
                            onChange={(e) => setB2bTermsAccepted(e.target.checked)}
                            className="bg-basalt border border-neutral-800 rounded-none text-copper"
                          />
                          <span className="font-mono text-[10px] text-neutral-400 uppercase">I agree to Net-30 commercial credit assessment</span>
                        </label>
                        <button
                          onClick={() => {
                            if (!b2bTermsAccepted) {
                              alert("Please accept the Net-30 credit assessment terms first.");
                              return;
                            }
                            if (wholesaleTotals.totalItems === 0) {
                              alert("Please enter a quantity for at least one B2B variant.");
                              return;
                            }
                            setB2bSimulationStatus("review");
                          }}
                          className="px-6 py-3 bg-copper hover:bg-canvas text-basalt font-display font-bold text-xs tracking-wider rounded-none uppercase transition-colors cursor-pointer"
                        >
                          INITIATE BULK CHECKOUT
                        </button>
                      </div>
                    )}

                    {b2bSimulationStatus === "review" && (
                      <div className="border border-neutral-800 p-4 bg-basalt text-left space-y-3 w-80">
                        <span className="font-mono text-[10px] text-copper uppercase tracking-wider block font-bold border-b border-neutral-800 pb-1">CONFIRM CREDIT DRAFT</span>
                        <p className="text-[10px] text-neutral-400 leading-normal">
                          Generating wholesale PO with Net-30 terms. This order will automatically update your ERP system and Baltic shipping container drafts.
                        </p>
                        <div className="flex gap-2 justify-end pt-2">
                          <button onClick={() => setB2bSimulationStatus("idle")} className="font-mono text-[10px] text-neutral-400 hover:text-canvas uppercase">Cancel</button>
                          <button onClick={() => setB2bSimulationStatus("ordered")} className="font-mono text-[10px] text-copper hover:text-canvas font-bold uppercase">Approve PO</button>
                        </div>
                      </div>
                    )}

                    {b2bSimulationStatus === "ordered" && (
                      <div className="border border-copper p-4 bg-copper/5 text-left space-y-3 w-80">
                        <span className="font-mono text-[10px] text-copper uppercase tracking-wider block font-bold">🎉 DRAFT PURCHASE ORDER REGISTERED</span>
                        <p className="text-[10px] text-neutral-300 leading-normal">
                          Commercial PO draft generated successfully. Terms Net-30 approved. Baltic factory notified to schedule immediate freight container packing.
                        </p>
                        <button onClick={() => { setB2bSimulationStatus("idle"); setWholesaleQuantities({}); }} className="text-[10px] font-mono font-bold text-canvas hover:underline block text-right uppercase">
                          RESET ORDER MATRIX
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Row 3: Shopify Flow Automations Visualized */}
              <div className="border border-neutral-800 bg-neutral-950 p-6 sm:p-8 space-y-6">
                <div>
                  <span className="font-mono text-xs text-copper uppercase tracking-[0.2em] font-semibold">BACK-OFFICE INTEGRATION</span>
                  <h3 className="font-display font-bold text-xl tracking-wider text-canvas mt-1">SHOPIFY FLOW TELEMETRY SCHEMA</h3>
                  <p className="text-neutral-400 text-xs mt-1">
                    These automated server workflows operate asynchronously based on webhooks, bypassing custom middleware entirely to ensure stable transaction loops.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {FLOW_AUTOMATIONS.map((flow) => (
                    <div key={flow.id} className="border border-neutral-800 bg-basalt p-5 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">AUTOMATION {flow.id.split("_")[1]}</span>
                        <h4 className="font-display font-semibold text-xs tracking-wider text-canvas uppercase border-b border-neutral-800 pb-2">{flow.name}</h4>
                        
                        <div className="space-y-1.5 font-mono text-[11px]">
                          <div>
                            <span className="text-copper font-bold block text-[10px]">TRIGGER:</span>
                            <span className="text-neutral-300">{flow.trigger}</span>
                          </div>
                          <div>
                            <span className="text-copper font-bold block text-[10px]">CONDITION:</span>
                            <span className="text-neutral-300 leading-normal">{flow.condition}</span>
                          </div>
                          <div>
                            <span className="text-copper font-bold block text-[10px]">ACTION:</span>
                            <span className="text-neutral-400 leading-normal">{flow.action}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-neutral-900 text-[10px] font-mono text-canvas leading-normal bg-neutral-900/50 p-2.5">
                        <span className="text-copper font-bold block mb-0.5 uppercase tracking-wider text-[9px]">KPI impact:</span>
                        {flow.impact}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 4: Checkout Extensibility Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-neutral-800 bg-neutral-950 p-6 sm:p-8">
                <div className="space-y-3">
                  <span className="font-mono text-xs text-copper uppercase tracking-wider font-semibold block">Checkout Extensibility // Shop Pay 1-Tap</span>
                  <h4 className="font-display font-bold text-lg tracking-wider text-canvas">PRE-COMPUTED ONE-CLICK ACCELERATION</h4>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    By deprecating legacy checkout.liquid files in favor of Shopify Plus Checkout Extensibility UI Extensions, Aether & Ore guarantees safe checkout updates. We implement a custom post-purchase 1-click upsell logic directly on Shop Pay profiles, increasing pre-dispatch average order volume significantly.
                  </p>
                  <ul className="space-y-1 font-mono text-[11px] text-neutral-400 list-inside list-disc">
                    <li>Execution of custom pixel integrations in isolated sandboxes</li>
                    <li>Pre-cached assets served directly from Edge locations</li>
                    <li>1-click dynamic post-purchase upsell for Brass Travel Vault</li>
                  </ul>
                </div>
                <div className="border border-neutral-800 p-6 bg-basalt flex flex-col justify-center space-y-3">
                  <span className="font-mono text-[10px] text-copper uppercase block">POST-PURCHASE ONE-CLICK ACCELERATION PREVIEW</span>
                  <div className="border border-neutral-800 p-4 bg-neutral-950 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-neutral-400 font-semibold">SUCCESS! ORDER PLACED</span>
                      <span className="text-emerald-400 font-bold">APPROVED</span>
                    </div>
                    <div className="bg-neutral-900 p-3 border border-neutral-800 space-y-2">
                      <span className="font-mono text-[10px] text-copper uppercase font-bold block">Exclusive Vanguard Add-On:</span>
                      <h5 className="font-display text-xs font-bold text-canvas">BRASS TRAVEL VAULT</h5>
                      <p className="text-[10px] text-neutral-400 font-sans">Add to order with 1-click for only <strong>$68.00</strong> (normal $85.00). No re-entry of card details required.</p>
                      <button onClick={() => {
                        const vault = PRODUCTS_DATA[5];
                        handleAddToCart(vault, vault.variants[0], 1, false);
                        alert("Brass Travel Vault added to your order via checkout post-purchase 1-click extension!");
                      }} className="w-full bg-copper hover:bg-canvas text-basalt font-mono text-[10px] py-1.5 font-bold uppercase cursor-pointer">
                        YES, ADD ONE-CLICK UPSELL
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* VIEW 4: ENTERPRISE BUSINESS CASE STUDY DASHBOARD */}
          {/* ========================================================================= */}
          {activeTab === "case-study" && (
            <div id="case-study-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-12">
              
              {/* Header */}
              <div className="space-y-4">
                <span className="font-mono text-xs text-copper uppercase tracking-[0.2em] font-semibold">
                  METRICS TELEMETRY // LEGACY MONOLITH VS SHOPIFY PLUS EDGE
                </span>
                <h2 className="text-3xl font-display tracking-tight text-canvas">
                  AETHER & ORE ENTERPRISE CASE STUDY
                </h2>
                <p className="text-neutral-400 text-sm max-w-3xl">
                  By refactoring to a lightweight, headless storefront with server-side Rust discount engines, Aether & Ore unlocked massive CRO and performance boosts. Adjust the metric slider below to simulate the performance optimization.
                </p>
              </div>

              {/* Interactive Performance Refactor Simulator Slider */}
              <div className="border border-neutral-800 bg-neutral-950 p-6 sm:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-display text-base font-bold text-canvas tracking-wider uppercase">
                      EDGE OPTIMIZATION COEFFICIENT
                    </h3>
                    <p className="text-neutral-400 text-xs">
                      Slide to compare legacy monolithic infrastructure with the optimized Shopify Plus headless framework.
                    </p>
                  </div>
                  <span className="font-mono text-2xl font-extrabold text-copper uppercase bg-neutral-900 border border-neutral-800 px-4 py-1.5">
                    {croEfficiencyFactor === 1.0 ? "LEGACY MONOLITHIC" : croEfficiencyFactor === 2.0 ? "HEADLESS EDGE (MAX)" : `OPTIMIZATION LEVEL: ${(croEfficiencyFactor * 50).toFixed(0)}%`}
                  </span>
                </div>

                <div className="py-4">
                  <input 
                    type="range"
                    min="1.0"
                    max="2.0"
                    step="0.1"
                    value={croEfficiencyFactor}
                    onChange={(e) => setCroEfficiencyFactor(parseFloat(e.target.value))}
                    className="w-full accent-copper cursor-pointer bg-neutral-800 h-2 outline-none"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-neutral-500 mt-2">
                    <span>LEGACY MONOLITH (HIGH LATENCY, CLS ISSUES)</span>
                    <span>MID Refactor STATE</span>
                    <span>SHOPIFY PLUS EDGE STACK (LCP 0.9s, INP 18ms)</span>
                  </div>
                </div>
              </div>

              {/* KPI COMPARISON GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {CASE_STUDY_METRICS.metrics.map((m, idx) => {
                  // Calculate simulated current value based on range slider interpolation
                  let currentValStr = "";
                  const pct = (croEfficiencyFactor - 1.0) * 100; // 0 to 100

                  if (m.metric === "percentage") {
                    const b = parseFloat(m.before);
                    const a = parseFloat(m.after);
                    const val = b + (a - b) * (croEfficiencyFactor - 1.0);
                    currentValStr = `${val.toFixed(2)}%`;
                  } else if (m.metric === "currency") {
                    const b = parseFloat(m.before.replace("$", ""));
                    const a = parseFloat(m.after.replace("$", ""));
                    const val = b + (a - b) * (croEfficiencyFactor - 1.0);
                    currentValStr = `$${val.toFixed(2)}`;
                  } else if (m.metric === "score") {
                    const b = parseInt(m.before);
                    const a = parseInt(m.after);
                    const val = b + (a - b) * (croEfficiencyFactor - 1.0);
                    currentValStr = `${Math.round(val)}`;
                  }

                  return (
                    <div 
                      key={idx}
                      className="border-2 border-neutral-800 bg-neutral-950 p-6 flex flex-col justify-between space-y-4 shadow-[4px_4px_0px_0px_rgba(11,13,14,1)] hover:border-copper"
                    >
                      <div className="space-y-1">
                        <span className="font-mono text-[10px] text-neutral-500 tracking-wider uppercase block">METRIC {idx + 1}</span>
                        <h4 className="font-display font-semibold text-xs tracking-wider text-neutral-300 line-clamp-1">{m.label}</h4>
                      </div>

                      <div className="space-y-1 py-2">
                        <div className="text-3xl font-display font-extrabold text-copper">{currentValStr}</div>
                        <div className="flex justify-between font-mono text-[10px] text-neutral-500 pt-1 border-t border-neutral-900">
                          <span>Legacy: {m.before}</span>
                          <span className="text-emerald-400 font-bold">Goal: {m.after}</span>
                        </div>
                      </div>

                      <div className="bg-neutral-900 p-2 text-center text-[10px] font-mono text-emerald-400 uppercase font-semibold">
                        LIFT PROJECTION: {m.lift}
                      </div>
                    </div>
                  );
                })}

              </div>

              {/* Telemetry rules for Core Web Vitals */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border border-neutral-800 bg-neutral-950 p-6 sm:p-8">
                
                <div className="lg:col-span-4 space-y-4">
                  <span className="font-mono text-xs text-copper uppercase tracking-wider font-semibold block">TELEMETRY DEEP DIVE</span>
                  <h3 className="font-display font-bold text-lg tracking-wider text-canvas">CORE WEB VITALS ENGINEERING RULES</h3>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    How did we achieve these results? Our engineering guidelines dictate strict limits on client-side compilation and layout calculations:
                  </p>
                  
                  <div className="space-y-4 pt-2">
                    <div>
                      <div className="flex items-center gap-2 font-display text-xs text-canvas font-bold uppercase">
                        <Check size={14} className="text-copper" />
                        LCP &lt; 1.2s PROTOCOL
                      </div>
                      <p className="text-[11px] text-neutral-400 font-sans mt-1">
                        Preload above-the-fold banner assets with explicit <code>fetchpriority="high"</code> and utilize static edge servers.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 font-display text-xs text-canvas font-bold uppercase">
                        <Check size={14} className="text-copper" />
                        CLS = 0.00 PROTOCOL
                      </div>
                      <p className="text-[11px] text-neutral-400 font-sans mt-1">
                        Hardcode responsive <code>aspect-ratio</code> bounding boxes on all containers. Isolate cart, overlays, and modal portals with fixed position layouts.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 font-display text-xs text-canvas font-bold uppercase">
                        <Check size={14} className="text-copper" />
                        INP &lt; 35ms PROTOCOL
                      </div>
                      <p className="text-[11px] text-neutral-400 font-sans mt-1">
                        Utilize non-blocking event loops, enforce <code>{"{ passive: true }"}</code> scroll bindings, and run checkout discounts server-side.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8 bg-basalt p-6 border border-neutral-800 space-y-4">
                  <span className="font-mono text-xs text-copper uppercase block">SCHEMA.ORG STRUCTURAL SEO SYNTAX</span>
                  <p className="text-neutral-400 text-xs">
                    To maximize organic visibility and high-AOV search results, we inject pre-milled Schema.org JSON-LD blocks directly into the DOM, boosting search engine crawl indexing rates.
                  </p>

                  <div className="p-4 bg-neutral-950 font-mono text-[10px] text-emerald-400 h-64 overflow-y-auto leading-normal border border-neutral-900 select-all">
{`<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Anodized Titanium Hydration Flask",
  "image": [
    "/assets/hero photograph of an anodized dark titanium flask with knurled copper cap.jpg"
  ],
  "description": "Grade-5 vacuum-insulated tactical titanium flask with micro-milled exterior grip.",
  "sku": "THF-RAW-500",
  "mpn": "AO-THF-01",
  "brand": {
    "@type": "Brand",
    "name": "AETHER & ORE"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.95",
    "reviewCount": "148"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://aetherandore.com/products/titanium-flask",
    "priceCurrency": "USD",
    "price": "120.00",
    "priceValidUntil": "2027-12-31",
    "availability": "https://schema.org/InStock"
  }
}
</script>`}
                  </div>
                  <div className="font-mono text-[9px] text-neutral-500 text-right">
                    Schema.org v12 JSON-LD Validation: Standard Passed.
                  </div>
                </div>

              </div>

              {/* Case Study Learnings Card deck */}
              <div className="space-y-4">
                <h3 className="font-display text-base font-bold tracking-wider text-canvas uppercase">
                  ENTERPRISE REFRACTOR METRICS SUMMARY
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {CASE_STUDY_METRICS.learnings.map((l, i) => (
                    <div key={i} className="border border-neutral-800 bg-neutral-950 p-5 space-y-2">
                      <span className="font-mono text-[10px] text-copper uppercase font-bold">INSIGHT {i+1}</span>
                      <h4 className="font-display text-xs font-bold text-canvas uppercase">{l.title}</h4>
                      <p className="text-neutral-400 text-xs leading-normal font-sans">{l.text}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </main>

        {/* 5. Sticky Bottom Cart Bar */}
        <div 
          id="sticky-bar"
          className={`fixed bottom-0 left-0 w-full bg-canvas text-basalt border-t border-canvas/10 py-4 px-6 z-30 shadow-[0_-10px_20px_rgba(0,0,0,0.5)] transition-all duration-300 transform ${
            showStickyBar ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="h-4 w-1.5 bg-copper"></span>
              <div>
                <span className="font-display text-xs font-bold tracking-wider text-basalt uppercase">{flagshipProduct.title}</span>
                <span className="text-neutral-900 font-mono text-[10px] block sm:inline sm:ml-3">
                  VARIANT: <span className="text-copper font-semibold">{heroVariant.name}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <span className="font-mono text-sm font-bold text-copper">${heroSubscription ? flagshipProduct.subscriptionPrice.toFixed(2) : flagshipProduct.price.toFixed(2)}</span>
              <button
                onClick={() => handleAddToCart(flagshipProduct, heroVariant, heroQuantity, heroSubscription)}
                className="bg-basalt text-canvas hover:bg-copper hover:text-basalt font-mono text-[10px] font-black uppercase tracking-widest px-8 py-2.5 border border-basalt rounded-none transition-colors cursor-pointer"
              >
                ADD TO ACTIVE BAG
              </button>
            </div>
          </div>
        </div>

        {/* 6. AJAX Slide-Out Cart Drawer */}
        {/* Overlay — aria-hidden so screen readers skip it (the drawer itself is the modal) */}
        <div 
          id="cart-overlay"
          onClick={() => setCartOpen(false)}
          aria-hidden="true"
          className={`fixed inset-0 bg-basalt/80 backdrop-blur-sm z-50 transition-opacity duration-300 ${
            cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        />

        <div 
          id="cart-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
          aria-hidden={!cartOpen}
          className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-basalt border-l border-neutral-800 z-50 transition-all duration-300 flex flex-col justify-between ${
            cartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-6 border-b border-neutral-800 flex justify-between items-center bg-neutral-950">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-copper" />
              <h3 className="font-display font-bold text-base tracking-widest text-canvas">ACTIVE GEAR SYSTEM</h3>
            </div>
            <button 
              id="cart-close-btn"
              onClick={() => setCartOpen(false)}
              aria-label="Close cart"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-xs font-mono text-neutral-400 hover:text-copper uppercase cursor-pointer focus-visible:outline-2 focus-visible:outline-copper rounded-none"
            >
              [ CLOSE X ]
            </button>
          </div>

          {/* Tiered Free Gift Progress Bar (CRO Component) */}
          <div className="p-4 bg-neutral-900 border-b border-neutral-800 space-y-2">
            <div className="flex justify-between items-center font-mono text-[10px]">
              <span className="text-neutral-400 font-semibold uppercase">PRESTIGE REWARDS PROGRAM</span>
              <span className="text-copper font-bold">{freeGiftProgress.percent}%</span>
            </div>
            
            <div className="h-2 bg-basalt border border-neutral-800 rounded-none overflow-hidden">
              <div 
                className="h-full bg-copper transition-all duration-500"
                style={{ width: `${Math.min(100, freeGiftProgress.percent)}%` }}
              ></div>
            </div>

            <div className="font-mono text-[10px] text-neutral-400">
              {freeGiftProgress.needed > 0 ? (
                <span>Add <strong className="text-copper">${freeGiftProgress.needed.toFixed(2)}</strong> more to unlock <strong className="text-canvas uppercase">{freeGiftProgress.nextTier}</strong></span>
              ) : (
                <span className="text-emerald-400 font-bold">🎉 ALL REWARDS SECURED // VIP DISPATCH CONFIRMED</span>
              )}
            </div>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {activeCartItemsWithGifts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 font-mono text-xs text-neutral-500">
                <ShoppingBag size={32} className="text-neutral-700" />
                <p className="uppercase">ACTIVE BAG GEAR SYSTEM IS EMPTY</p>
                <p className="text-[10px] text-neutral-600 font-sans">Deploy elements from collection grid to configure protective barriers.</p>
              </div>
            ) : (
              activeCartItemsWithGifts.map((item, idx) => {
                const isFreeGift = (item as any).isFreeGift;
                const price = item.isSubscription ? item.product.subscriptionPrice : item.product.price;
                return (
                  <div 
                    key={idx} 
                    className={`border p-3.5 flex gap-4 items-center justify-between rounded-none ${
                      isFreeGift 
                        ? "border-hazard/50 bg-hazard/5" 
                        : "border-neutral-800 bg-neutral-950"
                    }`}
                  >
                    <div className="h-12 w-12 bg-neutral-900 overflow-hidden border border-neutral-800 flex-shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.title} 
                        className="object-cover w-full h-full filter grayscale"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-display font-semibold text-xs tracking-wider text-canvas truncate">
                          {item.product.title}
                        </h4>
                        {isFreeGift && (
                          <span className="bg-hazard text-canvas font-mono text-[8px] px-1.5 py-0.5 tracking-wider uppercase font-bold">
                            FREE GIFT
                          </span>
                        )}
                        {item.isSubscription && !isFreeGift && (
                          <span className="bg-copper/20 text-copper font-mono text-[8px] px-1.5 py-0.5 tracking-wider uppercase font-bold border border-copper/30">
                            AUTOPILOT
                          </span>
                        )}
                      </div>
                      
                      <p className="text-neutral-400 font-mono text-[10px] mt-0.5 truncate uppercase">
                        {item.variant.name} ({item.product.size})
                      </p>
                      
                      {!isFreeGift && (
                        <div className="flex items-center gap-2 mt-1.5">
                          <button 
                            onClick={() => handleUpdateCartQty(idx, -1)}
                            aria-label={`Decrease quantity of ${item.product.title}`}
                            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-neutral-400 hover:text-copper transition-colors focus-visible:outline-2 focus-visible:outline-copper rounded-none"
                          >
                            <Minus size={10} aria-hidden="true" />
                          </button>
                          <span className="font-mono text-xs text-canvas font-bold w-4 text-center" aria-live="polite">{item.quantity}</span>
                          <button 
                            onClick={() => handleUpdateCartQty(idx, 1)}
                            aria-label={`Increase quantity of ${item.product.title}`}
                            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-neutral-400 hover:text-copper transition-colors focus-visible:outline-2 focus-visible:outline-copper rounded-none"
                          >
                            <Plus size={10} aria-hidden="true" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="text-right flex-shrink-0 space-y-2">
                      <span className="font-mono text-xs font-bold block text-canvas">
                        {isFreeGift ? "$0.00" : `$${(price * item.quantity).toFixed(2)}`}
                      </span>
                      {!isFreeGift && (
                        <button 
                          onClick={() => handleRemoveFromCart(idx)}
                          className="text-neutral-500 hover:text-hazard transition-colors font-mono uppercase text-[9px] block"
                        >
                          REMOVE
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 sm:p-6 border-t border-neutral-800 bg-neutral-950 space-y-4">
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between items-center text-neutral-400">
                <span>ESTIMATED FREIGHT</span>
                <span className="text-emerald-400 font-bold uppercase">FREE</span>
              </div>
              <div className="flex justify-between items-center text-neutral-300 font-semibold pt-1 border-t border-neutral-900">
                <span>SUB-TOTAL</span>
                <span className="text-copper font-bold text-sm">${cartSubtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (cart.length === 0) {
                  alert("Your active gear system is empty.");
                  return;
                }
                alert("Simulating redirect to Shopify Plus 1-Tap Secure Checkout...");
                setCart([]);
                setCartOpen(false);
              }}
              className="w-full bg-copper hover:bg-canvas hover:text-basalt text-basalt font-display font-bold text-xs tracking-[0.15em] py-4 rounded-none uppercase transition-colors cursor-pointer"
            >
              PROCEED TO SECURE CHECKOUT
            </button>
            <div className="text-[10px] text-neutral-500 text-center font-mono">
              SECURED WITH AES-256 ENCRYPTION • VIP HOOKS INTEGRATED
            </div>
          </div>

        </div>

        {/* 7. Product Ritual & Application Protocol Modal */}
        {selectedProductDetails && (
          <div
            className="fixed inset-0 bg-basalt/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
            aria-hidden="true"
            onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          >
            <div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-product-title"
              tabIndex={-1}
              className="bg-neutral-950 border-2 border-copper w-full max-w-4xl p-6 sm:p-8 rounded-none shadow-[6px_6px_0px_0px_rgba(11,13,14,1)] relative animate-scale-up z-50 outline-none"
            >
              <button 
                onClick={closeModal}
                aria-label="Close product details"
                className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center text-neutral-400 hover:text-copper cursor-pointer z-10 focus-visible:outline-2 focus-visible:outline-copper rounded-none"
              >
                <X size={18} aria-hidden="true" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Media Column (Left) */}
                <div className="md:col-span-5 space-y-4">
                  <div className="relative border border-neutral-800 bg-basalt overflow-hidden aspect-square w-full">
                    <img 
                      src={modalActiveImage || selectedProductDetails.image} 
                      alt={selectedProductDetails.title} 
                      className="object-cover w-full h-full filter grayscale hover:grayscale-0 transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Gallery Thumbnails */}
                  {selectedProductDetails.images && selectedProductDetails.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2" role="group" aria-label="Product image gallery">
                      {selectedProductDetails.images.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setModalActiveImage(imgUrl)}
                          aria-label={`View ${selectedProductDetails.title} image ${idx + 1}`}
                          aria-pressed={(modalActiveImage || selectedProductDetails.image) === imgUrl}
                          className={`aspect-square min-h-[44px] border overflow-hidden transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-copper ${
                            (modalActiveImage || selectedProductDetails.image) === imgUrl
                              ? "border-copper bg-copper/5"
                              : "border-neutral-800 bg-neutral-900 hover:border-neutral-600"
                          }`}
                        >
                          <img
                            src={imgUrl}
                            alt={`${selectedProductDetails.title} — view ${idx + 1}`}
                            className="object-cover w-full h-full filter grayscale"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Content Column (Right) */}
                <div className="md:col-span-7 space-y-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <span className="font-mono text-[10px] text-copper uppercase tracking-widest font-bold">APPLICATION PROTOCOL RITUAL</span>
                      <h3 id="modal-product-title" className="font-display font-bold text-lg text-canvas tracking-wider mt-1">{selectedProductDetails.title}</h3>
                      <p className="text-neutral-400 font-mono text-xs mt-0.5">PRODUCT CODE: {selectedProductDetails.code}</p>
                    </div>

                    <div className="text-xs text-neutral-300 leading-relaxed font-sans bg-neutral-900/60 p-3 border border-neutral-800">
                      {selectedProductDetails.description}
                    </div>

                    <div className="space-y-3">
                      <span className="block font-mono text-[10px] text-neutral-500 uppercase tracking-wider font-bold">STEP-BY-STEP HAZARD DISCHARGE:</span>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                        {selectedProductDetails.ritual.map((step, sIdx) => (
                          <div key={sIdx} className="flex gap-3 font-mono text-xs text-neutral-300">
                            <span className="text-copper font-extrabold">{sIdx + 1}.</span>
                            <p className="leading-normal">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-900 flex justify-between items-center gap-4">
                    <div className="text-[10px] text-neutral-500 font-mono">
                      BARRIER SYSTEM ALPHA • EST. REYKJAVÍK 64°N
                    </div>
                    <button
                      onClick={closeModal}
                      className="bg-neutral-900 border border-neutral-800 hover:border-copper hover:text-copper text-xs font-mono font-bold text-canvas px-5 py-2 rounded-none uppercase transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-copper"
                    >
                      DISMISS ROUTINE
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
             PILLAR 3 — Lead Capture Popup
             Fires on 10s idle OR 50% scroll depth (whichever first).
             Permanently dismissed via localStorage flag.
             Position: fixed — zero CLS impact on document flow.
        ═══════════════════════════════════════════════════════════ */}
        {showLeadCapture && (
          <div
            className="fixed inset-0 bg-basalt/75 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center p-4"
            aria-hidden="true"
            onClick={(e) => { if (e.target === e.currentTarget) dismissLeadCapture(); }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="lead-capture-title"
              className="w-full max-w-md bg-neutral-950 border-2 border-copper p-6 sm:p-8 shadow-[6px_6px_0px_0px_#D96B43] space-y-5 animate-scale-up"
            >
              {/* Close */}
              <button
                onClick={dismissLeadCapture}
                aria-label="Close offer"
                className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center text-neutral-400 hover:text-copper focus-visible:outline-2 focus-visible:outline-copper"
              >
                <X size={16} aria-hidden="true" />
              </button>

              <div className="space-y-2">
                <span className="font-mono text-[10px] text-copper uppercase tracking-[0.25em] font-bold">
                  VANGUARD INSIDER ACCESS
                </span>
                <h2 id="lead-capture-title" className="font-display font-bold text-xl tracking-wider text-canvas uppercase">
                  UNLOCK 20% OFF YOUR FIRST EXPEDITION KIT
                </h2>
                <p className="text-neutral-400 text-xs font-sans leading-relaxed">
                  Join the AETHER &amp; ORE field dispatch. Receive exclusive hardware drops, formulation logs, and a 20% discount code on your first order.
                </p>
              </div>

              {!leadSubmitted ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (leadEmail.trim()) {
                      setLeadSubmitted(true);
                      // In production: POST to Klaviyo / Shopify Customer API
                    }
                  }}
                  className="space-y-3"
                >
                  <label htmlFor="lead-email" className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                    FIELD OPERATIVE EMAIL
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    required
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="operator@domain.com"
                    className="w-full bg-basalt border border-neutral-700 focus:border-copper px-4 py-3 text-xs font-mono text-canvas rounded-none outline-none placeholder:text-neutral-600 focus-visible:outline-2 focus-visible:outline-copper"
                    aria-required="true"
                  />
                  <button
                    type="submit"
                    className="w-full bg-copper hover:bg-canvas text-basalt font-display font-bold text-xs tracking-[0.2em] py-4 rounded-none uppercase transition-colors focus-visible:outline-2 focus-visible:outline-copper"
                  >
                    CLAIM 20% DISCOUNT CODE
                  </button>
                  <button
                    type="button"
                    onClick={dismissLeadCapture}
                    className="w-full text-[10px] font-mono text-neutral-500 hover:text-neutral-300 uppercase tracking-wider py-1 transition-colors"
                  >
                    No thanks, I'll pay full price
                  </button>
                </form>
              ) : (
                <div className="text-center space-y-3 py-4">
                  <div className="text-emerald-400 font-mono text-sm font-bold uppercase">✓ DISPATCH CONFIRMED</div>
                  <p className="text-neutral-300 text-xs">
                    Your 20% code is inbound. Check your field communications within 5 minutes.
                  </p>
                  <button
                    onClick={dismissLeadCapture}
                    className="w-full bg-neutral-900 border border-neutral-800 hover:border-copper text-canvas font-mono text-xs py-3 uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-copper"
                  >
                    CLOSE
                  </button>
                </div>
              )}

              <p className="text-[9px] text-neutral-600 font-mono text-center">
                No spam. Unsubscribe any time. Discount valid for 48 hours after receipt.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-basalt border-t border-neutral-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="h-4 w-1.5 bg-copper"></span>
              <span className="font-display font-bold text-xs tracking-wider text-canvas uppercase">
                AETHER & ORE // ENTERPRISE ARCHITECTURE BY DUKE SUPPLY CO.
              </span>
            </div>
            
            <div className="font-mono text-[10px] text-neutral-500">
              © {new Date().getFullYear()} AETHER & ORE • ALL CODES RESERVED • EST. REYKJAVÍK 64°N
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
