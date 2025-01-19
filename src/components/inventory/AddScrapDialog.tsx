import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { ScrapFormData } from "@/types/inventory";
import { useItems } from "@/hooks/use-items";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

interface AddScrapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parentItemId: string;
  editingScrap?: {
    id: string;
    width: number;
    length: number;
    quantity: number;
    observation?: string;
  };
}

export function AddScrapDialog({ 
  open, 
  onOpenChange, 
  parentItemId,
  editingScrap 
}: AddScrapDialogProps) {
  const { addScrap, items } = useItems();
  const { toast } = useToast();
  
  const parentItem = items.find(item => item.id === parentItemId);
  const existingScraps = items.filter(item => item.originId === parentItemId);
  
  const formSchema = z.object({
    width: z.number()
      .min(0.01, "Width must be greater than 0")
      .max(parentItem?.width || 0, `Maximum width is ${parentItem?.width}m`),
    length: z.number()
      .min(0.01, "Length must be greater than 0"),
    quantity: z.number()
      .min(1, "Quantity must be greater than 0"),
    observation: z.string().optional(),
  });

  const form = useForm<ScrapFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      width: editingScrap?.width || 0,
      length: editingScrap?.length || 0,
      quantity: editingScrap?.quantity || 1,
      observation: editingScrap?.observation || "",
    },
  });

  // Reset form when editing scrap changes
  useEffect(() => {
    if (editingScrap) {
      form.reset({
        width: editingScrap.width,
        length: editingScrap.length,
        quantity: editingScrap.quantity,
        observation: editingScrap.observation,
      });
    }
  }, [editingScrap, form]);

  const onSubmit = async (data: ScrapFormData) => {
    if (!parentItem) {
      toast({
        title: "Error",
        description: "Parent item not found",
        variant: "destructive",
      });
      return;
    }

    const totalScrapArea = existingScraps
      .filter(scrap => scrap.id !== editingScrap?.id) // Exclude current scrap when editing
      .reduce(
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
        id: editingScrap?.id, // Pass the ID if editing
      });
      
      toast({
        title: "Success",
        description: editingScrap 
          ? "Scrap updated successfully!"
          : "Scrap added successfully!",
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

  if (!parentItem) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {editingScrap ? "Edit Scrap" : "Add New Scrap"}
          </DialogTitle>
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
                        max={parentItem.width}
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
                              if (!isNaN(value) && value <= parentItem.width) {
                                field.onChange(value);
                              }
                            }}
                            className="w-24 text-right"
                          />
                        </FormControl>
                        <span className="text-sm text-muted-foreground">{parentItem.width}m</span>
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
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
