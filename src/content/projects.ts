import type { Project } from "@/lib/schema";

// Listed in display order.
export const projects: Project[] = [
  {
    slug: "ueba",
    title: "UEBA (User and Entity Behavior Analytics)",
    category: "professional",
    company: "Vairav Tech",
    label: "QA · Security analytics",
    summary:
      "Testing ML-driven anomaly detection and real-time core–backend coordination over Kafka and Centrifugo.",
    highlights: [
      "Tested ML-trained models, including the training process, and validated anomaly detection patterns using visualizations and raw data.",
      "Generated reports of model behavior to analyze detection accuracy and system reliability.",
      "Tested real-time coordination between core and backend over Kafka and Centrifugo.",
      "Validated backend–core resync during Kubernetes restarts and tested zombie processes in core systems.",
    ],
    tech: ["Kafka", "Centrifugo", "Postman", "Cypress", "k6", "Kubernetes"],
  },
  {
    slug: "correlation-engine",
    title: "Correlation Engine",
    category: "professional",
    company: "Vairav Tech",
    label: "QA · Detection rules",
    summary:
      "Verifying rule-based and Sigma detections, Redis synchronization and webhook alerting for accurate alert generation.",
    highlights: [
      "Verified rule-based and Sigma rule detections for alert generation.",
      "Ensured backend–core synchronization with Redis for stable data flow.",
      "Validated webhook-based notifications, including integrations with Elastic, incident response systems and notification services.",
      "Tested the accuracy and performance of rule execution pipelines.",
    ],
    tech: ["Sigma rules", "Redis", "Webhooks"],
  },
  {
    slug: "agentless",
    title: "Agentless",
    category: "professional",
    company: "Vairav Tech",
    label: "QA · Database",
    summary:
      "Multi-database ingestion and privilege-role testing across PostgreSQL, MySQL, MSSQL, Oracle and MongoDB for banking systems.",
    highlights: [
      "Database testing across PostgreSQL, MySQL, MSSQL, Oracle and MongoDB.",
      "Validated multi-database ingestion into containers for banking systems.",
      "Tested privilege roles for different users to ensure secure, restricted data access.",
    ],
    tech: ["PostgreSQL", "MySQL", "MSSQL", "Oracle", "MongoDB"],
  },
  {
    slug: "node-configuration",
    title: "Node Configuration",
    category: "professional",
    company: "Vairav Tech",
    label: "QA · Infrastructure",
    summary:
      "Testing node labels, pod health and failure troubleshooting for services deployed on Kubernetes.",
    highlights: [
      "Tested on virtual machines with defined hosts and deployed services.",
      "Configured and assigned node labels, and monitored pods to keep services running efficiently.",
      "Analyzed and troubleshot pod failures to find and resolve root causes.",
    ],
    tech: ["Kubernetes", "Docker", "Virtual machines"],
  },
  {
    slug: "vision-board",
    title: "Vision Board",
    category: "professional",
    label: "QA · Automation",
    summary:
      "End-to-end testing of project and task workflows, from assignment to dashboard and email notifications, automated in Playwright.",
    highlights: [
      "Functional testing of project creation, task assignment and workflow status updates.",
      "Validated task assignment notifications on the user dashboard and by email.",
      "API and database testing to ensure accurate task data, user mapping and status changes.",
      "Automated end-to-end scenarios with Playwright, covering task assignment and notification flows.",
    ],
    tech: ["Playwright", "API testing", "Database testing"],
  },
];
