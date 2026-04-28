# WorkLance Platform

![WorkLance Logo](public/images/logo.png)

WorkLance is a premium, cutting-edge freelance and internship platform tailored explicitly for university students and forward-thinking businesses. Leveraging dynamic AI job matching, a deeply customized user experience, and real-time communication modules, WorkLance connects fresh talent directly with real-world opportunities.

🌐 **Live Demo:** [worklance-project.vercel.app](https://worklance-project.vercel.app)

---

## 🌟 Key Features

1. **Role-Based Workspaces**: Instant, intelligent routing directs authenticated Freelancers (Students) and Clients to dedicated dashboards with tailored capabilities.
2. **AI-Powered Matching Engine**: Integrates modern generative AI (Google Genkit + Gemini) to intelligently analyze unformatted skill arrays and parse employer requirements, synthesizing perfect job recommendations.
3. **Synchronous Realtime Environment**: Built on Supabase’s Realtime WebSocket technologies, ensuring the `/talent` directory and `messaging` features are 100% synchronized across all clients without a page refresh.
4. **Standalone Settings Hub**: A centralized, globally accessible profile portal for managing standard preferences, ensuring seamless adjustments separate from contextual dashboard work.
5. **Harmonized Premium Aesthetics**: Leverages an energetic and sophisticated brand palette wrapped inside interactive gradients (`bg-gradient-to-br from-indigo-50/40 via-white to-violet-50/40`) to stand out from generic MVPs.

---

## 🚀 Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Directory)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Vanilla CSS Modules]
- **Backend / Database**: [Supabase](https://supabase.com/) (PostgreSQL + Realtime + Storage + Auth)
- **AI Tooling**: [Google Genkit](https://firebase.google.com/docs/genkit) + Gemini API
- **UI Components**: custom `shadcn/ui` variants & Radix Primitives

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18.x or newer)
- npm, yarn, or pnpm
- Your own Supabase instance and Google Gemini API keys

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/worklance-repo.git
   cd WorkLance
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Configuration**
   Execute the `supabase_setup.sql` script located in the root of the project to instantiate your required Supabase primitives:
   - `messages` and `conversations` tables
   - `avatars` Storage bucket with appropriate permissive access profiles.

4. **Environment Variables**
   Create a `.env.local` file with the following standard configurations:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   GEMINI_API_KEY=your-gemini-key
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

---

## 📸 Screenshots

| Dashboard Interface | Job Matches Interface | Realtime Messaging |
|:---:|:---:|:---:|
| *(Explore your custom dashboard directly tailored to your role post-login)* | *(Access precise AI matches linking directly to complex role definitions)* | *(Chat instantaneously without frustrating reloads)* |

--- 

## 🛡 License

WorkLance is proprietary & confidential platform material. Built using cutting-edge Agentic Coding frameworks.
