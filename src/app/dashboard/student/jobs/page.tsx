"use client";

import { Briefcase, Eye, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function StudentActiveJobsPage() {
  const jobs = [
    { id: "j1", title: "E-commerce Dev", client: "Artisan Co.", status: "In Progress", date: "Due in 15 days" },
    { id: "j2", title: "Brand Identity", client: "Cozy Cafe", status: "Completed", date: "Closed" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Active Work</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your current contracts and deliverables.</p>
        </div>
        <Link
          href="/jobs"
          className="text-sm font-medium text-indigo-600 flex items-center gap-1 hover:underline"
        >
          Browse more <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="p-5 border border-gray-100 rounded-xl bg-white hover:border-gray-200 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded bg-gray-50 flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-xs text-gray-500">{job.client} • {job.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  job.status === "In Progress" ? "bg-indigo-50 text-indigo-600" : "bg-gray-50 text-gray-500"
                }`}>
                  {job.status}
                </span>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 text-gray-400 hover:text-indigo-600 transition-colors"><MessageSquare className="h-4 w-4" /></button>
                  <Link href={`/jobs/${job.id}`} className="p-1.5 text-gray-400 hover:text-indigo-600 transition-colors"><Eye className="h-4 w-4" /></Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
