
"use client";

import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';

const platformLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/jobs', label: 'Find Jobs' },
  { href: '/talent', label: 'Browse Talent' },
  { href: '/contact', label: 'Contact' },
];

const forUsersLinks = [
  { href: '/dashboard/student', label: 'Freelancer Dashboard' },
  { href: '/dashboard/client', label: 'Client Dashboard' },
  { href: '/jobs/post', label: 'Post a Gig' },
  { href: '/messages', label: 'Messages' },
];

const legalLinks = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <footer className="border-t border-border/40 bg-card">
      <div className="container-xl py-16 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Column 1: Brand & Socials */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <Logo iconSize={48} textSize="text-2xl" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Connecting student talent with innovative businesses for freelance projects and internships.
            </p>
            <div className="flex items-center space-x-4 pt-1">
              <Link href="#" aria-label="Facebook" className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" aria-label="Twitter" className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" aria-label="Instagram" className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="p-2 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all">
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-5 tracking-wider uppercase">Platform</h4>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: For Users */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-5 tracking-wider uppercase">For Users</h4>
            <ul className="space-y-3">
              {forUsersLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-border/30">
              <h5 className="text-xs font-semibold text-foreground mb-3 tracking-wider uppercase">Legal</h5>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-5">
            <h4 className="text-sm font-semibold text-foreground mb-2 tracking-wider uppercase">Stay Connected</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Get the latest opportunities and platform updates.
            </p>
            <form className="flex space-x-2">
              <Input type="email" placeholder="your@email.com" className="flex-1 rounded-lg bg-background h-10" />
              <Button type="submit" size="icon" className="rounded-lg shrink-0 h-10 w-10">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0 text-primary/60" />
                <span>support@Worklance.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-primary/60" />
                <span>India</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Worklance. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Building bridges between student potential and business innovation.
          </p>
        </div>
      </div>
    </footer>
  );
}
