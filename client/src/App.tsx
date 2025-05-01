import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState, Suspense } from "react";
import Home from "@/pages/Home";

// Simplified app structure to debug loading issues
function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Preload assets and then set ready flag
    const timer = setTimeout(() => {
      console.log("App is ready");
      setIsReady(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        {!isReady ? (
          // Loading screen
          <div className="h-screen w-full bg-charcoal flex items-center justify-center">
            <p className="text-neon-teal text-2xl">Loading...</p>
          </div>
        ) : (
          // Main app content
          <Suspense fallback={<div className="h-screen bg-charcoal"></div>}>
            <Home />
          </Suspense>
        )}
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
