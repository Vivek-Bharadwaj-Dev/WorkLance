
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, Lightbulb, Cpu, Database, TerminalSquare } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="space-y-12 py-8 md:py-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          About <span className="text-primary">Interna</span>: The Tech Talent Nexus
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Fostering innovation by connecting bright student minds with businesses shaping the future of technology.
        </p>
      </section>

      {/* Image placeholder section removed */}

      <section className="max-w-3xl mx-auto px-4 space-y-8 text-center md:text-left">
        <div>
          <h2 className="text-3xl font-semibold text-foreground mb-3 flex items-center justify-center md:justify-start">
            <Cpu className="h-8 w-8 text-primary mr-3" /> Our Tech-Driven Mission
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            At Interna, our mission is to bridge the gap between academic theory and real-world tech application. We empower university students to apply their coding, design, and analytical skills to impactful projects, building robust portfolios and gaining invaluable experience. For businesses, we provide a direct channel to fresh, innovative tech talent ready to tackle challenges in software development, data science, AI, and more.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-foreground mb-3 flex items-center justify-center md:justify-start">
            <TerminalSquare className="h-8 w-8 text-primary mr-3" /> Who We Are
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Interna was founded by technologists passionate about nurturing the next generation of tech leaders. We understand the dynamic needs of the tech industry and the drive of students to contribute to meaningful innovation. Our platform is engineered to be an intuitive, secure, and efficient marketplace for tech-focused freelance collaborations.
          </p>
        </div>
         <div>
          <h2 className="text-3xl font-semibold text-foreground mb-3 flex items-center justify-center md:justify-start">
            <Database className="h-8 w-8 text-primary mr-3" /> What We Offer for Tech
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We provide a comprehensive freelancing ecosystem tailored for technology projects:
          </p>
          <ul className="list-disc list-inside text-muted-foreground leading-relaxed mt-2 space-y-1 pl-4">
            <li>Specialized dashboards for managing tech projects, sprints, and deliverables.</li>
            <li>A job board featuring opportunities in web/app development, AI/ML, data analytics, cybersecurity, and UX/UI design.</li>
            <li>Tools for students to showcase technical proficiencies, GitHub repositories, and project case studies.</li>
            <li>Secure communication, version control integration ideas, and transparent project tracking.</li>
            <li>A commitment to building a vibrant community of student innovators and tech-forward businesses.</li>
          </ul>
        </div>
      </section>

      <section className="text-center max-w-3xl mx-auto px-4 py-10 bg-primary rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-primary-foreground">Join the Tech Revolution</h2>
        <p className="mt-3 text-lg text-primary-foreground/90">
          Ready to make your mark? Students, launch your tech careers and contribute to groundbreaking projects. Businesses, find the brilliant minds to drive your next innovation. Interna is your catalyst. Let's shape the future of technology, together.
        </p>
      </section>
    </div>
  );
}
