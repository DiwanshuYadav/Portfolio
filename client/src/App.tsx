import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    // Preload necessary assets
    const preloadAssets = async () => {
      // Add any asset preloading logic here if needed
      setTimeout(() => {
        setIsReady(true);
      }, 500);
    };

    preloadAssets();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {isReady ? (
        <Router />
      ) : (
        <div className="h-screen w-full bg-charcoal"></div>
      )}
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
