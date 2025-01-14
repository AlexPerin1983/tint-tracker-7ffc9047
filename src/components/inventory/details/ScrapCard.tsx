import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Item } from "@/types/inventory";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

interface ScrapCardProps {
  scrap: Item;
  onDelete: (id: string) => void;
}

export function ScrapCard({ scrap, onDelete }: ScrapCardProps) {
  return (
    <Card key={scrap.id} className="bg-card border border-muted">
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <Link 
            to={`/scrap/${scrap.id}`}
            className="text-primary hover:underline font-medium"
          >
            {scrap.code}
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(scrap.id)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
        <div className="space-y-1 text-sm">
          <p className="text-muted-foreground">
            Dimensões: {scrap.width.toFixed(2)}m x {scrap.length.toFixed(2)}m
          </p>
          <p className="text-muted-foreground">
            Área: {(scrap.width * scrap.length).toFixed(2)}m²
          </p>
          <p className="text-muted-foreground">
            Quantidade: {scrap.quantity}
          </p>
          {scrap.observation && (
            <p className="text-muted-foreground">
              Observação: {scrap.observation}
            </p>
          )}
        </div>
        <Link to={`/scrap/${scrap.id}`}>
          <Button variant="secondary" size="sm" className="w-full">
            Ver Detalhes
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}