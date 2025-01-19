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
      title: "Basic",
      value: "basic",
      icon: Package2,
      description: "Name and category",
    },
    {
      title: "Size",
      value: "dimensions",
      icon: Ruler,
      description: "Dimensions",
    },
    {
      title: "Price",
      value: "price",
      icon: DollarSign,
      description: "Cost details",
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-3 gap-1.5 bg-transparent p-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.value;
              
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "group flex flex-col items-center gap-1.5 py-3 px-2",
                    "rounded-lg border border-slate-700/50",
                    "transition-all duration-200",
                    "hover:bg-slate-800/50",
                    "data-[state=active]:border-blue-500/50 data-[state=active]:bg-blue-500/10",
                    "active:scale-95"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg transition-all duration-200",
                    "bg-gradient-to-br shadow-sm",
                    isActive 
                      ? "from-blue-500 to-blue-600 shadow-blue-500/20" 
                      : "from-slate-700 to-slate-800 shadow-slate-900/20"
                  )}>
                    <Icon className={cn(
                      "w-4 h-4",
                      isActive ? "text-white" : "text-slate-400"
                    )} />
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <span className={cn(
                      "text-sm font-medium transition-colors duration-200",
                      isActive ? "text-white" : "text-slate-400"
                    )}>
                      {tab.title}
                    </span>
                    <span className={cn(
                      "text-[10px] text-center transition-colors duration-200",
                      isActive ? "text-blue-200" : "text-slate-500"
                    )}>
                      {tab.description}
                    </span>
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <div className="mt-6 animate-fade-in">
            <FormFields form={form} activeTab={activeTab} />
          </div>
        </Tabs>
      </form>
    </Form>
  );
});

ItemForm.displayName = 'ItemForm';

export default ItemForm;