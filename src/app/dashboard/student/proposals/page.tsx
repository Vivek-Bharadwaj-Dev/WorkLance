import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { studentDashboardLinks } from "@/lib/constants";
import { Eye, Edit3, Trash2 } from "lucide-react";
import Link from "next/link";
import type { Application } from "@/types"; // Assuming Application type is defined

// Mock Data
const MOCK_STUDENT_APPLICATIONS: Partial<Application>[] = [ // Using Partial as jobTitle is not in base Application
  {
    id: "app101",
    jobId: "job1",
    jobTitle: "Graphic Designer for Local Cafe", // Denormalized for display
    status: "pending",
    submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
  {
    id: "app102",
    jobId: "job2",
    jobTitle: "Social Media Intern (Remote)",
    status: "accepted",
    submittedAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
  },
  {
    id: "app103",
    jobId: "job3",
    jobTitle: "Content Writer for Tech Blog",
    status: "rejected",
    submittedAt: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
  },
];

export default function StudentProposalsPage() {
  return (
    <DashboardLayout navLinks={studentDashboardLinks} title="My Proposals" description="Track the status of your job applications.">
      <Card>
        <CardHeader>
          <CardTitle>Your Applications</CardTitle>
          <CardDescription>
            You have submitted {MOCK_STUDENT_APPLICATIONS.length} application{MOCK_STUDENT_APPLICATIONS.length === 1 ? "" : "s"}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {MOCK_STUDENT_APPLICATIONS.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Submitted On</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_STUDENT_APPLICATIONS.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.jobTitle}</TableCell>
                    <TableCell>{new Date(app.submittedAt!).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={
                        app.status === 'pending' ? 'secondary' : 
                        app.status === 'accepted' ? 'default' :
                        app.status === 'rejected' ? 'destructive' : 'outline'
                      } className="capitalize">
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" asChild className="mr-1" title="View Job">
                        <Link href={`/jobs/${app.jobId}`}><Eye className="h-4 w-4" /></Link>
                      </Button>
                      {app.status === 'pending' && (
                        <>
                          <Button variant="ghost" size="icon" className="mr-1" title="Edit Proposal (Not implemented)">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" title="Withdraw Application (Not implemented)">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-8">You haven't applied for any jobs yet.</p>
          )}
        </CardContent>
      </Card>
       <div className="mt-8 flex justify-start">
        <Button asChild>
          <Link href="/jobs">Find More Jobs</Link>
        </Button>
      </div>
    </DashboardLayout>
  );
}
