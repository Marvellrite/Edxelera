import React from 'react';
import { Flame, Sparkles } from 'lucide-react';

const streakData = [
   { day: 'S', active: true },
   { day: 'M', active: false },
   { day: 'T', active: true },
   { day: 'W', active: true },
   { day: 'T', active: false, current: true },
   { day: 'F', active: false },
   { day: 'S', active: false },
];

const StreakDisplay = () => {
   return (
      <div className="rounded-3xl border border-[var(--border-subtle)] bg-[linear-gradient(145deg,var(--streak-surface),var(--surface-elevated-2))] p-5 shadow-[var(--shadow-card)] ring-1 ring-inset ring-white/15 transition-all duration-200 hover:shadow-[var(--shadow-elevated)]">
         <div className="mb-5 flex items-center justify-between gap-4">
            <div>
               <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-momentum)]">Weekly streak</p>
               <h2 className="text-xl font-semibold text-[var(--text-strong)]">You&apos;re on fire</h2>
            </div>
            <div className="inline-flex items-center gap-1 rounded-full border border-[color-mix(in_srgb,var(--accent-momentum)_35%,transparent)] bg-[var(--accent-momentum-soft)] px-3 py-1 text-xs font-medium text-[var(--accent-momentum)]">
               <Sparkles className="size-3.5" /> +12% this week
            </div>
         </div>

         <div className="rounded-2xl border border-[var(--border-soft)] bg-[linear-gradient(180deg,var(--surface-overlay),var(--surface-raised))] p-4">
            <div className="mb-5 flex items-center gap-2.5">
               <div className="rounded-xl bg-[var(--accent-momentum-soft)] p-2 text-[var(--accent-momentum)]">
                  <Flame className="size-5" />
               </div>
               <div>
                  <p className="text-2xl font-semibold text-[var(--text-strong)]">2 days</p>
                  <p className="text-xs text-[var(--text-muted)]">Keep learning today to extend your streak.</p>
               </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
               {streakData.map((item) => (
                  <div key={item.day + String(item.current)} className="space-y-2 text-center">
                     <p className="text-xs font-medium text-[var(--text-soft)]">{item.day}</p>
                     <div
                        className={`mx-auto h-9 w-9 rounded-xl border text-xs font-semibold ${
                           item.active
                              ? 'border-transparent bg-[var(--streak-fg-active)] text-[var(--streak-active-marker)] shadow-[var(--shadow-soft)]'
                              : item.current
                                ? 'border-[var(--secondary-400)] bg-[var(--surface-tint-red)] text-[var(--secondary-700)]'
                                : 'border-[var(--border-soft)] bg-[var(--surface-subtle)] text-[var(--text-soft)]'
                        } flex items-center justify-center`}
                     >
                        {item.active ? '✓' : item.current ? '•' : ''}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default StreakDisplay;
