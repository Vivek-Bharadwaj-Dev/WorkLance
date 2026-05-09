
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'freelancer' | 'client' | 'admin';
  avatarUrl?: string;
  whatsappNumber?: string; // Added
}

export interface JobCategory {
  id: string;
  name: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  category: JobCategory;
  type: 'online' | 'offline' | 'hybrid';
  budget?: number;
  postedBy: {
    id: string; // Should ideally be the client's email/unique ID
    name: string;
    avatarUrl?: string;
    whatsappNumber?: string;
  };
  createdAt: string;
  deadline?: string;
  location?: string;
  skillsRequired?: string[];
  status?: 'open' | 'in-progress' | 'completed' | 'closed';
}

export interface FreelancerProfile {
  userId: string; // Typically email
  name: string;
  avatarUrl?: string;
  headline?: string;
  bio?: string;
  skills?: string[];
  portfolio?: PortfolioItem[];
  hourlyRate?: number;
  education?: EducationItem[];
  experience?: ExperienceItem[];
  rating?: number;
  completedJobs?: number;
  location?: string;
  course?: string;
  universityRollNo?: string;
  whatsappNumber?: string;
  createdAt?: string; // Added for sorting by newness
  email?: string; // Ensure email is present for chat ID generation
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  projectUrl?: string;
  dateCompleted?: string;
  'data-ai-hint'?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface ExperienceItem {
  id:string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description?: string;
  isFreelance?: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle?: string;
  freelancer: Pick<User, 'id' | 'name' | 'avatarUrl'>; // freelancer.id should be their email
  proposal: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  submittedAt: string;
  attachments?: string[];
}

export interface Rating {
  id: string;
  jobId: string;
  ratedByUserId: string;
  ratedUserId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
  createdAt: string;
  type: 'freelancer_to_client' | 'client_to_freelancer';
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string; // user email
  receiverId: string; // user email
  content: string;
  timestamp: string;
  isRead?: boolean;
}

export interface ChatSummary {
  chatId: string;
  otherParticipant: {
    id: string; // email
    name: string;
    avatarUrl?: string;
  };
  lastMessage: Message | null;
}
