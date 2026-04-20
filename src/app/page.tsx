"use client";

import { Button } from "@/components/ui/button";
import { Users, Rocket, CodeXml, Megaphone, BriefcaseBusiness, Sparkles, Star, ArrowRight, ShieldCheck, MapPin, CheckCircle, TrendingUp, Clock, Award, ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Data Definitions ---

const getStartedSteps = [
  { icon: <BriefcaseBusiness className="h-6 w-6 text-indigo-600" />, title: "Define your needs", description: "Share your project goals, timeline, and budget in minutes.", bgColor: "bg-indigo-100", borderColor: "border-indigo-200" },
  { icon: <Users className="h-6 w-6 text-violet-600" />, title: "Meet elite talent", description: "We match you with top-tier professionals vetted by experts.", bgColor: "bg-violet-100", borderColor: "border-violet-200" },
  { icon: <CheckCircle className="h-6 w-6 text-emerald-600" />, title: "Seamless collaboration", description: "Manage tasks, communicate, and track progress effortlessly.", bgColor: "bg-emerald-100", borderColor: "border-emerald-200" },
  { icon: <ShieldCheck className="h-6 w-6 text-blue-600" />, title: "Secure payments", description: "Funds are held safely and only released when you are satisfied.", bgColor: "bg-blue-100", borderColor: "border-blue-200" },
];

const featuredFreelancers = [
  { name: "Alexandra Chen", role: "Principal Product Designer", rate: "$95/hr", rating: 5.0, completed: 142, tags: ["UI/UX", "Figma", "Design Systems"], location: "New York, USA", avatar: "https://dummyimage.com/150x150/1e1e1e/ffffff&text=AC" },
  { name: "David Kim", role: "Senior Full-Stack Engineer", rate: "$120/hr", rating: 4.9, completed: 89, tags: ["React", "Node.js", "System Architecture"], location: "San Francisco, USA", avatar: "https://dummyimage.com/150x150/2d3748/ffffff&text=DK" },
  { name: "Elena Rodriguez", role: "Strategic Brand Consultant", rate: "$110/hr", rating: 4.9, completed: 210, tags: ["Brand Strategy", "Marketing", "Copywriting"], location: "London, UK", avatar: "https://dummyimage.com/150x150/4a5568/ffffff&text=ER" },
  { name: "Marcus Johnson", role: "Lead Data Scientist", rate: "$130/hr", rating: 4.8, completed: 64, tags: ["Python", "TensorFlow", "Machine Learning"], location: "Austin, USA", avatar: "https://dummyimage.com/150x150/1e1e1e/ffffff&text=MJ" },
  { name: "Sofia Patel", role: "DevOps Architect", rate: "$115/hr", rating: 5.0, completed: 112, tags: ["AWS", "Docker", "Kubernetes"], location: "Toronto, Canada", avatar: "https://dummyimage.com/150x150/2d3748/ffffff&text=SP" },
];

const reviews = [
  { text: "The caliber of talent on this platform is unparalleled. We scaled our engineering team with three exceptional developers in under a week.", author: "James Sterling", role: "CTO, Nexus Tech", avatar: "https://dummyimage.com/100x100/121212/ffffff&text=JS" },
  { text: "Worklance has revolutionized how we approach freelance hiring. The interface is stunning and the professionals are consistently top-tier.", author: "Sarah Jenkins", role: "Creative Director", avatar: "https://dummyimage.com/100x100/121212/ffffff&text=SJ" },
  { text: "A truly premium experience from start to finish. The verified talent pool gives us absolute confidence in every hire we make.", author: "Michael Ross", role: "VP of Operations", avatar: "https://dummyimage.com/100x100/121212/ffffff&text=MR" },
];

// --- Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as any } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

// --- Section Components ---

const HeroSection = () => {
  const roles = [
    "Senior UI/UX Designer",
    "Senior Full-Stack Engineer",
    "Product Marketing Manager",
    "Lead Data Scientist",
    "Strategic Brand Consultant"
  ];
  
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-white pt-8 pb-4 md:pt-20 md:pb-16 border-b border-gray-100">
      {/* Immersive Dynamic Gradients - No Parallax scroll effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div className="absolute -top-[10%] -right-[5%] w-[60%] h-[80%] rounded-[100%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-100/60 via-indigo-50/40 to-transparent blur-3xl opacity-80" />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] -left-[10%] w-[50%] h-[70%] rounded-[100%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-100/60 via-purple-50/30 to-transparent blur-3xl opacity-80" 
        />
      </div>

      <div className="container-xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
        <motion.div 
          initial="visible" 
          animate="visible" 
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-semibold text-gray-800 shadow-sm">
            <Award className="mr-2 h-4 w-4 text-indigo-600" />
            The top 1% of independent talent
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight text-gray-900 leading-[1.05]">
            Elevate your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500">
              next big idea.
            </span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-xl text-gray-500 max-w-lg leading-relaxed font-medium">
            Connect with elite freelance designers, engineers, and strategists. Scale your team instantly with trusted experts.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button size="lg" className="rounded-full px-8 bg-indigo-600 hover:bg-indigo-700 text-white h-14 text-base font-semibold shadow-xl shadow-indigo-200 transition-all" asChild>
              <Link href="/signup/client">Hire an Expert</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 h-14 text-base font-semibold transition-all group" asChild>
              <Link href="/talent">Explore Talent <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" /></Link>
            </Button>
          </motion.div>
          
          <motion.div variants={fadeUp} className="pt-8 flex items-center gap-6 text-sm font-medium text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-indigo-500" /> Vetted Professionals
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-indigo-500" /> Secure Escrow
            </div>
          </motion.div>
        </motion.div>

        {/* Eye-catching Hero UI Composition */}
        <motion.div 
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative h-[550px] w-full hidden md:flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/50 to-violet-50/50 rounded-[3rem] border border-white shadow-2xl pointer-events-none" />
           {/* Center piece */}
           <motion.div 
              animate={{ y: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl shadow-indigo-100/50 border border-gray-100/50 relative z-20 pointer-events-auto shrink-0"
            >
              <div className="flex justify-between items-start mb-6">
                 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200 shrink-0">
                   <Sparkles className="h-6 w-6 text-white" />
                 </div>
                 <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold tracking-wide">Available</span>
              </div>
              
              <div className="h-7 mb-1 relative overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.h3 
                    key={currentRoleIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl font-bold text-gray-900 absolute"
                  >
                    {roles[currentRoleIndex]}
                  </motion.h3>
                </AnimatePresence>
              </div>

              <p className="text-gray-500 text-sm mb-6">Specializing in Web3 & SaaS Platforms</p>
              
              <div className="space-y-3">
                 <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                   <div className="h-full w-4/5 bg-indigo-500 rounded-full" />
                 </div>
                 <div className="h-2 w-5/6 bg-gray-100 rounded-full" />
                 <div className="h-2 w-2/3 bg-gray-100 rounded-full" />
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                 <div className="flex -space-x-3">
                   <Image src="https://dummyimage.com/100x100/333/fff&text=1" width={36} height={36} alt="Client" className="rounded-full border-2 border-white" />
                   <Image src="https://dummyimage.com/100x100/555/fff&text=2" width={36} height={36} alt="Client" className="rounded-full border-2 border-white" />
                   <Image src="https://dummyimage.com/100x100/777/fff&text=3" width={36} height={36} alt="Client" className="rounded-full border-2 border-white" />
                 </div>
                 <div className="text-sm font-semibold text-gray-900">$85.00/hr</div>
              </div>
           </motion.div>

           {/* Floating elements */}
           <motion.div 
              animate={{ x: [-10, 10, -10], y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
              className="absolute top-12 -left-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-indigo-100 border border-white z-30 flex items-center gap-4 w-56 pointer-events-auto"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Project Success</div>
                <div className="font-bold text-gray-900">99.8%</div>
              </div>
           </motion.div>

           <motion.div 
              animate={{ x: [10, -10, 10], y: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-20 -right-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-violet-100 border border-white z-30 flex items-center gap-4 w-52 pointer-events-auto"
            >
              <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                <CodeXml className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Top Skills</div>
                <div className="font-bold text-gray-900">React & Next.js</div>
              </div>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const GetStartedSection = () => (
  <section className="py-24 bg-gray-50 relative overflow-hidden">
    <div className="container-xl relative z-10">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4"
        >
          A streamlined hiring process
        </motion.h2>
        <motion.p 
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-500 max-w-2xl mx-auto"
        >
          Skip the friction. Our platform is designed to connect you with top global talent faster than ever.
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {getStartedSteps.map((step, index) => (
          <motion.div 
            key={index} 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.15 } }
            }}
            className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 hover:border-gray-300 transition-all hover:shadow-2xl group relative overflow-hidden"
          >
            <div className={`w-14 h-14 rounded-2xl ${step.bgColor} border ${step.borderColor} flex items-center justify-center mb-6`}>
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ForFreelancersSection = () => (
  <section className="py-32 bg-white relative overflow-hidden">
    {/* Stunning background detailing */}
    <div className="absolute inset-0 pointer-events-none">
       <div className="absolute top-[20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-gradient-to-tr from-fuchsia-100/40 to-violet-100/40 blur-[100px]" />
       <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] rounded-full bg-gradient-to-bl from-indigo-100/40 to-cyan-100/40 blur-[100px]" />
    </div>

    <div className="container-xl relative z-10">
      <div className="flex flex-col lg:flex-row-reverse gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Elegant Text block */}
        <motion.div
           initial={{ opacity: 0, x: -40 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.7, ease: "easeOut" }}
           className="w-full lg:w-1/2 space-y-5"
        >
          <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-semibold text-violet-700 shadow-sm">
            <GraduationCap className="mr-2 h-4 w-4" />
            For Independent Professionals
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
            Your next big <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">breakthrough.</span>
          </h2>
          
          <p className="text-xl text-gray-500 leading-relaxed font-medium">
            Gain absolute autonomy. Worklance gives you exclusive access to high-paying projects from top companies and the tools to manage your freelance career seamlessly.
          </p>

          <div className="space-y-4 pt-4">
              {[
                { title: "Exclusive Client Network", desc: "Connect directly with verified businesses ready to hire." },
                { title: "Guaranteed Secure Payments", desc: "Funds are escrowed upfront for your peace of mind." },
                { title: "Premium Portfolio Showcase", desc: "Stand out with a beautifully designed professional profile." }
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-6 w-6 text-violet-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                    <p className="text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
          </div>

          <div className="pt-6">
            <Button size="lg" className="rounded-full px-10 h-14 bg-violet-600 hover:bg-violet-700 text-white shadow-xl shadow-violet-200 text-lg transition-transform hover:scale-105" asChild>
              <Link href="/signup/student">Join as a Freelancer</Link>
            </Button>
          </div>
        </motion.div>

        {/* Right Side: High Precision UI Composition */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.7, delay: 0.2 }}
           className="w-full lg:w-1/2 relative h-[500px] flex items-center justify-center p-4 lg:p-0"
        >
          {/* Main Glass Card */}
          <div className="relative w-full max-w-lg bg-gray-900 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden border border-gray-800">
             <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/30 blur-[80px] rounded-full mix-blend-screen" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/30 blur-[80px] rounded-full mix-blend-screen" />
             
             <div className="relative z-10">
               <div className="flex justify-between items-center mb-8">
                 <h3 className="text-2xl font-bold text-white tracking-tight">Earning Analytics</h3>
                 <div className="px-3 py-1 bg-white/10 rounded-full backdrop-blur-md border border-white/10 text-white text-sm font-medium">This Month</div>
               </div>

               <div className="flex items-end gap-4 mb-8">
                 <div className="text-5xl font-black text-white">$12,450</div>
                 <div className="flex items-center text-emerald-400 font-bold mb-1">
                   <TrendingUp className="h-5 w-5 mr-1" /> +14.5%
                 </div>
               </div>

               <div className="space-y-4">
                 {[
                   { label: "Frontend Revamp", amount: "$4,200", status: "Completed", color: "bg-emerald-500" },
                   { label: "Mobile App MVP", amount: "$6,500", status: "In Progress", color: "bg-indigo-500" },
                   { label: "Design System", amount: "$1,750", status: "Pending", color: "bg-amber-500" }
                 ].map((job, idx) => (
                   <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-between items-center backdrop-blur-md">
                     <div className="flex items-center gap-4">
                       <div className={`w-3 h-3 rounded-full ${job.color}`} />
                       <div className="font-semibold text-gray-200">{job.label}</div>
                     </div>
                     <div className="text-right">
                       <div className="font-bold text-white">{job.amount}</div>
                       <div className="text-xs text-gray-400 mt-1">{job.status}</div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>

          {/* Floating Element 1 */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute -left-6 top-1/4 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-4 z-20"
          >
             <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
               <span className="text-2xl">🎉</span>
             </div>
             <div>
               <div className="text-sm font-bold text-gray-900">Project Approved</div>
               <div className="text-xs text-gray-500 font-medium">Payment released to escrow</div>
             </div>
          </motion.div>

          {/* Floating Element 2 */}
          <motion.div 
            animate={{ y: [10, -10, 10] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute -right-6 bottom-1/4 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-4 z-20"
          >
             <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center">
               <Star className="h-6 w-6 text-amber-500 fill-amber-500" />
             </div>
             <div>
               <div className="text-sm font-bold text-gray-900">New Endorsement</div>
               <div className="text-xs text-gray-500 font-medium">5-star rating received</div>
             </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  </section>
);

const FreelancersSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const slideLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const slideRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden text-center md:text-left border-y border-gray-100">
      <div className="container-xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl text-left"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">Premium Talent,<br />Curated for You.</h2>
            <p className="text-lg text-gray-500">Discover handpicked professionals with proven track records of delivering exceptional results.</p>
          </motion.div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={slideLeft} className="rounded-full h-12 w-12 border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={slideRight} className="rounded-full h-12 w-12 border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </Button>
            <div className="hidden sm:block w-px h-8 bg-gray-200 mx-1"></div>
            <Button variant="ghost" className="rounded-full text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-semibold group h-12 px-6 hidden sm:inline-flex" asChild>
              <Link href="/talent">View all <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" /></Link>
            </Button>
          </div>
        </div>
        
        {/* Draggable Slider Container */}
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto gap-8 pb-16 pt-6 hide-scrollbar cursor-grab active:cursor-grabbing select-none scroll-smooth snap-x snap-mandatory px-4 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {Array(20).fill(featuredFreelancers).flat().map((person, index) => (
            <motion.div 
              key={index} 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: (index % 5) * 0.1 } }
              }}
              className="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-xl shadow-gray-200/50 overflow-hidden hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-200/60 hover:-translate-y-3 transition-all duration-300 group min-w-[320px] md:min-w-[380px] shrink-0 snap-center pointer-events-auto"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="relative pointer-events-none">
                    <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-100 p-1 shadow-inner bg-white">
                      <div className="w-full h-full relative rounded-full overflow-hidden bg-gray-100">
                         <img src={person.avatar} alt={person.name} className="object-cover w-full h-full pointer-events-none" />
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 bg-indigo-500 rounded-full p-1 border-2 border-white shadow-sm transition-transform group-hover:scale-110">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">{person.rate}</div>
                    <div className="flex items-center justify-end text-amber-500 text-sm mt-1 font-bold">
                      <Star className="h-4 w-4 fill-current mr-1" /> {person.rating}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{person.name}</h3>
                <p className="text-indigo-600 font-semibold mb-4">{person.role}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4 shrink-0 text-gray-400" /> {person.location}</div>
                  <div className="flex items-center gap-1.5"><Award className="h-4 w-4 shrink-0 text-gray-400" /> {person.completed} Jobs</div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {person.tags.map((tag: string) => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-xs font-semibold border border-gray-200">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Button className="w-full bg-gray-50 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 text-gray-900 border border-gray-200 uppercase tracking-widest text-xs font-bold rounded-xl h-12 transition-all duration-300">
                  View Profile
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MinimalHighlightSection = () => (
  <section className="py-24 bg-gray-950 relative overflow-hidden border-b border-gray-900 border-t border-t-gray-900">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-gray-950 to-gray-950 pointer-events-none" />
    </div>
    <div className="container-xl relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
        {[
          { label: "Global Talent Pool", value: "50K+" },
          { label: "Successful Projects", value: "120K+" },
          { label: "Client Satisfaction", value: "99.8%" },
          { label: "Secure Transactions", value: "$45M+" }
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="p-6 relative group"
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            <div className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
              {stat.value}
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-32 bg-gray-950 relative overflow-hidden">
    <div className="absolute inset-0 z-0 opacity-30">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600 rounded-full blur-[120px] mix-blend-screen opacity-40 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-600 rounded-full blur-[100px] mix-blend-screen opacity-40 -translate-x-1/3 translate-y-1/3" />
      {/* Mesh grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>
    
    <div className="container-xl relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto backdrop-blur-sm bg-gray-900/40 p-12 md:p-20 rounded-[3rem] border border-white/10"
      >
        <span className="text-indigo-400 font-bold uppercase tracking-wider text-sm mb-4 block">Get Started Today</span>
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">Your next great hire is waiting.</h2>
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">Join the world's most innovative organizations accessing elite independent talent on Worklance.</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Button size="lg" className="rounded-full px-12 bg-white hover:bg-gray-100 text-gray-900 h-16 text-lg font-bold shadow-xl shadow-white/10 transition-transform hover:scale-105" asChild>
            <Link href="/signup/client">Start Building Now</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

// --- Main Page Component ---

export default function HomePage() {
  return (
    <div className="overflow-x-hidden bg-white min-h-screen">
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
      <HeroSection />
      <GetStartedSection />
      <ForFreelancersSection />
      <FreelancersSection />
      <CTASection />
    </div>
  );
}
