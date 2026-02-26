'use client';

import Link from 'next/link';
import { BookOpen, Flame, Award, ArrowRight, Clock } from 'lucide-react';

const mockDashboard = {
  user: { name: 'Alex', greeting: 'Good morning' },
  activeCohort: {
    title: 'Web Development Bootcamp',
    instructor: 'Sarah Chen',
    week: 6,
    totalWeeks: 12,
    progress: 45,
    nextDeadline: '2026-03-15',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop',
  },
  programs: [
    {
      slug: 'web-dev-101',
      title: 'Web Development Bootcamp',
      progress: 45,
      status: 'Active',
      color: '#2f4fff',
    },
    {
      slug: 'product-design',
      title: 'Product Design Masterclass',
      progress: 25,
      status: 'Active',
      color: '#0ea5e9',
    },
  ],
  stats: [
    { label: 'Lessons', value: '24' },
    { label: 'Streak', value: '8d', icon: Flame },
    { label: 'Certificates', value: '0', icon: Award },
  ],
  upcomingDeadlines: [
    { title: 'Assignment: Todo App', date: 'Mar 15' },
    { title: 'Live Critique', date: 'Mar 18' },
    { title: 'Module Quiz', date: 'Mar 20' },
  ],
};

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Welcome + Cohort Chip */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl lg:text-5xl font-[900] text-foreground text-balance">
            {mockDashboard.user.greeting},
            <br />
            <span className="text-gradient-primary">{mockDashboard.user.name}</span>
          </h1>
        </div>
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-[600] text-sm"
          style={{
            backgroundColor: 'var(--color-brand-primary-50)',
            color: 'var(--color-brand-primary-600)',
            border: '1px solid var(--color-brand-primary-100)',
          }}
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-success-500)' }} />
          Active Cohort
        </div>
      </div>

      {/* Continue Learning Hero Card */}
      <div
        className="relative rounded-[--radius-xl] overflow-hidden card-glow p-6"
        style={{
          backgroundColor: 'var(--color-card)',
          border: '1px solid var(--color-card-border)',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6 items-center">
          {/* Left: Info */}
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-[600] text-muted-foreground">Continue Learning</h2>
              <h3 className="text-2xl font-[800] text-foreground mt-1">
                {mockDashboard.activeCohort.title}
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wide font-[700]">
                  Week {mockDashboard.activeCohort.week} of {mockDashboard.activeCohort.totalWeeks}
                </p>
                {/* Progress bar */}
                <div
                  className="mt-2 h-1.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: 'var(--color-surface)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${mockDashboard.activeCohort.progress}%`,
                      background: 'var(--gradient-primary)',
                    }}
                  />
                </div>
              </div>
            </div>

            <Link
              href={`/app/programs/${mockDashboard.activeCohort.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-primary-600 text-white font-[600] transition-all duration-200 hover:shadow-lg hover:shadow-brand-primary-500/40"
            >
              Continue Lesson
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right: Thumbnail */}
          <div className="hidden md:block rounded-lg overflow-hidden aspect-video">
            <img
              src={mockDashboard.activeCohort.thumbnail}
              alt={mockDashboard.activeCohort.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* My Programs */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-[800] text-foreground">My Programs</h2>
          <Link href="/app/programs" className="text-sm font-[700] text-brand-primary-600 hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockDashboard.programs.map((prog) => (
            <Link
              key={prog.slug}
              href={`/app/programs/${prog.slug}`}
              className="rounded-[--radius-lg] border overflow-hidden card-hover"
              style={{
                backgroundColor: 'var(--color-card)',
                borderColor: 'var(--color-card-border)',
              }}
            >
              <div className="aspect-video bg-gradient-to-br from-brand-primary-200 to-brand-primary-100 flex items-center justify-center relative">
                <div
                  className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-[700]"
                  style={{
                    backgroundColor: 'var(--color-success-50)',
                    color: 'var(--color-success-500)',
                  }}
                >
                  {prog.status}
                </div>
              </div>
              <div className="p-4 space-y-3">
                <h3 className="font-[700] text-foreground line-clamp-2">{prog.title}</h3>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-[600]">Progress</span>
                    <span className="font-[700]" style={{ color: prog.color }}>
                      {prog.progress}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: 'var(--color-surface)' }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${prog.progress}%`,
                        backgroundColor: prog.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {mockDashboard.stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-[--radius-lg] border p-4"
              style={{
                backgroundColor: 'var(--color-card)',
                borderColor: 'var(--color-card-border)',
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-[600] uppercase tracking-wide">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-[800] text-foreground mt-1">{stat.value}</p>
                </div>
                {Icon && (
                  <Icon
                    size={24}
                    style={{
                      color: stat.label === 'Streak' ? '#f59e0b' : 'var(--color-brand-primary-500)',
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming Deadlines Sidebar */}
      <div
        className="rounded-[--radius-lg] border p-6"
        style={{
          backgroundColor: 'var(--color-card)',
          borderColor: 'var(--color-card-border)',
        }}
      >
        <h3 className="font-[800] text-foreground mb-4">Upcoming Deadlines</h3>
        <div className="space-y-3">
          {mockDashboard.upcomingDeadlines.map((deadline, idx) => (
            <div key={idx} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
              <Clock size={16} style={{ color: 'var(--color-brand-secondary-500)', marginTop: '2px' }} className="shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-[600] text-foreground truncate">{deadline.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{deadline.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
