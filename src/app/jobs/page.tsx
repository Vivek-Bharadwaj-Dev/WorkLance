
"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Job } from "@/types";
import { BriefcaseBusiness, MapPin, DollarSign, Search, Filter, ChevronRight, Sparkles, SearchX } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ITEMS_PER_PAGE = 9;
const JOBS_DB_KEY = 'WorklanceMockJobsDB';

const MOCK_JOBS_INITIAL_SEED: Job[] = [
    {
    id: "1",
    title: "Graphic Designer for Local Cafe Branding",
    description: "We're looking for a creative student to design a new logo, menu, and promotional materials for our cafe. Show us your unique style!",
    category: { id: "design", name: "Graphic Design" },
    type: "offline",
    postedBy: { id: "client1", name: "The Cozy Corner Cafe", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=CC" },
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    deadline: new Date(Date.now() + 86400000 * 12).toISOString(),
    location: "Downtown University Area",
    budget: 300,
    skillsRequired: ["Adobe Illustrator", "Photoshop", "Branding"],
    status: "open",
  },
  {
    id: "2",
    title: "Build a Responsive E-commerce Website",
    description: "Seeking a talented web development student to build a fully responsive e-commerce site for our new handmade crafts business. Experience with Shopify or WooCommerce is a plus.",
    category: { id: "webdev", name: "Web Development" },
    type: "online",
    postedBy: { id: "client2", name: "Artisan Goods Co.", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=AG" },
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    location: "Remote",
    skillsRequired: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    budget: 850,
    status: "open",
  },
  {
    id: "3",
    title: "Social Media Content Creator & Manager",
    description: "Help our startup grow its online presence! We need a student savvy with social media to create engaging content and manage our Instagram and TikTok accounts.",
    category: { id: "marketing", name: "Digital Marketing" },
    type: "online",
    postedBy: { id: "client3", name: "Innovatech Solutions", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=IS" },
    createdAt: new Date().toISOString(),
    skillsRequired: ["Content Creation", "Video Editing", "Social Media Strategy"],
    budget: 400, 
    status: "open",
  },
    {
    id: "4",
    title: "AI Chatbot Developer for Student Services",
    description: "Develop an intelligent chatbot to assist students with campus queries. Python and NLP skills needed.",
    category: { id: "ai_ml", name: "AI & Machine Learning" },
    type: "online",
    postedBy: { id: "client4", name: "University Tech Hub", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=UT" },
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    location: "Remote",
    skillsRequired: ["Python", "NLTK", "DialogFlow", "API Integration"],
    budget: 1200,
    status: "open",
  },
  {
    id: "5",
    title: "Technical Writer for Software Documentation",
    description: "We need a student with excellent writing skills to create clear and concise documentation for our new software product. Experience with Markdown and Git is preferred.",
    category: { id: "writing", name: "Writing & Translation" },
    type: "online",
    postedBy: { id: "client5", name: "DevDocs Inc.", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=DI" },
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    location: "Remote",
    skillsRequired: ["Technical Writing", "Markdown", "Git", "English Fluency"],
    budget: 600,
    status: "open",
  },
  {
    id: "6",
    title: "Data Entry and Analysis Assistant",
    description: "Looking for a detail-oriented student to assist with data entry, cleaning, and basic analysis tasks using Excel and Google Sheets.",
    category: { id: "data_science", name: "Data Science" },
    type: "online",
    postedBy: { id: "client6", name: "Analytics Pro Services", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=AP" },
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    location: "Remote",
    skillsRequired: ["Microsoft Excel", "Google Sheets", "Data Entry", "Attention to Detail"],
    budget: 250,
    status: "open",
  },
  {
    id: "7",
    title: "Part-Time Customer Service Rep",
    description: "Provide excellent customer support via email and chat for an online retail store. Weekends and evenings.",
    category: { id: "customer_service", name: "Customer Service" },
    type: "online",
    postedBy: { id: "client7", name: "Retail Express", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=RE" },
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    deadline: new Date(Date.now() + 86400000 * 7).toISOString(),
    location: "Remote",
    skillsRequired: ["Communication", "Problem Solving", "Empathy"],
    budget: 18,
    status: "open",
  },
  {
    id: "8",
    title: "Administrative Assistant (Virtual)",
    description: "Seeking an organized student to help with scheduling, email management, and other administrative tasks.",
    category: { id: "admin_support", name: "Administrative Support" },
    type: "online",
    postedBy: { id: "client8", name: "BusyExec Solutions", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=BE" },
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    location: "Remote",
    skillsRequired: ["Organization", "Time Management", "Google Workspace"],
    budget: 300,
    status: "open",
  },
  {
    id: "9",
    title: "Video Editor for YouTube Channel",
    description: "Seeking a creative video editor to produce engaging content for our educational YouTube channel. Experience with Adobe Premiere Pro or Final Cut Pro.",
    category: { id: "video", name: "Video & Animation" },
    type: "online",
    postedBy: { id: "client9", name: "LearnTube Creators", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=LC" },
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    skillsRequired: ["Adobe Premiere Pro", "Final Cut Pro", "Video Editing", "Storytelling"],
    budget: 500, 
    status: "open",
  },
  {
    id: "10",
    title: "Market Research Analyst Intern",
    description: "Conduct market research, analyze data, and prepare reports to help us understand industry trends. Strong analytical skills required.",
    category: { id: "research_assistant", name: "Research Assistant" },
    type: "hybrid",
    postedBy: { id: "client10", name: "Global Insights Ltd.", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=GI" },
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    location: "City Center Office / Remote",
    skillsRequired: ["Market Research", "Data Analysis", "Report Writing", "Critical Thinking"],
    budget: 1000, 
    status: "open",
  },
  {
    id: "11",
    title: "Junior Python Developer (Automation Scripts)",
    description: "Develop Python scripts to automate Worklancel processes. Basic understanding of APIs and data manipulation is beneficial.",
    category: { id: "webdev", name: "Web Development" },
    type: "online",
    postedBy: { id: "client11", name: "Automate Everything Co.", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=AE" },
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    location: "Remote",
    skillsRequired: ["Python", "Scripting", "Automation", "APIs"],
    budget: 900,
    status: "open",
  },
  {
    id: "12",
    title: "Event Planning Assistant (University Festival)",
    description: "Assist in organizing and coordinating a large university festival. Strong organizational and communication skills needed.",
    category: { id: "hospitality", name: "Hospitality & Events" },
    type: "offline",
    postedBy: { id: "client12", name: "Student Life Committee", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=SL" },
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    deadline: new Date(Date.now() + 86400000 * 20).toISOString(),
    location: "University Campus",
    skillsRequired: ["Event Planning", "Organization", "Communication", "Teamwork"],
    budget: 350, 
    status: "open",
  },
  {
    id: "13",
    title: "Proofreader for Academic Papers",
    description: "Proofread and edit academic papers for grammar, spelling, and clarity. Must have a strong command of the English language and attention to detail.",
    category: { id: "writing", name: "Writing & Translation" },
    type: "online",
    postedBy: { id: "client13", name: "Scholar Services", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=SS" },
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    location: "Remote",
    skillsRequired: ["Proofreading", "Editing", "English Grammar", "Academic Writing"],
    budget: 20, 
    status: "open",
  },
  {
    id: "14",
    title: "Sales Support Assistant (Lead Generation)",
    description: "Assist sales team with lead generation, data entry in CRM, and preparing sales materials.",
    category: { id: "sales_support", name: "Sales Support" },
    type: "online",
    postedBy: { id: "client14", name: "Growth Solutions Inc.", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=GS" },
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    location: "Remote",
    skillsRequired: ["Lead Generation", "CRM", "Communication", "Microsoft Office"],
    budget: 400,
    status: "open",
  },
  {
    id: "15",
    title: "Cybersecurity Intern for Network Monitoring",
    description: "Assist in monitoring network traffic, identifying potential threats, and generating security reports. Basic understanding of cybersecurity principles required.",
    category: { id: "cybersecurity", name: "Cybersecurity" },
    type: "hybrid",
    postedBy: { id: "client15", name: "SecureNet Solutions", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=SN" },
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    location: "Tech Park / Remote Options",
    skillsRequired: ["Network Security", "Threat Analysis", "SIEM Tools", "Linux"],
    budget: 750,
    status: "open",
  },
  {
    id: "16",
    title: "Unity Game Developer for Indie Project",
    description: "Join a small team to develop an exciting new indie game. C# and Unity experience is essential. Passion for gaming is a big plus!",
    category: { id: "gamedev", name: "Game Development" },
    type: "online",
    postedBy: { id: "client16", name: "Pixel Pioneers Studio", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=PP" },
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    deadline: new Date(Date.now() + 86400000 * 25).toISOString(),
    skillsRequired: ["Unity", "C#", "Game Design", "Problem Solving"],
    budget: 1100,
    status: "open",
  },
   {
    id: "17",
    title: "Cloud Computing Assistant (AWS/Azure)",
    description: "Help manage cloud resources, deploy applications, and automate infrastructure tasks. Familiarity with AWS or Azure services is needed.",
    category: { id: "cloud", name: "Cloud Computing" },
    type: "online",
    postedBy: { id: "client17", name: "Cloudify Inc.", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=CI" },
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    location: "Remote",
    skillsRequired: ["AWS", "Azure", "Docker", "Scripting"],
    budget: 950,
    status: "open",
  },
  {
    id: "18",
    title: "UX Researcher for Educational App",
    description: "Conduct user interviews, usability testing, and analyze feedback to improve an educational mobile app for K-12 students.",
    category: { id: "design", name: "UX Design" },
    type: "online",
    postedBy: { id: "client18", name: "EduSpark Learning", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=EL" },
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    skillsRequired: ["User Research", "Usability Testing", "Survey Design", "Qualitative Analysis"],
    budget: 650,
    status: "open",
  },
  {
    id: "19",
    title: "General Helper for Moving & Setup",
    description: "Need assistance with moving boxes, light furniture assembly, and general setup for a new office space. Physical ability required.",
    category: { id: "general_help", name: "General Help / Errands" },
    type: "offline",
    postedBy: { id: "client19", name: "Startup Office Move", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=OM" },
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    location: "Downtown Business District",
    skillsRequired: ["Physical Fitness", "Following Instructions"],
    budget: 150,
    status: "open",
  },
  {
    id: "20",
    title: "React Native Developer for Startup",
    description: "Develop cross-platform mobile features for a new social networking app using React Native. Prior experience or strong portfolio projects needed.",
    category: { id: "webdev", name: "Web Development" },
    type: "online",
    postedBy: { id: "client20", name: "ConnectSphere App", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=CS" },
    createdAt: new Date(Date.now() - 86400000 * 1.5).toISOString(),
    deadline: new Date(Date.now() + 86400000 * 10).toISOString(),
    skillsRequired: ["React Native", "JavaScript", "Firebase", "Redux/Context API"],
    budget: 1300,
    status: "open",
  },
  {
    id: "21",
    title: "SEO Specialist for E-commerce Brand",
    description: "Improve search engine rankings and organic traffic for an online fashion retailer. Keyword research, on-page and off-page SEO skills required.",
    category: { id: "marketing", name: "Digital Marketing" },
    type: "online",
    postedBy: { id: "client21", name: "Chic Boutique Online", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=CB" },
    createdAt: new Date(Date.now() - 86400000 * 9).toISOString(),
    skillsRequired: ["SEO", "Keyword Research", "Google Analytics", "Link Building", "Content Strategy"],
    budget: 700, 
    status: "open",
  },
  {
    id: "22",
    title: "Illustrator for Children's Book Project",
    description: "Create vibrant and engaging illustrations for a new children's book. Must have a strong portfolio showcasing illustration skills.",
    category: { id: "design", name: "Graphic Design" },
    type: "online",
    postedBy: { id: "client22", name: "StoryWeavers Publishing", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=SW" },
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    skillsRequired: ["Illustration", "Character Design", "Adobe Illustrator", "Digital Painting"],
    budget: 900, 
    status: "open",
  },
  {
    id: "23",
    title: "Landscaping Assistant (Seasonal)",
    description: "Assist with garden maintenance, lawn mowing, and planting for residential properties. Must be able to work outdoors.",
    category: { id: "manual_labor", name: "Manual Labor & Trades" },
    type: "offline",
    postedBy: { id: "client23", name: "Green Thumb Landscaping", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=GT" },
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    location: "Various residential locations",
    skillsRequired: ["Gardening", "Physical Stamina"],
    budget: 17,
    status: "open",
  },
  {
    id: "24",
    title: "Virtual Assistant for Busy Entrepreneur",
    description: "Provide administrative, technical, and creative assistance to an entrepreneur. Tasks include scheduling, email management, and social media support.",
    category: { id: "admin_support", name: "Administrative Support" },
    type: "online",
    postedBy: { id: "client24", name: "Alex Chen Innovations", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=AC" },
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    skillsRequired: ["Organization", "Time Management", "Microsoft Office Suite", "Social Media Savvy"],
    budget: 450, 
    status: "open",
  },
  {
    id: "25",
    title: "Robotics Programming Intern (ROS)",
    description: "Work on developing and testing software for autonomous robots using ROS. C++ or Python skills with ROS experience required.",
    category: { id: "robotics", name: "Robotics" },
    type: "offline",
    postedBy: { id: "client25", name: "RoboFuture Systems", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=RF" },
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    location: "Tech Innovation Center",
    skillsRequired: ["ROS", "C++", "Python", "Robotics Algorithms"],
    budget: 1000,
    status: "open",
  },
  {
    id: "26",
    title: "Financial Modeling Intern",
    description: "Assist in building financial models, conducting valuation analysis, and preparing investment reports. Strong Excel and finance knowledge needed.",
    category: { id: "finance", name: "Finance & Fintech" },
    type: "hybrid",
    postedBy: { id: "client26", name: "Capital Growth Partners", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=CG" },
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    deadline: new Date(Date.now() + 86400000 * 15).toISOString(),
    location: "Financial District / Remote",
    skillsRequired: ["Financial Modeling", "Excel", "Valuation", "Accounting Principles"],
    budget: 1200,
    status: "open",
  },
  {
    id: "27",
    title: "Translation Services (English to Spanish)",
    description: "Translate website content and marketing materials from English to Spanish. Native or fluent Spanish speakers with excellent English proficiency.",
    category: { id: "writing", name: "Writing & Translation" },
    type: "online",
    postedBy: { id: "client27", name: "Global Reach Marketing", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=GR" },
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    skillsRequired: ["Translation", "Spanish", "English", "Localization"],
    budget: 0.05, 
    status: "open",
  },
  {
    id: "28",
    title: "Motion Graphics Designer for Explainer Videos",
    description: "Create engaging motion graphics and animations for short explainer videos. Proficiency in Adobe After Effects required.",
    category: { id: "video", name: "Video & Animation" },
    type: "online",
    postedBy: { id: "client28", name: "VisuallyClear Videos", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=VC" },
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    skillsRequired: ["Adobe After Effects", "Motion Graphics", "Animation", "Storyboarding"],
    budget: 800, 
    status: "open",
  },
  {
    id: "29",
    title: "DevOps Intern (CI/CD Pipelines)",
    description: "Help set up and maintain CI/CD pipelines, manage infrastructure as code, and improve deployment processes. Familiarity with Jenkins, GitLab CI, or GitHub Actions.",
    category: { id: "cloud", name: "Cloud Computing" }, 
    type: "online",
    postedBy: { id: "client29", name: "StreamlineOps", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=SO" },
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    location: "Remote",
    skillsRequired: ["CI/CD", "Jenkins", "Docker", "Kubernetes", "Terraform"],
    budget: 900,
    status: "open",
  },
  {
    id: "30",
    title: "Research Assistant for Psychology Study",
    description: "Assist with data collection, literature reviews, and participant recruitment for an ongoing psychology research study. Psychology majors preferred.",
    category: { id: "research_assistant", name: "Research Assistant" },
    type: "offline",
    postedBy: { id: "client30", name: "University Psychology Dept.", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=UP" },
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    deadline: new Date(Date.now() + 86400000 * 5).toISOString(),
    location: "University Research Lab",
    skillsRequired: ["Research Methods", "Data Collection", "SPSS (Optional)", "Communication"],
    budget: 300, 
    status: "open",
  },
];


function JobCard({ job }: { job: Job }) {
  return (
    <Card className="flex flex-col h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 group bg-card border-border/50">
      <CardHeader className="p-5">
        <div className="flex items-start justify-between mb-3">
            {job.postedBy.avatarUrl ? (
                 <Avatar className="h-12 w-12 border-2 border-primary/10 group-hover:border-primary transition-colors">
                    <AvatarImage src={job.postedBy.avatarUrl} alt={job.postedBy.name} data-ai-hint="company logo" />
                    <AvatarFallback>{job.postedBy.name.substring(0,1)}</AvatarFallback>
                </Avatar>
            ) : (
                 <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-primary font-semibold">
                    {job.postedBy.name.substring(0,1)}
                 </div>
            )}
            <Badge variant={job.type === 'online' ? 'secondary' : 'outline'} className="capitalize text-xs px-3 py-1 rounded-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                {job.type}
            </Badge>
        </div>
        <CardTitle className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">{job.title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mt-1">
          By {job.postedBy.name} &middot; {job.category.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{job.description}</p>
        <div className="space-y-2 text-xs text-muted-foreground">
          {job.location && (
            <div className="flex items-center">
              <MapPin className="h-3.5 w-3.5 mr-1.5 text-primary/70" /> {job.location}
            </div>
          )}
          {job.budget !== undefined && job.budget !== null && (
            <div className="flex items-center">
              <DollarSign className="h-3.5 w-3.5 mr-1.5 text-primary/70" /> Budget: ${job.budget}
              {/* Specific budget notes logic can be refined or generalized */}
            </div>
          )}
        </div>
        {job.skillsRequired && job.skillsRequired.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-1.5">
              {job.skillsRequired.slice(0,3).map(skill => (
                <Badge key={skill} variant="outline" className="text-xs px-2 py-0.5 bg-muted/50 transition-colors uppercase">{skill}</Badge>
              ))}
              {job.skillsRequired.length > 3 && <Badge variant="outline" className="text-xs px-2 py-0.5 bg-muted/50 transition-colors">+{job.skillsRequired.length - 3} more</Badge>}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-5 border-t border-border/30 mt-auto">
        <Button asChild className="w-full rounded-lg transition-colors">
          <Link href={`/jobs/${job.id}`}>View Details <ChevronRight className="ml-1.5 h-4 w-4"/></Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function JobsPage() {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [filteredAndSortedJobs, setFilteredAndSortedJobs] = useState<Job[]>([]);
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>([]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all"); 
  const [typeFilter, setTypeFilter] = useState("any");
  const [displayedJobsCount, setDisplayedJobsCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    let jobsFromStorage: Job[] = [];
    const storedJobsRaw = localStorage.getItem(JOBS_DB_KEY);
    if (storedJobsRaw) {
      try {
        jobsFromStorage = JSON.parse(storedJobsRaw);
      } catch (e) {
        console.error("Error parsing jobs from localStorage", e);
        jobsFromStorage = []; // Fallback to empty if parsing fails
      }
    }
    
    if (jobsFromStorage.length === 0 && MOCK_JOBS_INITIAL_SEED.length > 0) {
      localStorage.setItem(JOBS_DB_KEY, JSON.stringify(MOCK_JOBS_INITIAL_SEED));
      setAllJobs(MOCK_JOBS_INITIAL_SEED);
    } else {
      setAllJobs(jobsFromStorage);
    }
  }, []);

  useEffect(() => {
    let tempJobs = [...allJobs];

    // Search term filtering
    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      tempJobs = tempJobs.filter(job =>
        job.title.toLowerCase().includes(lowerSearchTerm) ||
        job.description.toLowerCase().includes(lowerSearchTerm) ||
        (job.skillsRequired && job.skillsRequired.some(skill => skill.toLowerCase().includes(lowerSearchTerm))) ||
        job.postedBy.name.toLowerCase().includes(lowerSearchTerm) ||
        job.category.name.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Category filtering
    if (categoryFilter && categoryFilter !== "all") {
      tempJobs = tempJobs.filter(job => job.category.id === categoryFilter);
    }

    // Type filtering
    if (typeFilter && typeFilter !== "any") {
      tempJobs = tempJobs.filter(job => job.type === typeFilter);
    }
    
    // Sort by newest first (most recent createdAt)
    tempJobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    setFilteredAndSortedJobs(tempJobs);
  }, [searchTerm, categoryFilter, typeFilter, allJobs]);

  useEffect(() => {
    setDisplayedJobs(filteredAndSortedJobs.slice(0, displayedJobsCount));
  }, [filteredAndSortedJobs, displayedJobsCount]);

  const handleLoadMore = () => {
    setDisplayedJobsCount(prevCount => prevCount + ITEMS_PER_PAGE);
  };

  const allItemsLoaded = displayedJobsCount >= filteredAndSortedJobs.length;

  return (
    <div className="space-y-10 md:space-y-12 py-8 container-xl"> {/* Added container-xl */}
      <section className="bg-card p-6 md:p-8 rounded-xl shadow-lg border border-border/50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Find Your Next <span className="text-primary">Opportunity</span></h1>
                <p className="mt-2 text-muted-foreground">Browse freelance jobs and internships perfect for university students.</p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0 rounded-lg">
                <Sparkles className="mr-2 h-4 w-4 text-amber-500"/> AI Job Match (Soon)
            </Button>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="relative flex-grow sm:col-span-2 lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search by keyword, skill, company..." 
              className="pl-10 w-full rounded-lg h-11" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full rounded-lg h-11">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="design">Graphic Design</SelectItem>
              <SelectItem value="webdev">Web Development</SelectItem>
              <SelectItem value="marketing">Digital Marketing</SelectItem>
              <SelectItem value="writing">Writing & Translation</SelectItem>
              <SelectItem value="ai_ml">AI & Machine Learning</SelectItem>
              <SelectItem value="data_science">Data Science</SelectItem>
              <SelectItem value="tutor">Tutoring & Academics</SelectItem>
              <SelectItem value="video">Video & Animation</SelectItem>
              <SelectItem value="event">Event Support</SelectItem>
              <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
              <SelectItem value="gamedev">Game Development</SelectItem>
              <SelectItem value="cloud">Cloud Computing</SelectItem>
              <SelectItem value="robotics">Robotics</SelectItem>
              <SelectItem value="finance">Finance & Fintech</SelectItem>
              <SelectItem value="customer_service">Customer Service</SelectItem>
              <SelectItem value="sales_support">Sales Support</SelectItem>
              <SelectItem value="admin_support">Administrative Support</SelectItem>
              <SelectItem value="research_assistant">Research Assistant</SelectItem>
              <SelectItem value="general_help">General Help / Errands</SelectItem>
              <SelectItem value="hospitality">Hospitality & Events</SelectItem>
              <SelectItem value="manual_labor">Manual Labor & Trades</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
           <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full rounded-lg h-11">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Type</SelectItem>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Available Positions ({filteredAndSortedJobs.length})</h2>
        </div>
        {displayedJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-16 rounded-xl shadow-md col-span-full bg-card border border-border/50">
            <CardContent className="flex flex-col items-center justify-center">
              <SearchX className="h-20 w-20 mx-auto text-muted-foreground mb-6 opacity-50" />
              <h2 className="text-2xl font-semibold text-foreground">No Opportunities Found</h2>
              <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                Your search didn't match any job listings. Try adjusting your search filters or check back later for new projects.
              </p>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" onClick={() => {setSearchTerm(""); setCategoryFilter("all"); setTypeFilter("any");}}>Clear All Filters</Button>
                <Button asChild>
                    <Link href="/jobs/post">Post a Job (Clients)</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </section>
      
      {!allItemsLoaded && displayedJobs.length > 0 && (
        <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg" className="rounded-lg px-8" onClick={handleLoadMore}>Load More Listings</Button>
        </div>
      )}
    </div>
  );
}

    
