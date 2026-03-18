
"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, Trash2, UploadCloud, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const portfolioItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Must be a valid URL for the image preview").optional().or(z.literal('')),
  projectUrl: z.string().url("Must be a valid URL for the project link").optional().or(z.literal('')),
  dateCompleted: z.string().optional().or(z.literal('')), // Added
  'data-ai-hint': z.string().optional().or(z.literal('')), // Added
});

const educationItemSchema = z.object({
  id: z.string().optional(),
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().optional().or(z.literal('')),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')), // Added
});

const experienceItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
  isFreelance: z.boolean().optional(), // Added
});

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  headline: z.string().min(5, "Headline must be at least 5 characters").optional().or(z.literal('')),
  bio: z.string().min(20, "Bio must be at least 20 characters").max(1000).optional().or(z.literal('')),
  skills: z.array(z.string().min(1, "Skill cannot be empty")).optional().default([]),
  hourlyRate: z.coerce.number().positive("Rate must be positive").optional().nullable(),
  linkedinUrl: z.string().url("Invalid LinkedIn URL").optional().or(z.literal('')),
  githubUrl: z.string().url("Invalid GitHub URL").optional().or(z.literal('')),
  portfolio: z.array(portfolioItemSchema).optional(),
  education: z.array(educationItemSchema).optional(),
  experience: z.array(experienceItemSchema).optional(),
});

