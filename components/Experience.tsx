import React from "react";

export interface ExperienceItem {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location?: string;
  description: string;
  highlights?: string[];
  skills?: string[];
}

const defaultExperiences: ExperienceItem[] = [
  {
    role: "Information Security Intern",
    company: "Greenwich Merchant Bank",
    period: "Internship",
    location: "Lagos, Nigeria",
    description:
      "Worked within the Information Security (InfoSec) unit to protect banking systems, evaluate vulnerabilities, and ensure compliance across enterprise financial infrastructure.",
    highlights: [
    ],
    skills: [
      "Information Security",
    ],
  },
];

export function Experience({
  items = defaultExperiences,
}: {
  items?: ExperienceItem[];
}) {
  return (
    <section className="space-y-6 pt-2">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
            Career
          </p>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-200">
            Experience
          </h2>
        </div>
        <span className="font-mono text-xs text-neutral-500">
          {items.length} {items.length === 1 ? "Role" : "Roles"}
        </span>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="group relative rounded-2xl border border-neutral-800 bg-neutral-950/60 p-6 backdrop-blur-sm transition-all duration-200 hover:border-neutral-700"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-neutral-100 transition-colors">
                  {item.role}
                </h3>
                <div className="flex flex-wrap items-center gap-2 pt-0.5 text-sm text-neutral-400">
                  <span className="font-medium text-neutral-300">
                    {item.company}
                  </span>
                  {item.location && (
                    <>
                      <span className="text-neutral-600">·</span>
                      <span className="text-neutral-500">{item.location}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="shrink-0">
                <span className="inline-flex items-center rounded-full border border-neutral-800 bg-neutral-900/80 px-3 py-1 font-mono text-xs text-neutral-400">
                  {item.period}
                </span>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-neutral-400">
              {item.description}
            </p>

            {item.highlights && item.highlights.length > 0 && (
              <ul className="mt-3 space-y-2 text-sm text-neutral-400">
                {item.highlights.map((highlight, hIndex) => (
                  <li key={hIndex} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-600 group-hover:bg-neutral-400 transition-colors" />
                    <span className="leading-6">{highlight}</span>
                  </li>
                ))}
              </ul>
            )}

            {item.skills && item.skills.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2 pt-2 border-t border-neutral-800/80">
                {item.skills.map((skill, sIndex) => (
                  <span
                    key={sIndex}
                    className="rounded-md border border-neutral-800/80 bg-neutral-900/40 px-2.5 py-1 font-mono text-xs text-neutral-400 transition-colors hover:border-neutral-700 hover:text-neutral-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

