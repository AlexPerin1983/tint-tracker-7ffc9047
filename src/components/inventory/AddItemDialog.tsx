import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Item, ItemFormData } from "@/types/inventory";
import { useItems } from "@/hooks/use-items";
import { useEffect, useCallback, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import ItemForm from "./form/ItemForm";
import { Plus, X, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  category: z.enum(["Window Tinting", "PPF", "Wrap"] as const),
  width: z.number().min(0.01, "Largura deve ser maior que 0"),
  length: z.number().min(0.01, "Comprimento deve ser maior que 0"),
  quantity: z.number().min(1, "Quantidade deve ser maior que 0"),
  minQuantity: z.number().optional(),
  price: z.number().optional(),
  observation: z.string().optional(),
});

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "add" | "edit";
  itemToEdit?: Item;
}

interface TabStatus {
  basic: boolean;
  dimensions: boolean;
  price: boolean;
}

export function AddItemDialog({ 
  open, 
  onOpenChange, 
  mode = "add",
  itemToEdit 
}: AddItemDialogProps) {
  const { addItem, updateItem } = useItems();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("basic");
  const [tabsStatus, setTabsStatus] = useState<TabStatus>({
    basic: false,
    dimensions: false,
    price: false
  });
  
  const form = useForm<ItemFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "Window Tinting",
      width: 0,
      length: 0,
      quantity: 1,
    },
    mode: "onChange"
  });

  const validateCurrentTab = (tab: string) => {
    switch (tab) {
      case "basic":
        return !form.formState.errors.name && !form.formState.errors.category;
      case "dimensions":
        return !form.formState.errors.width && !form.formState.errors.length && !form.formState.errors.quantity;
      case "price":
        return true; // Campos opcionais
      default:
        return false;
    }
  };

  const updateTabsStatus = useCallback(() => {
    setTabsStatus({
      basic: validateCurrentTab("basic"),
      dimensions: validateCurrentTab("dimensions"),
      price: validateCurrentTab("price")
    });
  }, [form.formState.errors]);

  useEffect(() => {
    updateTabsStatus();
  }, [form.formState.errors, updateTabsStatus]);

  useEffect(() => {
    if (mode === "edit" && itemToEdit) {
      form.reset({
        name: itemToEdit.name,
        category: itemToEdit.category,
        width: itemToEdit.width,
        length: itemToEdit.length,
        quantity: itemToEdit.quantity,
        minQuantity: itemToEdit.minQuantity,
        price: itemToEdit.price,
        observation: itemToEdit.observation,
      });
    } else {
      form.reset({
        name: "",
        category: "Window Tinting",
        width: 0,
        length: 0,
        quantity: 1,
      });
    }
  }, [mode, itemToEdit, form]);

  const handleTabChange = (newTab: string) => {
    const isCurrentTabValid = validateCurrentTab(activeTab);
    
    if (!isCurrentTabValid) {
      toast({
        title: "Campos Obrigatórios",
        description: `Por favor, preencha todos os campos obrigatórios na aba atual antes de prosseguir.`,
        variant: "destructive",
      });
      return;
    }
    
    setActiveTab(newTab);
  };

  const onSubmit = useCallback(async (data: ItemFormData) => {
    const allTabsValid = Object.values(tabsStatus).every(status => status);
    
    if (!allTabsValid) {
      toast({
        title: "Campos Obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios antes de prosseguir.",
        variant: "destructive",
      });
      return;
    }

    if (mode === "edit" && itemToEdit) {
      updateItem({ id: itemToEdit.id, data });
    } else {
      addItem(data);
    }
    onOpenChange(false);
    form.reset();
  }, [mode, itemToEdit, updateItem, addItem, onOpenChange, form, tabsStatus, toast]);

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  const DialogComponent = isMobile ? Sheet : Dialog;
  const DialogContentComponent = isMobile ? SheetContent : DialogContent;
  const DialogHeaderComponent = isMobile ? SheetHeader : DialogHeader;
  const DialogTitleComponent = isMobile ? SheetTitle : DialogTitle;

  const contentProps = isMobile 
    ? { 
        side: "bottom" as const,
        className: "h-[100dvh] w-full bg-[#1E293B] border-none p-0"
      }
    : {
        className: "sm:max-w-[600px] bg-[#1E293B] border-none p-0"
      };

  const isFormValid = Object.values(tabsStatus).every(status => status);

  return (
    <DialogComponent open={open} onOpenChange={onOpenChange}>
      <DialogContentComponent {...contentProps}>
        <DialogHeaderComponent className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-500" />
            <DialogTitleComponent className="text-white text-xl font-semibold">
              {mode === "edit" ? "Editar Item" : "Adicionar Novo Item"}
            </DialogTitleComponent>
          </div>
        </DialogHeaderComponent>

        <div className="px-6 pt-4">
          <div className="flex items-center gap-4 mb-6 text-sm">
            {Object.entries(tabsStatus).map(([tab, status], index) => (
              <div 
                key={tab}
                className={cn(
                  "flex items-center gap-2 cursor-pointer",
                  status ? "text-green-500" : "text-yellow-500"
                )}
                onClick={() => handleTabChange(tab)}
              >
                {status ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                <span>
                  {index + 1}. {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </span>
              </div>
            ))}
          </div>

          {!isFormValid && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Por favor, preencha todos os campos obrigatórios antes de prosseguir.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="px-6 py-4 space-y-8 h-[calc(100vh-280px)] overflow-y-auto">
          <ItemForm 
            form={form} 
            onSubmit={onSubmit} 
            onOpenChange={onOpenChange}
            mode={mode}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>

        <div className="border-t border-slate-700 p-6 bg-[#1E293B] sticky bottom-0">
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              className={cn(
                "text-white",
                isFormValid 
                  ? "bg-blue-500 hover:bg-blue-600" 
                  : "bg-slate-500 cursor-not-allowed"
              )}
              disabled={!isFormValid}
            >
              <Plus className="w-4 h-4 mr-2" />
              {mode === "edit" ? "Salvar" : "Adicionar"}
            </Button>
          </div>
        </div>
      </DialogContentComponent>
    </DialogComponent>
  );
}