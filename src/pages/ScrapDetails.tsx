import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useItems } from "@/hooks/use-items";
import { formatDate } from "@/lib/utils";

const ScrapDetails = () => {
  const { id } = useParams();
  const { items } = useItems();

  const scrap = items.find(item => item.id === id);
  const parentItem = scrap?.originId ? items.find(item => item.id === scrap.originId) : null;

  if (!scrap) return <div>Retalho não encontrado</div>;

  const totalArea = scrap.width * scrap.length;
  const formattedArea = `${totalArea.toFixed(2)}m²`;
  const formattedDimensions = `${scrap.width.toFixed(2)}m x ${scrap.length.toFixed(2)}m`;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="mr-2" /> Voltar
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Detalhes do Retalho</h1>
        </div>
        <Button variant="outline" onClick={() => {}}>
          <Edit className="mr-2" /> Editar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Código</label>
              <p className="font-medium">{scrap.code}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Nome</label>
              <p className="font-medium">{scrap.name}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Categoria</label>
              <p className="font-medium">{scrap.category}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Dimensões</label>
              <p className="font-medium">{formattedDimensions}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Área Total</label>
              <p className="font-medium">{formattedArea}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações de Estoque</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Quantidade</label>
              <p className="font-medium">{scrap.quantity}</p>
            </div>
            {scrap.observation && (
              <div>
                <label className="text-sm text-muted-foreground">Observação</label>
                <p className="font-medium">{scrap.observation}</p>
              </div>
            )}
            <div>
              <label className="text-sm text-muted-foreground">Data de Cadastro</label>
              <p className="font-medium">{formatDate(scrap.createdAt)}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Última Atualização</label>
              <p className="font-medium">{formatDate(scrap.updatedAt)}</p>
            </div>
          </CardContent>
        </Card>

        {parentItem && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Item Pai</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Código</p>
                  <p className="font-medium">{parentItem.code}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nome</p>
                  <p className="font-medium">{parentItem.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Categoria</p>
                  <p className="font-medium">{parentItem.category}</p>
                </div>
                <Link to={`/item/${parentItem.id}`}>
                  <Button variant="outline" size="sm">
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