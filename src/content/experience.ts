import type { ExperienceInput } from "@/lib/schema";

// One entry per company. Several roles at one company show as a promotion.
// Order does not matter; the site sorts companies and roles by start date.
export const experience: ExperienceInput[] = [
  {
    company: "Niural AI",
    type: "Full-time",
    roles: [
      {
        title: "Software QA Engineer",
        start: "2026-07",
        end: null,
        highlights: [
          "Functional, API, integration, regression and E2E testing of fintech and payroll platform workflows.",
          "Developed UI automation using Playwright with the Page Object Model (POM).",
          "Built API testing and CI-oriented test flows using Postman and Locust.",
          "Tested QuickBooks, Slack, BambooHR and Xero integrations, including OAuth, token expiry, synchronization and data mapping.",
          "Performed RBAC, authorization and security-focused API testing.",
          "Database validation using PostgreSQL, Aurora, DynamoDB, DBeaver and psql.",
          "Tested AWS event-driven workflows involving Lambda, DynamoDB Streams and PostgreSQL.",
          "Learning and implementing AI agents for software testing, including AI-assisted test generation, UI interaction and automated test execution.",
        ],
      },
    ],
    tech: [
      "Playwright",
      "Postman",
      "Locust",
      "PostgreSQL",
      "Aurora",
      "DynamoDB",
      "AWS Lambda",
      "DBeaver",
    ],
  },
  {
    company: "Vairav Tech",
    type: "Full-time",
    workMode: "On-site",
    location: "Baluwatar, Kathmandu",
    roles: [
      {
        title: "Software Quality Assurance Engineer",
        start: "2026-04",
        end: null,
        highlights: [
          "Took ownership of critical QA tasks and supported the team during high-priority releases and production issues.",
        ],
        skills: ["Team Leadership", "Mentoring"],
      },
      {
        title: "Associate Software Quality Assurance Engineer",
        start: "2025-02",
        end: "2026-04",
        highlights: [
          "Tested cybersecurity and analytics products — functional, API, database and end-to-end testing.",
          "Validated anomaly detection and rule-based alert generation for detection accuracy.",
          "Worked on five major projects: UEBA, Agentless, Correlation Engine, Node Configuration and Report Engine.",
          "Tested ML-trained models, anomaly detection patterns, and rule-based / Sigma rule detections.",
          "API testing (Postman), database testing (PostgreSQL, MySQL, MSSQL, Oracle, MongoDB) and automation with Playwright.",
          "Performance and load testing with k6, monitoring Kubernetes logs for error detection.",
          "Validated backend–core coordination with Kafka, Centrifugo and Redis.",
          "Tested privilege roles, node configurations (Docker, k0s, Cilium) and certificate-based authentication.",
          "Verified report generation workflows, ensuring accurate PDF/Excel anomaly reports with visualizations and webhook integrations.",
        ],
        skills: ["Postman API", "Test Assurance"],
      },
    ],
    tech: ["Postman", "Playwright", "k6", "Kubernetes", "Kafka", "Redis", "PostgreSQL", "MongoDB"],
  },
  {
    company: "Proshore Nepal",
    type: "Internship",
    roles: [
      {
        title: "Software QA Intern",
        start: "2024-11",
        end: "2025-02",
        highlights: [
          "Wrote test scenarios and test cases from requirements, and executed them to find and document defects.",
          "Worked with development teams to understand requirements, resolve defects and ensure product quality.",
          "Load testing with Apache JMeter, with HTML reports.",
          "API testing with Postman.",
          "Wrote automation scripts with Playwright and Cypress for web applications.",
        ],
      },
    ],
    tech: ["JMeter", "Postman", "Playwright", "Cypress"],
  },
];
