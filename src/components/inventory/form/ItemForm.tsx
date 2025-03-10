
import { Form } from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package2, Ruler, DollarSign } from "lucide-react";
import FormFields from "./FormFields";
import { memo, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ItemFormProps {
  form: any;
  onSubmit: (data: any) => void;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
}

const ItemForm = memo(({
  form,
  onSubmit
}: ItemFormProps) => {
  const [activeTab, setActiveTab] = useState("basic");
  const { language } = useLanguage();
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previne a submissão automática
  };
  
  // Obter rótulos localizados para as abas
  const getTabLabels = () => {
    switch (language) {
      case 'pt':
        return {
          basic: "Básico",
          dimensions: "Dimensões",
          price: "Preço"
        };
      case 'es':
        return {
          basic: "Básico",
          dimensions: "Dimensiones",
          price: "Precio"
        };
      case 'zh':
        return {
          basic: "基本",
          dimensions: "尺寸",
          price: "价格"
        };
      case 'fr':
        return {
          basic: "Basique",
          dimensions: "Dimensions",
          price: "Prix"
        };
      default:
        return {
          basic: "Basic",
          dimensions: "Dimensions",
          price: "Price"
        };
    }
  };
  
  const labels = getTabLabels();
  
  return <Form {...form}>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="basic" className="flex items-center gap-2 text-blue-500">
              <Package2 className="w-4 h-4" />
              <span className="hidden sm:inline">{labels.basic}</span>
            </TabsTrigger>
            <TabsTrigger value="dimensions" className="flex items-center gap-2 text-blue-500 bg-transparent">
              <Ruler className="w-4 h-4" />
              <span className="hidden sm:inline">{labels.dimensions}</span>
            </TabsTrigger>
            <TabsTrigger value="price" className="flex items-center gap-2 text-blue-500">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">{labels.price}</span>
            </TabsTrigger>
          </TabsList>

          <FormFields form={form} activeTab={activeTab} />
        </Tabs>
      </form>
    </Form>;
});

ItemForm.displayName = 'ItemForm';
export default ItemForm;
