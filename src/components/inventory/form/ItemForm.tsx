import { Form } from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package2, Ruler, DollarSign } from "lucide-react";
import FormFields from "./FormFields";
import { memo, useState } from "react";
import { cn } from "@/lib/utils";

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
      title: "Basic Info",
      value: "basic",
      icon: Package2,
      description: "Name and category",
    },
    {
      title: "Dimensions",
      value: "dimensions",
      icon: Ruler,
      description: "Size and quantity",
    },
    {
      title: "Price",
      value: "price",
      icon: DollarSign,
      description: "Cost and notes",
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <div className="mb-8">
            <TabsList className="w-full grid grid-cols-3 gap-4 bg-transparent p-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.value;
                
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-700 transition-all duration-200",
                      "data-[state=active]:border-blue-500 data-[state=active]:bg-blue-500/10",
                      "hover:border-blue-500/50 hover:bg-blue-500/5"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-lg transition-colors",
                      isActive ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-400"
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-sm">
                        {tab.title}
                      </div>
                      <div className="text-xs text-slate-400 hidden sm:block">
                        {tab.description}
                      </div>
                    </div>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          <FormFields form={form} activeTab={activeTab} />
        </Tabs>
      </form>
    </Form>
  );
});

ItemForm.displayName = 'ItemForm';

export default ItemForm;