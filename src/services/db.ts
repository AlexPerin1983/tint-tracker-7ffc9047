import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Item } from '@/types/inventory';

interface TintTrackerDB extends DBSchema {
  items: {
    key: string;
    value: Item;
    indexes: {
      'by-category': string;
      'by-origin': string;
    };
  };
  transactions: {
    key: string;
    value: {
      id: string;
      type: 'entrada' | 'saida' | 'corte';
      itemId: string;
      quantityUsed: number;
      date: Date;
    };
    indexes: {
      'by-item': string;
    };
  };
}

let db: IDBPDatabase<TintTrackerDB>;

export const initDB = async () => {
  db = await openDB<TintTrackerDB>('tint-tracker', 1, {
    upgrade(db) {
      // Items store
      const itemsStore = db.createObjectStore('items', { keyPath: 'id' });
      itemsStore.createIndex('by-category', 'category');
      itemsStore.createIndex('by-origin', 'originId');

      // Transactions store
      const transactionsStore = db.createObjectStore('transactions', { keyPath: 'id' });
      transactionsStore.createIndex('by-item', 'itemId');
    },
  });
};

export const itemsDB = {
  async getAll(): Promise<Item[]> {
    if (!db) await initDB();
    return db.getAll('items');
  },

  async add(item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>): Promise<Item> {
    if (!db) await initDB();
    
    const newItem: Item = {
      ...item,
      id: item.type === 'bobina' ? `BOB${Date.now()}` : `RET${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.add('items', newItem);
    return newItem;
  },

  async update(id: string, data: Partial<Item>): Promise<Item> {
    if (!db) await initDB();
    
    const existingItem = await db.get('items', id);
    if (!existingItem) throw new Error('Item não encontrado');

    const updatedItem = {
      ...existingItem,
      ...data,
      updatedAt: new Date(),
    };

    await db.put('items', updatedItem);
    return updatedItem;
  },

  async delete(id: string): Promise<void> {
    if (!db) await initDB();
    await db.delete('items', id);
  },

  async getByOrigin(originId: string): Promise<Item[]> {
    if (!db) await initDB();
    return db.getAllFromIndex('items', 'by-origin', originId);
  },
};