import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(
        "p-0 gap-0 bg-[#1E293B] border-none overflow-hidden",
        isMobile ? "w-full h-[100dvh] rounded-none" : "sm:max-w-[600px] rounded-lg"
      )}>
        <DialogHeader className="p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/20">
                <Plus className="w-5 h-5 text-blue-500" />
              </div>
              <DialogTitle className="text-xl font-semibold text-white">
                {mode === "edit" ? "Edit Item" : "Add New Item"}
              </DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-slate-700/50"
              onClick={handleCancel}
            >
              <X className="w-4 h-4 text-slate-400" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <ItemForm 
              form={form} 
              onSubmit={onSubmit} 
              onOpenChange={onOpenChange}
              mode={mode}
            />
          </div>
        </div>

        <div className="p-6 border-t border-slate-700/50 bg-slate-800/50">
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              {mode === "edit" ? "Save Changes" : "Add Item"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}