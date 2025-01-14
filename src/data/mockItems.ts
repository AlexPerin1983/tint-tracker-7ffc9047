import { Item } from "@/types/inventory";

export const mockItems: Item[] = [
  {
    id: "1",
    code: "BOB001",
    name: "Window Film Classic",
    category: "Window Tinting",
    type: "bobina",
    width: 1.52,
    length: 30,
    quantity: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    code: "BOB002",
    name: "PPF Pro",
    category: "PPF",
    type: "bobina",
    width: 1.22,
    length: 20,
    quantity: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    code: "RET001",
    name: "Retalho Window Film",
    category: "Window Tinting",
    type: "retalho",
    width: 0.5,
    length: 1.2,
    quantity: 1,
    originId: "1",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];