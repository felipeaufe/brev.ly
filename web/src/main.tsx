import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "./router";
import "./index.css";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Router />
		<Toaster />
	</StrictMode>,
);
