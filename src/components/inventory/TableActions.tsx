import { Eye, Edit, Trash2, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Item } from "@/types/inventory";
import { Link } from "react-router-dom";

interface TableActionsProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
  onQRCode: (item: Item) => void;
}

export function TableActions({ item, onEdit, onDelete, onQRCode }: TableActionsProps) {
  return (
    <div className="space-x-2">
      <Link to={`/${item.type === 'bobina' ? 'item' : 'scrap'}/${item.id}`}>
        <Button variant="ghost" size="icon" title="Ver Detalhes">
          <Eye className="h-4 w-4" />
        </Button>
      </Link>
      <Button 
        variant="ghost" 
        size="icon" 
        title="Editar"
        onClick={() => onEdit(item)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-destructive" 
        title="Excluir"
        onClick={() => onDelete(item.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        title="QR Code"
        onClick={() => onQRCode(item)}
      >
        <QrCode className="h-4 w-4" />
      </Button>
    </div>
  );
}