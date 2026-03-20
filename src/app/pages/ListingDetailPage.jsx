import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  MapPin,
  Scale,
  Calendar,
  Tag,
  ChevronLeft,
  MessageSquare,
  ShieldCheck,
  Eye,
  Heart,
  Share2,
  AlertTriangle,
  CheckCircle2,
  User,
  Lock,
  ChevronRight,
  ChevronLeft as ChevLeft
} from "lucide-react";
import { mockListings } from "../data/mockData";
import { useAppStore } from "../store/useAppStore";
import { StatusBadge } from "../components/ui/StatusBadge";
import { ListingCard } from "../components/ui/ListingCard";
import { toast } from "sonner";
function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAppStore();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [saved, setSaved] = useState(false);
  const [showInquiry, setShowInquiry] = useState(false);
  const [inquiryText, setInquiryText] = useState("");
  const listing = mockListings.find((l) => l.id === id);
  const related = mockListings.filter((l) => l.id !== id && l.type === listing?.type).slice(0, 3);
  const formatPrice = (n) => new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(n);
  if (!listing) {
    return <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-[#1F2937] mb-2">Listing not found</h2>
        <Link to="/marketplace" className="text-[#2F6B3F] text-sm hover:underline">Back to Marketplace</Link>
      </div>;
  }
  const handleSendInquiry = () => {
    if (!inquiryText.trim()) {
      toast.error("Please write a message before sending.");
      return;
    }
    toast.success("Inquiry sent! The seller will be notified.");
    setShowInquiry(false);
    setInquiryText("");
    navigate("/messages");
  };
  const isOwnListing = currentUser?.id === listing.sellerId;
  return <div>
      {
    /* Breadcrumb */
  }
      <div className="flex items-center gap-2 mb-6 text-sm text-[#6B7280] glass w-fit px-4 py-2 rounded-full shadow-soft">
        <Link to="/marketplace" className="flex items-center gap-1 hover:text-[#2F6B3F] transition-colors duration-200">
          <ChevronLeft size={15} />
          Marketplace
        </Link>
        <span>/</span>
        <span className="text-[#1F2937] truncate" style={{ fontWeight: 500 }}>{listing.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {
    /* Left - Photos + Details */
  }
        <div className="lg:col-span-3 space-y-5">
          {
    /* Photo Gallery */
  }
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="relative h-[260px] sm:h-[340px] lg:h-[420px]">
              <motion.img
    key={photoIndex}
    initial={{ opacity: 0, scale: 1.02 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    src={listing.photos[photoIndex] || listing.photo}
    alt={listing.title}
    className="w-full h-full object-cover"
  />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <StatusBadge status={listing.status} />
              </div>
              {listing.photos.length > 1 && <>
                  <button
    onClick={() => setPhotoIndex((i) => Math.max(0, i - 1))}
    disabled={photoIndex === 0}
    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center shadow-elevated disabled:opacity-30 hover:bg-white active:scale-[0.95] transition-all duration-200"
  >
                    <ChevLeft size={16} />
                  </button>
                  <button
    onClick={() => setPhotoIndex((i) => Math.min(listing.photos.length - 1, i + 1))}
    disabled={photoIndex === listing.photos.length - 1}
    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center shadow-elevated disabled:opacity-30 hover:bg-white active:scale-[0.95] transition-all duration-200"
  >
                    <ChevronRight size={16} />
                  </button>
                </>}
              {
    /* Photo counter */
  }
              <div className="absolute bottom-3 right-3 glass-dark text-white text-xs px-3 py-1.5 rounded-full shadow-sm">
                {photoIndex + 1} / {listing.photos.length}
              </div>
            </div>
            {
    /* Thumbnails */
  }
            {listing.photos.length > 1 && <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide bg-gradient-to-b from-white to-[#FAFAF8]">
                {listing.photos.map((p, i) => <button
    key={i}
    onClick={() => setPhotoIndex(i)}
    className={`w-18 h-14 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all duration-300 ${i === photoIndex ? "border-[#2F6B3F] ring-2 ring-[#2F6B3F]/20 shadow-glow" : "border-transparent hover:border-[#E2DDD5] hover:shadow-soft"}`}
  >
                    <img src={p} alt="" className="w-full h-full object-cover" />
                  </button>)}
              </div>}
          </div>

          {
    /* Details */
  }
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-gradient-to-r from-[#F0F7F2] to-[#E8F2EA] text-[#2F6B3F] border border-[#C8E0CF]/60 shadow-sm" style={{ fontWeight: 600 }}>
                    {listing.type}
                  </span>
                  <span className="text-xs text-[#6B7280]">{listing.breed}</span>
                </div>
                <h1 className="text-[#1F2937]" style={{ fontWeight: 700, fontSize: "1.3rem", lineHeight: 1.3 }}>{listing.title}</h1>
              </div>
              <div className="flex items-center gap-2">
                <button
    onClick={() => setSaved(!saved)}
    className={`p-2.5 rounded-xl transition-all duration-300 active:scale-[0.95] ${saved ? "glass bg-red-50/80 text-[#D64545] shadow-glow-accent" : "glass text-[#6B7280] hover:text-[#D64545]"}`}
  >
                  <Heart size={17} className={saved ? "fill-[#D64545]" : ""} />
                </button>
                <button className="p-2.5 rounded-xl glass text-[#6B7280] hover:text-[#2F6B3F] transition-all duration-300 active:scale-[0.95]">
                  <Share2 size={17} />
                </button>
              </div>
            </div>

            {
    /* Price */
  }
            <div className="flex flex-wrap items-baseline gap-2 mb-5 glass-card p-4 rounded-xl">
              <span className="gradient-text" style={{ fontWeight: 800, fontSize: "1.9rem" }}>
                {formatPrice(listing.price)}
              </span>
              <span className="text-[#6B7280] text-sm">/head</span>
              <span className="ml-2 text-sm text-[#1F2937]" style={{ fontWeight: 500 }}>
                · {listing.head} heads available
              </span>
            </div>

            {
    /* Specs Grid */
  }
            <div className="grid grid-cols-2 gap-4 mb-5">
              {[
    { icon: Tag, label: "Breed", value: listing.breed },
    { icon: Calendar, label: "Age", value: listing.age },
    { icon: Scale, label: "Weight", value: listing.weight },
    { icon: Tag, label: "Total Available", value: `${listing.head} heads` }
  ].map((spec) => <div key={spec.label} className="flex items-center gap-3 p-4 glass rounded-xl">
                  <div className="w-9 h-9 bg-gradient-to-br from-[#2F6B3F]/10 to-[#6FAF5F]/10 rounded-lg flex items-center justify-center">
                    <spec.icon size={15} className="text-[#2F6B3F]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280]">{spec.label}</p>
                    <p className="text-sm text-[#1F2937]" style={{ fontWeight: 600 }}>{spec.value}</p>
                  </div>
                </div>)}
            </div>

            {
    /* Description */
  }
            <div className="mb-5">
              <h4 className="text-[#1F2937] mb-2" style={{ fontWeight: 600 }}>Description</h4>
              <p className="text-sm text-[#6B7280]" style={{ lineHeight: 1.7 }}>{listing.description}</p>
            </div>

            {
    /* Location */
  }
            <div className="flex items-start gap-3 p-4 glass rounded-xl">
              <div className="w-9 h-9 bg-gradient-to-br from-[#C68A3A]/10 to-[#d9a454]/10 rounded-lg flex items-center justify-center">
                <MapPin size={15} className="text-[#C68A3A]" />
              </div>
              <div>
                <p className="text-sm text-[#1F2937]" style={{ fontWeight: 600 }}>{listing.location.approximate}</p>
                <p className="text-xs text-[#6B7280] flex items-center gap-1 mt-0.5">
                  <Lock size={10} />
                  Exact address shared only after seller approval
                </p>
              </div>
            </div>

            {
    /* Stats */
  }
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-5 pt-5 border-t border-[#E2DDD5]/50 text-xs text-[#6B7280]">
              <span className="flex items-center gap-1.5">
                <Eye size={12} />
                {listing.views} views
              </span>
              <span className="flex items-center gap-1.5">
                <MessageSquare size={12} />
                {listing.inquiries} inquiries
              </span>
              <span className="ml-auto">Posted {new Date(listing.createdAt).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}</span>
            </div>
          </div>
        </div>

        {
    /* Right - Seller + CTA */
  }
        <div className="lg:col-span-2 space-y-4">
          {
    /* Seller Card */
  }
          <div className="glass-card rounded-2xl p-6">
            <h4 className="text-[#1F2937] mb-3" style={{ fontWeight: 600 }}>Seller Information</h4>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E2DDD5] to-[#d5d0c6] flex items-center justify-center">
                  <User size={22} className="text-[#6B7280]" />
                </div>
                {listing.sellerVerified && <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-[#2F6B3F] to-[#3a834d] rounded-full flex items-center justify-center shadow-glow">
                    <ShieldCheck size={11} className="text-white" />
                  </div>}
              </div>
              <div>
                <p className="text-sm text-[#1F2937]" style={{ fontWeight: 600 }}>{listing.sellerName}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {listing.sellerVerified ? <span className="text-xs text-[#2F6B3F] flex items-center gap-1">
                      <CheckCircle2 size={11} />
                      Verified Seller
                    </span> : <span className="text-xs text-[#C68A3A] flex items-center gap-1">
                      <AlertTriangle size={11} />
                      Unverified
                    </span>}
                </div>
              </div>
            </div>

            {
    /* Privacy notice - contact */
  }
            <div className="p-3.5 glass rounded-xl mb-4">
              <p className="text-xs text-[#6B7280]" style={{ lineHeight: 1.5 }}>
                Contact details are only shared after the seller accepts your inquiry. Both parties must consent before personal information is exchanged.
              </p>
            </div>

            {isOwnListing ? <div className="space-y-2">
                <Link
    to={`/seller/listings/${listing.id}/edit`}
    className="btn-modern flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-[#2F6B3F] to-[#3a834d] text-white rounded-xl text-sm"
    style={{ fontWeight: 600 }}
  >
                  Edit Listing
                </Link>
                <button className="flex items-center justify-center gap-2 w-full py-2.5 glass text-[#6B7280] rounded-xl hover:text-[#D64545] transition-all duration-300 text-sm active:scale-[0.97]">
                  Remove Listing
                </button>
              </div> : listing.status === "Available" ? <div className="space-y-2">
                <button
    onClick={() => setShowInquiry(true)}
    className="btn-modern flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#2F6B3F] to-[#3a834d] text-white rounded-xl text-sm"
    style={{ fontWeight: 600 }}
  >
                  <MessageSquare size={16} />
                  Send Inquiry
                </button>
                <Link
    to="/messages"
    className="flex items-center justify-center gap-2 w-full py-2.5 glass text-[#1F2937] rounded-xl hover:shadow-soft transition-all duration-300 text-sm active:scale-[0.97]"
  >
                  View Messages
                </Link>
              </div> : <div className="py-3 glass rounded-xl text-center">
                <p className="text-sm text-[#6B7280]" style={{ fontWeight: 500 }}>
                  This listing is {listing.status.toLowerCase()}
                </p>
              </div>}
          </div>

          {
    /* Safety tips */
  }
          <div className="glass-card rounded-2xl p-5" style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.08), rgba(245,158,11,0.05))" }}>
            <h4 className="text-amber-800 mb-2.5 flex items-center gap-2" style={{ fontWeight: 600, fontSize: "0.85rem" }}>
              <ShieldCheck size={16} />
              Safety Tips
            </h4>
            <ul className="space-y-2">
              {[
    "Verify seller identity before visiting",
    "Request health certificates for animals",
    "Complete transactions at secure locations",
    "Never share financial details in chat"
  ].map((tip) => <li key={tip} className="text-xs text-amber-700 flex items-start gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
                  {tip}
                </li>)}
            </ul>
          </div>

          {
    /* Listing ID */
  }
          <p className="text-xs text-[#9CA3AF] text-center">Listing ID: {listing.id.toUpperCase()}</p>
        </div>
      </div>

      {
    /* Inquiry Modal */
  }
      {showInquiry && <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-4">
          <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ type: "spring", stiffness: 350, damping: 28 }}
    className="glass-strong rounded-2xl p-6 w-full max-w-md shadow-float"
  >
            <h3 className="text-[#1F2937] mb-1" style={{ fontWeight: 700 }}>Send Inquiry</h3>
            <p className="text-xs text-[#6B7280] mb-4">Regarding: {listing.title}</p>
            <textarea
    value={inquiryText}
    onChange={(e) => setInquiryText(e.target.value)}
    placeholder="Write your message... (e.g., I am interested in 2 heads. Can we negotiate the price?)"
    rows={4}
    maxLength={500}
    className="w-full px-4 py-3 rounded-xl input-glass text-sm text-[#1F2937] resize-none transition-all duration-300"
  />
            <p className="text-xs text-[#9CA3AF] text-right mt-1 mb-4">{inquiryText.length}/500</p>
            <div className="flex items-center gap-2 p-3 glass rounded-xl mb-4">
              <Lock size={13} className="text-[#2F6B3F] flex-shrink-0" />
              <p className="text-xs text-[#6B7280]">Messages are private between you and the seller only.</p>
            </div>
            <div className="flex gap-2">
              <button
    onClick={() => setShowInquiry(false)}
    className="flex-1 py-2.5 glass text-[#6B7280] rounded-xl text-sm hover:shadow-soft transition-all duration-300 active:scale-[0.97]"
  >
                Cancel
              </button>
              <button
    onClick={handleSendInquiry}
    className="flex-1 py-2.5 btn-modern bg-gradient-to-r from-[#2F6B3F] to-[#3a834d] text-white rounded-xl text-sm"
    style={{ fontWeight: 600 }}
  >
                Send Inquiry
              </button>
            </div>
          </motion.div>
        </div>}

      {
    /* Related Listings */
  }
      {related.length > 0 && <div className="mt-12">
          <h3 className="text-[#1F2937] mb-4" style={{ fontWeight: 700, fontSize: "1.15rem" }}>Similar Listings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((l, i) => <motion.div
    key={l.id}
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.1 }}
  >
                <ListingCard listing={l} />
              </motion.div>)}
          </div>
        </div>}
    </div>;
}
export {
  ListingDetailPage as default
};
