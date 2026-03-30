'use client';
import AchievedBadges from './components/achieved-badges';
import type { AchievementBadgeCardProps } from './components/achievement-badge-card';
import AchievedCertificates from './components/achieved-certificates';
import type { CertificateCardProps } from './components/certificates';
import PersonalInfo, { type PersonalInfoProps } from './components/personal-info';

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

   const achievedBadges: AchievementBadgeCardProps[] = [
      {
         title: 'Skill Mastery',
         description:
            'For achieving high scores in assessments and demonstrating strong understanding.',
         unlockedOn: 'Unlocked on Jan 25, 2026',
      },
      {
         title: 'Skill Mastery',
         description:
            'For achieving high scores in assessments and demonstrating strong understanding.',
         unlockedOn: 'Unlocked on Jan 25, 2026',
      },
      {
         title: 'Skill Mastery',
         description:
            'For achieving high scores in assessments and demonstrating strong understanding.',
         unlockedOn: 'Unlocked on Jan 25, 2026',
      },
      {
         title: 'Skill Mastery',
         description:
            'For achieving high scores in assessments and demonstrating strong understanding.',
         unlockedOn: 'Unlocked on Jan 25, 2026',
      },
      {
         title: 'Skill Mastery',
         description:
            'For achieving high scores in assessments and demonstrating strong understanding.',
         unlockedOn: 'Unlocked on Jan 25, 2026',
      },
   ];

   const achievedCertificates: CertificateCardProps[] = [
      {
         title: 'Product Design (UI/UX)',
         reception_date: '2nd August, 2025',
         posterSrc:
            'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340414/repo-images/public/assets/certificate_adjusted.jpg',
      },
      {
         title: 'Product Design (UI/UX)',
         reception_date: '2nd August, 2025',
         posterSrc:
            'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340414/repo-images/public/assets/certificate_adjusted.jpg',
      },
   ];

   return (
      <section className="pt-10 px-8 w-full">
         <div className=" grid grid-cols-1 gap-y-10 ">
            <PersonalInfo {...personalInfo} />

            <AchievedBadges badges={achievedBadges} />

            <AchievedCertificates certificates={achievedCertificates} />
         </div>
      </section>
   );
};

export default Page;
