import {
  Home, MessageSquare, Bell, PlusSquare, User,
  LayoutDashboard, ClipboardList, History,
  BarChart2, AlertTriangle, Users
} from 'lucide-react';
import { NavLink } from 'react-router';
import { useAppStore } from '../../store/useAppStore';
import { motion } from 'motion/react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  to: string;
  badge?: number;
  end?: boolean;
  accent?: boolean;
}

export function BottomNav() {
  const { currentUser, notifications } = useAppStore();
  const unread = notifications.filter((n) => !n.read).length;
  const role = currentUser?.role;

  const buyerNav: NavItem[] = [
    { icon: Home, label: 'Home', to: '/marketplace', end: true },
    { icon: MessageSquare, label: 'Messages', to: '/messages' },
    { icon: Bell, label: 'Alerts', to: '/notifications', badge: unread },
    { icon: History, label: 'Trades', to: '/transactions' },
    { icon: User, label: 'Profile', to: '/profile' },
  ];

  const sellerNav: NavItem[] = [
    { icon: LayoutDashboard, label: 'Home', to: '/seller/dashboard', end: true },
    { icon: ClipboardList, label: 'Listings', to: '/seller/listings' },
    { icon: PlusSquare, label: 'Post', to: '/seller/listings/create', accent: true },
    { icon: MessageSquare, label: 'Messages', to: '/messages' },
    { icon: Bell, label: 'Alerts', to: '/notifications', badge: unread },
  ];

  const adminNav: NavItem[] = [
    { icon: BarChart2, label: 'Overview', to: '/admin', end: true },
    { icon: ClipboardList, label: 'Listings', to: '/admin/listings' },
    { icon: Users, label: 'Users', to: '/admin/users' },
    { icon: AlertTriangle, label: 'Reports', to: '/admin/reports' },
    { icon: Bell, label: 'Alerts', to: '/notifications', badge: unread },
  ];

  const navItems =
    role === 'Admin' ? adminNav :
    role === 'Seller' ? sellerNav :
    buyerNav;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-nav shadow-elevated">
      <div className="flex items-center justify-around h-14 px-1 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 active:scale-95 ${
                item.accent && !isActive
                  ? 'text-[#2F6B3F]'
                  : isActive
                  ? 'text-[#2F6B3F]'
                  : 'text-[#9CA3AF]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="bottomnav-indicator"
                    className="absolute top-0 left-3 right-3 h-[3px] bg-gradient-to-r from-[#2F6B3F] to-[#3a834d] rounded-b-full shadow-glow"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <div className="relative">
                  {item.accent && !isActive ? (
                    <div className="w-9 h-9 bg-gradient-to-br from-[#2F6B3F] to-[#3a834d] rounded-xl flex items-center justify-center -mt-1 shadow-glow">
                      <item.icon size={18} className="text-white" strokeWidth={2} />
                    </div>
                  ) : (
                    <item.icon
                      size={20}
                      strokeWidth={isActive ? 2.5 : 1.8}
                      className={`transition-all duration-300 ${isActive ? 'scale-110 drop-shadow-sm' : ''}`}
                    />
                  )}
                  {item.badge !== undefined && item.badge > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1.5 min-w-[16px] h-[16px] bg-gradient-to-br from-[#D64545] to-[#c23a3a] text-white rounded-full flex items-center justify-center px-0.5 shadow-sm"
                      style={{ fontSize: '9px', fontWeight: 700 }}
                    >
                      {item.badge > 9 ? '9+' : item.badge}
                    </motion.span>
                  )}
                </div>
                <span
                  className={`text-[10px] mt-0.5 transition-all duration-300 ${
                    isActive ? 'font-semibold' : 'font-normal'
                  }`}
                >
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
