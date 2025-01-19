import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item } from "@/types/inventory";
import { useItems } from "@/hooks/use-items";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrapCard } from "./ScrapCard";
import { ScrapTable } from "./ScrapTable";
import { Scissors, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

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
            <div className="grid grid-cols-1 gap-4">
              {scraps.map((scrap) => (
                <div 
                  key={scrap.id}
                  className="bg-muted/20 p-4 rounded-lg space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-primary">
                        Code: {scrap.code}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Dimensions: {scrap.width.toFixed(2)}m x {scrap.length.toFixed(2)}m
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Area: {(scrap.width * scrap.length).toFixed(2)}m²
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {scrap.quantity}
                      </p>
                      {scrap.observation && (
                        <p className="text-sm text-muted-foreground">
                          Observation: {scrap.observation}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(scrap.id)}
                      className="text-destructive hover:text-destructive/90"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Link to={`/scrap/${scrap.id}`}>
                    <Button variant="secondary" size="sm" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
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
