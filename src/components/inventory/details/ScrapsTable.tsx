import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item } from "@/types/inventory";
import { Link } from "react-router-dom";
import { useItems } from "@/hooks/use-items";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

interface ScrapsTableProps {
  scraps: Item[];
  parentItem: Item;
}

export function ScrapsTable({ scraps, parentItem }: ScrapsTableProps) {
  const { deleteItem } = useItems();
  const { toast } = useToast();

  const handleDelete = async (scrapId: string) => {
    try {
      await deleteItem(scrapId);
      toast({
        title: "Sucesso",
        description: "Retalho excluído com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir retalho",
        variant: "destructive",
      });
    }
  };

  const calculateTotalArea = () => {
    return scraps.reduce((acc, scrap) => 
      acc + (scrap.width * scrap.length * scrap.quantity), 0
    );
  };

  const totalArea = calculateTotalArea();
  const parentArea = parentItem.width * parentItem.length;
  const availableArea = parentArea - totalArea;

  return (
    <Card className="shadow-md border border-muted">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-lg md:text-xl">Retalhos Associados</CardTitle>
        <div className="text-sm text-muted-foreground mt-2">
          <p>Área Total do Item: {parentArea.toFixed(2)}m²</p>
          <p>Área Utilizada em Retalhos: {totalArea.toFixed(2)}m²</p>
          <p>Área Disponível: {availableArea.toFixed(2)}m²</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0">
        {scraps.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="rounded-md border border-muted min-w-[600px] md:min-w-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-muted">
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Código
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Dimensões
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Área
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Quantidade
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Observação
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scraps.map((scrap) => (
                    <tr key={scrap.id} className="border-b border-muted">
                      <td className="px-4 py-3 text-sm">
                        <Link 
                          to={`/scrap/${scrap.id}`}
                          className="text-primary hover:underline"
                        >
                          {scrap.code}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {scrap.width.toFixed(2)}m x {scrap.length.toFixed(2)}m
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {(scrap.width * scrap.length).toFixed(2)}m²
                      </td>
                      <td className="px-4 py-3 text-sm">{scrap.quantity}</td>
                      <td className="px-4 py-3 text-sm">
                        {scrap.observation || "-"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Link to={`/scrap/${scrap.id}`}>
                            <Button variant="ghost" size="sm">
                              Ver Detalhes
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(scrap.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-sm md:text-base text-muted-foreground">
            Nenhum retalho associado.
          </p>
        )}
      </CardContent>
    </Card>
  );
}