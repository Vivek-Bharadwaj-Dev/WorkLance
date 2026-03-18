
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, MonitorPlay, MessageSquare, Briefcase, HandCoins, Users, Rocket, Target, PencilRuler, CodeXml, Megaphone, BadgeDollarSign, HeartHandshake, FileText, CheckCircle2, PlayCircle, Link as LinkIcon, Edit3, BriefcaseBusiness } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";

// --- Data Definitions ---

const getStartedSteps = [
  { icon: <Edit3 className="h-6 w-6" />, title: "POST A JOB", description: "Tell us about your project. Upwork connects you with top talent around the world, or near you." },
  { icon: <Users className="h-6 w-6" />, title: "RECEIVE PROPOSALS", description: "Get qualified proposals within 24 hours. Compare bids, reviews, and prior work. Interview favorites and hire the best fit." },
  { icon: <HandCoins className="h-6 w-6" />, title: "HIRE AND COLLABORATE", description: "Use Upwork to chat or video call, share files, and track project milestones from your desktop or mobile." },
  { icon: <CheckCircle2 className="h-6 w-6" />, title: "SECURE PAYMENTS", description: "Pay hourly or fixed-price and receive invoices through Upwork. Only pay for work you authorize." },
];

const freelancerSteps = [
  { icon: <Target className="h-8 w-8 text-primary" />, title: "Create an impressive profile", description: "Build a strong profile that showcases your abilities and attracts clients." },
  { icon: <LinkIcon className="h-8 w-8 text-primary" />, title: "Connect via Upwork platform", description: "Explore opportunities that fit your skills and interests." },
  { icon: <MessageSquare className="h-8 w-8 text-primary" />, title: "Connect with our network", description: "Put your best foot forward. Send a proposal, set your rate, and discuss the project details with clients." },
  { icon: <BriefcaseBusiness className="h-8 w-8 text-primary" />, title: "Deliver high-quality work", description: "Work tracking, get paid securely, and build long-term relationships with clients." },
];

const talentCategories = [
  { image: "https://dummyimage.com/600x400/eeeeee/333333&text=Creative", title: "CREATIVE PROFESSIONALS", description: "Find the best creative minds and talents to help handle your company's visual identities. UI/UX patterns and software architecture." },
  { image: "https://dummyimage.com/600x400/eeeeee/333333&text=Development", title: "WEB AND SOFTWARE DEVELOPERS", description: "Hire app/website engineering experts based on our intelligent ranking to build web products." },
  { image: "https://dummyimage.com/600x400/eeeeee/333333&text=Marketing", title: "MARKETING AND ADVERTISING SPECIALISTS", description: "Drive business results building strategic digital advertising campaigns across various platforms. SEO / Social media marketing / Content creation." },
  { image: "https://dummyimage.com/600x400/eeeeee/333333&text=Business", title: "BUSINESS CONSULTANTS", description: "Get answers to business questions and professional advice. Every consultant is an expert and consistently adds to their deep knowledge base." },
  { image: "https://dummyimage.com/600x400/eeeeee/333333&text=Virtual+Assistance", title: "VIRTUAL ASSISTANTS", description: "Find friendly and dedicated people to assist you with customer service, data entry, support, and research." },
  { image: "https://dummyimage.com/600x400/eeeeee/333333&text=Writing", title: "PROFESSIONAL WRITERS", description: "The best writers across domains will turn your ideas into a compelling narrative that is tailored for your readers." },
];

const reviews = [
  { text: "My overall experience has been excellent. Finding and hiring talent was an incredibly smooth process. The platform is truly exceptional for discovering top-tier freelancers.", author: "Philomena John", rating: 5, avatar: "https://dummyimage.com/100x100/eeeeee/333333&text=PJ" },
  { text: "Everything has been very rewarding. It is incredibly user-friendly and reliable. The pool of talent here is unmatched, and they manage projects effectively.", author: "Mary Williams", rating: 5, avatar: "https://dummyimage.com/100x100/eeeeee/333333&text=MW" },
  { text: "Working here has fundamentally changed my career trajectory. I found amazing freelance gigs, great clients, and reliable support from the platform. A fantastic resource.", author: "Patsey Arthur", rating: 4, avatar: "https://dummyimage.com/100x100/eeeeee/333333&text=PA" },
];


// --- Section Components ---

const HeroSection = () => (
  <section className="container-xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 md:py-24">
    <div className="space-y-6">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-primary uppercase">
        Connect
        <br />
        <span className="text-3xl md:text-4xl text-foreground font-normal normal-case block mt-2">
          With top freelancers online
        </span>
      </h1>
      <p className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed">
        We make finding freelance work easy so you can start right away. 
        Your success is our top priority. The ultimate freelance platform for growth.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button size="lg" className="rounded-full px-8 uppercase font-bold text-xs tracking-wider" asChild>
          <Link href="/jobs/post">Post a Job</Link>
        </Button>
        <Button size="lg" variant="outline" className="rounded-full px-8 uppercase font-bold border-primary text-primary hover:bg-primary/5 text-xs tracking-wider" asChild>
          <Link href="/talent">Find a Freelancer</Link>
        </Button>
      </div>
    </div>
    <div className="relative h-[400px] w-full mt-10 lg:mt-0 hidden md:block">
       <Image 
          src="https://dummyimage.com/600x400/eeeeee/333333&text=Hero+Graphic+Placeholder" 
          alt="Freelancers working online" 
          fill
          className="object-contain"
        />
    </div>
  </section>
);

