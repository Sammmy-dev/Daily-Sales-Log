import { useSalesStore } from '../lib/store';
import type { Sale } from '../lib/store';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { FaRotateLeft } from 'react-icons/fa6';

interface SalesTableProps {
  filteredSales: Array<{ sale: Sale; runningTotal: number }>;
  totalSales: number;
  searchTerm: string;
  dateFilter: string;
  onSearchTermChange: (value: string) => void;
  onDateFilterChange: (value: string) => void;
}

export default function SalesTable({
  filteredSales,
  totalSales,
  searchTerm,
  dateFilter,
  onSearchTermChange,
  onDateFilterChange,
}: SalesTableProps) {
  const { deleteSale, isLoading, error, clearError } = useSalesStore();
  const sortedSales = [...filteredSales].sort(
    (a, b) => new Date(b.sale.timestamp).getTime() - new Date(a.sale.timestamp).getTime(),
  );

  const formatNaira = (amount: number) =>
    '₦' + amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: date.toLocaleDateString([], { month: 'short', day: 'numeric' }),
    };
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this sale?')) {
      deleteSale(id);
    }
  };

  const resetFilters = () => {
    onSearchTermChange('');
    onDateFilterChange('');
  };

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-center">
        <p className="text-rose-700 text-sm">{error}</p>
        <button onClick={clearError} className="mt-2 text-xs text-rose-600 hover:underline">
          Dismiss
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <svg className="w-4 h-4 text-opsuite-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Sales Ledger
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Chronological log with running totals</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 sm:w-44">
              <FaSearch className="absolute left-3 top-2.5 text-xs text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchTermChange(e.target.value)}
                placeholder="Search item..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-opsuite-blue"
              />
            </div>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => onDateFilterChange(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-opsuite-blue"
            />

            <button
              onClick={resetFilters}
              className="p-2 text-xs text-slate-500 hover:text-slate-900 bg-slate-100 rounded-xl hover:bg-slate-200 transition"
              title="Clear Filters"
            >
              <FaRotateLeft />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs sm:text-sm text-slate-700">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200 font-semibold">
              <tr>
                <th scope="col" className="py-3 px-3 rounded-l-lg">Time</th>
                <th scope="col" className="py-3 px-3">Item Details</th>
                <th scope="col" className="py-3 px-3 text-right">Amount (₦)</th>
                <th scope="col" className="py-3 px-3 text-right bg-blue-50/50 text-opsuite-navy">Running Total</th>
                <th scope="col" className="py-3 px-3 text-center rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody id="salesTableBody" className="divide-y divide-slate-100">
              {sortedSales.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-slate-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.707L8 14 7.586 14.414a1 1 0 01-1.414 0L4 12m16 0l-4-4m0 0L8 8m0 0h8m-8 0a2 2 0 012-2h8a2 2 0 012 2v10" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-800">No Transactions Recorded</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Log a sale using the form or click "Seed Sample Data".
                    </p>
                  </td>
                </tr>
              ) : (
                sortedSales.map(({ sale, runningTotal }) => {
                  const { time, date } = formatDateTime(sale.timestamp);
                  return (
                    <tr key={sale._id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-mono text-slate-500">
                        <div className="font-semibold text-slate-800">{time}</div>
                        <div className="text-[10px] text-slate-400">{date}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-900">{sale.itemName}</div>
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-slate-800 tabular-nums">
                        {formatNaira(sale.amount)}
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-opsuite-coral bg-blue-50/40 tabular-nums">
                        {formatNaira(runningTotal)}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => handleDelete(sale._id)}
                          disabled={isLoading}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded transition disabled:opacity-50"
                          title="Delete Sale"
                        >
                          <FaTimes className="text-sm" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {sortedSales.length === 0 && totalSales > 0 && (
          <div id="emptyState" className="py-12 text-center">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-slate-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-slate-800">No Matching Transactions</h3>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your filters.</p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center text-xs text-slate-500 gap-3">
        <div className="font-medium text-slate-600">
          Showing {filteredSales.length} transaction{filteredSales.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}