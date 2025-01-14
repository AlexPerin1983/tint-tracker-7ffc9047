export type Category = "Window Tinting" | "PPF" | "Wrap";
export type ItemType = "bobina" | "retalho";
export type TransactionType = "entrada" | "saida" | "corte";

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
  remainingWidth: number;
  remainingLength: number;
  remainingArea: number;
  consumedArea: number;
  isAvailable: boolean;
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

export interface ConsumptionFormData {
  width: number;
  length: number;
  createScrap: boolean;
  scrapWidth?: number;
  scrapLength?: number;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  itemId: string;
  width: number;
  length: number;
  area: number;
  createdAt: Date;
}
