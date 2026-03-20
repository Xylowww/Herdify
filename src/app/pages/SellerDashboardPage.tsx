import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  TrendingUp, Package, MessageSquare, DollarSign,
  Plus, Eye, Edit2, Trash2, AlertTriangle, CheckCircle2
} from 'lucide-react';
import { mockListings, mockTransactions, mockConversations } from '../data/mockData';
import { useAppStore } from '../store/useAppStore';
import { StatusBadge } from '../components/ui/StatusBadge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { month: 'Jun', views: 120, inquiries: 14 },
  { month: 'Jul', views: 180, inquiries: 22 },
  { month: 'Aug', views: 150, inquiries: 18 },
  { month: 'Sep', views: 220, inquiries: 30 },
  { month: 'Oct', views: 280, inquiries: 35 },
  { month: 'Nov', views: 310, inquiries: 42 },
];

export default function SellerDashboardPage() {
  const { currentUser } = useAppStore();
  const myListings = mockListings.filter((l) => l.sellerId === currentUser?.id);
  const myTransactions = mockTransactions.filter((t) => t.sellerId === currentUser?.id);
  const myConversations = mockConversations.filter((c) => c.sellerId === currentUser?.id);
  const unreadCount = myConversations.reduce((sum, c) => sum + c.unread, 0);
  const totalRevenue = myTransactions.filter((t) => t.status === 'Completed').reduce((s, t) => s + t.amount, 0);

  const formatPrice = (n: number) =>
    new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(n);

  const stats = [
    { icon: Package, label: 'Active Listings', value: myListings.filter((l) => l.status === 'Available').length, color: '#2F6B3F', bg: '#F0F7F2' },
    { icon: MessageSquare, label: 'Unread Inquiries', value: unreadCount, color: '#C68A3A', bg: '#FEF7EC' },
    { icon: TrendingUp, label: 'Total Views', value: myListings.reduce((s, l) => s + l.views, 0), color: '#4A90D9', bg: '#EDF4FD' },
    { icon: DollarSign, label: 'Revenue (Est.)', value: formatPrice(totalRevenue), color: '#2F6B3F', bg: '#F0F7F2', isText: true },
  ];

  return (
    <div>
      {/* Header Banner */}
      <div className="page-banner rounded-2xl p-6 sm:p-8 mb-6 shadow-elevated">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={currentUser?.avatar} alt="" className="w-14 h-14 rounded-2xl object-cover border-2 border-white/30 shadow-lg hidden sm:block" />
            <div>
              <h1 className="text-white mb-1 drop-shadow-sm" style={{ fontWeight: 800, fontSize: '1.4rem' }}>
                Welcome back, {currentUser?.name?.split(' ')[0]}
              </h1>
              <p className="text-white/75 text-sm">Here's an overview of your seller activity</p>
            </div>
          </div>
          <Link
            to="/seller/listings/create"
            className="flex items-center gap-2 px-5 py-2.5 btn-modern glass text-[#2F6B3F] rounded-xl text-sm shadow-soft"
            style={{ fontWeight: 700 }}
          >
            <Plus size={16} />
            Post Listing
          </Link>
        </div>
      </div>

      {/* Verification Banner */}
      {!currentUser?.verified && (
        <div className="flex items-center gap-3 p-4 glass-card rounded-xl mb-6" style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(245,158,11,0.05))' }}>
          <AlertTriangle size={18} className="text-amber-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-amber-800" style={{ fontWeight: 600 }}>Complete your seller verification</p>
            <p className="text-xs text-amber-700">Verified sellers get more trust and inquiries. Submit your government ID to get verified.</p>
          </div>
          <button className="px-3 py-1.5 btn-modern bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg text-xs" style={{ fontWeight: 600 }}>
            Verify Now
          </button>
        </div>
      )}

      {currentUser?.verified && (
        <div className="flex items-center gap-2 p-3.5 glass-card rounded-xl mb-6" style={{ background: 'linear-gradient(135deg, rgba(47,107,63,0.08), rgba(111,175,95,0.05))' }}>
          <CheckCircle2 size={16} className="text-[#2F6B3F]" />
          <p className="text-sm text-[#2F6B3F]" style={{ fontWeight: 500 }}>Your account is verified. Buyers can trust your listings.</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card-glass stat-card p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-soft" style={{ background: s.bg }}>
                <s.icon size={18} style={{ color: s.color }} />
              </div>
            </div>
            <p className="text-[#1F2937] mb-0.5" style={{ fontWeight: 700, fontSize: s.isText ? '1.1rem' : '1.6rem', lineHeight: 1 }}>
              {s.value}
            </p>
            <p className="text-xs text-[#6B7280]">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <h3 className="text-[#1F2937] mb-4" style={{ fontWeight: 600 }}>Listing Performance (6 months)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE8" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', border: '1px solid #E2DDD5', borderRadius: 12, fontSize: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
                cursor={{ fill: 'rgba(246,244,238,0.5)' }}
              />
              <Bar dataKey="views" fill="#2F6B3F" radius={[6, 6, 0, 0]} name="Views" />
              <Bar dataKey="inquiries" fill="#C68A3A" radius={[6, 6, 0, 0]} name="Inquiries" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Inquiries */}
        <div className="glass-card rounded-2xl p-6 min-h-[280px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#1F2937]" style={{ fontWeight: 600 }}>Recent Inquiries</h3>
            <Link to="/messages" className="text-xs text-[#2F6B3F] hover:underline" style={{ fontWeight: 500 }}>View all</Link>
          </div>
          <div className="space-y-3">
            {myConversations.length === 0 ? (
              <p className="text-sm text-[#6B7280] text-center py-4">No inquiries yet</p>
            ) : (
              myConversations.map((c) => (
                <Link key={c.id} to={`/messages/${c.id}`} className="flex items-center gap-3 p-2.5 rounded-xl glass hover:shadow-soft transition-all duration-300">
                  <img src={c.buyerAvatar} alt={c.buyerName} className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#1F2937] truncate" style={{ fontWeight: 500 }}>{c.buyerName}</p>
                    <p className="text-xs text-[#6B7280] truncate">{c.lastMessage}</p>
                  </div>
                  {c.unread > 0 && (
                    <span className="w-5 h-5 bg-gradient-to-br from-[#2F6B3F] to-[#3a834d] text-white rounded-full flex items-center justify-center text-xs shadow-glow" style={{ fontWeight: 600 }}>
                      {c.unread}
                    </span>
                  )}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* My Listings Table */}
      <div className="mt-6 glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1F2937]" style={{ fontWeight: 600 }}>My Listings</h3>
          <Link to="/seller/listings" className="text-xs text-[#2F6B3F] hover:underline" style={{ fontWeight: 500 }}>Manage all</Link>
        </div>
        {myListings.length === 0 ? (
          <div className="text-center py-10">
            <Package size={32} className="text-[#C8C3B8] mx-auto mb-3" />
            <p className="text-sm text-[#6B7280]">No listings yet.</p>
            <Link to="/seller/listings/create" className="text-sm text-[#2F6B3F] hover:underline mt-1 inline-block" style={{ fontWeight: 600 }}>
              Post your first listing
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-[#6B7280] border-b border-[#E2DDD5]/50" style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th className="text-left pb-3 pr-4">Listing</th>
                  <th className="text-left pb-3 pr-4">Type</th>
                  <th className="text-left pb-3 pr-4">Price</th>
                  <th className="text-left pb-3 pr-4">Status</th>
                  <th className="text-left pb-3 pr-4">Views</th>
                  <th className="text-left pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2DDD5]/30">
                {myListings.map((listing) => (
                  <tr key={listing.id} className="group hover:bg-white/50 transition-colors duration-200">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <img src={listing.photo} alt="" className="w-10 h-10 rounded-xl object-cover border border-white shadow-soft flex-shrink-0 group-hover:shadow-elevated transition-shadow duration-300" />
                        <Link to={`/listings/${listing.id}`} className="text-sm text-[#1F2937] hover:text-[#2F6B3F] truncate max-w-40 transition-colors duration-200" style={{ fontWeight: 500 }}>
                          {listing.title}
                        </Link>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-sm text-[#6B7280]">{listing.type}</td>
                    <td className="py-3 pr-4 text-sm gradient-text" style={{ fontWeight: 600 }}>
                      {formatPrice(listing.price)}
                    </td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={listing.status} size="sm" />
                    </td>
                    <td className="py-3 pr-4">
                      <span className="flex items-center gap-1 text-sm text-[#6B7280]">
                        <Eye size={13} />
                        {listing.views}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1">
                        <Link
                          to={`/seller/listings/${listing.id}/edit`}
                          className="p-2 rounded-lg glass text-[#6B7280] hover:text-[#2F6B3F] hover:shadow-soft active:scale-95 transition-all duration-200"
                        >
                          <Edit2 size={14} />
                        </Link>
                        <button className="p-2 rounded-lg glass text-[#6B7280] hover:text-[#D64545] hover:shadow-soft active:scale-95 transition-all duration-200">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
