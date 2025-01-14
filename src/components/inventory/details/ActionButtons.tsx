import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import { useState } from "react";
import { AddItemDialog } from "../AddItemDialog";
import { Item } from "@/types/inventory";

interface ActionButtonsProps {
  item: Item;
  onAddScrap: () => void;
}

export function ActionButtons({ item, onAddScrap }: ActionButtonsProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-end gap-4 mt-6">
        <Button variant="outline" onClick={() => setEditDialogOpen(true)}>
          <Edit className="w-4 h-4 md:w-5 md:h-5 mr-2" /> Editar
        </Button>
        <Button onClick={onAddScrap}>
          <Plus className="w-4 h-4 md:w-5 md:h-5 mr-2" /> Adicionar Retalho
        </Button>
      </div>

      <AddItemDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        mode="edit"
        itemToEdit={item}
      />
    </>
  );
}