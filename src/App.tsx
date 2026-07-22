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
  const [modalTab, setModalTab] = useState<"details" | "reviews" | "frequently_bought">("details");
  const [userReviewName, setUserReviewName] = useState("");
  const [userReviewTitle, setUserReviewTitle] = useState("");
  const [userReviewComment, setUserReviewComment] = useState("");
  const [userReviewRating, setUserReviewRating] = useState(5);
  const [userReviewSubmitted, setUserReviewSubmitted] = useState(false);
  const [hardwareAngle, setHardwareAngle] = useState<number>(0);
  const [tactile360Active, setTactile360Active] = useState<boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<string>("ALL");
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
    setModalTab("details");
    setUserReviewSubmitted(false);
    setTactile360Active(false);
    setHardwareAngle(0);
    setReviewFilter("ALL");
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
      setHeroActiveImage("/assets/Raw Brushed Titanium Flask Studio View.webp");
    } else if (heroVariant.id === "v1_basalt") {
      setHeroActiveImage("/assets/Anodized Basalt Black Titanium Flask View.webp");
    } else if (heroVariant.id === "v1_copper") {
      setHeroActiveImage("/assets/hero photograph of an anodized dark titanium flask with knurled copper cap.webp");
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

  // ─── EXPEDITION CURRENCY & UNITS STATE ───
  const [currency, setCurrency] = useState<"USD" | "EUR" | "GBP" | "JPY">("USD");
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");

  const CURRENCY_MAP: Record<string, { rate: number; symbol: string }> = {
    USD: { rate: 1.0, symbol: "$" },
    EUR: { rate: 0.92, symbol: "€" },
    GBP: { rate: 0.78, symbol: "£" },
    JPY: { rate: 155.0, symbol: "¥" }
  };

  const formatPrice = (usdAmount: number, targetCurrency = currency) => {
    const c = CURRENCY_MAP[targetCurrency] || CURRENCY_MAP.USD;
    const converted = usdAmount * c.rate;
    if (targetCurrency === "JPY") {
      return `${c.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${c.symbol}${converted.toFixed(2)}`;
  };

  const formatSize = (sizeStr: string, sys = unitSystem) => {
    if (sys === "metric") return sizeStr;
    if (sizeStr === "500ml") return "16.9 fl.oz";
    if (sizeStr === "150g") return "5.3 oz";
    if (sizeStr === "50ml") return "1.7 fl.oz";
    if (sizeStr === "75ml") return "2.5 fl.oz";
    if (sizeStr === "60ml") return "2.0 fl.oz";
    return sizeStr;
  };

  // ─── SEARCH & CATEGORY FILTER STATE ───
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("ALL");

  // ─── LASER ENGRAVING INPUT STATE ───
  const [laserEngravings, setLaserEngravings] = useState<Record<string, string>>({});

  // ─── MODULAR EXPEDITION KIT CONFIGURATOR STATE ───
  const [kitVessel, setKitVessel] = useState<Product>(PRODUCTS_DATA[0]);
  const [kitPods, setKitPods] = useState<Product[]>([PRODUCTS_DATA[1], PRODUCTS_DATA[2]]);
  const [kitWrap, setKitWrap] = useState<"Basalt Charcoal" | "Nordic Navy" | "Obsidian Black">("Basalt Charcoal");
  const [kitAddedSuccess, setKitAddedSuccess] = useState(false);

  // ─── HAZARD STRESS TEST SIMULATOR STATE ───
  const [stressWind, setStressWind] = useState(65);
  const [stressTemp, setStressTemp] = useState(-25);
  const [stressUV, setStressUV] = useState(9);

  // ─── AR HAPTIC TELEMETRY & THERMAL HEATMAP STATE ───
  const [arWireframeMode, setArWireframeMode] = useState<boolean>(false);
  const [arThermalMode, setArThermalMode] = useState<boolean>(false);

  // ─── SUB-ZERO SKIN RESILIENCE QUIZ STATE ───
  const [quizModalOpen, setQuizModalOpen] = useState<boolean>(false);
  const [quizStep, setQuizStep] = useState<number>(1);
  const [quizElevation, setQuizElevation] = useState<"moderate" | "high" | "extreme">("high");
  const [quizActivity, setQuizActivity] = useState<"alpine" | "industrial" | "marine">("alpine");
  const [quizSensitivity, setQuizSensitivity] = useState<"standard" | "sensitive" | "reactive">("sensitive");
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // ─── VANGUARD VIP LOYALTY VAULT STATE ───
  const [vipDrawerOpen, setVipDrawerOpen] = useState<boolean>(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategoryFilter === "ALL" ||
        (selectedCategoryFilter === "FLAGSHIP" && p.isFlagship) ||
        p.category.toLowerCase() === selectedCategoryFilter.toLowerCase();

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategoryFilter]);

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

            <div className="flex items-center gap-2">
              {/* Quiz Trigger */}
              <button
                onClick={() => setQuizModalOpen(true)}
                className="bg-neutral-950 border border-copper/50 hover:border-copper text-copper font-mono text-xs px-2.5 py-1.5 cursor-pointer uppercase font-bold hidden lg:flex items-center gap-1.5"
              >
                <span>⚡ SKIN QUIZ</span>
              </button>

              {/* VIP Vault Trigger */}
              <button
                onClick={() => setVipDrawerOpen(true)}
                className="bg-neutral-950 border border-neutral-800 hover:border-copper text-neutral-300 hover:text-copper font-mono text-xs px-2.5 py-1.5 cursor-pointer uppercase font-semibold hidden md:flex items-center gap-1"
              >
                <span>👑 VANGUARD VAULT</span>
              </button>

              {/* Currency Selector */}
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="bg-neutral-950 border border-neutral-800 text-canvas font-mono text-xs px-2 py-1.5 focus:border-copper outline-none cursor-pointer"
                aria-label="Select currency"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>

              {/* Unit System Toggle */}
              <button
                onClick={() => setUnitSystem((prev) => (prev === "metric" ? "imperial" : "metric"))}
                className="bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-copper font-mono text-xs px-2 py-1.5 cursor-pointer uppercase font-semibold"
                title="Toggle Metric / Imperial units"
              >
                {unitSystem === "metric" ? "METRIC" : "IMPERIAL"}
              </button>

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
                      AETHER & ORE // ENGINEERED FORMULATIONS
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
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                  <div>
                    <span className="font-mono text-xs text-copper uppercase tracking-[0.2em] font-semibold">SYSTEM OVERVIEW</span>
                    <h2 className="text-3xl font-display font-bold tracking-wider text-canvas mt-2">TACTICAL COLLECTION</h2>
                  </div>
                  <div className="text-neutral-500 font-mono text-xs uppercase">
                    SHOWING {filteredProducts.length} OF {PRODUCTS_DATA.length} ENGINEERED SOLUTIONS
                  </div>
                </div>

                {/* Instant Search & Category Filter Controls */}
                <div className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-between border-y border-neutral-800 py-4 bg-neutral-950/60 p-4">
                  {/* Search Input */}
                  <div className="w-full md:w-80 relative">
                    <input
                      type="text"
                      placeholder="Search title, SKU code, or formulation..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 text-canvas font-mono text-xs p-2.5 pl-3 focus:border-copper outline-none"
                    />
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex flex-wrap gap-2 font-mono text-xs w-full md:w-auto">
                    {["ALL", "FLAGSHIP", "HARDWARE", "APOTHECARY", "SKINCARE"].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategoryFilter(cat)}
                        className={`px-3 py-1.5 border transition-all cursor-pointer ${
                          selectedCategoryFilter === cat
                            ? "bg-copper text-basalt font-bold border-copper"
                            : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-canvas"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* Flagship Product: Double cell (occupies 2 columns on lg screen) */}
                  <div className="lg:col-span-2 border-2 border-neutral-800 bg-neutral-950 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-copper shadow-[4px_4px_0px_0px_rgba(11,13,14,1)] hover:shadow-[4px_4px_0px_0px_#D96B43]">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="bg-copper text-basalt font-mono text-[9px] font-bold px-2 py-0.5 tracking-wider uppercase">
                              FLAGSHIP HARDWARE SYSTEM
                            </span>
                            <span className="text-[9px] font-mono text-emerald-400 border border-emerald-800/60 px-1.5 py-0.5">
                              ONLY 8 LEFT IN BATCH #409
                            </span>
                          </div>
                          <h3 className="font-display font-bold text-xl tracking-wider text-canvas mt-2">
                            {flagshipProduct.title}
                          </h3>
                        </div>
                        <span className="font-mono text-lg font-extrabold text-copper">{formatPrice(flagshipProduct.price)}</span>
                      </div>

                      {/* aspect-video = 16/9. The colon syntax "16:9" is not valid CSS — slash form required. */}
                      <div 
                        onClick={() => openProductProtocol(flagshipProduct)}
                        className={`aspect-video w-full bg-basalt overflow-hidden border border-neutral-800 relative cursor-pointer group ${
                          arWireframeMode ? "border-copper shadow-[0_0_15px_rgba(217,107,67,0.5)]" : ""
                        }`}
                      >
                        <img 
                          src={flagshipProduct.image} 
                          alt="Anodized Titanium Flask Detail" 
                          className={`object-cover w-full h-full transition-all duration-500 ${
                            arThermalMode ? "hue-rotate-180 contrast-200" : "filter grayscale group-hover:grayscale-0"
                          }`}
                          loading="lazy"
                        />
                        {/* Overlay Product Telemetry Tag */}
                        <div className="absolute top-2 right-2 bg-basalt/90 text-copper border border-neutral-800 font-mono text-[8px] px-2 py-0.5 font-bold uppercase backdrop-blur-sm z-10">
                          SKU: {flagshipProduct.code} • {flagshipProduct.category} • {formatSize(flagshipProduct.size)}
                        </div>

                        {arWireframeMode && (
                          <div className="absolute inset-0 bg-[radial-gradient(#D96B43_1px,transparent_1px)] [background-size:12px_12px] opacity-40 pointer-events-none"></div>
                        )}

                        <div className="absolute inset-0 bg-copper/0 group-hover:bg-copper/10 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 bg-basalt/90 text-copper border border-copper font-mono text-[9px] px-3 py-1 font-bold tracking-widest uppercase transition-opacity">
                            + QUICK POPUP MODAL
                          </span>
                        </div>
                      </div>

                      {/* AR Telemetry Mode Toggle Controls */}
                      <div className="flex gap-2 font-mono text-[9px] pt-1">
                        <button
                          type="button"
                          onClick={() => setArWireframeMode(!arWireframeMode)}
                          className={`px-2 py-1 border transition-colors cursor-pointer ${
                            arWireframeMode ? "bg-copper text-basalt font-bold border-copper" : "bg-neutral-900 text-neutral-400 border-neutral-800"
                          }`}
                        >
                          {arWireframeMode ? "✓ AR GRID ON" : "AR WIREFRAME 3D"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setArThermalMode(!arThermalMode)}
                          className={`px-2 py-1 border transition-colors cursor-pointer ${
                            arThermalMode ? "bg-emerald-950 text-emerald-400 font-bold border-emerald-800" : "bg-neutral-900 text-neutral-400 border-neutral-800"
                          }`}
                        >
                          {arThermalMode ? "✓ THERMAL ON" : "THERMAL HEATMAP"}
                        </button>
                      </div>

                      <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                        {flagshipProduct.description}
                      </p>

                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-neutral-800/60 text-center text-[10px] font-mono text-neutral-400">
                        <div>
                          <span className="block text-[8px] text-neutral-500 uppercase">CONTAINER SIZE</span>
                          {formatSize(flagshipProduct.size)}
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

                      {/* Custom Laser Engraving Input */}
                      <div className="pt-1 font-mono text-[9px] space-y-1">
                        <label className="text-copper font-bold block uppercase tracking-wider">CUSTOM LASER ETCHING (FREE):</label>
                        <input
                          type="text"
                          maxLength={14}
                          placeholder="e.g. 64°08'N 21°56'W or initials"
                          value={laserEngravings[flagshipProduct.id] || ""}
                          onChange={(e) => setLaserEngravings({ ...laserEngravings, [flagshipProduct.id]: e.target.value })}
                          className="w-full bg-neutral-900 border border-neutral-800 text-canvas px-2.5 py-1.5 focus:border-copper outline-none text-xs"
                        />
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
                        onClick={() => handleAddToCart(flagshipProduct, flagshipProduct.variants[0], 1, false, laserEngravings[flagshipProduct.id])}
                        className="bg-copper hover:bg-canvas hover:text-basalt font-mono text-xs font-bold text-basalt py-2 px-4 rounded-none uppercase transition-colors cursor-pointer"
                      >
                        ADD TO SYSTEM
                      </button>
                    </div>
                  </div>

                  {/* Rest of the products in filtered products list */}
                  {filteredProducts.filter(p => !p.isFlagship).map((prod) => (
                    <div 
                      key={prod.id}
                      className="border-2 border-neutral-800 bg-neutral-950 p-5 flex flex-col justify-between transition-all duration-300 hover:border-copper hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(11,13,14,1)] hover:shadow-[4px_4px_0px_0px_#D96B43]"
                    >
                      <div>
                        <div 
                          onClick={() => openProductProtocol(prod)}
                          className="aspect-[4/3] w-full bg-basalt overflow-hidden border border-neutral-800 mb-4 relative cursor-pointer group"
                        >
                          <img 
                            src={prod.image} 
                            alt={prod.title} 
                            className="object-cover w-full h-full filter grayscale group-hover:grayscale-0 transition-all duration-500"
                            loading="lazy"
                          />
                          {/* Overlay Product Identification Telemetry Tag */}
                          <div className="absolute top-2 right-2 bg-basalt/90 text-copper border border-neutral-800 font-mono text-[8px] px-1.5 py-0.5 font-bold uppercase backdrop-blur-sm z-10">
                            {prod.code} • {formatSize(prod.size)}
                          </div>
                          <span className="absolute bottom-2 left-2 bg-basalt text-canvas border border-neutral-800 font-mono text-[8px] px-1.5 py-0.5 z-10">
                            {formatSize(prod.size)}
                          </span>
                          <div className="absolute inset-0 bg-copper/0 group-hover:bg-copper/10 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 bg-basalt/90 text-copper border border-copper font-mono text-[8px] px-2 py-0.5 font-bold tracking-wider uppercase transition-opacity">
                              + QUICK POPUP
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <span className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase">{prod.category}</span>
                            <h4 
                              onClick={() => openProductProtocol(prod)}
                              className="font-display font-semibold text-xs tracking-wider text-canvas line-clamp-1 mt-0.5 cursor-pointer hover:text-copper transition-colors"
                            >
                              {prod.title}
                            </h4>
                          </div>
                          <span className="font-mono text-xs font-bold text-copper">{formatPrice(prod.price)}</span>
                        </div>

                        <p className="text-neutral-400 text-[11px] leading-relaxed mt-2 line-clamp-3">
                          {prod.description}
                        </p>

                        <div className="mt-3 font-mono text-[9px] text-neutral-500 flex items-center gap-1.5 bg-neutral-900 px-2 py-1 border border-neutral-800/40">
                          <span className="text-copper uppercase font-bold">SCENT:</span>
                          {prod.scent}
                        </div>

                        {/* Laser Engraving Input for Hardware */}
                        {prod.category === "Hardware" && (
                          <div className="mt-3 font-mono text-[9px] space-y-1">
                            <label className="text-copper font-bold block uppercase">LASER ENGRAVING:</label>
                            <input
                              type="text"
                              maxLength={14}
                              placeholder="e.g. 64°08'N 21°56'W"
                              value={laserEngravings[prod.id] || ""}
                              onChange={(e) => setLaserEngravings({ ...laserEngravings, [prod.id]: e.target.value })}
                              className="w-full bg-neutral-900 border border-neutral-800 text-canvas px-2 py-1 focus:border-copper outline-none text-[10px]"
                            />
                          </div>
                        )}
                      </div>

                      <div className="mt-6 pt-3 border-t border-neutral-900 flex justify-between items-center">
                        <button
                          onClick={() => openProductProtocol(prod)}
                          className="text-[10px] font-mono text-neutral-400 hover:text-canvas hover:underline uppercase cursor-pointer"
                        >
                          PROTOCOL
                        </button>
                        <button
                          onClick={() => handleAddToCart(prod, prod.variants[0], 1, false, laserEngravings[prod.id])}
                          className="bg-neutral-900 border border-neutral-800 hover:border-copper hover:bg-copper/5 hover:text-copper text-xs font-mono font-bold text-canvas py-1.5 px-3 rounded-none uppercase transition-all cursor-pointer"
                        >
                          QUICK ADD
                        </button>
                      </div>
                    </div>
                  ))}

                </div>
              </section>

              {/* 3-STEP MODULAR EXPEDITION KIT BUILDER */}
              <section className="py-20 border-t border-neutral-800 bg-neutral-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                  <div className="text-center max-w-3xl mx-auto space-y-3">
                    <span className="font-mono text-[10px] text-copper uppercase tracking-[0.25em] font-bold">
                      MODULAR SYSTEM CUSTOMIZER // 20% KIT SAVINGS
                    </span>
                    <h2 className="font-display font-bold text-3xl tracking-wider text-canvas uppercase">
                      BUILD YOUR CUSTOM EXPEDITION VAULT
                    </h2>
                    <p className="text-neutral-400 text-xs font-mono">
                      SELECT 1 HARDWARE VESSEL + 2 FORMULATION MODULES + 1 WOOL TRANSIT WRAP
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Step 1: Vessel Selection */}
                    <div className="lg:col-span-4 border-2 border-neutral-800 bg-neutral-950 p-6 space-y-4">
                      <span className="bg-copper text-basalt font-mono text-[9px] font-bold px-2 py-0.5 uppercase">
                        STEP 1: HARDWARE VESSEL
                      </span>
                      <div className="space-y-3 pt-2">
                        {PRODUCTS_DATA.filter(p => p.category === "Hardware").map((v) => (
                          <div
                            key={v.id}
                            onClick={() => setKitVessel(v)}
                            className={`p-3 border flex items-center justify-between cursor-pointer transition-all ${
                              kitVessel.id === v.id ? "border-copper bg-copper/5" : "border-neutral-800 bg-neutral-900 hover:border-neutral-700"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <img src={v.image} alt={v.title} className="w-10 h-10 object-cover border border-neutral-800 filter grayscale" />
                              <div>
                                <h4 className="font-bold text-canvas text-xs">{v.title}</h4>
                                <span className="text-neutral-400 font-mono text-[10px]">{formatPrice(v.price)}</span>
                              </div>
                            </div>
                            <span className={`w-3.5 h-3.5 border rounded-none ${kitVessel.id === v.id ? "bg-copper border-copper" : "border-neutral-700"}`}></span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step 2: Formulations Selection */}
                    <div className="lg:col-span-4 border-2 border-neutral-800 bg-neutral-950 p-6 space-y-4">
                      <span className="bg-neutral-800 text-canvas border border-neutral-700 font-mono text-[9px] font-bold px-2 py-0.5 uppercase">
                        STEP 2: FORMULATION PODS (PICK 2)
                      </span>
                      <div className="space-y-2 pt-2 max-h-64 overflow-y-auto pr-1">
                        {PRODUCTS_DATA.filter(p => p.category !== "Hardware").map((pod) => {
                          const isSelected = kitPods.some(p => p.id === pod.id);
                          return (
                            <div
                              key={pod.id}
                              onClick={() => {
                                if (isSelected) {
                                  if (kitPods.length > 1) setKitPods(kitPods.filter(p => p.id !== pod.id));
                                } else {
                                  if (kitPods.length < 2) setKitPods([...kitPods, pod]);
                                  else setKitPods([kitPods[1], pod]);
                                }
                              }}
                              className={`p-2.5 border flex items-center justify-between cursor-pointer transition-all ${
                                isSelected ? "border-copper bg-copper/5" : "border-neutral-800 bg-neutral-900 hover:border-neutral-700"
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <img src={pod.image} alt={pod.title} className="w-8 h-8 object-cover border border-neutral-800 filter grayscale" />
                                <div>
                                  <h4 className="font-semibold text-canvas text-[11px] truncate max-w-[140px]">{pod.title}</h4>
                                  <span className="text-neutral-400 font-mono text-[9px]">{formatPrice(pod.price)}</span>
                                </div>
                              </div>
                              <span className={`w-3 h-3 border ${isSelected ? "bg-copper border-copper" : "border-neutral-700"}`}></span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 3: Wrap Color & Add to Bag Summary */}
                    <div className="lg:col-span-4 border-2 border-copper bg-neutral-950 p-6 space-y-5 flex flex-col justify-between">
                      <div className="space-y-4">
                        <span className="bg-copper text-basalt font-mono text-[9px] font-bold px-2 py-0.5 uppercase">
                          STEP 3: WOOL TRANSIT WRAP
                        </span>
                        
                        <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[10px]">
                          {(["Basalt Charcoal", "Nordic Navy", "Obsidian Black"] as const).map((wColor) => (
                            <button
                              key={wColor}
                              type="button"
                              onClick={() => setKitWrap(wColor)}
                              className={`p-2 border text-center transition-all cursor-pointer ${
                                kitWrap === wColor ? "border-copper bg-copper text-basalt font-bold" : "border-neutral-800 bg-neutral-900 text-neutral-400"
                              }`}
                            >
                              {wColor.split(" ")[0]}
                            </button>
                          ))}
                        </div>

                        {/* Kit Calculation Summary */}
                        <div className="p-3 bg-neutral-900 border border-neutral-800 space-y-1.5 font-mono text-xs">
                          <div className="flex justify-between text-neutral-400">
                            <span>RAW COMBINED:</span>
                            <span>{formatPrice(kitVessel.price + kitPods.reduce((s, p) => s + p.price, 0))}</span>
                          </div>
                          <div className="flex justify-between text-copper font-bold">
                            <span>20% KIT DISCOUNT:</span>
                            <span>-{formatPrice((kitVessel.price + kitPods.reduce((s, p) => s + p.price, 0)) * 0.2)}</span>
                          </div>
                          <div className="flex justify-between text-canvas font-extrabold text-sm pt-1 border-t border-neutral-800">
                            <span>EXPEDITION KIT TOTAL:</span>
                            <span className="text-copper">{formatPrice((kitVessel.price + kitPods.reduce((s, p) => s + p.price, 0)) * 0.8)}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          handleAddToCart(kitVessel, kitVessel.variants[0], 1, false, `Custom Kit Wrap: ${kitWrap}`);
                          kitPods.forEach(p => handleAddToCart(p, p.variants[0], 1, false));
                          setKitAddedSuccess(true);
                          setTimeout(() => setKitAddedSuccess(false), 3000);
                        }}
                        className="w-full bg-copper hover:bg-canvas hover:text-basalt text-basalt font-display font-bold text-xs py-3.5 rounded-none uppercase transition-colors cursor-pointer"
                      >
                        {kitAddedSuccess ? "✓ CUSTOM KIT ADDED TO BAG!" : "ASSEMBLE & ADD KIT TO BAG"}
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* FULL UNCROPPED EDITORIAL CAMPAIGN DUAL-SYSTEM PROMO BANNER */}
              <section id="hardware-campaign" className="py-16 border-t border-b border-neutral-800 bg-neutral-950 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 relative overflow-hidden border border-neutral-800 bg-black aspect-[4/3] md:aspect-[16/9] w-full flex items-center justify-center">
                    <img
                      src="/assets/Split screen ad visual.webp"
                      alt="AETHER & ORE Dual Formulation & Hardware Campaign Visual"
                      className="w-full h-full object-contain filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-basalt via-transparent to-transparent opacity-70 pointer-events-none"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end font-mono text-[10px] text-canvas z-10">
                      <span className="bg-copper text-basalt px-2 py-0.5 font-bold uppercase tracking-wider">CAMPAIGN FEATURE // DUAL SYSTEM</span>
                      <span className="text-neutral-400">REYKJAVÍK 64°N</span>
                    </div>
                  </div>
                  <div className="lg:col-span-6 space-y-5">
                    <span className="font-mono text-xs text-copper tracking-[0.25em] font-semibold uppercase">HARDWARE & DERMABRASION INTEGRATION</span>
                    <h3 className="font-display text-2xl sm:text-4xl font-extrabold uppercase text-canvas tracking-tight leading-tight">
                      TACTILE HARDWARE MEETS VOLCANIC ASH ARMOR
                    </h3>
                    <p className="text-neutral-400 font-mono text-xs leading-relaxed">
                      Forged to withstand high-altitude freeze, thermal shock, and granite rock friction. Combine Grade-5 titanium hydration vessels with deep-sea thermophile lipids and basalt ash dermabrasion blocks for maximum skin recovery.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-4">
                      <a href="#collection" className="bg-copper hover:bg-canvas hover:text-basalt text-basalt text-xs font-mono font-bold px-5 py-3 rounded-none uppercase transition-colors">
                        EXPLORE COMPLETE EXPEDITION KIT
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* DEDICATED COMPLETE COLLECTION MASTER SUITE SECTION */}
              <section id="master-suite" className="py-20 border-t border-neutral-800 bg-neutral-900/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 space-y-6">
                    <span className="bg-copper text-basalt font-mono text-[10px] font-bold px-2.5 py-1 uppercase tracking-widest">
                      THE COMPLETE MASTER EXPEDITION VAULT SUITE
                    </span>
                    <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-canvas uppercase tracking-tight">
                      ALL 6 SYSTEM MODULES IN ONE VAULT
                    </h2>
                    <p className="text-neutral-300 font-mono text-xs leading-relaxed">
                      Includes the Grade-5 Titanium Flask, Basalt Volcanic Block, Alpine Barrier Cream, Carbon Hand Balm, Glacier Shield Dispenser, and Milled Brass Vault — encased in our wool transit wrap.
                    </p>

                    <div className="p-4 bg-neutral-950 border border-neutral-800 space-y-2 font-mono text-xs">
                      <div className="flex justify-between text-neutral-400">
                        <span>INDIVIDUAL COMBINED PRICE:</span>
                        <span className="line-through">{formatPrice(349)}</span>
                      </div>
                      <div className="flex justify-between text-copper font-bold">
                        <span>20% VANGUARD SUITE SAVINGS:</span>
                        <span>-{formatPrice(70)}</span>
                      </div>
                      <div className="flex justify-between text-canvas font-extrabold text-base pt-2 border-t border-neutral-800">
                        <span>MASTER SUITE PRICE:</span>
                        <span className="text-copper">{formatPrice(279)}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        PRODUCTS_DATA.forEach(p => handleAddToCart(p, p.variants[0], 1, false));
                      }}
                      className="w-full sm:w-auto bg-copper hover:bg-canvas hover:text-basalt text-basalt font-display font-bold text-xs py-4 px-8 uppercase transition-colors cursor-pointer"
                    >
                      ADD COMPLETE MASTER SUITE TO BAG — {formatPrice(279)}
                    </button>
                  </div>

                  <div className="lg:col-span-6 relative border-2 border-neutral-800 bg-neutral-950 overflow-hidden group">
                    <img
                      src="/assets/studio group photograph of the complete AETHER & ORE skincare module collection.webp"
                      alt="Studio group photograph of the complete AETHER & ORE skincare module collection"
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                      loading="lazy"
                    />
                    <div className="absolute bottom-3 left-3 bg-basalt/90 text-copper border border-neutral-800 font-mono text-[9px] px-2.5 py-1 font-bold uppercase backdrop-blur-sm">
                      COMPLETE MASTER MODULE SUITE // 6 PIECES
                    </div>
                  </div>
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
                    {/* Item 1: High-Altitude Lifestyle Campaign */}
                    <div className="md:col-span-8 group relative overflow-hidden border border-neutral-800 bg-neutral-950 flex flex-col justify-between p-6 h-[340px]">
                      <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                        <img 
                          src="/assets/portrait of a 38-year-old alpine climber with weathered, healthy skin and crisp focus.webp" 
                          alt="High-Altitude Lifestyle Campaign — 38-year-old alpine climber on Nordic Ridge" 
                          className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                      <div className="relative z-10 flex justify-between items-start">
                        <span className="bg-copper text-basalt font-mono text-[9px] font-bold px-2 py-0.5 uppercase">
                          HIGH-ALTITUDE LIFESTYLE CAMPAIGN
                        </span>
                        <span className="font-mono text-[10px] text-neutral-400">4:5 LEICA SL2</span>
                      </div>
                      <div className="relative z-10 space-y-2 bg-neutral-950/80 p-4 border border-neutral-800 max-w-md backdrop-blur-sm">
                        <h4 className="font-display font-bold text-xs tracking-wider text-canvas uppercase">
                          ALPINE CLIMBER FIELD ASSESSMENT
                        </h4>
                        <p className="text-neutral-400 font-mono text-[10px] leading-relaxed">
                          Subject testing Alpine Barrier Cream during vertical ascent in Zone 01 (Nordic Ridge). Temperature: -14°C. Relative humidity: 88%. Absolute skin lipid shield confirmed.
                        </p>
                      </div>
                    </div>

                    {/* Item 2: Team / Founder Photography */}
                    <div className="md:col-span-4 group relative overflow-hidden border border-neutral-800 bg-neutral-950 flex flex-col justify-between p-6 h-[340px]">
                      <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                        <img 
                          src="/assets/two cosmetic formulation engineers in dark charcoal lab coats discussing liquid active samples inside an industrial minimalist studio.webp" 
                          alt="Team & Founder Photography — Two AETHER & ORE formulation engineers discussing liquid active samples" 
                          className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                      <div className="relative z-10 flex justify-between items-start">
                        <span className="bg-neutral-800 text-canvas border border-neutral-700 font-mono text-[9px] font-bold px-2 py-0.5 uppercase">
                          TEAM & FOUNDER PHOTOGRAPHY
                        </span>
                        <span className="font-mono text-[10px] text-neutral-400">STUDIO LOG #011</span>
                      </div>
                      <div className="relative z-10 space-y-2 bg-neutral-950/80 p-4 border border-neutral-800 backdrop-blur-sm">
                        <h4 className="font-display font-bold text-xs tracking-wider text-canvas uppercase">
                          FORMULATION SYNTHESIS
                        </h4>
                        <p className="text-neutral-400 font-mono text-[10px] leading-relaxed">
                          Dr. Rostova monitoring deep-sea thermophile liposomes inside our industrial minimalist studio setup.
                        </p>
                      </div>
                    </div>

                    {/* Item 3: Factory / Cleanroom Formulation Lab */}
                    <div className="md:col-span-4 group relative overflow-hidden border border-neutral-800 bg-neutral-950 flex flex-col justify-between p-6 h-[280px]">
                      <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                        <img 
                          src="/assets/high-tech cleanroom formulation lab in Zurich.webp" 
                          alt="Factory / Cleanroom Formulation Lab in Zurich" 
                          className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                      <div className="relative z-10 flex justify-between items-start">
                        <span className="bg-neutral-800 text-neutral-400 border border-neutral-800 font-mono text-[9px] px-2 py-0.5 uppercase">
                          FACTORY / CLEANROOM LAB
                        </span>
                        <span className="font-mono text-[10px] text-neutral-500">ZURICH // 16:9</span>
                      </div>
                      <div className="relative z-10 bg-neutral-950/90 p-3 border border-neutral-900 font-mono text-[10px] text-neutral-300">
                        <div className="text-copper font-extrabold mb-1 uppercase">STAINLESS BIO-REACTORS</div>
                        Cleanroom formulation lab in Zurich with stainless steel bio-reactors & precision robotics.
                      </div>
                    </div>

                    {/* Item 4: Sustainability & Circular Hardware Concept */}
                    <div className="md:col-span-4 group relative overflow-hidden border border-neutral-800 bg-neutral-950 flex flex-col justify-between p-6 h-[280px]">
                      <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                        <img 
                          src="/assets/a molten copper drop hitting cold water alongside recycled aluminum shavings.webp" 
                          alt="Sustainability & Circular Hardware Concept — Molten copper drop hitting cold water" 
                          className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                      <div className="relative z-10 flex justify-between items-start">
                        <span className="bg-neutral-800 text-neutral-400 border border-neutral-800 font-mono text-[9px] px-2 py-0.5 uppercase">
                          SUSTAINABILITY & CIRCULARITY
                        </span>
                        <span className="font-mono text-[10px] text-neutral-500">RAW CRAFTSMANSHIP</span>
                      </div>
                      <div className="relative z-10 bg-neutral-950/90 p-3 border border-neutral-900 font-mono text-[10px] text-neutral-300">
                        <div className="text-copper font-extrabold mb-1 uppercase">RECYCLED HARDWARE ORE</div>
                        Molten copper drop hitting cold water alongside recycled aluminum shavings.
                      </div>
                    </div>

                    {/* Item 5: Blog / Journal Featured Header Image */}
                    <div className="md:col-span-4 group relative overflow-hidden border border-neutral-800 bg-neutral-950 flex flex-col justify-between p-6 h-[280px]">
                      <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                        <img 
                          src="/assets/frozen glacial water crystals expanding under a polarized light microscope.webp" 
                          alt="Blog / Journal Featured Header Image — Frozen glacial water crystals under polarized light microscope" 
                          className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                      <div className="relative z-10 flex justify-between items-start">
                        <span className="bg-neutral-800 text-neutral-400 border border-neutral-800 font-mono text-[9px] px-2 py-0.5 uppercase">
                          JOURNAL FEATURED HEADER
                        </span>
                        <span className="font-mono text-[10px] text-neutral-500">CRY_POLAR_02</span>
                      </div>
                      <div className="relative z-10 bg-neutral-950/90 p-3 border border-neutral-900 font-mono text-[10px] text-neutral-300">
                        <div className="text-copper font-extrabold mb-1 uppercase">GLACIAL CRYSTAL MICROSCOPY</div>
                        Polarized microscope photography of frozen glacial water crystals.
                      </div>
                    </div>

                    {/* Item 6: Collection Banner (Barrier Care) */}
                    <div className="md:col-span-4 group relative overflow-hidden border border-neutral-800 bg-neutral-950 flex flex-col justify-between p-6 h-[300px]">
                      <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                        <img 
                          src="/assets/basalt rocks resting in shallow icy water with subtle copper mineral veins.webp" 
                          alt="Collection Banner (Barrier Care) — Basalt rocks in shallow icy water with copper mineral veins" 
                          className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                      <div className="relative z-10 flex justify-between items-start">
                        <span className="bg-copper text-basalt font-mono text-[9px] font-bold px-2 py-0.5 uppercase">
                          COLLECTION BANNER (BARRIER CARE)
                        </span>
                        <span className="font-mono text-[10px] text-neutral-400">21:9 RATIO</span>
                      </div>
                      <div className="relative z-10 space-y-1">
                        <h4 className="font-display font-bold text-xs tracking-wider text-canvas uppercase">
                          KINTSUGI BASALT ORE FIELD
                        </h4>
                        <p className="text-neutral-400 font-mono text-[10px] leading-relaxed">
                          Cracked volcanic bedrock containing rich sulfurous veins and obsidian minerals.
                        </p>
                      </div>
                    </div>

                    {/* Item 7: Seasonal Winter Campaign Banner */}
                    <div className="md:col-span-4 group relative overflow-hidden border border-neutral-800 bg-neutral-950 flex flex-col justify-between p-6 h-[300px]">
                      <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                        <img 
                          src="/assets/three matte black refillable skincare pods encased in a dark wool felt travel wrap.webp" 
                          alt="Seasonal Winter Campaign Banner — Three matte black refillable skincare pods in wool felt travel wrap" 
                          className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                      <div className="relative z-10 flex justify-between items-start">
                        <span className="bg-neutral-800 text-canvas border border-neutral-700 font-mono text-[9px] font-bold px-2 py-0.5 uppercase">
                          SEASONAL WINTER CAMPAIGN
                        </span>
                        <span className="font-mono text-[10px] text-neutral-400">21:9 FLAT-LAY</span>
                      </div>
                      <div className="relative z-10 space-y-1">
                        <h4 className="font-display font-bold text-xs tracking-wider text-canvas uppercase">
                          WOOL FELT TRANSIT POD SUITE
                        </h4>
                        <p className="text-neutral-400 font-mono text-[10px] leading-relaxed">
                          High-density wool transit wrap protecting matte black refillable skincare pods.
                        </p>
                      </div>
                    </div>

                    {/* Item 8: TikTok / Instagram Story Creative (9:16 Vertical) */}
                    <div className="md:col-span-4 group relative overflow-hidden border border-neutral-800 bg-neutral-950 flex flex-col justify-between p-6 h-[300px]">
                      <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                        <img 
                          src="/assets/a hand holding a dark aluminum flask under a freezing alpine waterfall.webp" 
                          alt="TikTok / Instagram Story Creative — Hand holding dark aluminum flask under freezing alpine waterfall" 
                          className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                      <div className="relative z-10 flex justify-between items-start">
                        <span className="bg-copper text-basalt font-mono text-[9px] font-bold px-2 py-0.5 uppercase">
                          TIKTOK / STORY CREATIVE
                        </span>
                        <span className="font-mono text-[10px] text-neutral-400">9:16 VERTICAL</span>
                      </div>
                      <div className="relative z-10 space-y-1">
                        <h4 className="font-display font-bold text-xs tracking-wider text-canvas uppercase">
                          FREEZING WATERFALL DISPATCH
                        </h4>
                        <p className="text-neutral-400 font-mono text-[10px] leading-relaxed">
                          Motion freeze action creative holding dark aluminum flask under Arctic waterfall.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* INTERACTIVE HAZARD STRESS TEST SIMULATOR */}
              <section className="py-20 border-t border-neutral-800 bg-neutral-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                  <div className="text-center max-w-3xl mx-auto space-y-3">
                    <span className="font-mono text-[10px] text-copper uppercase tracking-[0.25em] font-bold">
                      ENVIRONMENTAL FRICTION MATRIX // REAL-TIME RISK CALCULATOR
                    </span>
                    <h2 className="font-display font-bold text-3xl tracking-wider text-canvas uppercase">
                      HAZARD STRESS TEST SIMULATOR
                    </h2>
                    <p className="text-neutral-400 text-xs font-mono">
                      ADJUST ALPINE EXPOSURE VARIABLES TO COMPUTE SKIN BARRIER BREAKDOWN RISK & FORMULATION ANTIDOTE
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-neutral-800 bg-neutral-900/40 p-6 sm:p-8">
                    {/* Sliders Column */}
                    <div className="lg:col-span-7 space-y-6">
                      {/* Slider 1: Wind Velocity */}
                      <div className="space-y-2 font-mono text-xs">
                        <div className="flex justify-between">
                          <span className="text-neutral-300">WIND VELOCITY:</span>
                          <span className="text-copper font-bold">{stressWind} KM/H</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="120"
                          value={stressWind}
                          onChange={(e) => setStressWind(Number(e.target.value))}
                          className="w-full accent-copper cursor-pointer bg-neutral-950 border border-neutral-800"
                        />
                      </div>

                      {/* Slider 2: Sub-Zero Temperature */}
                      <div className="space-y-2 font-mono text-xs">
                        <div className="flex justify-between">
                          <span className="text-neutral-300">SUB-ZERO TEMPERATURE:</span>
                          <span className="text-copper font-bold">{stressTemp}°C</span>
                        </div>
                        <input
                          type="range"
                          min="-50"
                          max="20"
                          value={stressTemp}
                          onChange={(e) => setStressTemp(Number(e.target.value))}
                          className="w-full accent-copper cursor-pointer bg-neutral-950 border border-neutral-800"
                        />
                      </div>

                      {/* Slider 3: UV Radiation */}
                      <div className="space-y-2 font-mono text-xs">
                        <div className="flex justify-between">
                          <span className="text-neutral-300">UV RADIATION INDEX:</span>
                          <span className="text-copper font-bold">INDEX {stressUV}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="12"
                          value={stressUV}
                          onChange={(e) => setStressUV(Number(e.target.value))}
                          className="w-full accent-copper cursor-pointer bg-neutral-950 border border-neutral-800"
                        />
                      </div>

                      {/* Telemetry Output Metrics */}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-800 font-mono text-xs">
                        <div className="p-3 bg-neutral-950 border border-neutral-800">
                          <span className="text-neutral-500 text-[10px] block">LIPID EROSION RISK</span>
                          <span className="text-xl font-extrabold text-copper">
                            {Math.min(100, Math.round((stressWind * 0.35) + (Math.abs(stressTemp - 20) * 0.7) + (stressUV * 3.5)))}%
                          </span>
                        </div>
                        <div className="p-3 bg-neutral-950 border border-neutral-800">
                          <span className="text-neutral-500 text-[10px] block">FROSTBITE HAZARD INDEX</span>
                          <span className="text-xl font-extrabold text-emerald-400">
                            {stressTemp < 0 ? Math.round(Math.abs(stressTemp) * 1.4 + stressWind * 0.4) : 0} PTS
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Antidote Recommendation Column */}
                    <div className="lg:col-span-5 border-2 border-copper bg-neutral-950 p-6 space-y-4">
                      <span className="bg-copper text-basalt font-mono text-[9px] font-bold px-2 py-0.5 uppercase">
                        PRESCRIBED FORMULATION ANTIDOTE
                      </span>

                      <div className="flex items-center gap-4">
                        <img
                          src={stressUV > 7 ? PRODUCTS_DATA[5].image : PRODUCTS_DATA[2].image}
                          alt="Formulation Antidote"
                          className="w-16 h-16 object-cover border border-neutral-800 filter grayscale"
                        />
                        <div>
                          <h4 className="font-display font-bold text-sm text-canvas">
                            {stressUV > 7 ? PRODUCTS_DATA[5].title : PRODUCTS_DATA[2].title}
                          </h4>
                          <span className="text-copper font-mono text-xs font-bold">
                            {formatPrice(stressUV > 7 ? PRODUCTS_DATA[5].price : PRODUCTS_DATA[2].price)}
                          </span>
                        </div>
                      </div>

                      <p className="text-neutral-400 font-mono text-[11px] leading-relaxed">
                        {stressUV > 7
                          ? "High-UV Glacier Shield Dispenser creates a physical mineral block preventing cellular DNA degradation under high altitude exposure."
                          : "Sub-Zero Alpine Lip Balm & Hydro-Gel creates an impenetrable lipid film resisting high windchill freeze."}
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          const targetProd = stressUV > 7 ? PRODUCTS_DATA[5] : PRODUCTS_DATA[2];
                          handleAddToCart(targetProd, targetProd.variants[0], 1, false);
                        }}
                        className="w-full bg-copper hover:bg-canvas hover:text-basalt text-basalt font-mono font-bold text-xs py-3 rounded-none uppercase transition-colors cursor-pointer"
                      >
                        + ADD PRESCRIBED SHIELD TO BAG
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* AETHER & ORE PACKAGING PROTOCOL SECTION WITH KNOLLING FLAT LAY */}
              <section id="packaging-protocol" className="bg-neutral-950 border-t border-neutral-800 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 relative border border-neutral-800 overflow-hidden group">
                    <img
                      src="/assets/knolling flat lay photograph of disassembled skincare packaging.webp"
                      alt="Exploded Packaging Knolling Flat Lay — disassembled skincare packaging grid"
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                      loading="lazy"
                    />
                    <div className="absolute bottom-3 left-3 bg-basalt/90 text-copper border border-neutral-800 font-mono text-[9px] px-2.5 py-1 font-bold uppercase backdrop-blur-sm">
                      KNOLLING PACKAGING PROTOCOL // 100% RECYCLED MARINE ALUMINUM
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-5">
                    <span className="font-mono text-xs text-copper uppercase tracking-[0.25em] font-semibold">ZERO-WASTE REFILL ARCHITECTURE</span>
                    <h3 className="font-display text-3xl font-extrabold tracking-wider text-canvas uppercase">
                      AETHER & ORE PACKAGING PROTOCOL
                    </h3>
                    <p className="text-neutral-300 text-xs font-mono leading-relaxed">
                      {BRAND_SYSTEM.packaging.vessel} {BRAND_SYSTEM.packaging.outer} Marking system: {BRAND_SYSTEM.packaging.marking}
                    </p>
                    <div className="grid grid-cols-3 gap-3 pt-2 font-mono text-[10px] text-neutral-400">
                      <div className="p-3 bg-neutral-900 border border-neutral-800">
                        <span className="text-copper font-bold block mb-1">99.8% BIO</span>
                        DEGRADABLE
                      </div>
                      <div className="p-3 bg-neutral-900 border border-neutral-800">
                        <span className="text-copper font-bold block mb-1">100% RECYCLED</span>
                        MARINE ORE
                      </div>
                      <div className="p-3 bg-neutral-900 border border-neutral-800">
                        <span className="text-copper font-bold block mb-1">0% SYNTHETIC</span>
                        PLASTIC RESIDUE
                      </div>
                    </div>
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
    "/assets/hero photograph of an anodized dark titanium flask with knurled copper cap.webp"
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
                        {item.variant.name} ({formatSize(item.product.size)})
                      </p>

                      {item.engraving && (
                        <span className="text-copper font-mono text-[9px] block mt-0.5 font-bold uppercase">
                          ETCH: "{item.engraving}"
                        </span>
                      )}
                      
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

            <div className="space-y-2">
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
                PROCEED TO SECURE CHECKOUT — ${cartSubtotal.toFixed(2)}
              </button>

              {/* Express 1-Click Payment Buttons */}
              <div className="grid grid-cols-3 gap-2 font-mono text-[9px] pt-1">
                <button
                  type="button"
                  onClick={() => { alert("Simulating Shop Pay Express 1-Tap Checkout..."); setCart([]); setCartOpen(false); }}
                  className="bg-[#5A31F4] hover:bg-[#4822D6] text-white py-2 font-bold rounded-none uppercase transition-colors cursor-pointer"
                >
                  SHOP PAY
                </button>
                <button
                  type="button"
                  onClick={() => { alert("Simulating Apple Pay Express Checkout..."); setCart([]); setCartOpen(false); }}
                  className="bg-black hover:bg-neutral-800 text-white border border-neutral-700 py-2 font-bold rounded-none uppercase transition-colors cursor-pointer"
                >
                   PAY
                </button>
                <button
                  type="button"
                  onClick={() => { alert("Simulating Google Pay Express Checkout..."); setCart([]); setCartOpen(false); }}
                  className="bg-white hover:bg-neutral-200 text-black py-2 font-bold rounded-none uppercase transition-colors cursor-pointer"
                >
                  G PAY
                </button>
              </div>
            </div>
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
                      className={`object-cover w-full h-full filter grayscale hover:grayscale-0 transition-all duration-300 ${
                        tactile360Active ? `rotate-[${hardwareAngle * 90}deg]` : ""
                      }`}
                      referrerPolicy="no-referrer"
                    />

                    {/* 360° Tactile Telemetry Overlay */}
                    {selectedProductDetails.category === "Hardware" && (
                      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center font-mono text-[9px] bg-basalt/80 p-1.5 border border-neutral-800 backdrop-blur-sm">
                        <span className="text-copper font-bold">TACTILE ANGLE: {hardwareAngle * 90}°</span>
                        <span className="text-neutral-400">64°08'N // 21°56'W</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Hardware 360° Rotator Controls */}
                  {selectedProductDetails.category === "Hardware" && (
                    <div className="flex gap-1.5 font-mono text-[9px] border border-neutral-800 p-1 bg-neutral-900 justify-between items-center">
                      <span className="text-copper font-bold pl-1 uppercase">360° TACTILE ROTATOR:</span>
                      <div className="flex gap-1">
                        {[0, 1, 2, 3].map((angleIndex) => (
                          <button
                            key={angleIndex}
                            type="button"
                            onClick={() => {
                              setTactile360Active(true);
                              setHardwareAngle(angleIndex);
                              if (selectedProductDetails.images[angleIndex]) {
                                setModalActiveImage(selectedProductDetails.images[angleIndex]);
                              }
                            }}
                            className={`px-2 py-0.5 border cursor-pointer ${
                              hardwareAngle === angleIndex
                                ? "bg-copper text-basalt border-copper font-bold"
                                : "bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-canvas"
                            }`}
                          >
                            {angleIndex * 90}°
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

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
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-mono text-[10px] text-copper uppercase tracking-widest font-bold">APPLICATION PROTOCOL & REVIEWS</span>
                        <div className="flex items-center gap-1 font-mono text-xs text-copper font-bold">
                          ★ {selectedProductDetails.rating || 4.9} <span className="text-neutral-500 font-normal">({selectedProductDetails.reviewCount || 90})</span>
                        </div>
                      </div>
                      <h3 id="modal-product-title" className="font-display font-bold text-lg text-canvas tracking-wider mt-1">{selectedProductDetails.title}</h3>
                      <p className="text-neutral-400 font-mono text-xs mt-0.5">PRODUCT CODE: {selectedProductDetails.code} • ${selectedProductDetails.price}.00</p>
                    </div>

                    {/* Inner Modal Tab Navigation */}
                    <div className="flex border-b border-neutral-800 font-mono text-xs gap-1 pt-1">
                      <button
                        type="button"
                        onClick={() => setModalTab("details")}
                        className={`px-3 py-1.5 transition-colors cursor-pointer ${
                          modalTab === "details" ? "bg-copper text-basalt font-bold" : "text-neutral-400 hover:text-canvas"
                        }`}
                      >
                        PROTOCOL & RITUAL
                      </button>
                      <button
                        type="button"
                        onClick={() => setModalTab("reviews")}
                        className={`px-3 py-1.5 transition-colors cursor-pointer ${
                          modalTab === "reviews" ? "bg-copper text-basalt font-bold" : "text-neutral-400 hover:text-canvas"
                        }`}
                      >
                        REVIEWS ({selectedProductDetails.reviewCount || (selectedProductDetails.reviews ? selectedProductDetails.reviews.length : 0)})
                      </button>
                      <button
                        type="button"
                        onClick={() => setModalTab("frequently_bought")}
                        className={`px-3 py-1.5 transition-colors cursor-pointer ${
                          modalTab === "frequently_bought" ? "bg-copper text-basalt font-bold" : "text-neutral-400 hover:text-canvas"
                        }`}
                      >
                        PAIR WITH
                      </button>
                    </div>

                    {/* Tab 1: Protocol & Ritual */}
                    {modalTab === "details" && (
                      <div className="space-y-4 animate-fade-in">
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

                        <div className="pt-2">
                          <button
                            onClick={() => {
                              handleAddToCart(selectedProductDetails, selectedProductDetails.variants[0], 1, false);
                              closeModal();
                            }}
                            className="w-full bg-copper hover:bg-canvas hover:text-basalt text-basalt font-display font-bold text-xs py-3 rounded-none uppercase transition-colors cursor-pointer tracking-wider"
                          >
                            ADD TO BAG — ${selectedProductDetails.price}.00
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Tab 2: Ratings & Reviews */}
                    {modalTab === "reviews" && (
                      <div className="space-y-4 max-h-80 overflow-y-auto pr-2 animate-fade-in font-mono text-xs">
                        <div className="flex items-center justify-between p-3 bg-neutral-900 border border-neutral-800">
                          <div>
                            <span className="text-xl font-bold text-copper">{selectedProductDetails.rating || 4.9} / 5.0</span>
                            <span className="text-neutral-400 text-[10px] block mt-0.5">Based on {selectedProductDetails.reviewCount || 100} verified field reports</span>
                          </div>
                          <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[9px] px-2 py-1 font-bold">
                            98% RECOMMEND FOR EXPEDITIONS
                          </span>
                        </div>

                        {/* Interactive Review Tag Filters */}
                        <div className="flex gap-1 text-[9px] font-mono border-b border-neutral-800 pb-2 overflow-x-auto">
                          {["ALL", "5 STARS", "SUB-ZERO TESTED", "VERIFIED BUYERS"].map((fTag) => (
                            <button
                              key={fTag}
                              type="button"
                              onClick={() => setReviewFilter(fTag)}
                              className={`px-2 py-1 border transition-colors cursor-pointer whitespace-nowrap ${
                                reviewFilter === fTag
                                  ? "bg-copper text-basalt font-bold border-copper"
                                  : "bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-canvas"
                              }`}
                            >
                              {fTag}
                            </button>
                          ))}
                        </div>

                        {/* Customer Reviews List */}
                        <div className="space-y-3">
                          {(selectedProductDetails.reviews || []).map((rev) => (
                            <div key={rev.id} className="p-3 bg-neutral-900/40 border border-neutral-850 space-y-1.5">
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="font-bold text-canvas">{rev.author}</span>
                                  <span className="text-neutral-500 text-[9px] block">{rev.location} • {rev.date}</span>
                                </div>
                                <span className="text-copper font-bold">{"★".repeat(rev.rating)}</span>
                              </div>
                              <h5 className="font-semibold text-neutral-200 text-xs">{rev.title}</h5>
                              <p className="text-neutral-400 text-[11px] font-sans leading-relaxed">{rev.comment}</p>
                            </div>
                          ))}
                        </div>

                        {/* Interactive Review Submission Form */}
                        <div className="p-3 bg-neutral-900/70 border border-neutral-800 space-y-2 mt-4">
                          <span className="text-[10px] font-bold text-copper uppercase block">SUBMIT FIELD EVALUATION REPORT</span>
                          {userReviewSubmitted ? (
                            <div className="text-emerald-400 text-xs py-2 font-bold">
                              ✓ Report logged into telemetry database. Thank you!
                            </div>
                          ) : (
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                if (!userReviewName || !userReviewComment) return;
                                setUserReviewSubmitted(true);
                              }}
                              className="space-y-2"
                            >
                              <div className="grid grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  placeholder="Your Name / Call sign"
                                  value={userReviewName}
                                  onChange={(e) => setUserReviewName(e.target.value)}
                                  className="bg-neutral-950 border border-neutral-800 p-1.5 text-xs text-canvas focus:border-copper outline-none"
                                  required
                                />
                                <select
                                  value={userReviewRating}
                                  onChange={(e) => setUserReviewRating(Number(e.target.value))}
                                  className="bg-neutral-950 border border-neutral-800 p-1.5 text-xs text-canvas focus:border-copper outline-none"
                                >
                                  <option value={5}>5 Stars — Field Standard</option>
                                  <option value={4}>4 Stars — High Performance</option>
                                  <option value={3}>3 Stars — Moderate</option>
                                </select>
                              </div>
                              <input
                                type="text"
                                placeholder="Review Headline Title"
                                value={userReviewTitle}
                                onChange={(e) => setUserReviewTitle(e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 p-1.5 text-xs text-canvas focus:border-copper outline-none"
                              />
                              <textarea
                                placeholder="Detail your experience in extreme conditions..."
                                value={userReviewComment}
                                onChange={(e) => setUserReviewComment(e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-800 p-1.5 text-xs text-canvas focus:border-copper outline-none h-16 resize-none"
                                required
                              />
                              <button
                                type="submit"
                                className="w-full bg-neutral-800 hover:bg-copper hover:text-basalt text-canvas font-mono font-bold text-xs py-2 uppercase transition-colors"
                              >
                                TRANSMIT EVALUATION
                              </button>
                            </form>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Tab 3: Frequently Bought Together */}
                    {modalTab === "frequently_bought" && (
                      <div className="space-y-3 max-h-80 overflow-y-auto pr-2 animate-fade-in font-mono text-xs">
                        <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">RECOMMENDED EXPEDITION BUNDLE COMPLEMENTS:</span>
                        <div className="space-y-2">
                          {(selectedProductDetails.frequentlyBoughtWithIds || []).map((bId) => {
                            const bProd = PRODUCTS_DATA.find((p) => p.id === bId);
                            if (!bProd) return null;
                            return (
                              <div key={bId} className="flex items-center justify-between p-3 bg-neutral-900 border border-neutral-800 gap-3">
                                <div className="flex items-center gap-3">
                                  <img src={bProd.image} alt={bProd.title} className="w-12 h-12 object-cover border border-neutral-800 filter grayscale" />
                                  <div>
                                    <span className="text-[9px] text-copper uppercase block">{bProd.category}</span>
                                    <h5 className="font-bold text-canvas text-xs">{bProd.title}</h5>
                                    <span className="text-neutral-400 text-[10px]">${bProd.price}.00</span>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleAddToCart(bProd, bProd.variants[0], 1, false)}
                                  className="bg-neutral-800 hover:bg-copper hover:text-basalt text-canvas text-[10px] font-bold px-3 py-1.5 uppercase transition-colors cursor-pointer border border-neutral-700"
                                >
                                  + ADD (${bProd.price})
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-neutral-900 flex justify-between items-center gap-4">
                    <div className="text-[10px] text-neutral-500 font-mono">
                      BARRIER SYSTEM ALPHA • EST. REYKJAVÍK 64°N
                    </div>
                    <button
                      onClick={closeModal}
                      className="bg-neutral-900 border border-neutral-800 hover:border-copper hover:text-copper text-xs font-mono font-bold text-canvas px-5 py-2 rounded-none uppercase transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-copper"
                    >
                      CLOSE MODAL
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SUB-ZERO SKIN RESILIENCE QUIZ MODAL */}
        {quizModalOpen && (
          <div
            className="fixed inset-0 bg-basalt/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
            aria-hidden="true"
            onClick={(e) => { if (e.target === e.currentTarget) setQuizModalOpen(false); }}
          >
            <div className="bg-neutral-950 border-2 border-copper w-full max-w-xl p-6 sm:p-8 rounded-none shadow-[6px_6px_0px_0px_#D96B43] relative animate-scale-up z-50">
              <button
                onClick={() => setQuizModalOpen(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-copper cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="space-y-4 font-mono">
                <div className="flex items-center gap-2">
                  <span className="bg-copper text-basalt text-[9px] font-bold px-2 py-0.5 uppercase">
                    AI SKIN DIAGNOSTIC PROTOCOL
                  </span>
                  <span className="text-neutral-500 text-[10px]">STEP {quizStep} OF 3</span>
                </div>

                <h3 className="font-display font-extrabold text-xl text-canvas uppercase tracking-wider">
                  SUB-ZERO SKIN RESILIENCE QUIZ
                </h3>

                {!quizCompleted && quizStep === 1 && (
                  <div className="space-y-4 pt-2">
                    <p className="text-neutral-300 text-xs">SELECT TARGET EXPEDITION ELEVATION & EXPOSURE:</p>
                    <div className="space-y-2">
                      {[
                        { id: "moderate", label: "0 - 2,000M (COASTAL & VALLEY COLD)" },
                        { id: "high", label: "2,000 - 4,500M (HIGH ALPINE RIDGE)" },
                        { id: "extreme", label: "4,500M+ (SUB-ZERO EXPEDITION FIELD)" }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => { setQuizElevation(opt.id as any); setQuizStep(2); }}
                          className={`w-full text-left p-3 border font-mono text-xs transition-colors cursor-pointer ${
                            quizElevation === opt.id ? "border-copper bg-copper/10 text-copper font-bold" : "border-neutral-800 bg-neutral-900 text-canvas hover:border-copper"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {!quizCompleted && quizStep === 2 && (
                  <div className="space-y-4 pt-2">
                    <p className="text-neutral-300 text-xs">SELECT PRIMARY FIELD ACTIVITY TYPE:</p>
                    <div className="space-y-2">
                      {[
                        { id: "alpine", label: "ALPINE SKI & MOUNTAINEERING" },
                        { id: "industrial", label: "INDUSTRIAL OUTDOOR HARD WORK" },
                        { id: "marine", label: "ARCTIC MARINE & HIGH WIND" }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => { setQuizActivity(opt.id as any); setQuizStep(3); }}
                          className={`w-full text-left p-3 border font-mono text-xs transition-colors cursor-pointer ${
                            quizActivity === opt.id ? "border-copper bg-copper/10 text-copper font-bold" : "border-neutral-800 bg-neutral-900 text-canvas hover:border-copper"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {!quizCompleted && quizStep === 3 && (
                  <div className="space-y-4 pt-2">
                    <p className="text-neutral-300 text-xs">SELECT DERMAL RECOVERY REQUIREMENT:</p>
                    <div className="space-y-2">
                      {[
                        { id: "standard", label: "STANDARD DAILY LIPID HYDRATION" },
                        { id: "sensitive", label: "INTENSE WINDBURN & CHAPPING SHIELD" },
                        { id: "reactive", label: "EXTREME CELLULAR DAMAGE REPAIR" }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => {
                            setQuizSensitivity(opt.id as any);
                            setQuizCompleted(true);
                          }}
                          className={`w-full text-left p-3 border font-mono text-xs transition-colors cursor-pointer ${
                            quizSensitivity === opt.id ? "border-copper bg-copper/10 text-copper font-bold" : "border-neutral-800 bg-neutral-900 text-canvas hover:border-copper"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {quizCompleted && (
                  <div className="space-y-4 pt-2 border-t border-neutral-800">
                    <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs">
                      ✓ DIAGNOSTIC COMPLETE: RECOMMENDED ROUTINE BUNDLE GENERATED
                    </div>
                    <div className="p-4 bg-neutral-900 border border-neutral-800 space-y-2 text-xs">
                      <div className="text-copper font-bold uppercase">PRESCRIBED ANTIDOTE:</div>
                      <div className="text-canvas font-semibold">• Thermophile Alpine Barrier Cream (50ml)</div>
                      <div className="text-canvas font-semibold">• UV-Hazard Glacier Shield Dispenser (60ml)</div>
                      <div className="text-canvas font-semibold">• Basalt Volcanic Exfoliating Block (150g)</div>
                      <div className="text-copper font-bold pt-2 border-t border-neutral-800 flex justify-between">
                        <span>BUNDLE DISCOUNT PRICE:</span>
                        <span>{formatPrice(89)} <span className="line-through text-neutral-500 font-normal text-[10px]">{formatPrice(123)}</span></span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        handleAddToCart(PRODUCTS_DATA[2], PRODUCTS_DATA[2].variants[0], 1, false);
                        handleAddToCart(PRODUCTS_DATA[4], PRODUCTS_DATA[4].variants[0], 1, false);
                        handleAddToCart(PRODUCTS_DATA[1], PRODUCTS_DATA[1].variants[0], 1, false);
                        setQuizModalOpen(false);
                      }}
                      className="w-full bg-copper hover:bg-canvas hover:text-basalt text-basalt font-mono font-bold text-xs py-3.5 uppercase transition-colors cursor-pointer"
                    >
                      ADD PRESCRIBED ROUTINE BUNDLE TO BAG ({formatPrice(89)})
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* VANGUARD VIP LOYALTY VAULT DRAWER */}
        {vipDrawerOpen && (
          <div
            className="fixed inset-0 bg-basalt/80 backdrop-blur-sm z-50 flex justify-end"
            aria-hidden="true"
            onClick={(e) => { if (e.target === e.currentTarget) setVipDrawerOpen(false); }}
          >
            <div className="w-full max-w-md bg-neutral-950 border-l border-neutral-800 h-full flex flex-col justify-between p-6 overflow-y-auto animate-slide-in font-mono z-50">
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-copper font-bold">👑 VANGUARD VIP VAULT</span>
                  </div>
                  <button onClick={() => setVipDrawerOpen(false)} className="text-neutral-400 hover:text-copper cursor-pointer">
                    <X size={18} />
                  </button>
                </div>

                <div className="p-4 bg-neutral-900 border border-copper space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">OPERATIVE STATUS:</span>
                    <span className="text-copper font-bold">SUB-ZERO PIONEER</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">EXPEDITION POINTS:</span>
                    <span className="text-canvas font-bold">1,450 PTS</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-2 mt-2">
                    <div className="bg-copper h-2 w-[72%]"></div>
                  </div>
                  <span className="text-[9px] text-neutral-500 block text-right">550 PTS TO TITANIUM VANGUARD TIER</span>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] text-copper uppercase font-bold tracking-wider block">UNLOCKED OPERATIVE PERKS:</span>
                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-neutral-900 border border-neutral-800 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-canvas">FREE ANNUAL REFILL POD</div>
                        <div className="text-[10px] text-neutral-400">Claim 1 complimentary 50ml pod every 12 months</div>
                      </div>
                      <button onClick={() => alert("Free Refill Pod added to account!")} className="bg-copper text-basalt font-bold px-2 py-1 text-[10px] cursor-pointer">CLAIM</button>
                    </div>
                    <div className="p-3 bg-neutral-900 border border-neutral-800 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-canvas">FREE CUSTOM LASER ENGRAVING</div>
                        <div className="text-[10px] text-neutral-400">Unlimited custom coordinate laser etching</div>
                      </div>
                      <span className="text-emerald-400 text-[10px] font-bold">ACTIVE</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-800">
                <button
                  onClick={() => setVipDrawerOpen(false)}
                  className="w-full bg-neutral-900 border border-neutral-800 hover:border-copper text-canvas text-xs py-3 uppercase tracking-wider transition-colors cursor-pointer"
                >
                  CLOSE VIP VAULT
                </button>
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
                AETHER & ORE // ENTERPRISE STOREFRONT ARCHITECTURE
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
