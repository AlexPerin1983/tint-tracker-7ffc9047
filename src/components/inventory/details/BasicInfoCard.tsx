import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item } from "@/types/inventory";
import { formatDate } from "@/lib/utils";

interface BasicInfoCardProps {
  item: Item;
}

export function BasicInfoCard({ item }: BasicInfoCardProps) {
  return (
    <Card className="shadow-md border border-muted">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-lg md:text-xl">Informações Básicas</CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0 space-y-4">
        <div>
          <label className="text-sm text-muted-foreground">Código</label>
          <p className="text-sm md:text-base font-medium">{item.code}</p>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Nome</label>
          <p className="text-sm md:text-base font-medium">{item.name}</p>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Categoria</label>
          <p className="text-sm md:text-base font-medium">{item.category}</p>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Dimensões</label>
          <p className="text-sm md:text-base font-medium">
            {item.width.toFixed(2)}m x {item.length.toFixed(2)}m
          </p>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Área Total</label>
          <p className="text-sm md:text-base font-medium">
            {(item.width * item.length).toFixed(2)}m²
          </p>
        </div>
      </CardContent>
    </Card>
  );
}