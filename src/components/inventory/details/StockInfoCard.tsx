
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item } from "@/types/inventory";
import { formatDate } from "@/lib/utils";
import { Database } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface StockInfoCardProps {
  item: Item;
}

export function StockInfoCard({ item }: StockInfoCardProps) {
  const { language } = useLanguage();
  
  // Traduções para o título e labels
  const getTitleLabel = () => {
    switch (language) {
      case 'pt': return "Informações de Estoque";
      case 'es': return "Información de Stock";
      case 'zh': return "库存信息";
      case 'fr': return "Informations de Stock";
      default: return "Stock Information";
    }
  };

  const getLabels = () => {
    switch (language) {
      case 'pt': 
        return {
          availableQuantity: "Quantidade Disponível",
          minimumQuantity: "Quantidade Mínima",
          price: "Preço por m²",
          creationDate: "Data de Criação",
          lastUpdate: "Última Atualização"
        };
      case 'es': 
        return {
          availableQuantity: "Cantidad Disponible",
          minimumQuantity: "Cantidad Mínima",
          price: "Precio por m²",
          creationDate: "Fecha de Creación",
          lastUpdate: "Última Actualización"
        };
      case 'zh': 
        return {
          availableQuantity: "可用数量",
          minimumQuantity: "最小数量",
          price: "每平方米价格",
          creationDate: "创建日期",
          lastUpdate: "最后更新"
        };
      case 'fr': 
        return {
          availableQuantity: "Quantité Disponible",
          minimumQuantity: "Quantité Minimum",
          price: "Prix par m²",
          creationDate: "Date de Création",
          lastUpdate: "Dernière Mise à Jour"
        };
      default: 
        return {
          availableQuantity: "Available Quantity",
          minimumQuantity: "Minimum Quantity",
          price: "Price per m²",
          creationDate: "Creation Date",
          lastUpdate: "Last Update"
        };
    }
  };

  const labels = getLabels();

  return (
    <Card className="shadow-md border border-muted hover:border-muted/80 transition-colors">
      <CardHeader className="p-4 md:p-6">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg md:text-xl">{getTitleLabel()}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0 space-y-4">
        <div>
          <label className="text-sm text-muted-foreground font-medium">{labels.availableQuantity}</label>
          <p className="text-sm md:text-base font-semibold">{item.quantity}</p>
        </div>
        {item.minQuantity && (
          <div>
            <label className="text-sm text-muted-foreground font-medium">{labels.minimumQuantity}</label>
            <p className="text-sm md:text-base font-semibold">{item.minQuantity}</p>
          </div>
        )}
        {item.price && (
          <div>
            <label className="text-sm text-muted-foreground font-medium">{labels.price}</label>
            <p className="text-sm md:text-base font-semibold">
              USD {item.price.toFixed(2)}
            </p>
          </div>
        )}
        <div>
          <label className="text-sm text-muted-foreground font-medium">{labels.creationDate}</label>
          <p className="text-sm md:text-base font-semibold">
            {formatDate(item.createdAt)}
          </p>
        </div>
        <div>
          <label className="text-sm text-muted-foreground font-medium">{labels.lastUpdate}</label>
          <p className="text-sm md:text-base font-semibold">
            {formatDate(item.updatedAt)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