export default function EditProfilePage() {
  const { toast } = useToast();
  const [currentSkill, setCurrentSkill] = useState("");

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Demo Student",
      headline: "Aspiring Software Engineer | Computer Science Major",
      bio: "Passionate about developing innovative software solutions and leveraging cutting-edge technologies. Seeking to apply my skills in a challenging and growth-oriented environment.",
      skills: "React, JavaScript, Node.js, Python, Next.js, Tailwind CSS, Figma".split(',').map(s => s.trim()).filter(s => s),
      hourlyRate: null, // Initialize to null instead of undefined for number inputs
      linkedinUrl: "",
      githubUrl: "",
      portfolio: [],
      education: [],
      experience: [],
    },
  });

  const { fields: portfolioFields, append: appendPortfolio, remove: removePortfolio } = useFieldArray({ control: form.control, name: "portfolio" });
  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({ control: form.control, name: "education" });
  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({ control: form.control, name: "experience" });

  const handleAddSkill = (field: any) => {
    const skillToAdd = currentSkill.trim();
    if (skillToAdd && !field.value.includes(skillToAdd)) {
      field.onChange([...field.value, skillToAdd]);
    }
    setCurrentSkill("");
  };

  const handleRemoveSkill = (skillToRemove: string, field: any) => {
    field.onChange(field.value.filter((skill: string) => skill !== skillToRemove));
  };

  function onSubmit(values: z.infer<typeof profileSchema>) {
    console.log(values);
    toast({ title: "Profile Updated", description: "Your changes have been successfully saved." });
  }

  return (
    <>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Edit Your Profile</CardTitle>
                <CardDescription>Ensure your profile is current and accurately reflects your skills and experience to attract relevant opportunities.</CardDescription>
              </CardHeader>
            </Card>

            <Tabs defaultValue="basic">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
                <TabsTrigger value="basic">Basic Information</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardHeader><CardTitle>Profile Picture & Core Details</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <FormItem className="flex items-center gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="https://dummyimage.com/80x80.png/eeeeee/333333" alt="User avatar" data-ai-hint="person avatar" />
                        <AvatarFallback>DS</AvatarFallback>
                      </Avatar>
                      <Button type="button" variant="outline"><UploadCloud className="mr-2 h-4 w-4"/> Update Profile Picture</Button>
                    </FormItem>
                    <FormField control={form.control} name="name" render={({ field: formField }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input {...formField} value={formField.value ?? ""} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="headline" render={({ field: formField }) => (
                      <FormItem>
                        <FormLabel>Headline / Professional Title</FormLabel>
                        <FormControl><Input placeholder="e.g., Software Engineer | AI Specialist" {...formField} value={formField.value ?? ""} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="bio" render={({ field: formField }) => (
                      <FormItem>
                        <FormLabel>Professional Bio</FormLabel>
                        <FormControl><Textarea className="min-h-[120px]" placeholder="Detail your tech expertise, project interests, and career aspirations." {...formField} value={formField.value ?? ""} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Skills & Availability</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Technical Skills</FormLabel>
                          <div className="flex gap-2 items-center">
                            <Input
                              placeholder="e.g., React"
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
                            Type a skill, then click Add. Skills will appear as tags.
                          </FormDescription>
                          <FormMessage />
                          {field.value && field.value.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {field.value.map((skill, index) => (
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
                    <FormField control={form.control} name="hourlyRate" render={({ field: formField }) => (
                      <FormItem>
                        <FormLabel>Preferred Hourly Rate (USD)</FormLabel>
                        <FormControl><Input type="number" placeholder="e.g., 30" {...formField} value={formField.value ?? ""} onChange={e => formField.onChange(e.target.value === '' ? null : +e.target.value)} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </CardContent>
                </Card>
                 <Card>
                  <CardHeader><CardTitle>Professional Links</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                     <FormField control={form.control} name="linkedinUrl" render={({ field: formField }) => (
                      <FormItem>
                        <FormLabel>LinkedIn Profile URL</FormLabel>
                        <FormControl><Input placeholder="https://www.linkedin.com/in/yourprofile" {...formField} value={formField.value ?? ""} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                     <FormField control={form.control} name="githubUrl" render={({ field: formField }) => (
                      <FormItem>
                        <FormLabel>GitHub Profile URL</FormLabel>
                        <FormControl><Input placeholder="https://github.com/yourusername" {...formField} value={formField.value ?? ""} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="portfolio">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Portfolio Projects</CardTitle>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendPortfolio({ title: "", description: "", imageUrl: "", projectUrl: "", dateCompleted: "", 'data-ai-hint': "" })}>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Project
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {portfolioFields.map((portfolioItem, portfolioIndex) => {
                      return (
                        <Card key={portfolioItem.id} className="p-4 border rounded-md">
                          <FormField control={form.control} name={`portfolio.${portfolioIndex}.title`} render={({ field: formField }) => (
                            <FormItem className="mb-2">
                              <FormLabel>Project Title</FormLabel>
                              <FormControl><Input placeholder="e.g., AI-Powered Chatbot Platform" {...formField} value={formField.value ?? ""} /></FormControl><FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name={`portfolio.${portfolioIndex}.description`} render={({ field: formField }) => (
                            <FormItem className="mb-2">
                              <FormLabel>Description</FormLabel>
                              <FormControl><Textarea placeholder="Briefly describe the project, your role, and technologies used." {...formField} value={formField.value ?? ""} /></FormControl><FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name={`portfolio.${portfolioIndex}.imageUrl`} render={({ field: formField }) => (
                            <FormItem className="mb-2">
                              <FormLabel>Image URL (Optional)</FormLabel>
                              <FormControl><Input placeholder="https://yourdomain.com/path/to/project-image.png" {...formField} value={formField.value ?? ""} /></FormControl><FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name={`portfolio.${portfolioIndex}.projectUrl`} render={({ field: formField }) => (
                            <FormItem className="mb-4">
                              <FormLabel>Project Link (e.g., GitHub, Live Demo) (Optional)</FormLabel>
                              <FormControl><Input placeholder="https://github.com/yourusername/project-repo" {...formField} value={formField.value ?? ""} /></FormControl><FormMessage />
                            </FormItem>
                          )} />
                           <FormField control={form.control} name={`portfolio.${portfolioIndex}.dateCompleted`} render={({ field: formField }) => (
                            <FormItem className="mb-4">
                              <FormLabel>Date Completed (Optional)</FormLabel>
                              <FormControl><Input type="date" {...formField} value={formField.value ?? ""} /></FormControl><FormMessage />
                            </FormItem>
                          )} />
                          <Button type="button" variant="destructive" size="sm" onClick={() => removePortfolio(portfolioIndex)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Remove Project
                          </Button>
                        </Card>
                      );
                    })}
                    {portfolioFields.length === 0 && <p className="text-sm text-muted-foreground">No portfolio items have been added yet.</p>}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Education History</CardTitle>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendEducation({ institution: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "", description: "" })}>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Education
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {educationFields.map((educationItem, educationIndex) => {
                      return (
                        <Card key={educationItem.id} className="p-4 border rounded-md">
                          <FormField control={form.control} name={`education.${educationIndex}.institution`} render={({ field: formField }) => (
                            <FormItem className="mb-2"><FormLabel>Institution Name</FormLabel><FormControl><Input placeholder="e.g., Massachusetts Institute of Technology" {...formField} value={formField.value ?? ""} /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name={`education.${educationIndex}.degree`} render={({ field: formField }) => (
                            <FormItem className="mb-2"><FormLabel>Degree</FormLabel><FormControl><Input placeholder="e.g., Bachelor of Science" {...formField} value={formField.value ?? ""} /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name={`education.${educationIndex}.fieldOfStudy`} render={({ field: formField }) => (
                            <FormItem className="mb-2"><FormLabel>Field of Study (Optional)</FormLabel><FormControl><Input placeholder="e.g., Computer Science & Engineering" {...formField} value={formField.value ?? ""} /></FormControl><FormMessage /></FormItem>
                          )} />
                          <div className="grid grid-cols-2 gap-4 mb-2">
                            <FormField control={form.control} name={`education.${educationIndex}.startDate`} render={({ field: formField }) => (
                                <FormItem><FormLabel>Start Date</FormLabel><FormControl><Input type="month" {...formField} value={formField.value ?? ""} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name={`education.${educationIndex}.endDate`} render={({ field: formField }) => (
                                <FormItem><FormLabel>End Date (or Expected)</FormLabel><FormControl><Input type="month" placeholder="MM/YYYY or 'Present'" {...formField} value={formField.value ?? ""} /></FormControl><FormMessage /></FormItem>
                            )} />
                          </div>
                           <FormField control={form.control} name={`education.${educationIndex}.description`} render={({ field: formField }) => (
                            <FormItem className="mb-4">
                              <FormLabel>Description (Optional)</FormLabel>
                              <FormControl><Textarea placeholder="e.g., Relevant coursework, achievements" {...formField} value={formField.value ?? ""} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <Button type="button" variant="destructive" size="sm" onClick={() => removeEducation(educationIndex)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Remove Education
                          </Button>
                        </Card>
                      );
                    })}
                    {educationFields.length === 0 && <p className="text-sm text-muted-foreground">No education history has been added yet.</p>}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Work Experience</CardTitle>
                    <Button type="button" variant="outline" size="sm" onClick={() => appendExperience({ title: "", company: "", startDate: "", endDate: "", description: "", isFreelance: false })}>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {experienceFields.map((experienceItem, experienceIndex) => {
                      return (
                        <Card key={experienceItem.id} className="p-4 border rounded-md">
                          <FormField control={form.control} name={`experience.${experienceIndex}.title`} render={({ field: formField }) => (
                            <FormItem className="mb-2">
                              <FormLabel>Job Title / Role</FormLabel>
                              <FormControl><Input placeholder="e.g., Software Development Intern" {...formField} value={formField.value ?? ""} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name={`experience.${experienceIndex}.company`} render={({ field: formField }) => (
                            <FormItem className="mb-2">
                              <FormLabel>Company / Client</FormLabel>
                              <FormControl><Input placeholder="e.g., Google / Acme Corp." {...formField} value={formField.value ?? ""} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <div className="grid grid-cols-2 gap-4 mb-2">
                            <FormField control={form.control} name={`experience.${experienceIndex}.startDate`} render={({ field: formField }) => (
                                <FormItem>
                                  <FormLabel>Start Date</FormLabel>
                                  <FormControl><Input type="month" {...formField} value={formField.value ?? ""} /></FormControl>
                                  <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name={`experience.${experienceIndex}.endDate`} render={({ field: formField }) => (
                                <FormItem>
                                  <FormLabel>End Date</FormLabel>
                                  <FormControl><Input type="month" placeholder="MM/YYYY or 'Present'" {...formField} value={formField.value ?? ""} /></FormControl>
                                  <FormMessage />
                                </FormItem>
                            )} />
                          </div>
                           <FormField control={form.control} name={`experience.${experienceIndex}.description`} render={({ field: formField }) => (
                            <FormItem className="mb-4">
                              <FormLabel>Description (Optional)</FormLabel>
                              <FormControl><Textarea placeholder="Describe your responsibilities, achievements, and technologies used." {...formField} value={formField.value ?? ""} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                           <FormField control={form.control} name={`experience.${experienceIndex}.isFreelance`} render={({ field: formField }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mb-4">
                              <FormControl>
                                {/* Replace with ShadCN Checkbox if available and desired */}
                                <input type="checkbox" checked={formField.value ?? false} onChange={formField.onChange} className="mt-1" />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  This was a freelance project
                                </FormLabel>
                              </div>
                            </FormItem>
                          )} />
                          <Button type="button" variant="destructive" size="sm" onClick={() => removeExperience(experienceIndex)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Remove Experience
                          </Button>
                        </Card>
                      );
                    })}
                    {experienceFields.length === 0 && <p className="text-sm text-muted-foreground">No work experience has been added yet.</p>}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Button type="submit" size="lg" className="w-full md:w-auto">Save All Changes</Button>
          </form>
        </Form>
      </div>
    </>
  );
}
