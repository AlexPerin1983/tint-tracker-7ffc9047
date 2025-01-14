import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item } from "@/types/inventory";
import { formatDate } from "@/lib/utils";
import { Database } from "lucide-react";

interface StockInfoCardProps {
  item: Item;
}

export function StockInfoCard({ item }: StockInfoCardProps) {
  return (
    <Card className="shadow-md border border-muted hover:border-muted/80 transition-colors">
      <CardHeader className="p-4 md:p-6">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg md:text-xl">Informações de Estoque</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0 space-y-4">
        <div>
          <label className="text-sm text-muted-foreground font-medium">Quantidade Disponível</label>
          <p className="text-sm md:text-base font-semibold">{item.quantity}</p>
        </div>
        {item.minQuantity && (
          <div>
            <label className="text-sm text-muted-foreground font-medium">Quantidade Mínima</label>
            <p className="text-sm md:text-base font-semibold">{item.minQuantity}</p>
          </div>
        )}
        {item.price && (
          <div>
            <label className="text-sm text-muted-foreground font-medium">Preço por m²</label>
            <p className="text-sm md:text-base font-semibold">
              USD {item.price.toFixed(2)}
            </p>
          </div>
        )}
        <div>
          <label className="text-sm text-muted-foreground font-medium">Data de Cadastro</label>
          <p className="text-sm md:text-base font-semibold">
            {formatDate(item.createdAt)}
          </p>
        </div>
        <div>
          <label className="text-sm text-muted-foreground font-medium">Última Atualização</label>
          <p className="text-sm md:text-base font-semibold">
            {formatDate(item.updatedAt)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}