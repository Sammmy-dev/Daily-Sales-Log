import { useEffect, useState } from 'react';
import { useSalesStore } from './lib/store';
import Header from './components/Header';
import KPICards from './components/KPICards';
import SeedBanner from './components/SeedBanner';
import SaleFormModal from './components/SaleFormModal';
import SalesTable from './components/SalesTable';

function App() {
  const { fetchSales, sales, totalCount, averageOrderValue, runningTotals } = useSalesStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const todayStr = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  const todaySales = sales.filter((s) => s.timestamp.slice(0, 10) === todayStr);
  const todayTotal = todaySales.reduce((sum, s) => sum + s.amount, 0);
  const todayCount = todaySales.length;

  const filteredSales = runningTotals;
  const filteredTotal = filteredSales.reduce((sum, rt) => sum + rt.sale.amount, 0);
  const filteredCount = filteredSales.length;

  return (
    <div className="min-h-screen flex flex-col antialiased text-slate-800 bg-slate-50">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto py-4 sm:py-6 lg:py-8 space-y-6">
        <div className="space-y-6">
          <SeedBanner />
          <KPICards
            todayTotal={todayTotal}
            todayCount={todayCount}
            totalCount={totalCount}
            averageValue={averageOrderValue}
            filteredTotal={filteredTotal}
            filteredCount={filteredCount}
            totalSales={totalCount}
          />
          <div className="flex flex-col gap-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 bg-opsuite-navy hover:bg-slate-800 text-white font-semibold text-sm rounded-xl shadow-sm transition flex items-center justify-center gap-2 self-start"
            >
              <span className="text-opsuite-yellow">+</span>
              <span>Log New Sale</span>
            </button>
            <SalesTable />
          </div>
        </div>
      </main>

      <SaleFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;