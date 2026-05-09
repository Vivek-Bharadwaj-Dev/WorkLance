"use client";

import { useState, useEffect } from "react";
import { FileText, Eye, Edit3, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from '@/lib/supabase/client';

export default function StudentProposalsPage() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: appData } = await supabase
        .from('applications')
        .select(`
           *,
           jobs:job_id(title)
        `)
        .eq('student_id', user.id)
        .order('created_at', { ascending: false });

      if (appData) {
        setApps(appData);
      }
    } catch (e) {
      console.error("Fetch proposals error", e);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Proposals</h2>
        <p className="text-sm text-gray-500 mt-1">Check the status of your submitted applications.</p>
      </div>

      {loading ? (
        <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
      ) : (
      <div className="space-y-3">
        {apps.length === 0 ? (
          <p className="text-sm text-muted-foreground p-4 bg-muted/30 rounded-xl">You have not submitted any proposals yet.</p>
        ) : apps.map((app, i) => (
          <div key={i} className="p-5 border border-gray-100 rounded-xl bg-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded bg-gray-50 flex items-center justify-center">
                <FileText className="h-4 w-4 text-gray-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{app.jobs?.title || 'Unknown Job'}</h3>
                <p className="text-xs text-gray-500">Submitted on {new Date(app.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                app.status?.toLowerCase() === "accepted" ? "bg-emerald-50 text-emerald-600" : 
                app.status?.toLowerCase() === "rejected" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
              }`}>
                {app.status || 'Pending'}
              </span>
              <div className="flex items-center gap-2">
                <Link href={`/jobs/${app.job_id}`} className="p-1.5 text-gray-400 hover:text-indigo-600"><Eye className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
