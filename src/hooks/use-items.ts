import { useBaseItems } from './use-base-items';
import { useScraps } from './use-scraps';
import { useConsumption } from './use-consumption';
import { useTransactions } from './use-transactions';

export function useItems() {
  const baseItems = useBaseItems();
  const { addScrap, updateScrap } = useScraps();
  const { registerConsumption } = useConsumption();
  const { transactions } = useTransactions();

  return {
    ...baseItems,
    addScrap,
    updateScrap,
    registerConsumption,
    transactions,
  };
}