
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import { Item } from "@/types/inventory";

interface ItemActionsProps {
  item: Item;
  onEditClick: (item: Item) => void;
  onQRCodeClick: (item: Item) => void;
  onDeleteClick: (id: string) => void;
}

export function ItemActions({ item, onEditClick, onQRCodeClick, onDeleteClick }: ItemActionsProps) {
  return (
    <div className="flex items-center justify-end space-x-2">
      <Link to={`/${item.type === 'bobina' ? 'item' : 'scrap'}/${item.id}`}>
        <Button variant="ghost" size="icon" title="View Details">
          <Eye className="h-4 w-4" />
        </Button>
      </Link>
      <Button 
        variant="ghost" 
        size="icon" 
        title="Edit"
        onClick={() => onEditClick(item)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-destructive" 
        title="Delete"
        onClick={() => onDeleteClick(item.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        title="QR Code"
        onClick={() => onQRCodeClick(item)}
      >
        <QrCode className="h-4 w-4" />
      </Button>
    </div>
  );
}
