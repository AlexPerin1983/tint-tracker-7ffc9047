import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item } from "@/types/inventory";
import { useItems } from "@/hooks/use-items";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrapCard } from "./ScrapCard";
import { ScrapTable } from "./ScrapTable";
import { Scissors } from "lucide-react";

interface ScrapsTableProps {
  scraps: Item[];
  parentItem: Item;
}

export function ScrapsTable({ scraps, parentItem }: ScrapsTableProps) {
  const { deleteItem } = useItems();
  const { toast } = useToast();
  const isMobile = useIsMobile();

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

  return (
    <Card className="shadow-md border border-muted">
      <CardHeader className="p-4 md:p-6">
        <div className="flex items-center gap-2">
          <Scissors className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg md:text-xl">Retalhos Associados</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0">
        {scraps.length > 0 ? (
          isMobile ? (
            <div className="space-y-4">
              {scraps.map((scrap) => (
                <ScrapCard
                  key={scrap.id}
                  scrap={scrap}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <ScrapTable scraps={scraps} onDelete={handleDelete} />
          )
        ) : (
          <p className="text-sm md:text-base text-muted-foreground">
            Nenhum retalho associado.
          </p>
        )}
      </CardContent>
    </Card>
  );
}