"use client";

import { DollarSign, Clock, CheckCircle } from "lucide-react";

export default function StudentPaymentsPage() {
  const summary = [
    { label: "Completed Earnings", value: "$725.00", icon: CheckCircle, color: "text-emerald-500" },
    { label: "Pending Withdrawal", value: "$450.00", icon: Clock, color: "text-amber-500" },
  ];

  return (
    <div className="space-y-10 max-w-4xl">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Payments</h2>
        <p className="text-sm text-gray-500 mt-1">Track your earnings and transaction history.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {summary.map((s) => (
          <div key={s.label} className="p-6 rounded-xl border border-gray-100 bg-white">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{s.label}</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
        <div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-50">
          {[
            { id: "TX-100", job: "E-comm Website", amount: "$425.00", date: "Oct 12, 2023", status: "Completed" },
            { id: "TX-101", job: "Logo Design", amount: "$300.00", date: "Oct 08, 2023", status: "Completed" },
          ].map((tx) => (
            <div key={tx.id} className="p-4 flex items-center justify-between bg-white text-sm">
              <div>
                <p className="font-medium text-gray-900">{tx.job}</p>
                <p className="text-xs text-gray-400">{tx.id} • {tx.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{tx.amount}</p>
                <p className="text-[10px] text-emerald-600 font-bold uppercase">{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
