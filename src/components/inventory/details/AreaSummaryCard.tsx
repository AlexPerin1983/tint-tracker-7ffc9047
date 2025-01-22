import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item } from "@/types/inventory";
import { ChartPieIcon } from "lucide-react";

interface AreaSummaryCardProps {
  item: Item;
  scraps: Item[];
}

export function AreaSummaryCard({ item, scraps }: AreaSummaryCardProps) {
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

  return (
    <Card className="shadow-md border border-muted hover:border-muted/80 transition-colors">
      <CardHeader className="p-4 md:p-6">
        <div className="flex items-center gap-2">
          <ChartPieIcon className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg md:text-xl">Square Footage Summary</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Square Footage</p>
            <p className="text-lg font-semibold">{totalArea.toFixed(2)}m²</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Used Square Footage</p>
            <p className="text-lg font-semibold">{consumedArea.toFixed(2)}m²</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Available Square Footage</p>
            <p className="text-lg font-semibold">{availableArea.toFixed(2)}m²</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Scrap Square Footage</p>
            <p className="text-lg font-semibold text-muted-foreground">
              {scrapsArea.toFixed(2)}m² (reference)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}