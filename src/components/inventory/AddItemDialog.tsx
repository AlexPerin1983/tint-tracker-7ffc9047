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
import { useEffect, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import ItemForm from "./form/ItemForm";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

export function AddItemDialog({ 
  open, 
  onOpenChange, 
  mode = "add",
  itemToEdit 
}: AddItemDialogProps) {
  const { addItem, updateItem } = useItems();
  const isMobile = useIsMobile();
  
  const form = useForm<ItemFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "Window Tinting",
      width: 0,
      length: 0,
      quantity: 1,
    },
  });

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

  const onSubmit = useCallback(async (data: ItemFormData) => {
    if (mode === "edit" && itemToEdit) {
      updateItem({ id: itemToEdit.id, data });
    } else {
      addItem(data);
    }
    onOpenChange(false);
    form.reset();
  }, [mode, itemToEdit, updateItem, addItem, onOpenChange, form]);

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  const isFormValid = !Object.keys(form.formState.errors).length && 
                     form.formState.isDirty;

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

  return (
    <DialogComponent open={open} onOpenChange={onOpenChange}>
      <DialogContentComponent {...contentProps}>
        <DialogHeaderComponent className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Plus className={cn(
              "w-5 h-5",
              mode === "edit" ? "text-yellow-500" : "text-blue-500"
            )} />
            <DialogTitleComponent className="text-white text-xl font-semibold">
              {mode === "edit" ? "Editar Item" : "Adicionar Novo Item"}
            </DialogTitleComponent>
          </div>
        </DialogHeaderComponent>

        <div className="px-6 py-8 space-y-8 h-[calc(100vh-180px)] overflow-y-auto">
          <ItemForm 
            form={form} 
            onSubmit={onSubmit} 
            onOpenChange={onOpenChange}
            mode={mode}
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
              disabled={!isFormValid}
              className={cn(
                "text-white transition-all duration-200",
                isFormValid 
                  ? mode === "edit"
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-blue-500 hover:bg-blue-600"
                  : "bg-slate-600 cursor-not-allowed opacity-50"
              )}
              title={!isFormValid ? "Preencha todos os campos obrigatórios antes de continuar" : ""}
            >
              <Plus className="w-4 h-4 mr-2" />
              {mode === "edit" ? "Salvar Alterações" : "Adicionar Item"}
            </Button>
          </div>
        </div>
      </DialogContentComponent>
    </DialogComponent>
  );
}