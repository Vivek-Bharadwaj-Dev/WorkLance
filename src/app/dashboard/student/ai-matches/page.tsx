"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { matchJobsToSkills, type JobMatcherOutput, type JobForPrompt } from "@/ai/flows/job-matcher-flow";
import type { Job } from "@/types";
import { Sparkles, Loader2, ExternalLink, Zap } from "lucide-react";
import Link from "next/link";
import { createBrowserClient } from '@supabase/ssr';



export default function AiMatchesPage() {
  const [studentSkills, setStudentSkills] = useState<string[]>([]);
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
         // Optionally load user specific skills, but defaulting to some nice tech skills
         setStudentSkills(["React", "TypeScript", "Tailwind"]);
      }
      
      const { data } = await supabase.from('jobs').select('*').eq('status', 'open').order('created_at', { ascending: false });
      if (data) {
         setAllJobs(data.map((job: any) => ({
            id: job.id,
            title: job.title,
            description: job.description,
            skillsRequired: job.skills_required || [],
            category: { id: job.category || 'other', name: job.category || 'Other' },
            postedBy: { id: job.employer_id, name: 'Employer' },
            type: job.type || 'online',
            status: job.status || 'open',
            createdAt: job.created_at
         })));
      }
    };
    fetchJobs();
  }, []);

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    const jobsForPrompt: JobForPrompt[] = allJobs.map(job => ({
      id: job.id,
      title: job.title,
      description: job.description,
      skillsRequired: job.skillsRequired || [],
    }));

    try {
      const aiOutput = await matchJobsToSkills({ studentSkills, jobs: jobsForPrompt });
      setRecommendations(aiOutput.map((rec: any) => ({
        ...rec,
        jobTitle: allJobs.find(j => j.id === rec.jobId)?.title
      })));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">AI Job Matches</h2>
          <p className="text-sm text-gray-500 mt-1">Smart recommendations based on your profile.</p>
        </div>
        <button
          onClick={handleGetRecommendations}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
          Find Matches
        </button>
      </div>

      <div className="p-6 rounded-xl border border-gray-100 bg-gray-50/30">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Analyzing against your skills</p>
        <div className="flex flex-wrap gap-2">
          {studentSkills.map(s => <span key={s} className="px-2 py-1 bg-white border border-gray-100 rounded text-xs text-gray-600 font-medium">{s}</span>)}
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.length > 0 ? recommendations.map((rec) => (
          <div key={rec.jobId} className="p-5 rounded-xl border border-gray-100 bg-white hover:border-indigo-100 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {rec.jobTitle || "Job Opportunity"}
                </h3>
                <p className="text-sm text-indigo-600 font-medium mt-1">{rec.reason}</p>
              </div>
              <Link href={`/jobs/${rec.jobId}`} className="text-gray-400 hover:text-indigo-600">
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )) : (
          <div className="text-center py-20 border-2 border-dashed border-gray-50 rounded-2xl">
            <Sparkles className="h-8 w-8 text-gray-100 mx-auto mb-3" />
            <p className="text-sm text-gray-400">Click &quot;Find Matches&quot; to see where you fit best.</p>
          </div>
        )}
      </div>
    </div>
  );
}
