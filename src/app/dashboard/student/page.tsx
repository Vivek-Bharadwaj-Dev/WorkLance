"use client";

import { useState, useEffect } from "react";
import { Search, Plus, MoreHorizontal, Share2, UploadCloud, Briefcase, FileText, CheckCircle, Eye, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function StudentDashboardPage() {
  const [userName, setUserName] = useState("User");

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
            placeholder="Search projects, messages, or files..." 
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
              <p className="font-semibold text-lg">$1,250</p>
              <p className="text-white/80 text-sm font-medium mt-1">Total Earnings</p>
            </div>

            {/* Teal Card */}
            <div className="bg-[#0BBBB1] text-white rounded-2xl p-5 flex flex-col shadow-md cursor-pointer hover:opacity-90 transition-opacity">
              <div className="bg-white/20 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-6">
                <Briefcase className="w-5 h-5" />
              </div>
              <p className="font-semibold text-lg">3</p>
              <p className="text-white/80 text-sm font-medium mt-1">Active Projects</p>
            </div>

            {/* Pinkish Card */}
            <div className="bg-[#EE6C95] text-white rounded-2xl p-5 flex flex-col shadow-md cursor-pointer hover:opacity-90 transition-opacity">
              <div className="bg-white/20 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-6">
                <FileText className="w-5 h-5" />
              </div>
              <p className="font-semibold text-lg">14</p>
              <p className="text-white/80 text-sm font-medium mt-1">Proposals Sent</p>
            </div>

            {/* Light Blue Card */}
            <div className="bg-[#3B82F6] text-white rounded-2xl p-5 flex flex-col shadow-md cursor-pointer hover:opacity-90 transition-opacity">
              <div className="bg-white/20 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-6">
                <Eye className="w-5 h-5" />
              </div>
              <p className="font-semibold text-lg">45</p>
              <p className="text-white/80 text-sm font-medium mt-1">Profile Views</p>
            </div>

          </div>
        </div>

        {/* Files (White Shortcut Cards) */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">Shortcuts</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            
            <Link href="/jobs" className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col group hover:border-primary/30 transition-all">
               <div className="flex items-center space-x-3 mb-4">
                 <Search className="w-5 h-5 text-indigo-500" />
                 <span className="font-semibold text-slate-700">Find Work</span>
               </div>
               <p className="text-xs text-slate-400">Browse new gigs</p>
            </Link>

            <Link href="/dashboard/student/proposals" className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col group hover:border-primary/30 transition-all">
               <div className="flex items-center space-x-3 mb-4">
                 <FileText className="w-5 h-5 text-teal-500" />
                 <span className="font-semibold text-slate-700">My Proposals</span>
               </div>
               <p className="text-xs text-slate-400">View statuses</p>
            </Link>

            <Link href="/dashboard/student/jobs" className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col group hover:border-primary/30 transition-all">
               <div className="flex items-center space-x-3 mb-4">
                 <Briefcase className="w-5 h-5 text-pink-500" />
                 <span className="font-semibold text-slate-700">My Projects</span>
               </div>
               <p className="text-xs text-slate-400">Current work</p>
            </Link>
            
            <Link href="/profile/edit" className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col group hover:border-primary/30 transition-all">
               <div className="flex items-center space-x-3 mb-4">
                 <User className="w-5 h-5 text-blue-500" />
                 <span className="font-semibold text-slate-700">Edit Profile</span>
               </div>
               <p className="text-xs text-slate-400">Update skills</p>
            </Link>

            <Link href="/jobs" className="bg-white p-4 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all group">
               <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </Link>

          </div>
        </div>

        {/* Recent Activity List */}
        <div className="pb-8">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            
            {[
              { id: 1, title: "Frontend React Developer (Intern)", icon: "React", type: "Application Sent", time: "2 hours ago", color: "bg-indigo-500" },
              { id: 2, title: "Figma UI Redesign", icon: "Design", type: "Contract Started", time: "1 day ago", color: "bg-pink-500" },
              { id: 3, title: "Node.js API Endpoint Fix", icon: "Backend", type: "Payment Received", time: "3 days ago", color: "bg-blue-500" },
              { id: 4, title: "SEO Content Writing", icon: "Writing", type: "Proposal Viewed", time: "4 days ago", color: "bg-teal-500" },
            ].map(item => (
              <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${item.color}`}>
                     {/* Replace with actual icons if needed, using generic initials for now based on icon type */}
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
                  <span className="w-20 text-right">{item.time}</span>
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
              <span className="text-xl font-bold tracking-wide">Pro</span>
           </div>
        </div>

        {/* Upload Portfolio Box */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary/50 transition-colors">
           <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-[#3B82F6] mb-4 group-hover:-translate-y-1 transition-transform">
              <UploadCloud className="w-8 h-8" />
           </div>
           <h4 className="font-bold text-slate-800">Add Portfolio Project</h4>
           <p className="text-xs text-slate-400 mt-2">Showcase your best work to clients to increase your chances of getting hired.</p>
        </div>

        {/* Profile Completeness (Storage equivalent) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
           <div className="flex justify-between items-center mb-2">
             <h4 className="font-bold text-slate-800 text-sm">Profile Completeness</h4>
             <span className="text-xs font-bold text-[#0BBBB1]">25% left</span>
           </div>
           <p className="text-xs text-slate-400 mb-4">A complete profile gets 3x more views.</p>
           <Progress value={75} className="h-2 bg-slate-100" />
           <p className="text-[10px] text-slate-400 mt-2 text-right">Add an explicit hourly rate next.</p>
        </div>

        {/* Suggested Jobs (Shared Folders equivalent) */}
        <div>
          <h4 className="font-bold text-slate-800 mb-3 text-sm">Recommended Matches</h4>
          <div className="space-y-3">
             
             {/* List Item 1 */}
             <Link href="/jobs/1" className="bg-[#E0F2FE] p-3 rounded-xl flex items-center justify-between group hover:opacity-90">
                <span className="text-sm font-semibold text-sky-800">UI Designer Needed</span>
                <div className="flex -space-x-2">
                  <Avatar className="h-6 w-6 border-2 border-white">
                    <AvatarFallback className="text-[8px] bg-slate-200">AC</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-6 w-6 border-2 border-white">
                    <AvatarFallback className="text-[8px] bg-slate-300">UX</AvatarFallback>
                  </Avatar>
                </div>
             </Link>

             {/* List Item 2 */}
             <Link href="/jobs/2" className="bg-[#EDE9FE] p-3 rounded-xl flex items-center justify-between group hover:opacity-90">
                <span className="text-sm font-semibold text-purple-800">React Native Fixes</span>
                <div className="flex -space-x-2">
                  <Avatar className="h-6 w-6 border-2 border-white">
                    <AvatarFallback className="text-[8px] bg-slate-200">DE</AvatarFallback>
                  </Avatar>
                </div>
             </Link>

             {/* List Item 3 */}
             <Link href="/jobs/3" className="bg-[#FCE7F3] p-3 rounded-xl flex items-center justify-between group hover:opacity-90">
                <span className="text-sm font-semibold text-pink-800">Shopify Custom Theme</span>
                <div className="flex -space-x-2">
                  <Avatar className="h-6 w-6 border-2 border-white">
                    <AvatarFallback className="text-[8px] bg-slate-200">SH</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-6 w-6 border-2 border-white">
                    <AvatarFallback className="text-[8px] bg-slate-300">+2</AvatarFallback>
                  </Avatar>
                </div>
             </Link>

             <Button variant="outline" className="w-full h-10 rounded-xl text-xs text-slate-400 border-slate-200 hover:bg-slate-50 mt-1">
               + View more
             </Button>

          </div>
        </div>

      </div>

    </div>
  );
}

// Ensure the DollarSign and User icons are correctly instantiated above.
function DollarSign(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
}

function User(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
}
