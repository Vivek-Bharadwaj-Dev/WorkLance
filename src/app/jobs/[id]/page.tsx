
"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Job } from "@/types";
import { Briefcase, CalendarDays, DollarSign, MapPin, MessageSquare, Share2, AlertTriangle, ExternalLink, Loader2, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useToast } from '@/hooks/use-toast';
import { CHAT_ID_SEPARATOR } from '@/lib/constants';
import { createBrowserClient } from '@supabase/ssr';





export default function JobDetailsPage() {
  const params = useParams();
  const jobId = params.id as string;
  const [job, setJob] = useState<Job | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    const initializeData = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user?.email) {
        setLoggedInUserEmail(userData.user.email.toLowerCase());
      } else {
        const localEmail = localStorage.getItem('userEmail');
        if (localEmail) setLoggedInUserEmail(localEmail.toLowerCase());
      }

      if (jobId) {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('jobs')
          .select(`
            *,
            profiles:employer_id (id, full_name, avatar_url, whatsapp_number)
          `)
          .eq('id', jobId)
          .single();

        if (data) {
          const mappedJob: Job = {
            id: data.id,
            title: data.title,
            description: data.description,
            category: { id: data.category || 'other', name: data.category || 'Other' },
            type: data.type || 'online',
            postedBy: { 
              id: data.employer_id, 
              name: data.profiles?.full_name || 'Employer', 
              avatarUrl: data.profiles?.avatar_url || '',
              whatsappNumber: data.profiles?.whatsapp_number
            },
            createdAt: data.created_at,
            deadline: data.deadline,
            location: data.location,
            budget: data.budget,
            skillsRequired: data.skills_required || [],
            status: data.status || 'open'
          };
          setJob(mappedJob);
        } else {
          setJob(null);
        }
        setIsLoading(false);
      }
    };
    initializeData();
  }, [jobId]);

  const handleClientWhatsAppContact = () => {
    if (job && job.postedBy.whatsappNumber) {
      const cleanNumber = job.postedBy.whatsappNumber.replace(/\D/g, '');
      window.open(`https://wa.me/${cleanNumber}`, '_blank');
    }
  };

  const handleMessageClient = async () => {
    if (!loggedInUserEmail) {
       toast({
        title: "Login Required",
        description: "Please log in to message the client.",
        variant: "destructive",
      });
      router.push(`/login?redirect=${pathname}`);
      return;
    }

    const clientId = job?.postedBy.id;
    if (!clientId) return;

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      if (user.id === clientId) {
        toast({ title: "Action Not Available", description: "You cannot message yourself.", variant: "default" });
        return;
      }

      let { data: convo } = await supabase.from('conversations')
        .select('id')
        .or(`and(participant1_id.eq.${user.id},participant2_id.eq.${clientId}),and(participant1_id.eq.${clientId},participant2_id.eq.${user.id})`)
        .maybeSingle();

      if (!convo) {
        const { data: newConvo } = await supabase.from('conversations').insert({
          participant1_id: user.id,
          participant2_id: clientId,
          job_id: job?.id
        }).select().single();
        convo = newConvo;
      }
      
      if (convo) {
        router.push(`/messages/${convo.id}`);
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Could not start conversation.", variant: "destructive" });
    }
  };

  const handleApply = async () => {
    if (!loggedInUserEmail) {
      toast({
        title: "Login Required",
        description: "Please log in to apply for jobs.",
        variant: "destructive",
      });
      router.push(`/login?redirect=${pathname}`);
      return;
    }
    
    setIsApplying(true);
    
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from('applications').insert({
        job_id: job?.id,
        student_id: user.id,
        status: 'pending'
      });

      if (error) throw error;

      setHasApplied(true);
      toast({
        title: "Application Submitted!",
        description: "The client will be able to review your profile and proposal.",
        variant: "default",
      });
      router.push('/dashboard/student');
    } catch (error) {
      console.error(error);
      toast({
        title: "Application Failed",
        description: "Could not submit your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsApplying(false);
    }
  };

  const isOwnJobPost = loggedInUserEmail && job && job.postedBy.id.toLowerCase() === loggedInUserEmail;

  if (isLoading || job === undefined) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)] p-4">
        <Card className="w-full max-w-md animate-pulse shadow-lg">
          <CardHeader className="items-center">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg font-medium text-muted-foreground">Loading job details...</p>
            <p className="text-sm text-muted-foreground">Please wait a moment.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-10 max-w-md mx-auto">
        <Card className="shadow-lg">
            <CardHeader className="items-center">
                <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
                <CardTitle className="text-2xl">Job Not Found</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mt-2">The job you're looking for (ID: {jobId}) doesn't exist or may have been removed.</p>
                <Button asChild className="mt-6">
                    <Link href="/jobs">Back to Job Listings</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  const timeSincePosted = Math.floor((new Date().getTime() - new Date(job.createdAt).getTime()) / (1000 * 60 * 60 * 24));
  const daysToDeadline = job.deadline ? Math.ceil((new Date(job.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;


  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8 px-4">
      <Card className="shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="p-6 bg-card">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <Badge variant={job.type === 'online' ? 'secondary' : 'outline'} className="capitalize mb-2 text-sm py-1 px-3 rounded-md">{job.type}</Badge>
              <CardTitle className="text-3xl font-bold text-foreground">{job.title}</CardTitle>
              <CardDescription className="text-md text-muted-foreground mt-1">
                Posted {timeSincePosted} day{timeSincePosted === 1 ? '' : 's'} ago by {job.postedBy.name}
              </CardDescription>
            </div>
            <div className="flex-shrink-0 space-x-2 mt-4 md:mt-0">
                <Button variant="outline" size="sm" disabled><Share2 className="mr-2 h-4 w-4" /> Share (Soon)</Button>
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90" 
                  disabled={!!isOwnJobPost || hasApplied || isApplying}
                  onClick={handleApply}
                >
                  {isOwnJobPost 
                    ? "This is Your Post" 
                    : isApplying 
                      ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Applying...</>
                      : hasApplied
                        ? "Applied"
                        : "Apply Now"
                  }
                  {!isOwnJobPost && !hasApplied && !isApplying && <ExternalLink className="ml-2 h-4 w-4"/>}
                </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm sm:prose max-w-none text-muted-foreground dark:prose-invert">
              <p className="whitespace-pre-line">{job.description}</p>
            </CardContent>
          </Card>

          {job.skillsRequired && job.skillsRequired.length > 0 && (
            <Card className="shadow-lg rounded-lg">
              <CardHeader>
                <CardTitle>Skills Required</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.skillsRequired.map(skill => (
                    <Badge key={skill} variant="secondary" className="text-sm px-3 py-1 rounded-md">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle>Job Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {job.budget !== undefined && (
                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">${job.budget.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Budget</p>
                  </div>
                </div>
              )}
              {job.location && (
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                   <div>
                    <p className="font-medium text-foreground">{job.location}</p>
                    <p className="text-xs text-muted-foreground">Location</p>
                  </div>
                </div>
              )}
              {job.deadline && daysToDeadline !== null && (
                 <div className="flex items-start">
                  <CalendarDays className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">
                      {daysToDeadline > 0 ? `${daysToDeadline} day${daysToDeadline === 1 ? '' : 's'} left` : 'Deadline Passed'}
                    </p>
                    <p className="text-xs text-muted-foreground">Apply by: {new Date(job.deadline).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
               <div className="flex items-start">
                  <Briefcase className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">{job.category.name}</p>
                    <p className="text-xs text-muted-foreground">Category</p>
                  </div>
                </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle>About the Client</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 border">
                <AvatarImage src={job.postedBy.avatarUrl || undefined} alt={job.postedBy.name} data-ai-hint="company logo" />
                <AvatarFallback>{job.postedBy.name.substring(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg text-foreground">{job.postedBy.name}</h3>
                 <p className="text-xs text-muted-foreground">Client Profile (Coming Soon)</p>
              </div>
            </CardContent>
            <CardContent className="space-y-2">
                 <Button variant="outline" className="w-full" onClick={handleMessageClient} disabled={!!isOwnJobPost}>
                    <MessageSquare className="mr-2 h-4 w-4" /> {isOwnJobPost ? "This is Your Post" : "Message Client"}
                 </Button>
                 {job.postedBy.whatsappNumber && !isOwnJobPost && (
                    <Button variant="outline" className="w-full" onClick={handleClientWhatsAppContact}>
                        <Phone className="mr-2 h-4 w-4" /> Contact via WhatsApp
                    </Button>
                  )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle>Similar Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">More job recommendations coming soon!</p>
        </CardContent>
      </Card>
    </div>
  );
}
