import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useItems } from "@/hooks/use-items";
import { formatDate } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const ScrapDetails = () => {
  const { id } = useParams();
  const { items } = useItems();
  const isMobile = useIsMobile();

  const scrap = items.find(item => item.id === id);
  const parentItem = scrap?.originId ? items.find(item => item.id === scrap.originId) : null;

  if (!scrap) return <div>Retalho não encontrado</div>;

  const totalArea = scrap.width * scrap.length;
  const formattedArea = `${totalArea.toFixed(2)}m²`;
  const formattedDimensions = `${scrap.width.toFixed(2)}m x ${scrap.length.toFixed(2)}m`;

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/">
            <Button variant="ghost" size={isMobile ? "sm" : "default"}>
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2" /> Voltar
            </Button>
          </Link>
          <h1 className="text-lg md:text-2xl font-bold">Detalhes do Retalho</h1>
        </div>
        <Button variant="outline" size={isMobile ? "sm" : "default"} onClick={() => {}}>
          <Edit className="w-4 h-4 md:w-5 md:h-5 mr-2" /> Editar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md border border-muted">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl">Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0 space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Código</label>
              <p className="text-sm md:text-base font-medium">{scrap.code}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Nome</label>
              <p className="text-sm md:text-base font-medium">{scrap.name}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Categoria</label>
              <p className="text-sm md:text-base font-medium">{scrap.category}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Dimensões</label>
              <p className="text-sm md:text-base font-medium">{formattedDimensions}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Área Total</label>
              <p className="text-sm md:text-base font-medium">{formattedArea}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border border-muted">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl">Informações de Estoque</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0 space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Quantidade</label>
              <p className="text-sm md:text-base font-medium">{scrap.quantity}</p>
            </div>
            {scrap.observation && (
              <div>
                <label className="text-sm text-muted-foreground">Observação</label>
                <p className="text-sm md:text-base font-medium">{scrap.observation}</p>
              </div>
            )}
            <div>
              <label className="text-sm text-muted-foreground">Data de Cadastro</label>
              <p className="text-sm md:text-base font-medium">{formatDate(scrap.createdAt)}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Última Atualização</label>
              <p className="text-sm md:text-base font-medium">{formatDate(scrap.updatedAt)}</p>
            </div>
          </CardContent>
        </Card>

        {parentItem && (
          <Card className="md:col-span-2 shadow-md border border-muted">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-lg md:text-xl">Item Pai</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-auto">
                  <div>
                    <label className="text-sm text-muted-foreground">Código</label>
                    <p className="text-sm md:text-base font-medium">{parentItem.code}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Nome</label>
                    <p className="text-sm md:text-base font-medium">{parentItem.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Categoria</label>
                    <p className="text-sm md:text-base font-medium">{parentItem.category}</p>
                  </div>
                </div>
                <Link to={`/item/${parentItem.id}`}>
                  <Button variant="outline" size={isMobile ? "sm" : "default"}>
                    Ver Detalhes do Item Pai
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ScrapDetails;