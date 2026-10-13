import { create } from 'zustand';
import { salesApi } from './api';

export interface Sale {
  _id: string;
  item_name: string;
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
  seedSampleData: (count?: number) => Promise<void>;
  clearError: () => void;
}

interface SalesSelectors {
  runningTotals: Array<{ sale: Sale; runningTotal: number }>;
  totalRevenue: number;
  totalCount: number;
  averageOrderValue: number;
}

type SalesStore = SalesState & SalesActions & SalesSelectors;

export const useSalesStore = create<SalesStore>((set, get) => ({
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

  seedSampleData: async (count = 12) => {
    set({ isLoading: true, error: null });
    try {
      const response = await salesApi.seed(count);
      const newSales = response.data || [];
      set((state) => ({
        sales: [...state.sales, ...newSales].sort((a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to seed data', isLoading: false });
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

  get runningTotals() {
    const { sales } = get();
    let runningTotal = 0;
    return sales.map((sale) => {
      runningTotal += sale.amount;
      return { sale, runningTotal };
    });
  },

  get totalRevenue() {
    return get().sales.reduce((sum, sale) => sum + sale.amount, 0);
  },

  get totalCount() {
    return get().sales.length;
  },

  get averageOrderValue() {
    const { sales } = get();
    return sales.length > 0 ? get().totalRevenue / sales.length : 0;
  },
}));