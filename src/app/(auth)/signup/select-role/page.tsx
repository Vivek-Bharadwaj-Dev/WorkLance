
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/shared/Logo";
import { ArrowRight, Briefcase, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SelectRolePage() {
  const router = useRouter();

  const handleRoleSelection = (role: "freelancer" | "client") => {
    if (role === "freelancer") {
      router.push(`/signup/freelancer`);
    } else {
      router.push(`/signup/client`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12 px-4">
      <div className="mb-10 text-center">
        <p className="mt-3 text-muted-foreground">Join the Worklance community. First, tell us who you are.</p>
      </div>
      <Card className="w-full max-w-md shadow-xl rounded-xl border-border/60">
        <CardHeader className="text-center pt-8">
          <CardTitle className="text-2xl font-bold">Choose Your Role</CardTitle>
          <CardDescription>Are you looking for opportunities or seeking talent?</CardDescription>
        </CardHeader>
        <CardContent className="px-6 py-7 space-y-6">
          <Button
            variant="outline"
            className="w-full h-auto py-6 rounded-lg text-left px-6 flex items-center justify-between group hover:bg-primary/5 hover:border-primary transition-all"
            onClick={() => handleRoleSelection("freelancer")}
          >
            <div className="flex items-center gap-4">
              <GraduationCap className="h-8 w-8 text-primary group-hover:scale-110 transition-transform shrink-0" />
              <div>
                <p className="text-lg font-semibold text-foreground">Freelancer</p>
                <p className="text-sm text-muted-foreground whitespace-normal">Find projects and build your portfolio.</p>
              </div>
            </div>
            <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-transform shrink-0" />
          </Button>

          <Button
            variant="outline"
            className="w-full h-auto py-6 rounded-lg text-left px-6 flex items-center justify-between group hover:bg-primary/5 hover:border-primary transition-all"
            onClick={() => handleRoleSelection("client")}
          >
            <div className="flex items-center gap-4">
              <Briefcase className="h-8 w-8 text-primary group-hover:scale-110 transition-transform shrink-0" />
              <div>
                <p className="text-lg font-semibold text-foreground">Client</p>
                <p className="text-sm text-muted-foreground whitespace-normal">Post projects and hire skilled talent.</p>
              </div>
            </div>
            <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-transform shrink-0" />
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
