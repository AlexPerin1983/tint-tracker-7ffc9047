import { useQuery } from '@tanstack/react-query';
import { itemsDB } from '@/services/db';

export function useTransactions() {
  const { data: transactions = [] } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => itemsDB.getAllTransactions(),
  });

  return {
    transactions,
  };
}