
import { useState } from "react";
import { ItemsTable } from "@/components/inventory/ItemsTable";
import AddItemDialog from "@/components/inventory/AddItemDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const [showAddItem, setShowAddItem] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg md:text-2xl font-bold">{t('nav.inventory')}</h1>
        <Button onClick={() => setShowAddItem(true)}>
          <Plus className="w-4 h-4 mr-2" />
          {t('item.addItem')}
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
