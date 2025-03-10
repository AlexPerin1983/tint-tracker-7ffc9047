
import { Form } from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package2, Ruler, DollarSign } from "lucide-react";
import FormFields from "./FormFields";
import { memo, useState } from "react";
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
  const { t } = useLanguage();
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previne a submissão automática
  };
  
  return <Form {...form}>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="basic" className="flex items-center gap-2 text-blue-500">
              <Package2 className="w-4 h-4" />
              <span className="hidden sm:inline">Básico</span>
            </TabsTrigger>
            <TabsTrigger value="dimensions" className="flex items-center gap-2 text-blue-500 bg-transparent">
              <Ruler className="w-4 h-4" />
              <span className="hidden sm:inline">Dimensões</span>
            </TabsTrigger>
            <TabsTrigger value="price" className="flex items-center gap-2 text-blue-500">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Preço</span>
            </TabsTrigger>
          </TabsList>

          <FormFields form={form} activeTab={activeTab} />
        </Tabs>
      </form>
    </Form>;
});

ItemForm.displayName = 'ItemForm';
export default ItemForm;
