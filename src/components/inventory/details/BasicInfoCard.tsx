
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item } from "@/types/inventory";
import { Info } from "lucide-react";

interface BasicInfoCardProps {
  item: Item;
}

export function BasicInfoCard({ item }: BasicInfoCardProps) {
  const formatDimensions = (width: number, length: number) => {
    const widthInInches = (width * 39.37).toFixed(2);
    const lengthInInches = (length * 39.37).toFixed(2);
    return `${widthInInches}" x ${lengthInInches}" (${width.toFixed(2)}m x ${length.toFixed(2)}m)`;
  };

  const formatArea = (area: number) => {
    const squareInches = (area * 1550.0031).toFixed(2);
    return `${squareInches} in² (${area.toFixed(2)}m²)`;
  };

  return (
    <Card className="shadow-md border border-muted hover:border-muted/80 transition-colors">
      <CardHeader className="p-4 md:p-6">
        <div className="flex items-start gap-2">
          <Info className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg md:text-xl">Product Information</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0 space-y-4">
        <div>
          <label className="text-sm text-muted-foreground font-medium">SKU</label>
          <p className="text-sm md:text-base font-semibold">{item.code}</p>
        </div>
        <div>
          <label className="text-sm text-muted-foreground font-medium">Product Name</label>
          <p className="text-sm md:text-base font-bold text-blue-500">{item.name}</p>
        </div>
        <div>
          <label className="text-sm text-muted-foreground font-medium">Brand</label>
          <p className="text-sm md:text-base font-semibold">{item.brand}</p>
        </div>
        <div>
          <label className="text-sm text-muted-foreground font-medium">Material Type</label>
          <p className="text-sm md:text-base font-semibold">{item.category}</p>
        </div>
        <div>
          <label className="text-sm text-muted-foreground font-medium">Roll Size</label>
          <p className="text-sm md:text-base font-semibold">
            {formatDimensions(item.width, item.length)}
          </p>
        </div>
        <div>
          <label className="text-sm text-muted-foreground font-medium">Square Footage</label>
          <p className="text-sm md:text-base font-semibold">
            {formatArea(item.width * item.length)}
          </p>
        </div>
        {item.observation && (
          <div>
            <label className="text-sm text-muted-foreground font-medium">Storage Location</label>
            <p className="text-sm md:text-base font-semibold">{item.observation}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
