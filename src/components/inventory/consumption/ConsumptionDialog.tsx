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

const formSchema = z.object({
  width: z.number().min(0.01, "Largura deve ser maior que 0"),
  length: z.number().min(0.01, "Comprimento deve ser maior que 0"),
  createScrap: z.boolean(),
  scrapWidth: z.number().min(0.01, "Largura deve ser maior que 0").optional(),
  scrapLength: z.number().min(0.01, "Comprimento deve ser maior que 0").optional(),
}).refine((data) => {
  if (data.createScrap) {
    return data.scrapWidth !== undefined && data.scrapLength !== undefined;
  }
  return true;
}, {
  message: "Dimensões da sobra são obrigatórias quando criar sobra está marcado",
  path: ["scrapWidth"],
});

interface ConsumptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: Item;
}

export function ConsumptionDialog({ open, onOpenChange, item }: ConsumptionDialogProps) {
  const { registerConsumption } = useItems();
  const { toast } = useToast();

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

    if (data.createScrap) {
      const scrapArea = (data.scrapWidth || 0) * (data.scrapLength || 0);
      if (scrapArea + consumedArea > remainingArea) {
        toast({
          title: "Erro",
          description: "A soma da área consumida e da sobra não pode ser maior que a área disponível",
          variant: "destructive",
        });
        return;
      }
    }

    try {
      await registerConsumption({ id: item.id, data });
      toast({
        title: "Sucesso",
        description: data.createScrap 
          ? "Consumo registrado e sobra criada com sucesso!"
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
            Registre o consumo de material e, opcionalmente, crie uma sobra.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <ConsumptionForm
            form={form}
            onSubmit={onSubmit}
            onCancel={() => onOpenChange(false)}
          />
        </Form>
      </DialogContent>
    </Dialog>
  );
}