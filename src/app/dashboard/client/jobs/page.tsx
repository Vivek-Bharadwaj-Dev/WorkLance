import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { clientDashboardLinks } from "@/lib/constants";
import { PlusCircle, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import type { Job } from "@/types"; // Assuming Job type is defined

// Mock Data
const MOCK_CLIENT_JOBS: Job[] = [
  {
    id: "job1",
    title: "Frontend Developer for E-commerce Site",
    category: { id: "webdev", name: "Web Development" },
    type: "online",
    status: "open",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    postedBy: { id: "client1", name: "Client Name" }, // Simplified postedBy for this context
    description: "Brief job description...",
  },
  {
    id: "job2",
    title: "UX Designer for Mobile App",
    category: { id: "design", name: "UX Design" },
    type: "online",
    status: "closed", // Example of a closed job
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
    postedBy: { id: "client1", name: "Client Name" },
    description: "Brief job description...",
  },
  {
    id: "job3",
    title: "Social Media Manager",
    category: { id: "marketing", name: "Digital Marketing" },
    type: "online",
    status: "in-progress",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
    postedBy: { id: "client1", name: "Client Name" },
    description: "Brief job description...",
  },
];


export default function ClientManageJobsPage() {
  return (
    <DashboardLayout navLinks={clientDashboardLinks} title="Manage Job Posts" description="View, edit, or delete your job listings.">
      <div className="flex justify-end mb-6">
        <Button asChild>
          <Link href="/jobs/post"><PlusCircle className="mr-2 h-4 w-4" /> Post New Job</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Job Listings</CardTitle>
          <CardDescription>
            You have {MOCK_CLIENT_JOBS.length} job post{MOCK_CLIENT_JOBS.length === 1 ? "" : "s"}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {MOCK_CLIENT_JOBS.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Posted On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_CLIENT_JOBS.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.category.name}</TableCell>
                    <TableCell>
                      <Badge variant={
                        job.status === 'open' ? 'default' : 
                        job.status === 'closed' ? 'outline' : 
                        job.status === 'in-progress' ? 'secondary' : 'default'
                      } className="capitalize">
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" asChild className="mr-1">
                        <Link href={`/jobs/${job.id}`} title="View Job"><Eye className="h-4 w-4" /></Link>
                      </Button>
                       <Button variant="ghost" size="icon" asChild className="mr-1" title="Edit Job">
                        <Link href={`/jobs/edit/${job.id}`}><Edit className="h-4 w-4" /></Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" title="Delete Job">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-8">You haven't posted any jobs yet.</p>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
