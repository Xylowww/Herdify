import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { BrandMark } from "../components/ui/BrandMark";

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = (data) => {
    if (data.password.length < 6) {
      toast.error("Invalid email or password.");
      return;
    }
    toast.success("Welcome back!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Left panel - Form */}
      <div className="flex-1 flex flex-col bg-white px-8 py-8 lg:px-16 lg:py-10 min-h-screen">
        {/* Logo - top */}
        <div className="flex items-center gap-2.5">
          <div className="text-[#2F6B3F]">
            <BrandMark className="w-8 h-8" strokeWidth={2.35} />
          </div>
          <span className="text-[#1F2937]" style={{ fontWeight: 700, fontSize: "1.25rem", letterSpacing: "-0.02em" }}>
            Herdify
          </span>
        </div>

        {/* Form container - vertically and horizontally centered */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="w-full max-w-md"
          >
            <h1 className="text-[#1F2937] mb-2" style={{ fontWeight: 700, fontSize: "2rem", letterSpacing: "-0.02em" }}>
              Welcome back
            </h1>
            <p className="text-[#6B7280] text-base mb-8">Please enter your details</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm text-[#1F2937] mb-1.5" style={{ fontWeight: 500 }}>
                  Email address
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" }
                  })}
                  type="email"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-400" : "border-gray-300"} text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/20 focus:border-[#2F6B3F] transition-all`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-[#1F2937] mb-1.5" style={{ fontWeight: 500 }}>
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" }
                    })}
                    type={showPassword ? "text" : "password"}
                    className={`w-full px-4 py-3 pr-10 rounded-lg border ${errors.password ? "border-red-400" : "border-gray-300"} text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/20 focus:border-[#2F6B3F] transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1F2937] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("remember")}
                    className="w-4 h-4 rounded border-gray-300 text-[#2F6B3F] focus:ring-[#2F6B3F]"
                  />
                  <span className="text-sm text-[#1F2937]">Remember for 30 days</span>
                </label>
                <a href="#" className="text-sm text-[#2F6B3F] hover:underline" style={{ fontWeight: 500 }}>
                  Forgot password
                </a>
              </div>

              {/* Sign in button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#2F6B3F] hover:bg-[#256332] text-white rounded-lg disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                style={{ fontWeight: 600 }}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>

              {/* Google sign in */}
              <button
                type="button"
                className="w-full py-3 bg-white border border-gray-300 text-[#1F2937] rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
                style={{ fontWeight: 500 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom link - pinned to bottom left */}
        <p className="text-sm text-[#6B7280]">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#2F6B3F] hover:underline" style={{ fontWeight: 600 }}>
            Sign up
          </Link>
        </p>
      </div>

      {/* Right panel - Livestock image with overlay */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=1600&fit=crop"
          alt="Green field"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Green gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3d22]/80 via-[#2F6B3F]/65 to-[#3a834d]/50" />
      </div>
    </div>
  );
}
export {
  LoginPage as default
};
