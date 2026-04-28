"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { createBrowserClient } from '@supabase/ssr';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2, Save } from "lucide-react";

export default function GlobalProfileSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  
  const { toast } = useToast();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        
        setFullName(profile?.full_name || user.user_metadata?.full_name || "");
        setContactNumber(profile?.whatsapp_number || profile?.contact_number || "");
        setAvatarUrl(profile?.avatar_url || "");
      }
      setLoading(false);
    }
    loadProfile();
  }, [supabase]);

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) return;
      
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
        
      setAvatarUrl(publicUrl);
      
      // Auto save avatar
      await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', user.id);
      await supabase.auth.updateUser({ data: { avatar_url: publicUrl } });
      
      toast({ title: "Avatar uploaded successfully" });
    } catch (error: any) {
      toast({ title: "Error uploading avatar", description: error.message, variant: "destructive" });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const updates = {
        full_name: fullName,
        whatsapp_number: contactNumber, // or contact_number depending on your schema
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id);

      if (error) throw error;
      
      // Update auth metadata
      await supabase.auth.updateUser({
        data: { full_name: fullName }
      });

      // Update local storage for header sync
      localStorage.setItem('userName', fullName);

      toast({
        title: "Profile updated",
        description: "Your profile information has been saved.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-[50vh]"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
      <div className="bg-card rounded-2xl shadow-sm border border-border p-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Profile Settings</h1>
        <p className="text-muted-foreground mb-8">Manage your public profile and contact information.</p>
        
        <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <AvatarImage src={avatarUrl || `https://dummyimage.com/128x128.png/eeeeee/333333&text=${fullName.substring(0, 1).toUpperCase()}`} />
              <AvatarFallback className="text-4xl">{fullName.substring(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="relative">
              <input 
                type="file" 
                id="avatar-upload" 
                className="hidden" 
                accept="image/*"
                onChange={handleAvatarUpload}
              />
              <Label 
                htmlFor="avatar-upload" 
                className="flex items-center gap-2 cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                <Camera className="w-4 h-4" />
                Change Picture
              </Label>
            </div>
          </div>
          
          <form className="flex-1 space-y-6 w-full" onSubmit={handleSave}>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input 
                id="contactNumber" 
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="+1 (555) 000-0000"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                value={user?.email || ""}
                disabled
                className="bg-muted"
                title="Email cannot be changed here"
              />
            </div>
            
            <Button 
               type="submit" 
               className="w-full sm:w-auto"
               disabled={saving}
            >
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Changes
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
