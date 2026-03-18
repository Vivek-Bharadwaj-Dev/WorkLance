
'use server';
/**
 * @fileOverview An AI flow for matching students to jobs based on their skills.
 *
 * - matchJobsToSkills - A function that takes student skills and a list of jobs, returning recommended jobs.
 * - JobMatcherInput - The input type for the matchJobsToSkills function.
 * - JobMatcherOutput - The return type for the matchJobsToSkills function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { Job } from '@/types'; // Assuming Job type is defined in src/types

// Define a simpler Job schema for the prompt input, as we don't need all Job fields
const JobForPromptSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  skillsRequired: z.array(z.string()).optional().describe("A list of skills explicitly required for the job."),
});
export type JobForPrompt = z.infer<typeof JobForPromptSchema>;

const JobMatcherInputSchema = z.object({
  studentSkills: z
    .array(z.string())
    .min(1, { message: 'At least one student skill must be provided.' })
    .describe("A list of skills the student possesses."),
  jobs: z
    .array(JobForPromptSchema)
    .min(1, { message: 'At least one job must be provided for matching.' })
    .describe("A list of available jobs to match against."),
});
export type JobMatcherInput = z.infer<typeof JobMatcherInputSchema>;

const RecommendedJobSchema = z.object({
  jobId: z.string().describe("The ID of the recommended job."),
  reason: z.string().describe("A brief explanation (max 15 words) for why this job is a good match for the student's skills."),
});
export type RecommendedJob = z.infer<typeof RecommendedJobSchema>;

const JobMatcherOutputSchema = z.array(RecommendedJobSchema).describe("A list of recommended jobs, potentially empty if no suitable matches are found.");
export type JobMatcherOutput = z.infer<typeof JobMatcherOutputSchema>;


export async function matchJobsToSkills(input: JobMatcherInput): Promise<JobMatcherOutput> {
  // Validate input using the Zod schema; this will throw if input is invalid.
  JobMatcherInputSchema.parse(input);
  return jobMatcherFlow(input);
}

const jobMatchingPrompt = ai.definePrompt({
  name: 'jobMatchingPrompt',
  input: { schema: JobMatcherInputSchema },
  output: { schema: JobMatcherOutputSchema },
  prompt: `You are an expert career matching AI. Your goal is to recommend suitable jobs to a student based on their skills.
Analyze the student's skills and compare them against the requirements of the available jobs.
Provide a list of job recommendations. For each recommendation, include the job ID and a concise reason (max 15 words) explaining why the job is a good match, focusing on skill alignment.
Prioritize jobs where the student's skills significantly overlap with the job's required skills. Also consider the job title and description for relevance.
If a job requires many skills the student does not possess, it is less likely to be a good match.

Student's skills:
{{#if studentSkills}}
{{#each studentSkills}}
- {{this}}
{{/each}}
{{else}}
No specific skills provided by the student.
{{/if}}

Available jobs:
{{#each jobs}}
Job ID: {{this.id}}
Title: "{{this.title}}"
{{#if this.description}}Description: "{{this.description}}"{{/if}}
Required Skills: {{#if this.skillsRequired}} {{#each this.skillsRequired}} {{this}}{{#unless @last}}, {{/unless}} {{/each}} {{else}} None specified {{/if}}
---
{{/each}}

Return your recommendations as a JSON array of objects, where each object has "jobId" and "reason".
If no jobs are a good match, return an empty array.
Only include jobs that are a reasonable match. Do not recommend jobs if the skill overlap is very low or non-existent.
`,
});

const jobMatcherFlow = ai.defineFlow(
  {
    name: 'jobMatcherFlow',
    inputSchema: JobMatcherInputSchema,
    outputSchema: JobMatcherOutputSchema,
  },
  async (input) => {
    const { output } = await jobMatchingPrompt(input);
    return output || []; // Ensure it returns an empty array if output is null/undefined
  }
);
