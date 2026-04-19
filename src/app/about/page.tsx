"use client";

import { Button } from "@/components/ui/button";
import { Users, Briefcase, Cpu, Database, TerminalSquare, Rocket, ArrowRight, ShieldCheck, Sparkles, Globe, Laptop, Hexagon, Component, LineChart, CheckCircle, Star, GraduationCap } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

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

const AboutHeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-20 md:pt-36 md:pb-32 text-center border-b border-gray-100">
      {/* Subtle modern animated gradients to make it stunning but not overshadow home page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[0%] left-[50%] -translate-x-[50%] w-[80%] h-[80%] rounded-[100%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-100/80 via-violet-50/60 to-transparent blur-3xl opacity-80" 
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(200,200,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(200,200,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container-xl relative z-10">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer}
          className="max-w-4xl mx-auto space-y-8 flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-700 shadow-sm">
            <Sparkles className="mr-2 h-4 w-4" />
            Our Vision
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.05]">
            Join the <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500">
              Tech Revolution.
            </span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-xl text-gray-600 max-w-2xl leading-relaxed font-medium">
            Launch your career or find the brilliant minds to drive your next innovation. Worklance bridges the gap between top talent and tomorrow's leaders.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const stats = [
    { label: "Global Freelancers", value: "50k+", icon: <Globe className="h-6 w-6 text-indigo-500" /> },
    { label: "Projects Completed", value: "120k", icon: <CheckCircle className="h-6 w-6 text-emerald-500" /> },
    { label: "Client Satisfaction", value: "99%", icon: <Star className="h-6 w-6 text-amber-500" /> },
    { label: "Platform Growth", value: "300%", icon: <LineChart className="h-6 w-6 text-violet-500" /> },
  ];

  return (
    <section className="py-16 relative bg-gray-50 border-b border-gray-100">
      <div className="container-xl relative z-10 -mt-28">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 bg-gradient-to-bl from-indigo-900 to-transparent w-32 h-32 rounded-bl-full" />
              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-extrabold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const ForFreelancersSection = () => (
  <section className="py-24 bg-white relative overflow-hidden text-center md:text-left border-b border-gray-50">
    <div className="container-xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="space-y-6 order-2 md:order-1"
      >
        <motion.div variants={fadeUp} className="w-14 h-14 rounded-2xl bg-violet-100 flex justify-center items-center mb-6 mx-auto md:mx-0">
          <GraduationCap className="h-7 w-7 text-violet-600" />
        </motion.div>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Empowering Freelancers</motion.h2>
        <motion.p variants={fadeUp} className="text-lg text-gray-500 leading-relaxed">
          Whether you are a student breaking into the industry or an experienced professional, Worklance gives you the stage to shine. Work on real projects, build your portfolio, and establish long-term relationships with premier clients.
        </motion.p>
        <motion.ul variants={fadeUp} className="space-y-3 pt-4 text-left">
          <li className="flex items-center text-gray-700"><CheckCircle className="h-5 w-5 text-violet-500 mr-3" /> Build a verified portfolio seamlessly</li>
          <li className="flex items-center text-gray-700"><CheckCircle className="h-5 w-5 text-violet-500 mr-3" /> Connect directly with hiring managers</li>
          <li className="flex items-center text-gray-700"><CheckCircle className="h-5 w-5 text-violet-500 mr-3" /> Secure escrow protects your earnings</li>
        </motion.ul>
      </motion.div>

      {/* Recreated Visual Ornament - Similar to Home Page Hero but Scaled Down */}
      <motion.div 
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative order-1 md:order-2 h-[450px] w-full flex items-center justify-center p-4 lg:p-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-indigo-50/50 rounded-[3rem] border border-gray-100 shadow-xl pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-violet-200/50 blur-[60px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-indigo-200/40 blur-[60px] rounded-full" />
        </div>

        {/* Center UI Card */}
        <motion.div 
           animate={{ y: [-5, 5, -5] }}
           transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
           className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl shadow-violet-100/50 border border-violet-100 relative z-20"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 border border-gray-100 bg-gray-50 rounded-full px-3 py-1.5 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-gray-700">Project Matched</span>
            </div>
            <Hexagon className="h-5 w-5 text-violet-400" />
          </div>

          <div className="space-y-4">
             <div className="h-4 w-3/4 bg-gray-900 rounded-lg" />
             <div className="h-3 w-1/2 bg-gray-200 rounded-full" />
             
             <div className="mt-8 pt-4 border-t border-gray-100 space-y-3">
               <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center"><TerminalSquare className="h-4 w-4 text-indigo-600" /></div>
                   <div className="text-sm font-semibold text-gray-700">API Design</div>
                 </div>
                 <CheckCircle className="h-5 w-5 text-emerald-500" />
               </div>
               <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center"><Component className="h-4 w-4 text-violet-600" /></div>
                   <div className="text-sm font-semibold text-gray-700">React Kit</div>
                 </div>
                 <CheckCircle className="h-5 w-5 text-emerald-500" />
               </div>
             </div>
          </div>
        </motion.div>

        {/* Small Floating Element */}
        <motion.div 
           animate={{ y: [5, -5, 5], x: [2, -2, 2] }}
           transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
           className="absolute -left-4 md:-left-8 top-12 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white z-30 flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
            <Star className="h-5 w-5 text-emerald-500 fill-emerald-500" />
          </div>
          <div className="hidden sm:block">
            <div className="text-xs text-gray-500 font-medium">Rating</div>
            <div className="font-bold text-gray-900">5.0 / 5.0</div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  </section>
);

