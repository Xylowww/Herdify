import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { LIVESTOCK_TYPES } from '../../data/mockData';
import { useState } from 'react';

export function FilterPanel() {
  const { filters, setFilter, resetFilters } = useAppStore();
  const [expanded, setExpanded] = useState(false);

  const hasActiveFilters = Object.values(filters).some((v) => v !== '');

  return (
    <div className="bg-white rounded-2xl border border-[#E2DDD5] p-4 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
        <input
          type="text"
          placeholder="Search livestock..."
          value={filters.search}
          onChange={(e) => setFilter('search', e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E2DDD5] bg-[#F6F4EE] text-sm text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/20 focus:border-[#2F6B3F] focus:bg-white focus:shadow-sm transition-all duration-200"
        />
        {filters.search && (
          <button onClick={() => setFilter('search', '')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1F2937] transition-colors duration-150">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Quick filters row */}
      <div className="flex flex-wrap gap-2">
        {/* Type filter */}
        <select
          value={filters.type}
          onChange={(e) => setFilter('type', e.target.value)}
          className="flex-1 min-w-32 px-3 py-2 rounded-xl border border-[#E2DDD5] bg-white text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/20 focus:border-[#2F6B3F] cursor-pointer transition-all duration-200"
        >
          <option value="">All Types</option>
          {LIVESTOCK_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        {/* Status filter */}
        <select
          value={filters.status}
          onChange={(e) => setFilter('status', e.target.value)}
          className="flex-1 min-w-28 px-3 py-2 rounded-xl border border-[#E2DDD5] bg-white text-sm text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/20 focus:border-[#2F6B3F] cursor-pointer transition-all duration-200"
        >
          <option value="">All Status</option>
          <option value="Available">Available</option>
          <option value="Reserved">Reserved</option>
          <option value="Sold">Sold</option>
        </select>

        {/* Advanced toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm transition-all duration-200 active:scale-95 ${
            expanded ? 'border-[#2F6B3F] bg-[#2F6B3F] text-white' : 'border-[#E2DDD5] text-[#6B7280] hover:border-[#2F6B3F]/40 hover:text-[#2F6B3F]'
          }`}
        >
          <SlidersHorizontal size={14} />
          Filters
        </button>
      </div>

      {/* Advanced filters */}
      {expanded && (
        <div className="space-y-3 pt-2 border-t border-[#F0EDE8]">
          {/* Price range */}
          <div>
            <label className="block text-xs text-[#6B7280] mb-1.5" style={{ fontWeight: 600 }}>Price Range (per head)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => setFilter('minPrice', e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-[#E2DDD5] bg-[#F6F4EE] text-sm text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/20 focus:border-[#2F6B3F] focus:bg-white transition-all duration-200"
              />
              <span className="text-[#6B7280] text-sm">–</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => setFilter('maxPrice', e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-[#E2DDD5] bg-[#F6F4EE] text-sm text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/20 focus:border-[#2F6B3F] focus:bg-white transition-all duration-200"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs text-[#6B7280] mb-1.5" style={{ fontWeight: 600 }}>Location</label>
            <input
              type="text"
              placeholder="City, Province..."
              value={filters.location}
              onChange={(e) => setFilter('location', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#E2DDD5] bg-[#F6F4EE] text-sm text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/20 focus:border-[#2F6B3F] focus:bg-white transition-all duration-200"
            />
          </div>
        </div>
      )}

      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="flex items-center gap-1.5 text-xs text-[#D64545] hover:text-[#b83838] transition-colors duration-150 active:scale-95"
        >
          <X size={12} />
          Clear all filters
        </button>
      )}
    </div>
  );
}
