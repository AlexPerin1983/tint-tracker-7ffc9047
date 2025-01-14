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
  minQuantity?: number;
  price?: number;
  observation?: string;
  originId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItemFormData {
  name: string;
  category: Category;
  width: number;
  length: number;
  quantity: number;
  minQuantity?: number;
  price?: number;
  observation?: string;
}

export interface ScrapFormData {
  originId: string;
  width: number;
  length: number;
  quantity: number;
  observation?: string;
}