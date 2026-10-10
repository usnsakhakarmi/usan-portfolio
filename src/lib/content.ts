import { z } from "zod";
import { profile as profileData } from "@/content/profile";
import { socials as socialsData } from "@/content/socials";
import { experience as experienceData } from "@/content/experience";
import { education as educationData } from "@/content/education";
import { projects as projectsData } from "@/content/projects";
import { skills as skillsData, strengths as strengthsData } from "@/content/skills";
import {
  educationSchema,
  experienceSchema,
  profileSchema,
  projectSchema,
  skillGroupSchema,
  socialSchema,
  strengthSchema,
} from "./schema";

/**
 * The only module that reads src/content. Components get content through these
 * helpers, so validation, sorting and filtering live in one place.
 */

const byStartDesc = (a: { start: string }, b: { start: string }) => b.start.localeCompare(a.start);

const profile = profileSchema.parse(profileData);
const socials = z.array(socialSchema).parse(socialsData);
const experience = z.array(experienceSchema).parse(experienceData).sort(byStartDesc);
const education = z.array(educationSchema).parse(educationData).sort(byStartDesc);
const projects = z
  .array(projectSchema)
  .refine((list) => new Set(list.map((p) => p.slug)).size === list.length, "Duplicate project slug")
  .parse(projectsData);
const skills = z.array(skillGroupSchema).parse(skillsData);
const strengths = z.array(strengthSchema).parse(strengthsData);

export const getProfile = () => profile;
export const getSocials = () => socials;
export const getExperience = () => experience;
export const getEducation = () => education;
export const getProjects = () => projects;
export const getSkills = () => skills;
export const getStrengths = () => strengths;

/**
 * Home-page sections in display order. A section is shown only when it has content, and
 * its number ("01 /") and nav link follow from that, so nothing is ever left empty.
 */
const homeSections = [
  // The hero doubles as section 01.
  { id: "profile", title: "Profile", navLabel: "Profile", hasContent: true },
  {
    id: "experience",
    title: "Experience",
    subtitle: "where I've been breaking & building things",
    navLabel: "Experience",
    hasContent: experience.length > 0,
  },
  {
    id: "education",
    title: "Education",
    subtitle: "degrees, schooling & always-learning",
    navLabel: "Education",
    hasContent: education.length > 0,
  },
  {
    id: "skills",
    title: "Skills & Tech Stack",
    subtitle: "core strengths + the tools I use every day",
    navLabel: "Skills",
    hasContent: skills.length > 0 || strengths.length > 0,
  },
  {
    id: "work",
    title: "Projects",
    subtitle: "things I've shipped — and tested to death",
    navLabel: "Projects",
    hasContent: projects.length > 0,
  },
  // Reached through the "Hire me" button rather than the numbered nav.
  { id: "contact", title: "Contact", hasContent: true },
] as const;

export type HomeSectionId = (typeof homeSections)[number]["id"];

export type HomeSection = {
  id: HomeSectionId;
  title: string;
  subtitle?: string;
  index: number;
};

export function getHomeSections(): HomeSection[] {
  return homeSections
    .filter((section) => section.hasContent)
    .map((section, i) => ({
      id: section.id,
      title: section.title,
      subtitle: "subtitle" in section ? section.subtitle : undefined,
      index: i + 1,
    }));
}

export type NavItem = { label: string; href: string; index: number };

/** Nav numbers match the section numbers ("02 Experience" ↔ "02 /"). */
export function getNavItems(): NavItem[] {
  return homeSections
    .filter((section) => section.hasContent)
    .map((section, i) => ({ section, index: i + 1 }))
    .filter(({ section }) => "navLabel" in section)
    .map(({ section, index }) => ({
      label: "navLabel" in section ? section.navLabel : section.title,
      href: `/#${section.id}`,
      index,
    }));
}

export type Stat = { value: string; label: string };

/**
 * Hero numbers. profile.stats wins when set; otherwise they are counted from the content
 * files, and a stat is left out when there is nothing to count.
 */
export function getHeroStats(): Stat[] {
  if (profile.stats) return profile.stats;

  const companies = new Set(experience.map((job) => job.company)).size;
  const firstYear = experience.map((job) => job.start.slice(0, 4)).sort()[0];

  return [
    companies > 0 && { value: String(companies), label: companies === 1 ? "Company" : "Companies" },
    projects.length > 0 && {
      value: String(projects.length),
      label: projects.length === 1 ? "Project" : "Projects",
    },
    firstYear && { value: firstYear, label: "In QA since" },
  ].filter((stat): stat is Stat => Boolean(stat));
}
