import { Outlet } from "react-router";
import { TopNav } from "./TopNav";
import { BottomNav } from "./BottomNav";
import { Toaster } from "sonner";
function AppLayout() {
  return <div className="min-h-screen bg-[#F6F4EE]">
      <TopNav />
      <main className="min-w-0 px-4 sm:px-6 lg:px-8 xl:px-10 py-4 sm:py-5 md:py-6 pb-20 md:pb-8 max-w-[1600px] 2xl:max-w-[1800px] mx-auto">
        <Outlet />
      </main>
      <BottomNav />
      <Toaster
    position="top-right"
    toastOptions={{
      style: {
        background: "#fff",
        border: "1px solid #E2DDD5",
        color: "#1F2937",
        borderRadius: "14px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.04)"
      }
    }}
  />
    </div>;
}
export {
  AppLayout
};
