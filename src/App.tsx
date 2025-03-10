
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AppSidebar } from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { LoginDialog } from "@/components/auth/LoginDialog";
import { validateUser } from "@/services/sheets";
import { useToast } from "@/components/ui/use-toast";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import ItemDetails from "./pages/ItemDetails";
import ScrapDetails from "./pages/ScrapDetails";
import Landing from "./pages/Landing";

const queryClient = new QueryClient();

const AppContent = () => {
  const isMobile = useIsMobile();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const { toast } = useToast();
  const { t } = useLanguage();

  const checkUserAuthorization = async (email: string) => {
    try {
      const { isValid } = await validateUser(email);
      if (!isValid) {
        localStorage.removeItem("userEmail");
        setIsLoggedIn(false);
        setUserEmail("");
        toast({
          title: t('auth.accessBlocked'),
          description: t('auth.accessRevokedMessage'),
          variant: "destructive",
        });
      }
      return isValid;
    } catch (error) {
      console.error("Erro ao verificar autorização:", error);
      return false;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const savedEmail = localStorage.getItem("userEmail");
      if (savedEmail) {
        const isAuthorized = await checkUserAuthorization(savedEmail);
        if (isAuthorized) {
          setUserEmail(savedEmail);
          setIsLoggedIn(true);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Verifica a autorização a cada 5 minutos
  useEffect(() => {
    if (!userEmail) return;

    const interval = setInterval(() => {
      checkUserAuthorization(userEmail);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [userEmail]);

  const handleLogin = async (email: string) => {
    const isAuthorized = await checkUserAuthorization(email);
    if (isAuthorized) {
      setIsLoggedIn(true);
      setUserEmail(email);
      localStorage.setItem("userEmail", email);
      toast({
        title: t('auth.loginSuccess'),
        description: t('auth.welcome'),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <PageViewTracker />
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route
          path="*"
          element={
            !isLoggedIn ? (
              <LoginDialog onLogin={handleLogin} />
            ) : (
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
                          <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                      </div>
                    </main>
                    <Footer />
                  </div>
                </div>
              </SidebarProvider>
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
