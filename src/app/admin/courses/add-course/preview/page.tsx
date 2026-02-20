"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useSidebar } from '@/app/_context/sidebar'
import { Button } from '@/components/ui/button'
import { ReactSVG } from 'react-svg'
import { ChevronDown } from 'lucide-react'

const PreviewPage = () => {
    const { toggle } = useSidebar()
    
    const modules = [
        "WEEK 1 - Introduction & Foundations",
        "WEEK 1 - Introduction & Foundations",
        "WEEK 1 - Introduction & Foundations",
        "WEEK 1 - Introduction & Foundations",
        "WEEK 1 - Introduction & Foundations",
        "WEEK 1 - Introduction & Foundations",
        "WEEK 1 - Introduction & Foundations",
    ]

    return (
        <section id="scroll-container" className={`${toggle ? 'col-span-9' : 'col-span-8'} mt-5 overflow-y-scroll no-scrollbar space-y-5 bg-white p-[14px] rounded-[20px]`}>
            {/* Breadcrumb */}
            <div className="flex items-center gap-3 text-lg">
                <Link href="/course" className="text-black hover:underline">Course Management</Link>
                <span className="text-neutral-700">//</span>
                <Link href="/course/add-course" className="text-black hover:underline">Add New Course</Link>
                <span className="text-neutral-700">//</span>
                <span className="text-black">Preview</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4">
                {/* Course Details */}
                <div className="bg-white rounded-[20px] border border-neutral-50 p-[14px] space-y-6">
                    <h2 className="text-lg font-normal text-black">Course Details</h2>
                    
                    <div className="space-y-3">
                        {/* Row 1 */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white rounded-lg p-3 space-y-0.5">
                                <p className="text-sm text-neutral-700">Course title</p>
                                <p className="text-base text-neutral-900">Product Design</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 space-y-0.5">
                                <p className="text-sm text-neutral-700">Duration</p>
                                <p className="text-base text-neutral-900">8 Weeks</p>
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white rounded-lg p-3 space-y-0.5">
                                <p className="text-sm text-neutral-700">Price</p>
                                <p className="text-base text-neutral-900">₦150,000.00</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 space-y-0.5">
                                <p className="text-sm text-neutral-700">Instructor</p>
                                <p className="text-base text-neutral-900">Utange Kevin</p>
                            </div>
                        </div>

                        {/* Course Overview */}
                        <div className="bg-white rounded-lg p-3 space-y-0.5">
                            <p className="text-sm text-neutral-700">Course overview</p>
                            <p className="text-base text-neutral-900 leading-6">
                                This course is a hands-on introduction to the full spectrum of product design, combining UX strategy with UI execution. You will learn how to research user needs, define problems, design intuitive user flows, and bring ideas to life with stunning interfaces using Figma. By the end of the course, you will have the skills to create user-centered digital products and a portfolio to showcase your work.
                            </p>
                        </div>

                        {/* Cover Image */}
                        <div className="border border-neutral-500 rounded-lg overflow-hidden relative">
                            <Image 
                                src="/assets/course-cover.jpg" 
                                alt="Course cover"
                                width={518}
                                height={144}
                                className="w-full h-36 object-cover"
                            />
                            <span className="absolute top-2 left-2 text-sm text-neutral-700 px-2 py-0.5 rounded text-white">Cover image</span>
                        </div>
                    </div>

                    <div className=' text-right'>

                        <Button variant={'outline'} className="">
                            Edit
                        </Button>
                    </div>
                </div>

                {/* Course Module */}
                <div className="bg-white rounded-[20px] border border-neutral-50 p-6 space-y-4">
                    <h2 className="text-lg font-normal text-black">Course Module</h2>
                    
                    <div className="space-y-4">
                        {modules.map((module, index) => (
                            <div key={index} className="flex items-center justify-between py-4 border-b border-neutral-200 last:border-0">
                                <div className="flex items-center gap-2">
                                    <ReactSVG src="/icons/note-2.svg" className="w-4 h-4" />
                                    <span className="text-base text-black">{module}</span>
                                </div>
                                <button className="text-neutral-800 hover:text-black transition-colors">
                                    <ChevronDown className="w-4 h-2.5" strokeWidth={2} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pb-8">
                <Button variant="outline" >
                    Save as draft
                </Button>
                <Button asChild variant="outline" className="">
                <Link href="/course/view">

                    Simulate Preview
                </Link>
                </Button>
                <Button asChild className="">
                    <Link href={'/course/view'}>

                    Publish Course
                    </Link>
                </Button>
            </div>
        </section>
    )
}

export default PreviewPage
