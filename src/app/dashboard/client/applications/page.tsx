"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Eye, CheckCircle, XCircle, User, Loader2 } from "lucide-react";
import Link from "next/link";
import { createBrowserClient } from '@supabase/ssr';
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ClientApplicationsPage() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      // We assume jobs table has employer_id, job_applications has job_id and student_id
      // fetching applications for jobs posted by this employer
      const { data: employerJobs } = await supabase.from('jobs').select('id, title').eq('employer_id', user.id);
      
      if (employerJobs && employerJobs.length > 0) {
        const jobIds = employerJobs.map(j => j.id);
        const { data: appData } = await supabase
          .from('job_applications')
          .select('*, profiles:student_id(full_name, avatar_url)')
          .in('job_id', jobIds)
          .order('created_at', { ascending: false });

        if (appData) {
          const mapped = appData.map(a => ({
             id: a.id,
             name: a.profiles?.full_name || "Unknown Student",
             avatarUrl: a.profiles?.avatar_url,
             jobTitle: employerJobs.find(j => j.id === a.job_id)?.title || "Unknown Job",
             status: a.status || 'Pending',
             studentId: a.student_id
          }));
          setApps(mapped);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (appId: string, status: string) => {
    try {
      const { error } = await supabase.from('job_applications').update({ status }).eq('id', appId);
      if (error) throw error;
      toast({ title: `Application ${status}`, description: `The application status has been updated.` });
      fetchApplications();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Applications</h2>
        <p className="text-sm text-gray-500 mt-1">Review students who applied for your jobs.</p>
      </div>

      <div className="space-y-3">
        {apps.length === 0 ? (
          <p className="text-sm text-muted-foreground p-4 bg-muted/30 rounded-xl">No applications received yet.</p>
        ) : apps.map((app, i) => (
          <div key={i} className="p-5 border border-gray-100 rounded-xl bg-white flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Avatar className="h-10 w-10">
                  <AvatarImage src={app.avatarUrl || ""} />
                  <AvatarFallback><User className="h-4 w-4 text-gray-400" /></AvatarFallback>
               </Avatar>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{app.name}</h3>
                <p className="text-xs text-indigo-600 font-medium">{app.jobTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                app.status.toLowerCase() === "accepted" ? "bg-emerald-50 text-emerald-600" : 
                app.status.toLowerCase() === "rejected" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
              }`}>
                {app.status}
              </span>
              <div className="flex items-center gap-2">
                <Link href={`/profile/${app.studentId}`} className="p-1.5 text-gray-400 hover:text-indigo-600" title="View Profile"><Eye className="h-4 w-4" /></Link>
                <Link href="/messages" className="p-1.5 text-gray-400 hover:text-indigo-600" title="Message"><MessageSquare className="h-4 w-4" /></Link>
                {app.status.toLowerCase() === "pending" && (
                  <div className="flex gap-1 pl-2 border-l border-gray-100 ml-1">
                    <button onClick={() => handleUpdateStatus(app.id, 'accepted')} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded" title="Accept"><CheckCircle className="h-4 w-4" /></button>
                    <button onClick={() => handleUpdateStatus(app.id, 'rejected')} className="p-1.5 text-red-500 hover:bg-red-50 rounded" title="Reject"><XCircle className="h-4 w-4" /></button>
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
