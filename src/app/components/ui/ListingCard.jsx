import { MapPin, Scale, Eye, MessageSquare, ShieldCheck } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { StatusBadge } from "./StatusBadge";
function ListingCard({ listing, compact = false }) {
  const formatPrice = (n) => new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(n);
  return <div className="card-modern group cursor-pointer h-full flex flex-col overflow-hidden">
      <Link to={`/listings/${listing.id}`} className="block flex-1 flex flex-col">
        {
    /* Image */
  }
        <div className="relative overflow-hidden" style={{ height: compact ? 160 : 210 }}>
          <ImageWithFallback
    src={listing.photo}
    alt={listing.title}
    loading="lazy"
    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
  />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 left-3">
            <StatusBadge status={listing.status} size="sm" />
          </div>
          {listing.sellerVerified && <div className="absolute top-3 right-3">
              <span className="flex items-center gap-1 text-[10px] px-2 py-1 glass text-[#2F6B3F] rounded-full shadow-soft" style={{ fontWeight: 700 }}>
                <ShieldCheck size={11} />
                Verified
              </span>
            </div>}
          <div className="absolute bottom-0 left-0 right-0 px-3.5 pb-3.5 pt-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="flex items-end justify-between">
              <span className="text-white drop-shadow-lg" style={{ fontWeight: 800, fontSize: "1.2rem" }}>
                {formatPrice(listing.price)}
                <span className="text-white/70 text-xs ml-1" style={{ fontWeight: 500 }}>/head</span>
              </span>
              <span className="glass-dark text-white px-2.5 py-1 rounded-full text-xs shadow-sm" style={{ fontWeight: 600 }}>
                {listing.head} {listing.head === 1 ? "head" : "heads"}
              </span>
            </div>
          </div>
        </div>

        {
    /* Body */
  }
        <div className="min-w-0 p-4 flex-1 flex flex-col bg-gradient-to-b from-white to-[#FAFAF8]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-gradient-to-r from-[#F0F7F2] to-[#E8F2EA] text-[#2F6B3F] border border-[#C8E0CF]/60 shadow-sm" style={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              {listing.type}
            </span>
            <span className="text-[10px] text-[#9CA3AF]" style={{ fontWeight: 500 }}>{listing.breed}</span>
          </div>

          <h3 className="text-sm text-[#1F2937] mb-1.5 line-clamp-2 group-hover:text-[#2F6B3F] transition-colors duration-300" style={{ fontWeight: 700, lineHeight: "1.4" }}>
            {listing.title}
          </h3>

          {!compact && <div className="flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2 text-xs text-[#6B7280]">
                <span className="flex items-center gap-1">
                  <Scale size={12} className="text-[#9CA3AF]" />
                  {listing.weight}
                </span>
                <span className="text-[#E2DDD5]">|</span>
                <span>{listing.age}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#6B7280] mb-3">
                <MapPin size={12} className="text-[#C68A3A] flex-shrink-0" />
                <span className="truncate">{listing.location.approximate}</span>
              </div>
            </div>}

          {!compact && <div className="flex items-center justify-between pt-3 border-t border-[#F0EDE8]/80 mt-auto">
              <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
                <span className="flex items-center gap-1 hover:text-[#6B7280] transition-colors">
                  <Eye size={12} />
                  {listing.views}
                </span>
                <span className="flex items-center gap-1 hover:text-[#6B7280] transition-colors">
                  <MessageSquare size={12} />
                  {listing.inquiries}
                </span>
              </div>
              <span className="text-xs text-[#6B7280]" style={{ fontWeight: 500 }}>
                {listing.sellerName}
              </span>
            </div>}
        </div>
      </Link>
    </div>;
}
export {
  ListingCard
};
