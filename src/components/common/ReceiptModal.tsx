import React from 'react';
import { FeeRecord, Student } from '../../types';
import { X, Printer, CheckCircle2, Download, ShieldCheck } from 'lucide-react';

interface ReceiptModalProps {
  feeRecord: FeeRecord | null;
  student: Student | undefined;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  feeRecord,
  student,
  onClose
}) => {
  if (!feeRecord) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 border border-emerald-200 dark:border-gray-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative animate-in zoom-in duration-200">
        
        {/* Printable Section Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white p-6 relative">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 text-emerald-200 hover:text-white p-1 rounded-full bg-emerald-800/60 hover:bg-emerald-700 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-emerald-950 font-extrabold flex items-center justify-center text-xl shadow">
              ف
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg">Faizan-e-Ilm Online Academy</h3>
              <p className="text-xs text-amber-300 font-medium">Official Payment Receipt & Voucher</p>
            </div>
          </div>
        </div>

        {/* Printable Content */}
        <div className="p-6 space-y-6 print:p-8" id="printable-receipt">
          
          <div className="flex justify-between items-start border-b border-gray-100 dark:border-gray-800 pb-4">
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Receipt No.</p>
              <p className="text-sm font-extrabold text-emerald-900 dark:text-emerald-400 font-mono">
                {feeRecord.receiptNumber}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Payment Date</p>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {feeRecord.paidDate || feeRecord.dueDate}
              </p>
            </div>
          </div>

          {/* Student Info Box */}
          <div className="bg-emerald-50/60 dark:bg-gray-800/50 p-4 rounded-2xl border border-emerald-100 dark:border-gray-800 grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-gray-400 font-medium text-[10px]">Student Name</p>
              <p className="font-bold text-emerald-950 dark:text-emerald-200 text-sm">{student?.name || feeRecord.studentName}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium text-[10px]">Registration No.</p>
              <p className="font-mono font-bold text-gray-800 dark:text-gray-200">{student?.registrationNumber || 'FEI-2026-089'}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium text-[10px]">Parent / Guardian</p>
              <p className="font-medium text-gray-700 dark:text-gray-300">{student?.parentName || 'Tariq Mehmood'}</p>
            </div>
            <div>
              <p className="text-gray-400 font-medium text-[10px]">Country</p>
              <p className="font-medium text-gray-700 dark:text-gray-300">{student?.countryFlag} {student?.country}</p>
            </div>
          </div>

          {/* Payment Line Item */}
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-400 font-bold uppercase text-[10px]">
                <th className="py-2">Description</th>
                <th className="py-2">Billing Period</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              <tr>
                <td className="py-3 font-semibold text-gray-800 dark:text-gray-200">
                  Monthly Tuition Fee ({student?.primaryCourse || 'Quran Education'})
                </td>
                <td className="py-3 text-gray-600 dark:text-gray-400">{feeRecord.month}</td>
                <td className="py-3 text-right font-extrabold text-emerald-900 dark:text-emerald-400 text-sm font-mono">
                  {feeRecord.currency}{feeRecord.amount}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Total & Status */}
          <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl">
            <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="font-bold text-xs uppercase tracking-wide">
                Status: {feeRecord.status}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Total Paid</span>
              <span className="text-xl font-black text-emerald-900 dark:text-emerald-300 font-mono">
                {feeRecord.currency}{feeRecord.amount}
              </span>
            </div>
          </div>

          {/* Verification Stamp */}
          <div className="text-center pt-2">
            <div className="inline-flex items-center space-x-1 text-[11px] text-emerald-800 dark:text-emerald-400 font-semibold bg-emerald-100/60 dark:bg-emerald-900/30 px-3 py-1 rounded-full border border-emerald-300/60">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Electronic Signature • Faizan-e-Ilm Finance Dept</span>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="bg-gray-50 dark:bg-gray-800/80 px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-300"
          >
            Close
          </button>

          <div className="flex space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
