"use client";

import { useEffect, useState } from "react";
import { Briefcase, FileText, Send, DollarSign, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export default function StudentDashboardPage() {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName.split(" ")[0]);
  }, []);

  const stats = [
    { label: "Active Jobs", value: "3", icon: Briefcase },
    { label: "Sent Proposals", value: "12", icon: Send },
    { label: "Pending Payments", value: "$450", icon: DollarSign },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Hello, {userName}</h2>
        <p className="text-gray-500 mt-1">Here is a quick overview of your freelance activity.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-gray-50 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-gray-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Recent Work */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Recent Projects</h3>
            <Link href="/dashboard/student/jobs" className="text-sm text-indigo-600 font-medium">View all</Link>
          </div>
          <div className="space-y-3">
            {[
              { title: "E-commerce Website", client: "Artisan Co", status: "Active" },
              { title: "Brand Identity", client: "Cozy Cafe", status: "Completed" },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 bg-gray-50/30">
                <div>
                  <p className="text-sm font-medium text-gray-900">{p.title}</p>
                  <p className="text-xs text-gray-500">{p.client}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  p.status === "Active" ? "bg-indigo-50 text-indigo-600" : "bg-emerald-50 text-emerald-600"
                }`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Action Center */}
        <section className="space-y-4">
          <h3 className="font-semibold text-gray-900">Looking for more?</h3>
          <div className="grid grid-cols-1 gap-3">
            <Link
              href="/jobs"
              className="group flex items-center justify-between p-5 rounded-xl border border-indigo-100 bg-indigo-50/40 hover:bg-indigo-50 transition-colors"
            >
              <div>
                <p className="text-sm font-bold text-indigo-900">Find New Jobs</p>
                <p className="text-xs text-indigo-600/70">Browse gigs that match your skills</p>
              </div>
              <ArrowRight className="h-4 w-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/profile/edit"
              className="group flex items-center justify-between p-5 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="text-sm font-bold text-gray-900">Complete Your Profile</p>
                <p className="text-xs text-gray-500">A full profile gets you noticed faster</p>
              </div>
              <Star className="h-4 w-4 text-gray-300 group-hover:text-amber-400 transition-colors" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
