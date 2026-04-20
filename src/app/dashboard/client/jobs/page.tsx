"use client";

import { Briefcase, Eye, Edit, Trash2, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function ClientManageJobsPage() {
  const jobs = [
    { id: "j1", title: "Frontend Developer", category: "Web Dev", status: "Open", date: "3 days ago" },
    { id: "j2", title: "UX Designer", category: "Design", status: "Closed", date: "10 days ago" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Your Gigs</h2>
          <p className="text-sm text-gray-500 mt-1">Manage all your active and past job postings.</p>
        </div>
        <Link
          href="/jobs/post"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          <PlusCircle className="h-4 w-4" /> Post New
        </Link>
      </div>

      <div className="space-y-3">
        {jobs.map((job) => (
          <div key={job.id} className="p-5 border border-gray-100 rounded-xl bg-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded bg-gray-50 flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-gray-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{job.title}</h3>
                <p className="text-xs text-gray-500">{job.category} • Posted {job.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                job.status === "Open" ? "bg-emerald-50 text-emerald-600" : "bg-gray-50 text-gray-500"
              }`}>
                {job.status}
              </span>
              <div className="flex items-center gap-2">
                <Link href={`/jobs/${job.id}`} className="p-1.5 text-gray-400 hover:text-indigo-600"><Eye className="h-4 w-4" /></Link>
                <Link href={`/jobs/edit/${job.id}`} className="p-1.5 text-gray-400 hover:text-indigo-600"><Edit className="h-4 w-4" /></Link>
                <button className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
