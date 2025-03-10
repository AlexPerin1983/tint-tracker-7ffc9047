
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ScrapFormData, Item } from "@/types/inventory";
import { useItems } from "@/hooks/use-items";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Scissors } from "lucide-react";
import DimensionsFields from "./form/DimensionsFields";
import { Textarea } from "@/components/ui/textarea";

interface AddScrapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parentItemId: string;
  editingScrap?: Item;
}

export function AddScrapDialog({
  open,
  onOpenChange,
  parentItemId,
  editingScrap
}: AddScrapDialogProps) {
  const { addScrap, items, refetchItems } = useItems();
  const { toast } = useToast();
  const parentItem = items.find(item => item.id === parentItemId);
  const existingScraps = items.filter(item => item.originId === parentItemId);

  const formSchema = z.object({
    width: z.number().min(0.01, "Width must be greater than 0").max(parentItem?.width || 0, `Maximum width is ${parentItem?.width}m`),
    length: z.number().min(0.01, "Length must be greater than 0").max(parentItem?.length || 0, `Maximum length is ${parentItem?.length}m`),
    observation: z.string().optional()
  });

  const form = useForm<ScrapFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      width: editingScrap?.width || 0,
      length: editingScrap?.length || 0,
      observation: editingScrap?.observation || ""
    }
  });

  // Atualiza os valores do formulário quando editingScrap muda
  useEffect(() => {
    if (editingScrap) {
      form.reset({
        width: editingScrap.width,
        length: editingScrap.length,
        observation: editingScrap.observation || ""
      });
    }
  }, [editingScrap, form]);

  const onSubmit = async (data: ScrapFormData) => {
    if (!parentItem) {
      toast({
        title: "Error",
        description: "Parent item not found",
        variant: "destructive"
      });
      return;
    }

    const totalScrapArea = existingScraps.filter(scrap => scrap.id !== editingScrap?.id).reduce((acc, scrap) => acc + scrap.width * scrap.length, 0);
    const newScrapArea = data.width * data.length;
    const parentArea = parentItem.width * parentItem.length;

    if (totalScrapArea + newScrapArea > parentArea) {
      toast({
        title: "Error",
        description: "Total scrap area exceeds available parent item area",
        variant: "destructive"
      });
      return;
    }

    try {
      await addScrap({
        ...data,
        quantity: 1,
        originId: parentItemId,
        id: editingScrap?.id
      });
      await refetchItems();
      toast({
        title: "Success",
        description: "Retalho criado com sucesso!"
      });
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error adding scrap",
        variant: "destructive"
      });
    }
  };

  if (!parentItem) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-[425px] bg-[#111318] border-none p-0 flex flex-col h-[100vh] sm:h-auto sm:max-h-[100vh]">
        <DialogHeader className="p-4 border-b border-slate-800/50 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-blue-500/10">
              <Scissors className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-white">
                {editingScrap ? "Editar Retalho" : "Adicionar Novo Retalho"}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-[#111318] max-h-[calc(100vh-12rem)] sm:max-h-[460px]">
              <DimensionsFields form={form} />

              <div className="bg-[#1A1F2C] p-6 rounded-xl border border-slate-700 space-y-4 hover:border-blue-500/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-blue-500 text-sm font-medium uppercase tracking-wider">Observation</span>
                  <span className="text-xs text-slate-400">Optional</span>
                </div>
                <div className="space-y-4">
                  <Textarea 
                    placeholder="Additional information about the scrap" 
                    className="bg-slate-800/50 border-slate-700 text-slate-200 resize-none min-h-[100px]" 
                    {...form.register("observation")} 
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="border-t border-slate-800/50 p-4 bg-gradient-to-b from-[#111318] to-slate-800 mt-auto shrink-0">
              <div className="flex gap-3 w-full">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => onOpenChange(false)} 
                  className="flex-1 bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-200"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-blue-500 hover:bg-blue-600">
                  Save
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
