import { useState } from 'react';
import { motion } from 'motion/react';
import { History, TrendingUp, DollarSign, Package } from 'lucide-react';
import { mockTransactions, TRANSACTION_STATUS_COLORS, TransactionStatus } from '../data/mockData';
import { useAppStore } from '../store/useAppStore';
import { format } from 'date-fns';

const typeIcons: Record<string, string> = {
  Cattle: 'C', Goat: 'G', Sheep: 'S', Pig: 'P', Chicken: 'CH', Carabao: 'CB', Other: 'O',
};

export default function TransactionsPage() {
  const { currentUser } = useAppStore();
  const [statusFilter, setStatusFilter] = useState<string>('');

  const myTransactions = mockTransactions.filter((t) =>
    t.sellerId === currentUser?.id || t.buyerId === currentUser?.id
  );

  const filtered = statusFilter
    ? myTransactions.filter((t) => t.status === statusFilter)
    : myTransactions;

  const totalCompleted = myTransactions
    .filter((t) => t.status === 'Completed')
    .reduce((s, t) => s + t.amount, 0);

  const formatPrice = (n: number) =>
    new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(n);

  const formatDate = (d: string) => {
    try { return format(new Date(d), 'MMM d, yyyy'); } catch { return d; }
  };

  const stats = [
    { icon: History, label: 'Total Trades', value: myTransactions.length, color: '#2F6B3F', bg: '#F0F7F2' },
    { icon: TrendingUp, label: 'Completed', value: myTransactions.filter((t) => t.status === 'Completed').length, color: '#2F6B3F', bg: '#F0F7F2' },
    { icon: Package, label: 'Pending', value: myTransactions.filter((t) => t.status === 'Pending').length, color: '#C68A3A', bg: '#FEF7EC' },
    { icon: DollarSign, label: 'Total Value', value: formatPrice(totalCompleted), color: '#2F6B3F', bg: '#F0F7F2', isText: true },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-[#2F6B3F]/10 flex items-center justify-center">
            <History size={20} className="text-[#2F6B3F]" />
          </div>
          <div>
            <h1 className="text-[#1F2937]" style={{ fontWeight: 700, fontSize: '1.25rem' }}>Transactions</h1>
            <p className="text-sm text-[#6B7280]">Your complete trade history</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white rounded-2xl border border-[#E2DDD5] p-4 stat-card card-hover"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <p className="text-[#1F2937] mb-0.5" style={{ fontWeight: 700, fontSize: s.isText ? '1rem' : '1.5rem', lineHeight: 1 }}>
              {s.value}
            </p>
            <p className="text-xs text-[#6B7280]">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filter + Table */}
      <div className="bg-white rounded-2xl border border-[#E2DDD5] p-5 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[#1F2937]" style={{ fontWeight: 600 }}>Transaction History</h3>
          <div className="flex gap-1.5">
            {(['', 'Completed', 'Pending', 'Cancelled'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all duration-150 ${
                  statusFilter === status
                    ? 'bg-[#2F6B3F] text-white shadow-sm'
                    : 'text-[#6B7280] hover:bg-[#F6F4EE]'
                }`}
                style={{ fontWeight: 500 }}
              >
                {status || 'All'}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <History size={32} className="text-[#C8C3B8] mx-auto mb-3" />
            <p className="text-sm text-[#6B7280]">No transactions found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-[#6B7280] border-b border-[#F0EDE8]" style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th className="text-left pb-3 pr-4">Transaction</th>
                  <th className="text-left pb-3 pr-4">Animal</th>
                  <th className="text-left pb-3 pr-4">Counterpart</th>
                  <th className="text-left pb-3 pr-4">Amount</th>
                  <th className="text-left pb-3 pr-4">Date</th>
                  <th className="text-left pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F6F4EE]">
                {filtered.map((txn, i) => {
                  const isSeller = txn.sellerId === currentUser?.id;
                  const counterpart = isSeller ? txn.buyerName : txn.sellerName;
                  const role = isSeller ? 'Sold to' : 'Bought from';
                  return (
                    <motion.tr
                      key={txn.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03, duration: 0.25 }}
                      className="hover:bg-[#F6F4EE]/50 transition-colors duration-150"
                    >
                      <td className="py-3.5 pr-4">
                        <p className="text-sm text-[#1F2937]" style={{ fontWeight: 500 }}>{txn.id}</p>
                        <p className="text-xs text-[#6B7280] mt-0.5 max-w-36 truncate">{txn.listingTitle}</p>
                      </td>
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-[#F0F7F2] text-[#2F6B3F] flex items-center justify-center text-xs flex-shrink-0" style={{ fontWeight: 700 }}>
                            {typeIcons[txn.listingType] || 'L'}
                          </span>
                          <div>
                            <p className="text-sm text-[#1F2937]">{txn.listingType}</p>
                            <p className="text-xs text-[#6B7280]">{txn.head} heads</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 pr-4">
                        <p className="text-xs text-[#6B7280]">{role}</p>
                        <p className="text-sm text-[#1F2937]" style={{ fontWeight: 500 }}>{counterpart}</p>
                      </td>
                      <td className="py-3.5 pr-4">
                        <p className="text-sm text-[#C68A3A]" style={{ fontWeight: 700 }}>{formatPrice(txn.amount)}</p>
                        <p className="text-xs text-[#6B7280]">{txn.head} x {formatPrice(txn.amount / txn.head)}</p>
                      </td>
                      <td className="py-3.5 pr-4 text-sm text-[#6B7280]">{formatDate(txn.date)}</td>
                      <td className="py-3.5">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs ${TRANSACTION_STATUS_COLORS[txn.status as TransactionStatus]}`} style={{ fontWeight: 600 }}>
                          {txn.status}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Retention Notice */}
      <div className="mt-5 p-3.5 bg-[#F6F4EE] rounded-xl border border-[#E2DDD5]">
        <p className="text-xs text-[#6B7280]" style={{ lineHeight: 1.5 }}>
          Transaction records are retained for 2 years per legal requirements. You may request deletion of non-legally-required data in your Privacy Settings.
        </p>
      </div>
    </div>
  );
}
