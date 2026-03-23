'use client';

import { ReactSVG } from 'react-svg';
import Comment from '../community/comment';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import CourseModulesAccordion from './course_modules_accordion';
import { COURSE_MODULE_ITEMS_LEARNING } from '@/mockdata/course/details-mockdata';
import LmsVideoPlayer from './lms-video-player';

const CourseLearningPanel = () => {
   const isModuleLocked = false;

   return (
      <div className="max-[890px]:flex-col flex h-full gap-x-3">
         <div className="flex grow basis-[65%] flex-col gap-y-4.5">
            <div className="max-sm:border-none max-[890px]:mb-4 max-[890px]:pb-11 min-[890px]:pb-4 rounded-lg border border-border p-4">
               <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
                  <LmsVideoPlayer
                     src="/videos/video1.mp4"
                     title="Lesson Video"
                     className="h-full w-full"
                     showTopBar={false}
                  />
                  {isModuleLocked && (
                     <div className="absolute inset-0 flex items-center justify-center bg-white/65 px-4">
                        <div className="w-full max-w-[278px] rounded-2xl bg-white p-4 text-center text-[14px] font-medium">
                           <div className="mb-2 flex w-full items-center justify-center">
                              <ReactSVG
                                 src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340533/repo-images/public/icons/lock.svg"
                                 className="text-center"
                              />
                           </div>
                           <p>
                              This module is still locked and will be available
                              in 3 days, 23 hours, 40 minutes and 40 seconds
                           </p>
                        </div>
                     </div>
                  )}
               </div>
               <div className="max-[890px]:hidden flex justify-between px-2 pt-5">
                  {/* TODO: Contains the prev and next buttons */}
                  <Button
                     variant={'secondary'}
                     className=" w-30 rounded-[500px] "
                  >
                     Previous
                  </Button>
                  <Button className=" w-30 rounded-[500px]">Next</Button>
               </div>
            </div>
            <div className="max-[890px]:hidden max-sm:border-none h-full basis-full rounded-lg border border-border p-3 px-4">
               <p className=" pt-2 pb-5.5 font-normal">Course Forum</p>
               <div>
                  <Comment isChild={false} commentPath="course-forum-thread-1">
                     <Comment>
                        <Comment />
                     </Comment>
                  </Comment>

                  {/* <div className="px-4">
                     <div className="flex h-[53px] items-center gap-2 rounded-full border border-neutral-400 p-4">
                        <ReactSVG
                           src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340568/repo-images/public/icons/reply.svg"
                           beforeInjection={(svg) => {
                              const paths = svg.querySelectorAll('path');
                              paths.forEach((path) => {
                                 path.setAttribute('fill', '#939393');
                              });
                           }}
                        />
                        <input
                           className="h-full w-full border-none outline-none placeholder:text-neutral-400"
                           placeholder="Start a conversation"
                        />
                     </div>
                  </div> */}
               </div>

               <div className="mt-4.5">
                  <Comment isChild={false} commentPath="course-forum-thread-2">
                     <Comment />
                  </Comment>
               </div>
            </div>
         </div>
         <div className="max-md:pb-6 max-sm:border-none min-h-full basis-[35%] rounded-lg border border-neutral-100 border-t-border">
            <div className="">
               <div className="max-[890px]:hidden px-4">
                  <p className="text-[14px] text-neutral-700">Week 2 - 20%</p>
                  <Progress className="mt-1 rounded-full" value={20} />
               </div>
               <div className="mt-10">
                  <p className="mt-3 mb-3 px-4 font-normal text-primary">
                     Modules
                  </p>
                  <CourseModulesAccordion
                     className="border-0 border-neutral-400 rounded-lg px-2 max-md:border-none max-md:rounded-none md:[&>div:last-of-type]:border-b-0"
                     items={COURSE_MODULE_ITEMS_LEARNING}
                     mode="learning"
                  />
               </div>

               <div className="rounded-lg p-4">
                  <p className="my-3 font-normal text-neutral-800">
                     Additional Resources
                  </p>
                  <ul className="list-disc space-y-4 px-6">
                     <li>
                        <p>
                           <span></span>
                           <span>
                              The Design of Everyday Things - Jace Norman
                              www.book.com
                           </span>
                        </p>
                     </li>
                     <li>
                        <p>
                           <span></span>
                           <span>Another One</span>
                        </p>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CourseLearningPanel;
