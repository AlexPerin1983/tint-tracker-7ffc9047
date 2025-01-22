import { useMutation, useQueryClient } from '@tanstack/react-query';
import { itemsDB } from '@/services/db';
import { useToast } from '@/hooks/use-toast';
import { ConsumptionFormData } from '@/types/inventory';
import { useBaseItems } from './use-base-items';
import { useScraps } from './use-scraps';

export function useConsumption() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { items } = useBaseItems();
  const { addScrap } = useScraps();

  const registerConsumptionMutation = useMutation({
    mutationFn: async ({ 
      id, 
      data, 
      newDimensions 
    }: { 
      id: string, 
      data: ConsumptionFormData,
      newDimensions: {
        remainingLength: number;
        remainingWidth: number;
      }
    }) => {
      const item = items.find(i => i.id === id);
      if (!item) throw new Error('Item não encontrado');

      const consumedArea = data.width * data.length;
      const currentConsumedArea = item.consumedArea || 0;
      const totalArea = item.width * item.length;
      const availableArea = totalArea - currentConsumedArea;

      if (consumedArea > availableArea) {
        throw new Error('A área solicitada excede a área disponível para consumo');
      }

      const newConsumedArea = currentConsumedArea + consumedArea;
      const newRemainingArea = totalArea - newConsumedArea;

      await itemsDB.update(id, {
        ...item,
        remainingArea: newRemainingArea,
        remainingWidth: newDimensions.remainingWidth,
        remainingLength: newDimensions.remainingLength,
        consumedArea: newConsumedArea,
        isAvailable: newRemainingArea > 0,
      });

      await itemsDB.addTransaction({
        type: 'corte',
        itemId: id,
        width: data.width,
        length: data.length,
        area: consumedArea,
      });

      if (data.createScrap && data.scrapWidth && data.scrapLength) {
        const scrapArea = data.scrapWidth * data.scrapLength;
        
        if (scrapArea > consumedArea) {
          throw new Error('A área da sobra não pode ser maior que a área consumida');
        }

        await addScrap({
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
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast({
        title: "Sucesso!",
        description: "Consumo registrado com sucesso!",
      });
    },
  });

  return {
    registerConsumption: registerConsumptionMutation.mutate,
  };
}