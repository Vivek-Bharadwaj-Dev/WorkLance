
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { studentDashboardLinks } from "@/lib/constants";
import { matchJobsToSkills, type JobMatcherOutput, type JobForPrompt } from "@/ai/flows/job-matcher-flow";
import type { Job } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sparkles, AlertTriangle, Loader2, ExternalLink } from "lucide-react";
import Link from "next/link";

const JOBS_DB_KEY = 'WorklanceMockJobsDB';
const USER_DB_KEY = 'WorklanceMockUserDB'; // Assuming student's email is their ID

const MOCK_JOBS_INITIAL_SEED: Job[] = [
    {
    id: "1",
    title: "Graphic Designer for Local Cafe Branding",
    description: "We're looking for a creative student to design a new logo, menu, and promotional materials for our cafe. Show us your unique style!",
    category: { id: "design", name: "Graphic Design" },
    type: "offline",
    postedBy: { id: "client1", name: "The Cozy Corner Cafe", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=CC" },
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    deadline: new Date(Date.now() + 86400000 * 12).toISOString(),
    location: "Downtown University Area",
    budget: 300,
    skillsRequired: ["Adobe Illustrator", "Photoshop", "Branding"],
    status: "open",
  },
  {
    id: "2",
    title: "Build a Responsive E-commerce Website",
    description: "Seeking a talented web development student to build a fully responsive e-commerce site for our new handmade crafts business. Experience with Shopify or WooCommerce is a plus.",
    category: { id: "webdev", name: "Web Development" },
    type: "online",
    postedBy: { id: "client2", name: "Artisan Goods Co.", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=AG" },
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    location: "Remote",
    skillsRequired: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    budget: 850,
    status: "open",
  },
];


type RecommendedJobDisplay = JobMatcherOutput[0] & {
  jobTitle?: string;
  jobDescription?: string;
};

export default function AiMatchesPage() {
  const [studentSkills, setStudentSkills] = useState<string[]>([]);
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendedJobDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetchedInitialData, setHasFetchedInitialData] = useState(false);

  const fetchStudentAndJobData = useCallback(() => {
    // Fetch student skills
    const userEmail = localStorage.getItem('userName'); // Assuming email is stored as userName for demo
    if (userEmail) {
      const storedUsersRaw = localStorage.getItem(USER_DB_KEY);
      const storedUsers = storedUsersRaw ? JSON.parse(storedUsersRaw) : {};
      const currentUser = storedUsers[userEmail];
      if (currentUser && currentUser.role === 'student' && Array.isArray(currentUser.skills)) {
        setStudentSkills(currentUser.skills);
      } else {
        setStudentSkills([]); // Default to empty if no skills or not student
         setError("Could not find your skills. Please ensure your profile is complete.");
      }
    } else {
      setError("Could not identify user. Please log in again.");
    }

    // Fetch all jobs
    let jobsFromStorage: Job[] = [];
    const storedJobsRaw = localStorage.getItem(JOBS_DB_KEY);
    if (storedJobsRaw) {
      try {
        jobsFromStorage = JSON.parse(storedJobsRaw);
      } catch (e) {
        console.error("Error parsing jobs from localStorage", e);
        jobsFromStorage = [];
      }
    }
    if (jobsFromStorage.length === 0 && MOCK_JOBS_INITIAL_SEED.length > 0) {
      setAllJobs(MOCK_JOBS_INITIAL_SEED);
    } else {
      setAllJobs(jobsFromStorage);
    }
    setHasFetchedInitialData(true);
  }, []);

  useEffect(() => {
    fetchStudentAndJobData();
  }, [fetchStudentAndJobData]);

  const handleGetRecommendations = async () => {
    if (!hasFetchedInitialData) {
        setError("Initial data not loaded yet. Please wait a moment and try again.");
        return;
    }
    if (studentSkills.length === 0) {
      setError("You have no skills listed in your profile. Please add skills to get recommendations.");
      setRecommendations([]);
      return;
    }
    if (allJobs.length === 0) {
      setError("There are currently no jobs available to match against.");
      setRecommendations([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    const jobsForPrompt: JobForPrompt[] = allJobs.map(job => ({
      id: job.id,
      title: job.title,
      description: job.description.substring(0, 200), // Keep description concise for prompt
      skillsRequired: job.skillsRequired || [],
    }));

    try {
      const aiOutput = await matchJobsToSkills({ studentSkills, jobs: jobsForPrompt });
      
      const detailedRecommendations: RecommendedJobDisplay[] = aiOutput.map((rec: any) => {
        const jobDetails = allJobs.find(job => job.id === rec.jobId);
        return {
          ...rec,
          jobTitle: jobDetails?.title,
          jobDescription: jobDetails?.description,
        };
      });
      setRecommendations(detailedRecommendations);

    } catch (err: any) {
      console.error("AI Job Matching Error:", err);
      setError(err.message || "An error occurred while fetching recommendations.");
      setRecommendations([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout navLinks={studentDashboardLinks} title="AI Job Matches" description="Discover personalized job recommendations based on your skills.">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center"><Sparkles className="mr-2 h-5 w-5 text-primary" /> Get Personalized Recommendations</CardTitle>
          <CardDescription>
            Our AI will analyze your skills and compare them against available job opportunities to suggest the best fits for you.
            Your current skills: {studentSkills.length > 0 ? studentSkills.join(', ') : 'No skills found in profile.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGetRecommendations} disabled={isLoading || !hasFetchedInitialData}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Finding Matches..." : "Find My Matches"}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Top Matches</CardTitle>
            <CardDescription>Here are jobs that our AI thinks could be a great fit for you:</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec) => (
              <Card key={rec.jobId} className="p-4 hover:shadow-md transition-shadow">
                <CardTitle className="text-lg mb-1">{rec.jobTitle || `Job ID: ${rec.jobId}`}</CardTitle>
                <CardDescription className="text-sm text-primary mb-2 italic">Reason: {rec.reason}</CardDescription>
                {rec.jobDescription && <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{rec.jobDescription}</p>}
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/jobs/${rec.jobId}`}>View Job Details <ExternalLink className="ml-2 h-3 w-3"/></Link>
                </Button>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}

      {!isLoading && recommendations.length === 0 && !error && studentSkills.length > 0 && (
        <Card>
            <CardContent className="pt-6">
                <p className="text-muted-foreground text-center">No specific recommendations found at this time, or you haven't clicked "Find My Matches" yet. Try updating your skills or check back later!</p>
            </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}