const GetStartedSection = () => (
  <section className="bg-foreground text-background py-16">
    <div className="container-xl">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold tracking-widest uppercase mb-2">Get Started</h2>
        <Link href="/talent" className="text-blue-400 hover:text-blue-300 transition-colors text-sm">
          Seeking out a freelancer?
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 relative">
        <div className="hidden md:block absolute top-[28px] left-[12%] right-[12%] h-[1px] border-b border-dashed border-background/30 z-0"></div>
        {getStartedSteps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center px-4 relative z-10 mb-8 md:mb-0">
            <div className="w-14 h-14 bg-background text-foreground rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg">
              {index + 1}
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3">{step.title}</h3>
            <p className="text-xs text-background/70 leading-relaxed max-w-[200px]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FreelancerStepsSection = () => (
  <section className="section-padding bg-zinc-50/50">
    <div className="container-xl">
      <div className="text-center mb-16">
        <h2 className="text-xl font-bold text-primary uppercase tracking-widest">As a New Freelancer</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {freelancerSteps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
            <h3 className="text-primary font-bold text-sm mb-4 uppercase tracking-wider">Step {index + 1}</h3>
            <div className="flex-grow w-full mb-6">
                <p className="font-semibold text-sm mb-6 text-foreground min-h-[40px] flex items-center justify-center">{step.title}</p>
                <div className="h-24 w-24 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6">
                    {step.icon}
                </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <p className="text-lg font-medium text-foreground mb-2">Do you need more help? Here's a quick video that can show you your way around</p>
        <Link href="#" className="inline-flex items-center text-primary font-medium hover:underline">
          <PlayCircle className="mr-2 h-4 w-4" /> Watch a short video
        </Link>
      </div>
    </div>
  </section>
);

const TalentSection = () => (
  <section className="section-padding container-xl">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-extrabold tracking-tight uppercase mb-4">Work With Top-Class Talents</h2>
      <p className="text-muted-foreground text-sm uppercase tracking-wider">We value quality and expertise</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {talentCategories.map((category, index) => (
        <div key={index} className="group cursor-pointer">
          <div className="overflow-hidden rounded-xl mb-6 relative aspect-video">
            <Image 
              src={category.image}
              alt={category.title}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <h3 className="font-bold text-sm tracking-widest uppercase mb-3 px-2 group-hover:text-primary transition-colors">{category.title}</h3>
          <p className="text-sm text-muted-foreground px-2 leading-relaxed">
            {category.description}
          </p>
        </div>
      ))}
    </div>
    
    <div className="mt-12 text-center">
      <Button asChild className="rounded-full px-10">
        <Link href="/talent">View All</Link>
      </Button>
    </div>
  </section>
);

const PartnersSection = () => (
  <section className="bg-foreground py-8 border-y border-foreground/80">
    <div className="container-xl">
      <h3 className="text-[10px] text-background/50 font-medium tracking-[0.2em] mb-6 uppercase">Our Partners</h3>
      <div className="flex flex-wrap justify-between items-center gap-8 opacity-70">
         {/* Placeholder Logos - simplified for UI mockup */}
         <div className="text-background font-bold flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-pink-500"></div></div>
         <div className="text-background font-bold text-xl flex items-center gap-2"><div className="grid grid-cols-2 gap-1"><div className="w-3 h-3 bg-red-500"/><div className="w-3 h-3 bg-green-500"/><div className="w-3 h-3 bg-blue-500"/><div className="w-3 h-3 bg-yellow-500"/></div> Microsoft</div>
         <div className="text-background font-bold text-xl flex items-center gap-2">Google Analytics</div>
         <div className="text-background font-bold text-xl flex items-center gap-2">Google Scholar</div>
         <div className="text-background font-bold text-xl flex items-center gap-2">Google Cloud</div>
      </div>
    </div>
  </section>
);

const ReviewsSection = () => (
  <section className="section-padding container-xl text-center">
    <h2 className="text-2xl font-bold tracking-widest uppercase mb-12">Ready to Get Started?</h2>
    <div className="flex justify-center gap-4 mb-20">
      <Button size="lg" className="rounded-full px-8 uppercase font-bold text-xs tracking-wider" asChild>
        <Link href="/jobs/post">Hire a Freelancer</Link>
      </Button>
      <Button size="lg" variant="outline" className="rounded-full px-8 uppercase font-bold border-primary text-primary hover:bg-primary/5 text-xs tracking-wider" asChild>
        <Link href="/jobs">Look for Freelancers</Link>
      </Button>
    </div>

    <h3 className="text-xl font-bold tracking-widest uppercase mb-16">Client Reviews</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
      {reviews.map((review, index) => (
        <Card key={index} className="p-8 bg-blue-50/50 border-none shadow-sm relative">
          <p className="text-sm italic text-foreground leading-relaxed mb-8">"{review.text}"</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden relative">
              <Image src={review.avatar} fill alt={review.author} className="object-cover" />
            </div>
            <div>
              <p className="font-bold text-sm uppercase tracking-wider">{review.author}</p>
              <div className="flex text-yellow-400 text-sm mt-1">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </section>
);


// --- Main Page Component ---

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <GetStartedSection />
      <FreelancerStepsSection />
      <TalentSection />
      <PartnersSection />
      <ReviewsSection />
    </div>
  );
}
