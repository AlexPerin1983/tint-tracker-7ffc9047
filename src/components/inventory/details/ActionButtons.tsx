import { Button } from "@/components/ui/button";
import { Edit, Plus, Scissors } from "lucide-react";
import { useState } from "react";
import { AddItemDialog } from "../AddItemDialog";
import { ConsumptionDialog } from "../consumption/ConsumptionDialog";
import { Item } from "@/types/inventory";

interface ActionButtonsProps {
  item: Item;
  onAddScrap: () => void;
}

export function ActionButtons({ item, onAddScrap }: ActionButtonsProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [consumptionDialogOpen, setConsumptionDialogOpen] = useState(false);

  const handleConsumptionClick = () => {
    console.log("Opening consumption dialog");
    setConsumptionDialogOpen(true);
  };

  const handleAddScrapClick = () => {
    console.log("Opening scrap dialog");
    onAddScrap();
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-end gap-4 mt-6">
        <Button 
          variant="outline" 
          onClick={() => setEditDialogOpen(true)}
          className="hover:bg-muted/50"
        >
          <Edit className="w-4 h-4 md:w-5 md:h-5 mr-2" /> 
          Edit
        </Button>
        <Button 
          variant="default"
          onClick={handleConsumptionClick}
          className="bg-primary hover:bg-primary/90"
        >
          <Scissors className="w-4 h-4 md:w-5 md:h-5 mr-2" /> 
          Record Usage
        </Button>
        <Button 
          variant="outline"
          onClick={handleAddScrapClick}
          className="hover:bg-muted/50"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5 mr-2" /> 
          Add Scrap
        </Button>
      </div>

      <AddItemDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        mode="edit"
        itemToEdit={item}
      />

      <ConsumptionDialog
        open={consumptionDialogOpen}
        onOpenChange={setConsumptionDialogOpen}
        item={item}
      />
    </>
  );
}