import { useState } from "react";
import { motion } from "motion/react";
import {
  User,
  Lock,
  MapPin,
  Bell,
  Shield,
  Trash2,
  Download,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  Eye,
  Smartphone,
  Key,
  AlertTriangle,
  CheckCircle2,
  Camera,
  Monitor,
  Globe,
  Clock
} from "lucide-react";
import { useAppStore } from "../store/useAppStore";
import { toast } from "sonner";
function ProfilePage() {
  const { currentUser } = useAppStore();
  const [activeTab, setActiveTab] = useState("profile");
  const [locationPrivacy, setLocationPrivacy] = useState(true);
  const [contactConsent, setContactConsent] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [inquiryNotif, setInquiryNotif] = useState(true);
  const [statusNotif, setStatusNotif] = useState(true);
  const [twoFA, setTwoFA] = useState(currentUser?.twoFAEnabled || false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "data", label: "My Data", icon: Download }
  ];
  const Toggle = ({ value, onChange }) => <button type="button" onClick={() => onChange(!value)} className="transition-all duration-200">
      {value ? <ToggleRight size={26} className="text-[#2F6B3F] fill-[#2F6B3F]" /> : <ToggleLeft size={26} className="text-[#9CA3AF]" />}
    </button>;
  return <div>
      {
    /* Profile Header Banner */
  }
      <div className="page-banner rounded-2xl p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-5">
          <div className="relative flex-shrink-0">
            <img
    src={currentUser?.avatar}
    alt={currentUser?.name}
    className="w-[88px] h-[88px] rounded-2xl object-cover border-3 border-white/30 shadow-lg"
  />
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white text-[#2F6B3F] rounded-full flex items-center justify-center border-2 border-[#2F6B3F]/20 shadow-sm hover:bg-[#F0F7F2] transition-colors">
              <Camera size={14} />
            </button>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-white" style={{ fontWeight: 800, fontSize: "1.4rem" }}>{currentUser?.name}</h1>
              {currentUser?.verified && <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 bg-white/20 text-white rounded-full" style={{ fontWeight: 700 }}>
                  <CheckCircle2 size={11} /> Verified
                </span>}
            </div>
            <p className="text-white/70 text-sm">{currentUser?.email}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-white/60 text-xs flex items-center gap-1">
                <MapPin size={11} /> {currentUser?.location}
              </span>
              <span className="text-white/60 text-xs">{currentUser?.role} account</span>
              <span className="text-white/60 text-xs">Joined {currentUser?.joinDate}</span>
            </div>
          </div>
        </div>
      </div>

      {
    /* Tab Nav */
  }
      <div className="mb-6 overflow-x-auto scrollbar-hide -mx-1 px-1">
        <div className="flex gap-1 bg-white rounded-2xl border border-[#E2DDD5] p-1.5 min-w-max shadow-sm">
          {tabs.map((tab) => <button
    key={tab.id}
    onClick={() => setActiveTab(tab.id)}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition-all duration-150 ${activeTab === tab.id ? "bg-[#2F6B3F] text-white shadow-sm" : "text-[#1F2937] hover:bg-[#F6F4EE]"}`}
  >
              <tab.icon size={15} className={activeTab === tab.id ? "text-white" : "text-[#6B7280]"} />
              <span style={{ fontWeight: activeTab === tab.id ? 600 : 400 }}>{tab.label}</span>
            </button>)}
        </div>
      </div>

      {
    /* Tab Content */
  }
      <motion.div
    key={activeTab}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
  >
        {
    /* -- Profile Tab -- */
  }
        {activeTab === "profile" && <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2DDD5] p-6">
              <h3 className="text-[#1F2937] mb-5" style={{ fontWeight: 700 }}>Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
    { label: "Full Name", value: currentUser?.name, icon: User },
    { label: "Email Address", value: currentUser?.email, icon: User },
    { label: "Phone Number", value: currentUser?.phone, icon: User },
    { label: "Location", value: currentUser?.location, icon: MapPin }
  ].map((field) => <div key={field.label}>
                    <label className="block text-xs text-[#6B7280] mb-1.5" style={{ fontWeight: 600 }}>{field.label}</label>
                    <input
    type="text"
    defaultValue={field.value}
    className="input-premium w-full px-3.5 py-2.5 rounded-xl border border-[#E2DDD5] bg-[#F6F4EE] text-sm text-[#1F2937] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/20 focus:border-[#2F6B3F] focus:bg-white focus:shadow-sm"
  />
                  </div>)}
              </div>
              <p className="text-xs text-[#9CA3AF] mt-4">We only collect information required for trading. Your phone number is never shown publicly.</p>
              <button
    onClick={() => toast.success("Profile updated successfully.")}
    className="mt-5 px-6 py-2.5 bg-[#2F6B3F] text-white rounded-xl hover:bg-[#3a834d] transition-all duration-150 active:scale-[0.97] text-sm"
    style={{ fontWeight: 600 }}
  >
                Save Changes
              </button>
            </div>

            {
    /* Account Summary Sidebar */
  }
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-[#E2DDD5] p-5">
                <h4 className="text-[#1F2937] mb-4" style={{ fontWeight: 700, fontSize: "0.9rem" }}>Account Summary</h4>
                <div className="space-y-3">
                  {[
    { label: "Role", value: currentUser?.role || "-", color: "#2F6B3F" },
    { label: "Listings", value: String(currentUser?.listings || 0), color: "#4A90D9" },
    { label: "Transactions", value: String(currentUser?.transactions || 0), color: "#C68A3A" },
    { label: "Status", value: currentUser?.status || "-", color: "#2F6B3F" }
  ].map((item) => <div key={item.label} className="flex items-center justify-between py-2 border-b border-[#F0EDE8] last:border-0">
                      <span className="text-xs text-[#6B7280]">{item.label}</span>
                      <span className="text-sm text-[#1F2937]" style={{ fontWeight: 600 }}>{item.value}</span>
                    </div>)}
                </div>
              </div>
              {!currentUser?.verified && <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={16} className="text-amber-600" />
                    <p className="text-sm text-amber-800" style={{ fontWeight: 700 }}>Not Verified</p>
                  </div>
                  <p className="text-xs text-amber-700 mb-3">Verify your account to build trust with buyers and sellers.</p>
                  <button className="w-full py-2 bg-amber-600 text-white rounded-xl text-xs hover:bg-amber-700 transition-all active:scale-[0.97]" style={{ fontWeight: 600 }}>
                    Verify Now
                  </button>
                </div>}
            </div>
          </div>}

        {
    /* -- Privacy Tab -- */
  }
        {activeTab === "privacy" && <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2DDD5] p-6">
              <h3 className="text-[#1F2937] mb-1" style={{ fontWeight: 700 }}>Privacy Controls</h3>
              <p className="text-xs text-[#6B7280] mb-5">Your privacy settings apply to all your listings and interactions on Herdify.</p>
              <div className="space-y-3">
                {[
    { icon: MapPin, iconColor: "#2F6B3F", label: "Show Approximate Location Only", desc: "Display city/area instead of exact barangay or street address on listings", value: locationPrivacy, onChange: setLocationPrivacy },
    { icon: User, iconColor: "#6B7280", label: "Consent-Based Contact Sharing", desc: "Require your approval before phone number is shared with a buyer/seller", value: contactConsent, onChange: setContactConsent },
    { icon: Eye, iconColor: "#6B7280", label: "Marketing Emails", desc: "Receive tips, market trends, and featured listings via email", value: marketingEmails, onChange: setMarketingEmails }
  ].map((item) => <div key={item.label} className="flex items-center justify-between p-4 rounded-xl border border-[#E2DDD5] hover:bg-[#FAFAF8] transition-all duration-150">
                    <div className="flex items-start gap-3">
                      <item.icon size={17} style={{ color: item.iconColor }} className="flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-[#1F2937]" style={{ fontWeight: 600 }}>{item.label}</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                    <Toggle value={item.value} onChange={item.onChange} />
                  </div>)}
              </div>
            </div>
            <div className="bg-[#F0F7F2] rounded-2xl border border-[#C8E0CF] p-5 h-fit">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck size={18} className="text-[#2F6B3F]" />
                <p className="text-sm text-[#2F6B3F]" style={{ fontWeight: 700 }}>Privacy by Design</p>
              </div>
              <p className="text-xs text-[#2F6B3F]/80" style={{ lineHeight: 1.7 }}>
                Herdify is built with privacy at its core. Only involved parties can see your messages and sensitive listing details. We never sell your data to third parties.
              </p>
            </div>
          </div>}

        {
    /* -- Security Tab -- */
  }
        {activeTab === "security" && <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-5">
              {
    /* 2FA */
  }
              <div className="bg-white rounded-2xl border border-[#E2DDD5] p-6">
                <div className="flex items-center justify-between p-4 rounded-xl border border-[#E2DDD5] bg-[#FAFAF8]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F0F7F2] flex items-center justify-center flex-shrink-0">
                      <Smartphone size={18} className="text-[#2F6B3F]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#1F2937]" style={{ fontWeight: 700 }}>Two-Factor Authentication (2FA)</p>
                      <p className="text-xs text-[#6B7280] mt-0.5">Add an extra layer of security using an authenticator app</p>
                      {twoFA && <span className="text-xs text-[#2F6B3F] flex items-center gap-1 mt-1" style={{ fontWeight: 600 }}><CheckCircle2 size={11} /> Active</span>}
                    </div>
                  </div>
                  <Toggle value={twoFA} onChange={(v) => {
    setTwoFA(v);
    toast.success(v ? "2FA enabled." : "2FA disabled.");
  }} />
                </div>
              </div>

              {
    /* Change Password */
  }
              <div className="bg-white rounded-2xl border border-[#E2DDD5] p-6">
                <h4 className="text-[#1F2937] mb-4" style={{ fontWeight: 700 }}>Change Password</h4>
                <div className="space-y-3">
                  {["Current Password", "New Password", "Confirm New Password"].map((label) => <div key={label}>
                      <label className="block text-xs text-[#6B7280] mb-1.5" style={{ fontWeight: 600 }}>{label}</label>
                      <div className="relative">
                        <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                        <input
    type="password"
    placeholder="--------"
    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2DDD5] text-sm text-[#1F2937] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/20 focus:border-[#2F6B3F] focus:shadow-sm"
  />
                      </div>
                    </div>)}
                </div>
                <p className="text-xs text-[#9CA3AF] mt-3">Passwords are hashed using bcrypt before storage. Minimum 8 characters.</p>
                <button
    onClick={() => toast.success("Password changed successfully.")}
    className="mt-4 px-6 py-2.5 bg-[#2F6B3F] text-white rounded-xl text-sm hover:bg-[#3a834d] transition-all duration-150 active:scale-[0.97]"
    style={{ fontWeight: 600 }}
  >
                  Update Password
                </button>
              </div>
            </div>

            {
    /* Active Sessions sidebar */
  }
            <div className="bg-white rounded-2xl border border-[#E2DDD5] p-5 h-fit">
              <h4 className="text-[#1F2937] mb-4 flex items-center gap-2" style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                <Key size={15} className="text-[#6B7280]" />
                Active Sessions
              </h4>
              <div className="space-y-3">
                {[
    { device: "Chrome on Windows", location: "Manila, PH", time: "Active now", icon: Monitor, current: true },
    { device: "Mobile App (Android)", location: "Batangas, PH", time: "2 hours ago", icon: Smartphone, current: false }
  ].map((session, i) => <div key={i} className={`p-3 rounded-xl border ${session.current ? "border-[#2F6B3F]/20 bg-[#F0F7F2]" : "border-[#E2DDD5]"}`}>
                    <div className="flex items-start gap-3">
                      <session.icon size={16} className={session.current ? "text-[#2F6B3F]" : "text-[#6B7280]"} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-[#1F2937] truncate" style={{ fontWeight: 600 }}>{session.device}</p>
                          {session.current && <span className="w-1.5 h-1.5 rounded-full bg-[#2F6B3F]" />}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[#6B7280]">
                          <span className="flex items-center gap-0.5"><Globe size={9} />{session.location}</span>
                          <span className="flex items-center gap-0.5"><Clock size={9} />{session.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>}

        {
    /* -- Notifications Tab -- */
  }
        {activeTab === "notifications" && <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2DDD5] p-6">
              <h3 className="text-[#1F2937] mb-5" style={{ fontWeight: 700 }}>Notification Preferences</h3>
              <div className="space-y-3">
                {[
    { label: "New Inquiry Received", desc: "When a buyer sends a message about your listing", value: inquiryNotif, onChange: setInquiryNotif },
    { label: "Listing Status Updates", desc: "When your listing status changes (approved, sold, etc.)", value: statusNotif, onChange: setStatusNotif }
  ].map((n) => <div key={n.label} className="flex items-center justify-between p-4 rounded-xl border border-[#E2DDD5] hover:bg-[#FAFAF8] transition-all duration-150">
                    <div>
                      <p className="text-sm text-[#1F2937]" style={{ fontWeight: 600 }}>{n.label}</p>
                      <p className="text-xs text-[#6B7280] mt-0.5">{n.desc}</p>
                    </div>
                    <Toggle value={n.value} onChange={n.onChange} />
                  </div>)}
              </div>
            </div>
            <div className="bg-[#F6F4EE] rounded-2xl border border-[#E2DDD5] p-5 h-fit">
              <Bell size={20} className="text-[#6B7280] mb-3" />
              <p className="text-xs text-[#6B7280]" style={{ lineHeight: 1.7 }}>
                Notification preferences control what you see in your notification feed. Critical security alerts (login from new device, password change) are always sent.
              </p>
            </div>
          </div>}

        {
    /* -- Data Tab -- */
  }
        {activeTab === "data" && <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-white rounded-2xl border border-[#E2DDD5] p-6">
                <h3 className="text-[#1F2937] mb-1" style={{ fontWeight: 700 }}>Your Data</h3>
                <p className="text-xs text-[#6B7280] mb-5">You have the right to access, export, and delete your personal data at any time.</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-[#E2DDD5] bg-[#FAFAF8]">
                    <div>
                      <p className="text-sm text-[#1F2937]" style={{ fontWeight: 600 }}>Download Your Data</p>
                      <p className="text-xs text-[#6B7280] mt-0.5">Get a copy of your profile, listings, and messages in JSON format</p>
                    </div>
                    <button
    onClick={() => toast.success("Data export requested. You will receive an email within 24 hours.")}
    className="flex items-center gap-2 px-4 py-2.5 bg-[#2F6B3F] text-white rounded-xl text-xs hover:bg-[#3a834d] transition-all duration-150 active:scale-95"
    style={{ fontWeight: 600 }}
  >
                      <Download size={14} />
                      Export
                    </button>
                  </div>
                  <div className="p-4 rounded-xl border border-[#E2DDD5]">
                    <p className="text-sm text-[#1F2937] mb-2" style={{ fontWeight: 600 }}>Data Retention Policy</p>
                    <ul className="text-xs text-[#6B7280] space-y-1.5" style={{ lineHeight: 1.6 }}>
                      <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#6B7280] mt-1.5 flex-shrink-0" /> Messages: retained for 1 year after last activity</li>
                      <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#6B7280] mt-1.5 flex-shrink-0" /> Transaction records: 2 years (legal requirement)</li>
                      <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#6B7280] mt-1.5 flex-shrink-0" /> Audit logs: 1 year</li>
                      <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#6B7280] mt-1.5 flex-shrink-0" /> Account data: deleted within 30 days of account deletion</li>
                    </ul>
                  </div>
                </div>
              </div>

              {
    /* Delete Account */
  }
              <div className="bg-white rounded-2xl border-2 border-[#D64545]/20 p-6">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle size={16} className="text-[#D64545]" />
                  <h3 className="text-[#D64545]" style={{ fontWeight: 700 }}>Danger Zone</h3>
                </div>
                <p className="text-xs text-[#6B7280] mb-4">Permanently remove your account and all associated data. This action cannot be undone.</p>
                {!showDeleteConfirm ? <button
    onClick={() => setShowDeleteConfirm(true)}
    className="flex items-center gap-2 px-5 py-2.5 border border-[#D64545] text-[#D64545] rounded-xl text-sm hover:bg-red-50 transition-all duration-150 active:scale-95"
    style={{ fontWeight: 600 }}
  >
                    <Trash2 size={15} />
                    Delete My Account
                  </button> : <div className="p-4 bg-red-50 rounded-xl border border-[#D64545]/20">
                    <p className="text-sm text-[#D64545] mb-3" style={{ fontWeight: 600 }}>Are you sure? Type DELETE to confirm.</p>
                    <input
    type="text"
    placeholder='Type "DELETE"'
    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D64545]/40 text-sm mb-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D64545]/20 focus:border-[#D64545]"
  />
                    <div className="flex gap-2">
                      <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-2.5 border border-[#E2DDD5] text-[#6B7280] rounded-xl text-sm hover:bg-[#F6F4EE] transition-all duration-150">
                        Cancel
                      </button>
                      <button
    onClick={() => toast.error("Account deletion request submitted. Admin will process within 30 days.")}
    className="flex-1 py-2.5 bg-[#D64545] text-white rounded-xl text-sm transition-all duration-150 active:scale-[0.97]"
    style={{ fontWeight: 600 }}
  >
                        Confirm Delete
                      </button>
                    </div>
                  </div>}
              </div>
            </div>

            <div className="bg-[#F6F4EE] rounded-2xl border border-[#E2DDD5] p-5 h-fit">
              <Download size={20} className="text-[#6B7280] mb-3" />
              <p className="text-sm text-[#1F2937] mb-2" style={{ fontWeight: 700 }}>Your Rights</p>
              <p className="text-xs text-[#6B7280]" style={{ lineHeight: 1.7 }}>
                Under Philippine data privacy law (RA 10173), you have the right to access, correct, and erase your personal data at any time.
              </p>
            </div>
          </div>}
      </motion.div>
    </div>;
}
export {
  ProfilePage as default
};
