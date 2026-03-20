import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, AlertCircle, Smartphone } from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { toast } from "sonner";
const DEMO_ACCOUNTS = [
  { id: "u1", label: "Buyer", name: "Juan Dela Cruz", email: "juan@herdify.ph", color: "#4A90D9", bg: "#EDF4FD" },
  { id: "u2", label: "Seller", name: "Maria Santos", email: "maria@herdify.ph", color: "#2F6B3F", bg: "#F0F7F2" },
  { id: "u3", label: "Admin", name: "Admin Reyes", email: "admin@herdify.ph", color: "#C68A3A", bg: "#FEF7EC" }
];
function LoginPage() {
  const { login } = useAppStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [pendingUserId, setPendingUserId] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();
  const quickLogin = (userId) => {
    setPendingUserId(userId);
    login(userId);
    toast.success("Welcome back!");
    const account = DEMO_ACCOUNTS.find((a) => a.id === userId);
    if (account?.label === "Admin") navigate("/admin");
    else if (account?.label === "Seller") navigate("/seller/dashboard");
    else navigate("/marketplace");
  };
  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 800));
    if (data.password.length < 6) {
      setLoginAttempts((n) => n + 1);
      toast.error("Invalid email or password.");
      return;
    }
    const account = DEMO_ACCOUNTS.find((a) => a.email === data.email);
    if (account) {
      login(account.id);
      toast.success("Welcome back!");
      if (account.label === "Admin") navigate("/admin");
      else if (account.label === "Seller") navigate("/seller/dashboard");
      else navigate("/marketplace");
    } else {
      login("u1");
      toast.success("Welcome back!");
      navigate("/marketplace");
    }
  };
  const handle2FA = () => {
    if (otpValue === "123456") {
      login(pendingUserId || "u1");
      toast.success("2FA verified. Welcome!");
      navigate("/marketplace");
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };
  return <div className="min-h-screen bg-[#F6F4EE] flex" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      {
    /* Left panel - decorative */
  }
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
    src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=900&fit=crop"
    alt="Livestock farm"
    className="absolute inset-0 w-full h-full object-cover scale-105"
  />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f2816]/92 via-[#1a3d22]/88 to-[#2F6B3F]/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(111,175,95,0.2),transparent_50%)]" />
        <div className="relative z-10 flex flex-col justify-between p-10 text-white">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl glass flex items-center justify-center shadow-glow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span style={{ fontWeight: 800, fontSize: "1.3rem", letterSpacing: "-0.02em" }}>Herdify</span>
          </div>
          <div>
            <h2 className="drop-shadow-lg" style={{ fontWeight: 700, fontSize: "2rem", lineHeight: 1.2, marginBottom: "1rem" }}>
              The Smarter Way to Trade Livestock
            </h2>
            <div className="space-y-3">
              {["Secured with hashed passwords and 2FA", "Location privacy built-in by default", "Role-based access for buyers, sellers, admins"].map((t) => <div key={t} className="flex items-center gap-2 text-white/85 text-sm">
                  <ShieldCheck size={15} className="text-[#6FAF5F] flex-shrink-0 drop-shadow-sm" />
                  {t}
                </div>)}
            </div>
          </div>
        </div>
      </div>

      {
    /* Right panel - form */
  }
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    className="w-full max-w-md"
  >
          {
    /* Logo (mobile) */
  }
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2F6B3F] to-[#3a834d] flex items-center justify-center shadow-glow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="gradient-text" style={{ fontWeight: 700, fontSize: "1.15rem" }}>Herdify</span>
          </div>

          <h1 className="text-[#1F2937] mb-1" style={{ fontWeight: 800, fontSize: "1.7rem", letterSpacing: "-0.02em" }}>Sign In</h1>
          <p className="text-[#6B7280] text-sm mb-6">Access your Herdify account</p>

          {
    /* Demo Quick Access */
  }
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px flex-1 bg-[#E2DDD5]" />
              <span className="text-xs text-[#9CA3AF]" style={{ fontWeight: 500 }}>Demo Quick Access</span>
              <div className="h-px flex-1 bg-[#E2DDD5]" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {DEMO_ACCOUNTS.map((acc) => <button
    key={acc.id}
    onClick={() => quickLogin(acc.id)}
    className="p-3.5 rounded-xl glass-card hover:shadow-elevated transition-all duration-300 text-center active:scale-[0.97]"
    style={{ background: acc.bg }}
  >
                  <span className="text-xs block" style={{ fontWeight: 700, color: acc.color }}>{acc.label}</span>
                  <span className="text-[10px] text-[#6B7280] block mt-0.5 truncate">{acc.name}</span>
                </button>)}
            </div>
          </div>

          {
    /* Rate limit warning */
  }
          {loginAttempts >= 3 && <div className="flex items-start gap-2.5 p-3.5 rounded-xl glass border border-amber-200/50 mb-4" style={{ background: "rgba(251, 191, 36, 0.1)" }}>
              <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-amber-800 text-sm">Too many failed attempts. Account temporarily limited for security.</p>
            </div>}

          {!show2FA ? <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {
    /* Email */
  }
              <div>
                <label className="block text-sm text-[#1F2937] mb-1.5" style={{ fontWeight: 500 }}>Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                  <input
    {...register("email", {
      required: "Email is required",
      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" }
    })}
    type="email"
    placeholder="you@example.com"
    className={`w-full pl-9 pr-4 py-2.5 rounded-xl border ${errors.email ? "border-[#D64545] bg-red-50/80" : "border-[#E2DDD5]/80"} input-glass text-sm text-[#1F2937] transition-all duration-300`}
  />
                </div>
                {errors.email && <p className="text-xs text-[#D64545] mt-1">{errors.email.message}</p>}
              </div>

              {
    /* Password */
  }
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm text-[#1F2937]" style={{ fontWeight: 500 }}>Password</label>
                  <a href="#" className="text-xs text-[#2F6B3F] hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                  <input
    {...register("password", {
      required: "Password is required",
      minLength: { value: 6, message: "Password must be at least 6 characters" }
    })}
    type={showPassword ? "text" : "password"}
    placeholder="Enter your password"
    className={`w-full pl-9 pr-10 py-2.5 rounded-xl border ${errors.password ? "border-[#D64545] bg-red-50/80" : "border-[#E2DDD5]/80"} input-glass text-sm text-[#1F2937] transition-all duration-300`}
  />
                  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1F2937] transition-colors"
  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-[#D64545] mt-1">{errors.password.message}</p>}
                <p className="text-xs text-[#9CA3AF] mt-1">Passwords are hashed and never stored in plain text.</p>
              </div>

              <button
    type="submit"
    disabled={isSubmitting || loginAttempts >= 5}
    className="w-full py-3 btn-modern bg-gradient-to-r from-[#2F6B3F] to-[#3a834d] text-white rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
    style={{ fontWeight: 600 }}
  >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </form> : (
    /* 2FA Panel */
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
              <div className="flex items-center gap-3 p-4 rounded-xl bg-[#2F6B3F]/5 border border-[#2F6B3F]/20">
                <Smartphone size={20} className="text-[#2F6B3F]" />
                <div>
                  <p className="text-sm text-[#1F2937]" style={{ fontWeight: 600 }}>Two-Factor Authentication Required</p>
                  <p className="text-xs text-[#6B7280]">Enter the 6-digit code from your authenticator app.</p>
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#1F2937] mb-1.5" style={{ fontWeight: 500 }}>One-Time Password</label>
                <input
      type="text"
      maxLength={6}
      value={otpValue}
      onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
      placeholder="123456"
      className="w-full px-4 py-3 rounded-xl border border-[#E2DDD5] bg-white text-center tracking-widest text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/30 focus:border-[#2F6B3F]"
      style={{ fontWeight: 700, fontSize: "1.3rem", letterSpacing: "0.3em" }}
    />
                <p className="text-xs text-[#9CA3AF] mt-1 text-center">(Demo: 123456)</p>
              </div>
              <button
      onClick={handle2FA}
      className="w-full py-3 bg-[#2F6B3F] text-white rounded-xl hover:bg-[#3a834d] transition-colors"
      style={{ fontWeight: 600 }}
    >
                Verify Code
              </button>
              <button onClick={() => setShow2FA(false)} className="w-full text-sm text-[#6B7280] hover:text-[#1F2937]">
                Back to Sign In
              </button>
            </motion.div>
  )}

          <p className="text-center text-sm text-[#6B7280] mt-6">
            No account yet?{" "}
            <Link to="/signup" className="text-[#2F6B3F] hover:underline" style={{ fontWeight: 600 }}>
              Sign Up Free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>;
}
export {
  LoginPage as default
};
