import { useState } from 'react';
import { useLocation } from 'react-router';
import { motion } from 'motion/react';
import {
  BarChart2, Users, ClipboardList, AlertTriangle, FileText,
  ShieldCheck, CheckCircle2, XCircle, Eye, Ban, RefreshCw,
  TrendingUp, Activity, Clock
} from 'lucide-react';
import {
  mockUsers, mockListings, mockReports, mockAuditLogs,
  ReportStatus
} from '../data/mockData';
import { StatusBadge } from '../components/ui/StatusBadge';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'sonner';

type AdminTab = 'overview' | 'listings' | 'users' | 'reports' | 'audit';

const REPORT_STATUS_COLORS: Record<ReportStatus, string> = {
  Pending: 'bg-amber-100 text-amber-800',
  Reviewed: 'bg-blue-100 text-blue-800',
  Resolved: 'bg-green-100 text-green-800',
};

const weeklyData = [
  { day: 'Mon', listings: 5, users: 3, reports: 1 },
  { day: 'Tue', listings: 8, users: 5, reports: 2 },
  { day: 'Wed', listings: 6, users: 2, reports: 0 },
  { day: 'Thu', listings: 12, users: 7, reports: 3 },
  { day: 'Fri', listings: 9, users: 4, reports: 1 },
  { day: 'Sat', listings: 15, users: 8, reports: 2 },
  { day: 'Sun', listings: 7, users: 3, reports: 1 },
];

const pieData = [
  { name: 'Cattle', value: 35, color: '#2F6B3F' },
  { name: 'Goat', value: 25, color: '#6FAF5F' },
  { name: 'Chicken', value: 20, color: '#C68A3A' },
  { name: 'Pig', value: 12, color: '#4A90D9' },
  { name: 'Other', value: 8, color: '#9CA3AF' },
];

