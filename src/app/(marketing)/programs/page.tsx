"use client";

import Link from "next/link";

// Mock program data
const MOCK_PROGRAMS = [
  {
    slug: "web-dev-101",
    title: "Web Development Bootcamp",
    description: "Master modern web development with Next.js, React, and TypeScript.",
    startDate: "2026-03-01",
    endDate: "2026-06-01",
    price: 999,
    weeks: 12,
    lessons: 48,
    image: "📚",
    category: "Development",
  },
  {
    slug: "product-design",
    title: "Product Design Masterclass",
    description: "Learn user-centered design principles and create beautiful digital products.",
    startDate: "2026-03-15",
    endDate: "2026-06-15",
    price: 799,
    weeks: 12,
    lessons: 36,
    image: "🎨",
    category: "Design",
  },
  {
    slug: "data-science-101",
    title: "Data Science Fundamentals",
    description: "Python, machine learning, and data visualization from scratch.",
    startDate: "2026-04-01",
    endDate: "2026-07-01",
    price: 1299,
    weeks: 16,
    lessons: 64,
    image: "📊",
    category: "Data",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing Strategy",
    description: "Master SEO, content marketing, and analytics for digital growth.",
    startDate: "2026-03-08",
    endDate: "2026-05-08",
    price: 699,
    weeks: 8,
    lessons: 32,
    image: "📱",
    category: "Marketing",
  },
  {
    slug: "product-management",
    title: "Product Management 101",
    description: "Learn to build, launch, and scale products that users love.",
    startDate: "2026-04-15",
    endDate: "2026-07-15",
    price: 899,
    weeks: 12,
    lessons: 40,
    image: "🚀",
    category: "Product",
  },
  {
    slug: "cloud-dev",
    title: "Cloud Development with AWS",
    description: "Deploy scalable applications using AWS and cloud best practices.",
    startDate: "2026-05-01",
    endDate: "2026-08-01",
    price: 1199,
    weeks: 12,
    lessons: 48,
    image: "☁️",
    category: "Development",
  },
];

export default function ProgramsPage() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-foreground text-balance">
            Our Programs
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Choose from our selection of cohort-based programs designed to accelerate your career.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 flex flex-wrap gap-3">
          {["All", "Development", "Design", "Data", "Marketing", "Product"].map(
            (category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  category === "All"
                    ? "bg-primary text-white"
                    : "bg-muted-background text-foreground hover:bg-border"
                }`}
              >
                {category}
              </button>
            )
          )}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PROGRAMS.map((program) => (
            <Link
              key={program.slug}
              href={`/programs/${program.slug}`}
              className="group"
            >
              <div className="h-full rounded-xl border border-border bg-background p-6 hover:border-primary hover:shadow-lg transition-all">
                {/* Icon */}
                <div className="text-5xl mb-4">{program.image}</div>

                {/* Category badge */}
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold">
                    {program.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {program.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {program.description}
                </p>

                {/* Meta info */}
                <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Duration</span>
                    <span className="font-semibold text-foreground">
                      {program.weeks} weeks
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Lessons</span>
                    <span className="font-semibold text-foreground">
                      {program.lessons}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-2xl font-bold text-primary">
                    ${program.price}
                  </div>
                  <button className="rounded-lg bg-primary text-white px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors">
                    Learn More →
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
