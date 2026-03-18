import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { studentDashboardLinks } from "@/lib/constants";
import { DollarSign, Download, Landmark } from "lucide-react";

interface Payment {
  id: string;
  jobTitle: string;
  clientName: string;
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'failed';
}

// Mock Data
const MOCK_PAYMENTS: Payment[] = [
  {
    id: "pay1",
    jobTitle: "E-commerce Website Development",
    clientName: "Artisan Goods Co.",
    amount: 425.00, // Assuming 50% of 850
    date: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    status: "completed",
  },
  {
    id: "pay2",
    jobTitle: "Brand Logo Design",
    clientName: "The Cozy Corner Cafe",
    amount: 300.00,
    date: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days ago
    status: "completed",
  },
  {
    id: "pay3",
    jobTitle: "New Mobile App UI",
    clientName: "Innovatech Solutions",
    amount: 600.00,
    date: new Date(Date.now() + 86400000 * 2).toISOString(), // Expected in 2 days
    status: "pending",
  },
];

const totalEarnings = MOCK_PAYMENTS.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
const pendingEarnings = MOCK_PAYMENTS.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);


export default function StudentPaymentsPage() {
  return (
    <DashboardLayout navLinks={studentDashboardLinks} title="My Payments" description="Track your earnings and manage payment methods.">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">${totalEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From completed projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Earnings</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">${pendingEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From ongoing projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Withdraw Funds</CardTitle>
            <Landmark className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button className="w-full" disabled>Withdraw (Coming Soon)</Button>
             <p className="text-xs text-muted-foreground mt-1 text-center">Setup payment methods</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>
            A record of all your transactions on Interna.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {MOCK_PAYMENTS.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_PAYMENTS.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.jobTitle}</TableCell>
                    <TableCell>{payment.clientName}</TableCell>
                    <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                    <TableCell>${payment.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={
                        payment.status === 'completed' ? 'default' : 
                        payment.status === 'pending' ? 'secondary' : 'destructive'
                      } className="capitalize">
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" title="Download Invoice (Not implemented)" disabled>
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-8">No payment history yet.</p>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
