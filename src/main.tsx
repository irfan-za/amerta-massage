import { createRoot } from "react-dom/client";
import { Landing } from "./components/landing/Landing";
import { Toaster } from "sonner";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing application root");

createRoot(root).render(
  <>
    <Landing />
    <Toaster
      position="bottom-center"
      richColors
      toastOptions={{ style: { fontFamily: "var(--font-inter)" } }}
    />
  </>,
);
