import { Home, Box, Scissors, LogOut, ExternalLink, Mail } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { logoutUser } from "@/services/sheets";

const navigationItems = [
  { 
    title: "Dashboard", 
    icon: Home, 
    disabled: true,
    description: "Under Development - Coming Q2 2024"
  },
  { 
    title: "Rolls Management", 
    icon: Box, 
    disabled: true,
    description: "Coming Soon - Release Date TBA"
  },
  { 
    title: "Scraps Management", 
    icon: Scissors, 
    disabled: true,
    description: "Beta Testing - Available Soon"
  },
];

const externalLinks = [
  {
    title: "Los_Pelikooss Store",
    url: "https://fumejp.com.br/los-pelikooss/",
    icon: ExternalLink,
  },
];

const contactInfo = {
  title: "Support",
  email: "windowfilm.br@gmail.com",
  icon: Mail,
};

interface AppSidebarProps {
  userEmail?: string;
}

export const AppSidebar = ({ userEmail = "" }: AppSidebarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logoutUser(userEmail);
      localStorage.removeItem("userEmail");
      window.location.reload();
      toast({
        title: "Logout successful",
        description: "You have been disconnected from the system",
      });
    } catch (error) {
      toast({
        title: "Error during logout",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  return (
    <Sidebar>
      <SidebarContent className="bg-gradient-to-b from-slate-900 to-slate-800 md:bg-none pt-16 md:pt-16">
        {/* User Profile Section */}
        <SidebarGroup>
          <div className="flex items-center gap-3 p-4">
            <Avatar>
              <AvatarImage src="" alt={userEmail} />
              <AvatarFallback className="bg-blue-600">
                {userEmail.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-slate-200 truncate">
                {userEmail}
              </span>
              <span className="text-xs text-slate-400">
                Active User
              </span>
            </div>
          </div>
        </SidebarGroup>

        {/* Navigation Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-slate-400 font-medium">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    disabled={item.disabled}
                    className={cn(
                      "w-full rounded-lg px-3 py-2.5",
                      "hover:bg-slate-700/50 active:bg-slate-600/50",
                      "transition-colors duration-200"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <item.icon className="h-5 w-5 shrink-0 text-slate-400" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-slate-200 truncate">
                          {item.title}
                        </span>
                        <span className="text-xs text-slate-400 truncate">
                          {item.description}
                        </span>
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* External Links Section */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-4 text-slate-400 font-medium">
            Quick Links
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              {externalLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "w-full rounded-lg px-3 py-2.5",
                      "hover:bg-slate-700/50 active:bg-slate-600/50",
                      "transition-colors duration-200"
                    )}
                  >
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 min-w-0"
                    >
                      <item.icon className="h-5 w-5 shrink-0 text-slate-400" />
                      <span className="text-sm text-slate-200 truncate">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Contact Section */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-4 text-slate-400 font-medium">
            {contactInfo.title}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "w-full rounded-lg px-3 py-2.5",
                    "hover:bg-slate-700/50 active:bg-slate-600/50",
                    "transition-colors duration-200"
                  )}
                >
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-3 min-w-0"
                  >
                    <contactInfo.icon className="h-5 w-5 shrink-0 text-slate-400" />
                    <span className="text-sm text-slate-200 truncate">{contactInfo.email}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Logout Section */}
      <SidebarFooter className="border-t border-slate-700/50 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout}
              className={cn(
                "flex items-center gap-3 w-full rounded-lg px-3 py-2.5",
                "hover:bg-slate-700/50 active:bg-slate-600/50",
                "transition-colors duration-200"
              )}
            >
              <LogOut className="h-5 w-5 shrink-0 text-slate-400" />
              <span className="text-sm text-slate-200">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};