const VisionSection = () => (
  <section className="py-24 bg-gray-50 relative overflow-hidden text-center md:text-left">
    <div className="container-xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="space-y-6"
      >
        <motion.div variants={fadeUp} className="w-14 h-14 rounded-2xl bg-indigo-100 flex justify-center items-center mb-6 mx-auto md:mx-0">
          <Cpu className="h-7 w-7 text-indigo-600" />
        </motion.div>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Our Mission</motion.h2>
        <motion.p variants={fadeUp} className="text-lg text-gray-500 leading-relaxed">
          At Worklance, our mission is to leverage real-world projects to empower professionals. We provide a platform for applying coding, design, and analytical skills to impactful challenges.
        </motion.p>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="space-y-6"
      >
         <motion.div variants={fadeUp} className="w-14 h-14 rounded-2xl bg-violet-100 flex justify-center items-center mb-6 mx-auto md:mx-0">
          <TerminalSquare className="h-7 w-7 text-violet-600" />
        </motion.div>
        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Who We Are</motion.h2>
        <motion.p variants={fadeUp} className="text-lg text-gray-500 leading-relaxed">
          Worklance was founded by technologists passionate about nurturing the next generation of leaders. We construct a platform that breaks down geographical boundaries.
        </motion.p>
      </motion.div>
    </div>
  </section>
);

const AboutCTASection = () => (
  <section className="py-24 relative overflow-hidden bg-white">
    <div className="container-xl relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <span className="text-indigo-600 font-bold uppercase tracking-wider text-sm mb-4 block">Get Started Today</span>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">Ready to make an impact?</h2>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">Dive in to start collaborating, building, and expanding your professional network.</p>
        <Button size="lg" className="rounded-full px-12 bg-indigo-600 hover:bg-indigo-700 text-white h-14 text-lg font-semibold shadow-xl shadow-indigo-200 transition-all" asChild>
          <Link href="/signup/select-role">Start Building Now</Link>
        </Button>
      </motion.div>
    </div>
  </section>
);

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden bg-white min-h-screen">
      <AboutHeroSection />
      <StatsSection />
      <ForFreelancersSection />
      <VisionSection />
      <AboutCTASection />
    </div>
  );
}
