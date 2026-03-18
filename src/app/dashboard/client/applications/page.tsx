
"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { clientDashboardLinks, CHAT_ID_SEPARATOR } from "@/lib/constants";
import { Eye, CheckCircle, XCircle, MessageSquare } from "lucide-react";
import Link from "next/link";
import type { Application } from "@/types";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// Mock Data
const MOCK_APPLICATIONS: Application[] = [
  {
    id: "app1",
    jobId: "job1",
    jobTitle: "Frontend Developer for E-commerce Site",
    student: { id: "student1@example.com", name: "Alice Wonderland", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333" },
    proposal: "I am very interested in this opportunity and have relevant experience...",
    status: "pending",
    submittedAt: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
  },
  {
    id: "app2",
    jobId: "job1",
    jobTitle: "Frontend Developer for E-commerce Site",
    student: { id: "student2@example.com", name: "Bob The Builder", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333" },
    proposal: "My skills in React and Next.js make me a great fit for this role...",
    status: "accepted",
    submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
  {
    id: "app3",
    jobId: "job3",
    jobTitle: "Social Media Manager",
    student: { id: "student3@example.com", name: "Charlie Chaplin", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333" },
    proposal: "I can help grow your social media presence effectively...",
    status: "rejected",
    submittedAt: new Date(Date.now() - 86400000 * 0.5).toISOString(), // 12 hours ago
  },
];

// Helper function to generate chat ID
const generateChatId = (email1: string, email2: string): string => {
  const sortedEmails = [email1.toLowerCase(), email2.toLowerCase()].sort();
  return sortedEmails.join(CHAT_ID_SEPARATOR);
};


export default function ClientApplicationsPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleMessageStudent = (studentEmailToMessage: string) => {
    const currentUserEmail = localStorage.getItem('userEmail');

    if (!currentUserEmail || currentUserEmail.trim() === '' || !currentUserEmail.includes('@')) {
      toast({
        title: "Login Required / Invalid User Email",
        description: "Please ensure you are logged in with a valid email to message students.",
        variant: "destructive",
      });
      if (!currentUserEmail) router.push('/login?redirect=/dashboard/client/applications');
      return;
    }
    if (!studentEmailToMessage || studentEmailToMessage.trim() === '' || !studentEmailToMessage.includes('@')) {
      console.error("Student email is missing or invalid for chat:", studentEmailToMessage);
      toast({
        title: "Error Initiating Chat",
        description: "Could not initiate chat. Student identifier is invalid or missing.",
        variant: "destructive",
      });
      return;
    }
    const chatId = generateChatId(currentUserEmail, studentEmailToMessage);
    router.push(`/messages/${chatId}`);
  };

  return (
    <DashboardLayout navLinks={clientDashboardLinks} title="Manage Applications" description="Review student applications for your job posts.">
      <Card>
        <CardHeader>
          <CardTitle>Received Applications</CardTitle>
          <CardDescription>
            Total of {MOCK_APPLICATIONS.length} application{MOCK_APPLICATIONS.length === 1 ? "" : "s"} received.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {MOCK_APPLICATIONS.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Submitted On</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_APPLICATIONS.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={app.student.avatarUrl} alt={app.student.name} data-ai-hint="person avatar" />
                          <AvatarFallback>{app.student.name.substring(0,1).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <Link href={`/profile/${encodeURIComponent(app.student.id)}`} className="font-medium hover:underline">{app.student.name}</Link>
                      </div>
                    </TableCell>
                    <TableCell className="truncate max-w-xs">{app.jobTitle}</TableCell>
                    <TableCell>{new Date(app.submittedAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={
                        app.status === 'pending' ? 'secondary' :
                        app.status === 'accepted' ? 'default' :
                        app.status === 'rejected' ? 'destructive' : 'outline'
                      } className="capitalize bg-opacity-80">
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon" title="View Application (not implemented)">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Message Student" onClick={() => handleMessageStudent(app.student.id)}>
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      {app.status === 'pending' && (
                        <>
                          <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700" title="Accept (not implemented)">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700" title="Reject (not implemented)">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-8">No applications received yet.</p>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
