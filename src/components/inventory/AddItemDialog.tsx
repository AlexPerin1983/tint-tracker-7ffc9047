
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
import { useLanguage } from "@/contexts/LanguageContext";

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "add" | "edit";
  itemToEdit?: Item;
}

export default function AddItemDialog({ 
  open, 
  onOpenChange, 
  mode = "add",
  itemToEdit 
}: AddItemDialogProps) {
  const { addItem, updateItem } = useItems();
  const isMobile = useIsMobile();
  const { t, language } = useLanguage();
  
  // Ajuste a validação do formulário com base no idioma
  const getFormSchema = () => {
    const errorMessages = {
      nameRequired: language === 'pt' ? "Nome é obrigatório" : 
                    language === 'es' ? "Nombre es obligatorio" : 
                    "Name is required",
      brandRequired: language === 'pt' ? "Marca é obrigatória" : 
                     language === 'es' ? "Marca es obligatoria" : 
                     "Brand is required",
      widthMin: language === 'pt' ? "Largura deve ser maior que 0" : 
                language === 'es' ? "El ancho debe ser mayor que 0" : 
                "Width must be greater than 0",
      lengthMin: language === 'pt' ? "Comprimento deve ser maior que 0" : 
                 language === 'es' ? "La longitud debe ser mayor que 0" : 
                 "Length must be greater than 0",
      quantityMin: language === 'pt' ? "Quantidade deve ser maior que 0" : 
                   language === 'es' ? "La cantidad debe ser mayor que 0" : 
                   "Quantity must be greater than 0",
      minQuantityMin: language === 'pt' ? "Quantidade mínima deve ser maior que 0" : 
                      language === 'es' ? "La cantidad mínima debe ser mayor que 0" : 
                      "Minimum quantity must be greater than 0",
    };

    return z.object({
      name: z.string().min(1, errorMessages.nameRequired),
      brand: z.string().min(1, errorMessages.brandRequired),
      category: z.enum(["Window Tinting", "PPF", "Wrap"] as const),
      width: z.number().min(0.01, errorMessages.widthMin),
      length: z.number().min(0.01, errorMessages.lengthMin),
      quantity: z.number().min(1, errorMessages.quantityMin),
      minQuantity: z.number().min(1, errorMessages.minQuantityMin),
      price: z.number().optional(),
      observation: z.string().optional(),
    });
  };
  
  const formSchema = getFormSchema();
  
  const form = useForm<ItemFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      brand: "",
      category: "Window Tinting",
      width: 0,
      length: 0,
      quantity: 1,
      minQuantity: 1,
    },
  });

  useEffect(() => {
    if (mode === "edit" && itemToEdit) {
      form.reset({
        name: itemToEdit.name,
        brand: itemToEdit.brand || "",
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
        brand: "",
        category: "Window Tinting",
        width: 0,
        length: 0,
        quantity: 1,
        minQuantity: 1,
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

  const DialogComponent = isMobile ? Sheet : Dialog;
  const DialogContentComponent = isMobile ? SheetContent : DialogContent;
  const DialogHeaderComponent = isMobile ? SheetHeader : DialogHeader;
  const DialogTitleComponent = isMobile ? SheetTitle : DialogTitle;

  const contentProps = isMobile 
    ? { 
        side: "bottom" as const,
        className: "h-[100dvh] w-full bg-[#111318] border-none p-0 flex flex-col overflow-hidden"
      }
    : {
        className: "sm:max-w-[600px] bg-[#111318] border-none p-0 flex flex-col h-[90vh] overflow-hidden"
      };

  // Textos traduzidos
  const getTexts = () => {
    switch (language) {
      case 'pt':
        return {
          addItem: "Adicionar Novo Item",
          editItem: "Editar Item",
          cancel: "Cancelar",
          add: "Adicionar",
          save: "Salvar"
        };
      case 'es':
        return {
          addItem: "Añadir Nuevo Artículo",
          editItem: "Editar Artículo",
          cancel: "Cancelar",
          add: "Añadir",
          save: "Guardar"
        };
      case 'fr':
        return {
          addItem: "Ajouter Nouvel Article",
          editItem: "Modifier l'Article",
          cancel: "Annuler",
          add: "Ajouter",
          save: "Enregistrer"
        };
      default:
        return {
          addItem: "Add New Item",
          editItem: "Edit Item",
          cancel: "Cancel",
          add: "Add",
          save: "Save"
        };
    }
  };
  
  const texts = getTexts();

  return (
    <DialogComponent open={open} onOpenChange={onOpenChange}>
      <DialogContentComponent {...contentProps}>
        <DialogHeaderComponent className="p-4 border-b border-slate-800/50 shrink-0 bg-gradient-to-b from-slate-800 to-[#111318]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-blue-500/10">
              <Plus className="w-4 h-4 text-blue-500" />
            </div>
            <DialogTitleComponent className="text-white text-base font-medium">
              {mode === "edit" ? texts.editItem : texts.addItem}
            </DialogTitleComponent>
          </div>
        </DialogHeaderComponent>

        <div className={cn(
          "flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-[#111318]",
          isMobile && "max-h-[calc(100dvh-8rem)]"
        )}>
          <ItemForm 
            form={form} 
            onSubmit={onSubmit} 
            onOpenChange={onOpenChange}
            mode={mode}
          />
        </div>

        <div className="border-t border-slate-800/50 p-4 bg-gradient-to-b from-[#111318] to-slate-800 mt-auto shrink-0">
          <div className="flex gap-3 justify-between">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1 bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-300"
            >
              <X className="w-4 h-4 mr-2" />
              {texts.cancel}
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="flex-1 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              {mode === "edit" ? texts.save : texts.add}
            </Button>
          </div>
        </div>
      </DialogContentComponent>
    </DialogComponent>
  );
}
