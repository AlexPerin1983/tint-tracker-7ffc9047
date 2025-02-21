
import { Item } from "@/types/inventory";

export const mockItems: Item[] = [
  {
    id: "1",
    code: "BOB001",
    name: "Window Film Classic",
    brand: "3M",
    category: "Window Tinting",
    type: "bobina",
    width: 1.52,
    length: 30,
    quantity: 10,
    remainingWidth: 1.52,
    remainingLength: 30,
    remainingArea: 45.6,
    consumedArea: 0,
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    code: "BOB002",
    name: "PPF Pro",
    brand: "XPEL",
    category: "PPF",
    type: "bobina",
    width: 1.22,
    length: 20,
    quantity: 5,
    remainingWidth: 1.22,
    remainingLength: 20,
    remainingArea: 24.4,
    consumedArea: 0,
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    code: "RET001",
    name: "Scrap of Window Film",
    brand: "3M",
    category: "Window Tinting",
    type: "scrap",
    width: 0.5,
    length: 1.2,
    quantity: 1,
    originId: "1",
    remainingWidth: 0.5,
    remainingLength: 1.2,
    remainingArea: 0.6,
    consumedArea: 0,
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
