import type { ProfileInput } from "@/lib/schema";

export const profile: ProfileInput = {
  name: "Usan Sakhakarmi",
  title: "QA Engineer & Freelance Full-Stack Developer",
  roles: ["QA Engineer", "Full-stack Developer", "Freelancer"],
  intro:
    "I test software like a skeptic and build it like a craftsman. By day I'm a QA Engineer making sure products ship bug-free; on the side I design and develop full-stack web apps for clients.",
  about: [
    "I'm a Software QA Engineer with hands-on experience testing cybersecurity and analytics platforms, and now fintech and payroll workflows. I focus on robust software delivery through comprehensive testing across functional validation, API testing and database verification.",
    "With a strong foundation in both manual and automated testing, I've worked on multiple critical projects, collaborating closely with development teams to catch defects early and maintain product quality. I'm always learning; right now that means exploring AI agents for software testing.",
  ],
  email: "sakhausan55@gmail.com",
  location: "Bhaktapur, Nepal",
  // resume: "/resume/usan-sakhakarmi.pdf",
  availability: { status: "Open to freelance", badge: "Open to work" },
  interests: ["clean code", "zero bugs"],
  stats: [
    { value: "3+", label: "Years exp." },
    { value: "20+", label: "Projects" },
    { value: "∞", label: "Bugs squashed" },
  ],
  now: [
    { title: "QA Engineer", detail: "Testing payroll & payments at Niural" },
    { title: "Freelance Developer", detail: "Building full-stack web apps for clients" },
    { title: "Learning", detail: "AI agents for software testing" },
  ],
};
