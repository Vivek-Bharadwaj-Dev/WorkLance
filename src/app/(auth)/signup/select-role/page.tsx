
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/shared/Logo";
import { ArrowRight, Briefcase, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SelectRolePage() {
  const router = useRouter();

  const handleRoleSelection = (role: "student" | "client") => {
    if (role === "student") {
      router.push(`/signup/student`);
    } else {
      router.push(`/signup/client`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12 px-4">
      <div className="mb-10 text-center">
        <Logo className="justify-center" iconSize={10} textSize="text-3xl" />
        <p className="mt-3 text-muted-foreground">Join the Interna community. First, tell us who you are.</p>
      </div>
      <Card className="w-full max-w-md shadow-xl rounded-xl border-border/60">
        <CardHeader className="text-center pt-8">
          <CardTitle className="text-2xl font-bold">Choose Your Role</CardTitle>
          <CardDescription>Are you looking for opportunities or seeking talent?</CardDescription>
        </CardHeader>
        <CardContent className="px-6 py-7 space-y-6">
          <Button
            variant="outline"
            className="w-full h-20 rounded-lg text-left p-6 flex items-center justify-between group hover:bg-primary/5 hover:border-primary transition-all"
            onClick={() => handleRoleSelection("student")}
          >
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 mr-4 text-primary group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-lg font-semibold text-foreground">Student / Freelancer</p>
                <p className="text-sm text-muted-foreground">Find projects, internships, and build your portfolio.</p>
              </div>
            </div>
            <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            variant="outline"
            className="w-full h-20 rounded-lg text-left p-6 flex items-center justify-between group hover:bg-primary/5 hover:border-primary transition-all"
            onClick={() => handleRoleSelection("client")}
          >
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 mr-4 text-primary group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-lg font-semibold text-foreground">Client / Business</p>
                <p className="text-sm text-muted-foreground">Post projects and hire skilled student talent.</p>
              </div>
            </div>
            <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
        <CardContent className="text-center pb-8">
             <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Log In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
