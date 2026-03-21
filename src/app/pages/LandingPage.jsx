import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
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
  ChevronDown,
  UserRound
} from "lucide-react";
import { useRef } from "react";
import { BrandMark } from "../components/ui/BrandMark";
const HERO_IMG = "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1600&h=900&q=72";
const ease = [0.22, 0.8, 0.2, 1];
const FAST_DURATION = 0.25;
const features = [
  { icon: MapPin, title: "Location-Based Discovery", desc: "Find nearby livestock listings using our integrated map. Browse by distance and region across the Philippines." },
  { icon: Search, title: "Smart Filters", desc: "Filter by type, breed, price range, and status to find exactly what you need quickly and efficiently." },
  { icon: MessageSquare, title: "Secure Messaging", desc: "Communicate safely with buyers and sellers. Contact details are shared only with your explicit consent." },
  { icon: ShieldCheck, title: "Verified Listings", desc: "All sellers go through verification. Every listing is reviewed by our moderation team before going live." },
  { icon: TrendingUp, title: "Transaction Tracking", desc: "Keep a complete history of all your trades. Manage listing status from Available to Reserved to Sold." },
  { icon: Users, title: "Trusted Community", desc: "Join thousands of farmers, buyers, and traders across the Philippines in a secure marketplace." }
];
const testimonials = [
  { name: "Manuel Reyes", role: "Poblacion, Buenavista", text: "Herdify made it easy to sell my cows here in Buenavista. Within a week, I had 8 inquiries and sold all 5 heads at a fair price.", rating: 5, avatar: UserRound },
  { name: "Rosa Mendoza", role: "Lubang, Buenavista", text: "I found healthy dairy goats near my area using the map feature. The messaging system helped me negotiate safely before visiting the farm.", rating: 5, avatar: UserRound },
  { name: "Carlo Gutierrez", role: "Eastern Cabul-an, Buenavista", text: "As a full-time trader in Buenavista, I rely on Herdify daily. The transaction tracking and verified sellers save me time and give me peace of mind.", rating: 5, avatar: UserRound }
];
const steps = [
  { step: "01", title: "Create Account", desc: "Register as a Buyer or Seller. Verify your identity for trusted trading.", icon: UserPlus },
  { step: "02", title: "List or Browse", desc: "Post your livestock with photos and location, or search nearby listings.", icon: ClipboardList },
  { step: "03", title: "Inquire & Negotiate", desc: "Send inquiries, negotiate price, and schedule farm visits securely.", icon: MessageSquare },
  { step: "04", title: "Complete Trade", desc: "Finalize the deal, mark as sold, and track your transaction history.", icon: Handshake }
];
const SECTION_SPRING = { stiffness: 320, damping: 34, mass: 0.22 };
const SECTION_FOCUS_INPUT = [0, 0.1, 0.24, 0.76, 0.9, 1];
const SECTION_FOCUS_OUTPUT = [0, 0.16, 1, 1, 0.16, 0];
const getMotionTier = (viewportWidth) => {
  if (viewportWidth >= 1024) return "desktop";
  if (viewportWidth >= 640) return "tablet";
  return "mobile";
};
const scaleOffset = (offset, scale) => ({
  ...offset,
  x: Math.round(offset.x * scale),
  y: Math.round(offset.y * scale),
  rotate: 0
});
const FEATURE_DESKTOP_OFFSETS = [
  { x: -72, y: 48, rotate: 0 },
  { x: 0, y: 32, rotate: 0 },
  { x: 72, y: 48, rotate: 0 },
  { x: -72, y: -32, rotate: 0 },
  { x: 0, y: -54, rotate: 0 },
  { x: 72, y: -32, rotate: 0 }
];
const FEATURE_MOBILE_OFFSETS = [
  { x: 0, y: 46, rotate: 0 },
  { x: 0, y: 26, rotate: 0 },
  { x: 0, y: 10, rotate: 0 },
  { x: 0, y: -10, rotate: 0 },
  { x: 0, y: -26, rotate: 0 },
  { x: 0, y: -46, rotate: 0 }
];
const STEP_DESKTOP_OFFSETS = [
  { x: -108, y: 34, rotate: 0, zIndex: 1 },
  { x: -36, y: 18, rotate: 0, zIndex: 2 },
  { x: 36, y: 18, rotate: 0, zIndex: 3 },
  { x: 108, y: 34, rotate: 0, zIndex: 4 }
];
const STEP_MOBILE_OFFSETS = [
  { x: 0, y: 42, rotate: 0, zIndex: 1 },
  { x: 0, y: 14, rotate: 0, zIndex: 2 },
  { x: 0, y: -14, rotate: 0, zIndex: 3 },
  { x: 0, y: -42, rotate: 0, zIndex: 4 }
];
const TESTIMONIAL_DESKTOP_OFFSETS = [
  { x: -58, y: 42, rotate: 0 },
  { x: 0, y: 18, rotate: 0 },
  { x: 58, y: 42, rotate: 0 }
];
const TESTIMONIAL_MOBILE_OFFSETS = [
  { x: 0, y: 30, rotate: 0 },
  { x: 0, y: 0, rotate: 0 },
  { x: 0, y: -30, rotate: 0 }
];
const getFeatureParallaxOffsets = (viewportWidth) => {
  const tier = getMotionTier(viewportWidth);
  if (tier === "mobile") return FEATURE_MOBILE_OFFSETS;
  if (tier === "tablet") return FEATURE_DESKTOP_OFFSETS.map((offset) => scaleOffset(offset, 0.56));
  return FEATURE_DESKTOP_OFFSETS;
};
const getStepParallaxOffsets = (viewportWidth) => {
  const tier = getMotionTier(viewportWidth);
  if (tier === "mobile") return STEP_MOBILE_OFFSETS;
  if (tier === "tablet") return STEP_DESKTOP_OFFSETS.map((offset) => scaleOffset(offset, 0.44));
  return STEP_DESKTOP_OFFSETS;
};
const getTestimonialParallaxOffsets = (viewportWidth) => {
  const tier = getMotionTier(viewportWidth);
  if (tier === "mobile") return TESTIMONIAL_MOBILE_OFFSETS;
  if (tier === "tablet") return TESTIMONIAL_DESKTOP_OFFSETS.map((offset) => scaleOffset(offset, 0.56));
  return TESTIMONIAL_DESKTOP_OFFSETS;
};
function useSectionFocus(progress) {
  return useTransform(progress, SECTION_FOCUS_INPUT, SECTION_FOCUS_OUTPUT);
}
function useSectionCardMotion(progress, offset, options = {}) {
  const {
    scaleFrom = 0.94,
    scaleMid = 0.975
  } = options;
  const focus = useSectionFocus(progress);
  const x = useTransform(focus, [0, 1], [offset.x, 0]);
  const y = useTransform(focus, [0, 1], [offset.y, 0]);
  const rotate = useTransform(focus, [0, 1], [offset.rotate, 0]);
  const scale = useTransform(focus, [0, 0.35, 1], [scaleFrom, scaleMid, 1]);
  return { focus, x, y, rotate, scale };
}
function FeatureParallaxCard({ feature, progress, offset }) {
  const { x, y, rotate, scale } = useSectionCardMotion(progress, offset);
  return <motion.div
    className="p-7 card-glass card-no-hover transform-gpu will-change-transform"
    style={{ x, y, rotate, scale }}
  >
      <div className="w-14 h-14 bg-gradient-to-br from-[#2F6B3F]/10 to-[#6FAF5F]/10 rounded-2xl flex items-center justify-center mb-5">
        <feature.icon size={24} className="text-[#2F6B3F]" />
      </div>
      <h4 className="text-[#1F2937] mb-3" style={{ fontWeight: 700, fontSize: "1.1rem" }}>{feature.title}</h4>
      <p className="text-[#6B7280]" style={{ lineHeight: 1.7 }}>{feature.desc}</p>
    </motion.div>;
}
function StepParallaxCard({ step, progress, offset }) {
  const { x, y, rotate, scale } = useSectionCardMotion(progress, offset, {
    scaleFrom: 0.9,
    scaleMid: 0.955
  });
  return <motion.div
    className="relative transform-gpu will-change-transform card-glass card-no-hover p-8 text-center"
    style={{ x, y, rotate, scale, zIndex: offset.zIndex }}
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
function TestimonialParallaxCard({ testimonial, progress, offset }) {
  const { x, y, rotate, scale } = useSectionCardMotion(progress, offset);
  return <motion.div
    className="p-7 card-glass card-no-hover h-full flex flex-col transform-gpu will-change-transform"
    style={{ x, y, rotate, scale }}
  >
      <div className="flex gap-1 mb-5">
        {Array.from({ length: testimonial.rating }).map((_, i) => <Star key={i} size={18} className="text-[#2F6B3F] fill-[#2F6B3F]" />)}
      </div>
      <p className="text-[#1F2937] flex-1" style={{ lineHeight: 1.8 }}>"{testimonial.text}"</p>
      <div className="flex items-center gap-4 pt-5 mt-6 border-t border-[#E2DDD5]/50">
        <div className="w-12 h-12 rounded-full border-2 border-white shadow-soft bg-gradient-to-br from-[#F0F7F2] to-[#E8F2EA] flex items-center justify-center">
          <testimonial.avatar aria-hidden="true" size={20} className="text-[#2F6B3F]" strokeWidth={2.2} />
        </div>
        <div>
          <p className="text-[#1F2937]" style={{ fontWeight: 600 }}>{testimonial.name}</p>
          <p className="text-sm text-[#6B7280]">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>;
}
function LandingPage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const stepsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(() => typeof window === "undefined" ? 1280 : window.innerWidth);
  useEffect(() => {
    const handleScroll = () => {
      const next = window.scrollY > 50;
      setScrolled((prev) => prev === next ? prev : next);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const updateViewportWidth = () => setViewportWidth((prev) => prev === window.innerWidth ? prev : window.innerWidth);
    window.addEventListener("resize", updateViewportWidth);
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const { scrollYProgress: featuresProgressRaw } = useScroll({
    target: featuresRef,
    offset: ["start end", "end start"]
  });
  const { scrollYProgress: stepsProgressRaw } = useScroll({
    target: stepsRef,
    offset: ["start end", "end start"]
  });
  const { scrollYProgress: testimonialsProgressRaw } = useScroll({
    target: testimonialsRef,
    offset: ["start end", "end start"]
  });
  const smoothHeroProgress = useSpring(heroProgress, { stiffness: 260, damping: 32, mass: 0.2 });
  const featuresProgress = useSpring(featuresProgressRaw, SECTION_SPRING);
  const stepsProgress = useSpring(stepsProgressRaw, SECTION_SPRING);
  const testimonialsProgress = useSpring(testimonialsProgressRaw, SECTION_SPRING);
  const heroImageY = useTransform(smoothHeroProgress, [0, 1], [0, 82]);
  const heroImageScale = useTransform(smoothHeroProgress, [0, 1], [1.03, 1.1]);
  const heroOverlayY = useTransform(smoothHeroProgress, [0, 1], [0, -28]);
  const heroOverlayScale = useTransform(smoothHeroProgress, [0, 1], [1, 1.07]);
  const heroContentY = useTransform(smoothHeroProgress, [0, 1], [0, 22]);
  const heroContentScale = useTransform(smoothHeroProgress, [0, 1], [1, 0.992]);
  const heroOpacity = useTransform(smoothHeroProgress, [0, 0.84], [1, 0.38]);
  const heroHaloY = useTransform(smoothHeroProgress, [0, 1], [0, -10]);
  const heroHaloScale = useTransform(smoothHeroProgress, [0, 1], [1, 1.1]);
  const heroGridY = useTransform(smoothHeroProgress, [0, 1], [0, -12]);
  const heroOrbLeftY = useTransform(smoothHeroProgress, [0, 1], [0, 32]);
  const heroOrbRightY = useTransform(smoothHeroProgress, [0, 1], [0, -28]);
  const stepsFocus = useSectionFocus(stepsProgress);
  const stepsCoreScale = useTransform(stepsFocus, [0, 1], [0.92, 1.02]);
  const stepsCoreOpacity = useTransform(stepsFocus, [0, 1], [0.5, 0.08]);
  const featureParallaxOffsets = getFeatureParallaxOffsets(viewportWidth);
  const stepParallaxOffsets = getStepParallaxOffsets(viewportWidth);
  const testimonialParallaxOffsets = getTestimonialParallaxOffsets(viewportWidth);
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
    transition={{ duration: FAST_DURATION, ease }}
  >
        <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
    animate={{
      color: scrolled ? "#2F6B3F" : "#ffffff",
      filter: scrolled ? "drop-shadow(0 10px 20px rgba(47,107,63,0.16))" : "drop-shadow(0 10px 26px rgba(10,25,16,0.26))"
    }}
    transition={{ duration: FAST_DURATION, ease }}
    className="flex items-center justify-center"
  >
              <BrandMark className="w-8 h-8 md:w-9 md:h-9" strokeWidth={2.35} />
            </motion.div>
            <motion.span
    animate={{ color: scrolled ? "#2F6B3F" : "#ffffff" }}
    transition={{ duration: FAST_DURATION, ease }}
    style={{ fontWeight: 750, fontSize: "1.2rem", letterSpacing: "-0.03em" }}
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
    transition={{ duration: FAST_DURATION }}
    className="text-sm"
    style={{ fontWeight: 500 }}
  >
                {item.label}
              </motion.a>)}
          </nav>
          <div className="flex items-center">
            <Link to="/login" className="px-5 py-2.5 text-sm bg-gradient-to-r from-[#2F6B3F] to-[#3a834d] text-white rounded-xl hover:opacity-90 transition-opacity shadow-[0_12px_30px_rgba(47,107,63,0.24)]" style={{ fontWeight: 600 }}>
              Sign In
            </Link>
          </div>
        </div>
      </motion.header>

      {
    /* Hero */
  }
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
        <motion.div
    className="absolute inset-[-6%] transform-gpu will-change-transform"
    style={{ y: heroImageY, scale: heroImageScale }}
  >
          <img
    src={HERO_IMG}
    alt=""
    fetchPriority="high"
    loading="eager"
    decoding="async"
    sizes="100vw"
    className="w-full h-full object-cover"
  />
        </motion.div>
        <motion.div
    className="absolute inset-0 transform-gpu will-change-transform bg-[radial-gradient(circle_at_top,_rgba(111,175,95,0.26),transparent_40%),radial-gradient(circle_at_bottom,_rgba(198,138,58,0.16),transparent_32%)]"
    style={{ y: heroOverlayY, scale: heroOverlayScale }}
  />
        <motion.div
    className="absolute inset-0 opacity-30 mix-blend-soft-light"
    style={{
      y: heroGridY,
      backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
      backgroundSize: "84px 84px"
    }}
  />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1910]/90 via-[#1a3d22]/75 to-[#2F6B3F]/60" />
        <motion.div
    className="absolute left-[10%] top-[28%] h-56 w-56 rounded-full bg-[#6FAF5F]/14 blur-3xl"
    style={{ y: heroOrbLeftY }}
  />
        <motion.div
    className="absolute bottom-[14%] right-[8%] h-72 w-72 rounded-full bg-[#C68A3A]/12 blur-3xl"
    style={{ y: heroOrbRightY }}
  />
        <motion.div
    className="absolute left-1/2 top-[18%] h-64 w-64 -translate-x-1/2 transform-gpu will-change-transform rounded-full bg-white/10 blur-3xl"
    style={{ y: heroHaloY, scale: heroHaloScale }}
  />

        <motion.div
    className="relative h-full transform-gpu will-change-transform flex flex-col items-center justify-center text-center px-4 sm:px-6"
    style={{ opacity: heroOpacity, y: heroContentY, scale: heroContentScale }}
  >
          <div className="max-w-3xl mx-auto">
            <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: FAST_DURATION, delay: 0.06, ease }}
    className="text-white mb-6"
    style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em" }}
  >
              Buy & Sell Livestock<br />
              <span className="text-[#6FAF5F]">With Confidence</span>
            </motion.h1>

            <motion.p
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: FAST_DURATION, delay: 0.12, ease }}
    className="text-white/85 mb-10 max-w-xl mx-auto"
    style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", lineHeight: 1.7 }}
  >
              Connect with trusted sellers and buyers across the Philippines. Find nearby livestock, negotiate securely, and trade with confidence.
            </motion.p>

            <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: FAST_DURATION, delay: 0.18, ease }}
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
    transition={{ duration: FAST_DURATION, delay: 0.24, ease }}
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
    transition={{ delay: 0.32, duration: FAST_DURATION, ease }}
    className="absolute bottom-10 left-1/2 -translate-x-1/2"
  >
            <motion.div
    animate={{ y: [0, 6, 0] }}
    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
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
      <section
    id="features"
    ref={featuresRef}
    className="py-24 md:py-32 bg-gradient-to-b from-white to-[#F6F4EE]"
  >
        <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-center mb-16">
            <h2 className="text-[#1F2937] mb-4" style={{ fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.02em" }}>
              Everything You Need to Trade Livestock
            </h2>
            <p className="text-[#6B7280] max-w-xl mx-auto text-lg">Built for farmers, traders, and buyers with security and transparency.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => <FeatureParallaxCard
    key={feature.title}
    feature={feature}
    progress={featuresProgress}
    offset={featureParallaxOffsets[i]}
  />)}
          </div>
        </div>
      </section>

      {
    /* How it Works */
  }
      <section
    id="how-it-works"
    ref={stepsRef}
    className="py-24 md:py-32"
  >
        <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-center mb-16">
            <h2 className="text-[#1F2937] mb-4" style={{ fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.02em" }}>
              How It Works
            </h2>
            <p className="text-[#6B7280] text-lg">Get started in 4 simple steps</p>
          </div>

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
    progress={stepsProgress}
    offset={stepParallaxOffsets[i]}
  />)}
            </div>
          </div>
        </div>
      </section>

      {
    /* Testimonials */
  }
      <section
    id="testimonials"
    ref={testimonialsRef}
    className="py-24 md:py-32 bg-gradient-to-b from-white to-[#F6F4EE]"
  >
        <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="text-center mb-16">
            <h2 className="text-[#1F2937] mb-4" style={{ fontWeight: 700, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.02em" }}>
              What Our Users Say
            </h2>
            <p className="text-[#6B7280] max-w-lg mx-auto text-lg">Trusted by thousands of farmers and traders across the Philippines</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {testimonials.map((testimonial, i) => <TestimonialParallaxCard
    key={testimonial.name}
    testimonial={testimonial}
    progress={testimonialsProgress}
    offset={testimonialParallaxOffsets[i]}
  />)}
          </div>
        </div>
      </section>

      {
    /* Footer */
  }
      <footer className="bg-gradient-to-b from-[#0f2816] to-[#0a1910] text-white/70 py-16">
        <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3.5">
              <div className="text-white drop-shadow-[0_10px_26px_rgba(111,175,95,0.18)]">
                <BrandMark className="w-9 h-9" strokeWidth={2.35} />
              </div>
              <span className="text-white" style={{ fontWeight: 700, fontSize: "1.28rem", letterSpacing: "-0.03em" }}>Herdify</span>
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
