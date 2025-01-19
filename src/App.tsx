import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Index from "./pages/Index";
import ItemDetails from "./pages/ItemDetails";
import ScrapDetails from "./pages/ScrapDetails";
import Landing from "./pages/Landing";
import { validateUser } from "./services/sheets";
import { LoginDialog } from "./components/auth/LoginDialog";

function App() {
  const { data: paymentStatus, isLoading } = useQuery({
    queryKey: ['payment-status'],
    queryFn: async () => {
      return localStorage.getItem('has_access') === 'true';
    }
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const hasAccess = paymentStatus === true;

  const handleLogin = (email: string) => {
    localStorage.setItem('has_access', 'true');
    window.location.href = '/app';
  };

  return (
    <Router>
      <Routes>
        {/* Rota principal - Página de vendas */}
        <Route 
          path="/" 
          element={<Landing />} 
        />
        
        {/* Rota de login */}
        <Route 
          path="/login" 
          element={<LoginDialog onLogin={handleLogin} />} 
        />
        
        {/* Rotas protegidas - Só acessíveis após pagamento */}
        <Route 
          path="/app" 
          element={hasAccess ? <Index /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/items/:id" 
          element={hasAccess ? <ItemDetails /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/scraps/:id" 
          element={hasAccess ? <ScrapDetails /> : <Navigate to="/login" />} 
        />

        {/* Redireciona qualquer outra rota para a landing */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;