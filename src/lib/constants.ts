
export type NavLinkType = {
  href: string;
  label: string;
  authRequired?: boolean;
  role?: 'freelancer' | 'client'; // For specific role pages like dashboard.
  roles?: Array<'freelancer' | 'client'>; // For general links visible to specific roles
  isButton?: boolean;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  showWhenLoggedOutOnly?: boolean; // Link only shows if user is logged out
};

export const CHAT_ID_SEPARATOR = '---CHATSEP---';

export const mainNavLinks: NavLinkType[] = [
  // Guest Links (showWhenLoggedOutOnly: true)
  { href: '/jobs', label: 'Find Jobs', showWhenLoggedOutOnly: true },
  { href: '/talent', label: 'Talent', showWhenLoggedOutOnly: true },

  // Freelancer Links
  { href: '/dashboard/freelancer', label: 'Dashboard', authRequired: true, role: 'freelancer' },
  { href: '/jobs', label: 'Jobs', authRequired: true, role: 'freelancer' },
  { href: '/messages', label: 'Messages', authRequired: true, role: 'freelancer' },

  // Client Links
  { href: '/dashboard/client', label: 'Dashboard', authRequired: true, role: 'client' },
  { href: '/talent', label: 'Talent', authRequired: true, role: 'client' },
  { href: '/messages', label: 'Messages', authRequired: true, role: 'client' },
  { href: '/jobs/post', label: 'Post a Job', authRequired: true, role: 'client' },
];

export const guestNavLinks: NavLinkType[] = [
  { href: '/login', label: 'Login', showWhenLoggedOutOnly: true },
  { href: '/signup/select-role', label: 'Register', isButton: true, variant: 'default', showWhenLoggedOutOnly: true },
];

export const freelancerDashboardLinks: NavLinkType[] = [
  { href: '/dashboard/freelancer', label: 'Overview' },
  { href: '/dashboard/freelancer/ai-matches', label: 'AI Job Matches' },
  { href: '/dashboard/freelancer/proposals', label: 'My Proposals' },
  { href: '/dashboard/freelancer/jobs', label: 'Active Jobs' },
  { href: '/dashboard/freelancer/payments', label: 'Payments' },
  { href: '/profile/edit', label: 'My Profile' },
  { href: '/dashboard/freelancer/settings', label: 'Settings' },
];

export const clientDashboardLinks: NavLinkType[] = [
  { href: '/dashboard/client', label: 'Overview' },
  { href: '/dashboard/client/jobs', label: 'My Job Posts' },
  { href: '/dashboard/client/applications', label: 'Applications' },
  { href: '/jobs/post', label: 'Post New Job' },
  { href: '/dashboard/client/settings', label: 'Settings' },
];

export const footerLinks = [
  { href: '/jobs', label: 'Find Jobs' },
  { href: '/talent', label: 'Talent' },
  { href: '/messages', label: 'Messages', authRequired: true, roles: ['freelancer', 'client'] },
  { href: '/dashboard/freelancer', label: 'Freelancer Dashboard', authRequired: true, role: 'freelancer' },
  { href: '/dashboard/client', label: 'Client Dashboard', authRequired: true, role: 'client' },
  { href: '/jobs/post', label: 'Post a Job', authRequired: true, role: 'client' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
];
