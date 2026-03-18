
"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { studentDashboardLinks, CHAT_ID_SEPARATOR } from "@/lib/constants";
import { Eye, MessageSquare, Star } from "lucide-react";
import Link from "next/link";
import type { Job } from "@/types";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// Mock Data - Assuming postedBy.id is the client's email for chat
const MOCK_ACTIVE_JOBS: Partial<Job>[] = [
  {
    id: "job-active-1",
    title: "E-commerce Website Development",
    category: { id: "webdev", name: "Web Development" },
    status: "in-progress",
    postedBy: { id: "client-A@example.com", name: "Artisan Goods Co." },
    deadline: new Date(Date.now() + 86400000 * 15).toISOString(), // 15 days from now
  },
  {
    id: "job-active-2",
    title: "Brand Logo Design",
    category: { id: "design", name: "Graphic Design" },
    status: "completed",
    postedBy: { id: "client-B@example.com", name: "The Cozy Corner Cafe" },
    deadline: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago (deadline passed)
  },
];

// Helper function to generate chat ID
const generateChatId = (email1: string, email2: string): string => {
  const sortedEmails = [email1.toLowerCase(), email2.toLowerCase()].sort();
  return sortedEmails.join(CHAT_ID_SEPARATOR);
};

export default function StudentActiveJobsPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleMessageClient = (clientEmailToMessage: string | undefined) => {
    const currentUserEmail = localStorage.getItem('userEmail');

    if (!currentUserEmail || currentUserEmail.trim() === '' || !currentUserEmail.includes('@')) {
      toast({
        title: "Login Required / Invalid User Email",
        description: "Please ensure you are logged in with a valid email to message clients.",
        variant: "destructive",
      });
      if (!currentUserEmail) router.push('/login?redirect=/dashboard/student/jobs');
      return;
    }
    if (!clientEmailToMessage || clientEmailToMessage.trim() === '' || !clientEmailToMessage.includes('@')) {
      console.error("Client email is missing or invalid for chat:", clientEmailToMessage);
      toast({
        title: "Error Initiating Chat",
        description: "Could not initiate chat. Client identifier is invalid or missing.",
        variant: "destructive",
      });
      return;
    }
    const chatId = generateChatId(currentUserEmail, clientEmailToMessage);
    router.push(`/messages/${chatId}`);
  };

  return (
    <DashboardLayout navLinks={studentDashboardLinks} title="My Jobs" description="Manage your active and completed freelance projects.">
      <Card>
        <CardHeader>
          <CardTitle>Your Projects</CardTitle>
          <CardDescription>
            You have {MOCK_ACTIVE_JOBS.filter(j => j.status === 'in-progress').length} active project{MOCK_ACTIVE_JOBS.filter(j => j.status === 'in-progress').length === 1 ? "" : "s"}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {MOCK_ACTIVE_JOBS.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_ACTIVE_JOBS.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.postedBy?.name}</TableCell>
                    <TableCell>{job.deadline ? new Date(job.deadline).toLocaleDateString() : 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant={
                        job.status === 'in-progress' ? 'default' :
                        job.status === 'completed' ? 'secondary' : 'outline'
                      } className="capitalize">
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" asChild className="mr-1" title="View Job Details">
                        <Link href={`/jobs/${job.id}`}><Eye className="h-4 w-4" /></Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="mr-1" title="Message Client" onClick={() => handleMessageClient(job.postedBy?.id)}>
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                       {job.status === 'completed' && (
                        <Button variant="ghost" size="icon" title="Rate Client (Not implemented)">
                            <Star className="h-4 w-4" />
                        </Button>
                       )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-8">You have no active or completed jobs yet.</p>
          )}
        </CardContent>
      </Card>
      <div className="mt-8 flex justify-start">
        <Button asChild>
          <Link href="/jobs">Find New Jobs</Link>
        </Button>
      </div>
    </DashboardLayout>
  );
}
