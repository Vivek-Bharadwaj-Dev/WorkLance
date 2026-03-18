
"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { StudentProfile, PortfolioItem, EducationItem, ExperienceItem } from "@/types";
import { Briefcase, Building, CalendarDays, DollarSign, GraduationCap, Linkedin, Mail, MessageSquare, Star, Users, Link as LinkIcon, MapPin, AlertTriangle, Loader2, BookOpenText, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useToast } from '@/hooks/use-toast';
import { CHAT_ID_SEPARATOR } from '@/lib/constants';

const MOCK_USER_DB_KEY = 'internaMockUserDB';

const constructStudentProfile = (userData: any, userId: string): StudentProfile => {
  return {
    userId: userId,
    email: userId,
    name: userData.name || "Student User",
    avatarUrl: userData.avatarUrl || `https://dummyimage.com/128x128.png/eeeeee/333333&text=${(userData.name || userId).substring(0,1).toUpperCase()}`,
    headline: userData.headline || "Eager to learn and contribute!",
    bio: userData.bio || "A passionate student looking for exciting opportunities on Interna.",
    skills: Array.isArray(userData.skills) ? userData.skills : [],
    course: userData.course || "",
    universityRollNo: userData.universityRollNo || "",
    whatsappNumber: userData.whatsappNumber || "",
    hourlyRate: userData.hourlyRate ? parseFloat(String(userData.hourlyRate)) : undefined,
    portfolio: Array.isArray(userData.portfolio) ? userData.portfolio : [],
    education: Array.isArray(userData.education) ? userData.education : [],
    experience: Array.isArray(userData.experience) ? userData.experience : [],
    rating: userData.rating ? parseFloat(String(userData.rating)) : undefined,
    completedJobs: userData.completedJobs ? parseInt(String(userData.completedJobs), 10) : 0,
    location: userData.location || "University City",
    createdAt: userData.createdAt,
  };
};

const generateChatId = (email1: string, email2: string): string => {
  const sortedEmails = [email1.toLowerCase(), email2.toLowerCase()].sort();
  return sortedEmails.join(CHAT_ID_SEPARATOR);
};

const PortfolioItemCard = ({ item }: { item: PortfolioItem }) => (
  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 rounded-lg">
    {item.imageUrl && (
      <Image
        src={item.imageUrl}
        alt={item.title}
        width={600}
        height={300}
        className="w-full h-40 object-cover"
        data-ai-hint={item['data-ai-hint'] || 'project image'}
      />
    )}
    <CardHeader className="pb-2">
      <CardTitle className="text-md">{item.title}</CardTitle>
      {item.dateCompleted && <CardDescription className="text-xs">Completed: {new Date(item.dateCompleted).toLocaleDateString()}</CardDescription>}
    </CardHeader>
    <CardContent className="pt-0 pb-3">
      <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
    </CardContent>
    {item.projectUrl && (
      <CardContent className="pt-0 pb-4">
        <Button variant="link" size="sm" asChild className="p-0 h-auto text-xs">
          <Link href={item.projectUrl} target="_blank" rel="noopener noreferrer">
            View Project <LinkIcon className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardContent>
    )}
  </Card>
);

const EducationItemDisplay = ({ item }: { item: EducationItem }) => (
  <div className="flex items-start space-x-3 py-2.5">
    <div className="p-1.5 bg-primary/10 rounded-md mt-0.5">
      <GraduationCap className="h-5 w-5 text-primary" />
    </div>
    <div>
      <h4 className="font-semibold text-foreground text-sm">{item.degree} <span className="font-normal text-muted-foreground text-xs">in {item.fieldOfStudy}</span></h4>
      <p className="text-xs text-muted-foreground">{item.institution}</p>
      <p className="text-xs text-muted-foreground">
        {item.startDate} - {item.endDate || 'Present'}
      </p>
      {item.description && <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>}
    </div>
  </div>
);

const ExperienceItemDisplay = ({ item }: { item: ExperienceItem }) => (
  <div className="flex items-start space-x-3 py-2.5">
     <div className="p-1.5 bg-primary/10 rounded-md mt-0.5">
      {item.isFreelance ? <Briefcase className="h-5 w-5 text-primary" /> : <Building className="h-5 w-5 text-primary" />}
    </div>
    <div>
      <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
      <p className="text-xs text-muted-foreground">{item.company}</p>
      <p className="text-xs text-muted-foreground">
        {item.startDate} - {item.endDate || 'Present'}
      </p>
      {item.description && <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>}
    </div>
  </div>
);


