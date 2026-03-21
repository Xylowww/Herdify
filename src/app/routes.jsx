import { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import LandingPage from "./pages/LandingPage";
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const RoleSelectionPage = lazy(() => import("./pages/RoleSelectionPage"));
function RouteFallback() {
  return <div className="min-h-screen bg-[#F6F4EE]" />;
}
function RedirectToLanding() {
  return <Navigate to="/" replace />;
}
const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage
  },
  {
    path: "/login",
    element: <Suspense fallback={<RouteFallback />}>
        <LoginPage />
      </Suspense>
  },
  {
    path: "/signup",
    element: <Suspense fallback={<RouteFallback />}>
        <SignupPage />
      </Suspense>
  },
  {
    path: "/select-role",
    element: <Suspense fallback={<RouteFallback />}>
        <RoleSelectionPage />
      </Suspense>
  },
  {
    path: "*",
    Component: RedirectToLanding
  }
]);
export {
  router
};
