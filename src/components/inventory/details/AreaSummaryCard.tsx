
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item } from "@/types/inventory";
import { ChartPieIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface AreaSummaryCardProps {
  item: Item;
  scraps: Item[];
}

export function AreaSummaryCard({ item, scraps }: AreaSummaryCardProps) {
  const { language } = useLanguage();
  
  const calculateTotalArea = () => {
    return item.width * item.length;
  };

  const calculateScrapsArea = () => {
    return scraps.reduce((acc, scrap) => 
      acc + (scrap.width * scrap.length * scrap.quantity), 0
    );
  };

  const calculateConsumedArea = () => {
    return item.consumedArea || 0;
  };

  const totalArea = calculateTotalArea();
  const scrapsArea = calculateScrapsArea();
  const consumedArea = calculateConsumedArea();
  const availableArea = totalArea - consumedArea;

  const formatArea = (area: number) => {
    const squareInches = area * 1550.0031;
    return `${squareInches.toFixed(2)} in² (${area.toFixed(2)}m²)`;
  };
  
  // Traduções para o título e labels
  const getTitleLabel = () => {
    switch (language) {
      case 'pt': return "Resumo de Uso do Material";
      case 'es': return "Resumen de Uso del Material";
      case 'zh': return "材料使用摘要";
      case 'fr': return "Résumé d'Utilisation du Matériau";
      default: return "Material Usage Summary";
    }
  };

  const getLabels = () => {
    switch (language) {
      case 'pt': 
        return {
          totalRollSize: "Tamanho Total do Rolo",
          materialUsed: "Material Utilizado",
          materialAvailable: "Material Disponível",
          remnantSize: "Tamanho do Retalho",
          reference: "referência"
        };
      case 'es': 
        return {
          totalRollSize: "Tamaño Total del Rollo",
          materialUsed: "Material Utilizado",
          materialAvailable: "Material Disponible",
          remnantSize: "Tamaño del Resto",
          reference: "referencia"
        };
      case 'zh': 
        return {
          totalRollSize: "总卷尺寸",
          materialUsed: "已使用材料",
          materialAvailable: "可用材料",
          remnantSize: "剩余尺寸",
          reference: "参考"
        };
      case 'fr': 
        return {
          totalRollSize: "Taille Totale du Rouleau",
          materialUsed: "Matériau Utilisé",
          materialAvailable: "Matériau Disponible",
          remnantSize: "Taille du Reste",
          reference: "référence"
        };
      default: 
        return {
          totalRollSize: "Total Roll Size",
          materialUsed: "Material Used",
          materialAvailable: "Material Available",
          remnantSize: "Remnant Size",
          reference: "reference"
        };
    }
  };

  const labels = getLabels();

  return (
    <Card className="shadow-md border border-muted hover:border-muted/80 transition-colors">
      <CardHeader className="p-4 md:p-6">
        <div className="flex items-center gap-2">
          <ChartPieIcon className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg md:text-xl">{getTitleLabel()}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{labels.totalRollSize}</p>
            <p className="text-lg font-semibold">{formatArea(totalArea)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{labels.materialUsed}</p>
            <p className="text-lg font-semibold">{formatArea(consumedArea)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{labels.materialAvailable}</p>
            <p className="text-lg font-semibold">{formatArea(availableArea)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{labels.remnantSize}</p>
            <p className="text-lg font-semibold text-muted-foreground">
              {formatArea(scrapsArea)} ({labels.reference})
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
