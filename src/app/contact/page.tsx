
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
    <div className="py-8 md:py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Get In Touch
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Have questions, feedback, or need support? We're here to help!
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto px-4">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Send Us a Message</CardTitle>
            <CardDescription>Fill out the form and we'll respond as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
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
                  <FormItem><FormLabel>Message</FormLabel><FormControl><Textarea className="min-h-[120px]" placeholder="Your message..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" size="lg" className="w-full">Send Message</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-6">
           <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Our Office</h3>
                  <p>Shri Vishwakarma Skill University, Dudhola, Palwal(121102), Haryana, India.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Email Us</h3>
                  <a href="mailto:support@interna.com" className="hover:text-primary">support@interna.com</a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Call Us</h3>
                  <p>9991096875, 9050098950 (Mon-Fri, 9am-5pm)</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-3">Find quick answers to common questions.</p>
                <Button variant="outline" asChild>
                    <a href="/faq">Visit FAQ Page (Coming Soon)</a>
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
