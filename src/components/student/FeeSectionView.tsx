import React, { useState } from 'react';
import { useAcademy } from '../../context/AcademyContext';
import { FeeRecord } from '../../types';
import { Receipt, CheckCircle2, Clock, Printer, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ReceiptModal } from '../common/ReceiptModal';

export const FeeSectionView: React.FC = () => {
  const { feeRecords, activeStudent, markFeeAsPaid } = useAcademy();
  const [selectedFee, setSelectedFee] = useState<FeeRecord | null>(null);

  if (!activeStudent) return null;

  const studentFees = feeRecords.filter((f) => f.studentId === activeStudent.id);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-emerald-100 dark:border-gray-700 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-emerald-950 dark:text-emerald-300 flex items-center space-x-2">
            <Receipt className="w-6 h-6 text-emerald-600" />
            <span>Academy Fee & Invoice Management</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Transparent tuition fee records & downloadable receipts for <span className="font-bold">{activeStudent.name}</span>
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-xs">
          <div>
            <span className="text-gray-500 text-[10px] block font-bold uppercase">Monthly Tuition</span>
            <span className="font-mono font-extrabold text-emerald-900 dark:text-emerald-200 text-base">
              {activeStudent.currency}{activeStudent.monthlyFee} / Month
            </span>
          </div>
        </div>
      </div>

      {/* Active Monthly Fee Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {studentFees.map((fee) => (
          <div
            key={fee.id}
            className={`bg-white dark:bg-gray-800 rounded-3xl p-6 border shadow-sm space-y-4 flex flex-col justify-between ${
              fee.status === 'Paid'
                ? 'border-emerald-200 dark:border-emerald-800'
                : 'border-amber-300 dark:border-amber-700 ring-2 ring-amber-500/20'
            }`}
          >
            <div className="space-y-3">
              
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Billing Cycle
                  </span>
                  <h3 className="font-extrabold text-base text-gray-900 dark:text-gray-100 font-serif">
                    {fee.month}
                  </h3>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                    fee.status === 'Paid'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 animate-pulse'
                  }`}
                >
                  {fee.status === 'Paid' ? '✅ Paid' : '⚠️ Fee Due'}
                </span>
              </div>

              <div className="flex justify-between items-center p-3.5 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Amount</span>
                  <span className="text-xl font-black text-emerald-900 dark:text-emerald-300 font-mono">
                    {fee.currency}{fee.amount}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-gray-400 font-bold uppercase block">Due Date</span>
                  <span className="text-xs font-mono font-bold text-gray-700 dark:text-gray-300">
                    {fee.dueDate}
                  </span>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <span className="text-[10px] text-gray-400 font-mono">
                Receipt: {fee.receiptNumber}
              </span>

              {fee.status === 'Paid' ? (
                <button
                  onClick={() => setSelectedFee(fee)}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition flex items-center space-x-1.5 shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Download Receipt</span>
                </button>
              ) : (
                <button
                  onClick={() => markFeeAsPaid(fee.id, 'Online Gateway / Card')}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-emerald-950 text-xs font-extrabold rounded-xl transition shadow-md"
                >
                  Pay Online Now ({fee.currency}{fee.amount})
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Printable Receipt Modal */}
      {selectedFee && (
        <ReceiptModal
          feeRecord={selectedFee}
          student={activeStudent}
          onClose={() => setSelectedFee(null)}
        />
      )}

    </div>
  );
};
