import { Form } from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package2, Ruler, DollarSign } from "lucide-react";
import FormFields from "./FormFields";
import { memo, useState } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface ItemFormProps {
  form: any;
  onSubmit: (data: any) => void;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
}

const ItemForm = memo(({ form, onSubmit }: ItemFormProps) => {
  const [activeTab, setActiveTab] = useLocalStorage("inventory-form-tab", "basic");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <Package2 className="w-4 h-4" />
              <span className="hidden sm:inline">Basic</span>
            </TabsTrigger>
            <TabsTrigger value="dimensions" className="flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              <span className="hidden sm:inline">Dimensions</span>
            </TabsTrigger>
            <TabsTrigger value="price" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Price</span>
            </TabsTrigger>
          </TabsList>

          <FormFields form={form} activeTab={activeTab} />
        </Tabs>
      </form>
    </Form>
  );
});

ItemForm.displayName = 'ItemForm';

export default ItemForm;