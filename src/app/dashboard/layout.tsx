"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  DollarSign,
  User,
  Settings,
  LogOut,
  Sparkles,
  MessageSquare,
  Users
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";

type Role = "student" | "client" | null;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<Role>(null);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    const storedRole = localStorage.getItem("userRole") as Role;
    setRole(storedRole);
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, [router]);

  if (!role) {
    return null; // Or a loading spinner
  }

  const getStudentLinks = () => [
    { href: "/dashboard/student", label: "My cloud", icon: LayoutDashboard },
    { href: "/dashboard/student/jobs", label: "Active Jobs", icon: Briefcase },
    { href: "/dashboard/student/proposals", label: "My Proposals", icon: FileText },
    { href: "/dashboard/student/ai-matches", label: "AI Matches", icon: Sparkles },
    { href: "/messages", label: "Messages", icon: MessageSquare },
    { href: "/profile/edit", label: 'My profile', icon: User },
  ];

  const getClientLinks = () => [
    { href: "/dashboard/client", label: "My cloud", icon: LayoutDashboard },
    { href: "/dashboard/client/jobs", label: "My Job Posts", icon: Briefcase },
    { href: "/dashboard/client/applications", label: "Applications", icon: FileText },
    { href: "/talent", label: "Find Talent", icon: Users },
    { href: "/messages", label: "Messages", icon: MessageSquare },
  ];

  const sidebarLinks = role === "student" ? getStudentLinks() : getClientLinks();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#0F172A] text-slate-300 flex flex-col shrink-0">
        <div className="p-6 flex flex-col items-center border-b border-slate-800 pb-8 pt-10">
          <Avatar className="h-20 w-20 border-4 border-slate-700 shadow-md mb-4 bg-slate-800">
            <AvatarImage src={`https://dummyimage.com/128x128.png/eeeeee/333333&text=${userName.substring(0, 1).toUpperCase()}`} alt={userName} data-ai-hint="person avatar" />
            <AvatarFallback>{userName.substring(0, 1).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            {/* The reference design is very minimalistic. Let's just have the avatar or hide the name, or keep name. */}
            {/* I will keep the name under the avatar for clarity, though reference image only had avatar. */}
            <h2 className="text-white font-medium text-lg">{userName}</h2>
            <p className="text-xs text-slate-400 capitalize">{role}</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/dashboard/student' && link.href !== '/dashboard/client');
            const Icon = link.icon;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group",
                  isActive 
                    ? "bg-slate-800 text-white" 
                    : "hover:bg-slate-800/50 hover:text-white"
                )}
              >
                <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-slate-400 group-hover:text-primary")} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2 mb-4">
          <Link
             href={role === "student" ? "/dashboard/student/settings" : "/dashboard/client/settings"}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
          >
            <Settings className="h-5 w-5 text-slate-400" />
            <span>Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium w-full text-left text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
          >
            <LogOut className="h-5 w-5 text-slate-400" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-slate-50 relative flex justify-center p-8">
        <div className="w-full max-w-[1400px]">
          {children}
        </div>
      </main>
    </div>
  );
}
