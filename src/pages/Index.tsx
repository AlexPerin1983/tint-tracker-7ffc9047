
import { useState } from "react";
import { ItemsTable } from "@/components/inventory/ItemsTable";
import AddItemDialog from "@/components/inventory/AddItemDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FilterBar } from "@/components/inventory/FilterBar";
import { Filters } from "@/types/inventory";

const Index = () => {
  const [showAddItem, setShowAddItem] = useState(false);
  const { t } = useLanguage();
  
  const [filters, setFilters] = useState<Filters>({
    category: "all",
    name: "",
    minWidth: "",
    maxWidth: "",
    minLength: "",
    maxLength: "",
  });

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      category: "all",
      name: "",
      minWidth: "",
      maxWidth: "",
      minLength: "",
      maxLength: "",
    });
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg md:text-2xl font-bold">{t('nav.inventory')}</h1>
        <Button onClick={() => setShowAddItem(true)}>
          <Plus className="w-4 h-4 mr-2" />
          {t('item.addItem')}
        </Button>
      </div>

      <FilterBar 
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <ItemsTable />

      <AddItemDialog
        open={showAddItem}
        onOpenChange={setShowAddItem}
      />
    </div>
  );
};

export default Index;
