import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Index from "./pages/Index";
import ItemDetails from "./pages/ItemDetails";
import ScrapDetails from "./pages/ScrapDetails";
import Landing from "./pages/Landing";
import { validateUser } from "./services/sheets";

function App() {
  const { data: paymentStatus, isLoading } = useQuery({
    queryKey: ['payment-status'],
    queryFn: async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const customerEmail = urlParams.get('customer_email');
      
      if (customerEmail) {
        try {
          const { isValid } = await validateUser(customerEmail);
          
          if (isValid) {
            localStorage.setItem('has_access', 'true');
            return true;
          }
        } catch (error) {
          console.error('Erro ao verificar acesso:', error);
        }
      }
      
      return localStorage.getItem('has_access') === 'true';
    }
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const hasAccess = paymentStatus === true;

  return (
    <Router>
      <Routes>
        {/* Rota principal - Página de vendas */}
        <Route 
          path="/" 
          element={<Landing />} 
        />
        
        {/* Rotas protegidas - Só acessíveis após pagamento */}
        <Route 
          path="/app" 
          element={hasAccess ? <Index /> : <Navigate to="/" />} 
        />
        <Route 
          path="/items/:id" 
          element={hasAccess ? <ItemDetails /> : <Navigate to="/" />} 
        />
        <Route 
          path="/scraps/:id" 
          element={hasAccess ? <ScrapDetails /> : <Navigate to="/" />} 
        />

        {/* Redireciona qualquer outra rota para a landing */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;