
interface ItemCounterProps {
  count: number;
  labels: {
    itemsFound: string;
  };
}

export function ItemCounter({ count, labels }: ItemCounterProps) {
  return (
    <div className="bg-[#1A1F2C] p-3 sm:p-4 rounded-xl border border-slate-800/50">
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-blue-500 text-2xl sm:text-3xl font-bold">{count}</span>
        <span className="text-slate-400 text-xs sm:text-sm uppercase tracking-wider">{labels.itemsFound}</span>
      </div>
    </div>
  );
}
