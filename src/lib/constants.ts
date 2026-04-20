
export type NavLinkType = {
  href: string;
  label: string;
  authRequired?: boolean;
  role?: 'student' | 'client'; // For specific role pages like dashboard.
  roles?: Array<'student' | 'client'>; // For general links visible to specific roles
  isButton?: boolean;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  showWhenLoggedOutOnly?: boolean; // Link only shows if user is logged out
};

export const CHAT_ID_SEPARATOR = '---CHATSEP---';

export const mainNavLinks: NavLinkType[] = [
  // Guest Links (showWhenLoggedOutOnly: true)
  { href: '/', label: 'Home', showWhenLoggedOutOnly: true },
  { href: '/about', label: 'About', showWhenLoggedOutOnly: true },
  { href: '/jobs', label: 'Find Jobs', showWhenLoggedOutOnly: true },
  { href: '/talent', label: 'Talent', showWhenLoggedOutOnly: true },
  { href: '/contact', label: 'Contact', showWhenLoggedOutOnly: true },

  // Freelancer (Student) Links
  { href: '/dashboard/student', label: 'Dashboard', authRequired: true, role: 'student' },
  { href: '/jobs', label: 'Jobs', authRequired: true, role: 'student' },
  { href: '/messages', label: 'Messages', authRequired: true, role: 'student' },
  { href: '/contact', label: 'Contact', authRequired: true, role: 'student' },

  // Client Links
  { href: '/dashboard/client', label: 'Dashboard', authRequired: true, role: 'client' },
  { href: '/talent', label: 'Talent', authRequired: true, role: 'client' },
  { href: '/messages', label: 'Messages', authRequired: true, role: 'client' },
  { href: '/jobs/post', label: 'Post a Gig', authRequired: true, role: 'client' },
  { href: '/contact', label: 'Contact', authRequired: true, role: 'client' },
];

export const guestNavLinks: NavLinkType[] = [
  { href: '/login', label: 'Login', showWhenLoggedOutOnly: true },
  { href: '/signup/select-role', label: 'Register', isButton: true, variant: 'default', showWhenLoggedOutOnly: true },
];

export const studentDashboardLinks: NavLinkType[] = [
  { href: '/dashboard/student', label: 'Overview' },
  { href: '/dashboard/student/ai-matches', label: 'AI Job Matches' },
  { href: '/dashboard/student/proposals', label: 'My Proposals' },
  { href: '/dashboard/student/jobs', label: 'Active Jobs' },
  { href: '/dashboard/student/payments', label: 'Payments' },
  { href: '/profile/edit', label: 'My Profile' },
  { href: '/dashboard/student/settings', label: 'Settings' },
];

export const clientDashboardLinks: NavLinkType[] = [
  { href: '/dashboard/client', label: 'Overview' },
  { href: '/dashboard/client/jobs', label: 'My Job Posts' },
  { href: '/dashboard/client/applications', label: 'Applications' },
  { href: '/jobs/post', label: 'Post New Job' },
  { href: '/dashboard/client/settings', label: 'Settings' },
];

export const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/jobs', label: 'Find Jobs' },
  { href: '/talent', label: 'Talent' },
  { href: '/messages', label: 'Messages', authRequired: true, roles: ['student', 'client'] },
  { href: '/contact', label: 'Contact' },
  { href: '/dashboard/student', label: 'Freelancer Dashboard', authRequired: true, role: 'student' },
  { href: '/dashboard/client', label: 'Client Dashboard', authRequired: true, role: 'client' },
  { href: '/jobs/post', label: 'Post a Gig', authRequired: true, role: 'client' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
];
