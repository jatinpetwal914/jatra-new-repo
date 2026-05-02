import { useEffect, useState, lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Loader from "@/components/Loader";

// Lazy load registration routes for code splitting
const Register = lazy(() => import("@/components/Register"));
const Culturereg = lazy(() => import("@/components/culturereg"));
const Advreg = lazy(() => import("@/components/advreg"));
const Sponsor = lazy(() => import("@/components/sponsor"));
const AllGuestsPage = lazy(() => import("@/components/viewsingers"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  },
});

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <Loader />
  </div>
);

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // small delay for smooth UX
      setTimeout(() => setLoading(false), 800);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* 🔥 LOADER OVERLAY */}
        {loading && <Loader />}

        {/* 🔥 MAIN APP */}
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cultural-register" element={<Culturereg />} />
              <Route path="/adventure-register" element={<Advreg />} />
              <Route path="/sponsor" element={<Sponsor />} />
              <Route path="/viewsingers" element={<AllGuestsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>

      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;