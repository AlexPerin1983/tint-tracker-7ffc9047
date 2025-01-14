export type Category = "Window Tinting" | "PPF" | "Wrap";
export type ItemType = "bobina" | "retalho";

export interface Item {
  id: string;
  code: string;
  name: string;
  category: Category;
  type: ItemType;
  width: number;
  length: number;
  quantity: number;
  originId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItemTableRow extends Item {
  dimensions: string;
}