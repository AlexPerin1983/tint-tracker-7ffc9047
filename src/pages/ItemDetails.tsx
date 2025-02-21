
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useItems } from "@/hooks/use-items";
import { AddScrapDialog } from "@/components/inventory/AddScrapDialog";
import { BasicInfoCard } from "@/components/inventory/details/BasicInfoCard";
import { StockInfoCard } from "@/components/inventory/details/StockInfoCard";
import { AreaSummaryCard } from "@/components/inventory/details/AreaSummaryCard";
import { ScrapsTable } from "@/components/inventory/details/ScrapsTable";
import { TransactionsTable } from "@/components/inventory/details/TransactionsTable";
import { ConsumptionDialog } from "@/components/inventory/consumption/ConsumptionDialog";
import { useIsMobile } from "@/hooks/use-mobile";

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, transactions } = useItems();
  const [showAddScrap, setShowAddScrap] = useState(false);
  const [showConsumption, setShowConsumption] = useState(false);
  const isMobile = useIsMobile();

  const item = items.find((item) => item.id === id);
  const scraps = items.filter((i) => i.originId === id);
  const itemTransactions = transactions?.filter((t) => t.itemId === id) ?? [];

  if (!item) return <div>Item not found</div>;

  const handleBack = () => {
    navigate('/', { state: { highlightedItemId: id } });
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size={isMobile ? "sm" : "default"} onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 mr-2" /> Back
          </Button>
          <h1 className="text-lg md:text-2xl font-bold">Item Details</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BasicInfoCard item={item} />
        <StockInfoCard item={item} />
      </div>

      <AreaSummaryCard item={item} scraps={scraps} />
      
      <div className="space-y-6">
        <TransactionsTable 
          transactions={itemTransactions} 
          onRecordUsage={() => setShowConsumption(true)} 
        />
        <ScrapsTable 
          scraps={scraps} 
          parentItem={item} 
          onAddScrap={() => setShowAddScrap(true)}
        />
      </div>

      <ConsumptionDialog 
        open={showConsumption} 
        onClose={() => setShowConsumption(false)}
        item={item}
      />

      <AddScrapDialog 
        open={showAddScrap} 
        onOpenChange={setShowAddScrap} 
        parentItemId={item.id}
      />
    </div>
  );
};

export default ItemDetails;
