import { useBaseItems } from './use-base-items';
import { useScraps } from './use-scraps';
import { useConsumption } from './use-consumption';

export function useItems() {
  const baseItems = useBaseItems();
  const { addScrap } = useScraps();
  const { registerConsumption } = useConsumption();

  return {
    ...baseItems,
    addScrap,
    registerConsumption,
  };
}