import { Form } from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package2, Ruler, DollarSign } from "lucide-react";
import FormFields from "./FormFields";
import { memo, useState } from "react";

interface ItemFormProps {
  form: any;
  onSubmit: (data: any) => void;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
}

const ItemForm = memo(({ form, onSubmit }: ItemFormProps) => {
  const [activeTab, setActiveTab] = useState("basic");

  const tabs = [
    {
      title: "Basic",
      value: "basic",
      icon: <Package2 className="w-4 h-4" />,
    },
    {
      title: "Dimensions",
      value: "dimensions",
      icon: <Ruler className="w-4 h-4" />,
    },
    {
      title: "Price",
      value: "price",
      icon: <DollarSign className="w-4 h-4" />,
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2"
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <FormFields form={form} activeTab={activeTab} />
        </Tabs>
      </form>
    </Form>
  );
});

ItemForm.displayName = 'ItemForm';

export default ItemForm;