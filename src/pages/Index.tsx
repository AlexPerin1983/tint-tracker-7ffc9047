
import { useState } from "react";
import { ItemsTable } from "@/components/inventory/ItemsTable";
import AddItemDialog from "@/components/inventory/AddItemDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Index = () => {
  const [showAddItem, setShowAddItem] = useState(false);

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg md:text-2xl font-bold">Inventory</h1>
        <Button onClick={() => setShowAddItem(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      <ItemsTable />

      <AddItemDialog
        open={showAddItem}
        onOpenChange={setShowAddItem}
      />
    </div>
  );
};

export default Index;
