import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Map, LayoutGrid, RefreshCw, TrendingUp, ShieldCheck, MapPin } from "lucide-react";
import { mockListings } from "../data/mockData";
import { useAppStore } from "../store/useAppStore";
import { ListingCard } from "../components/ui/ListingCard";
import { FilterPanel } from "../components/ui/FilterPanel";
import { ListingsMap } from "../components/ui/ListingsMap";
function MarketplacePage() {
  const { filters, mapView, setMapView } = useAppStore();
  const [selectedId, setSelectedId] = useState();
  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  const filtered = useMemo(() => {
    return mockListings.filter((l) => {
      if (filters.type && l.type !== filters.type) return false;
      if (filters.status && l.status !== filters.status) return false;
      if (filters.minPrice && l.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && l.price > Number(filters.maxPrice)) return false;
      if (filters.location && !l.location.approximate.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!l.title.toLowerCase().includes(q) && !l.breed.toLowerCase().includes(q) && !l.type.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [filters]);
  return <div>
      {
    /* Page Header with gradient banner */
  }
      <div className="page-banner rounded-[30px] p-6 sm:p-8 mb-8 shadow-elevated">
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-white/90 backdrop-blur-md" style={{ fontWeight: 700 }}>
              Live Marketplace
            </span>
            <h1 className="mt-4 text-white drop-shadow-sm" style={{ fontWeight: 800, fontSize: "clamp(1.65rem, 4vw, 2.5rem)", lineHeight: 1.05 }}>
              Find quality livestock from verified sellers near you
            </h1>
            <p className="mt-3 max-w-xl text-sm text-white/78 sm:text-[15px]" style={{ lineHeight: 1.7 }}>
              Browse trusted cattle, goats, poultry, and more with location-aware discovery, privacy-safe inquiries, and transparent pricing.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {[
    { icon: ShieldCheck, text: "Verified Sellers" },
    { icon: MapPin, text: "Location Privacy" },
    { icon: TrendingUp, text: "Price Transparency" }
  ].map((item) => <span key={item.text} className="inline-flex items-center gap-1.5 rounded-full border border-white/14 bg-white/10 px-3 py-1.5 text-xs text-white/88 backdrop-blur-md">
                  <item.icon size={12} />
                  {item.text}
                </span>)}
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <div className="rounded-2xl border border-white/16 bg-white/12 p-1.5 backdrop-blur-md shadow-soft">
              <div className="flex items-center gap-1">
                <button
    onClick={() => setMapView(false)}
    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm transition-all duration-300 active:scale-95 ${!mapView ? "bg-white text-[#214f30] shadow-soft" : "text-white/78 hover:text-white hover:bg-white/10"}`}
    style={{ fontWeight: 700 }}
  >
                  <LayoutGrid size={14} />
                  <span>Grid</span>
                </button>
                <button
    onClick={() => setMapView(true)}
    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm transition-all duration-300 active:scale-95 ${mapView ? "bg-white text-[#214f30] shadow-soft" : "text-white/78 hover:text-white hover:bg-white/10"}`}
    style={{ fontWeight: 700 }}
  >
                  <Map size={14} />
                  <span>Map</span>
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-white/16 bg-white/10 px-3 py-1.5 text-xs text-white/90 backdrop-blur-md" style={{ fontWeight: 700 }}>
                {filtered.length} listing{filtered.length !== 1 ? "s" : ""} available
              </span>
              <span className="inline-flex items-center rounded-full border border-white/16 bg-white/10 px-3 py-1.5 text-xs text-white/90 backdrop-blur-md" style={{ fontWeight: 700 }}>
                {activeFilterCount} active filter{activeFilterCount !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-6">
        {
    /* Filter Sidebar */
  }
        <div className="lg:w-72 xl:w-80 flex-shrink-0">
          <div className="sticky top-[70px] space-y-4">
            <FilterPanel />
            <div className="glass-card rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0">
                  <div className="w-7 h-7 bg-gradient-to-br from-[#2F6B3F]/10 to-[#6FAF5F]/10 rounded-lg flex items-center justify-center">
                    <ShieldCheck size={14} className="text-[#2F6B3F]" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F6B3F]" />
                    <p className="text-xs text-[#2F6B3F]" style={{ fontWeight: 700 }}>Location Privacy</p>
                  </div>
                  <p className="text-xs text-[#6B7280]" style={{ lineHeight: 1.6 }}>
                    Exact addresses are hidden until a seller approves your inquiry. Only approximate area is displayed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {
    /* Main content */
  }
        <div className="flex-1 min-w-0">
          {mapView ? <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="space-y-5"
  >
              <div className="rounded-2xl overflow-hidden shadow-elevated">
                <ListingsMap
    listings={filtered}
    selectedId={selectedId}
    onSelect={setSelectedId}
    height="500px"
  />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.slice(0, 6).map((listing) => <ListingCard key={listing.id} listing={listing} compact />)}
              </div>
            </motion.div> : <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
              {filtered.length === 0 ? <div className="glass-card flex flex-col items-center justify-center py-28 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#F0F7F2] to-[#e2f0e6] rounded-full flex items-center justify-center mb-6 shadow-soft animate-float">
                    <RefreshCw size={32} className="text-[#2F6B3F]" />
                  </div>
                  <h3 className="text-[#1F2937] mb-2" style={{ fontWeight: 700, fontSize: "1.125rem" }}>No listings found</h3>
                  <p className="text-[#6B7280] text-sm max-w-sm mb-1" style={{ lineHeight: 1.6 }}>
                    We couldn't find any listings matching your current filters.
                  </p>
                  <p className="text-[#9CA3AF] text-xs max-w-xs mb-6">Try broadening your search criteria or removing some filters to see more results.</p>
                  <button
    onClick={() => window.location.reload()}
    className="px-5 py-2.5 btn-modern bg-gradient-to-r from-[#2F6B3F] to-[#3a834d] text-white text-sm rounded-xl"
    style={{ fontWeight: 600 }}
  >
                    Reset All Filters
                  </button>
                </div> : <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                  {filtered.map((listing, i) => <motion.div
    key={listing.id}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.04, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
  >
                      <ListingCard listing={listing} />
                    </motion.div>)}
                </div>}
            </motion.div>}
        </div>
      </div>
    </div>;
}
export {
  MarketplacePage as default
};
