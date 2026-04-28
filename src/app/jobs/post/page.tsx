
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
import { createClient } from '@/lib/supabase/client';
import { Loader2 } from "lucide-react";

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

  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const supabase = createClient();

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


  async function onSubmit(values: z.infer<typeof jobSchema>) {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast({ title: "Error", description: "You must be logged in to post a job.", variant: "destructive" });
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase.from('jobs').insert({
        title: values.title,
        description: values.description,
        type: values.type,
        category: values.category,
        location: values.location,
        budget: values.budget,
        skills_required: values.skillsRequired,
        deadline: values.deadline ? values.deadline.toISOString() : null,
        employer_id: user.id,
        status: "open",
      });

      if (error) throw error;

      toast({
        title: "Job Posted!",
        description: "Your job listing has been successfully created and added to the job board.",
      });
      form.reset(); 
      setCurrentSkill(""); 
      router.push('/dashboard/client'); 
    } catch (error: any) {
      console.error("Failed to save job to Supabase:", error);
      toast({
        title: "Error Posting Job",
        description: `Failed: ${error?.message || 'Could not save job posting (Possible RLS issue). Please check database.'}`,
        variant: "destructive",
      });
    } finally {
       setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-br from-indigo-50/40 via-white to-violet-50/40 min-h-[calc(100vh-5rem)]">
      <Card className="w-full max-w-2xl shadow-xl rounded-[1.5rem] border-white/50 bg-white/80 backdrop-blur-xl">
        <CardHeader className="text-center pt-8">
          <CardTitle className="text-3xl font-bold text-gray-900">Post a New Job</CardTitle>
          <CardDescription className="text-base text-gray-500 mt-2">Fill in the details below to find the perfect student talent.</CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
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
                    <FormControl>
                      <Input placeholder="e.g., Graphic Design, Web Development..." {...field} value={field.value ?? ""} />
                    </FormControl>
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
              
              <Button type="submit" size="lg" className="w-full h-14 rounded-xl text-lg font-bold bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all text-white" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin"/> Posting...</> : "Post Job"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
