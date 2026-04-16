'use client';

import AchievedBadges from '@/features/profile/components/achieved-badges';
import AchievedCertificates from '@/features/profile/components/achieved-certificates';
import PersonalInfo from '@/features/profile/components/personal-info';
import { useHeaderTitleStore } from '@/stores';
import { useEffect } from 'react';
import { personalInfo, allAchievedBadges, allAchievedCertificates } from './mock';

const Page = () => {


   const sortedAchievedBadges = [...allAchievedBadges].sort((a, b) => {
      const left = a.earnedAt ? new Date(a.earnedAt).getTime() : 0;
      const right = b.earnedAt ? new Date(b.earnedAt).getTime() : 0;

      return right - left;
   });

   const latestBadgePreview = sortedAchievedBadges.slice(0, 5);



   const sortedAchievedCertificates = [...allAchievedCertificates].sort(
      (a, b) => {
         const left = a.receivedAt ? new Date(a.receivedAt).getTime() : 0;
         const right = b.receivedAt ? new Date(b.receivedAt).getTime() : 0;

         return right - left;
      }
   );

   const latestCertificatePreview = sortedAchievedCertificates.slice(0, 5);

   const {setHeaderTitle} = useHeaderTitleStore()

   useEffect(
      ()=>{
         setHeaderTitle('My Profile')
      }, [setHeaderTitle]
   )

   return (
      <section className="w-full px-4 pb-12 pt-10 sm:px-6 lg:px-8">
         <div className="grid grid-cols-1 gap-y-10 lg:gap-y-12">
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
         </div>
      </section>
   );
};

export default Page;
