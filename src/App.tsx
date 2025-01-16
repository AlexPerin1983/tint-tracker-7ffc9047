import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AppSidebar } from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { LoginDialog } from "@/components/auth/LoginDialog";
import Index from "./pages/Index";
import ItemDetails from "./pages/ItemDetails";
import ScrapDetails from "./pages/ScrapDetails";

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleLogin = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem("userEmail", email);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!isLoggedIn ? (
          <LoginDialog onLogin={handleLogin} />
        ) : (
          <BrowserRouter>
            <SidebarProvider>
              <div className="min-h-screen flex w-full">
                <AppSidebar userEmail={userEmail} />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <main className="flex-1 px-4 md:px-8 py-6 space-y-6">
                    <div className={`${isMobile ? 'mt-16 mb-16' : 'mt-[4.5rem]'}`}>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/item/:id" element={<ItemDetails />} />
                        <Route path="/scrap/:id" element={<ScrapDetails />} />
                      </Routes>
                    </div>
                  </main>
                  <Footer />
                </div>
              </div>
            </SidebarProvider>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;