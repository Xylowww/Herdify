import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import {
  ChevronLeft,
  Upload,
  MapPin,
  Lock,
  AlertCircle,
  ShieldCheck,
  Image as ImageIcon,
  X,
  ToggleLeft,
  ToggleRight,
  Info
} from "lucide-react";
import { LIVESTOCK_TYPES } from "../data/mockData";
import { toast } from "sonner";
const demoPhotos = [
  "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1524024973431-3550a18a7b64?w=400&h=300&fit=crop"
];
function CreateListingPage() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [locationPrivacy, setLocationPrivacy] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { approximate: true }
  });
  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Listing posted successfully! It will be visible after review.");
    navigate("/seller/listings");
  };
  const addDemoPhoto = () => {
    if (photos.length < 5) {
      const next = demoPhotos[photos.length % demoPhotos.length];
      setPhotos([...photos, next]);
      toast.success("Demo photo added!");
    }
  };
  return <div>
      {
    /* Header */
  }
      <div className="flex items-center gap-3 mb-6">
        <Link to="/seller/dashboard" className="p-2 rounded-xl border border-[#E2DDD5] text-[#6B7280] hover:text-[#2F6B3F] hover:border-[#2F6B3F] transition-all duration-150">
          <ChevronLeft size={18} />
        </Link>
        <div>
          <h1 className="text-[#1F2937]" style={{ fontWeight: 700, fontSize: "1.25rem" }}>Post New Listing</h1>
          <p className="text-sm text-[#6B7280]">Fill in the details to list your livestock</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {
    /* Section: Basic Info */
  }
        <div className="bg-white rounded-2xl border border-[#E2DDD5] p-5 shadow-sm">
          <h3 className="text-[#1F2937] mb-4" style={{ fontWeight: 600 }}>Basic Information</h3>
          <div className="space-y-4">
            {
    /* Title */
  }
            <div>
              <label className="block text-sm text-[#1F2937] mb-1.5" style={{ fontWeight: 500 }}>
                Listing Title <span className="text-[#D64545]">*</span>
              </label>
              <input
    {...register("title", { required: "Title is required", minLength: { value: 10, message: "Title must be at least 10 characters" } })}
    type="text"
    placeholder="e.g., Healthy Native Cattle - Batangas Bulls"
    className={`w-full px-3 py-2.5 rounded-xl border ${errors.title ? "border-[#D64545] bg-red-50/50 ring-1 ring-[#D64545]/20" : "border-[#E2DDD5]"} bg-white text-sm text-[#1F2937] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/20 focus:border-[#2F6B3F] focus:shadow-sm`}
  />
              {errors.title && <p className="text-xs text-[#D64545] mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.title.message}</p>}
            </div>

            {
    /* Type + Breed */
  }
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#1F2937] mb-1.5" style={{ fontWeight: 500 }}>
                  Livestock Type <span className="text-[#D64545]">*</span>
                </label>
                <select
    {...register("type", { required: "Type is required" })}
    className={`w-full px-3 py-2.5 rounded-xl border ${errors.type ? "border-[#D64545] ring-1 ring-[#D64545]/20" : "border-[#E2DDD5]"} bg-white text-sm text-[#1F2937] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/20 focus:border-[#2F6B3F] focus:shadow-sm cursor-pointer`}
  >
                  <option value="">Select type</option>
                  {LIVESTOCK_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.type && <p className="text-xs text-[#D64545] mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.type.message}</p>}
              </div>
              <div>
                <label className="block text-sm text-[#1F2937] mb-1.5" style={{ fontWeight: 500 }}>
                  Breed <span className="text-[#D64545]">*</span>
                </label>
                <input
    {...register("breed", { required: "Breed is required" })}
    type="text"
    placeholder="e.g., Batangas Native, Duroc"
    className={`w-full px-3 py-2.5 rounded-xl border ${errors.breed ? "border-[#D64545] ring-1 ring-[#D64545]/20" : "border-[#E2DDD5]"} bg-white text-sm text-[#1F2937] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/20 focus:border-[#2F6B3F] focus:shadow-sm`}
  />
                {errors.breed && <p className="text-xs text-[#D64545] mt-1 flex items-center gap-1"><AlertCircle size={11} />Required</p>}
              </div>
            </div>

            {
    /* Age + Weight + Price + Head */
  }
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#1F2937] mb-1.5" style={{ fontWeight: 500 }}>Age <span className="text-[#D64545]">*</span></label>
                <input
    {...register("age", { required: true })}
    type="text"
    placeholder="e.g., 2-3 years"
    className={`w-full px-3 py-2.5 rounded-xl border ${errors.age ? "border-[#D64545] ring-1 ring-[#D64545]/20" : "border-[#E2DDD5]"} bg-white text-sm text-[#1F2937] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/20 focus:border-[#2F6B3F] focus:shadow-sm`}
  />
              </div>
              <div>
                <label className="block text-sm text-[#1F2937] mb-1.5" style={{ fontWeight: 500 }}>Weight <span className="text-[#D64545]">*</span></label>
                <input
    {...register("weight", { required: true })}
    type="text"
    placeholder="e.g., 300-350 kg each"
    className={`w-full px-3 py-2.5 rounded-xl border ${errors.weight ? "border-[#D64545] ring-1 ring-[#D64545]/20" : "border-[#E2DDD5]"} bg-white text-sm text-[#1F2937] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/20 focus:border-[#2F6B3F] focus:shadow-sm`}
  />
              </div>
              <div>
                <label className="block text-sm text-[#1F2937] mb-1.5" style={{ fontWeight: 500 }}>Price per Head (PHP) <span className="text-[#D64545]">*</span></label>
                <input
    {...register("price", { required: "Price required", min: { value: 1, message: "Must be positive" } })}
    type="number"
    placeholder="e.g., 45000"
    className={`w-full px-3 py-2.5 rounded-xl border ${errors.price ? "border-[#D64545] ring-1 ring-[#D64545]/20" : "border-[#E2DDD5]"} bg-white text-sm text-[#1F2937] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/20 focus:border-[#2F6B3F] focus:shadow-sm`}
  />
                {errors.price && <p className="text-xs text-[#D64545] mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.price.message}</p>}
              </div>
              <div>
                <label className="block text-sm text-[#1F2937] mb-1.5" style={{ fontWeight: 500 }}>Number of Heads <span className="text-[#D64545]">*</span></label>
                <input
    {...register("head", { required: "Required", min: { value: 1, message: "At least 1" } })}
    type="number"
    placeholder="e.g., 5"
    className={`w-full px-3 py-2.5 rounded-xl border ${errors.head ? "border-[#D64545] ring-1 ring-[#D64545]/20" : "border-[#E2DDD5]"} bg-white text-sm text-[#1F2937] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/20 focus:border-[#2F6B3F] focus:shadow-sm`}
  />
              </div>
            </div>

            {
    /* Description */
  }
            <div>
              <label className="block text-sm text-[#1F2937] mb-1.5" style={{ fontWeight: 500 }}>Description <span className="text-[#D64545]">*</span></label>
              <textarea
    {...register("description", { required: "Description required", minLength: { value: 30, message: "At least 30 characters" } })}
    rows={4}
    placeholder="Describe your livestock: health condition, feeding, vaccinations, history..."
    maxLength={1e3}
    className={`w-full px-3 py-2.5 rounded-xl border ${errors.description ? "border-[#D64545] ring-1 ring-[#D64545]/20" : "border-[#E2DDD5]"} bg-white text-sm text-[#1F2937] resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/20 focus:border-[#2F6B3F] focus:shadow-sm`}
  />
              {errors.description && <p className="text-xs text-[#D64545] mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.description.message}</p>}
              <p className="text-xs text-[#9CA3AF] mt-1">All descriptions are reviewed for accuracy. Do not include personal contact info in descriptions.</p>
            </div>
          </div>
        </div>

        {
    /* Section: Photos */
  }
        <div className="bg-white rounded-2xl border border-[#E2DDD5] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#1F2937]" style={{ fontWeight: 600 }}>Photos</h3>
            <span className="text-xs text-[#6B7280]">{photos.length}/5 photos</span>
          </div>

          {
    /* Upload area */
  }
          <div
    onDragOver={(e) => {
      e.preventDefault();
      setIsDragging(true);
    }}
    onDragLeave={() => setIsDragging(false)}
    onDrop={(e) => {
      e.preventDefault();
      setIsDragging(false);
      addDemoPhoto();
    }}
    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${isDragging ? "border-[#2F6B3F] bg-[#F0F7F2] scale-[1.01] shadow-sm" : "border-[#E2DDD5] hover:border-[#2F6B3F]/50 hover:bg-[#FAFAF8]"}`}
    onClick={addDemoPhoto}
  >
            <Upload size={24} className={`mx-auto mb-2 transition-colors duration-200 ${isDragging ? "text-[#2F6B3F]" : "text-[#6B7280]"}`} />
            <p className="text-sm text-[#1F2937]" style={{ fontWeight: 500 }}>Drop photos here or click to upload</p>
            <p className="text-xs text-[#6B7280] mt-1">JPG, PNG up to 5MB each. Max 5 photos. (Demo: click to add sample)</p>
          </div>

          {
    /* Uploaded photos */
  }
          {photos.length > 0 && <div className="flex gap-3 mt-3 flex-wrap">
              {photos.map((p, i) => <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-[#E2DDD5]">
                  <img src={p} alt="" className="w-full h-full object-cover" />
                  <button
    type="button"
    onClick={() => setPhotos(photos.filter((_, j) => j !== i))}
    className="absolute top-0.5 right-0.5 w-5 h-5 bg-[#D64545] text-white rounded-full flex items-center justify-center hover:bg-[#c03030] transition-colors"
  >
                    <X size={10} />
                  </button>
                  {i === 0 && <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center py-0.5" style={{ fontSize: "9px", fontWeight: 600 }}>
                      COVER
                    </span>}
                </div>)}
              {photos.length < 5 && <button
    type="button"
    onClick={addDemoPhoto}
    className="w-20 h-20 rounded-xl border-2 border-dashed border-[#E2DDD5] flex flex-col items-center justify-center gap-1 text-[#6B7280] hover:border-[#2F6B3F] hover:text-[#2F6B3F] transition-all duration-150"
  >
                  <ImageIcon size={16} />
                  <span style={{ fontSize: "10px" }}>Add</span>
                </button>}
            </div>}

          <div className="flex items-start gap-2 mt-3 p-2.5 bg-blue-50 rounded-lg">
            <Info size={13} className="text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700">Only JPG, PNG, and WEBP files are accepted. Files are scanned for malware before publishing.</p>
          </div>
        </div>

        {
    /* Section: Location + Privacy */
  }
        <div className="bg-white rounded-2xl border border-[#E2DDD5] p-5 shadow-sm">
          <h3 className="text-[#1F2937] mb-1" style={{ fontWeight: 600 }}>Location</h3>
          <p className="text-xs text-[#6B7280] mb-4">Your exact address is protected. Buyers see only an approximate area.</p>

          <div className="mb-4">
            <label className="block text-sm text-[#1F2937] mb-1.5" style={{ fontWeight: 500 }}>
              Barangay / Street Address <span className="text-[#D64545]">*</span>
            </label>
            <div className="relative">
              <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
              <input
    {...register("locationLabel", { required: "Location is required" })}
    type="text"
    placeholder="Brgy. Kumintang Ibaba, Batangas City, Batangas"
    className={`w-full pl-9 pr-4 py-2.5 rounded-xl border ${errors.locationLabel ? "border-[#D64545] ring-1 ring-[#D64545]/20" : "border-[#E2DDD5]"} bg-white text-sm text-[#1F2937] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2F6B3F]/20 focus:border-[#2F6B3F] focus:shadow-sm`}
  />
            </div>
            {errors.locationLabel && <p className="text-xs text-[#D64545] mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.locationLabel.message}</p>}
          </div>

          {
    /* Location Privacy Toggle */
  }
          <div className="p-4 bg-[#F6F4EE] rounded-xl border border-[#E2DDD5]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Lock size={15} className="text-[#2F6B3F]" />
                <span className="text-sm text-[#1F2937]" style={{ fontWeight: 600 }}>Location Privacy</span>
              </div>
              <button
    type="button"
    onClick={() => setLocationPrivacy(!locationPrivacy)}
    className="transition-all duration-200"
  >
                {locationPrivacy ? <ToggleRight size={28} className="text-[#2F6B3F] fill-[#2F6B3F]" /> : <ToggleLeft size={28} className="text-[#9CA3AF]" />}
              </button>
            </div>
            <p className="text-xs text-[#6B7280]" style={{ lineHeight: 1.5 }}>
              {locationPrivacy ? 'Approximate location shown (e.g., "Batangas City area"). Exact address revealed only after you approve a buyer inquiry.' : "Full address visible to all users. Not recommended for privacy."}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-xs" style={{ fontWeight: 500, color: locationPrivacy ? "#2F6B3F" : "#C68A3A" }}>
              <ShieldCheck size={12} />
              {locationPrivacy ? "Privacy Protection: ON" : "Privacy Protection: OFF"}
            </div>
          </div>
        </div>

        {
    /* Safety reminder */
  }
        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
          <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800" style={{ fontWeight: 600 }}>Before Publishing</p>
            <ul className="text-xs text-amber-700 space-y-1 mt-1" style={{ lineHeight: 1.6 }}>
              <li>All listings are reviewed within 24 hours before appearing publicly.</li>
              <li>Do not include personal phone numbers or external payment links in your listing.</li>
              <li>Provide accurate health and vaccination information for all animals.</li>
            </ul>
          </div>
        </div>

        {
    /* Submit */
  }
        <div className="flex gap-3">
          <Link
    to="/seller/dashboard"
    className="flex-1 py-3.5 text-center border border-[#E2DDD5] text-[#6B7280] rounded-xl hover:bg-[#F6F4EE] transition-all duration-150 text-sm active:scale-[0.97]"
  >
            Save as Draft
          </Link>
          <button
    type="submit"
    disabled={isSubmitting}
    className="flex-1 py-3.5 bg-[#2F6B3F] text-white rounded-xl hover:bg-[#3a834d] transition-all duration-150 disabled:opacity-60 text-sm active:scale-[0.97] shadow-sm"
    style={{ fontWeight: 600 }}
  >
            {isSubmitting ? "Submitting..." : "Post Listing"}
          </button>
        </div>
      </form>
    </div>;
}
export {
  CreateListingPage as default
};
