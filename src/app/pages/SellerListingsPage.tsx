import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2, Eye, MessageSquare } from 'lucide-react';
import { mockListings, ListingStatus } from '../data/mockData';
import { useAppStore } from '../store/useAppStore';
import { StatusBadge } from '../components/ui/StatusBadge';
import { toast } from 'sonner';

export default function SellerListingsPage() {
  const { currentUser } = useAppStore();
  const [statusFilter, setStatusFilter] = useState<string>('');

  const myListings = mockListings.filter((l) => l.sellerId === currentUser?.id);
  const filtered = statusFilter ? myListings.filter((l) => l.status === statusFilter) : myListings;

  const formatPrice = (n: number) =>
    new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(n);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[#1F2937]" style={{ fontWeight: 700, fontSize: '1.25rem' }}>My Listings</h1>
          <p className="text-sm text-[#6B7280] mt-0.5">{myListings.length} listing{myListings.length !== 1 ? 's' : ''} total</p>
        </div>
        <Link
          to="/seller/listings/create"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#2F6B3F] text-white rounded-xl hover:bg-[#3a834d] transition-all duration-150 active:scale-95 text-sm shadow-sm"
          style={{ fontWeight: 600 }}
        >
          <Plus size={16} />
          New Listing
        </Link>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {(['', 'Available', 'Reserved', 'Sold', 'Removed'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-xl border text-sm whitespace-nowrap transition-all duration-150 flex-shrink-0 ${
              statusFilter === s
                ? 'bg-[#2F6B3F] text-white border-[#2F6B3F] shadow-sm'
                : 'border-[#E2DDD5] text-[#6B7280] hover:border-[#2F6B3F]/50 hover:text-[#2F6B3F]'
            }`}
            style={{ fontWeight: 500 }}
          >
            {s || 'All'}
            {s && (
              <span className="ml-1.5 text-xs opacity-75">
                ({myListings.filter((l) => l.status === s).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Listings Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#E2DDD5] shadow-sm empty-state">
          <div className="w-16 h-16 bg-[#F0F7F2] rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus size={28} className="text-[#2F6B3F]" />
          </div>
          <h3 className="text-[#1F2937] mb-1.5" style={{ fontWeight: 600 }}>No listings found</h3>
          <p className="text-sm text-[#6B7280] mb-5 max-w-xs mx-auto">
            {statusFilter ? `No ${statusFilter.toLowerCase()} listings at the moment.` : 'Start by creating your first listing to reach buyers.'}
          </p>
          <Link to="/seller/listings/create" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2F6B3F] text-white rounded-xl text-sm hover:bg-[#3a834d] transition-all duration-150 active:scale-95" style={{ fontWeight: 600 }}>
            <Plus size={15} />
            Create Listing
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((listing, i) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-[#E2DDD5] p-4 card-hover shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <img src={listing.photo} alt="" className="w-full sm:w-16 h-32 sm:h-16 rounded-xl object-cover border border-[#E2DDD5] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <StatusBadge status={listing.status} size="sm" />
                    <span className="text-xs text-[#6B7280]">{listing.type} · {listing.breed}</span>
                  </div>
                  <Link to={`/listings/${listing.id}`} className="text-sm text-[#1F2937] hover:text-[#2F6B3F] truncate block transition-colors duration-150" style={{ fontWeight: 600 }}>
                    {listing.title}
                  </Link>
                  <div className="flex items-center gap-3 sm:gap-4 mt-1.5 flex-wrap text-xs text-[#6B7280]">
                    <span className="text-[#C68A3A]" style={{ fontWeight: 700 }}>{formatPrice(listing.price)}/head</span>
                    <span>{listing.head} heads</span>
                    <span className="flex items-center gap-1"><Eye size={11} />{listing.views}</span>
                    <span className="flex items-center gap-1"><MessageSquare size={11} />{listing.inquiries}</span>
                  </div>
                </div>
                {/* Desktop: status changer + actions */}
                <div className="hidden sm:flex items-center gap-2">
                  <select
                    defaultValue={listing.status}
                    onChange={(e) => toast.success(`Status changed to ${e.target.value}`)}
                    className="px-2.5 py-1.5 rounded-lg border border-[#E2DDD5] text-xs text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/20 bg-white cursor-pointer transition-all duration-150"
                  >
                    {(['Available', 'Reserved', 'Sold', 'Removed'] as ListingStatus[]).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <Link
                    to={`/seller/listings/${listing.id}/edit`}
                    className="p-2 rounded-xl border border-[#E2DDD5] text-[#6B7280] hover:border-[#2F6B3F] hover:text-[#2F6B3F] transition-all duration-150 active:scale-95"
                  >
                    <Edit2 size={15} />
                  </Link>
                  <button
                    onClick={() => toast.success('Listing removed.')}
                    className="p-2 rounded-xl border border-[#E2DDD5] text-[#6B7280] hover:border-[#D64545] hover:text-[#D64545] transition-all duration-150 active:scale-95"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                {/* Mobile: status changer + actions */}
                <div className="flex sm:hidden items-center gap-2 mt-3 pt-3 border-t border-[#F0EDE8]">
                  <select
                    defaultValue={listing.status}
                    onChange={(e) => toast.success(`Status changed to ${e.target.value}`)}
                    className="flex-1 px-2.5 py-1.5 rounded-lg border border-[#E2DDD5] text-xs text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/20 bg-white cursor-pointer transition-all duration-150"
                  >
                    {(['Available', 'Reserved', 'Sold', 'Removed'] as ListingStatus[]).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <Link
                    to={`/seller/listings/${listing.id}/edit`}
                    className="p-2 rounded-xl border border-[#E2DDD5] text-[#6B7280] hover:border-[#2F6B3F] hover:text-[#2F6B3F] transition-all duration-150 active:scale-95"
                  >
                    <Edit2 size={15} />
                  </Link>
                  <button
                    onClick={() => toast.success('Listing removed.')}
                    className="p-2 rounded-xl border border-[#E2DDD5] text-[#6B7280] hover:border-[#D64545] hover:text-[#D64545] transition-all duration-150 active:scale-95"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
