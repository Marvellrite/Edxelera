"use client"

import { ReactSVG } from 'react-svg';
import Comment from './comment';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress'
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion'
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"

const CourseStartedLearn = () => {
  return (
<div className=" max-[890px]:flex-col  flex gap-x-3 h-full ">
                     <div className=" flex flex-col basis-[65%] grow gap-y-4.5">
                        <div className=" max-sm:border-none border border-border rounded-lg p-4 min-[890px]:pb-4 max-[890px]:pb-11 max-[890px]:mb-4">
                           <div>
                              {/* TODO: Insert the video here */}
                              <video src={'/videos/video1.mp4'} controls/>
                           </div>
                           <div className=" flex justify-between pt-5 px-2 max-[890px]:hidden">
                              {/* TODO: Contains the prev and next buttons */}
                              <Button
                                 variant={'outline'}
                                 className=" py-3 px-2.5 w-[89px] h-11 rounded-[500px]"
                              >
                                 Previous
                              </Button>
                              <Button className="  py-2.5 px-[27px] w-[88px] h-11 rounded-[500px]">
                                 Next
                              </Button>
                           </div>
                        </div>
                        <div className="  max-sm:border-none border border-border max-[890px]:hidden h-full basis-full p-3 px-0 rounded-lg">
                           {/* TODO: Insert the thread section here */}
                           <p className=' font-normal px-4 pt-2 pb-5.5'>Course Forum</p>
                           <div>
                              
                              <Comment isChild={false}>
                                 <Comment>
                                    <Comment></Comment>
                                 </Comment>
                              </Comment>

                              <div className=' px-4'>
                                       <div className=' p-4 gap-2  border rounded-full border-neutral-400 h-[53px] flex items-center'><ReactSVG src='/icons/reply.svg' beforeInjection={(svg)=>{ const paths = svg.querySelectorAll('path');
                                       paths.forEach((path)=>{ path.setAttribute("fill", "#939393")})}}/><input className=' border-none outline-none w-full h-full placeholder:text-neutral-400' placeholder='Start a converstaion'/></div>

                              </div>
                           </div>

                           <div className=' mt-4.5'>
                               <Comment isChild={false}>
                                 <Comment>
                                 </Comment>
                              </Comment>
                           </div>

                        </div>
                     </div>
                     <div className=" max-md:pb-6 max-sm:border-none border border-neutral-100 rounded-lg border-t-border basis-[35%]  min-h-full">
                        {/* TODO: Insert the detailed module section here */}

                        <div className="">
                        <div className='px-4 max-[890px]:hidden'>

                        <p className=' text-[14px] text-neutral-700'>Week 2 - 20%</p>
                        <Progress className=' rounded-full mt-1' value={20} />
                        </div>
                        <div>
                           <p className=' font-normal mt-3 text-neutral-800 px-4'>
                              Modules
                           </p>

                           <Accordion
                            
                  type="multiple"
                  className="  border-neutral-400 rounded-lg max-md:border-none max-md:rounded-none md:[&>div:last-of-type]:border-b-0 px-2"
               >
                  <AccordionItem
                     value="item-1"
                     className="  px-0 py-0   border-b border-neutral-400 font-normal "
                  >
                     <AccordionTrigger className=" hover:no-underline hover:bg-neutral-400/30 px-2.5">
                        <div className=" flex gap-x-1.5 items-center">
                           <ReactSVG src="/icons/note.svg" />
                           <span className="">WEEK 1 - Introduction & Foundations</span>
                        </div>
                     </AccordionTrigger>
                     <AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up *:border-neutral-200 *:border-y *:py-3.5 *:px-3 ">
                        

                           <RadioGroup className='  space-y-6 '>
                           {/* An Item in the Accordion Content */}
                           
                              <div className=' flex gap-2.5'>
                                 <RadioGroupItem className='size-5' value='1' id="r1" />
                                 <div className=' space-y-2'>

                                    <p className=' text-primary'>
                                       What is UX design? What is UI design? How do
                                       they work?
                                    </p>
                                    <div className=" flex gap-2 items-center">
                                       <ReactSVG src="/icons/video-square.svg" />
                                       <span>Video Lesson</span>
                                    </div>
                                 </div>
                              </div>
                           
                          
                           </RadioGroup>
                           <RadioGroup className='  space-y-6 '>
                           {/* An Item in the Accordion Content */}
                           
                              <div className=' flex gap-2.5'>
                                 <RadioGroupItem className='size-5' value='1' id="r1" />
                                 <div className=' space-y-2'>

                                    <p>
                                       What is UX design? What is UI design? How do
                                       they work?
                                    </p>
                                    <div className=" flex gap-2 items-center">
                                       <ReactSVG src="/icons/video-square.svg" />
                                       <span>Video Lesson</span>
                                    </div>
                                 </div>
                              </div>
                           
                          
                           </RadioGroup>
                           <RadioGroup className='  space-y-6 '>
                           {/* An Item in the Accordion Content */}
                           
                              <div className=' flex gap-2.5'>
                                 <RadioGroupItem className='size-5' value='1' id="r1" />
                                 <div className=' space-y-2'>

                                    <p>
                                       What is UX design? What is UI design? How do
                                       they work?
                                    </p>
                                    <div className=" flex gap-2 items-center">
                                       <ReactSVG src="/icons/video-square.svg" />
                                       <span>Video Lesson</span>
                                    </div>
                                 </div>
                              </div>
                           
                          
                           </RadioGroup>
                           <RadioGroup className='  space-y-6 '>
                           {/* An Item in the Accordion Content */}
                           
                              <div className=' flex gap-2.5'>
                                 <RadioGroupItem className='size-5' value='1' id="r1" />
                                 <div className=' space-y-2'>

                                    <p>
                                       What is UX design? What is UI design? How do
                                       they work?
                                    </p>
                                    <div className=" flex gap-2 items-center">
                                       <ReactSVG src="/icons/video-square.svg" />
                                       <span>Video Lesson</span>
                                    </div>
                                 </div>
                              </div>
                           
                          
                           </RadioGroup>
                           <RadioGroup className='  space-y-6 '>
                           {/* An Item in the Accordion Content */}
                           
                              <div className=' flex gap-2.5'>
                                 <RadioGroupItem className='size-5' value='1' id="r1" />
                                 <div className=' space-y-2'>

                                    <p>
                                       What is UX design? What is UI design? How do
                                       they work?
                                    </p>
                                    <div className=" flex gap-2 items-center">
                                       <ReactSVG src="/icons/video-square.svg" />
                                       <span>Video Lesson</span>
                                    </div>
                                 </div>
                              </div>
                           
                          
                           </RadioGroup>
                           <div className='  space-y-6 '>
                           {/* An Item in the Accordion Content */}
                           
                              <div className=' flex gap-2.5'>
                                 {/* <RadioGroupItem className='size-5' value='1' id="r1" /> */}
                                 <div className=' space-y-2'>

                                    <p>
                                       Module 1 Test
                                    </p>
                                    <div className=" flex gap-2 items-center">
                                       <ReactSVG src="/icons/message-question.svg" />
                                       <span>Assessment</span>
                                    </div>
                                 </div>
                              </div>
                           
                          
                           </div>
                           <div className='  space-y-6 '>
                           {/* An Item in the Accordion Content */}
                           
                              <div className=' flex gap-2.5'>
                                 {/* <RadioGroupItem className='size-5' value='1' id="r1" /> */}
                                 <div className=' space-y-2'>

                                    <p>
                                       Analyze a product’s UX
                                    </p>
                                    <div className=" flex gap-2 items-center">
                                       <ReactSVG src="/icons/message-question.svg" />
                                       <span>Task</span>
                                    </div>
                                 </div>
                              </div>
                           
                          
                           </div>
                        
                     </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                     value="item-2"
                     className="  px-0 py-0   border-b border-neutral-400 text-neutral-600"
                  >
                     <AccordionTrigger className=" hover:no-underline hover:bg-neutral-400/30 px-2.5">
                        <div className=" flex gap-x-1.5 items-center">
                           <ReactSVG src="/icons/note.svg"  beforeInjection={(svg)=>{const paths = svg.querySelectorAll("path");
                              paths.forEach((path)=>{ path.setAttribute("fill", "#939393")})
                           }} />
                           <span>WEEK 2 - Introduction & Foundations</span>
                        </div>
                     </AccordionTrigger>
                     <AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                        

                           <RadioGroup className='  pt-3 space-y-6 px-3 '>
                           {/* An Item in the Accordion Content */}
                           
                              <div className=' flex gap-2.5'>
                                 <RadioGroupItem className='size-5' value='1' id="r1" />
                                 <div className=' space-y-2'>

                                    <p>
                                       What is UX design? What is UI design? How do
                                       they work?
                                    </p>
                                    <div className=" flex gap-2 items-center">
                                       <ReactSVG src="/icons/video-square.svg"  beforeInjection={(svg)=>{const paths = svg.querySelectorAll("path");
                              paths.forEach((path)=>{ path.setAttribute("fill", "#939393")})
                           }}/>
                                       <span>Video Lesson</span>
                                    </div>
                                 </div>
                              </div>
                           
                          
                           </RadioGroup>
                           <RadioGroup className='  pt-3 space-y-6 px-3 '>
                           {/* An Item in the Accordion Content */}
                           
                              <div className=' flex gap-2.5'>
                                 <RadioGroupItem className='size-5' value='1' id="r1" />
                                 <div className=' space-y-2'>

                                    <p>
                                       What is UX design? What is UI design? How do
                                       they work?
                                    </p>
                                    <div className=" flex gap-2 items-center">
                                       <ReactSVG src="/icons/video-square.svg"  beforeInjection={(svg)=>{const paths = svg.querySelectorAll("path");
                              paths.forEach((path)=>{ path.setAttribute("fill", "#939393")})
                           }}/>
                                       <span>Video Lesson</span>
                                    </div>
                                 </div>
                              </div>
                           
                          
                           </RadioGroup>
                           <RadioGroup className='  pt-3 space-y-6 px-3 '>
                           {/* An Item in the Accordion Content */}
                           
                              <div className=' flex gap-2.5'>
                                 <RadioGroupItem className='size-5' value='1' id="r1" />
                                 <div className=' space-y-2'>

                                    <p>
                                       What is UX design? What is UI design? How do
                                       they work?
                                    </p>
                                    <div className=" flex gap-2 items-center">
                                       <ReactSVG src="/icons/video-square.svg"  beforeInjection={(svg)=>{const paths = svg.querySelectorAll("path");
                              paths.forEach((path)=>{ path.setAttribute("fill", "#939393")})
                           }}/>
                                       <span>Video Lesson</span>
                                    </div>
                                 </div>
                              </div>
                           
                          
                           </RadioGroup>
                           <RadioGroup className='  pt-3 space-y-6 px-3 '>
                           {/* An Item in the Accordion Content */}
                           
                              <div className=' flex gap-2.5'>
                                 <RadioGroupItem className='size-5' value='1' id="r1" />
                                 <div className=' space-y-2'>

                                    <p>
                                       What is UX design? What is UI design? How do
                                       they work?
                                    </p>
                                    <div className=" flex gap-2 items-center">
                                       <ReactSVG src="/icons/video-square.svg"  beforeInjection={(svg)=>{const paths = svg.querySelectorAll("path");
                              paths.forEach((path)=>{ path.setAttribute("fill", "#939393")})
                           }}/>
                                       <span>Video Lesson</span>
                                    </div>
                                 </div>
                              </div>
                           
                          
                           </RadioGroup>
                           <RadioGroup className='  pt-3 space-y-6 px-3 '>
                           {/* An Item in the Accordion Content */}
                           
                              <div className=' flex gap-2.5'>
                                 <RadioGroupItem className='size-5' value='1' id="r1" />
                                 <div className=' space-y-2'>

                                    <p>
                                       What is UX design? What is UI design? How do
                                       they work?
                                    </p>
                                    <div className=" flex gap-2 items-center">
                                       <ReactSVG src="/icons/video-square.svg"  beforeInjection={(svg)=>{const paths = svg.querySelectorAll("path");
                              paths.forEach((path)=>{ path.setAttribute("fill", "#939393")})
                           }} />
                                       <span>Video Lesson</span>
                                    </div>
                                 </div>
                              </div>
                           
                          
                           </RadioGroup>
                        
                     </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                     value="item-3"
                     className="  px-0 py-0   border-b border-neutral-400 text-neutral-600"
                  >
                     <AccordionTrigger className=" hover:no-underline hover:bg-neutral-400/30 px-2.5">
                        <div className=" flex gap-x-1.5 items-center">
                           <ReactSVG src="/icons/note.svg"  beforeInjection={(svg)=>{const paths = svg.querySelectorAll("path");
                              paths.forEach((path)=>{ path.setAttribute("fill", "#939393")})
                           }} />
                           <span>WEEK 3 - Introduction & Foundations</span>
                        </div>
                     </AccordionTrigger>
                     <AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                        

                           <RadioGroup className='  pt-3 space-y-6 px-3 '>
                           {/* An Item in the Accordion Content */}
                           
                              <div className=' flex gap-2.5'>
                                 <RadioGroupItem className='size-5' value='1' id="r1" />
                                 <div className=' space-y-2'>

                                    <p>
                                       What is UX design? What is UI design? How do
                                       they work?
                                    </p>
                                    <div className=" flex gap-2 items-center">
                                       <ReactSVG src="/icons/video-square.svg"  beforeInjection={(svg)=>{const paths = svg.querySelectorAll("path");
                              paths.forEach((path)=>{ path.setAttribute("fill", "#939393")})
                           }} />
                                       <span>Video Lesson</span>
                                    </div>
                                 </div>
                              </div>
                           
                          
                           </RadioGroup>
                           <RadioGroup className='  pt-3 space-y-6 px-3 '>
                           {/* An Item in the Accordion Content */}
                           
                              <div className=' flex gap-2.5'>
                                 <RadioGroupItem className='size-5' value='1' id="r1" />
                                 <div className=' space-y-2'>

                                    <p>
                                       What is UX design? What is UI design? How do
                                       they work?
                                    </p>
                                    <div className=" flex gap-2 items-center">
                                       <ReactSVG src="/icons/video-square.svg"  beforeInjection={(svg)=>{const paths = svg.querySelectorAll("path");
                              paths.forEach((path)=>{ path.setAttribute("fill", "#939393")})
                           }} />
                                       <span>Video Lesson</span>
                                    </div>
                                 </div>
                              </div>
                           
                          
                           </RadioGroup>
                           <RadioGroup className='  pt-3 space-y-6 px-3 '>
                           {/* An Item in the Accordion Content */}
                           
                              <div className=' flex gap-2.5'>
                                 <RadioGroupItem className='size-5' value='1' id="r1" />
                                 <div className=' space-y-2'>

                                    <p>
                                       What is UX design? What is UI design? How do
                                       they work?
                                    </p>
                                    <div className=" flex gap-2 items-center">
                                       <ReactSVG src="/icons/video-square.svg"  beforeInjection={(svg)=>{const paths = svg.querySelectorAll("path");
                              paths.forEach((path)=>{ path.setAttribute("fill", "#939393")})
                           }} />
                                       <span>Video Lesson</span>
                                    </div>
                                 </div>
                              </div>
                           
                          
                           </RadioGroup>
                           <RadioGroup className='  pt-3 space-y-6 px-3 '>
                           {/* An Item in the Accordion Content */}
                           
                              <div className=' flex gap-2.5'>
                                 <RadioGroupItem className='size-5' value='1' id="r1" />
                                 <div className=' space-y-2'>

                                    <p>
                                       What is UX design? What is UI design? How do
                                       they work?
                                    </p>
                                    <div className=" flex gap-2 items-center">
                                       <ReactSVG src="/icons/video-square.svg"  beforeInjection={(svg)=>{const paths = svg.querySelectorAll("path");
                              paths.forEach((path)=>{ path.setAttribute("fill", "#939393")})
                           }} />
                                       <span>Video Lesson</span>
                                    </div>
                                 </div>
                              </div>
                           
                          
                           </RadioGroup>
                           <RadioGroup className='  pt-3 space-y-6 px-3 '>
                           {/* An Item in the Accordion Content */}
                           
                              <div className=' flex gap-2.5'>
                                 <RadioGroupItem className='size-5' value='1' id="r1" />
                                 <div className=' space-y-2'>

                                    <p>
                                       What is UX design? What is UI design? How do
                                       they work?
                                    </p>
                                    <div className=" flex gap-2 items-center">
                                       <ReactSVG src="/icons/video-square.svg"  beforeInjection={(svg)=>{const paths = svg.querySelectorAll("path");
                              paths.forEach((path)=>{ path.setAttribute("fill", "#939393")})
                           }} />
                                       <span>Video Lesson</span>
                                    </div>
                                 </div>
                              </div>
                           
                          
                           </RadioGroup>
                        
                     </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                     value="item-4"
                     className="  px-0 py-0   border-b border-neutral-400 text-neutral-600"
                  >
                     <AccordionTrigger className=" hover:no-underline hover:bg-neutral-400/30 px-2.5">
                        <div className=" flex gap-x-1.5 items-center">
                           <ReactSVG src="/icons/note.svg"  beforeInjection={(svg)=>{const paths = svg.querySelectorAll("path");
                              paths.forEach((path)=>{ path.setAttribute("fill", "#939393")})
                           }} />
                           <span>WEEK 4 - Introduction & Foundations</span>
                        </div>
                     </AccordionTrigger>
                     <AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                        

                           <RadioGroup className='  pt-3 space-y-6 px-3 '>
                           {/* An Item in the Accordion Content */}
                           
                              <div className=' flex gap-2.5'>
                                 <RadioGroupItem className='size-5' value='1' id="r1" />
                                 <div className=' space-y-2'>

                                    <p>
                                       What is UX design? What is UI design? How do
                                       they work?
                                    </p>
                                    <div className=" flex gap-2 items-center">
                                       <ReactSVG src="/icons/video-square.svg"  beforeInjection={(svg)=>{const paths = svg.querySelectorAll("path");
                              paths.forEach((path)=>{ path.setAttribute("fill", "#939393")})
                           }} />
                                       <span>Video Lesson</span>
                                    </div>
                                 </div>
                              </div>
                           
                          
                           </RadioGroup>
                           <RadioGroup className='  pt-3 space-y-6 px-3 '>
                           {/* An Item in the Accordion Content */}
                           
                              <div className=' flex gap-2.5'>
                                 <RadioGroupItem className='size-5' value='1' id="r1" />
                                 <div className=' space-y-2'>

                                    <p>
                                       What is UX design? What is UI design? How do
                                       they work?
                                    </p>
                                    <div className=" flex gap-2 items-center">
                                       <ReactSVG src="/icons/video-square.svg"  beforeInjection={(svg)=>{const paths = svg.querySelectorAll("path");
                              paths.forEach((path)=>{ path.setAttribute("fill", "#939393")})
                           }} />
                                       <span>Video Lesson</span>
                                    </div>
                                 </div>
                              </div>
                           
                          
                           </RadioGroup>
                           <RadioGroup className='  pt-3 space-y-6 px-3 '>
                           {/* An Item in the Accordion Content */}
                           
                              <div className=' flex gap-2.5'>
                                 <RadioGroupItem className='size-5' value='1' id="r1" />
                                 <div className=' space-y-2'>

                                    <p>
                                       What is UX design? What is UI design? How do
                                       they work?
                                    </p>
                                    <div className=" flex gap-2 items-center">
                                       <ReactSVG src="/icons/video-square.svg"  beforeInjection={(svg)=>{const paths = svg.querySelectorAll("path");
                              paths.forEach((path)=>{ path.setAttribute("fill", "#939393")})
                           }}/>
                                       <span>Video Lesson</span>
                                    </div>
                                 </div>
                              </div>
                           
                          
                           </RadioGroup>
                           <RadioGroup className='  pt-3 space-y-6 px-3 '>
                           {/* An Item in the Accordion Content */}
                           
                              <div className=' flex gap-2.5'>
                                 <RadioGroupItem className='size-5' value='1' id="r1" />
                                 <div className=' space-y-2'>

                                    <p>
                                       What is UX design? What is UI design? How do
                                       they work?
                                    </p>
                                    <div className=" flex gap-2 items-center">
                                       <ReactSVG src="/icons/video-square.svg"  beforeInjection={(svg)=>{const paths = svg.querySelectorAll("path");
                              paths.forEach((path)=>{ path.setAttribute("fill", "#939393")})
                           }}/>
                                       <span>Video Lesson</span>
                                    </div>
                                 </div>
                              </div>
                           
                          
                           </RadioGroup>
                           <RadioGroup className='  pt-3 space-y-6 px-3 '>
                           {/* An Item in the Accordion Content */}
                           
                              <div className=' flex gap-2.5'>
                                 <RadioGroupItem className='size-5' value='1' id="r1" />
                                 <div className=' space-y-2'>

                                    <p>
                                       What is UX design? What is UI design? How do
                                       they work?
                                    </p>
                                    <div className=" flex gap-2 items-center">
                                       <ReactSVG src="/icons/video-square.svg"  beforeInjection={(svg)=>{const paths = svg.querySelectorAll("path");
                              paths.forEach((path)=>{ path.setAttribute("fill", "#939393")})
                           }} />
                                       <span>Video Lesson</span>
                                    </div>
                                 </div>
                              </div>
                           
                          
                           </RadioGroup>
                        
                     </AccordionContent>
                  </AccordionItem>
                 
                  <hr className="text-neutral-400 border-none md:hidden" />
                           </Accordion>
                        </div>

                        <div className=' p-4 rounded-lg'>
                           <p className=' font-normal my-3 text-neutral-800'>
                              Additional Resources
                           </p>
                           <ul className=' list-disc px-6 space-y-4'>
                           <li>
                              <p><span></span><span>The Design of Everyday Things - Jace Norman www.book.com</span></p>
                           </li>
                           <li>
                              <p><span></span><span>Another One</span></p>
                           </li>

                           </ul>
                        </div>
                        </div>
                     </div>

                     {/* <div className=' flex justify-between px-4 md:hidden bottom-0 w-full '>

                        <Button className=" bg-neutral-900 rounded-full py-2.5 px-[27px] w-[89px] h-11 ">Previous</Button>
                        <Button className="  rounded-full py-2.5 px-[27px] w-[89px] h-11 ">Next</Button>
                     </div> */}
                  </div>
  )
}

export default CourseStartedLearn
