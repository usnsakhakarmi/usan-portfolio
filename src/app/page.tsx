import { getHomeSections, type HomeSection, type HomeSectionId } from "@/lib/content";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { EducationSection } from "@/components/sections/education-section";
import { ContactSection } from "@/components/sections/contact-section";

const sectionComponents: Record<
  HomeSectionId,
  (props: Omit<HomeSection, "id">) => React.ReactNode
> = {
  profile: HeroSection,
  experience: ExperienceSection,
  education: EducationSection,
  skills: SkillsSection,
  work: ProjectsSection,
  contact: ContactSection,
};

// Order and visibility come from getHomeSections(); sections without content are skipped.
export default function HomePage() {
  return getHomeSections().map(({ id, ...section }) => {
    const SectionComponent = sectionComponents[id];
    return <SectionComponent key={id} {...section} />;
  });
}
