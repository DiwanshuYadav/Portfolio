import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import BootSequence from "@/components/BootSequence";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    // Preload necessary assets
    const preloadAssets = async () => {
      try {
        // Wait for initial data fetches
        await Promise.all([
          queryClient.prefetchQuery({
            queryKey: ['portfolio'],
            queryFn: async () => {
              const response = await fetch('/api/portfolio');
              if (!response.ok) throw new Error('Failed to fetch portfolio data');
              return response.json();
            },
          }),
        ]);
      } catch (error) {
        console.error('Error during preload:', error);
      } finally {
        setIsReady(true);
        setTimeout(() => setIsLoading(false), 1000);
      }
    };

    preloadAssets();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {isLoading ? (
        <div className="h-screen w-full bg-charcoal flex items-center justify-center">
          <div className="text-white text-center">
            <Loader2 className="h-12 w-12 animate-spin mb-4" />
            <p className="text-xl">Loading your creative portfolio...</p>
          </div>
        </div>
      ) : isBooting ? (
        <BootSequence onComplete={() => setIsBooting(false)} />
      ) : (
        <div className="min-h-screen bg-charcoal">
          <Router />
        </div>
      )}
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
