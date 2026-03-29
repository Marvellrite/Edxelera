'use client';
import { ReactSVG } from 'react-svg';
import Badge from '../components/my-profile/badge';
import Certificates from '../components/my-profile/certificates';
import EditProfileDialogue from './components/edit_profile_dialog';
import ProfileLinks from './components/profile-links';

const Page = () => {
   return (
      <section className="pt-10 px-8 w-full">
         <div className=" grid grid-cols-1 gap-y-10 ">
            <div className="  space-y-3 ">
               <p className=" font-normal text-md">Personal Information</p>
               <div className=" flex flex-col gap-y-5 md:flex-row items-start gap-x-3 md:items-center justify-between ">
                  <div className=" flex gap-x-4 items-center">
                     <div className=" bg-neutral-50 size-24 rounded-[100px] flex items-center justify-center">
                        <ReactSVG
                           className=" text-neutral-500"
                           src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340614/repo-images/public/icons/user.svg"
                           beforeInjection={(svg) => {
                              const paths = svg.querySelectorAll('path');
                              paths.forEach((path) => {
                                 path.setAttribute('fill', 'currentColor');
                              });
                              svg.classList.add('size-[72px]');
                           }}
                        />
                     </div>
                     <div>
                        <h1 className=" text-[32px] font-medium">
                           Nkechi Johnson
                        </h1>
                        <span className=" font-normal text-neutral-600">
                           nkechij112@gmail.com
                        </span>
                     </div>
                  </div>

                  <div>
                     <div className=" font-normal text-neutral-600">
                        Date of Birth
                     </div>
                     <div className=" font-medium text-lg">24-08-2003</div>
                  </div>

                  <div>
                     <div className=" font-normal text-neutral-600">
                        Location
                     </div>
                     <div className=" font-medium text-lg">
                        New Guildham, Port Holland
                     </div>
                  </div>

                  <div>
                     <div className=" font-normal text-neutral-600">
                        Date Joined
                     </div>
                     <div className=" font-medium text-lg">03-07-2025</div>
                  </div>
               </div>
               <div className=" space-y-0.5">
                  <span className="font-normal text-neutral-600">Bio</span>
                  <p className=" font-medium text-lg">
                     I bring a solution-first Design Philosophy - I do not just
                     create beautiful screens. I prioritize solving friction
                     points, streamlining interactions, and crafting intuitive
                     flows across various industries of life, thus leveraging my
                     versatile industry experience.
                  </p>
               </div>
               <div>
                  <EditProfileDialogue />
               </div>
            </div>

            <ProfileLinks/>

            <div className=" space-y-3 ">
               <p className="font-normal text-md">Achievements & Badges</p>

               <div className=" flex  gap-3 overflow-x-auto ">
                  <Badge />
                  <Badge />
                  <Badge />
               </div>
            </div>

            <div className=" space-y-3 ">
               <p className="font-normal text-md">Certificates</p>
               <div className=" flex  gap-3 overflow-x-auto smooth snap-proximity ">
                  <Certificates
                     title="Product Design (UI/UX)"
                     reception_date="2nd August, 2025"
                     posterSrc="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340414/repo-images/public/assets/certificate_adjusted.jpg"
                  />
                  <Certificates
                     title="Product Design (UI/UX)"
                     reception_date="2nd August, 2025"
                     posterSrc="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340414/repo-images/public/assets/certificate_adjusted.jpg"
                  />
               </div>
            </div>
         </div>
      </section>
   );
};

export default Page;
