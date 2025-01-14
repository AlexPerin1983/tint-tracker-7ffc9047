import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item } from "@/types/inventory";
import { formatDate } from "@/lib/utils";

interface StockInfoCardProps {
  item: Item;
}

export function StockInfoCard({ item }: StockInfoCardProps) {
  return (
    <Card className="shadow-md border border-muted">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-lg md:text-xl">Informações de Estoque</CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0 space-y-4">
        <div>
          <label className="text-sm text-muted-foreground">Quantidade Disponível</label>
          <p className="text-sm md:text-base font-medium">{item.quantity}</p>
        </div>
        {item.minQuantity && (
          <div>
            <label className="text-sm text-muted-foreground">Quantidade Mínima</label>
            <p className="text-sm md:text-base font-medium">{item.minQuantity}</p>
          </div>
        )}
        {item.price && (
          <div>
            <label className="text-sm text-muted-foreground">Preço por m²</label>
            <p className="text-sm md:text-base font-medium">
              USD {item.price.toFixed(2)}
            </p>
          </div>
        )}
        <div>
          <label className="text-sm text-muted-foreground">Data de Cadastro</label>
          <p className="text-sm md:text-base font-medium">
            {formatDate(item.createdAt)}
          </p>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Última Atualização</label>
          <p className="text-sm md:text-base font-medium">
            {formatDate(item.updatedAt)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}