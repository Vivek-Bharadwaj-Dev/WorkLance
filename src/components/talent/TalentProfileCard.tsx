
"use client";

import type { FreelancerProfile } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase, DollarSign, GraduationCap, MapPin, MessageSquare, Star, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";

interface TalentProfileCardProps {
  freelancer: FreelancerProfile;
}

export default function TalentProfileCard({ freelancer }: TalentProfileCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isStartingChat, setIsStartingChat] = useState(false);

  const handleMessageClick = async () => {
    setIsStartingChat(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Login Required",
          description: "Please log in to message talent.",
          variant: "destructive",
        });
        router.push('/login?redirect=/talent');
        return;
      }

      const freelancerId = freelancer.userId;

      if (user.id === freelancerId) {
        toast({ title: "Action Not Available", description: "You cannot message yourself.", variant: "default" });
        return;
      }

      // Check for existing conversation
      let { data: convo } = await supabase.from('conversations')
        .select('id')
        .or(`and(participant1_id.eq.${user.id},participant2_id.eq.${freelancerId}),and(participant1_id.eq.${freelancerId},participant2_id.eq.${user.id})`)
        .maybeSingle();

      // Create new conversation if none exists
      if (!convo) {
        const { data: newConvo, error } = await supabase.from('conversations').insert({
          participant1_id: user.id,
          participant2_id: freelancerId,
        }).select().single();

        if (error) throw error;
        convo = newConvo;
      }

      if (convo) {
        router.push(`/messages/${convo.id}`);
      }
    } catch (err) {
      console.error("Error starting conversation:", err);
      toast({
        title: "Error",
        description: "Could not start conversation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsStartingChat(false);
    }
  };

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden border-border/50">
      <CardHeader className="p-5">
        <div className="flex items-start space-x-4">
          <Avatar className="h-20 w-20 border-2 border-primary/20">
            <AvatarImage src={freelancer.avatarUrl || `https://dummyimage.com/80x80.png/eeeeee/333333&text=${freelancer.name.substring(0,1).toUpperCase()}`} alt={freelancer.name} data-ai-hint="person freelancer"/>
            <AvatarFallback>{freelancer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <CardTitle className="text-xl group-hover:text-primary transition-colors">{freelancer.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">{freelancer.headline || "Expert freelancer seeking opportunities"}</CardDescription>
            {freelancer.rating && freelancer.completedJobs !== undefined && (
              <div className="flex items-center mt-1 text-xs text-amber-500">
                <Star className="h-4 w-4 mr-1 fill-amber-500" />
                {freelancer.rating.toFixed(1)} ({freelancer.completedJobs} projects)
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-5 flex-grow space-y-3">
        {freelancer.skills && freelancer.skills.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Top Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {freelancer.skills.slice(0, 5).map((skill) => (
                <Badge key={skill} variant="secondary" className="px-2 py-0.5 text-xs bg-primary/10 text-primary border-primary/20">{skill}</Badge>
              ))}
              {freelancer.skills.length > 5 && <Badge variant="outline" className="text-xs px-2 py-0.5">+ {freelancer.skills.length - 5} more</Badge>}
            </div>
          </div>
        )}
        {freelancer.location && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 text-primary/70" />
            {freelancer.location}
          </div>
        )}
        {freelancer.hourlyRate && (
            <div className="flex items-center text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4 mr-2 text-primary/70" />
                ${freelancer.hourlyRate}/hr
            </div>
        )}

      </CardContent>
      <CardFooter className="p-5 border-t border-border/30 mt-auto grid grid-cols-2 gap-2">
        <Button asChild className="w-full rounded-lg">
          <Link href={`/profile/${encodeURIComponent(freelancer.userId)}`}>View Profile <ExternalLink className="ml-1.5 h-4 w-4"/></Link>
        </Button>
        <Button variant="outline" className="w-full rounded-lg" onClick={handleMessageClick} disabled={isStartingChat}>
          {isStartingChat ? (
            <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
          ) : (
            <MessageSquare className="mr-1.5 h-4 w-4"/>
          )}
          {isStartingChat ? "Starting..." : "Message"}
        </Button>
      </CardFooter>
    </Card>
  );
}
