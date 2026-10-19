import { z } from "zod";

/**
 * Content schemas. Every file in src/content is validated against these when the site
 * builds, so a typo or missing field fails the build instead of shipping a broken page.
 */

/** "2025" or "2025-02". */
const yearMonth = z
  .string()
  .regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/, 'Use "YYYY" or "YYYY-MM", e.g. "2025-02"');

/** start/end pair where `end: null` means "Present". */
const dateRange = {
  start: yearMonth,
  end: yearMonth.nullable(),
};

const endNotBeforeStart = (value: { start: string; end: string | null }) =>
  value.end === null || value.end >= value.start;

const bullets = z.array(z.string().min(1));

export const profileSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  /** One or two sentences under the name in the hero. Hidden when empty. */
  intro: z.string().min(1).optional(),
  /** Paragraphs for the About section. The section is hidden when empty. */
  about: bullets.optional(),
  email: z.email(),
  location: z.string().min(1).optional(),
  /** Path to the resume PDF in /public, e.g. "/resume/usan-sakhakarmi.pdf". */
  resume: z.string().startsWith("/").optional(),
  /** Role pills under the name in the hero. */
  roles: z.array(z.string().min(1)).default([]),
  /** Hidden everywhere when omitted, so the site never claims availability by accident. */
  availability: z
    .object({
      /** e.g. "Open to freelance". */
      status: z.string().min(1),
      /** Short text for the round hero badge, e.g. "Open to work". */
      badge: z.string().min(1).optional(),
    })
    .optional(),
  interests: z.array(z.string().min(1)).default([]),
  /** Scheduling link (Cal.com, Calendly…). The "Book a call" button is hidden without it. */
  bookingUrl: z.url().optional(),
  /** Hero numbers, written by hand. When omitted, they are counted from the content files. */
  stats: z.array(z.object({ value: z.string().min(1), label: z.string().min(1) })).optional(),
  /** "What I'm doing now" list in the hero. */
  now: z.array(z.object({ title: z.string().min(1), detail: z.string().min(1) })).default([]),
});

export const socialSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  url: z.url(),
});

/** One title held at a company. Several roles at one company = promotions. */
export const roleSchema = z
  .object({
    title: z.string().min(1),
    ...dateRange,
    /** Ordered by importance; the home page shows the first few, the resume shows all. */
    highlights: bullets.min(1),
    /** Skills tied to this role, shown as chips on promotion cards. */
    skills: z.array(z.string().min(1)).default([]),
  })
  .refine(endNotBeforeStart, { message: "end is before start", path: ["end"] });

export const experienceSchema = z
  .object({
    company: z.string().min(1),
    companyUrl: z.url().optional(),
    /** Company logo in /public. "wordmark" logos (wide text marks) get a wider white tile. */
    logo: z
      .object({
        src: z.string().startsWith("/"),
        shape: z.enum(["square", "wordmark"]).default("square"),
      })
      .optional(),
    /** Shown beside the company and under the year, e.g. "Full-time". */
    type: z.enum(["Full-time", "Part-time", "Contract", "Freelance", "Internship"]).optional(),
    workMode: z.enum(["On-site", "Remote", "Hybrid"]).optional(),
    location: z.string().min(1).optional(),
    /** Newest first is not required; roles are sorted by start date. */
    roles: z.array(roleSchema).min(1),
    tech: z.array(z.string().min(1)).default([]),
  })
  .transform((job) => {
    const roles = [...job.roles].sort((a, b) => b.start.localeCompare(a.start));
    const starts = roles.map((role) => role.start).sort();
    const ends = roles.map((role) => role.end);
    return {
      ...job,
      roles,
      /** First day at the company. */
      start: starts[0] ?? "",
      /** Last day at the company; null while any role is current. */
      end: ends.includes(null) ? null : ([...(ends as string[])].sort().at(-1) ?? null),
    };
  });

export const educationSchema = z
  .object({
    /** Small label on the card, e.g. "Degree", "Certification". */
    level: z.enum(["Degree", "Higher Secondary", "Secondary", "Certification", "Course"]),
    institution: z.string().min(1),
    qualification: z.string().min(1),
    /** Institution logo in /public, e.g. "/education/khwopa.png". */
    logo: z.string().startsWith("/").optional(),
    ...dateRange,
    details: bullets,
  })
  .refine(endNotBeforeStart, { message: "end is before start", path: ["end"] });

export const projectCategories = ["professional", "freelance", "personal", "open-source"] as const;

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and dashes"),
  title: z.string().min(1),
  category: z.enum(projectCategories),
  /** Employer or client the work was done for. */
  company: z.string().min(1).optional(),
  /** Small label above the title, e.g. "QA · Automation". Falls back to the category. */
  label: z.string().min(1).optional(),
  summary: z.string().min(1).optional(),
  highlights: bullets.min(1),
  tech: z.array(z.string().min(1)),
  links: z.object({ live: z.url().optional(), repo: z.url().optional() }).optional(),
});

/** A core strength with a self-rated level, shown as a bar. */
export const strengthSchema = z.object({
  name: z.string().min(1),
  level: z.number().int().min(0).max(100),
});

export const skillGroupSchema = z.object({
  group: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
});

export type Profile = z.infer<typeof profileSchema>;
/** What src/content/profile.ts provides; fields with defaults may be left out. */
export type ProfileInput = z.input<typeof profileSchema>;
export type Social = z.infer<typeof socialSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type ExperienceRole = Experience["roles"][number];
/** What src/content/experience.ts provides. */
export type ExperienceInput = z.input<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Project = z.infer<typeof projectSchema>;
export type ProjectCategory = Project["category"];
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type Strength = z.infer<typeof strengthSchema>;
