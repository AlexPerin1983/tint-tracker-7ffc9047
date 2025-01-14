import { useMutation, useQueryClient } from '@tanstack/react-query';
import { itemsDB } from '@/services/db';
import { useToast } from '@/hooks/use-toast';
import { ScrapFormData } from '@/types/inventory';
import { useBaseItems } from './use-base-items';

export function useScraps() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { items } = useBaseItems();

  const addScrapMutation = useMutation({
    mutationFn: async (data: ScrapFormData) => {
      const parentItem = items.find(item => item.id === data.originId);
      if (!parentItem) throw new Error('Item pai não encontrado');

      const newScrap = await itemsDB.add({
        name: `Retalho de ${parentItem.name}`,
        category: parentItem.category,
        type: 'retalho',
        code: generateCode('retalho', items),
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

  return {
    addScrap: addScrapMutation.mutate,
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