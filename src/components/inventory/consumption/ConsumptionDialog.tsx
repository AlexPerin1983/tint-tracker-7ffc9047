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
        title: "Erro",
        description: "A área consumida não pode ser maior que a área disponível",
        variant: "destructive",
      });
      return;
    }

    // Agora o comprimento linear é exatamente o comprimento consumido
    const linearLength = data.length;

    // Calcula o novo comprimento restante
    const newRemainingLength = item.remainingLength - linearLength;

    if (newRemainingLength < 0) {
      toast({
        title: "Erro",
        description: "Não há comprimento suficiente disponível na bobina",
        variant: "destructive",
      });
      return;
    }

    if (data.createScrap) {
      const scrapArea = (data.scrapWidth || 0) * (data.scrapLength || 0);
      if (scrapArea + consumedArea > remainingArea) {
        toast({
          title: "Erro",
          description: "A soma da área consumida e do retalho não pode ser maior que a área disponível",
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
        title: "Sucesso",
        description: data.createScrap 
          ? "Consumo registrado e retalho criado com sucesso!"
          : "Consumo registrado com sucesso!",
      });
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao registrar consumo",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Registrar Consumo</DialogTitle>
          <DialogDescription>
            Registre o consumo de material e opcionalmente crie um retalho.
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