'use client';

import AchievedBadges from '@/features/my-profile/components/achieved-badges';
import type { AchievementBadgeCardProps } from '@/features/my-profile/types/achievements';
import AchievedCertificates from '@/features/my-profile/components/achieved-certificates';
import type { CertificateCardProps } from '@/features/my-profile/types/achievements';
import type { PersonalInfoProps } from '@/features/my-profile/types/profile';
import PersonalInfo from '@/features/my-profile/components/personal-info';
import { useHeaderTitleStore } from '@/stores';
import { useEffect } from 'react';

const Page = () => {
   const personalInfo: PersonalInfoProps = {
      name: 'Nkechi Johnson',
      email: 'nkechij112@gmail.com',
      dateOfBirth: '24-08-2003',
      location: 'New Guildham, Port Holland',
      dateJoined: '03-07-2025',
      bio: 'I bring a solution-first Design Philosophy - I do not just create beautiful screens. I prioritize solving friction points, streamlining interactions, and crafting intuitive flows across various industries of life, thus leveraging my versatile industry experience.',
      links: [
         { label: 'Website', value: 'newguildham.com', href: 'https://newguildham.com' },
         { label: 'Facebook', value: 'facebook.com/newguildham', href: 'https://facebook.com/newguildham' },
         { label: 'X', value: 'x.com/newguildham', href: 'https://x.com/newguildham' },
         { label: 'LinkedIn', value: 'linkedin.com/in/newguildham', href: 'https://linkedin.com/in/newguildham' },
         { label: 'Instagram', value: 'instagram.com/newguildham', href: 'https://instagram.com/newguildham' },
      ],
   };

   const allAchievedBadges: AchievementBadgeCardProps[] = [
      {
         id: 'badge-skill-mastery-2026-01-25',
         title: 'Skill Mastery',
         description: 'For achieving high scores in assessments and demonstrating strong understanding.',
         unlockedOn: 'Unlocked on Jan 25, 2026',
         earnedAt: '2026-01-25',
      },
      {
         id: 'badge-creative-streak-2026-01-17',
         title: 'Creative Streak',
         description: 'For showing up consistently and completing design exercises across multiple sessions.',
         unlockedOn: 'Unlocked on Jan 17, 2026',
         earnedAt: '2026-01-17',
      },
      {
         id: 'badge-collaboration-star-2026-01-10',
         title: 'Collaboration Star',
         description: 'Awarded for active participation in peer reviews and constructive team feedback.',
         unlockedOn: 'Unlocked on Jan 10, 2026',
         earnedAt: '2026-01-10',
      },
      {
         id: 'badge-problem-solver-2025-12-28',
         title: 'Problem Solver',
         description: 'For tackling challenging assignments and submitting thoughtful, well-structured solutions.',
         unlockedOn: 'Unlocked on Dec 28, 2025',
         earnedAt: '2025-12-28',
      },
      {
         id: 'badge-course-finisher-2025-12-03',
         title: 'Course Finisher',
         description: 'For completing a full learning track and finishing all required milestone lessons.',
         unlockedOn: 'Unlocked on Dec 03, 2025',
         earnedAt: '2025-12-03',
      },
      {
         id: 'badge-community-voice-2025-11-18',
         title: 'Community Voice',
         description: 'Recognized for helping others in the learning community and sharing useful feedback.',
         unlockedOn: 'Unlocked on Nov 18, 2025',
         earnedAt: '2025-11-18',
      },
      {
         id: 'badge-rising-talent-2025-10-29',
         title: 'Rising Talent',
         description: 'Given for strong early momentum and a standout first month of learning progress.',
         unlockedOn: 'Unlocked on Oct 29, 2025',
         earnedAt: '2025-10-29',
      },
   ];

   const sortedAchievedBadges = [...allAchievedBadges].sort((a, b) => {
      const left = a.earnedAt ? new Date(a.earnedAt).getTime() : 0;
      const right = b.earnedAt ? new Date(b.earnedAt).getTime() : 0;
      return right - left;
   });

   const latestBadgePreview = sortedAchievedBadges.slice(0, 5);

   const allAchievedCertificates: CertificateCardProps[] = [
      {
         id: 'certificate-product-design-2025-08-02',
         title: 'Product Design (UI/UX)',
         reception_date: '2nd August, 2025',
         receivedAt: '2025-08-02',
         posterSrc: 'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340414/repo-images/public/assets/certificate_adjusted.jpg',
      },
      {
         id: 'certificate-user-research-2025-07-18',
         title: 'User Research Fundamentals',
         reception_date: '18th July, 2025',
         receivedAt: '2025-07-18',
         posterSrc: 'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340414/repo-images/public/assets/certificate_adjusted.jpg',
      },
      {
         id: 'certificate-design-systems-2025-06-30',
         title: 'Design Systems Essentials',
         reception_date: '30th June, 2025',
         receivedAt: '2025-06-30',
         posterSrc: 'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340414/repo-images/public/assets/certificate_adjusted.jpg',
      },
      {
         id: 'certificate-ux-writing-2025-05-11',
         title: 'UX Writing Basics',
         reception_date: '11th May, 2025',
         receivedAt: '2025-05-11',
         posterSrc: 'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340414/repo-images/public/assets/certificate_adjusted.jpg',
      },
   ];

   const sortedAchievedCertificates = [...allAchievedCertificates].sort((a, b) => {
      const left = a.receivedAt ? new Date(a.receivedAt).getTime() : 0;
      const right = b.receivedAt ? new Date(b.receivedAt).getTime() : 0;
      return right - left;
   });

   const latestCertificatePreview = sortedAchievedCertificates.slice(0, 5);

   const { setHeaderTitle } = useHeaderTitleStore();

   useEffect(() => {
      setHeaderTitle('My Profile');
   }, [setHeaderTitle]);

   return (
      <section className="w-full space-y-6 px-4 pb-12 pt-10 sm:px-6 lg:space-y-8 lg:px-8">
         <PersonalInfo {...personalInfo} />
         <AchievedBadges
            badges={latestBadgePreview}
            totalCount={allAchievedBadges.length}
            previewLimit={5}
            seeAllHref="/home/my-profile/achievements"
            variant="preview"
         />
         <AchievedCertificates
            certificates={latestCertificatePreview}
            totalCount={allAchievedCertificates.length}
            previewLimit={5}
            seeAllHref="/home/my-profile/certificates"
            variant="preview"
         />
      </section>
   );
};

export default Page;
