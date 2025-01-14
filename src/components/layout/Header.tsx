import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-muted z-50 h-16">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SidebarTrigger>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⬚</span>
            <h1 className="text-xl font-semibold">Tint Tracker System</h1>
          </div>
        </div>
      </div>
    </header>
  );
};