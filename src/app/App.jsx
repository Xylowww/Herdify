import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { router } from "./routes";
function App() {
  return <>
      <RouterProvider router={router} />
      <Toaster
    richColors
    closeButton
    position="top-right"
    toastOptions={{
      style: {
        fontFamily: "Inter, system-ui, sans-serif"
      }
    }}
  />
    </>;
}
export {
  App as default
};
