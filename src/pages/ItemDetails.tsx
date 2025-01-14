import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useItems } from "@/hooks/use-items";
import { formatDate } from "@/lib/utils";
import { AddScrapDialog } from "@/components/inventory/AddScrapDialog";
import { useState } from "react";

const ItemDetails = () => {
  const { id } = useParams();
  const { items } = useItems();
  const [showAddScrap, setShowAddScrap] = useState(false);

  const item = items.find(item => item.id === id);
  const scraps = items.filter(i => i.originId === id);

  if (!item) return <div>Item não encontrado</div>;

  const totalArea = item.width * item.length;
  const formattedArea = `${totalArea.toFixed(2)}m²`;
  const formattedDimensions = `${item.width.toFixed(2)}m x ${item.length.toFixed(2)}m`;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="mr-2" /> Voltar
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Detalhes do Item</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => {}}>
            <Edit className="mr-2" /> Editar
          </Button>
          <Button onClick={() => setShowAddScrap(true)}>
            <Plus className="mr-2" /> Adicionar Retalho
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Código</label>
              <p className="font-medium">{item.code}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Nome</label>
              <p className="font-medium">{item.name}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Categoria</label>
              <p className="font-medium">{item.category}</p>
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
              <label className="text-sm text-muted-foreground">Quantidade Disponível</label>
              <p className="font-medium">{item.quantity}</p>
            </div>
            {item.minQuantity && (
              <div>
                <label className="text-sm text-muted-foreground">Quantidade Mínima</label>
                <p className="font-medium">{item.minQuantity}</p>
              </div>
            )}
            {item.price && (
              <div>
                <label className="text-sm text-muted-foreground">Preço por m²</label>
                <p className="font-medium">USD {item.price.toFixed(2)}</p>
              </div>
            )}
            <div>
              <label className="text-sm text-muted-foreground">Data de Cadastro</label>
              <p className="font-medium">{formatDate(item.createdAt)}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Última Atualização</label>
              <p className="font-medium">{formatDate(item.updatedAt)}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Retalhos Associados</CardTitle>
          </CardHeader>
          <CardContent>
            {scraps.length > 0 ? (
              <div className="rounded-md border border-muted">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-muted">
                      <th className="px-4 py-2 text-left">Código</th>
                      <th className="px-4 py-2 text-left">Dimensões</th>
                      <th className="px-4 py-2 text-left">Quantidade</th>
                      <th className="px-4 py-2 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scraps.map(scrap => (
                      <tr key={scrap.id} className="border-b border-muted">
                        <td className="px-4 py-2">{scrap.code}</td>
                        <td className="px-4 py-2">
                          {scrap.width.toFixed(2)}m x {scrap.length.toFixed(2)}m
                        </td>
                        <td className="px-4 py-2">{scrap.quantity}</td>
                        <td className="px-4 py-2 text-right">
                          <Link to={`/scrap/${scrap.id}`}>
                            <Button variant="ghost" size="sm">
                              Ver Detalhes
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground">Nenhum retalho associado.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <AddScrapDialog open={showAddScrap} onOpenChange={setShowAddScrap} />
    </div>
  );
};

export default ItemDetails;