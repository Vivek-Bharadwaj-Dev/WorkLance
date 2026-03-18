
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/shared/Logo";
import { ArrowRight, GraduationCap, X, Phone, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { createBrowserClient } from '@supabase/ssr';
import { Badge } from "@/components/ui/badge";

const MOCK_USER_DB_KEY = 'internaMockUserDB';

const studentSignupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address. Please use a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters for security."),
  confirmPassword: z.string(),
  universityRollNo: z.string()
    .regex(/^[a-zA-Z0-9]*$/, "Roll No. must be alphanumeric")
    .min(5, "Roll No. must be at least 5 characters")
    .max(15, "Roll No. can be at most 15 characters")
    .optional()
    .or(z.literal('')),
  course: z.string().min(2, "Course name must be at least 2 characters").max(100, "Course name too long").optional().or(z.literal('')),
  skills: z.array(z.string().min(1, "Skill cannot be empty")).optional().default([]),
  whatsappNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid WhatsApp number format. Include country code e.g. +1XXXXXXXXXX").optional().or(z.literal('')),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match. Please re-enter.",
  path: ["confirmPassword"],
});

export default function StudentSignupPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [currentSkill, setCurrentSkill] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const form = useForm<z.infer<typeof studentSignupSchema>>({
    resolver: zodResolver(studentSignupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      universityRollNo: "",
      course: "",
      skills: [],
      whatsappNumber: "",
    },
  });

  const handleAddSkill = (field: any) => {
    const skillToAdd = currentSkill.trim();
    if (skillToAdd && !field.value.map((s: string) => s.toLowerCase()).includes(skillToAdd.toLowerCase())) {
      field.onChange([...field.value, skillToAdd]);
    }
    setCurrentSkill("");
  };

  const handleRemoveSkill = (skillToRemove: string, field: any) => {
    field.onChange(field.value.filter((skill: string) => skill.toLowerCase() !== skillToRemove.toLowerCase()));
  };

  async function onSubmit(values: z.infer<typeof studentSignupSchema>) {
    setIsLoading(true);
    
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.fullName,
          role: 'student',
          university_roll_no: values.universityRollNo || "",
          course: values.course || "",
          skills: values.skills || [],
          whatsapp_number: values.whatsappNumber || "",
        }
      }
    });

    if (error) {
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (data?.user) {
      toast({
        title: "Student Account Created!",
        description: "Welcome to Interna! You can now log in.",
        variant: "default",
      });

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', 'student');
      localStorage.setItem('userName', values.fullName || "Student User");
      localStorage.setItem('userEmail', values.email.toLowerCase()); 

      router.push("/");
      router.refresh();
    }
    
    setIsLoading(false);
  }

  const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          role: 'student'
        }
      },
    });

    if (error) {
       toast({
        title: "OAuth Signup Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12 px-4">
      <div className="mb-6 text-center">
        <Logo iconSize={16} showText={false} className="justify-center mb-3" />
        <Logo className="justify-center" iconSize={5} textSize="text-2xl" />
        <p className="mt-2 text-muted-foreground">Create your student or freelancer account.</p>
      </div>
      <Card className="w-full max-w-lg shadow-xl rounded-xl border-border/60 bg-card">
        <CardHeader className="text-center pt-8">
          <GraduationCap className="h-10 w-10 mx-auto text-primary mb-2" />
          <CardTitle className="text-2xl font-bold">Student / Freelancer Signup</CardTitle>
          <CardDescription>Let&apos;s get you started on your journey.</CardDescription>
        </CardHeader>
        <CardContent className="px-6 py-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input className="h-11 rounded-lg" placeholder="e.g., Alex Johnson" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input className="h-11 rounded-lg" type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input className="h-11 rounded-lg" type="password" placeholder="Choose a strong password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input className="h-11 rounded-lg" type="password" placeholder="Re-enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="universityRollNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>University Roll No. (Optional)</FormLabel>
                    <FormControl>
                      <Input className="h-11 rounded-lg" placeholder="Your university roll number" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormDescription>
                      Alphanumeric, 5-15 characters.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course / Program (Optional)</FormLabel>
                    <FormControl>
                      <Input className="h-11 rounded-lg" placeholder="e.g., B.Tech Computer Science" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormDescription>
                      Your primary course or program of study.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="whatsappNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp Number (Optional)</FormLabel>
                    <FormControl>
                       <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input className="h-11 rounded-lg pl-10" type="tel" placeholder="e.g., +12223334444" {...field} value={field.value ?? ""} />
                      </div>
                    </FormControl>
                     <FormDescription>
                      Include country code for direct WhatsApp contact.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technical Skills (Optional)</FormLabel>
                    <div className="flex gap-2 items-center">
                      <Input
                        className="h-11 rounded-lg"
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
                      <Button type="button" variant="outline" onClick={() => handleAddSkill(field)} className="h-11 rounded-lg">
                        Add
                      </Button>
                    </div>
                    <FormDescription>
                      Type a skill and press Enter or click Add. Selected skills will appear as tags.
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
              <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-lg text-base font-semibold group mt-3" size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full h-11 rounded-lg"
                onClick={() => handleOAuthLogin('google')}
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign up with Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full h-11 rounded-lg"
                onClick={() => handleOAuthLogin('facebook')}
              >
                <svg className="mr-2 h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Sign up with Facebook
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-3 pb-8">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Log In Instead
            </Link>
          </p>
           <p className="text-sm text-muted-foreground">
            Not a student?{" "}
            <Link href="/signup/select-role" className="font-medium text-primary hover:underline">
              Choose a different role
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
    

    
