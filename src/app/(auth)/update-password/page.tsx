"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/shared/Logo";
import { ArrowRight, Loader2 } from "lucide-react";
import { createBrowserClient } from '@supabase/ssr';
import { useState } from "react";

const updatePasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters for security."),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match. Please re-enter.",
  path: ["confirmPassword"],
});

export default function UpdatePasswordPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof updatePasswordSchema>) {
    setIsLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: values.password
    });

    if (error) {
      toast({
        title: "Error Updating Password",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: "Password Updated Successfully!",
      description: "You have been logged in automatically with your new password.",
      variant: "default",
    });

    localStorage.setItem('isLoggedIn', 'true');
    router.push("/");
    router.refresh();

    setIsLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12 px-4">
      <div className="mb-10 text-center">
        <Logo iconSize={64} showText={false} className="justify-center mb-4" />
        <Logo className="justify-center" iconSize={48} textSize="text-3xl" />
        <p className="mt-3 text-muted-foreground">Set your new password below.</p>
      </div>
      <Card className="w-full max-w-md shadow-xl rounded-xl border-border/60 bg-card">
        <CardHeader className="text-center pt-8">
          <CardTitle className="text-2xl font-bold">Update Password</CardTitle>
          <CardDescription>Enter a new secure password for your account.</CardDescription>
        </CardHeader>
        <CardContent className="px-6 py-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
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
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input className="h-11 rounded-lg" type="password" placeholder="Re-enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full h-11 rounded-lg text-base font-semibold group" size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Updating Password...
                  </>
                ) : (
                  <>
                    Save Password <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
