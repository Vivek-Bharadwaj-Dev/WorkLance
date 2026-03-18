
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, LogOut, UserCircle, LayoutDashboard, Briefcase, Info, MessageSquare, HomeIcon, BookUser, Contact, Edit, UserPlus, UserRoundCog, Search, ScrollText, Users, FileTextIcon, ShieldCheckIcon, ShieldAlertIcon, Send, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from '@/components/shared/Logo';
import { mainNavLinks, guestNavLinks, NavLinkType } from '@/lib/constants';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'student' | 'client' | null>(null);
  const [userName, setUserName] = useState("User");
  const pathname = usePathname();
  const router = useRouter();

  if (pathname.startsWith('/dashboard')) {
    return null;
  }

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    const roleFromStorage = localStorage.getItem('userRole') as 'student' | 'client' | null;
    const storedName = localStorage.getItem('userName');
    setIsLoggedIn(loggedInStatus);
    setUserRole(roleFromStorage);
    if (storedName) setUserName(storedName);

    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserRole(null);
    setUserName("User");
    router.push('/login');
  };

  const activeLinks = mainNavLinks.filter(link => {
    if (link.showWhenLoggedOutOnly && isLoggedIn) return false;
    if (link.authRequired && !isLoggedIn) return false;
    if (link.role && (!userRole || userRole !== link.role)) return false;
    if (link.roles && (!userRole || !link.roles.includes(userRole))) return false;
    return true;
  });

  const activeGuestLinks = guestNavLinks.filter(link => {
    if (link.showWhenLoggedOutOnly && isLoggedIn) return false;
    return true;
  });

  const getNavLinkIcon = (label: string) => {
    if (label === 'Home') return <HomeIcon className="mr-2 h-4 w-4" />;
    if (label === 'Find Jobs') return <Search className="mr-2 h-4 w-4" />;
    if (label === 'About') return <Info className="mr-2 h-4 w-4" />;
    if (label === 'Contact') return <Contact className="mr-2 h-4 w-4" />;
    if (label === 'Post a Project') return <Edit className="mr-2 h-4 w-4" />;
    if (label === 'Dashboard') return <LayoutDashboard className="mr-2 h-4 w-4" />;
    if (label === 'Profile Settings') return <UserRoundCog className="mr-2 h-4 w-4" />;
    if (label === 'My Proposals') return <FileTextIcon className="mr-2 h-4 w-4" />;
    if (label === 'Active Jobs') return <Briefcase className="mr-2 h-4 w-4" />;
    if (label === 'Find Talent') return <Users className="mr-2 h-4 w-4" />;
    if (label === 'Messages') return <Send className="mr-2 h-4 w-4" />;
    if (label === 'My Device Uploads') return <UploadCloud className="mr-2 h-4 w-4" />;
    if (label === 'Terms') return <ShieldCheckIcon className="mr-2 h-4 w-4" />;
    if (label === 'Privacy Policy') return <ShieldAlertIcon className="mr-2 h-4 w-4" />;
    if (label === 'Login') return <UserCircle className="mr-2 h-4 w-4" />;
    if (label === 'Register') return <UserPlus className="mr-2 h-4 w-4" />;

    return null;
  };


  const renderNavLink = (link: NavLinkType, isMobile: boolean = false) => (
    <Button
      key={`${link.href}-${link.label}-${link.role || 'general'}-${link.roles?.join('-') || ''}`}
      variant={link.isButton && !isMobile ? 'default' : (link.variant || 'ghost')}
      size={isMobile ? 'lg' : 'sm'}
      asChild
      className={cn(
        "font-medium transition-colors duration-200 ease-in-out",
        pathname === link.href ? "text-primary hover:text-primary/90 bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/5",
        isMobile ? "w-full justify-start text-base py-3 border-b border-border/20 rounded-none last:border-b-0" : "px-3 py-2 rounded-md",
        link.isButton && !isMobile ? "bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2.5 shadow-sm hover:shadow-md" : ""
      )}
      onClick={() => isMobile && setIsMobileMenuOpen(false)}
    >
      <Link href={link.href}>
        {isMobile && getNavLinkIcon(link.label)}
        {link.label}
      </Link>
    </Button>
  );

  const UserMenu = () => {
    if (!isLoggedIn) return null;

    let profileLink = userRole === 'student' ? '/profile/edit' : '/dashboard/client/settings'; // Client profile edit not yet distinct
    let dashboardLink = userRole === 'student' ? '/dashboard/student' : (userRole === 'client' ? '/dashboard/client' : '/');
    const userEmail = localStorage.getItem('userEmail');

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10 border-2 border-primary/30 hover:border-primary transition-colors">
              <AvatarImage src={`https://dummyimage.com/40x40.png/eeeeee/333333&text=${userName.substring(0, 1).toUpperCase()}`} alt={userName} data-ai-hint="person avatar" />
              <AvatarFallback className="text-sm bg-muted text-muted-foreground">{userName.substring(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mt-2 rounded-lg shadow-lg border-border/50" align="end" forceMount>
          <DropdownMenuLabel className="font-normal px-3 py-2">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold leading-none text-foreground">{userName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {userEmail || (userRole ? `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Account` : 'user@example.com')}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="cursor-pointer hover:bg-muted">
            <Link href={dashboardLink} className="flex items-center px-3 py-2">
              <LayoutDashboard className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer hover:bg-muted">
            <Link href="/messages" className="flex items-center px-3 py-2">
              <Send className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Messages</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer hover:bg-muted">
            <Link href={profileLink} className="flex items-center px-3 py-2">
              <UserRoundCog className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Profile Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer hover:bg-muted focus:bg-destructive/10 focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4 text-muted-foreground group-focus:text-destructive" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur-lg supports-[backdrop-filter]:bg-background/75">
      <div className="container-xl flex h-20 items-center justify-between">
        <Logo iconSize={18} textSize="text-2xl" />
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {activeLinks.map(link => renderNavLink(link))}
        </nav>
        <div className="hidden md:flex items-center space-x-3">
          {isLoggedIn ? (
            <UserMenu />
          ) : (
            activeGuestLinks.map(link => renderNavLink(link))
          )}
        </div>
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-lg">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs p-0 bg-background flex flex-col">
              <div className="p-6 flex justify-between items-center border-b">
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                <Logo iconSize={12} textSize="text-xl" />
              </div>
              <nav className="flex-grow flex flex-col space-y-0 p-4">
                {activeLinks.map(link => renderNavLink(link, true))}
                <div className="pt-6 mt-auto border-t border-border/40">
                  {isLoggedIn ? (
                    <>
                      <Button
                        variant="ghost"
                        className="w-full justify-start px-0 py-3 text-base font-medium text-muted-foreground transition-colors hover:text-primary border-b border-border/20 rounded-none"
                        asChild
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link href={userRole === 'student' ? '/profile/edit' : '/dashboard/client/settings'} >
                          {getNavLinkIcon('Profile Settings')} Profile Settings
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start px-0 py-3 text-base font-medium text-muted-foreground transition-colors hover:text-primary rounded-none"
                        onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Log Out
                      </Button>
                    </>
                  ) : (
                    activeGuestLinks.map(link => renderNavLink(link, true))
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
