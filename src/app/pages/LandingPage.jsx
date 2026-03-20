import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import Lenis from "lenis";
import {
  MapPin,
  Search,
  ShieldCheck,
  MessageSquare,
  TrendingUp,
  Users,
  ArrowRight,
  CheckCircle2,
  Star,
  ClipboardList,
  Handshake,
  UserPlus,
  ChevronDown
} from "lucide-react";
import { useRef } from "react";
const HERO_IMG = "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1400&h=800&fit=crop";
const ease = [0.25, 0.1, 0.25, 1];
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease }
  })
};
const features = [
  { icon: MapPin, title: "Location-Based Discovery", desc: "Find nearby livestock listings using our integrated map. Browse by distance and region across the Philippines." },
  { icon: Search, title: "Smart Filters", desc: "Filter by type, breed, price range, and status to find exactly what you need quickly and efficiently." },
  { icon: MessageSquare, title: "Secure Messaging", desc: "Communicate safely with buyers and sellers. Contact details are shared only with your explicit consent." },
  { icon: ShieldCheck, title: "Verified Listings", desc: "All sellers go through verification. Every listing is reviewed by our moderation team before going live." },
  { icon: TrendingUp, title: "Transaction Tracking", desc: "Keep a complete history of all your trades. Manage listing status from Available to Reserved to Sold." },
  { icon: Users, title: "Trusted Community", desc: "Join thousands of farmers, buyers, and traders across the Philippines in a secure marketplace." }
];
const testimonials = [
  { name: "Manuel Reyes", role: "Cattle Farmer, Batangas", text: "Herdify made it so easy to sell my cattle. Within a week, I had 8 inquiries and sold all 5 heads at a fair price.", rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" },
  { name: "Rosa Mendoza", role: "Buyer, Quezon", text: "I found healthy dairy goats near my area using the map feature. The messaging system helped me negotiate safely before visiting the farm.", rating: 5, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" },
  { name: "Carlo Gutierrez", role: "Livestock Trader, Laguna", text: "As a full-time trader, I rely on Herdify daily. The transaction tracking and verified sellers save me time and give me peace of mind.", rating: 5, avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&h=80&fit=crop&crop=face" }
];
const steps = [
  { step: "01", title: "Create Account", desc: "Register as a Buyer or Seller. Verify your identity for trusted trading.", icon: UserPlus },
  { step: "02", title: "List or Browse", desc: "Post your livestock with photos and location, or search nearby listings.", icon: ClipboardList },
  { step: "03", title: "Inquire & Negotiate", desc: "Send inquiries, negotiate price, and schedule farm visits securely.", icon: MessageSquare },
  { step: "04", title: "Complete Trade", desc: "Finalize the deal, mark as sold, and track your transaction history.", icon: Handshake }
];
const getStepParallaxOffsets = (viewportWidth) => {
  if (viewportWidth >= 1280) {
    return [
      { x: 360, y: 112, rotate: 0, zIndex: 1 },
      { x: 120, y: 30, rotate: 0, zIndex: 2 },
      { x: -120, y: -30, rotate: 0, zIndex: 3 },
      { x: -360, y: -112, rotate: 0, zIndex: 4 }
    ];
  }
  if (viewportWidth >= 1024) {
    return [
      { x: 260, y: 96, rotate: 0, zIndex: 1 },
      { x: 84, y: 28, rotate: 0, zIndex: 2 },
      { x: -84, y: -28, rotate: 0, zIndex: 3 },
      { x: -260, y: -96, rotate: 0, zIndex: 4 }
    ];
  }
  if (viewportWidth >= 640) {
    return [
      { x: 140, y: 92, rotate: 0, zIndex: 1 },
      { x: -140, y: 92, rotate: 0, zIndex: 2 },
      { x: 140, y: -92, rotate: 0, zIndex: 3 },
      { x: -140, y: -92, rotate: 0, zIndex: 4 }
    ];
  }
  return [
    { x: 0, y: 168, rotate: 0, zIndex: 1 },
    { x: 30, y: 54, rotate: 0, zIndex: 2 },
    { x: -30, y: -54, rotate: 0, zIndex: 3 },
    { x: 0, y: -168, rotate: 0, zIndex: 4 }
  ];
};
function StepParallaxCard({ step, focus, offset }) {
  const x = useTransform(focus, [0, 1], [offset.x, 0]);
  const y = useTransform(focus, [0, 1], [offset.y, 0]);
  const rotate = useTransform(focus, [0, 1], [offset.rotate, 0]);
  const scale = useTransform(focus, [0, 0.35, 1], [0.84, 0.92, 1]);
  const opacity = useTransform(focus, [0, 0.24, 1], [0.28, 0.62, 1]);
  return <motion.div
    className="relative transform-gpu will-change-transform card-glass card-no-hover p-8 text-center"
    style={{ x, y, rotate, scale, opacity, zIndex: offset.zIndex }}
  >
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-4 py-1.5 bg-gradient-to-r from-[#2F6B3F] to-[#3a834d] text-white rounded-full" style={{ fontWeight: 700 }}>
        Step {step.step}
      </span>
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F0F7F2] to-[#E8F2EA] flex items-center justify-center mx-auto mb-5 mt-3">
        <step.icon size={26} className="text-[#2F6B3F]" />
      </div>
      <h4 className="text-[#1F2937] mb-3" style={{ fontWeight: 700, fontSize: "1.1rem" }}>{step.title}</h4>
      <p className="text-[#6B7280]" style={{ lineHeight: 1.6 }}>{step.desc}</p>
    </motion.div>;
}
function LandingPage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const stepsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1280);
  const featuresInView = useInView(featuresRef, { margin: "-100px" });
  const stepsInView = useInView(stepsRef, { margin: "-100px" });
  const testimonialsInView = useInView(testimonialsRef, { margin: "-100px" });
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const updateViewportWidth = () => setViewportWidth(window.innerWidth);
    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.08,
      wheelMultiplier: 0.95,
      touchMultiplier: 1,
      autoResize: true
    });
    let frameId = 0;
    const raf = (time) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };
    frameId = window.requestAnimationFrame(raf);
    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const { scrollYProgress: stepsProgress } = useScroll({
    target: stepsRef,
    offset: ["start end", "end start"]
  });
  const heroImageY = useTransform(heroProgress, [0, 1], [0, 84]);
  const heroOverlayY = useTransform(heroProgress, [0, 1], [0, -24]);
  const heroOverlayScale = useTransform(heroProgress, [0, 1], [1, 1.06]);
  const heroContentY = useTransform(heroProgress, [0, 1], [0, 20]);
  const heroOpacity = useTransform(heroProgress, [0, 0.72], [1, 0.3]);
  const stepsFocus = useTransform(stepsProgress, [0, 0.14, 0.3, 0.7, 0.86, 1], [0, 0.18, 1, 1, 0.18, 0]);
  const stepsCoreScale = useTransform(stepsFocus, [0, 1], [0.92, 1.02]);
  const stepsCoreOpacity = useTransform(stepsFocus, [0, 1], [0.5, 0.08]);
  const stepParallaxOffsets = getStepParallaxOffsets(viewportWidth);
  return <div className="relative min-h-screen bg-[#F6F4EE] overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-8rem] top-[12vh] hidden h-80 w-80 rounded-full bg-[#6FAF5F]/12 blur-3xl md:block" />
        <div className="absolute right-[-10rem] top-[38vh] hidden h-[26rem] w-[26rem] rounded-full bg-[#C68A3A]/10 blur-3xl md:block" />
        <div className="absolute bottom-[-10rem] left-[18%] hidden h-72 w-72 rounded-full bg-[#2F6B3F]/8 blur-3xl lg:block" />
        <div className="absolute inset-y-0 left-6 hidden w-px bg-gradient-to-b from-transparent via-[#2F6B3F]/12 to-transparent xl:block" />
        <div className="absolute inset-y-0 right-6 hidden w-px bg-gradient-to-b from-transparent via-[#C68A3A]/12 to-transparent xl:block" />
      </div>

      <div className="relative z-10">
      {
    /* Navbar */
  }
      <motion.header
    className="fixed top-0 left-0 right-0 z-50"
    initial={{ backgroundColor: "rgba(255,255,255,0)" }}
    animate={{
      backgroundColor: scrolled ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0)",
      backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
      boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.08)" : "0 0 0 rgba(0,0,0,0)"
    }}
    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
        <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
    className="w-9 h-9 rounded-xl flex items-center justify-center"
    animate={{
      background: scrolled ? "linear-gradient(to bottom right, #2F6B3F, #3a834d)" : "rgba(255,255,255,0.2)",
      boxShadow: scrolled ? "0 0 20px rgba(47,107,63,0.3)" : "0 0 0 rgba(0,0,0,0)"
    }}
    transition={{ duration: 0.5 }}
    style={{ backdropFilter: scrolled ? "none" : "blur(8px)" }}
  >
              {
    /* Abstract cow face forming H */
  }
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                {
    /* Ears */
  }
                <ellipse cx="4" cy="5" rx="2.5" ry="3" fill="white" opacity="0.9" />
                <ellipse cx="20" cy="5" rx="2.5" ry="3" fill="white" opacity="0.9" />
                {
    /* Face/H shape */
  }
                <rect x="6" y="4" width="3" height="16" rx="1.5" fill="white" />
                <rect x="15" y="4" width="3" height="16" rx="1.5" fill="white" />
                <rect x="6" y="10" width="12" height="3" rx="1.5" fill="white" />
                {
    /* Nose */
  }
                <ellipse cx="12" cy="18" rx="2" ry="1.5" fill="white" opacity="0.7" />
              </svg>
            </motion.div>
            <motion.span
    animate={{ color: scrolled ? "#2F6B3F" : "#ffffff" }}
    transition={{ duration: 0.5 }}
    style={{ fontWeight: 700, fontSize: "1.15rem", letterSpacing: "-0.02em" }}
  >
              Herdify
            </motion.span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {[
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#testimonials", label: "Reviews" }
  ].map((item) => <motion.a
    key={item.href}
    href={item.href}
    animate={{ color: scrolled ? "#6B7280" : "rgba(255,255,255,0.8)" }}
    whileHover={{ color: scrolled ? "#2F6B3F" : "#ffffff" }}
    transition={{ duration: 0.3 }}
    className="text-sm"
    style={{ fontWeight: 500 }}
  >
                {item.label}
              </motion.a>)}
          </nav>
          <div className="flex items-center gap-2">
            <motion.div animate={{ color: scrolled ? "#2F6B3F" : "#ffffff" }} transition={{ duration: 0.5 }}>
              <Link to="/login" className="px-4 py-2 text-sm rounded-xl hover:bg-white/10 transition-colors" style={{ fontWeight: 500 }}>
                Sign In
              </Link>
            </motion.div>
            <Link to="/signup" className="px-5 py-2.5 text-sm bg-gradient-to-r from-[#2F6B3F] to-[#3a834d] text-white rounded-xl hover:opacity-90 transition-opacity" style={{ fontWeight: 600 }}>
              Get Started
            </Link>
          </div>
        </div>
      </motion.header>

      {
    /* Hero */
  }
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
        <motion.div
    className="absolute inset-[-5%] transform-gpu will-change-transform"
    style={{ y: heroImageY }}
  >
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div
    className="absolute inset-0 transform-gpu will-change-transform bg-[radial-gradient(circle_at_top,_rgba(111,175,95,0.24),transparent_40%),radial-gradient(circle_at_bottom,_rgba(198,138,58,0.14),transparent_32%)]"
    style={{ y: heroOverlayY, scale: heroOverlayScale }}
  />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1910]/90 via-[#1a3d22]/75 to-[#2F6B3F]/60" />
        <motion.div
    className="absolute left-1/2 top-[18%] h-64 w-64 -translate-x-1/2 transform-gpu will-change-transform rounded-full bg-white/10 blur-3xl"
    style={{ y: heroOverlayY }}
  />

        <motion.div
    className="relative h-full transform-gpu will-change-transform flex flex-col items-center justify-center text-center px-4 sm:px-6"
    style={{ opacity: heroOpacity, y: heroContentY }}
  >
          <div className="max-w-3xl mx-auto">
            <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="text-white mb-6"
    style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em" }}
  >
              Buy & Sell Livestock<br />
              <span className="text-[#6FAF5F]">With Confidence</span>
            </motion.h1>

            <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="text-white/85 mb-10 max-w-xl mx-auto"
    style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", lineHeight: 1.7 }}
  >
              Connect with trusted sellers and buyers across the Philippines. Find nearby livestock, negotiate securely, and trade with confidence.
            </motion.p>

            <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
  className="flex flex-wrap justify-center gap-4 mb-10"
>
              <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#2F6B3F] to-[#3a834d] text-white rounded-2xl shadow-lg" style={{ fontWeight: 600, fontSize: "1.05rem" }}>
                  Get Started <ArrowRight size={18} />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.6 }}
    className="flex flex-wrap justify-center gap-6"
  >
              {["Free to Register", "Location Privacy", "Verified Sellers"].map((t) => <span key={t} className="flex items-center gap-2 text-white/80" style={{ fontSize: "0.95rem" }}>
                  <CheckCircle2 size={16} className="text-[#6FAF5F]" /> {t}
                </span>)}
            </motion.div>
          </div>

          <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.2 }}
    className="absolute bottom-10 left-1/2 -translate-x-1/2"
  >
            <motion.div
    animate={{ y: [0, 8, 0] }}
    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    className="flex flex-col items-center gap-2 text-white/50"
  >
              <span className="text-xs" style={{ fontWeight: 500 }}>Scroll to explore</span>
              <ChevronDown size={20} />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {
    /* Features */
  }
      <section id="features" ref={featuresRef} className="py-24 md:py-32 bg-gradient-to-b from-white to-[#F6F4EE]">
        <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <motion.div
    className="text-center mb-16"
    initial={{ opacity: 0, y: 20 }}
    animate={featuresInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, ease }}
  >
            <h2 className="text-[#1F2937] mb-4" style={{ fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.02em" }}>
              Everything You Need to Trade Livestock
            </h2>
            <p className="text-[#6B7280] max-w-xl mx-auto text-lg">Built for farmers, traders, and buyers with security and transparency.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => <motion.div
    key={f.title}
    className="p-7 card-glass card-no-hover"
    custom={i}
    variants={cardVariants}
    initial="hidden"
    animate={featuresInView ? "visible" : "hidden"}
  >
                <div className="w-14 h-14 bg-gradient-to-br from-[#2F6B3F]/10 to-[#6FAF5F]/10 rounded-2xl flex items-center justify-center mb-5">
                  <f.icon size={24} className="text-[#2F6B3F]" />
                </div>
                <h4 className="text-[#1F2937] mb-3" style={{ fontWeight: 700, fontSize: "1.1rem" }}>{f.title}</h4>
                <p className="text-[#6B7280]" style={{ lineHeight: 1.7 }}>{f.desc}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {
    /* How it Works */
  }
      <section id="how-it-works" ref={stepsRef} className="py-24 md:py-32">
        <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <motion.div
    className="text-center mb-16"
    initial={{ opacity: 0, y: 20 }}
    animate={stepsInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, ease }}
  >
            <h2 className="text-[#1F2937] mb-4" style={{ fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.02em" }}>
              How It Works
            </h2>
            <p className="text-[#6B7280] text-lg">Get started in 4 simple steps</p>
          </motion.div>

          <div className="relative">
            <motion.div
    aria-hidden="true"
    className="pointer-events-none absolute left-1/2 top-1/2 hidden h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(47,107,63,0.12),_rgba(47,107,63,0.04)_42%,_transparent_72%)] blur-2xl md:block"
    style={{ scale: stepsCoreScale, opacity: stepsCoreOpacity }}
  />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => <StepParallaxCard
    key={step.step}
    step={step}
    focus={stepsFocus}
    offset={stepParallaxOffsets[i]}
  />)}
            </div>
          </div>
        </div>
      </section>

      {
    /* Testimonials */
  }
      <section id="testimonials" ref={testimonialsRef} className="py-24 md:py-32 bg-gradient-to-b from-white to-[#F6F4EE]">
        <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <motion.div
    className="text-center mb-16"
    initial={{ opacity: 0, y: 20 }}
    animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, ease }}
  >
            <h2 className="text-[#1F2937] mb-4" style={{ fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.02em" }}>
              What Our Users Say
            </h2>
            <p className="text-[#6B7280] max-w-lg mx-auto text-lg">Trusted by thousands of farmers and traders across the Philippines</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => <motion.div
    key={t.name}
    className="p-7 card-glass card-no-hover"
    custom={i}
    variants={cardVariants}
    initial="hidden"
    animate={testimonialsInView ? "visible" : "hidden"}
  >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={18} className="text-[#2F6B3F] fill-[#2F6B3F]" />)}
                </div>
                <p className="text-[#1F2937] mb-6" style={{ lineHeight: 1.8 }}>"{t.text}"</p>
                <div className="flex items-center gap-4 pt-5 border-t border-[#E2DDD5]/50">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-soft" />
                  <div>
                    <p className="text-[#1F2937]" style={{ fontWeight: 600 }}>{t.name}</p>
                    <p className="text-sm text-[#6B7280]">{t.role}</p>
                  </div>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {
    /* Footer */
  }
      <footer className="bg-gradient-to-b from-[#0f2816] to-[#0a1910] text-white/70 py-16">
        <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <ellipse cx="4" cy="5" rx="2.5" ry="3" fill="white" opacity="0.9" />
                  <ellipse cx="20" cy="5" rx="2.5" ry="3" fill="white" opacity="0.9" />
                  <rect x="6" y="4" width="3" height="16" rx="1.5" fill="white" />
                  <rect x="15" y="4" width="3" height="16" rx="1.5" fill="white" />
                  <rect x="6" y="10" width="12" height="3" rx="1.5" fill="white" />
                  <ellipse cx="12" cy="18" rx="2" ry="1.5" fill="white" opacity="0.7" />
                </svg>
              </div>
              <span className="text-white" style={{ fontWeight: 700, fontSize: "1.2rem" }}>Herdify</span>
            </div>
            <p className="text-sm text-white/40 text-center max-w-lg">
              All transactions are subject to verification. Herdify is not responsible for individual trades.
              Location data is used only for listing proximity and is never shared without consent.
            </p>
            <p className="text-sm text-white/30">&copy; 2026 Herdify. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </div>;
}
export {
  LandingPage as default
};
