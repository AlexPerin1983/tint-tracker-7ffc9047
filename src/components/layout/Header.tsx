
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { QrCode } from "lucide-react";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

export function Header() {
  const { t } = useLanguage();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger>
              <Button variant="ghost" size="icon" className="-ml-3">
                <span className="sr-only">Open menu</span>
              </Button>
            </SidebarTrigger>
            <div className="flex items-center gap-2">
              <QrCode className="w-8 h-8 text-primary" />
              <h1 className="text-xl font-semibold">{t('app.title')}</h1>
            </div>
          </div>
          <div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
