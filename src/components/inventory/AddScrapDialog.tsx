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

const formSchema = z.object({
  width: z.number()
    .min(0.01, "Width must be greater than 0")
    .max(1.82, "Maximum width is 1.82m"),
  length: z.number()
    .min(0.01, "Length must be greater than 0"),
  quantity: z.number()
    .min(1, "Quantity must be greater than 0"),
  observation: z.string().optional(),
});

interface AddScrapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parentItemId: string;
}

export function AddScrapDialog({ open, onOpenChange, parentItemId }: AddScrapDialogProps) {
  const { addScrap, items } = useItems();
  const { toast } = useToast();
  
  const parentItem = items.find(item => item.id === parentItemId);
  const existingScraps = items.filter(item => item.originId === parentItemId);
  
  const form = useForm<ScrapFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      width: 0,
      length: 0,
      quantity: 1,
    },
  });

  const onSubmit = async (data: ScrapFormData) => {
    if (!parentItem) {
      toast({
        title: "Erro",
        description: "Item pai não encontrado",
        variant: "destructive",
      });
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
        title: "Erro",
        description: "A área total dos retalhos excede a área disponível do item pai",
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
        title: "Sucesso",
        description: "Retalho adicionado com sucesso!",
      });
      
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao adicionar retalho",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Scrap</DialogTitle>
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
                        max={1.82}
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
                              if (!isNaN(value) && value <= 1.82) {
                                field.onChange(value);
                              }
                            }}
                            className="w-24 text-right"
                          />
                        </FormControl>
                        <span className="text-sm text-muted-foreground">1.82m</span>
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
            </div>

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