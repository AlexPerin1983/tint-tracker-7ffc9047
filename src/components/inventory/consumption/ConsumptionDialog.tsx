
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { ConsumptionFormData, Item } from "@/types/inventory";
import { useItems } from "@/hooks/use-items";
import { useToast } from "@/hooks/use-toast";
import { ConsumptionForm } from "./ConsumptionForm";
import { Scale } from "lucide-react";

interface ConsumptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: Item;
}

export function ConsumptionDialog({ open, onOpenChange, item }: ConsumptionDialogProps) {
  const { registerConsumption } = useItems();
  const { toast } = useToast();

  const formSchema = z.object({
    width: z.number()
      .min(0.01, "Width must be greater than 0")
      .max(item.remainingWidth, `Maximum width is ${item.remainingWidth}m`),
    length: z.number()
      .min(0.01, "Length must be greater than 0")
      .max(item.remainingLength, `Maximum length is ${item.remainingLength}m`),
    createScrap: z.boolean(),
    scrapWidth: z.number()
      .min(0.01, "Width must be greater than 0")
      .max(item.remainingWidth, `Maximum width is ${item.remainingWidth}m`)
      .optional(),
    scrapLength: z.number()
      .min(0.01, "Length must be greater than 0")
      .max(item.remainingLength, `Maximum length is ${item.remainingLength}m`)
      .optional(),
  }).refine((data) => {
    if (data.createScrap) {
      return data.scrapWidth !== undefined && data.scrapLength !== undefined;
    }
    return true;
  }, {
    message: "Scrap dimensions are required when creating scrap",
    path: ["scrapWidth"],
  });

  const form = useForm<ConsumptionFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      width: 0,
      length: 0,
      createScrap: false,
    },
  });

  const onSubmit = async (data: ConsumptionFormData) => {
    const consumedArea = data.width * data.length;
    const remainingArea = item.remainingArea;

    if (consumedArea > remainingArea) {
      toast({
        title: "Error",
        description: "Consumed area cannot be greater than available area",
        variant: "destructive",
      });
      return;
    }

    const linearLength = data.length;
    const newRemainingLength = item.remainingLength - linearLength;

    if (newRemainingLength < 0) {
      toast({
        title: "Error",
        description: "Not enough length available in the roll",
        variant: "destructive",
      });
      return;
    }

    if (data.createScrap) {
      const scrapArea = (data.scrapWidth || 0) * (data.scrapLength || 0);
      if (scrapArea + consumedArea > remainingArea) {
        toast({
          title: "Error",
          description: "Sum of consumed area and scrap cannot be greater than available area",
          variant: "destructive",
        });
        return;
      }
    }

    try {
      await registerConsumption({ 
        id: item.id, 
        data,
        newDimensions: {
          remainingLength: newRemainingLength,
          remainingWidth: item.remainingWidth
        }
      });
      
      toast({
        title: "Success",
        description: data.createScrap 
          ? "Consumption registered and scrap created successfully!"
          : "Consumption registered successfully!",
      });
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Error registering consumption",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-[600px] bg-[#111318] border-none p-0 flex flex-col">
        <DialogHeader className="p-4 border-b border-slate-800/50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-blue-500/10">
              <Scale className="w-4 h-4 text-blue-500" />
            </div>
            <DialogTitle className="text-white text-base font-medium">Register Consumption</DialogTitle>
          </div>
          <DialogDescription className="text-slate-400">
            Register material consumption and optionally create scrap.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <ConsumptionForm
            form={form}
            onSubmit={onSubmit}
            onCancel={() => onOpenChange(false)}
            maxWidth={item.remainingWidth}
            maxLength={item.remainingLength}
          />
        </Form>
      </DialogContent>
    </Dialog>
  );
}
