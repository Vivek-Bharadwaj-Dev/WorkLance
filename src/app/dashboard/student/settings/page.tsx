
"use client";

import React from "react"; // Added React import
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { studentDashboardLinks } from "@/lib/constants";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Bell, Palette, UserCog, Languages, SunMoon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function StudentSettingsPage() {
  // In a real app, these would come from user state or a theme context
  const [currentTheme, setCurrentTheme] = React.useState("system");
  const [currentLanguage, setCurrentLanguage] = React.useState("en");

  return (
    <DashboardLayout navLinks={studentDashboardLinks} title="Settings" description="Manage your account preferences and notification settings.">
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
            <p className="text-sm text-muted-foreground">Email Preferences: student@example.com (Not editable)</p>
            <Button variant="destructive" disabled>Delete Account (Coming Soon)</Button>
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
              <Label htmlFor="job-recommendations" className="flex flex-col space-y-1">
                <span>New Job Recommendations</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Receive emails about jobs that match your profile.
                </span>
              </Label>
              <Switch id="job-recommendations" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="application-updates" className="flex flex-col space-y-1">
                <span>Application Status Updates</span>
                 <span className="font-normal leading-snug text-muted-foreground">
                  Get notified when there's an update on your job applications.
                </span>
              </Label>
              <Switch id="application-updates" defaultChecked />
            </div>
             <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="message-notifications" className="flex flex-col space-y-1">
                <span>New Messages</span>
                 <span className="font-normal leading-snug text-muted-foreground">
                  Receive notifications for new messages from clients.
                </span>
              </Label>
              <Switch id="message-notifications" />
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
                  <RadioGroupItem value="light" id="theme-light" className="peer sr-only" />
                  <Label
                    htmlFor="theme-light"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    Light
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="dark" id="theme-dark" className="peer sr-only" />
                  <Label
                    htmlFor="theme-dark"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    Dark
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="system" id="theme-system" className="peer sr-only" />
                  <Label
                    htmlFor="theme-system"
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
                <Label htmlFor="language-select">Language</Label>
              </div>
              <Select defaultValue={currentLanguage} onValueChange={setCurrentLanguage}>
                <SelectTrigger id="language-select" className="w-full sm:w-[180px]">
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
