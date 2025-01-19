import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrapFormData, Item } from "@/types/inventory";
import { useItems } from "@/hooks/use-items";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

interface AddScrapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parentItemId: string;
  mode?: "add" | "edit";
  itemToEdit?: Item;
}

export function AddScrapDialog({ 
  open, 
  onOpenChange, 
  parentItemId,
  mode = "add",
  itemToEdit 
}: AddScrapDialogProps) {
  const { addScrap, updateScrap, items } = useItems();
  const { toast } = useToast();
  
  const parentItem = items.find(item => item.id === parentItemId);
  const existingScraps = items.filter(item => item.originId === parentItemId);

  const formSchema = z.object({
    width: z.number()
      .min(0.01, "Width must be greater than 0")
      .max(parentItem?.width || 0, `Maximum width is ${parentItem?.width || 0}m`),
    length: z.number()
      .min(0.01, "Length must be greater than 0")
      .max(60, "Maximum length is 60m"),
    quantity: z.number()
      .min(1, "Quantity must be greater than 0")
      .max(100, "Maximum quantity is 100"),
    observation: z.string().optional(),
  });

  const form = useForm<ScrapFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      width: mode === "edit" && itemToEdit ? itemToEdit.width : 0,
      length: mode === "edit" && itemToEdit ? itemToEdit.length : 0,
      quantity: mode === "edit" && itemToEdit ? itemToEdit.quantity : 1,
      observation: mode === "edit" && itemToEdit ? itemToEdit.observation : "",
    },
  });

  useEffect(() => {
    if (open && !parentItem) {
      toast({
        title: "Error",
        description: "Parent item not found",
        variant: "destructive",
      });
      onOpenChange(false);
    }
  }, [open, parentItem, toast, onOpenChange]);

  useEffect(() => {
    if (open && mode === "edit" && itemToEdit) {
      form.reset({
        width: itemToEdit.width,
        length: itemToEdit.length,
        quantity: itemToEdit.quantity,
        observation: itemToEdit.observation,
      });
    }
  }, [open, mode, itemToEdit, form]);

  const onSubmit = async (data: ScrapFormData) => {
    if (!parentItem) {
      toast({
        title: "Error",
        description: "Parent item not found",
        variant: "destructive",
      });
      return;
    }

    if (mode === "edit" && itemToEdit) {
      try {
        await updateScrap({
          id: itemToEdit.id,
          data: {
            ...data,
            originId: parentItemId,
          }
        });
        
        toast({
          title: "Success",
          description: "Scrap updated successfully!",
        });
        
        onOpenChange(false);
        form.reset();
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Error updating scrap",
          variant: "destructive",
        });
      }
      return;
    }

    const totalScrapArea = existingScraps.reduce(
      (acc, scrap) => acc + scrap.width * scrap.length * scrap.quantity,
      0
    );
    const newScrapArea = data.width * data.length * data.quantity;
    const parentArea = parentItem.width * parentItem.length;

    if (totalScrapArea + newScrapArea > parentArea) {
      toast({
        title: "Error",
        description: "Total scrap area exceeds available parent item area",
        variant: "destructive",
      });
      return;
    }

    try {
      await addScrap({
        ...data,
        originId: parentItemId,
      });
      
      toast({
        title: "Success",
        description: "Scrap added successfully!",
      });
      
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error adding scrap",
        variant: "destructive",
      });
    }
  };

  if (!parentItem && open) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? "Edit Scrap" : "Add New Scrap"}</DialogTitle>
          <DialogDescription>
            {mode === "edit" 
              ? "Update the scrap dimensions and details below." 
              : "Add a new scrap with the dimensions and details below."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Width (meters)</FormLabel>
                    <div className="space-y-2">
                      <Slider
                        min={0}
                        max={parentItem?.width || 0}
                        step={0.01}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">0m</span>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="Ex: 0.5"
                            {...field}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              if (!isNaN(value) && value <= (parentItem?.width || 0)) {
                                field.onChange(value);
                              }
                            }}
                            className="w-24 text-right"
                          />
                        </FormControl>
                        <span className="text-sm text-muted-foreground">{parentItem?.width || 0}m</span>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Length (meters)</FormLabel>
                    <div className="space-y-2">
                      <Slider
                        min={0}
                        max={60}
                        step={0.01}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">0m</span>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="Ex: 1.2"
                            {...field}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value);
                              if (!isNaN(value) && value <= 60) {
                                field.onChange(value);
                              }
                            }}
                            className="w-24 text-right"
                          />
                        </FormControl>
                        <span className="text-sm text-muted-foreground">60m</span>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <div className="space-y-2">
                      <Slider
                        min={1}
                        max={100}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">1</span>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ex: 1"
                            {...field}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (!isNaN(value) && value >= 1 && value <= 100) {
                                field.onChange(value);
                              }
                            }}
                            className="w-24 text-right"
                          />
                        </FormControl>
                        <span className="text-sm text-muted-foreground">100</span>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="observation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observation</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional information about the scrap"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">{mode === "edit" ? "Update" : "Save"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}