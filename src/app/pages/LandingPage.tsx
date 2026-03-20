import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import {
  MapPin, Search, ShieldCheck, MessageSquare,
  TrendingUp, Users, ArrowRight, CheckCircle2,
  Star, ClipboardList, Handshake, UserPlus, ChevronDown
} from 'lucide-react';

const HERO_IMG = 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1400&h=800&fit=crop';
const CATTLE_IMG = 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=600&h=400&fit=crop';
const GOAT_IMG = 'https://images.unsplash.com/photo-1524024973431-3550a18a7b64?w=600&h=400&fit=crop';
const CHICKEN_IMG = 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&h=400&fit=crop';
const PIG_IMG = 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&h=400&fit=crop';
const CARABAO_IMG = 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=600&h=400&fit=crop';

// Ultra smooth spring - very low stiffness for buttery animations
const smoothSpring = { stiffness: 30, damping: 30, restDelta: 0.0001 };
const gentleSpring = { stiffness: 20, damping: 25, restDelta: 0.0001 };

// Micro animation variants - subtle and smooth
const microHover = { y: -4, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } };
const microTap = { scale: 0.98, transition: { duration: 0.1 } };

// Subtle reveal - small movement, no blinking
const subtleReveal = {
  hidden: { opacity: 0.4, y: 15 },
  visible: { opacity: 1, y: 0 }
};

