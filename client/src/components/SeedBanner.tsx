import { useSalesStore } from '../lib/store';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import { FaBolt } from 'react-icons/fa';

export default function SeedBanner() {
  const { seedSampleData, isLoading } = useSalesStore();

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-opsuite-blue shrink-0">
          <FaBolt className="text-base" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Quick Start Test Data Generator
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Need sample data for grading? Seed 12 realistic sales entries instantly.
          </p>
        </div>
      </div>

      <button
        onClick={() => seedSampleData(12)}
        disabled={isLoading}
        className="w-full sm:w-auto px-4 py-2.5 bg-opsuite-navy hover:bg-slate-800 disabled:bg-slate-400 text-white font-semibold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2"
      >
        <FaWandMagicSparkles className="text-opsuite-yellow" />
        <span>{isLoading ? 'Seeding...' : 'Load 12 Sample Sales'}</span>
      </button>
    </div>
  );
}