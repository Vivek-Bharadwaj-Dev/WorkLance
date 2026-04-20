"use client";

import { MessageSquare, Eye, CheckCircle, XCircle, User } from "lucide-react";
import Link from "next/link";

export default function ClientApplicationsPage() {
  const apps = [
    { id: "a1", name: "Alice W.", job: "Frontend Dev", status: "Pending", date: "1 day ago" },
    { id: "a2", name: "Bob B.", job: "Frontend Dev", status: "Accepted", date: "2 days ago" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Applications</h2>
        <p className="text-sm text-gray-500 mt-1">Review students who applied for your jobs.</p>
      </div>

      <div className="space-y-3">
        {apps.map((app, i) => (
          <div key={i} className="p-5 border border-gray-100 rounded-xl bg-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{app.name}</h3>
                <p className="text-xs text-indigo-600 font-medium">{app.job}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                app.status === "Accepted" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
              }`}>
                {app.status}
              </span>
              <div className="flex items-center gap-2">
                <button className="p-1.5 text-gray-400 hover:text-indigo-600"><Eye className="h-4 w-4" /></button>
                <button className="p-1.5 text-gray-400 hover:text-indigo-600"><MessageSquare className="h-4 w-4" /></button>
                {app.status === "Pending" && (
                  <div className="flex gap-1 pl-2 border-l border-gray-100 ml-1">
                    <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded"><CheckCircle className="h-4 w-4" /></button>
                    <button className="p-1.5 text-red-500 hover:bg-red-50 rounded"><XCircle className="h-4 w-4" /></button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
