import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import { ModuleOne } from "./pages/ModuleOne";
import { ModuleTwo } from "./pages/ModuleTwo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const handleModuleComplete = (moduleId: number) => {
    const progress = localStorage.getItem('ai-forensics-progress');
    if (progress) {
      const modules = JSON.parse(progress);
      modules[moduleId - 1].completed = true;
      localStorage.setItem('ai-forensics-progress', JSON.stringify(modules));
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route 
              path="/module-1" 
              element={<ModuleOne onComplete={() => handleModuleComplete(1)} />} 
            />
            <Route 
              path="/module-2" 
              element={<ModuleTwo onComplete={() => handleModuleComplete(2)} />} 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
