import type { SkillGroup, Strength } from "@/lib/schema";

/** Core strengths, self-rated 0–100. Shown as bars in two columns. */
export const strengths: Strength[] = [
  { name: "Test Automation", level: 92 },
  { name: "Manual & Exploratory Testing", level: 95 },
  { name: "Full-stack Web Development", level: 85 },
  { name: "API Testing & Debugging", level: 90 },
  { name: "Problem Solving", level: 93 },
  { name: "Communication & Teamwork", level: 88 },
];

/** Tech stack cards, in display order. */
export const skills: SkillGroup[] = [
  {
    group: "Testing & QA",
    items: ["Playwright", "Cypress", "Postman", "k6", "JMeter", "Locust"],
  },
  {
    group: "Test Management",
    items: ["Test planning", "Test case design", "Bug reporting", "Test summary reports"],
  },
  {
    group: "Programming",
    items: ["JavaScript", "TypeScript", "Java", "C", "HTML", "CSS"],
  },
  {
    group: "Database",
    items: ["PostgreSQL", "MySQL", "MongoDB", "DynamoDB"],
  },
  {
    group: "DevOps & Cloud",
    items: ["Docker", "Kubernetes", "AWS Lambda", "Linux"],
  },
  {
    group: "Tools & Workflow",
    items: ["Git", "GitLab", "Jira"],
  },
];
