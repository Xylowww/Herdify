import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ShoppingCart, Package, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { BrandMark } from "../components/ui/BrandMark";

function RoleSelectionPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  const handleContinue = () => {
    if (!role) {
      toast.error("Please select a role to continue");
      return;
    }
    toast.success(`Welcome! You're now a ${role}.`);
    navigate("/");
  };

  const roles = [
    {
      value: "Buyer",
      icon: ShoppingCart,
      title: "I want to buy",
      description: "Browse listings, contact sellers, and purchase livestock for your farm or business."
    },
    {
      value: "Seller",
      icon: Package,
      title: "I want to sell",
      description: "List your livestock, manage inquiries, and connect with buyers across the region."
    }
  ];

  return (
    <div className="min-h-screen bg-white px-8 py-8 lg:px-16 lg:py-10" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Logo - top left */}
      <div className="flex items-center gap-2.5">
        <div className="text-[#2F6B3F]">
          <BrandMark className="w-8 h-8" strokeWidth={2.35} />
        </div>
        <span className="text-[#1F2937]" style={{ fontWeight: 700, fontSize: "1.25rem", letterSpacing: "-0.02em" }}>
          Herdify
        </span>
      </div>

      {/* Content - single column, centered */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="mt-16 lg:mt-24 max-w-xl mx-auto"
      >
        {/* Title and description */}
        <h1 className="text-[#1F2937] mb-3" style={{ fontWeight: 700, fontSize: "2.25rem", letterSpacing: "-0.02em" }}>
          How will you use Herdify?
        </h1>
        <p className="text-[#6B7280] text-lg mb-8">
          Choose your primary role.
        </p>

        {/* Role cards - stacked below */}
        <div className="space-y-4 mb-8">
          {roles.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => setRole(r.value)}
              className={`w-full p-5 rounded-xl border-2 text-left transition-all flex items-start gap-4 ${
                role === r.value
                  ? "border-[#2F6B3F] bg-[#2F6B3F]/5"
                  : "border-gray-200 bg-white hover:border-[#2F6B3F]/40"
              }`}
            >
              <div className={`p-3 rounded-lg ${role === r.value ? "bg-[#2F6B3F] text-white" : "bg-gray-100 text-[#6B7280]"}`}>
                <r.icon size={24} />
              </div>
              <div className="flex-1">
                <p className="text-lg mb-1" style={{ fontWeight: 600, color: role === r.value ? "#2F6B3F" : "#1F2937" }}>
                  {r.title}
                </p>
                <p className="text-sm text-[#6B7280]">{r.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Continue button */}
        <button
          onClick={handleContinue}
          disabled={!role}
          className="w-full py-3 bg-[#2F6B3F] hover:bg-[#256332] text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          style={{ fontWeight: 600 }}
        >
          Continue
          <ArrowRight size={18} />
        </button>
      </motion.div>
    </div>
  );
}

export default RoleSelectionPage;
