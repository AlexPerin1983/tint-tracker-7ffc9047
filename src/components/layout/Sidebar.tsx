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
  // Aqui você pode pegar os dados do usuário do seu contexto de autenticação
  const userEmail = "usuario@email.com"; // Substitua pelo email real do usuário

  const handleLogout = () => {
    // Implemente a lógica de logout aqui
    console.log("Logout clicked");
  };

  return (
    <Sidebar>
      <SidebarContent>
        {/* Seção 1: Perfil do Usuário */}
        <SidebarGroup>
          <div className="flex items-center gap-3 p-4">
            <Avatar>
              <AvatarImage src="" alt={userEmail} />
              <AvatarFallback>
                {userEmail.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{userEmail}</span>
          </div>
        </SidebarGroup>

        {/* Seção 2: Navegação Principal */}
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Seção 3: Links Externos */}
        <SidebarGroup>
          <SidebarGroupLabel>Links</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {externalLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Seção 4: Logout */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout}
              className="flex items-center gap-2 w-full"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};