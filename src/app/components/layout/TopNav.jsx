import {
  Bell,
  Search,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Shield,
  LayoutDashboard,
  MessageSquare,
  ClipboardList,
  PlusSquare,
  History,
  BarChart2,
  AlertTriangle,
  Users,
  FileText,
  Home,
  X
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router";
import { useAppStore } from "../../store/useAppStore";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
function TopNav() {
  const { currentUser, notifications, switchRole, logout } = useAppStore();
  const unread = notifications.filter((n) => !n.read).length;
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const role = currentUser?.role;
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);
  const buyerNav = [
    { icon: Home, label: "Home", to: "/marketplace", end: true },
    { icon: MessageSquare, label: "Messages", to: "/messages", badge: 0 },
    { icon: Bell, label: "Notifications", to: "/notifications", badge: unread },
    { icon: History, label: "Transactions", to: "/transactions" }
  ];
  const sellerNav = [
    { icon: LayoutDashboard, label: "Dashboard", to: "/seller/dashboard", end: true },
    { icon: ClipboardList, label: "My Listings", to: "/seller/listings" },
    { icon: PlusSquare, label: "New Listing", to: "/seller/listings/create" },
    { icon: MessageSquare, label: "Messages", to: "/messages", badge: 0 },
    { icon: Bell, label: "Notifications", to: "/notifications", badge: unread },
    { icon: History, label: "Transactions", to: "/transactions" }
  ];
  const adminNav = [
    { icon: BarChart2, label: "Overview", to: "/admin", end: true },
    { icon: ClipboardList, label: "Listings", to: "/admin/listings" },
    { icon: Users, label: "Users", to: "/admin/users" },
    { icon: AlertTriangle, label: "Reports", to: "/admin/reports" },
    { icon: FileText, label: "Audit", to: "/admin/audit" },
    { icon: Bell, label: "Notifications", to: "/notifications", badge: unread }
  ];
  const navItems = role === "Admin" ? adminNav : role === "Seller" ? sellerNav : buyerNav;
  const handleRoleSwitch = (newRole) => {
    switchRole(newRole);
    setProfileOpen(false);
    if (newRole === "Admin") navigate("/admin");
    else if (newRole === "Seller") navigate("/seller/dashboard");
    else navigate("/marketplace");
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return <header className="h-14 glass-nav sticky top-0 z-40 shadow-soft">
      <div className="h-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center">
        {
    /* Left: Logo + Search */
  }
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link to="/" className="flex items-center gap-2 select-none group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2F6B3F] to-[#3a834d] flex items-center justify-center group-hover:shadow-glow transition-all duration-300 group-hover:scale-105">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="hidden lg:block gradient-text select-none" style={{ fontWeight: 700, fontSize: "1.15rem", letterSpacing: "-0.02em" }}>
              Herdify
            </span>
          </Link>

          <div className="hidden md:block relative ml-2">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
            <input
    type="text"
    placeholder="Search Herdify"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-52 lg:w-64 xl:w-80 pl-9 pr-3 py-2 rounded-full input-glass text-sm text-[#1F2937] placeholder:text-[#9CA3AF] transition-all duration-300"
  />
          </div>

          <button
    onClick={() => setSearchOpen(!searchOpen)}
    className="md:hidden w-9 h-9 rounded-full glass flex items-center justify-center text-[#6B7280] hover:text-[#2F6B3F] active:scale-95 transition-all duration-200"
  >
            {searchOpen ? <X size={16} /> : <Search size={16} />}
          </button>
        </div>

        {
    /* Center: Navigation Icons (desktop) */
  }
        <nav className="hidden md:flex items-center justify-center flex-1 mx-2 lg:mx-4 gap-1">
          {navItems.map((item) => <NavLink
    key={item.to}
    to={item.to}
    end={item.end}
    className={({ isActive }) => `relative flex items-center justify-center w-16 lg:w-24 h-11 rounded-xl transition-all duration-300 group ${isActive ? "text-[#2F6B3F] bg-[#F0F7F2]/80" : "text-[#6B7280] hover:bg-white/60 hover:text-[#1F2937] hover:shadow-soft"}`}
  >
              {({ isActive }) => <>
                  <div className="relative">
                    <item.icon
    size={22}
    className={`transition-all duration-300 ${isActive ? "text-[#2F6B3F] drop-shadow-sm" : "group-hover:scale-110"}`}
    strokeWidth={isActive ? 2.5 : 1.8}
  />
                    {item.badge !== void 0 && item.badge > 0 && <motion.span
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] bg-gradient-to-br from-[#D64545] to-[#c23a3a] text-white rounded-full flex items-center justify-center px-1 shadow-sm"
    style={{ fontSize: "10px", fontWeight: 700 }}
  >
                        {item.badge > 9 ? "9+" : item.badge}
                      </motion.span>}
                  </div>
                  {isActive && <motion.div
    layoutId="topnav-indicator"
    className="absolute bottom-0 left-3 right-3 h-[3px] bg-gradient-to-r from-[#2F6B3F] to-[#3a834d] rounded-t-full shadow-glow"
    transition={{ type: "spring", stiffness: 400, damping: 30 }}
  />}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 glass-dark text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap z-50 shadow-elevated">
                    {item.label}
                  </div>
                </>}
            </NavLink>)}
        </nav>

        {
    /* Right: Profile */
  }
        <div className="flex items-center gap-1.5 flex-shrink-0 ml-auto md:ml-0">
          {currentUser && <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs glass text-[#2F6B3F]" style={{ fontWeight: 600 }}>
              {currentUser.role}
            </span>}

          <div className="relative" ref={profileRef}>
            <button
    onClick={() => setProfileOpen(!profileOpen)}
    className={`flex items-center gap-1.5 p-1 pr-2 rounded-full transition-all duration-300 ${profileOpen ? "glass ring-2 ring-[#2F6B3F]/20 shadow-soft" : "hover:glass hover:shadow-soft"}`}
  >
              <img
    src={currentUser?.avatar}
    alt={currentUser?.name}
    className="w-8 h-8 rounded-full object-cover border-2 border-white/80 shadow-sm"
  />
              <ChevronDown size={14} className={`text-[#6B7280] transition-transform duration-300 hidden sm:block ${profileOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {profileOpen && <motion.div
    initial={{ opacity: 0, y: -8, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -8, scale: 0.95 }}
    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
    className="absolute right-0 top-full mt-2 w-64 glass-strong rounded-2xl shadow-elevated overflow-hidden z-50 border border-white/50"
  >
                  <div className="px-4 py-3 border-b border-[#E2DDD5]/50 bg-gradient-to-br from-[#F0F7F2]/80 to-white/60">
                    <div className="flex items-center gap-3">
                      <img src={currentUser?.avatar} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                      <div className="min-w-0">
                        <p className="text-sm text-[#1F2937] truncate" style={{ fontWeight: 600 }}>{currentUser?.name}</p>
                        <p className="text-xs text-[#6B7280] truncate">{currentUser?.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-3 py-2.5 border-b border-[#E2DDD5]/50">
                    <p className="text-xs text-[#9CA3AF] mb-2 px-1" style={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "10px" }}>Switch Role (Demo)</p>
                    <div className="flex gap-1.5">
                      {["Buyer", "Seller", "Admin"].map((r) => <button
    key={r}
    onClick={() => handleRoleSwitch(r)}
    className={`flex-1 py-1.5 rounded-lg text-xs transition-all duration-200 ${currentUser?.role === r ? "bg-gradient-to-br from-[#2F6B3F] to-[#3a834d] text-white shadow-glow" : "glass text-[#6B7280] hover:text-[#1F2937] hover:shadow-soft"}`}
    style={{ fontWeight: 600 }}
  >
                          {r}
                        </button>)}
                    </div>
                  </div>

                  <div className="py-1">
                    {[
    { icon: User, label: "Profile & Privacy", to: "/profile" },
    { icon: Settings, label: "Account Settings", to: "/profile" },
    { icon: Shield, label: "Security (2FA)", to: "/profile" }
  ].map((item) => <Link
    key={item.label}
    to={item.to}
    onClick={() => setProfileOpen(false)}
    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#1F2937] hover:bg-white/60 transition-all duration-200"
  >
                        <item.icon size={15} className="text-[#6B7280]" />
                        {item.label}
                      </Link>)}
                  </div>

                  <div className="border-t border-[#E2DDD5]/50 py-1">
                    <button
    onClick={handleLogout}
    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#D64545] hover:bg-red-50/80 transition-all duration-200"
  >
                      <LogOut size={15} />
                      Sign Out
                    </button>
                  </div>
                </motion.div>}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {
    /* Mobile Search Expanded */
  }
      <AnimatePresence>
        {searchOpen && <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: "auto", opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    className="md:hidden glass-strong border-b border-white/30 overflow-hidden"
  >
            <div className="px-3 py-2">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                <input
    ref={searchRef}
    type="text"
    placeholder="Search livestock, sellers..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full pl-9 pr-3 py-2.5 rounded-xl input-glass text-sm text-[#1F2937] placeholder:text-[#9CA3AF] transition-all duration-300"
  />
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </header>;
}
export {
  TopNav
};
