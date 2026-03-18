
"use client";

import React from "react"; // Added React import
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { clientDashboardLinks } from "@/lib/constants";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Building, Bell, Palette, UserCog, Languages, SunMoon } from "lucide-react";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ClientSettingsPage() {
  // In a real app, these would come from user state or a theme context
  const [currentTheme, setCurrentTheme] = React.useState("system");
  const [currentLanguage, setCurrentLanguage] = React.useState("en");

  return (
    <DashboardLayout navLinks={clientDashboardLinks} title="Settings" description="Manage your company profile, account, and preferences.">
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserCog className="h-6 w-6 text-primary" />
              <CardTitle>Account Management</CardTitle>
            </div>
            <CardDescription>Update your personal information and account security.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" placeholder="Enter current password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="Enter new password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm new password" />
            </div>
            <Button>Change Password</Button>
            <Separator />
            <p className="text-sm text-muted-foreground">Email Preferences: client@example.com (Not editable)</p>
            <Button variant="destructive" disabled>Delete Account (Coming Soon)</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
             <div className="flex items-center gap-2">
              <Building className="h-6 w-6 text-primary" />
              <CardTitle>Company Profile</CardTitle>
            </div>
            <CardDescription>Manage your organization's details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">Placeholder for company name, logo upload, description etc.</p>
            <Button variant="outline" asChild>
                <Link href="#">Edit Company Profile (Coming Soon)</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
             <div className="flex items-center gap-2">
              <Bell className="h-6 w-6 text-primary" />
              <CardTitle>Notification Preferences</CardTitle>
            </div>
            <CardDescription>Choose how you want to be notified by Interna.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="new-applications" className="flex flex-col space-y-1">
                <span>New Applications Received</span>
                 <span className="font-normal leading-snug text-muted-foreground">
                  Get an email when a student applies to your job post.
                </span>
              </Label>
              <Switch id="new-applications" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="message-notifications-client" className="flex flex-col space-y-1">
                <span>New Messages from Students</span>
                 <span className="font-normal leading-snug text-muted-foreground">
                  Receive notifications for new messages regarding your projects.
                </span>
              </Label>
              <Switch id="message-notifications-client" defaultChecked />
            </div>
             <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="project-updates" className="flex flex-col space-y-1">
                <span>Project Milestone Updates</span>
                 <span className="font-normal leading-snug text-muted-foreground">
                  Be informed about progress on your active projects.
                </span>
              </Label>
              <Switch id="project-updates" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
             <div className="flex items-center gap-2">
              <Palette className="h-6 w-6 text-primary" />
              <CardTitle>Appearance</CardTitle>
            </div>
            <CardDescription>Customize the look and feel of the Interna platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <SunMoon className="h-5 w-5 text-muted-foreground" />
                <Label>Theme</Label>
              </div>
              <RadioGroup 
                defaultValue={currentTheme} 
                onValueChange={setCurrentTheme} 
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                <div>
                  <RadioGroupItem value="light" id="client-theme-light" className="peer sr-only" />
                  <Label
                    htmlFor="client-theme-light"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    Light
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="dark" id="client-theme-dark" className="peer sr-only" />
                  <Label
                    htmlFor="client-theme-dark"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    Dark
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="system" id="client-theme-system" className="peer sr-only" />
                  <Label
                    htmlFor="client-theme-system"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    System
                  </Label>
                </div>
              </RadioGroup>
              <p className="text-xs text-muted-foreground">Actual theme switching logic needs to be implemented.</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Languages className="h-5 w-5 text-muted-foreground" />
                <Label htmlFor="client-language-select">Language</Label>
              </div>
              <Select defaultValue={currentLanguage} onValueChange={setCurrentLanguage}>
                <SelectTrigger id="client-language-select" className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español (Spanish)</SelectItem>
                  <SelectItem value="fr">Français (French)</SelectItem>
                  <SelectItem value="de">Deutsch (German)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Full internationalization (i18n) support needs to be implemented.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
