interface KPICardsProps {
  todayTotal: number;
  todayCount: number;
  totalCount: number;
  averageValue: number;
  filteredTotal: number;
  filteredCount: number;
  totalSales: number;
}

export default function KPICards({
  todayTotal,
  todayCount,
  totalCount,
  averageValue,
  filteredTotal,
  filteredCount,
  totalSales,
}: KPICardsProps) {
  const formatNaira = (amount: number) =>
    '₦' + amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm relative overflow-hidden">
        <div className="w-1 h-full bg-opsuite-blue absolute left-0 top-0" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Total Sales Today
          </span>
          <span className="w-8 h-8 rounded-lg bg-blue-50 text-opsuite-blue flex items-center justify-center text-xs font-bold">
            ₦
          </span>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight tabular-nums">
          {formatNaira(todayTotal)}
        </div>
        <div className="text-xs text-slate-500 font-medium mt-2 flex items-center gap-1">
          <span className="text-emerald-500 text-[10px]">●</span>
          <span className="font-semibold text-slate-700">{todayCount}</span> sales logged today
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm relative overflow-hidden">
        <div className="w-1 h-full bg-opsuite-coral absolute left-0 top-0" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Total Transactions
          </span>
          <span className="w-8 h-8 rounded-lg bg-orange-50 text-opsuite-coral flex items-center justify-center text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </span>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight tabular-nums">
          {totalCount}
        </div>
        <div className="text-xs text-slate-500 font-medium mt-2">
          All-time recorded count
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm relative overflow-hidden">
        <div className="w-1 h-full bg-opsuite-yellow absolute left-0 top-0" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Average Sale Value
          </span>
          <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </span>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight tabular-nums">
          {formatNaira(averageValue)}
        </div>
        <div className="text-xs text-slate-500 font-medium mt-2">
          Per transaction average
        </div>
      </div>

      <div className="bg-white border border-blue-200 rounded-2xl p-5 shadow-sm relative overflow-hidden bg-blue-50/30">
        <div className="w-1 h-full bg-opsuite-navy absolute left-0 top-0" />
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
            Filtered View Total
          </span>
          <span className="w-8 h-8 rounded-lg bg-blue-100 text-opsuite-navy flex items-center justify-center text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </span>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-opsuite-navy mt-3 tracking-tight tabular-nums">
          {formatNaira(filteredTotal)}
        </div>
        <div className="text-xs text-slate-500 font-medium mt-2" id="kpiFilteredCount">
          Showing {filteredCount} of {totalSales} transactions
        </div>
      </div>
    </div>
  );
}