export default function StudentProfilePage() {
  const params = useParams();
  const studentIdFromUrl = params.studentId as string;
  const [profile, setProfile] = useState<StudentProfile | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();

  useEffect(() => {
    const CUE = localStorage.getItem('userEmail');
    if (CUE) {
        setLoggedInUserEmail(CUE.toLowerCase());
    }

    if (studentIdFromUrl) {
      setIsLoading(true);
      let decodedStudentId = "";
      try {
        decodedStudentId = decodeURIComponent(studentIdFromUrl);
      } catch (e) {
        console.error("Failed to decode studentIdFromUrl:", studentIdFromUrl, e);
        setProfile(null);
        setIsLoading(false);
        return;
      }

      const lowerCaseStudentId = decodedStudentId.toLowerCase();
      const storedUsersRaw = localStorage.getItem(MOCK_USER_DB_KEY);
      const storedUsers = storedUsersRaw ? JSON.parse(storedUsersRaw) : {};
      const userData = storedUsers[lowerCaseStudentId];

      if (userData && userData.role === 'student') {
        const fetchedProfile = constructStudentProfile(userData, lowerCaseStudentId);
        setProfile(fetchedProfile);
      } else {
        console.warn(`No student data found for ID (email): ${lowerCaseStudentId} or role is not student. Original param: ${studentIdFromUrl}`);
        setProfile(null);
      }
      setIsLoading(false);
    } else {
        setIsLoading(false);
        setProfile(null); // No ID in URL
    }
  }, [studentIdFromUrl]);

  const handleWhatsAppContact = () => {
    if (profile?.whatsappNumber) {
      const cleanNumber = profile.whatsappNumber.replace(/\D/g, '');
      window.open(`https://wa.me/${cleanNumber}`, '_blank');
    }
  };

  const handleMessageStudent = () => {
    const currentLoggedInUserEmail = localStorage.getItem('userEmail'); // Re-fetch to ensure freshness
    const studentEmailToMessage = profile?.userId;

    if (!currentLoggedInUserEmail || currentLoggedInUserEmail.trim() === '' || !currentLoggedInUserEmail.includes('@')) {
      toast({
        title: "Login Required / Invalid User Email",
        description: "Please ensure you are logged in with a valid email to message this student.",
        variant: "destructive",
      });
      if (!currentLoggedInUserEmail) router.push('/login?redirect=' + encodeURIComponent(pathname || `/profile/${profile?.userId || ''}`));
      return;
    }
    if (!studentEmailToMessage || studentEmailToMessage.trim() === '' || !studentEmailToMessage.includes('@')) {
      console.error("Student profile or userId is missing/invalid for chat:", studentEmailToMessage);
      toast({
        title: "Error Initiating Chat",
        description: "Could not initiate chat. Student identifier is invalid or missing.",
        variant: "destructive",
      });
      return;
    }
    if (currentLoggedInUserEmail.toLowerCase() === studentEmailToMessage.toLowerCase()) {
        toast({
            title: "Action Not Available",
            description: "You cannot message yourself.",
            variant: "default",
        });
        return;
    }
    const chatId = generateChatId(currentLoggedInUserEmail, studentEmailToMessage);
    router.push(`/messages/${chatId}`);
  };
  
  const isOwnProfile = loggedInUserEmail && profile && loggedInUserEmail === profile.userId.toLowerCase();


  if (isLoading || profile === undefined) {
     return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-3 text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-10 max-w-md mx-auto">
        <Card className="shadow-lg">
             <CardHeader className="items-center">
                <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
                <CardTitle className="text-2xl">Profile Not Found</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mt-2">The student profile for "{decodeURIComponent(studentIdFromUrl)}" could not be found or is not available. Please ensure the email is correct and the user has signed up as a student using that exact email (case-insensitively).</p>
                <Button asChild className="mt-6">
                <Link href="/talent">Back to Talent Listings</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8 px-4">
      <Card className="shadow-xl rounded-xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary/30 shadow-md flex-shrink-0">
              <AvatarImage src={profile.avatarUrl} alt={profile.name} data-ai-hint="person student"/>
              <AvatarFallback>{profile.name.substring(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{profile.name}</h1>
              <p className="text-md md:text-lg text-primary mt-0.5">{profile.headline}</p>
              {profile.course && (
                <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
                  <GraduationCap className="h-4 w-4" /> <span>Studying: {profile.course}</span>
                </div>
              )}
              {profile.universityRollNo && (
                <div className="mt-1 flex items-center space-x-2 text-sm text-muted-foreground">
                  <BookOpenText className="h-4 w-4" /> <span>Roll No: {profile.universityRollNo}</span>
                </div>
              )}
              {profile.location && (
                <div className="mt-1 flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" /> <span>{profile.location}</span>
                </div>
              )}
               {profile.whatsappNumber && (
                <div className="mt-1 flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" /> <span>{profile.whatsappNumber}</span>
                </div>
              )}
              {profile.hourlyRate && (
                <div className="mt-1 flex items-center space-x-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" /> <span>${profile.hourlyRate}/hr (example rate)</span>
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="lg" onClick={handleMessageStudent} disabled={!!isOwnProfile}>
                    <MessageSquare className="mr-2 h-4 w-4" /> {isOwnProfile ? "This is Your Profile" : "Message Student"}
                  </Button>
                {profile.whatsappNumber && !isOwnProfile && (
                  <Button size="lg" variant="outline" onClick={handleWhatsAppContact}>
                    <Phone className="mr-2 h-4 w-4" /> WhatsApp
                  </Button>
                )}
                 {isOwnProfile && (
                     <Button size="lg" variant="outline" asChild>
                        <Link href="/profile/edit">Edit Your Profile</Link>
                    </Button>
                 )}
                {!isOwnProfile && <Button size="lg" variant="outline" disabled>Invite to Job (Soon)</Button>}
                <Button variant="ghost" size="icon" title="LinkedIn (coming soon)"><Linkedin className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon" title="Email (coming soon)"><Mail className="h-5 w-5" /></Button>
              </div>
            </div>
            <div className="text-center md:text-right space-y-1 md:min-w-[180px] pt-2 md:pt-0">
                {profile.rating && (
                    <div className="flex items-center justify-center md:justify-end">
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="text-xl font-bold text-foreground">{profile.rating.toFixed(1)}</span>
                        <span className="text-xs text-muted-foreground ml-1">({profile.completedJobs} reviews)</span>
                    </div>
                )}
                <p className="text-xs text-muted-foreground">{profile.completedJobs} Jobs Completed (example)</p>
                <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-300 px-2 py-0.5 text-xs">Available for Work</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-lg rounded-lg">
            <CardHeader><CardTitle>About Me</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground whitespace-pre-line">{profile.bio}</p></CardContent>
          </Card>

          {profile.portfolio && profile.portfolio.length > 0 && (
            <Card className="shadow-lg rounded-lg">
              <CardHeader><CardTitle>Portfolio</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profile.portfolio.map(item => <PortfolioItemCard key={item.id} item={item} />)}
              </CardContent>
            </Card>
          )}

           {profile.experience && profile.experience.length > 0 && (
            <Card className="shadow-lg rounded-lg">
              <CardHeader><CardTitle>Work Experience</CardTitle></CardHeader>
              <CardContent className="divide-y divide-border">
                {profile.experience.map(item => <ExperienceItemDisplay key={item.id} item={item} />)}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1 space-y-8">
          <Card className="shadow-lg rounded-lg">
            <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-1.5">
              {profile.skills?.map(skill => <Badge key={skill} variant="default" className="px-2.5 py-1 text-xs">{skill}</Badge>)}
              {(!profile.skills || profile.skills.length === 0) && <p className="text-xs text-muted-foreground">No skills listed.</p>}
            </CardContent>
          </Card>

          {profile.education && profile.education.length > 0 && (
            <Card className="shadow-lg rounded-lg">
              <CardHeader><CardTitle>Education</CardTitle></CardHeader>
              <CardContent className="divide-y divide-border -mt-2">
                {profile.education.map(item => <EducationItemDisplay key={item.id} item={item} />)}
              </CardContent>
            </Card>
          )}

          <Card className="shadow-lg rounded-lg">
            <CardHeader><CardTitle>Client Reviews</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">No reviews yet.</p>
              {/* Placeholder for reviews */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