const cardReveal = {
  hidden: { opacity: 0.5, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Alias for backward compatibility
const revealVariants = cardReveal;

const features = [
  { icon: MapPin, title: 'Location-Based Discovery', desc: 'Find nearby livestock listings using our integrated map. Browse by distance and region across the Philippines.' },
  { icon: Search, title: 'Smart Filters', desc: 'Filter by type, breed, price range, and status to find exactly what you need quickly and efficiently.' },
  { icon: MessageSquare, title: 'Secure Messaging', desc: 'Communicate safely with buyers and sellers. Contact details are shared only with your explicit consent.' },
  { icon: ShieldCheck, title: 'Verified Listings', desc: 'All sellers go through verification. Every listing is reviewed by our moderation team before going live.' },
  { icon: TrendingUp, title: 'Transaction Tracking', desc: 'Keep a complete history of all your trades. Manage listing status from Available to Reserved to Sold.' },
  { icon: Users, title: 'Trusted Community', desc: 'Join thousands of farmers, buyers, and traders across the Philippines in a secure marketplace.' },
];

const categories = [
  { label: 'Cattle & Carabao', img: CATTLE_IMG, count: '1,450+ listings', type: 'Cattle' },
  { label: 'Goats & Sheep', img: GOAT_IMG, count: '980+ listings', type: 'Goat' },
  { label: 'Poultry', img: CHICKEN_IMG, count: '720+ listings', type: 'Chicken' },
  { label: 'Pigs & Hogs', img: PIG_IMG, count: '640+ listings', type: 'Pig' },
  { label: 'Carabao', img: CARABAO_IMG, count: '410+ listings', type: 'Carabao' },
];

const testimonials = [
  { name: 'Manuel Reyes', role: 'Cattle Farmer, Batangas', text: 'Herdify made it so easy to sell my cattle. Within a week, I had 8 inquiries and sold all 5 heads at a fair price.', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
  { name: 'Rosa Mendoza', role: 'Buyer, Quezon', text: 'I found healthy dairy goats near my area using the map feature. The messaging system helped me negotiate safely before visiting the farm.', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face' },
  { name: 'Carlo Gutierrez', role: 'Livestock Trader, Laguna', text: 'As a full-time trader, I rely on Herdify daily. The transaction tracking and verified sellers save me time and give me peace of mind.', rating: 5, avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&h=80&fit=crop&crop=face' },
];

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Hero parallax scroll
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Hero parallax transforms - ultra smooth
  const heroImageY = useSpring(useTransform(heroScrollProgress, [0, 1], [0, 200]), gentleSpring);
  const heroImageScale = useSpring(useTransform(heroScrollProgress, [0, 1], [1, 1.15]), gentleSpring);
  const heroContentY = useSpring(useTransform(heroScrollProgress, [0, 1], [0, 100]), smoothSpring);
  const heroOpacity = useSpring(useTransform(heroScrollProgress, [0, 0.5], [1, 0]), smoothSpring);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F6F4EE] overflow-x-hidden" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-nav shadow-soft">
        <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2F6B3F] to-[#3a834d] flex items-center justify-center shadow-glow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <span className="gradient-text" style={{ fontWeight: 700, fontSize: '1.15rem', letterSpacing: '-0.02em' }}>Herdify</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#categories" className="text-sm text-[#6B7280] hover:text-[#2F6B3F] transition-colors duration-200" style={{ fontWeight: 500 }}>Categories</a>
            <a href="#features" className="text-sm text-[#6B7280] hover:text-[#2F6B3F] transition-colors duration-200" style={{ fontWeight: 500 }}>Features</a>
            <a href="#how-it-works" className="text-sm text-[#6B7280] hover:text-[#2F6B3F] transition-colors duration-200" style={{ fontWeight: 500 }}>How It Works</a>
            <a href="#testimonials" className="text-sm text-[#6B7280] hover:text-[#2F6B3F] transition-colors duration-200" style={{ fontWeight: 500 }}>Reviews</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="px-4 py-2 text-sm text-[#2F6B3F] hover:bg-[#2F6B3F]/5 rounded-xl transition-colors duration-200" style={{ fontWeight: 500 }}>
              Sign In
            </Link>
            <Link to="/signup" className="px-5 py-2.5 text-sm bg-gradient-to-r from-[#2F6B3F] to-[#3a834d] text-white rounded-xl hover:opacity-90 transition-opacity duration-200" style={{ fontWeight: 600 }}>
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero - Full Viewport */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
        {/* Parallax Background */}
        <motion.div
          className="absolute inset-[-10%] will-change-transform"
          style={{ y: heroImageY, scale: heroImageScale }}
        >
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1910]/90 via-[#1a3d22]/75 to-[#2F6B3F]/60" />

        {/* Hero Content */}
        <motion.div
          className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6"
          style={{ y: heroContentY, opacity: heroOpacity }}
        >
          <div className="max-w-3xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 glass-dark px-5 py-2.5 rounded-full mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#6FAF5F] animate-pulse" />
              <span className="text-white text-sm" style={{ fontWeight: 600 }}>Philippines No. 1 Livestock Marketplace</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white mb-6"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em' }}
            >
              Buy & Sell Livestock<br />
              <span className="bg-gradient-to-r from-[#C68A3A] to-[#d9a454] bg-clip-text text-transparent">With Confidence</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/85 mb-10 max-w-xl mx-auto"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', lineHeight: 1.7 }}
            >
              Connect with trusted sellers and buyers across the Philippines. Find nearby livestock, negotiate securely, and trade with confidence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4 mb-10"
            >
              <motion.div whileHover={microHover} whileTap={microTap}>
                <Link
                  to="/marketplace"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C68A3A] to-[#d9a454] text-white rounded-2xl shadow-lg"
                  style={{ fontWeight: 600, fontSize: '1.05rem' }}
                >
                  Browse Listings
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div whileHover={microHover} whileTap={microTap}>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 px-8 py-4 glass text-white rounded-2xl border border-white/20"
                  style={{ fontWeight: 600, fontSize: '1.05rem' }}
                >
                  Post Your Livestock
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-6"
            >
              {['Free to Register', 'Location Privacy', 'Verified Sellers'].map((t) => (
                <span key={t} className="flex items-center gap-2 text-white/80" style={{ fontSize: '0.95rem' }}>
                  <CheckCircle2 size={16} className="text-[#6FAF5F]" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-white/50"
            >
              <span className="text-xs" style={{ fontWeight: 500 }}>Scroll to explore</span>
              <ChevronDown size={20} />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-24 md:py-32">
        <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <motion.div
            className="text-center mb-16"
            variants={subtleReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="text-[#1F2937] mb-4" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.02em' }}>
              Browse by Category
            </h2>
            <p className="text-[#6B7280] max-w-lg mx-auto text-lg">Find the livestock you need from verified sellers nationwide</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.label}
                variants={cardReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                whileHover={microHover}
                whileTap={microTap}
              >
                <Link to="/marketplace" className="group block card-modern overflow-hidden">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={cat.img}
                      alt={cat.label}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-white text-xs px-3 py-1.5 glass-dark rounded-full" style={{ fontWeight: 600 }}>
                      {cat.count}
                    </span>
                  </div>
                  <div className="p-5 bg-gradient-to-b from-white to-[#FAFAF8]">
                    <h3 className="text-[#1F2937] group-hover:text-[#2F6B3F] transition-colors duration-200" style={{ fontWeight: 700, fontSize: '1.05rem' }}>{cat.label}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 md:py-32 bg-gradient-to-b from-white to-[#F6F4EE]">
        <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <motion.div
            className="text-center mb-16"
            variants={subtleReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="text-[#1F2937] mb-4" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.02em' }}>
              Everything You Need to Trade Livestock
            </h2>
            <p className="text-[#6B7280] max-w-xl mx-auto text-lg">Built for farmers, traders, and buyers with security and transparency.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={cardReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                whileHover={microHover}
                className="p-7 card-glass group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#2F6B3F]/10 to-[#6FAF5F]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:from-[#2F6B3F] group-hover:to-[#3a834d] transition-all duration-300">
                  <f.icon size={24} className="text-[#2F6B3F] group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="text-[#1F2937] mb-3" style={{ fontWeight: 700, fontSize: '1.1rem' }}>{f.title}</h4>
                <p className="text-[#6B7280]" style={{ lineHeight: 1.7 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 md:py-32">
        <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <motion.div
            className="text-center mb-16"
            variants={subtleReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="text-[#1F2937] mb-4" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.02em' }}>
              How It Works
            </h2>
            <p className="text-[#6B7280] text-lg">Get started in 4 simple steps</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Create Account', desc: 'Register as a Buyer or Seller. Verify your identity for trusted trading.', icon: UserPlus },
              { step: '02', title: 'List or Browse', desc: 'Post your livestock with photos and location, or search nearby listings.', icon: ClipboardList },
              { step: '03', title: 'Inquire & Negotiate', desc: 'Send inquiries, negotiate price, and schedule farm visits securely.', icon: MessageSquare },
              { step: '04', title: 'Complete Trade', desc: 'Finalize the deal, mark as sold, and track your transaction history.', icon: Handshake },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                variants={cardReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                whileHover={microHover}
                className="relative card-glass p-8 text-center group"
              >
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-4 py-1.5 bg-gradient-to-r from-[#2F6B3F] to-[#3a834d] text-white rounded-full"
                  style={{ fontWeight: 700 }}
                >
                  Step {s.step}
                </span>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F0F7F2] to-[#E8F2EA] flex items-center justify-center mx-auto mb-5 mt-3 group-hover:from-[#2F6B3F] group-hover:to-[#3a834d] transition-all duration-300">
                  <s.icon size={26} className="text-[#2F6B3F] group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="text-[#1F2937] mb-3" style={{ fontWeight: 700, fontSize: '1.1rem' }}>{s.title}</h4>
                <p className="text-[#6B7280]" style={{ lineHeight: 1.6 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 md:py-32 bg-gradient-to-b from-white to-[#F6F4EE]">
        <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <motion.div
            className="text-center mb-16"
            variants={subtleReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="text-[#1F2937] mb-4" style={{ fontWeight: 700, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.02em' }}>
              What Our Users Say
            </h2>
            <p className="text-[#6B7280] max-w-lg mx-auto text-lg">
              Trusted by thousands of farmers and traders across the Philippines
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={cardReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                whileHover={microHover}
                className="p-7 card-glass"
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={18} className="text-[#C68A3A] fill-[#C68A3A]" />
                  ))}
                </div>
                <p className="text-[#1F2937] mb-6" style={{ lineHeight: 1.8 }}>"{t.text}"</p>
                <div className="flex items-center gap-4 pt-5 border-t border-[#E2DDD5]/50">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-soft"
                  />
                  <div>
                    <p className="text-[#1F2937]" style={{ fontWeight: 600 }}>{t.name}</p>
                    <p className="text-sm text-[#6B7280]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#0f2816] to-[#0a1910] text-white/70 py-16">
        <div className="max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <span className="text-white" style={{ fontWeight: 700, fontSize: '1.2rem' }}>Herdify</span>
            </div>
            <p className="text-sm text-white/40 text-center max-w-lg">
              All transactions are subject to verification. Herdify is not responsible for individual trades.
              Location data is used only for listing proximity and is never shared without consent.
            </p>
            <p className="text-sm text-white/30">&copy; 2025 Herdify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
