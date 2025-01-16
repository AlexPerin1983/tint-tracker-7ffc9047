import { Home, Box, Scissors, LogOut, ExternalLink } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

const navigationItems = [
  { title: "Dashboard", icon: Home, url: "/" },
  { title: "Bobinas", icon: Box, url: "/rolls" },
  { title: "Retalhos", icon: Scissors, url: "/scraps" },
];

const externalLinks = [
  {
    title: "Los_Pelikooss",
    url: "https://fumejp.com.br/los-pelikooss/",
    icon: ExternalLink,
  },
];

export const AppSidebar = () => {
  const userEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    // Limpa os dados do usuário
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userStatus');
    
    // Mostra mensagem de sucesso
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    });

    // Redireciona para a página inicial
    window.location.reload();
  };

  if (!userEmail) {
    return null;
  }

  return (
    <Sidebar>
      <SidebarContent className="bg-gradient-to-b from-slate-900 to-slate-800 md:bg-none">
        {/* Seção 1: Perfil do Usuário */}
        <SidebarGroup>
          <div className="flex items-center gap-3 p-6 border-b border-slate-700/50">
            <Avatar>
              <AvatarImage src="" alt={userEmail} />
              <AvatarFallback className="bg-blue-600">
                {userEmail.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-slate-200">{userEmail}</span>
          </div>
        </SidebarGroup>

        {/* Seção 2: Navegação Principal */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-6 text-slate-400 font-semibold">
            Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-3">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "w-full rounded-lg px-3 py-2.5",
                      "hover:bg-slate-700/50 active:bg-slate-600/50",
                      "transition-colors duration-200"
                    )}
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-slate-400" />
                      <span className="text-slate-200">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Seção 3: Links Externos */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="px-6 text-slate-400 font-semibold">
            Links
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-3">
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
                      className="flex items-center gap-3"
                    >
                      <item.icon className="h-5 w-5 text-slate-400" />
                      <span className="text-slate-200">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Seção 4: Logout */}
      <SidebarFooter className="border-t border-slate-700/50 p-4">
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
              <LogOut className="h-5 w-5 text-slate-400" />
              <span className="text-slate-200">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};