import { useState, useEffect, useRef } from 'react';
import { useSalesStore } from '../lib/store';
import { FaClock, FaPlus, FaTimes } from 'react-icons/fa';

interface SaleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const getInitialTimestamp = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
};

export default function SaleFormModal({ isOpen, onClose }: SaleFormModalProps) {
  const { addSale, isLoading } = useSalesStore();
  const [itemName, setItemName] = useState('');
  const [amount, setAmount] = useState('');
  const [timestamp, setTimestamp] = useState(getInitialTimestamp);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim() || !amount || !timestamp) return;

    try {
      await addSale({
        item_name: itemName.trim(),
        amount: parseFloat(amount),
        timestamp: new Date(timestamp).toISOString(),
      });
      onClose();
    } catch (error) {
      console.error('Failed to add sale:', error);
    }
  };

  const setNowTime = () => {
    setTimestamp(getInitialTimestamp());
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sale-form-title"
    >
      <div
        ref={modalRef}
        className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-opsuite-blue" />
            <h2 id="sale-form-title" className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Record New Sale
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition"
            aria-label="Close form"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Item / Service Name <span className="text-opsuite-coral">*</span>
            </label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
              placeholder="e.g. Dry Cleaning - 2 Piece Suit"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-opsuite-blue focus:ring-1 focus:ring-opsuite-blue transition"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Amount (₦) <span className="text-opsuite-coral">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold">₦</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.01"
                min="0.01"
                required
                placeholder="0.00"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-opsuite-blue focus:ring-1 focus:ring-opsuite-blue transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Timestamp <span className="text-opsuite-coral">*</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="datetime-local"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                required
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-opsuite-blue focus:ring-1 focus:ring-opsuite-blue transition"
              />
              <button
                type="button"
                onClick={setNowTime}
                className="flex items-center px-3 py-2.5 text-xs font-semibold text-opsuite-blue bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition whitespace-nowrap"
              >
                <FaClock className="text-xs mr-1" /> Now
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-opsuite-navy hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 mt-2"
          >
            <FaPlus className="text-opsuite-yellow" />
            <span>{isLoading ? 'Logging...' : 'Log Sale Transaction'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}