export default function AdminPage() {
  const location = useLocation();
  const getInitialTab = (): AdminTab => {
    if (location.pathname.includes('/listings')) return 'listings';
    if (location.pathname.includes('/users')) return 'users';
    if (location.pathname.includes('/reports')) return 'reports';
    if (location.pathname.includes('/audit') || location.pathname.includes('/security')) return 'audit';
    return 'overview';
  };
  const [activeTab, setActiveTab] = useState<AdminTab>(getInitialTab());
  const [listingStatusFilter, setListingStatusFilter] = useState('');
  const [userStatusFilter, setUserStatusFilter] = useState('');
  const [reportStatusFilter, setReportStatusFilter] = useState('');

  const formatDate = (d: string) => {
    try { return format(new Date(d), 'MMM d, yyyy'); } catch { return d; }
  };
  const formatDateTime = (d: string) => {
    try { return format(new Date(d), 'MMM d, HH:mm'); } catch { return d; }
  };

  const tabs: { id: AdminTab; label: string; icon: React.ElementType; count?: number }[] = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'listings', label: 'Listings', icon: ClipboardList, count: mockListings.length },
    { id: 'users', label: 'Users', icon: Users, count: mockUsers.length },
    { id: 'reports', label: 'Reports', icon: AlertTriangle, count: mockReports.filter((r) => r.status === 'Pending').length },
    { id: 'audit', label: 'Audit Logs', icon: FileText },
  ];

  const filteredListings = listingStatusFilter
    ? mockListings.filter((l) => l.status === listingStatusFilter)
    : mockListings;

  const filteredUsers = userStatusFilter
    ? mockUsers.filter((u) => u.status === userStatusFilter)
    : mockUsers;

  const filteredReports = reportStatusFilter
    ? mockReports.filter((r) => r.status === reportStatusFilter)
    : mockReports;

  return (
    <div>
      {/* Admin Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#2F6B3F]/10 flex items-center justify-center">
            <ShieldCheck size={22} className="text-[#2F6B3F]" />
          </div>
          <div>
            <h1 className="text-[#1F2937]" style={{ fontWeight: 800, fontSize: '1.3rem' }}>Admin Panel</h1>
            <p className="text-sm text-[#6B7280]">Least-privilege access · All actions are audited</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#2F6B3F]/10 rounded-xl border border-[#2F6B3F]/20">
          <Activity size={14} className="text-[#2F6B3F]" />
          <span className="text-xs text-[#2F6B3F]" style={{ fontWeight: 600 }}>System Operational</span>
        </div>
      </div>

      {/* Tab Nav - Rounded pills */}
      <div className="overflow-x-auto scrollbar-hide -mx-1 px-1 mb-6">
        <div className="flex gap-1.5 bg-white rounded-2xl border border-[#E2DDD5] p-1.5 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition-all duration-150 ${
                activeTab === tab.id
                  ? 'bg-[#2F6B3F] text-white shadow-sm'
                  : 'text-[#6B7280] hover:bg-[#F6F4EE] hover:text-[#1F2937]'
              }`}
            >
              <tab.icon size={15} />
              <span style={{ fontWeight: activeTab === tab.id ? 600 : 400 }}>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-1.5 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-[#E2DDD5] text-[#6B7280]'}`} style={{ fontWeight: 600, fontSize: '10px' }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>

        {/* -- Overview -- */}
        {activeTab === 'overview' && (
          <div className="space-y-5">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Users', value: mockUsers.length, icon: Users, color: '#4A90D9', bg: '#EDF4FD', change: '+12 this week' },
                { label: 'Active Listings', value: mockListings.filter((l) => l.status === 'Available').length, icon: ClipboardList, color: '#2F6B3F', bg: '#F0F7F2', change: '+5 today' },
                { label: 'Pending Reports', value: mockReports.filter((r) => r.status === 'Pending').length, icon: AlertTriangle, color: '#C68A3A', bg: '#FEF7EC', change: 'Needs review' },
                { label: 'Total Listings', value: mockListings.length, icon: TrendingUp, color: '#2F6B3F', bg: '#F0F7F2', change: 'All time' },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-2xl border border-[#E2DDD5] p-5 card-hover stat-card"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                      <s.icon size={17} style={{ color: s.color }} />
                    </div>
                  </div>
                  <p className="text-[#1F2937] mb-0.5" style={{ fontWeight: 800, fontSize: '1.6rem', lineHeight: 1 }}>{s.value}</p>
                  <p className="text-xs text-[#6B7280]">{s.label}</p>
                  <p className="text-[10px] text-[#9CA3AF] mt-1">{s.change}</p>
                </motion.div>
              ))}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2DDD5] p-5 shadow-sm">
                <h3 className="text-[#1F2937] mb-4" style={{ fontWeight: 600 }}>Weekly Activity</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE8" vertical={false} />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #E2DDD5', borderRadius: 8, fontSize: 11 }} cursor={{ fill: '#F6F4EE' }} />
                    <Bar dataKey="listings" fill="#2F6B3F" radius={[3,3,0,0]} name="New Listings" />
                    <Bar dataKey="users" fill="#6FAF5F" radius={[3,3,0,0]} name="New Users" />
                    <Bar dataKey="reports" fill="#C68A3A" radius={[3,3,0,0]} name="Reports" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-2xl border border-[#E2DDD5] p-5 shadow-sm">
                <h3 className="text-[#1F2937] mb-4" style={{ fontWeight: 600 }}>Listings by Type</h3>
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={3}>
                      {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: 11, background: '#fff', border: '1px solid #E2DDD5', borderRadius: 8 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-1.5 mt-2">
                  {pieData.map((d) => (
                    <div key={d.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                        <span className="text-[#6B7280]">{d.name}</span>
                      </div>
                      <span className="text-[#1F2937]" style={{ fontWeight: 600 }}>{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pending Reports quick view */}
            <div className="bg-white rounded-2xl border border-[#E2DDD5] p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[#1F2937]" style={{ fontWeight: 600 }}>Pending Reports</h3>
                <button onClick={() => setActiveTab('reports')} className="text-xs text-[#2F6B3F] hover:underline" style={{ fontWeight: 500 }}>View all</button>
              </div>
              {mockReports.filter((r) => r.status === 'Pending').map((report) => (
                <div key={report.id} className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200 mb-2 hover:bg-amber-100/80 transition-colors duration-150">
                  <AlertTriangle size={15} className="text-amber-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#1F2937]" style={{ fontWeight: 500 }}>{report.targetName}</p>
                    <p className="text-xs text-[#6B7280]">{report.reason} · by {report.reporterName}</p>
                  </div>
                  <button onClick={() => toast.success('Report marked as reviewed.')} className="px-3 py-1.5 bg-amber-600 text-white rounded-lg text-xs hover:bg-amber-700 transition-all duration-150 active:scale-95" style={{ fontWeight: 600 }}>
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -- Listings -- */}
        {activeTab === 'listings' && (
          <div className="bg-white rounded-2xl border border-[#E2DDD5] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#1F2937]" style={{ fontWeight: 600 }}>All Listings</h3>
              <div className="flex gap-1.5">
                {(['', 'Available', 'Reserved', 'Sold', 'Removed'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setListingStatusFilter(s)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs transition-all duration-150 ${listingStatusFilter === s ? 'bg-[#2F6B3F] text-white shadow-sm' : 'text-[#6B7280] hover:bg-[#F6F4EE]'}`}
                    style={{ fontWeight: 500 }}
                  >
                    {s || 'All'}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-[#6B7280] border-b border-[#F0EDE8]" style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th className="text-left pb-3 pr-4">Listing</th>
                    <th className="text-left pb-3 pr-4">Seller</th>
                    <th className="text-left pb-3 pr-4">Price</th>
                    <th className="text-left pb-3 pr-4">Status</th>
                    <th className="text-left pb-3 pr-4">Posted</th>
                    <th className="text-left pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F6F4EE]">
                  {filteredListings.map((l) => (
                    <tr key={l.id} className="table-row-hover">
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-2.5">
                          <img src={l.photo} alt="" className="w-9 h-9 rounded-lg object-cover border border-[#E2DDD5] flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm text-[#1F2937] truncate max-w-40" style={{ fontWeight: 500 }}>{l.title}</p>
                            <p className="text-xs text-[#6B7280]">{l.type} · {l.head} heads</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 pr-4 text-sm text-[#6B7280]">
                        {l.sellerName}
                        {l.sellerVerified && <ShieldCheck size={11} className="inline ml-1 text-[#2F6B3F]" />}
                      </td>
                      <td className="py-3.5 pr-4 text-sm text-[#C68A3A]" style={{ fontWeight: 600 }}>
                        ₱{l.price.toLocaleString()}
                      </td>
                      <td className="py-3.5 pr-4"><StatusBadge status={l.status} size="sm" /></td>
                      <td className="py-3.5 pr-4 text-xs text-[#6B7280]">{formatDate(l.createdAt)}</td>
                      <td className="py-3.5">
                        <div className="flex items-center gap-1">
                          <button onClick={() => toast.success('Listing approved.')} className="p-1.5 rounded-lg text-[#2F6B3F] hover:bg-[#F0F7F2] transition-all duration-150 active:scale-90" title="Approve">
                            <CheckCircle2 size={14} />
                          </button>
                          <button onClick={() => toast.success('Listing removed.')} className="p-1.5 rounded-lg text-[#D64545] hover:bg-red-50 transition-all duration-150 active:scale-90" title="Remove">
                            <XCircle size={14} />
                          </button>
                          <button className="p-1.5 rounded-lg text-[#6B7280] hover:bg-[#F6F4EE] transition-all duration-150 active:scale-90" title="View">
                            <Eye size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* -- Users -- */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl border border-[#E2DDD5] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#1F2937]" style={{ fontWeight: 600 }}>User Management</h3>
              <div className="flex gap-1.5">
                {['', 'Active', 'Suspended', 'Pending'].map((s) => (
                  <button key={s} onClick={() => setUserStatusFilter(s)} className={`px-2.5 py-1.5 rounded-lg text-xs transition-all duration-150 ${userStatusFilter === s ? 'bg-[#2F6B3F] text-white shadow-sm' : 'text-[#6B7280] hover:bg-[#F6F4EE]'}`} style={{ fontWeight: 500 }}>
                    {s || 'All'}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-[#6B7280] border-b border-[#F0EDE8]" style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th className="text-left pb-3 pr-4">User</th>
                    <th className="text-left pb-3 pr-4">Role</th>
                    <th className="text-left pb-3 pr-4">Joined</th>
                    <th className="text-left pb-3 pr-4">Status</th>
                    <th className="text-left pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F6F4EE]">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="table-row-hover">
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-2.5">
                          <img src={u.avatar} alt="" className="w-9 h-9 rounded-full object-cover border border-[#E2DDD5] flex-shrink-0" />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="text-sm text-[#1F2937]" style={{ fontWeight: 500 }}>{u.name}</p>
                              {u.verified && <ShieldCheck size={11} className="text-[#2F6B3F]" />}
                            </div>
                            <p className="text-xs text-[#6B7280]">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 pr-4">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          u.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                          u.role === 'Seller' ? 'bg-[#F0F7F2] text-[#2F6B3F]' :
                          'bg-blue-100 text-blue-800'
                        }`} style={{ fontWeight: 600 }}>{u.role}</span>
                      </td>
                      <td className="py-3.5 pr-4 text-xs text-[#6B7280]">{formatDate(u.joinDate)}</td>
                      <td className="py-3.5 pr-4">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          u.status === 'Active' ? 'bg-green-100 text-green-800' :
                          u.status === 'Suspended' ? 'bg-red-100 text-red-800' :
                          'bg-amber-100 text-amber-800'
                        }`} style={{ fontWeight: 600 }}>{u.status}</span>
                      </td>
                      <td className="py-3.5">
                        <div className="flex items-center gap-1">
                          {u.status !== 'Suspended' ? (
                            <button onClick={() => toast.success(`${u.name} suspended.`)} className="p-1.5 rounded-lg text-[#D64545] hover:bg-red-50 transition-all duration-150 active:scale-90" title="Suspend">
                              <Ban size={14} />
                            </button>
                          ) : (
                            <button onClick={() => toast.success(`${u.name} reactivated.`)} className="p-1.5 rounded-lg text-[#2F6B3F] hover:bg-[#F0F7F2] transition-all duration-150 active:scale-90" title="Reactivate">
                              <RefreshCw size={14} />
                            </button>
                          )}
                          <button className="p-1.5 rounded-lg text-[#6B7280] hover:bg-[#F6F4EE] transition-all duration-150 active:scale-90" title="View">
                            <Eye size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* -- Reports -- */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-2xl border border-[#E2DDD5] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#1F2937]" style={{ fontWeight: 600 }}>Reports</h3>
              <div className="flex gap-1.5">
                {(['', 'Pending', 'Reviewed', 'Resolved'] as const).map((s) => (
                  <button key={s} onClick={() => setReportStatusFilter(s)} className={`px-2.5 py-1.5 rounded-lg text-xs transition-all duration-150 ${reportStatusFilter === s ? 'bg-[#2F6B3F] text-white shadow-sm' : 'text-[#6B7280] hover:bg-[#F6F4EE]'}`} style={{ fontWeight: 500 }}>
                    {s || 'All'}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {filteredReports.map((r) => (
                <div key={r.id} className="p-4 rounded-xl border border-[#E2DDD5] hover:border-[#2F6B3F]/30 hover:shadow-sm transition-all duration-150">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${REPORT_STATUS_COLORS[r.status]}`} style={{ fontWeight: 600 }}>{r.status}</span>
                        <span className="text-xs text-[#6B7280] bg-[#F0EDE8] px-2 py-0.5 rounded-full capitalize">{r.targetType}</span>
                      </div>
                      <p className="text-sm text-[#1F2937]" style={{ fontWeight: 600 }}>
                        {r.reason} — {r.targetName}
                      </p>
                      <p className="text-xs text-[#6B7280] mt-0.5">{r.details}</p>
                      <p className="text-xs text-[#9CA3AF] mt-1">Reported by {r.reporterName} · {formatDate(r.date)}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {r.status === 'Pending' && (
                        <>
                          <button onClick={() => toast.success('Report reviewed.')} className="px-3 py-1.5 bg-[#2F6B3F] text-white rounded-lg text-xs hover:bg-[#3a834d] transition-all duration-150 active:scale-95" style={{ fontWeight: 600 }}>
                            Review
                          </button>
                          <button onClick={() => toast.success('Report resolved.')} className="px-3 py-1.5 border border-[#E2DDD5] text-[#6B7280] rounded-lg text-xs hover:bg-[#F6F4EE] transition-all duration-150 active:scale-95">
                            Resolve
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -- Audit Logs -- */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-2xl border border-[#E2DDD5] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[#1F2937]" style={{ fontWeight: 600 }}>Audit Logs</h3>
                <p className="text-xs text-[#6B7280] mt-0.5">All critical actions are logged with IP address and timestamp.</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl">
                <Clock size={13} className="text-amber-600" />
                <span className="text-xs text-amber-800" style={{ fontWeight: 500 }}>Retained for 1 year</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-[#6B7280] border-b border-[#F0EDE8]" style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th className="text-left pb-3 pr-4">User</th>
                    <th className="text-left pb-3 pr-4">Action</th>
                    <th className="text-left pb-3 pr-4">Details</th>
                    <th className="text-left pb-3 pr-4">IP Address</th>
                    <th className="text-left pb-3 pr-4">Timestamp</th>
                    <th className="text-left pb-3">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F6F4EE]">
                  {mockAuditLogs.map((log) => (
                    <tr key={log.id} className="table-row-hover">
                      <td className="py-3.5 pr-4">
                        <p className="text-sm text-[#1F2937]" style={{ fontWeight: 500 }}>{log.userName}</p>
                        <p className="text-xs text-[#6B7280]">{log.userRole}</p>
                      </td>
                      <td className="py-3.5 pr-4">
                        <code className="text-xs bg-[#F0EDE8] text-[#1F2937] px-1.5 py-0.5 rounded font-mono">{log.action}</code>
                      </td>
                      <td className="py-3.5 pr-4 text-xs text-[#6B7280] max-w-48 truncate">{log.details}</td>
                      <td className="py-3.5 pr-4">
                        <code className="text-xs text-[#6B7280] font-mono">{log.ip}</code>
                      </td>
                      <td className="py-3.5 pr-4 text-xs text-[#6B7280]">{formatDateTime(log.timestamp)}</td>
                      <td className="py-3.5">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${log.result === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`} style={{ fontWeight: 600 }}>
                          {log.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
