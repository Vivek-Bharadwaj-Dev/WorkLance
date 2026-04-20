"use client";

import { FileText, Eye, Edit3, Trash2 } from "lucide-react";
import Link from "next/link";

export default function StudentProposalsPage() {
  const apps = [
    { jobId: "j1", title: "Graphic Designer for Cafe", status: "Pending", date: "2 days ago" },
    { jobId: "j2", title: "Social Media Intern", status: "Accepted", date: "5 days ago" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Proposals</h2>
        <p className="text-sm text-gray-500 mt-1">Check the status of your submitted applications.</p>
      </div>

      <div className="space-y-3">
        {apps.map((app, i) => (
          <div key={i} className="p-5 border border-gray-100 rounded-xl bg-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded bg-gray-50 flex items-center justify-center">
                <FileText className="h-4 w-4 text-gray-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{app.title}</h3>
                <p className="text-xs text-gray-500">Submitted {app.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                app.status === "Accepted" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
              }`}>
                {app.status}
              </span>
              <div className="flex items-center gap-2">
                <Link href={`/jobs/${app.jobId}`} className="p-1.5 text-gray-400 hover:text-indigo-600"><Eye className="h-4 w-4" /></Link>
                {app.status === "Pending" && (
                  <>
                    <button className="p-1.5 text-gray-400 hover:text-indigo-600"><Edit3 className="h-4 w-4" /></button>
                    <button className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
