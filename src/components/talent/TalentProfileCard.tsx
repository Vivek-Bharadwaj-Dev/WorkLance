
"use client";

import type { StudentProfile } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase, DollarSign, GraduationCap, MapPin, MessageSquare, Star, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { useToast } from "@/hooks/use-toast";
import { CHAT_ID_SEPARATOR } from "@/lib/constants";

interface TalentProfileCardProps {
  student: StudentProfile;
}

// Helper function to generate chat ID
const generateChatId = (email1: string, email2: string): string => {
  const sortedEmails = [email1.toLowerCase(), email2.toLowerCase()].sort();
  return sortedEmails.join(CHAT_ID_SEPARATOR);
};

export default function TalentProfileCard({ student }: TalentProfileCardProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleMessageClick = () => {
    const currentUserEmail = localStorage.getItem('userEmail');
    const studentEmail = student.userId; // student.userId is the email

    if (!currentUserEmail || currentUserEmail.trim() === '' || !currentUserEmail.includes('@')) {
      toast({
        title: "Login Required / Invalid User Email",
        description: "Please ensure you are logged in with a valid email to message talent.",
        variant: "destructive",
      });
      if (!currentUserEmail) router.push('/login?redirect=/talent');
      return;
    }

    if (!studentEmail || studentEmail.trim() === '' || !studentEmail.includes('@')) {
      console.error("Student email (userId) is missing or invalid for chat:", studentEmail);
      toast({
        title: "Error Initiating Chat",
        description: "Could not initiate chat. The student's identifier is invalid or missing. Please try again later or contact support if the issue persists.",
        variant: "destructive",
      });
      return;
    }

    const chatId = generateChatId(currentUserEmail, studentEmail);
    router.push(`/messages/${chatId}`);
  };

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden border-border/50">
      <CardHeader className="p-5">
        <div className="flex items-start space-x-4">
          <Avatar className="h-20 w-20 border-2 border-primary/20">
            <AvatarImage src={student.avatarUrl || `https://dummyimage.com/80x80.png/eeeeee/333333&text=${student.name.substring(0,1).toUpperCase()}`} alt={student.name} data-ai-hint="person student"/>
            <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <CardTitle className="text-xl group-hover:text-primary transition-colors">{student.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">{student.headline || "Eager student seeking opportunities"}</CardDescription>
            {student.rating && student.completedJobs !== undefined && (
              <div className="flex items-center mt-1 text-xs text-amber-500">
                <Star className="h-4 w-4 mr-1 fill-amber-500" />
                {student.rating.toFixed(1)} ({student.completedJobs} projects)
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5 flex-grow space-y-3">
        {student.skills && student.skills.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Top Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {student.skills.slice(0, 5).map((skill) => (
                <Badge key={skill} variant="secondary" className="px-2 py-0.5 text-xs bg-primary/10 text-primary border-primary/20">{skill}</Badge>
              ))}
              {student.skills.length > 5 && <Badge variant="outline" className="text-xs px-2 py-0.5">+ {student.skills.length - 5} more</Badge>}
            </div>
          </div>
        )}
        {student.location && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 text-primary/70" />
            {student.location}
          </div>
        )}
        {student.hourlyRate && (
            <div className="flex items-center text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4 mr-2 text-primary/70" />
                ${student.hourlyRate}/hr
            </div>
        )}

      </CardContent>
      <CardFooter className="p-5 border-t border-border/30 mt-auto grid grid-cols-2 gap-2">
        <Button asChild className="w-full rounded-lg">
          <Link href={`/profile/${encodeURIComponent(student.userId)}`}>View Profile <ExternalLink className="ml-1.5 h-4 w-4"/></Link>
        </Button>
        <Button variant="outline" className="w-full rounded-lg" onClick={handleMessageClick}>
           <MessageSquare className="mr-1.5 h-4 w-4"/> Message
        </Button>
      </CardFooter>
    </Card>
  );
}
