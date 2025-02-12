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
import { Switch } from "@/components/ui/switch";
import { ScrapFormData } from "@/types/inventory";
import { useItems } from "@/hooks/use-items";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Scissors } from "lucide-react";

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
  const { addScrap, items, refetchItems } = useItems();
  const { toast } = useToast();
  const [useInches, setUseInches] = useState(true);
  
  const parentItem = items.find(item => item.id === parentItemId);
  const existingScraps = items.filter(item => item.originId === parentItemId);
  
  const formSchema = z.object({
    width: z.number()
      .min(0.01, "Width must be greater than 0")
      .max(parentItem?.width || 0, `Maximum width is ${parentItem?.width}m`),
    length: z.number()
      .min(0.01, "Length must be greater than 0")
      .max(parentItem?.length || 0, `Maximum length is ${parentItem?.length}m`),
    observation: z.string().optional(),
  });

  const form = useForm<ScrapFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      width: editingScrap?.width || 0,
      length: editingScrap?.length || 0,
      observation: editingScrap?.observation || "",
    },
  });

  useEffect(() => {
    if (editingScrap) {
      form.reset({
        width: editingScrap.width,
        length: editingScrap.length,
        observation: editingScrap.observation,
      });
    }
  }, [editingScrap, form]);

  const convertToInches = (meters: number) => Number((meters * 39.37).toFixed(2));
  const convertToMeters = (inches: number) => Number((inches / 39.37).toFixed(2));

  const handleNumericInput = (name: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const finalValue = useInches ? convertToMeters(numValue) : numValue;
      form.setValue(name as any, finalValue);
    }
  };

  const formatDisplayValue = (value: number | undefined) => {
    if (value === undefined || isNaN(value)) return "0.00";
    return useInches ? convertToInches(value).toFixed(2) : value.toFixed(2);
  };

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
      .filter(scrap => scrap.id !== editingScrap?.id)
      .reduce(
        (acc, scrap) => acc + scrap.width * scrap.length,
        0
      );
    const newScrapArea = data.width * data.length;
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
        quantity: 1,
        originId: parentItemId,
      });
      
      await refetchItems();
      
      toast({
        title: "Success",
        description: "Retalho criado com sucesso!",
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
      <DialogContent className="w-full sm:max-w-[425px] bg-[#111318] border-none p-0 flex flex-col h-[100vh] sm:h-auto sm:max-h-[100vh]">
        <DialogHeader className="p-4 border-b border-slate-800/50 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-blue-500/10">
              <Scissors className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-white">
                {editingScrap ? "Edit Scrap" : "Add New Scrap"}
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-400 mt-1">
                {editingScrap 
                  ? "Update the scrap's dimensions and details"
                  : "Add a new scrap with its dimensions and details"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
            <div className="p-4 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-200">Dimensions</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-400">Meters</span>
                  <Switch
                    checked={useInches}
                    onCheckedChange={setUseInches}
                    className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-slate-700"
                  />
                  <span className="text-sm text-slate-400">Inches</span>
                </div>
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="width"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200">
                        Width ({useInches ? "inches" : "meters"})
                      </FormLabel>
                      <div className="space-y-2">
                        <Slider
                          min={0}
                          max={useInches ? parentItem.width * 39.37 : parentItem.width}
                          step={0.01}
                          value={[useInches ? convertToInches(field.value || 0) : (field.value || 0)]}
                          onValueChange={(value) => {
                            const finalValue = useInches ? convertToMeters(value[0]) : value[0];
                            field.onChange(finalValue);
                          }}
                          className="w-full"
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400">0{useInches ? '"' : 'm'}</span>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder={`Ex: ${useInches ? '20' : '0.5'}`}
                              value={formatDisplayValue(field.value)}
                              onChange={(e) => handleNumericInput("width", e.target.value)}
                              className="w-24 text-right bg-slate-800/50 border-slate-700 text-slate-200"
                            />
                          </FormControl>
                          <span className="text-sm text-slate-400">
                            {useInches ? (parentItem.width * 39.37).toFixed(2) + '"' : parentItem.width.toFixed(2) + 'm'}
                          </span>
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
                      <FormLabel className="text-slate-200">
                        Length ({useInches ? "inches" : "meters"})
                      </FormLabel>
                      <div className="space-y-2">
                        <Slider
                          min={0}
                          max={useInches ? parentItem.length * 39.37 : parentItem.length}
                          step={0.01}
                          value={[useInches ? convertToInches(field.value || 0) : (field.value || 0)]}
                          onValueChange={(value) => {
                            const finalValue = useInches ? convertToMeters(value[0]) : value[0];
                            field.onChange(finalValue);
                          }}
                          className="w-full"
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400">0{useInches ? '"' : 'm'}</span>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder={`Ex: ${useInches ? '48' : '1.2'}`}
                              value={formatDisplayValue(field.value)}
                              onChange={(e) => handleNumericInput("length", e.target.value)}
                              className="w-24 text-right bg-slate-800/50 border-slate-700 text-slate-200"
                            />
                          </FormControl>
                          <span className="text-sm text-slate-400">
                            {useInches ? (parentItem.length * 39.37).toFixed(2) + '"' : parentItem.length.toFixed(2) + 'm'}
                          </span>
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
                      <FormLabel className="text-slate-200">Observation</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Additional information about the scrap"
                          className="bg-slate-800/50 border-slate-700 text-slate-200 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="border-t border-slate-800/50 p-4 bg-[#111318] mt-auto shrink-0">
              <div className="flex gap-3 w-full">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="flex-1 bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-200"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                >
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
