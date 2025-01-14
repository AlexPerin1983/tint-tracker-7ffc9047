import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ItemsTable } from "@/components/inventory/ItemsTable";
import { AddItemDialog } from "@/components/inventory/AddItemDialog";
import { AddScrapDialog } from "@/components/inventory/AddScrapDialog";
import { Search, Plus, Scissors } from "lucide-react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddScrap, setShowAddScrap] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative flex-1 w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, código ou categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button onClick={() => setShowAddItem(true)} className="flex-1 md:flex-none">
            <Plus className="mr-2" /> Novo Item
          </Button>
          <Button onClick={() => setShowAddScrap(true)} variant="secondary" className="flex-1 md:flex-none">
            <Scissors className="mr-2" /> Novo Retalho
          </Button>
        </div>
      </div>

      <ItemsTable />
      
      <AddItemDialog open={showAddItem} onOpenChange={setShowAddItem} />
      <AddScrapDialog open={showAddScrap} onOpenChange={setShowAddScrap} />
    </div>
  );
};

export default Index;