"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
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
  Users,
  Menu,
} from "lucide-react";

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
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

  if (!role) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  const links = role === "student" ? [
    { href: "/dashboard/student", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/student/jobs", label: "My Jobs", icon: Briefcase },
    { href: "/dashboard/student/proposals", label: "Proposals", icon: FileText },
    { href: "/dashboard/student/ai-matches", label: "AI Matches", icon: Sparkles },
    { href: "/dashboard/student/payments", label: "Payments", icon: DollarSign },
  ] : [
    { href: "/dashboard/client", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/client/jobs", label: "My Gigs", icon: Briefcase },
    { href: "/dashboard/client/applications", label: "Applications", icon: FileText },
    { href: "/talent", label: "Find Talent", icon: Users },
  ];

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-gray-100">
      <div className="h-16 flex items-center px-6 border-b border-gray-50">
        <Link href="/" className="text-lg font-bold tracking-tight text-gray-900">
          Work<span className="text-indigo-600">Lance</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {links.map((link) => {
          const active = pathname === link.href || (link.href !== "/dashboard/" + role && pathname.startsWith(link.href));
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className={cn("h-4 w-4", active ? "text-indigo-600" : "text-gray-400")} />
              {link.label}
            </Link>
          );
        })}
        
        <div className="pt-4 mt-4 border-t border-gray-50">
          <Link
            href="/messages"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname.includes("/messages") ? "bg-indigo-50 text-indigo-700" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <MessageSquare className="h-4 w-4 text-gray-400" />
            Messages
          </Link>
          <Link
            href={role === "student" ? "/dashboard/student/settings" : "/dashboard/client/settings"}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname.includes("/settings") ? "bg-indigo-50 text-indigo-700" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <Settings className="h-4 w-4 text-gray-400" />
            Settings
          </Link>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-50">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="h-4 w-4 text-gray-400" />
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-[calc(100vh-5rem)] bg-white h-full relative">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-900/10 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 flex items-center justify-between px-6 border-b border-gray-100 bg-white z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileSidebarOpen(true)} className="lg:hidden p-1 -ml-1 rounded-md hover:bg-gray-50">
              <Menu className="h-5 w-5 text-gray-500" />
            </button>
            <h1 className="text-base font-bold text-gray-900 tracking-tight">
              {getPageTitle(pathname)}
            </h1>
          </div>
        </header>

        <main className="p-6 lg:p-10 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

function getPageTitle(pathname: string): string {
  if (pathname.includes("/settings")) return "Settings";
  if (pathname.includes("/messages")) return "Messages";
  if (pathname.includes("/jobs") || pathname.includes("/gigs")) return "Manage Work";
  if (pathname.includes("/proposals") || pathname.includes("/applications")) return "Submissions";
  return "Overview";
}
