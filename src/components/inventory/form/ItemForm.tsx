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
          <TabsList className="w-full grid grid-cols-3 gap-2 bg-transparent p-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.value;
              
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "group relative flex items-center gap-3 p-4 rounded-lg border border-slate-800/50",
                    "transition-all duration-300 ease-in-out",
                    "hover:bg-slate-800/50 hover:border-blue-500/30",
                    "data-[state=active]:border-blue-500 data-[state=active]:bg-gradient-to-br from-blue-500/10 to-blue-600/5",
                    "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left",
                    "after:scale-x-0 after:bg-blue-500 after:transition-transform",
                    "data-[state=active]:after:scale-x-100"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg transition-all duration-300",
                    "bg-gradient-to-br",
                    isActive 
                      ? "from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20" 
                      : "from-slate-800 to-slate-700 text-slate-400 group-hover:from-slate-700 group-hover:to-slate-600"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className={cn(
                      "font-medium transition-colors duration-300",
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
                </TabsTrigger>
              );
            })}
          </TabsList>

          <div className="mt-8">
            <FormFields form={form} activeTab={activeTab} />
          </div>
        </Tabs>
      </form>
    </Form>
  );
});

ItemForm.displayName = 'ItemForm';

export default ItemForm;