import { create } from 'zustand';
import { salesApi } from './api';

export interface Sale {
  _id: string;
  itemName: string;
  amount: number;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}

export interface SaleInput {
  item_name: string;
  amount: number;
  timestamp?: string;
}

interface SalesState {
  sales: Sale[];
  isLoading: boolean;
  error: string | null;
}

interface SalesActions {
  fetchSales: () => Promise<void>;
  addSale: (data: SaleInput) => Promise<Sale>;
  deleteSale: (id: string) => Promise<void>;
  clearAllSales: () => Promise<void>;
  clearError: () => void;
}

type SalesStore = SalesState & SalesActions;

export const useSalesStore = create<SalesStore>((set) => ({
  sales: [],
  isLoading: false,
  error: null,

  fetchSales: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await salesApi.fetchAll();
      set({ sales: data.data || [], isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch sales', isLoading: false });
    }
  },

  addSale: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await salesApi.create(data);
      const newSale = response.data;
      set((state) => ({
        sales: [...state.sales, newSale].sort((a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        ),
        isLoading: false,
      }));
      return newSale;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to add sale', isLoading: false });
      throw error;
    }
  },

  deleteSale: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await salesApi.delete(id);
      set((state) => ({
        sales: state.sales.filter((sale) => sale._id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete sale', isLoading: false });
      throw error;
    }
  },

  clearAllSales: async () => {
    set({ isLoading: true, error: null });
    try {
      await salesApi.clearAll();
      set({ sales: [], isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to clear sales', isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));