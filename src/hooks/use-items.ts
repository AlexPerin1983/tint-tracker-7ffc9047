import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { itemsDB } from '@/services/db';
import { useToast } from '@/hooks/use-toast';
import { Item, ItemFormData, ScrapFormData, ConsumptionFormData } from '@/types/inventory';

export function useItems() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const generateCode = (type: 'bobina' | 'retalho') => {
    const prefix = type === 'bobina' ? 'BOB' : 'RET';
    const existingCodes = items
      .filter(item => item.type === type)
      .map(item => parseInt(item.code.replace(prefix, '')))
      .filter(num => !isNaN(num));
    
    const maxCode = Math.max(0, ...existingCodes);
    const newNumber = (maxCode + 1).toString().padStart(3, '0');
    return `${prefix}${newNumber}`;
  };

  const addItemMutation = useMutation({
    mutationFn: async (data: ItemFormData) => {
      const newItem = await itemsDB.add({
        ...data,
        type: 'bobina',
        code: generateCode('bobina'),
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

  const addScrapMutation = useMutation({
    mutationFn: async (data: ScrapFormData) => {
      const parentItem = items.find(item => item.id === data.originId);
      if (!parentItem) throw new Error('Item pai não encontrado');

      const newScrap = await itemsDB.add({
        name: `Retalho de ${parentItem.name}`,
        category: parentItem.category,
        type: 'retalho',
        code: generateCode('retalho'),
        width: data.width,
        length: data.length,
        quantity: data.quantity,
        originId: data.originId,
        observation: data.observation,
        remainingWidth: data.width,
        remainingLength: data.length,
        remainingArea: data.width * data.length,
        consumedArea: 0,
        isAvailable: true,
      });

      return newScrap;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      toast({
        title: "Sucesso!",
        description: "Retalho adicionado com sucesso!",
      });
    },
  });

  const registerConsumptionMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: ConsumptionFormData }) => {
      const item = items.find(i => i.id === id);
      if (!item) throw new Error('Item não encontrado');

      const consumedArea = data.width * data.length;
      
      // Validar se há área suficiente disponível
      if (consumedArea > item.remainingArea) {
        throw new Error('Área consumida maior que a área disponível');
      }

      // Calcular nova área disponível
      const newRemainingArea = item.remainingArea - consumedArea;
      const newConsumedArea = item.consumedArea + consumedArea;

      // Atualizar o item com o novo consumo
      await itemsDB.update(id, {
        ...item,
        remainingArea: newRemainingArea,
        consumedArea: newConsumedArea,
        isAvailable: newRemainingArea > 0,
      });

      // Registrar a transação de consumo
      await itemsDB.addTransaction({
        type: 'corte',
        itemId: id,
        width: data.width,
        length: data.length,
        area: consumedArea,
      });

      // Se houver sobra, criar um novo retalho
      if (data.createScrap && data.scrapWidth && data.scrapLength) {
        const scrapArea = data.scrapWidth * data.scrapLength;
        
        // Validar se a sobra não excede a área consumida
        if (scrapArea > consumedArea) {
          throw new Error('Área da sobra maior que a área consumida');
        }

        await addScrapMutation.mutateAsync({
          originId: id,
          width: data.scrapWidth,
          length: data.scrapLength,
          quantity: 1,
        });
      }

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
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

  const { data: items = [], isLoading: itemsLoading } = useQuery({
    queryKey: ['items'],
    queryFn: itemsDB.getAll,
  });

  const { data: transactions = [], isLoading: transactionsLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: itemsDB.getAllTransactions,
  });

  const isLoading = itemsLoading || transactionsLoading;

  return {
    items,
    transactions,
    isLoading,
    addItem: addItemMutation.mutate,
    updateItem: updateItemMutation.mutate,
    addScrap: addScrapMutation.mutate,
    deleteItem: deleteItemMutation.mutate,
    registerConsumption: registerConsumptionMutation.mutate,
  };
}
