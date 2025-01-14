import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { itemsDB } from '@/services/db';
import { useToast } from '@/hooks/use-toast';
import { ItemFormData } from '@/types/inventory';

export function useBaseItems() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: items = [], isLoading: itemsLoading } = useQuery({
    queryKey: ['items'],
    queryFn: itemsDB.getAll,
  });

  const addItemMutation = useMutation({
    mutationFn: async (data: ItemFormData) => {
      const newItem = await itemsDB.add({
        ...data,
        type: 'bobina',
        code: generateCode('bobina', items),
        remainingWidth: data.width,
        remainingLength: data.length,
        remainingArea: data.width * data.length,
        consumedArea: 0,
        isAvailable: true,
      });
      return newItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      toast({
        title: "Sucesso!",
        description: "Item salvo com sucesso!",
      });
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ItemFormData }) => {
      const updatedItem = await itemsDB.update(id, {
        ...data,
        remainingWidth: data.width,
        remainingLength: data.length,
        remainingArea: data.width * data.length,
        consumedArea: 0,
        isAvailable: true,
      });
      return updatedItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      toast({
        title: "Sucesso!",
        description: "Item atualizado com sucesso!",
      });
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: async (id: string) => {
      await itemsDB.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      toast({
        title: "Sucesso!",
        description: "Item excluído com sucesso!",
      });
    },
  });

  return {
    items,
    isLoading: itemsLoading,
    addItem: addItemMutation.mutate,
    updateItem: updateItemMutation.mutate,
    deleteItem: deleteItemMutation.mutate,
  };
}

function generateCode(type: 'bobina' | 'retalho', items: any[]) {
  const prefix = type === 'bobina' ? 'BOB' : 'RET';
  const existingCodes = items
    .filter(item => item.type === type)
    .map(item => parseInt(item.code.replace(prefix, '')))
    .filter(num => !isNaN(num));
  
  const maxCode = Math.max(0, ...existingCodes);
  const newNumber = (maxCode + 1).toString().padStart(3, '0');
  return `${prefix}${newNumber}`;
}