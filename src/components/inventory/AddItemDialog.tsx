import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Category, Item, ItemFormData } from "@/types/inventory";
import { useItems } from "@/hooks/use-items";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  category: z.enum(["Window Tinting", "PPF", "Wrap"] as const),
  width: z.number().min(0.01, "Largura deve ser maior que 0"),
  length: z.number().min(0.01, "Comprimento deve ser maior que 0"),
  quantity: z.number().min(1, "Quantidade deve ser maior que 0"),
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

  const onSubmit = async (data: ItemFormData) => {
    if (mode === "edit" && itemToEdit) {
      updateItem({ id: itemToEdit.id, data });
    } else {
      addItem(data);
    }
    onOpenChange(false);
    form.reset();
  };

  const Content = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Accordion type="single" collapsible defaultValue="basic-info">
          <AccordionItem value="basic-info">
            <AccordionTrigger className="text-lg font-semibold">
              Informações Básicas
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Material</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Window Film Classic" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Window Tinting">
                            Window Tinting
                          </SelectItem>
                          <SelectItem value="PPF">PPF</SelectItem>
                          <SelectItem value="Wrap">Wrap</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="dimensions">
            <AccordionTrigger className="text-lg font-semibold">
              Dimensões e Estoque
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="width"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Largura (metros)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Ex: 1.52"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="length"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comprimento (metros)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Ex: 30"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ex: 1"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="minQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade Mínima</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Ex: 2"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value ? parseInt(e.target.value) : undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price-obs">
            <AccordionTrigger className="text-lg font-semibold">
              Preço e Observações
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço por m² (USD)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Ex: 10.50"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value ? parseFloat(e.target.value) : undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="observation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observação</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Informações adicionais sobre o item"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
          <div className="flex justify-end gap-4 max-w-[600px] mx-auto">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {mode === "edit" ? "Salvar Alterações" : "Salvar"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[100dvh] pt-16 pb-24">
          <SheetHeader>
            <SheetTitle>
              {mode === "edit" ? "Editar Item" : "Adicionar Novo Item"}
            </SheetTitle>
          </SheetHeader>
          <Content />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Editar Item" : "Adicionar Novo Item"}
          </DialogTitle>
        </DialogHeader>
        <Content />
      </DialogContent>
    </Dialog>
  );
}