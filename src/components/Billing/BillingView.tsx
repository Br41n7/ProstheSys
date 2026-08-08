import React from 'react';
import { Invoice } from '../../types';
import { CreditCard, DollarSign, Printer, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface BillingViewProps {
  invoices?: Invoice[];
}

export const BillingView: React.FC<BillingViewProps> = ({ invoices = [] }) => {
  const safeInvoices = invoices || [];
  const totalBilled = safeInvoices.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalInsurance = safeInvoices.reduce((acc, curr) => acc + curr.insuranceCoveredAmount, 0);
  const totalPatientPay = safeInvoices.reduce((acc, curr) => acc + curr.patientPayAmount, 0);

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl border border-blue-900/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-teal-400" />
            <h1 className="text-lg font-bold">Billing, Claims & Invoices Ledger</h1>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Tracking clinical coding, NHIS / HMO reimbursements & out-of-pocket payments
          </p>
        </div>
      </div>

      {/* Overview Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-slate-400 font-medium text-[10px] block uppercase">Total Billed Volume</span>
          <span className="text-2xl font-bold text-slate-900 mt-1 block">₦{totalBilled.toLocaleString()}</span>
          <span className="text-slate-500 text-[10px]">Clinical device & service items</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-slate-400 font-medium text-[10px] block uppercase">NHIS / HMO Cover</span>
          <span className="text-2xl font-bold text-emerald-600 mt-1 block">₦{totalInsurance.toLocaleString()}</span>
          <span className="text-emerald-700 text-[10px]">HMO & government scheme claims</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-slate-400 font-medium text-[10px] block uppercase">Patient Out-of-Pocket</span>
          <span className="text-2xl font-bold text-blue-600 mt-1 block">₦{totalPatientPay.toLocaleString()}</span>
          <span className="text-blue-700 text-[10px]">Co-pay & direct patient balance</span>
        </div>
      </div>

      {/* Invoices List */}
      <div className="space-y-4">
        {safeInvoices.map((inv) => (
          <div key={inv.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-slate-900">{inv.patientName}</h2>
                <p className="text-xs text-slate-500">Invoice #{inv.id} • Issued: {inv.invoiceDate} • Due: {inv.dueDate}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg ${
                  inv.status === 'Paid'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {inv.status}
                </span>
                <button
                  onClick={() => window.print()}
                  className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 text-xs font-semibold flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Statement
                </button>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-x-auto text-xs">
              <table className="w-full min-w-[450px] text-left">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Code</th>
                    <th className="p-2.5">Item Description</th>
                    <th className="p-2.5 text-right">Amount (₦)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inv.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-mono text-blue-700 font-semibold">{item.code}</td>
                      <td className="p-2.5 text-slate-800">{item.description}</td>
                      <td className="p-2.5 text-right font-bold text-slate-900">₦{item.cost.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-end gap-6 text-xs pt-2">
              <div>
                <span className="text-slate-400 block text-[10px]">Insurance / HMO Covered:</span>
                <span className="font-bold text-emerald-600">₦{inv.insuranceCoveredAmount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Patient Balance:</span>
                <span className="font-bold text-slate-900">₦{inv.patientPayAmount.toLocaleString()}</span>
              </div>
              <div className="pl-4 border-l border-slate-200">
                <span className="text-slate-400 block text-[10px]">Total Invoice:</span>
                <span className="font-bold text-blue-900 text-sm">₦{inv.totalAmount.toLocaleString()}</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
