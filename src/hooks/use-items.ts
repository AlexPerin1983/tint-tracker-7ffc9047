import { useBaseItems } from './use-base-items';
import { useScraps } from './use-scraps';
import { useConsumption } from './use-consumption';
import { useTransactions } from './use-transactions';
import { useQueryClient } from '@tanstack/react-query';

export function useItems() {
  const baseItems = useBaseItems();
  const { addScrap } = useScraps();
  const { registerConsumption } = useConsumption();
  const { transactions } = useTransactions();
  const queryClient = useQueryClient();

  const refetchItems = async () => {
    await queryClient.invalidateQueries({ queryKey: ['items'] });
  };

  return {
    ...baseItems,
    addScrap,
    registerConsumption,
    transactions,
    refetchItems,
  };
}