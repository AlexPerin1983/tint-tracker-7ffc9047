import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TabsContent } from "@/components/ui/tabs";
import { memo } from "react";

interface FormFieldsProps {
  form: any;
  activeTab: string;
}

const FormFields = memo(({ form, activeTab }: FormFieldsProps) => (
  <>
    <TabsContent value="basic" className="space-y-4 mt-4" hidden={activeTab !== "basic"}>
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
                <SelectItem value="Window Tinting">Window Tinting</SelectItem>
                <SelectItem value="PPF">PPF</SelectItem>
                <SelectItem value="Wrap">Wrap</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </TabsContent>

    <TabsContent value="dimensions" className="space-y-4 mt-4" hidden={activeTab !== "dimensions"}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
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
    </TabsContent>

    <TabsContent value="price" className="space-y-4 mt-4" hidden={activeTab !== "price"}>
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
                placeholder="Item esta localizado na prateleira..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </TabsContent>
  </>
));

FormFields.displayName = 'FormFields';

export default FormFields;