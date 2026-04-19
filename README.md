\<div align="center"\>

# WorkLance

*Connecting businesses with elite freelance talent — fast, secure, and beautifully.*

[](https://www.google.com/search?q=https://nextjs.org/)
[](https://www.google.com/search?q=https://www.typescriptlang.org/)
[](https://www.google.com/search?q=https://tailwindcss.com/)
[](https://www.google.com/search?q=https://supabase.com/)
[](https://www.google.com/search?q=https://www.framer.com/motion/)

[View Repository](https://github.com/Vivek21Bharadwaj/WorkLance) • [Report Bug](https://www.google.com/search?q=https://github.com/Vivek21Bharadwaj/WorkLance/issues) • [Request Feature](https://www.google.com/search?q=https://github.com/Vivek21Bharadwaj/WorkLance/issues)

\</div\>

-----

## 📋 Table of Contents

  - [About the Project](https://www.google.com/search?q=%23-about-the-project)
  - [Screenshots](https://www.google.com/search?q=%23-screenshots)
  - [Key Features](https://www.google.com/search?q=%23-key-features)
  - [Tech Stack](https://www.google.com/search?q=%23-tech-stack)
  - [AI Integration](https://www.google.com/search?q=%23-ai-integration)
  - [Architecture & Structure](https://www.google.com/search?q=%23-architecture--structure)
  - [Data Models](https://www.google.com/search?q=%23-data-models)
  - [Routing & Pages](https://www.google.com/search?q=%23-routing--pages)
  - [Getting Started](https://www.google.com/search?q=%23-getting-started)
  - [Use Cases](https://www.google.com/search?q=%23-use-cases)

-----

## 📖 About the Project

WorkLance is a **premium freelance and internship marketplace** designed to bridge the gap between businesses and independent professionals (specifically students). It provides a beautifully crafted modern interface where clients can post job listings (gigs) and freelancers can discover, apply for, and manage projects.

The platform is heavily focused on UX and performance, featuring **AI-powered job matching** via Google's Genkit AI, **real-time messaging**, **role-based dashboards**, and **secure authentication** using Supabase and Firebase OAuth. Built to handle modern marketplace demands, it incorporates micro-animations, glassmorphism, and a fully responsive design.

*Note: The platform is currently in an MVP stage. Authentication is handled production-ready via Supabase, while marketplace data persists via client-side `localStorage`.*

-----

## 📸 Screenshots

*(Replace placeholders with actual image paths)*

| Homepage | Freelancer Dashboard |
|:---:|:---:|
| \<img src="docs/placeholder-home.png" alt="Homepage" width="400"/\> | \<img src="docs/placeholder-dashboard.png" alt="Dashboard" width="400"/\> |

| AI Job Matcher | Job Listings |
|:---:|:---:|
| \<img src="docs/placeholder-ai.png" alt="AI Matching" width="400"/\> | \<img src="docs/placeholder-jobs.png" alt="Job Board" width="400"/\> |

-----

## ✨ Key Features

### 👨‍💻 For Freelancers (Students)

  * **Smart Discovery:** Browse, search, and filter job listings (category, type, keyword).
  * **AI Matchmaking:** Google Genkit AI analyzes skills to recommend the highest-probability job matches.
  * **Application System:** Submit project proposals directly through the platform.
  * **Custom Dashboard:** Track earnings, active projects, proposal counts, profile views, and recent activity.
  * **Professional Profiles:** Showcase portfolio items, education, experience, skills, and set an hourly rate.
  * **Communication:** Real-time client messaging and WhatsApp integration.

### 🏢 For Clients (Businesses)

  * **Gig Management:** Post detailed job listings (budget, skills, deadlines, location, categories).
  * **Talent Discovery:** Browse the marketplace talent pool and discover top freelancers.
  * **Applicant Tracking:** Review applications, manage candidates, and track hiring pipelines.
  * **Client Dashboard:** Monitor total spending, active projects, hired talent, and company profile completeness.

### 🌐 Platform-Wide Features

  * **Secure Authentication:** Email/password verification + Google & Facebook OAuth via Supabase Auth.
  * **Role-Based Access Control:** Distinct navigation flows and protected routes for Freelancers vs. Clients.
  * **Premium UI/UX:** Framer Motion micro-animations, glassmorphism, gradient backgrounds, and draggable carousels.

-----

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router), React 18, TypeScript |
| **Styling** | Tailwind CSS 3.4, `tailwindcss-animate` |
| **UI System** | Radix UI Primitives (33+ components), `class-variance-authority`, `clsx`, `tailwind-merge` |
| **Animations** | Framer Motion 12 |
| **Forms & Validation** | React Hook Form, Zod |
| **Authentication** | Supabase Auth (`@supabase/ssr`), Firebase SDK (OAuth Providers) |
| **AI / ML** | Google Genkit AI (`@genkit-ai/googleai`) |
| **Utilities** | Recharts, `date-fns`, `react-day-picker`, Lucide React |

-----

## 🧠 AI Integration: Job Matcher Flow

WorkLance utilizes **Google Genkit AI** to solve the marketplace "cold start" problem by intelligently connecting talent to opportunities.

  * **Engine:** Server-side execution using `@genkit-ai/googleai`.
  * **Processing:** Takes the freelancer's specific skill set and the current active job pool (titles, descriptions, required skills).
  * **Output:** Returns a strictly structured, Zod-validated ranking of recommended jobs, appended with concise (max 15 words) match reasoning.

-----

## 🏗 Architecture & Structure

The codebase follows a modular Next.js App Router pattern, isolating the UI, Authentication, AI, and Data layers.

```text
src/
├── ai/                # Genkit config, dev server, and job-matcher-flow
├── app/               # App Router pages, global CSS, and nested layouts
│   ├── (auth)/        # Login, Signup (Role-based), Password Reset
│   ├── dashboard/     # Role-protected client/student dashboards
│   ├── jobs/          # Job board, individual listings, job posting
│   ├── profile/       # Public and editable freelancer profiles
│   └── messages/      # Chat threads and conversation lists
├── components/        # Radix UI primitives, Layout components, Shared UI
├── hooks/             # Custom React hooks (use-mobile, use-toast)
├── lib/               # Utility functions, Firebase init, Supabase clients/middleware
└── types/             # Strict TypeScript interfaces
```

-----

## 🗄 Data Models

Core entities strictly typed via TypeScript (`src/types/index.ts`):

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'client' | 'admin';
  avatarUrl?: string;
  whatsappNumber?: string;
}

interface Job {
  id: string;
  title: string;
  description: string;
  category: { id: string; name: string };
  type: 'online' | 'offline' | 'hybrid';
  budget?: number;
  postedBy: { id: string; name: string; avatarUrl?: string; whatsappNumber?: string };
  createdAt: string;
  status?: 'open' | 'in-progress' | 'completed' | 'closed';
  // ...
}

interface Application {
  id: string;
  jobId: string;
  student: { id: string; name: string; avatarUrl?: string };
  proposal: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  submittedAt: string;
}
```

-----

## 🗺 Routing & Pages

| Route | Access Level | Description |
|---|---|---|
| `/`, `/about`, `/contact` | Public | Core static pages and landing sections |
| `/jobs`, `/talent` | Public | Browse job listings and freelancer profiles |
| `/login`, `/signup/*` | Guest | Authentication flows and role selection |
| `/dashboard/student/*` | Freelancers | AI matches, proposals, active jobs, payments |
| `/dashboard/client/*` | Clients | Job management, application tracking, settings |
| `/messages/*` | Authenticated | Real-time conversation threads |

-----

## 🚀 Getting Started

### Prerequisites

  * Node.js (v18.17+ recommended)
  * Git
  * Supabase Account (for Authentication)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Vivek21Bharadwaj/WorkLance.git
    cd WorkLance
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory and add your Supabase credentials. **Never commit this file.**

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

    *(Note: Firebase configuration for OAuth is managed in `src/lib/firebase.ts`)*

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open `http://localhost:3000` to view the application.

### Build Scripts

  * `npm run dev` - Start development server
  * `npm run build` - Build for production
  * `npm run start` - Start production server
  * `npm run lint` - Execute ESLint checks


**Developed by Vivek Bharadwaj**
