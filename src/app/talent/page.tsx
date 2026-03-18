
"use client";

import { useState, useEffect } from "react";
import TalentProfileCard from "@/components/talent/TalentProfileCard";
import type { StudentProfile } from "@/types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, Search, Users, BriefcaseBusiness, UserSearch, UserX } from "lucide-react"; 
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const ITEMS_PER_PAGE = 9;
const USER_DB_KEY = 'internaMockUserDB';

const MOCK_STUDENTS_INITIAL_SEED: StudentProfile[] = [];


export default function TalentPage() {
  const [allTalent, setAllTalent] = useState<StudentProfile[]>([]);
  const [filteredTalent, setFilteredTalent] = useState<StudentProfile[]>([]);
  const [displayedTalent, setDisplayedTalent] = useState<StudentProfile[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("any");

  const [displayedTalentCount, setDisplayedTalentCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    let talentFromStorage: StudentProfile[] = [];
    const storedUsersRaw = localStorage.getItem(USER_DB_KEY);

    if (storedUsersRaw) {
      try {
        const storedUsers = JSON.parse(storedUsersRaw);
        talentFromStorage = Object.entries(storedUsers)
          .filter(([, userData]: [string, any]) => userData.role === 'student')
          .map(([emailKey, studentData]: [string, any]) => {
            const lowerCaseEmailKey = emailKey.toLowerCase();
            return {
              userId: lowerCaseEmailKey,
              name: studentData.name || studentData.email?.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || "Student User",
              avatarUrl: studentData.avatarUrl || `https://dummyimage.com/80x80.png/eeeeee/333333&text=${(studentData.name || lowerCaseEmailKey).substring(0,1).toUpperCase()}`,
              headline: studentData.headline || "Passionate student looking for opportunities",
              skills: Array.isArray(studentData.skills) ? studentData.skills : [],
              course: studentData.course || "",
              location: studentData.location || "University Town, USA",
              rating: studentData.rating ? parseFloat(String(studentData.rating)) : parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
              completedJobs: studentData.completedJobs ? parseInt(String(studentData.completedJobs), 10) : Math.floor(Math.random() * 10),
              hourlyRate: studentData.hourlyRate ? parseFloat(String(studentData.hourlyRate)) : undefined,
              bio: studentData.bio || "A dedicated and enthusiastic student.",
              portfolio: Array.isArray(studentData.portfolio) ? studentData.portfolio : [],
              education: Array.isArray(studentData.education) ? studentData.education : [],
              experience: Array.isArray(studentData.experience) ? studentData.experience : [],
              universityRollNo: studentData.universityRollNo || "",
              whatsappNumber: studentData.whatsappNumber || "",
              email: lowerCaseEmailKey, 
              createdAt: studentData.createdAt, // Include createdAt
            };
          });
      } catch (e) {
        console.error("Error parsing users from localStorage for talent page", e);
        talentFromStorage = [];
      }
    }

    if (talentFromStorage.length > 0) {
        setAllTalent(talentFromStorage);
    } else {
      setAllTalent(MOCK_STUDENTS_INITIAL_SEED);
    }
  }, []);


  useEffect(() => {
    let tempTalent = [...allTalent];

    // Primary sort: Newest first
    tempTalent.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA; // Descending order
    });
    
    // Then apply filters
    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      tempTalent = tempTalent.filter(student =>
        student.name.toLowerCase().includes(lowerSearchTerm) ||
        (student.headline && student.headline.toLowerCase().includes(lowerSearchTerm)) ||
        (student.skills && student.skills.some(skill => skill.toLowerCase().includes(lowerSearchTerm))) ||
        (student.course && student.course.toLowerCase().includes(lowerSearchTerm))
      );
    }

    if (skillFilter && skillFilter !== "all") {
      tempTalent = tempTalent.filter(student =>
        (student.skills && student.skills.some(skill => skill.toLowerCase().replace(/\s+/g, '_').includes(skillFilter.toLowerCase()))) ||
        (student.course && student.course.toLowerCase().replace(/\s+/g, '_').includes(skillFilter.toLowerCase()))
      );
    }

    // Secondary sort (e.g., alphabetical) could be applied here if needed after filtering
    // For now, the primary sort by createdAt is dominant.

    setFilteredTalent(tempTalent);
  }, [searchTerm, skillFilter, availabilityFilter, allTalent]);

  useEffect(() => {
    setDisplayedTalent(filteredTalent.slice(0, displayedTalentCount));
  }, [filteredTalent, displayedTalentCount]);


  const handleLoadMore = () => {
    setDisplayedTalentCount(prevCount => prevCount + ITEMS_PER_PAGE);
  };

  const allTalentLoaded = displayedTalentCount >= filteredTalent.length;

  return (
    <div className="space-y-10 md:space-y-12 py-8 container-xl">
      <section className="text-center">
        <UserSearch className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Discover Top <span className="text-primary">Student Talent</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Browse profiles of skilled university students ready to contribute to your projects. Newest talent listed first!
        </p>
      </section>

      <section className="bg-card p-6 md:p-8 rounded-xl shadow-lg border border-border/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="relative flex-grow sm:col-span-2 lg:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, skill, university..."
              className="pl-10 w-full rounded-lg h-11"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={skillFilter} onValueChange={setSkillFilter}>
            <SelectTrigger className="w-full rounded-lg h-11">
              <SelectValue placeholder="Filter by Skill/Major" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Skills/Majors</SelectItem>
              <SelectItem value="graphic_design">Graphic Design</SelectItem>
              <SelectItem value="web_development">Web Development</SelectItem>
              <SelectItem value="digital_marketing">Digital Marketing</SelectItem>
              <SelectItem value="writing_translation">Writing & Translation</SelectItem>
              <SelectItem value="ai_ml">AI & Machine Learning</SelectItem>
              <SelectItem value="data_science">Data Science</SelectItem>
              <SelectItem value="tutoring_academics">Tutoring & Academics</SelectItem>
              <SelectItem value="video_animation">Video & Animation</SelectItem>
              <SelectItem value="event_support">Event Support</SelectItem>
              <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
              <SelectItem value="game_development">Game Development</SelectItem>
              <SelectItem value="cloud_computing">Cloud Computing</SelectItem>
              <SelectItem value="robotics">Robotics</SelectItem>
              <SelectItem value="finance_fintech">Finance & Fintech</SelectItem>
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
           <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
            <SelectTrigger className="w-full rounded-lg h-11">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Availability</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="freelance">Freelance/Project-based</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Available Talent ({filteredTalent.length})</h2>
        </div>
        {displayedTalent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayedTalent.map((student) => (
              <TalentProfileCard key={student.userId} student={student} />
            ))}
          </div>
        ) : (
           <Card className="text-center py-16 rounded-xl shadow-md col-span-full bg-card border border-border/50">
            <CardContent className="flex flex-col items-center justify-center">
              <UserX className="h-20 w-20 mx-auto text-muted-foreground mb-6 opacity-50" />
              <h2 className="text-2xl font-semibold text-foreground">No Talent Found</h2>
              <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
                No student profiles match your current search criteria, or no students have signed up yet.
                If students have signed up and are not appearing, please ensure your browser's local storage has not been cleared.
              </p>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" onClick={() => {setSearchTerm(""); setSkillFilter("all"); setAvailabilityFilter("any");}}>Clear All Filters</Button>
                 <Button asChild>
                    <Link href="/signup/student">Student Signup</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </section>

      {!allTalentLoaded && displayedTalent.length > 0 && (
        <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg" className="rounded-lg px-8" onClick={handleLoadMore}>Load More Talent</Button>
        </div>
      )}
    </div>
  );
}
    

    
