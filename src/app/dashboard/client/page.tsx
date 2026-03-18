"use client";

import { useState, useEffect } from "react";
import { Search, Plus, MoreHorizontal, Share2, UploadCloud, Briefcase, FileText, CheckCircle, Eye, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ClientDashboardPage() {
  const [userName, setUserName] = useState("Client");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      {/* Center Main Area */}
      <div className="flex-1 flex flex-col space-y-8 min-w-0">
        
        {/* Search Bar matching image */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input 
            placeholder="Search freelancers, active projects, or files..." 
            className="w-full pl-12 h-14 bg-white border-0 shadow-sm rounded-2xl text-base ring-offset-0 focus-visible:ring-1 focus-visible:ring-primary/20"
          />
        </div>

        {/* Categories (Colored Cards) */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Blue Card */}
            <div className="bg-[#615CFA] text-white rounded-2xl p-5 flex flex-col relative overflow-hidden shadow-md cursor-pointer hover:opacity-90 transition-opacity">
              <div className="absolute top-4 right-4">
                <CheckCircle className="h-5 w-5 text-yellow-300 fill-yellow-300" />
              </div>
              <div className="bg-white/20 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-6">
                <DollarSign className="w-5 h-5" />
              </div>
              <p className="font-semibold text-lg">$4,500</p>
              <p className="text-white/80 text-sm font-medium mt-1">Total Spent</p>
            </div>

            {/* Teal Card */}
            <div className="bg-[#0BBBB1] text-white rounded-2xl p-5 flex flex-col shadow-md cursor-pointer hover:opacity-90 transition-opacity">
              <div className="bg-white/20 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-6">
                <Briefcase className="w-5 h-5" />
              </div>
              <p className="font-semibold text-lg">2</p>
              <p className="text-white/80 text-sm font-medium mt-1">Active Projects</p>
            </div>

            {/* Pinkish Card */}
            <div className="bg-[#EE6C95] text-white rounded-2xl p-5 flex flex-col shadow-md cursor-pointer hover:opacity-90 transition-opacity">
              <div className="bg-white/20 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-6">
                <Users className="w-5 h-5" />
              </div>
              <p className="font-semibold text-lg">7</p>
              <p className="text-white/80 text-sm font-medium mt-1">Hired Talent</p>
            </div>

            {/* Light Blue Card */}
            <div className="bg-[#3B82F6] text-white rounded-2xl p-5 flex flex-col shadow-md cursor-pointer hover:opacity-90 transition-opacity">
              <div className="bg-white/20 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-6">
                <FileText className="w-5 h-5" />
              </div>
              <p className="font-semibold text-lg">21</p>
              <p className="text-white/80 text-sm font-medium mt-1">Applications</p>
            </div>

          </div>
        </div>

        {/* Files (White Shortcut Cards) */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">Shortcuts</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            
            <Link href="/talent" className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col group hover:border-primary/30 transition-all">
               <div className="flex items-center space-x-3 mb-4">
                 <Search className="w-5 h-5 text-indigo-500" />
                 <span className="font-semibold text-slate-700">Find Talent</span>
               </div>
               <p className="text-xs text-slate-400">Search freelancers</p>
            </Link>

            <Link href="/dashboard/client/applications" className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col group hover:border-primary/30 transition-all">
               <div className="flex items-center space-x-3 mb-4">
                 <FileText className="w-5 h-5 text-teal-500" />
                 <span className="font-semibold text-slate-700">Applications</span>
               </div>
               <p className="text-xs text-slate-400">Review candidates</p>
            </Link>

            <Link href="/dashboard/client/jobs" className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col group hover:border-primary/30 transition-all">
               <div className="flex items-center space-x-3 mb-4">
                 <Briefcase className="w-5 h-5 text-pink-500" />
                 <span className="font-semibold text-slate-700">My Jobs</span>
               </div>
               <p className="text-xs text-slate-400">Manage listings</p>
            </Link>
            
            <Link href="/dashboard/client/settings" className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col group hover:border-primary/30 transition-all">
               <div className="flex items-center space-x-3 mb-4">
                 <UploadCloud className="w-5 h-5 text-blue-500" />
                 <span className="font-semibold text-slate-700">Company</span>
               </div>
               <p className="text-xs text-slate-400">Update profile</p>
            </Link>

            <Link href="/jobs/post" className="bg-white p-4 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all group">
               <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </Link>

          </div>
        </div>

        {/* Recent Activity List */}
        <div className="pb-8">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Recent Submissions</h3>
          <div className="space-y-3">
            
            {[
              { id: 1, title: "Alex Smith applied to React role", icon: "Avatar", type: "Application", time: "1 hour ago", color: "bg-indigo-500" },
              { id: 2, title: "Maria Lopez accepted offer", icon: "Avatar", type: "Contract Signed", time: "5 hours ago", color: "bg-pink-500" },
              { id: 3, title: "UI Redesign Deliverable v1.zip", icon: "File", type: "File Received", time: "1 day ago", color: "bg-blue-500" },
              { id: 4, title: "New Message from David", icon: "Message", type: "Unread Message", time: "2 days ago", color: "bg-teal-500" },
            ].map(item => (
              <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${item.color}`}>
                     <span className="text-xs font-bold leading-none">{item.icon.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 text-sm sm:text-base">{item.title}</h4>
                  </div>
                </div>
                <div className="hidden sm:flex text-sm font-medium text-slate-500">
                  {item.type}
                </div>
                <div className="flex items-center space-x-6 text-sm text-slate-400 font-medium">
                  <span className="w-24 text-right">{item.time}</span>
                  <div className="flex space-x-2">
                    <button className="p-1 hover:text-primary transition-colors"><Share2 className="w-4 h-4" /></button>
                    <button className="p-1 hover:text-primary transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-80 shrink-0 flex flex-col space-y-6">
        
        {/* Pro Badge */}
        <div className="flex justify-end">
           <div className="bg-[#3B82F6] text-white px-6 py-3 rounded-2xl shadow-lg relative cursor-pointer hover:bg-blue-600 transition-colors">
              <span className="text-xl font-bold tracking-wide">Enterprise</span>
           </div>
        </div>

        {/* Upload Portfolio Box -> Post Job for Client */}
        <Link href="/jobs/post">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary/50 transition-colors h-full">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-[#3B82F6] mb-4 group-hover:-translate-y-1 transition-transform">
                <UploadCloud className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-slate-800">Post a New Gig</h4>
            <p className="text-xs text-slate-400 mt-2">Publish a new job listing to receive applications from top student talent.</p>
          </div>
        </Link>

        {/* Profile Completeness (Storage equivalent) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
           <div className="flex justify-between items-center mb-2">
             <h4 className="font-bold text-slate-800 text-sm">Company Profile</h4>
             <span className="text-xs font-bold text-[#0BBBB1]">15% left</span>
           </div>
           <p className="text-xs text-slate-400 mb-4">A complete profile attracts top-tier talent.</p>
           <Progress value={85} className="h-2 bg-slate-100" />
           <p className="text-[10px] text-slate-400 mt-2 text-right">Add your company logo next.</p>
        </div>

        {/* Suggested Jobs (Shared Folders equivalent) -> Top Candidates */}
        <div>
          <h4 className="font-bold text-slate-800 mb-3 text-sm">Top Candidates</h4>
          <div className="space-y-3">
             
             {/* List Item 1 */}
             <Link href="/talent" className="bg-[#E0F2FE] p-3 rounded-xl flex items-center justify-between group hover:opacity-90">
                <span className="text-sm font-semibold text-sky-800">Sr. Next.js Devs</span>
                <div className="flex -space-x-2">
                  <Avatar className="h-6 w-6 border-2 border-white">
                    <AvatarFallback className="text-[8px] bg-slate-200">JJ</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-6 w-6 border-2 border-white">
                    <AvatarFallback className="text-[8px] bg-slate-300">AS</AvatarFallback>
                  </Avatar>
                </div>
             </Link>

             {/* List Item 2 */}
             <Link href="/talent" className="bg-[#EDE9FE] p-3 rounded-xl flex items-center justify-between group hover:opacity-90">
                <span className="text-sm font-semibold text-purple-800">Graphic Designers</span>
                <div className="flex -space-x-2">
                  <Avatar className="h-6 w-6 border-2 border-white">
                    <AvatarFallback className="text-[8px] bg-slate-200">MB</AvatarFallback>
                  </Avatar>
                </div>
             </Link>

             {/* List Item 3 */}
             <Link href="/talent" className="bg-[#FCE7F3] p-3 rounded-xl flex items-center justify-between group hover:opacity-90">
                <span className="text-sm font-semibold text-pink-800">Content Writers</span>
                <div className="flex -space-x-2">
                  <Avatar className="h-6 w-6 border-2 border-white">
                    <AvatarFallback className="text-[8px] bg-slate-200">KT</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-6 w-6 border-2 border-white">
                    <AvatarFallback className="text-[8px] bg-slate-300">+4</AvatarFallback>
                  </Avatar>
                </div>
             </Link>

             <Button variant="outline" className="w-full h-10 rounded-xl text-xs text-slate-400 border-slate-200 hover:bg-slate-50 mt-1">
               + Filter more
             </Button>

          </div>
        </div>

      </div>

    </div>
  );
}

// Ensure the DollarSign icon is correctly instantiated above.
function DollarSign(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
}
