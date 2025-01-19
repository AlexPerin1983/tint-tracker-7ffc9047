import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Index from "./pages/Index";
import ItemDetails from "./pages/ItemDetails";
import ScrapDetails from "./pages/ScrapDetails";
import Landing from "./pages/Landing";

function App() {
  const { data: paymentStatus, isLoading } = useQuery({
    queryKey: ['payment-status'],
    queryFn: async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get('session_id');
      
      // Se tiver um session_id, verifica o status do pagamento
      if (sessionId) {
        try {
          const response = await fetch(`/api/verify-payment?session_id=${sessionId}`);
          const data = await response.json();
          
          if (data.success) {
            // Salva no localStorage que o usuário tem acesso
            localStorage.setItem('has_access', 'true');
            return true;
          }
        } catch (error) {
          console.error('Erro ao verificar pagamento:', error);
        }
      }
      
      // Verifica se já tem acesso salvo
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
        <Route 
          path="/" 
          element={hasAccess ? <Navigate to="/app" /> : <Landing />} 
        />
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
      </Routes>
    </Router>
  );
}

export default App;