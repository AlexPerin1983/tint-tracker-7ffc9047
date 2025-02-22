
import { Item } from "@/types/inventory";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Info } from "lucide-react";

interface ItemDetailsProps {
  item: Item;
  dimensions: string;
}

export function ItemDetails({ item, dimensions }: ItemDetailsProps) {
  return (
    <Card className="w-full bg-[#1A1F2C]/50 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/30 transition-colors">
      <CardHeader className="p-2 sm:p-4 flex flex-row items-center gap-2 bg-[#1A1F2C]/95 backdrop-blur-sm">
        <Info className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
        <h3 className="font-semibold text-xs sm:text-sm text-slate-300">Detalhes do Material</h3>
      </CardHeader>
      <CardContent className="p-2 sm:p-4">
        <div className="grid gap-1.5 sm:gap-3">
          <div className="grid grid-cols-2 items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-lg hover:bg-slate-700/20 transition-colors">
            <span className="text-xs text-slate-400 font-medium">Marca</span>
            <span className="text-xs sm:text-sm text-right font-medium text-slate-200">{item.brand}</span>
          </div>
          
          <div className="grid grid-cols-2 items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-lg hover:bg-slate-700/20 transition-colors">
            <span className="text-xs text-slate-400 font-medium">Categoria</span>
            <span className="text-xs sm:text-sm text-right font-medium text-slate-200">{item.category}</span>
          </div>
          
          <div className="grid grid-cols-2 items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-lg hover:bg-slate-700/20 transition-colors">
            <span className="text-xs text-slate-400 font-medium">Dimensões</span>
            <span className="text-xs sm:text-sm text-right font-medium text-slate-200">{dimensions}</span>
          </div>
          
          {item.price && (
            <div className="grid grid-cols-2 items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-lg hover:bg-slate-700/20 transition-colors">
              <span className="text-xs text-slate-400 font-medium">Preço por m²</span>
              <span className="text-xs sm:text-sm text-right font-medium text-green-400">USD {item.price.toFixed(2)}</span>
            </div>
          )}
          
          {item.observation && (
            <div className="grid grid-cols-2 items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-lg hover:bg-slate-700/20 transition-colors">
              <span className="text-xs text-slate-400 font-medium">Localização</span>
              <span className="text-xs sm:text-sm text-right font-medium text-slate-200">{item.observation}</span>
            </div>
          )}
          
          <div className="grid grid-cols-2 items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-lg hover:bg-slate-700/20 transition-colors">
            <span className="text-xs text-slate-400 font-medium">Criado em</span>
            <span className="text-xs sm:text-sm text-right font-medium text-slate-200">{formatDate(item.createdAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
