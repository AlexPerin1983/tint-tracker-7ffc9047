import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useItems } from "@/hooks/use-items";
import { formatDate } from "@/lib/utils";
import { AddScrapDialog } from "@/components/inventory/AddScrapDialog";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const ItemDetails = () => {
  const { id } = useParams();
  const { items } = useItems();
  const [showAddScrap, setShowAddScrap] = useState(false);
  const isMobile = useIsMobile();

  const item = items.find(item => item.id === id);
  const scraps = items.filter(i => i.originId === id);

  if (!item) return <div>Item não encontrado</div>;

  const totalArea = item.width * item.length;
  const formattedArea = `${totalArea.toFixed(2)}m²`;
  const formattedDimensions = `${item.width.toFixed(2)}m x ${item.length.toFixed(2)}m`;

  return (
    <div className="container mx-auto px-4 md:px-8 py-4 md:py-8 space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md:mb-6">
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/">
            <Button variant="ghost" size={isMobile ? "sm" : "default"}>
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2" /> Voltar
            </Button>
          </Link>
          <h1 className="text-lg md:text-2xl font-bold">Detalhes do Item</h1>
        </div>
        <div className="flex gap-2 md:gap-4">
          <Button variant="outline" size={isMobile ? "sm" : "default"} onClick={() => {}}>
            <Edit className="w-4 h-4 md:w-5 md:h-5 mr-2" /> Editar
          </Button>
          <Button size={isMobile ? "sm" : "default"} onClick={() => setShowAddScrap(true)}>
            <Plus className="w-4 h-4 md:w-5 md:h-5 mr-2" /> Adicionar Retalho
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl">Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0 space-y-3 md:space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Código</label>
              <p className="font-medium text-sm md:text-base">{item.code}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Nome</label>
              <p className="font-medium text-sm md:text-base">{item.name}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Categoria</label>
              <p className="font-medium text-sm md:text-base">{item.category}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Dimensões</label>
              <p className="font-medium text-sm md:text-base">{formattedDimensions}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Área Total</label>
              <p className="font-medium text-sm md:text-base">{formattedArea}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl">Informações de Estoque</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0 space-y-3 md:space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Quantidade Disponível</label>
              <p className="font-medium text-sm md:text-base">{item.quantity}</p>
            </div>
            {item.minQuantity && (
              <div>
                <label className="text-sm text-muted-foreground">Quantidade Mínima</label>
                <p className="font-medium text-sm md:text-base">{item.minQuantity}</p>
              </div>
            )}
            {item.price && (
              <div>
                <label className="text-sm text-muted-foreground">Preço por m²</label>
                <p className="font-medium text-sm md:text-base">USD {item.price.toFixed(2)}</p>
              </div>
            )}
            <div>
              <label className="text-sm text-muted-foreground">Data de Cadastro</label>
              <p className="font-medium text-sm md:text-base">{formatDate(item.createdAt)}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Última Atualização</label>
              <p className="font-medium text-sm md:text-base">{formatDate(item.updatedAt)}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl">Retalhos Associados</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            {scraps.length > 0 ? (
              <div className="overflow-x-auto">
                <div className="rounded-md border border-muted min-w-[600px] md:min-w-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-muted">
                        <th className="px-3 md:px-4 py-2 text-left text-sm md:text-base">Código</th>
                        <th className="px-3 md:px-4 py-2 text-left text-sm md:text-base">Dimensões</th>
                        <th className="px-3 md:px-4 py-2 text-left text-sm md:text-base">Quantidade</th>
                        <th className="px-3 md:px-4 py-2 text-right text-sm md:text-base">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scraps.map(scrap => (
                        <tr key={scrap.id} className="border-b border-muted">
                          <td className="px-3 md:px-4 py-2 text-sm md:text-base">{scrap.code}</td>
                          <td className="px-3 md:px-4 py-2 text-sm md:text-base">
                            {scrap.width.toFixed(2)}m x {scrap.length.toFixed(2)}m
                          </td>
                          <td className="px-3 md:px-4 py-2 text-sm md:text-base">{scrap.quantity}</td>
                          <td className="px-3 md:px-4 py-2 text-right">
                            <Link to={`/scrap/${scrap.id}`}>
                              <Button variant="ghost" size={isMobile ? "sm" : "default"}>
                                Ver Detalhes
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm md:text-base">Nenhum retalho associado.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <AddScrapDialog open={showAddScrap} onOpenChange={setShowAddScrap} />
    </div>
  );
};

export default ItemDetails;