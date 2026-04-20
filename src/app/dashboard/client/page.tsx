"use client";

import { useEffect, useState } from "react";
import { Briefcase, Users, PlusCircle, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ClientDashboardPage() {
  const [userName, setUserName] = useState("Client");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName.split(" ")[0]);
  }, []);

  const stats = [
    { label: "Active Postings", value: "2", icon: Briefcase },
    { label: "Total Hires", value: "5", icon: Users },
    { label: "Total Spent", value: "$1,200", icon: DollarSign },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Welcome, {userName}</h2>
          <p className="text-gray-500 mt-1">Manage your team and projects effortlessly.</p>
        </div>
        <Link
          href="/jobs/post"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <PlusCircle className="h-4 w-4" /> Post a Gig
        </Link>
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
        {/* Active Needs */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Current Listings</h3>
            <Link href="/dashboard/client/jobs" className="text-sm text-indigo-600 font-medium">Manage all</Link>
          </div>
          <div className="space-y-3">
            {[
              { title: "React Developer", apps: "8 Applications", status: "Open" },
              { title: "Logo Designer", apps: "3 Applications", status: "In Progress" },
            ].map((j, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 bg-gray-50/30">
                <div>
                  <p className="text-sm font-medium text-gray-900">{j.title}</p>
                  <p className="text-xs text-gray-500">{j.apps}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">
                  {j.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Talent Discovery */}
        <section className="space-y-4">
          <h3 className="font-semibold text-gray-900">Discovery</h3>
          <div className="space-y-3">
            <Link
              href="/talent"
              className="group flex items-center justify-between p-5 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all"
            >
              <div>
                <p className="text-sm font-bold text-gray-900">Find Top Talent</p>
                <p className="text-xs text-gray-500">Connect with the best student freelancers</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
            </Link>
            
            <Link
              href="/dashboard/client/applications"
              className="group flex items-center justify-between p-5 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all"
            >
              <div>
                <p className="text-sm font-bold text-gray-900">Review Applications</p>
                <p className="text-xs text-gray-500">Check who applied to your projects</p>
              </div>
              <div className="h-6 w-6 rounded-full bg-indigo-50 flex items-center justify-center">
                <span className="text-[10px] font-bold text-indigo-600">5</span>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
