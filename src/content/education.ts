import type { Education } from "@/lib/schema";

export const education: Education[] = [
  {
    level: "Degree",
    institution: "Bhaktapur Multiple Campus",
    logo: "/education/tribhuvan-university-logo.png",
    qualification: "Bachelor of Computer Application (BCA)",
    start: "2022",
    end: "2026",
    details: ["Software development, software testing, databases and related technologies."],
  },
  {
    level: "Higher Secondary",
    institution: "Khwopa Higher Secondary School",
    logo: "/education/khwopa.png",
    qualification: "+2 Science",
    start: "2019",
    end: "2021",
    details: ["GPA 3.23 in the +2 level examination."],
  },
  {
    level: "Secondary",
    institution: "Bright Star English School, Bhaktapur",
    logo: "/education/bright-star.png",
    qualification: "Secondary Education Examination (SEE)",
    start: "2008-09",
    end: "2019-03",
    details: ["Foundation in mathematics, science, English and computer studies."],
  },
];
