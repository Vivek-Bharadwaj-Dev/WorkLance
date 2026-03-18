
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useState } from "react"; 
import type { Job } from "@/types"; // Import Job type
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, DollarSign, X } from "lucide-react"; 
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge"; 
import { useRouter } from "next/navigation";

const JOBS_DB_KEY = 'internaMockJobsDB';

const jobSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  description: z.string().min(20, "Description must be at least 20 characters").max(2000),
  category: z.string().min(1, "Please select a category"),
  type: z.enum(["online", "offline", "hybrid"], { required_error: "Please select a job type" }),
  location: z.string().optional(),
  budget: z.coerce.number().positive("Budget must be a positive number").optional(),
  skillsRequired: z.array(z.string().min(1, "Skill cannot be empty")).optional().default([]), 
  deadline: z.date().optional(),
});

export default function PostJobPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [currentSkill, setCurrentSkill] = useState(""); 

  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      type: "online",
      location: "",
      budget: "" as any, 
      skillsRequired: [], 
      deadline: undefined,
    },
  });

  const handleAddSkill = (field: any) => {
    const skillToAdd = currentSkill.trim().toLowerCase();
    if (skillToAdd && !field.value.map((s: string) => s.toLowerCase()).includes(skillToAdd)) {
      field.onChange([...field.value, currentSkill.trim()]);
    }
    setCurrentSkill("");
  };

  const handleRemoveSkill = (skillToRemove: string, field: any) => {
    field.onChange(field.value.filter((skill: string) => skill !== skillToRemove));
  };


  function onSubmit(values: z.infer<typeof jobSchema>) {
    console.log("Form values:", values);
    const newJob: Job = {
      id: `job-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: values.title,
      description: values.description,
      // For mock, we can derive category name from id. A real app might fetch this.
      category: { id: values.category, name: values.category.charAt(0).toUpperCase() + values.category.slice(1).replace(/_/g, ' ') },
      type: values.type as "online" | "offline" | "hybrid",
      location: values.location || (values.type === "online" ? "Remote" : undefined),
      budget: values.budget,
      skillsRequired: values.skillsRequired || [],
      createdAt: new Date().toISOString(),
      postedBy: { id: "clientUser123", name: "Demo Client Inc.", avatarUrl: "https://dummyimage.com/40x40.png/eeeeee/333333&text=DC" }, // Mock client
      status: "open",
      deadline: values.deadline ? values.deadline.toISOString() : undefined,
    };

    try {
      const storedJobsRaw = localStorage.getItem(JOBS_DB_KEY);
      let allJobs: Job[] = storedJobsRaw ? JSON.parse(storedJobsRaw) : [];
      allJobs.unshift(newJob); // Add to the beginning to see it easily
      localStorage.setItem(JOBS_DB_KEY, JSON.stringify(allJobs));

      toast({
        title: "Job Posted!",
        description: "Your job listing has been successfully created and added to the job board.",
      });
      form.reset(); 
      setCurrentSkill(""); 
      // router.push('/jobs'); // Optional: redirect to job listings
    } catch (error) {
      console.error("Failed to save job to localStorage:", error);
      toast({
        title: "Error",
        description: "Could not save job posting. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Post a New Job</CardTitle>
          <CardDescription>Fill in the details below to find the perfect student talent.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Graphic Designer for Cafe Branding" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormDescription>A clear and concise title for your job.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide a detailed description of the job, responsibilities, and desired outcomes."
                        className="min-h-[150px]"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                     <FormDescription>Be specific about what you're looking for.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value ?? ""}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a job category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Job Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="online" />
                          </FormControl>
                          <FormLabel className="font-normal">Online / Remote</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="offline" />
                          </FormControl>
                          <FormLabel className="font-normal">Offline / On-site</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="hybrid" />
                          </FormControl>
                          <FormLabel className="font-normal">Hybrid</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {form.watch("type") !== "online" && (
                 <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location (for offline/hybrid jobs)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Main Street Cafe, Cityville" {...field} value={field.value ?? ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          type="number" 
                          placeholder="e.g., 500" 
                          className="pl-8" 
                          {...field} 
                          value={field.value ?? ""}
                          onChange={e => field.onChange(e.target.value === '' ? undefined : +e.target.value)}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>Enter the total budget or rate for this job.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="skillsRequired"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills Required (Optional)</FormLabel>
                    <div className="flex gap-2 items-center">
                      <Input
                        placeholder="e.g., Photoshop"
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkill(field);
                          }
                        }}
                      />
                      <Button type="button" variant="outline" onClick={() => handleAddSkill(field)}>
                        Add
                      </Button>
                    </div>
                    <FormDescription>
                      Type a skill and press Enter or click Add.
                    </FormDescription>
                    <FormMessage />
                    {field.value && field.value.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {field.value.map((skill: string, index: number) => (
                          <Badge key={`${skill}-${index}`} variant="secondary" className="py-1 px-2">
                            {skill}
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(skill, field)}
                              className="ml-1.5 p-0.5 rounded-full hover:bg-destructive/20"
                              aria-label={`Remove ${skill}`}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Application Deadline (Optional)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0,0,0,0)) // Disable past dates
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" size="lg" className="w-full">Post Job</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
