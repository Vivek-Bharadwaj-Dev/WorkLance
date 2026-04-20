
"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Job } from "@/types";
import { BriefcaseBusiness, MapPin, DollarSign, Search, Filter, ChevronRight, Sparkles, SearchX } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { createBrowserClient } from '@supabase/ssr';

const ITEMS_PER_PAGE = 9;




function JobCard({ job }: { job: Job }) {
  return (
    <Card className="flex flex-col h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 group bg-card border-border/50">
      <CardHeader className="p-5">
        <div className="flex items-start justify-between mb-3">
            {job.postedBy.avatarUrl ? (
                 <Avatar className="h-12 w-12 border-2 border-primary/10 group-hover:border-primary transition-colors">
                    <AvatarImage src={job.postedBy.avatarUrl} alt={job.postedBy.name} data-ai-hint="company logo" />
                    <AvatarFallback>{job.postedBy.name.substring(0,1)}</AvatarFallback>
                </Avatar>
            ) : (
                 <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-primary font-semibold">
                    {job.postedBy.name.substring(0,1)}
                 </div>
            )}
            <Badge variant={job.type === 'online' ? 'secondary' : 'outline'} className="capitalize text-xs px-3 py-1 rounded-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                {job.type}
            </Badge>
        </div>
        <CardTitle className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">{job.title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mt-1">
          By {job.postedBy.name} &middot; {job.category.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{job.description}</p>
        <div className="space-y-2 text-xs text-muted-foreground">
          {job.location && (
            <div className="flex items-center">
              <MapPin className="h-3.5 w-3.5 mr-1.5 text-primary/70" /> {job.location}
            </div>
          )}
          {job.budget !== undefined && job.budget !== null && (
            <div className="flex items-center">
              <DollarSign className="h-3.5 w-3.5 mr-1.5 text-primary/70" /> Budget: ${job.budget}
              {/* Specific budget notes logic can be refined or generalized */}
            </div>
          )}
        </div>
        {job.skillsRequired && job.skillsRequired.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-1.5">
              {job.skillsRequired.slice(0,3).map(skill => (
                <Badge key={skill} variant="outline" className="text-xs px-2 py-0.5 bg-muted/50 transition-colors uppercase">{skill}</Badge>
              ))}
              {job.skillsRequired.length > 3 && <Badge variant="outline" className="text-xs px-2 py-0.5 bg-muted/50 transition-colors">+{job.skillsRequired.length - 3} more</Badge>}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-5 border-t border-border/30 mt-auto">
        <Button asChild className="w-full rounded-lg transition-colors">
          <Link href={`/jobs/${job.id}`}>View Details <ChevronRight className="ml-1.5 h-4 w-4"/></Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function JobsPage() {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [filteredAndSortedJobs, setFilteredAndSortedJobs] = useState<Job[]>([]);
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>([]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all"); 
  const [typeFilter, setTypeFilter] = useState("any");
  const [displayedJobsCount, setDisplayedJobsCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchJobs = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          profiles:employer_id (id, full_name, avatar_url)
        `)
        .order('created_at', { ascending: false });

      if (data) {
        const mappedJobs: Job[] = data.map((job: any) => ({
          id: job.id,
          title: job.title,
          description: job.description,
          category: { id: job.category || 'other', name: job.category || 'Other' },
          type: job.type || 'online',
          postedBy: { 
            id: job.employer_id, 
            name: job.profiles?.full_name || 'Employer', 
            avatarUrl: job.profiles?.avatar_url || '' 
          },
          createdAt: job.created_at,
          deadline: job.deadline,
          location: job.location,
          budget: job.budget,
          skillsRequired: job.skills_required || [],
          status: job.status || 'open'
        }));
        setAllJobs(mappedJobs);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    let tempJobs = [...allJobs];

    // Search term filtering
    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      tempJobs = tempJobs.filter(job =>
        job.title.toLowerCase().includes(lowerSearchTerm) ||
        job.description.toLowerCase().includes(lowerSearchTerm) ||
        (job.skillsRequired && job.skillsRequired.some(skill => skill.toLowerCase().includes(lowerSearchTerm))) ||
        job.postedBy.name.toLowerCase().includes(lowerSearchTerm) ||
        job.category.name.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Category filtering
    if (categoryFilter && categoryFilter !== "all") {
      tempJobs = tempJobs.filter(job => job.category.id === categoryFilter);
    }

    // Type filtering
    if (typeFilter && typeFilter !== "any") {
      tempJobs = tempJobs.filter(job => job.type === typeFilter);
    }
    
    // Sort by newest first (most recent createdAt)
    tempJobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    setFilteredAndSortedJobs(tempJobs);
  }, [searchTerm, categoryFilter, typeFilter, allJobs]);

  useEffect(() => {
    setDisplayedJobs(filteredAndSortedJobs.slice(0, displayedJobsCount));
  }, [filteredAndSortedJobs, displayedJobsCount]);

  const handleLoadMore = () => {
    setDisplayedJobsCount(prevCount => prevCount + ITEMS_PER_PAGE);
  };

  const allItemsLoaded = displayedJobsCount >= filteredAndSortedJobs.length;

  return (
    <div className="space-y-10 md:space-y-12 py-8 container-xl"> {/* Added container-xl */}
      <section className="bg-card p-6 md:p-8 rounded-xl shadow-lg border border-border/50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Find Your Next <span className="text-primary">Opportunity</span></h1>
                <p className="mt-2 text-muted-foreground">Browse freelance jobs and internships perfect for university students.</p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0 rounded-lg">
                <Sparkles className="mr-2 h-4 w-4 text-amber-500"/> AI Job Match (Soon)
            </Button>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="relative flex-grow sm:col-span-2 lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search by keyword, skill, company..." 
              className="pl-10 w-full rounded-lg h-11" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full rounded-lg h-11">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="design">Graphic Design</SelectItem>
              <SelectItem value="webdev">Web Development</SelectItem>
              <SelectItem value="marketing">Digital Marketing</SelectItem>
              <SelectItem value="writing">Writing & Translation</SelectItem>
              <SelectItem value="ai_ml">AI & Machine Learning</SelectItem>
              <SelectItem value="data_science">Data Science</SelectItem>
              <SelectItem value="tutor">Tutoring & Academics</SelectItem>
              <SelectItem value="video">Video & Animation</SelectItem>
              <SelectItem value="event">Event Support</SelectItem>
              <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
              <SelectItem value="gamedev">Game Development</SelectItem>
              <SelectItem value="cloud">Cloud Computing</SelectItem>
              <SelectItem value="robotics">Robotics</SelectItem>
              <SelectItem value="finance">Finance & Fintech</SelectItem>
              <SelectItem value="customer_service">Customer Service</SelectItem>
              <SelectItem value="sales_support">Sales Support</SelectItem>
              <SelectItem value="admin_support">Administrative Support</SelectItem>
              <SelectItem value="research_assistant">Research Assistant</SelectItem>
              <SelectItem value="general_help">General Help / Errands</SelectItem>
              <SelectItem value="hospitality">Hospitality & Events</SelectItem>
              <SelectItem value="manual_labor">Manual Labor & Trades</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
           <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full rounded-lg h-11">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Type</SelectItem>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Available Positions ({filteredAndSortedJobs.length})</h2>
        </div>
        {displayedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-16 rounded-xl shadow-md col-span-full bg-card border border-border/50">
            <CardContent className="flex flex-col items-center justify-center">
              <SearchX className="h-20 w-20 mx-auto text-muted-foreground mb-6 opacity-50" />
              <h2 className="text-2xl font-semibold text-foreground">No Opportunities Found</h2>
              <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                Your search didn't match any job listings. Try adjusting your search filters or check back later for new projects.
              </p>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" onClick={() => {setSearchTerm(""); setCategoryFilter("all"); setTypeFilter("any");}}>Clear All Filters</Button>
                <Button asChild>
                    <Link href="/jobs/post">Post a Job (Clients)</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </section>
      
      {!allItemsLoaded && displayedJobs.length > 0 && (
        <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg" className="rounded-lg px-8" onClick={handleLoadMore}>Load More Listings</Button>
        </div>
      )}
    </div>
  );
}

    
