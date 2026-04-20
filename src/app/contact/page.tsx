
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof contactSchema>) {
    console.log("Contact Form Submitted:", values);
    // IMPORTANT: To send this data to an email address like Vivek21bharadwaj@gmail.com,
    // you would need to set up a backend API endpoint.
    // This endpoint would receive the form data and use an email sending service
    // (e.g., SendGrid, Mailgun, Nodemailer with an SMTP server) to dispatch the email.
    // Direct email sending from the client-side is not secure or reliable.
    toast({ title: "Message Sent!", description: "Thanks for reaching out. We'll get back to you soon." });
    form.reset();
  }

  return (
    <div className="py-12 md:py-24 bg-gradient-to-br from-indigo-50/40 via-white to-violet-50/40 min-h-[calc(100vh-5rem)]">
      <section className="text-center mb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-indigo-500/10 blur-[100px] -z-10 rounded-full" />
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
          Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Conversation.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium">
          Whether you have a question, need support, or want to explore partnership opportunities, we're ready to help.
        </p>
      </section>

      <div className="grid md:grid-cols-5 gap-8 lg:gap-16 max-w-6xl mx-auto px-4 relative z-10">
        <Card className="shadow-2xl md:col-span-3 rounded-[2rem] border-white/50 bg-white/80 backdrop-blur-xl">
          <CardHeader className="px-8 pt-8">
            <CardTitle className="text-3xl font-bold text-gray-900">Send a Message</CardTitle>
            <CardDescription className="text-base">Fill out the form below and our team will respond within 24 hours.</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Your Name" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="subject" render={({ field }) => (
                  <FormItem><FormLabel>Subject (Optional)</FormLabel><FormControl><Input placeholder="e.g., Question about job posting" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem><FormLabel className="text-gray-900 font-semibold">Message</FormLabel><FormControl><Textarea className="min-h-[150px] rounded-xl resize-none text-base" placeholder="How can we help you?" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" size="lg" className="w-full h-14 rounded-xl text-lg font-bold bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all">Send Message</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-8 md:col-span-2">
           <Card className="shadow-xl rounded-[2rem] border-white/50 bg-indigo-600 text-white border-0">
            <CardHeader className="px-8 pt-8">
              <CardTitle className="text-2xl font-bold">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8 space-y-6 text-indigo-100">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-indigo-500/50 flex flex-shrink-0 items-center justify-center mr-4">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Our Office</h3>
                  <p>Shri Vishwakarma Skill University, Dudhola, Palwal(121102), Haryana, India.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Email Us</h3>
                  <a href="mailto:support@Worklance.com" className="hover:text-primary">support@Worklance.com</a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-white">Call Us</h3>
                  <p>9991096875, 9050098950<br/><span className="text-sm opacity-80">(Mon-Fri, 9am-5pm)</span></p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg rounded-[2rem] border-white/50 bg-white/80 backdrop-blur-xl">
            <CardHeader>
                <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-3">Find quick answers to common questions.</p>
                <Button variant="outline" className="w-full rounded-xl border-gray-200 hover:bg-gray-50 h-12" asChild>
                    <a href="/faq">Visit FAQ Page</a>
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
