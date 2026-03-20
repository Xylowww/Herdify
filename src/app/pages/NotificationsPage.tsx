import { motion } from 'motion/react';
import { Bell, MessageSquare, Tag, CheckCircle2, AlertTriangle, Zap, CheckCheck } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Notification } from '../data/mockData';
import { formatDistanceToNow } from 'date-fns';

const NotifIcon = ({ type }: { type: Notification['type'] }) => {
  const map: Record<Notification['type'], { icon: React.ElementType; bg: string; color: string }> = {
    inquiry: { icon: MessageSquare, bg: 'linear-gradient(135deg, #F0F7F2, #E8F2EA)', color: '#2F6B3F' },
    message: { icon: MessageSquare, bg: 'linear-gradient(135deg, #EDF4FD, #E3EDFB)', color: '#4A90D9' },
    status_change: { icon: Tag, bg: 'linear-gradient(135deg, #FEF7EC, #FDEFD9)', color: '#C68A3A' },
    transaction: { icon: CheckCircle2, bg: 'linear-gradient(135deg, #F0F7F2, #E8F2EA)', color: '#2F6B3F' },
    report: { icon: AlertTriangle, bg: 'linear-gradient(135deg, #FEF2F2, #FDE8E8)', color: '#D64545' },
    system: { icon: Zap, bg: 'linear-gradient(135deg, #F0EDE8, #E8E5E0)', color: '#6B7280' },
  };
  const { icon: Icon, bg, color } = map[type];
  return (
    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft" style={{ background: bg }}>
      <Icon size={17} style={{ color }} />
    </div>
  );
};

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppStore();
  const unread = notifications.filter((n) => !n.read).length;

  const formatTime = (ts: string) => {
    try {
      return formatDistanceToNow(new Date(ts), { addSuffix: true });
    } catch {
      return '';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2F6B3F]/10 to-[#6FAF5F]/10 flex items-center justify-center shadow-soft">
            <Bell size={20} className="text-[#2F6B3F]" />
          </div>
          <div>
            <h1 className="text-[#1F2937]" style={{ fontWeight: 700, fontSize: '1.25rem' }}>Notifications</h1>
            <p className="text-sm text-[#6B7280]">
            {unread > 0 ? `${unread} unread notification${unread !== 1 ? 's' : ''}` : 'All caught up'}
            </p>
          </div>
        </div>
        {unread > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="flex items-center gap-1.5 text-sm text-[#2F6B3F] btn-glass px-3 py-2 rounded-xl"
            style={{ fontWeight: 500 }}
          >
            <CheckCheck size={15} />
            Mark all read
          </button>
        )}
      </div>

      {/* Notifications */}
      <div className="glass-card rounded-2xl overflow-hidden">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#F0F7F2] to-[#E8F2EA] rounded-full flex items-center justify-center mb-4 shadow-soft animate-float">
              <Bell size={26} className="text-[#2F6B3F]" />
            </div>
            <h3 className="text-[#1F2937] mb-1" style={{ fontWeight: 600 }}>No Notifications</h3>
            <p className="text-sm text-[#6B7280]">You're all caught up! Check back later.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#E2DDD5]/50">
            {notifications.map((notif, i) => (
              <motion.button
                key={notif.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => markNotificationRead(notif.id)}
                className={`w-full text-left flex items-start gap-3 px-5 py-4 hover:bg-white/50 transition-all duration-300 ${
                  !notif.read ? 'bg-gradient-to-r from-[#F0F7F2]/50 to-transparent border-l-3 border-l-[#2F6B3F]' : ''
                }`}
              >
                <NotifIcon type={notif.type} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm text-[#1F2937]" style={{ fontWeight: notif.read ? 400 : 600 }}>
                      {notif.title}
                    </p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-[#9CA3AF]">{formatTime(notif.timestamp)}</span>
                      {!notif.read && (
                        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#2F6B3F] to-[#3a834d] flex-shrink-0 shadow-glow" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-[#6B7280] mt-0.5" style={{ lineHeight: 1.5 }}>{notif.body}</p>
                  {notif.link && (
                    <span className="text-xs text-[#2F6B3F] mt-1.5 inline-block hover:underline" style={{ fontWeight: 500 }}>
                      View details →
                    </span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Notification Settings hint */}
      <div className="mt-5 px-5 py-4 glass-card rounded-xl flex items-center justify-between">
        <p className="text-sm text-[#6B7280]">Manage your notification preferences in Profile settings.</p>
        <a href="/profile" className="text-sm text-[#2F6B3F] hover:underline flex-shrink-0 ml-4" style={{ fontWeight: 500 }}>Settings</a>
      </div>
    </div>
  );
}
