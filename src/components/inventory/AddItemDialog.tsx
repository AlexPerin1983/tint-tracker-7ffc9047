
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

export default function AddItemDialog({ 
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
        className: "h-[100dvh] w-full bg-[#111318] border-none p-0 flex flex-col"
      }
    : {
        className: "sm:max-w-[600px] bg-[#111318] border-none p-0 flex flex-col h-[90vh]"
      };

  return (
    <DialogComponent open={open} onOpenChange={onOpenChange}>
      <DialogContentComponent {...contentProps}>
        <DialogHeaderComponent className="p-3 border-b border-slate-800/50 shrink-0 bg-gradient-to-b from-slate-800 to-[#111318]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-blue-500/10">
              <Plus className="w-3.5 h-3.5 text-blue-500" />
            </div>
            <DialogTitleComponent className="text-white text-base font-medium">
              {mode === "edit" ? "Edit Item" : "Add New Item"}
            </DialogTitleComponent>
          </div>
        </DialogHeaderComponent>

        <div className={cn(
          "flex-1 overflow-y-auto px-3 py-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-[#111318]",
          isMobile && "max-h-[calc(100dvh-7.5rem)]"
        )}>
          <ItemForm 
            form={form} 
            onSubmit={onSubmit} 
            onOpenChange={onOpenChange}
            mode={mode}
          />
        </div>

        <div className="border-t border-slate-800/50 p-3 bg-gradient-to-b from-[#111318] to-slate-800 mt-auto shrink-0">
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-300"
            >
              <X className="w-3.5 h-3.5 mr-1.5" />
              Cancel
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              {mode === "edit" ? "Save" : "Add"}
            </Button>
          </div>
        </div>
      </DialogContentComponent>
    </DialogComponent>
  );
}
