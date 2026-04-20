"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Bell, Building, Palette, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ClientSettingsPage() {
  const [currentTheme, setCurrentTheme] = React.useState("system");
  const [currentLanguage, setCurrentLanguage] = React.useState("en");

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Settings</h2>
        <p className="text-gray-400 text-sm mt-1 font-medium">Manage your company profile, account, and preferences.</p>
      </div>

      {/* Account Security */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
            <Lock className="h-4 w-4 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Account Security</h3>
            <p className="text-[11px] text-gray-400">Update your password and security settings</p>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password" className="text-xs font-semibold text-gray-600">Current Password</Label>
            <Input id="current-password" type="password" placeholder="Enter current password" className="rounded-xl border-gray-200 h-10" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-xs font-semibold text-gray-600">New Password</Label>
              <Input id="new-password" type="password" placeholder="Enter new password" className="rounded-xl border-gray-200 h-10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-xs font-semibold text-gray-600">Confirm Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm new password" className="rounded-xl border-gray-200 h-10" />
            </div>
          </div>
          <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl shadow-md shadow-indigo-200 hover:shadow-lg text-xs font-bold px-6">
            Update Password
          </Button>
        </div>
      </div>

      {/* Company Profile */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
            <Building className="h-4 w-4 text-violet-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Company Profile</h3>
            <p className="text-[11px] text-gray-400">Manage your organization&apos;s details</p>
          </div>
        </div>
        <div className="p-6">
          <p className="text-xs text-gray-500 mb-3">Add your company name, logo, and description to attract top talent.</p>
          <Button variant="outline" className="rounded-xl text-xs font-bold border-gray-200" asChild>
            <Link href="#">Edit Company Profile (Coming Soon)</Link>
          </Button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
            <Bell className="h-4 w-4 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
            <p className="text-[11px] text-gray-400">Choose how you want to be notified</p>
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            { id: "new-apps", label: "New Applications", desc: "Email when a student applies to your job post", defaultChecked: true },
            { id: "msg-notif-client", label: "Messages from Students", desc: "Notifications for new messages regarding projects", defaultChecked: true },
            { id: "project-updates", label: "Project Milestones", desc: "Updates on progress of your active projects", defaultChecked: false },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{item.desc}</p>
              </div>
              <Switch id={item.id} defaultChecked={item.defaultChecked} />
            </div>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
            <Palette className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Appearance</h3>
            <p className="text-[11px] text-gray-400">Customize your experience</p>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <Label className="text-xs font-semibold text-gray-600 mb-3 block">Theme</Label>
            <RadioGroup defaultValue={currentTheme} onValueChange={setCurrentTheme} className="grid grid-cols-3 gap-3">
              {["light", "dark", "system"].map((theme) => (
                <div key={theme}>
                  <RadioGroupItem value={theme} id={`client-theme-${theme}`} className="peer sr-only" />
                  <Label
                    htmlFor={`client-theme-${theme}`}
                    className="flex items-center justify-center rounded-xl border-2 border-gray-100 p-3 text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-50 peer-data-[state=checked]:border-indigo-500 peer-data-[state=checked]:text-indigo-600 peer-data-[state=checked]:bg-indigo-50 transition-all capitalize"
                  >
                    {theme}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div>
            <Label className="text-xs font-semibold text-gray-600 mb-3 block">Language</Label>
            <Select defaultValue={currentLanguage} onValueChange={setCurrentLanguage}>
              <SelectTrigger className="w-full sm:w-[200px] rounded-xl border-gray-200 h-10">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl border border-red-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-red-50 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
            <ShieldCheck className="h-4 w-4 text-red-500" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-red-700">Danger Zone</h3>
            <p className="text-[11px] text-gray-400">Irreversible actions</p>
          </div>
        </div>
        <div className="p-6">
          <p className="text-xs text-gray-500 mb-3">Once you delete your account, there is no going back.</p>
          <Button variant="destructive" disabled className="rounded-xl text-xs font-bold">
            Delete Account (Coming Soon)
          </Button>
        </div>
      </div>
    </div>
  );
}
