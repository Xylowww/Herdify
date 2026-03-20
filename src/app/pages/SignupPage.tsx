import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import {
  Eye, EyeOff, Lock, Mail, User, Phone, MapPin,
  ShieldCheck, ShoppingCart, Package, CheckCircle2
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { toast } from 'sonner';

type Role = 'Buyer' | 'Seller';

interface SignupForm {
  name: string;
  email: string;
  phone: string;
  location: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
}

export default function SignupPage() {
  const { login } = useAppStore();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>('Buyer');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<SignupForm>();
  const passwordValue = watch('password');

  const onSubmit = async (data: SignupForm) => {
    await new Promise((r) => setTimeout(r, 1000));

    // Demo: log in as a preset user based on role
    if (role === 'Buyer') {
      login('u4');
      toast.success('Account created! Welcome to Herdify.');
      navigate('/marketplace');
    } else {
      login('u1');
      toast.success('Seller account created! Welcome to Herdify.');
      navigate('/seller/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F4EE] flex" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&h=900&fit=crop"
          alt="Livestock"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f2816]/92 via-[#1a3d22]/88 to-[#2F6B3F]/75" />
        <div className="relative z-10 flex flex-col justify-between p-10 text-white">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.3rem' }}>Herdify</span>
          </Link>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: '1.8rem', lineHeight: 1.2, marginBottom: '1rem' }}>
              Join the Livestock Marketplace
            </h2>
            <div className="space-y-3">
              {[
                'Only necessary data collected (data minimization)',
                'Your location shown as approximate area by default',
                'Contact details shared only when you approve',
                'You can delete your account anytime',
              ].map((t) => (
                <div key={t} className="flex items-start gap-2 text-white/80 text-sm">
                  <CheckCircle2 size={14} className="text-[#6FAF5F] flex-shrink-0 mt-0.5" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-6 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-[#2F6B3F] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <span style={{ fontWeight: 700, color: '#2F6B3F', fontSize: '1.1rem' }}>Herdify</span>
          </Link>

          <h1 className="text-[#1F2937] mb-1" style={{ fontWeight: 800, fontSize: '1.7rem', letterSpacing: '-0.02em' }}>Create Account</h1>
          <p className="text-[#6B7280] text-sm mb-6">Start buying or selling livestock today</p>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {([
              { value: 'Buyer' as Role, icon: ShoppingCart, desc: 'Browse & purchase livestock' },
              { value: 'Seller' as Role, icon: Package, desc: 'List & sell your livestock' },
            ]).map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  role === r.value
                    ? 'border-[#2F6B3F] bg-[#F0F7F2] shadow-sm'
                    : 'border-[#E2DDD5] bg-white hover:border-[#2F6B3F]/40'
                }`}
              >
                <r.icon size={22} className={role === r.value ? 'text-[#2F6B3F]' : 'text-[#6B7280]'} />
                <p className="text-sm mt-2" style={{ fontWeight: 600, color: role === r.value ? '#2F6B3F' : '#1F2937' }}>{r.value}</p>
                <p className="text-xs text-[#6B7280] mt-0.5">{r.desc}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm text-[#1F2937] mb-1.5" style={{ fontWeight: 500 }}>Full Name</label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                <input
                  {...register('name', { required: 'Full name is required', minLength: { value: 2, message: 'Name too short' } })}
                  type="text"
                  placeholder="Juan Dela Cruz"
                  className={`w-full pl-9 pr-4 py-2.5 rounded-xl border ${errors.name ? 'border-[#D64545]' : 'border-[#E2DDD5]'} bg-white text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/30 focus:border-[#2F6B3F]`}
                />
              </div>
              {errors.name && <p className="text-xs text-[#D64545] mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-[#1F2937] mb-1.5" style={{ fontWeight: 500 }}>Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                <input
                  {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })}
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full pl-9 pr-4 py-2.5 rounded-xl border ${errors.email ? 'border-[#D64545]' : 'border-[#E2DDD5]'} bg-white text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/30 focus:border-[#2F6B3F]`}
                />
              </div>
              {errors.email && <p className="text-xs text-[#D64545] mt-1">{errors.email.message}</p>}
            </div>

            {/* Phone + Location row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-[#1F2937] mb-1.5" style={{ fontWeight: 500 }}>Phone</label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                  <input
                    {...register('phone', { required: 'Phone is required' })}
                    type="tel"
                    placeholder="+63 9xx xxx xxxx"
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border ${errors.phone ? 'border-[#D64545]' : 'border-[#E2DDD5]'} bg-white text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/30 focus:border-[#2F6B3F]`}
                  />
                </div>
                {errors.phone && <p className="text-xs text-[#D64545] mt-1">Required</p>}
              </div>
              <div>
                <label className="block text-sm text-[#1F2937] mb-1.5" style={{ fontWeight: 500 }}>Location</label>
                <div className="relative">
                  <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                  <input
                    {...register('location', { required: 'Location is required' })}
                    type="text"
                    placeholder="City, Province"
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border ${errors.location ? 'border-[#D64545]' : 'border-[#E2DDD5]'} bg-white text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/30 focus:border-[#2F6B3F]`}
                  />
                </div>
                {errors.location && <p className="text-xs text-[#D64545] mt-1">Required</p>}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-[#1F2937] mb-1.5" style={{ fontWeight: 500 }}>Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                <input
                  {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Minimum 8 characters' } })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  className={`w-full pl-9 pr-10 py-2.5 rounded-xl border ${errors.password ? 'border-[#D64545]' : 'border-[#E2DDD5]'} bg-white text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/30 focus:border-[#2F6B3F]`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-[#D64545] mt-1">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-[#1F2937] mb-1.5" style={{ fontWeight: 500 }}>Confirm Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                <input
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (v) => v === passwordValue || 'Passwords do not match',
                  })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  className={`w-full pl-9 pr-4 py-2.5 rounded-xl border ${errors.confirmPassword ? 'border-[#D64545]' : 'border-[#E2DDD5]'} bg-white text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/30 focus:border-[#2F6B3F]`}
                />
              </div>
              {errors.confirmPassword && <p className="text-xs text-[#D64545] mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* Checkboxes */}
            <div className="space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input {...register('agreeTerms', { required: true })} type="checkbox" className="mt-1 accent-[#2F6B3F]" />
                <span className="text-xs text-[#6B7280]">
                  I agree to the <a href="#" className="text-[#2F6B3F] hover:underline">Terms of Service</a> and trading guidelines
                </span>
              </label>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input {...register('agreePrivacy', { required: true })} type="checkbox" className="mt-1 accent-[#2F6B3F]" />
                <span className="text-xs text-[#6B7280]">
                  I consent to the <a href="#" className="text-[#2F6B3F] hover:underline">Privacy Policy</a>. My location will only be shown approximately.
                </span>
              </label>
            </div>

            {/* Privacy notice */}
            <div className="flex items-start gap-2 p-3 rounded-xl bg-[#2F6B3F]/5 border border-[#2F6B3F]/15">
              <ShieldCheck size={15} className="text-[#2F6B3F] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[#6B7280]" style={{ lineHeight: 1.5 }}>
                We collect only what is needed. Your phone number and exact address are never displayed publicly. Data is stored securely and never sold.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#2F6B3F] text-white rounded-xl hover:bg-[#3a834d] transition-all shadow-sm hover:shadow-md disabled:opacity-60"
              style={{ fontWeight: 600 }}
            >
              {isSubmitting ? 'Creating Account...' : `Create ${role} Account`}
            </button>
          </form>

          <p className="text-center text-sm text-[#6B7280] mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-[#2F6B3F] hover:underline" style={{ fontWeight: 600 }}>Sign In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
