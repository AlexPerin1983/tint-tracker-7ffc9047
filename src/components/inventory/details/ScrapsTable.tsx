import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item } from "@/types/inventory";
import { useItems } from "@/hooks/use-items";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrapCard } from "./ScrapCard";
import { ScrapTable } from "./ScrapTable";
import { Scissors, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScrapsTableProps {
  scraps: Item[];
  parentItem: Item;
  onAddScrap?: () => void;
}

export function ScrapsTable({ scraps, parentItem, onAddScrap }: ScrapsTableProps) {
  const { deleteItem } = useItems();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleDelete = async (scrapId: string) => {
    try {
      await deleteItem(scrapId);
      toast({
        title: "Success",
        description: "Scrap deleted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error deleting scrap",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-md border border-muted">
      <CardHeader className="p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scissors className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg md:text-xl">Associated Scraps</CardTitle>
          </div>
          {onAddScrap && (
            <Button 
              variant="default"
              onClick={onAddScrap}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5 mr-2" /> 
              Add Scrap
            </Button>
          )}
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
            No associated scraps.
          </p>
        )}
      </CardContent>
    </Card>
  );
}