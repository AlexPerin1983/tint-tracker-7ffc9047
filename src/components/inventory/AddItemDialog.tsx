
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
  name: z.string().min(1, "Name is required"),
  category: z.enum(["Window Tinting", "PPF", "Wrap"] as const),
  width: z.number().min(0.01, "Width must be greater than 0"),
  length: z.number().min(0.01, "Length must be greater than 0"),
  quantity: z.number().min(1, "Quantity must be greater than 0"),
  minQuantity: z.number().min(1, "Minimum quantity must be greater than 0"),
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
      minQuantity: 1,
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
        className: "h-[85vh] w-full bg-[#1E293B] border-none p-0 flex flex-col animate-in slide-in-from-bottom duration-500"
      }
    : {
        className: "sm:max-w-[600px] bg-[#1E293B] border-none p-0 flex flex-col h-[90vh] animate-in zoom-in-90 duration-300"
      };

  return (
    <DialogComponent open={open} onOpenChange={onOpenChange}>
      <DialogContentComponent {...contentProps}>
        <DialogHeaderComponent className="p-4 border-b border-slate-700 shrink-0 bg-gradient-to-r from-slate-800 to-slate-700">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-blue-500/10">
              <Plus className="w-4 h-4 text-blue-500" />
            </div>
            <DialogTitleComponent className="text-white text-lg font-semibold group-hover:text-blue-400 transition-colors">
              {mode === "edit" ? "Edit Item" : "Add New Item"}
            </DialogTitleComponent>
          </div>
        </DialogHeaderComponent>

        <div className={cn(
          "flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800",
          isMobile && "max-h-[calc(85vh-8rem)]"
        )}>
          <ItemForm 
            form={form} 
            onSubmit={onSubmit} 
            onOpenChange={onOpenChange}
            mode={mode}
          />
        </div>

        <div className="border-t border-slate-700 p-4 bg-gradient-to-b from-slate-800 to-slate-700 mt-auto shrink-0">
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white hover:scale-105 transition-all duration-300"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              {mode === "edit" ? "Save" : "Add"}
            </Button>
          </div>
        </div>
      </DialogContentComponent>
    </DialogComponent>
  );
}
