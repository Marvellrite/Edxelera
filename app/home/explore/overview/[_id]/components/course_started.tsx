import Header from './header';
import { Button } from '@/components/ui/button';

export default function Course_started() {
   return (
      <>
         <Header>
            <h1 className="flex gap-x-5">
               <span className=" text-[40px] font-medium">
                  Product Design (UI/UX)
               </span>
            </h1>
         </Header>
         <section className="px-8 xl:px-15 py-10 max-md:px-0 max-md:py-0 max-md:-mt-5 ">
            <div className="  py-10 max-md:pt-0 pt-5  mx-auto">
               <div>
                  <div className=" flex items-center gap-x-3 mb-4">
                     <Button className=" mx-auto py-3 px-2.5 w-[81px] h-9 rounded-[500px]">
                        Learn
                     </Button>
                     <Button className=" mx-auto py-3 px-2.5 w-[81px] h-9 rounded-[500px] bg-white">
                        Details
                     </Button>
                  </div>

                  <div className=" flex gap-x-3">
                     <div className=" flex-col basis-[60%] grow">
                        <div className=" border border-border rounded-lg p-3">
                           <div>
                              {/* TODO: Inser the video here */}
                              <video src={'/videos/video1.mp4'} />
                           </div>
                           <div className=" flex justify-between py-3 px-1">
                              {/* TODO: Contains the prev and next buttons */}
                              <Button
                                 variant={'outline'}
                                 className=" mx-auto py-3 px-2.5 w-[81px] h-9 rounded-[500px]"
                              >
                                 Previous
                              </Button>
                              <Button className=" mx-auto py-3 px-2.5 w-[81px] h-9 rounded-[500px]">
                                 Next
                              </Button>
                           </div>
                        </div>
                        <div className=" border border-border border-t-0 h-full basis-full">
                           {/* TODO: Insert the thead section here */}
                        </div>
                     </div>
                     <div className=" border border-t-border basis-[40%] grow h-full">
                        {/* TODO: Insert the detailed module section here */}
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}
