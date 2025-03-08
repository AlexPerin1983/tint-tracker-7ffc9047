
import { Item } from "@/types/inventory";

interface ItemDimensionsProps {
  item: Item;
}

export function ItemDimensions({ item }: ItemDimensionsProps) {
  const formatDimensions = (item: Item) => {
    const metersToInches = (meters: number) => (meters * 39.37).toFixed(2);
    
    if (item.type === 'bobina') {
      const widthInches = metersToInches(item.remainingWidth);
      const lengthInches = metersToInches(item.remainingLength);
      return `${widthInches}" x ${lengthInches}" (${item.remainingWidth.toFixed(2)}m x ${item.remainingLength.toFixed(2)}m)`;
    }
    const widthInches = metersToInches(item.width);
    const lengthInches = metersToInches(item.length);
    return `${widthInches}" x ${lengthInches}" (${item.width.toFixed(2)}m x ${item.length.toFixed(2)}m)`;
  };

  return <span>{formatDimensions(item)}</span>;
}
