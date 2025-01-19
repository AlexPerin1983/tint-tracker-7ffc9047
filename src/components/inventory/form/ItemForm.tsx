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
          <TabsList className="w-full flex bg-transparent p-0 mb-8">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.value;
              
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "group relative flex-1 py-6 px-8",
                    "border-b-2 border-slate-700/50",
                    "transition-all duration-300 ease-in-out",
                    "hover:bg-slate-800/30",
                    "data-[state=active]:border-blue-500",
                    "first:rounded-tl-xl last:rounded-tr-xl",
                    index !== tabs.length - 1 && "border-r border-r-slate-700/50"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-3 rounded-xl transition-all duration-300",
                      "bg-gradient-to-br shadow-lg",
                      isActive 
                        ? "from-blue-500 to-blue-600 shadow-blue-500/20" 
                        : "from-slate-700 to-slate-800 shadow-slate-900/20 group-hover:from-slate-600"
                    )}>
                      <Icon className={cn(
                        "w-5 h-5 transition-colors duration-300",
                        isActive ? "text-white" : "text-slate-400 group-hover:text-slate-300"
                      )} />
                    </div>
                    <div className="flex flex-col items-start">
                      <div className={cn(
                        "font-semibold transition-colors duration-300",
                        isActive ? "text-white" : "text-slate-400 group-hover:text-slate-300"
                      )}>
                        {tab.title}
                      </div>
                      <div className={cn(
                        "text-xs transition-colors duration-300",
                        isActive ? "text-blue-200" : "text-slate-500 group-hover:text-slate-400"
                      )}>
                        {tab.description}
                      </div>
                    </div>
                  </div>
                  <div className={cn(
                    "absolute bottom-0 left-0 w-full h-0.5 bg-blue-500",
                    "transform scale-x-0 transition-transform duration-300",
                    isActive && "scale-x-100"
                  )} />
                </TabsTrigger>
              );
            })}
          </TabsList>

          <div className="mt-8 animate-fade-in">
            <FormFields form={form} activeTab={activeTab} />
          </div>
        </Tabs>
      </form>
    </Form>
  );
});

ItemForm.displayName = 'ItemForm';

export default ItemForm;