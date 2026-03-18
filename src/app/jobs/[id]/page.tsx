
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

const JOBS_DB_KEY = 'internaMockJobsDB';

const MOCK_JOBS_INITIAL_SEED: Job[] = [
   {
    id: "1",
    title: "Graphic Designer for Local Cafe Branding",
    description: "We're looking for a creative student to design a new logo, menu, and promotional materials for our cafe. Responsibilities include: collaborating with the owner on concepts, delivering print-ready files, and iterating based on feedback. This is a great opportunity to build your portfolio with a real-world project. Please include a link to your portfolio in your application.",
    category: { id: "design", name: "Graphic Design" },
    type: "offline",
    postedBy: { id: "client1@example.com", name: "The Cozy Corner Cafe", avatarUrl: "https://dummyimage.com/80x80.png/eeeeee/333333&text=CC", whatsappNumber: "+15551234567" },
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    deadline: new Date(Date.now() + 86400000 * 12).toISOString(),
    location: "123 University Ave, Downtown Campus",
    budget: 300,
    skillsRequired: ["Adobe Illustrator", "Photoshop", "Branding", "Typography", "Print Design"],
    status: "open",
  },
  {
    id: "2",
    title: "Build a Responsive E-commerce Website",
    description: "Seeking a talented web development student to build a fully responsive e-commerce site for our new handmade crafts business. The project involves front-end and back-end development, payment gateway integration, and ensuring a seamless user experience. Experience with Shopify or WooCommerce is a plus. We're looking for someone proactive and communicative.",
    category: { id: "webdev", name: "Web Development" },
    type: "online",
    postedBy: { id: "client2@example.com", name: "Artisan Goods Co.", avatarUrl: "https://dummyimage.com/80x80.png/eeeeee/333333&text=AG", whatsappNumber: "+15557654321" },
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    location: "Remote",
    skillsRequired: ["HTML5", "CSS3", "JavaScript (ES6+)", "React", "Node.js", "Express.js", "MongoDB", "REST APIs", "Git"],
    budget: 850,
    status: "open",
  },
];

// Helper function to generate chat ID
const generateChatId = (email1: string, email2: string): string => {
  const sortedEmails = [email1.toLowerCase(), email2.toLowerCase()].sort();
  return sortedEmails.join(CHAT_ID_SEPARATOR);
};

export default function JobDetailsPage() {
  const params = useParams();
  const jobId = params.id as string;
  const [job, setJob] = useState<Job | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    const CUE = localStorage.getItem('userEmail');
    if (CUE) {
        setLoggedInUserEmail(CUE.toLowerCase());
    }

    if (jobId) {
      setIsLoading(true);
      let allJobs: Job[] = [];
      const storedJobsRaw = localStorage.getItem(JOBS_DB_KEY);
      if (storedJobsRaw) {
        try {
          allJobs = JSON.parse(storedJobsRaw);
        } catch (e) {
          console.error("Error parsing jobs from localStorage", e);
          allJobs = MOCK_JOBS_INITIAL_SEED; 
        }
      } else {
        allJobs = MOCK_JOBS_INITIAL_SEED; 
      }

      setTimeout(() => {
        const foundJob = allJobs.find(j => j.id === jobId);
        setJob(foundJob || null);
        setIsLoading(false);
      }, 500);
    }
  }, [jobId]);

  const handleClientWhatsAppContact = () => {
    if (job && job.postedBy.whatsappNumber) {
      const cleanNumber = job.postedBy.whatsappNumber.replace(/\D/g, '');
      window.open(`https://wa.me/${cleanNumber}`, '_blank');
    }
  };

  const handleMessageClient = () => {
    const currentLoggedInUserEmail = localStorage.getItem('userEmail'); // Re-fetch to ensure freshness
    const clientEmailToMessage = job?.postedBy.id;

    if (!currentLoggedInUserEmail || currentLoggedInUserEmail.trim() === '' || !currentLoggedInUserEmail.includes('@')) {
       toast({
        title: "Login Required / Invalid User Email",
        description: "Please ensure you are logged in with a valid email to message the client.",
        variant: "destructive",
      });
      if (!currentLoggedInUserEmail) router.push(`/login?redirect=${pathname}`);
      return;
    }
    if (!clientEmailToMessage || clientEmailToMessage.trim() === '' || !clientEmailToMessage.includes('@')) { 
      console.error("Client email (job.postedBy.id) is missing or invalid for chat:", clientEmailToMessage);
      toast({
        title: "Error Initiating Chat",
        description: "Could not initiate chat. Client identifier is invalid or missing.",
        variant: "destructive",
      });
      return;
    }
    if (currentLoggedInUserEmail.toLowerCase() === clientEmailToMessage.toLowerCase()) {
      toast({
        title: "Action Not Available",
        description: "You cannot message yourself regarding your own job post.",
        variant: "default",
      });
      return;
    }
    const chatId = generateChatId(currentLoggedInUserEmail, clientEmailToMessage);
    router.push(`/messages/${chatId}`);
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
                <Button size="lg" className="bg-primary hover:bg-primary/90" disabled={!!isOwnJobPost}>
                  {isOwnJobPost ? "This is Your Post" : "Apply Now (Soon)"}
                  {!isOwnJobPost && <ExternalLink className="ml-2 h-4 w-4"/>}
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
