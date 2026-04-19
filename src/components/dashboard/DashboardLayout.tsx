
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavLinkType } from "@/lib/constants";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Home, LogOut } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DashboardLayoutProps {
  navLinks: NavLinkType[];
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function DashboardLayout({ navLinks, children, title, description }: DashboardLayoutProps) {
  const pathname = usePathname();

  // Simulate logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    // In a real app, redirect or call an API endpoint
    window.location.href = '/login'; 
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)]"> {/* Adjust min-height considering header/footer */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex mt-16 mb-16"> {/* Adjust mt/mb for header/footer height */}
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <Logo iconSize={40} textSize="text-lg" />
          </div>
          <ScrollArea className="flex-1 py-4">
            <nav className="grid items-start px-4 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === link.href && "bg-muted text-primary"
                  )}
                >
                  {/* Icon placeholder - you can map icons to links */}
                  {/* <Home className="h-4 w-4" />  */}
                  {link.label}
                </Link>
              ))}
            </nav>
          </ScrollArea>
          <div className="mt-auto p-4 border-t">
            <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/">
                    <Home className="mr-2 h-4 w-4" /> Back to Site
                </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </aside>
      <main className="flex flex-1 flex-col gap-4 p-4 sm:ml-64 sm:py-6 sm:px-8"> {/* Adjust ml for sidebar width */}
        <div className="mb-4">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">{title}</h1>
            {description && <p className="text-muted-foreground">{description}</p>}
        </div>
        {children}
      </main>
    </div>
  );
}
