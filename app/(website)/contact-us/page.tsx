'use client'

import Input from '@/components/data/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContactUsSchema, contactUsSchema } from '@/schemas/contact-us.schema'
import Textarea from '@/components/data/textarea'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ReactSVG } from 'react-svg'

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactUsSchema>({
    resolver: zodResolver(contactUsSchema),
  })

  const submitForm = () => {}

  return (
    <section>
      <div className="flex sm-md:gap-9 justify-between lg:h-[724px]">

        {/* LEFT MULTIPLE BACKGROUND IMAGES */}
        <div
          className="
            hidden lg:flex
            basis-[40%] min-w-[500px] relative overflow-hidden items-end"
        >
          <Image alt='Contact us image' fill src='/images/contact-us-underlay.jpg' className=' object-cover  absolute top-0 left-0 -Z-5 object- size-[1211px]! object-[-350px_-550px]'/>
          <Image alt='Contact us image' fill src='/images/contact-us.png' className=' object-[0px_-45px] object-cover transform-[rotateY(180deg)] absolute inset-0'/>
          <div className='absolute bg-linear-to-b from-transparent to-[#000000] to-75% inset-0 z-15'/>
          {/* foreground content */}
          <div className="aboslute z-30 w-full bottom-0 text-white pb-2">
            <div className='space-y-4 mx-auto w-[349px] text-left'>
                <div className="flex mb-2">
                  <Image
                    src="/images/edxelera-white-logo.png"
                    alt="Edxelera's Logo"
                    width={217}
                    height={38}
                    className="h-auto"
                  />
                </div>

                <p className=''>
                  Stuck on something? We’re here to help <br/> with all your questions and answers in one <br/> place
                </p>

                <div className="flex gap-3">
                  <ReactSVG src="/icons/chat.svg" className="mb-5" />
                  <ReactSVG src="/icons/chat.svg" className="mb-5" />
                  <ReactSVG src="/icons/chat.svg" className="mb-5" />
                  <ReactSVG src="/icons/chat.svg" className="mb-5" />
                </div>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="px-4 pt-[70px]">
          <div>
            <div className="sm-md:max-w-[450px] sm-md:text-center lg:text-left sm-md:mx-auto lg:mx-0 lg:max-w-none">
              <h1 className="font-semibold text-[32px] leading-[150%] mb-2">
                Contact Us
              </h1>
              <p>
                Stuck on something? We’re here to help with all your questions and answers in one place
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(submitForm)}
            className="mt-7 flex flex-wrap gap-4 *:basis-full"
          >
            <div className="sm-md:basis-[46%] grow">
              <Input
                placeholder="First Name"
                register={register}
                name="firstName"
                input_id="first_name"
              />
            </div>

            <div className="sm-md:basis-[46%] grow">
              <Input
                placeholder="Last Name"
                register={register}
                name="lastName"
                input_id="last_name"
              />
            </div>

            <div>
              <Input
                placeholder="Email"
                register={register}
                name="email"
                input_id="email"
              />
            </div>

            <div>
              <Input
                placeholder="Phone Number"
                register={register}
                name="phoneNo"
                input_id="phone_number"
                type="number"
              />
            </div>

            <div>
              <Textarea
                name="message"
                register={register}
                placeholder="Message"
                textarea_id="message"
                rows={4}
              />
            </div>

            <div className="w-full sm-md:mt-1">
              <Button className="h-[50px] rounded-full w-full sm-md:max-w-[230px]">
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* MOBILE SECTION */}
      <div className="py-10 mt-10 flex text-center justify-center bg-neutral-50 lg:hidden">
        <div className="space-y-5 max-w-[349px]">
          <div className="flex justify-center">
            <Image
              src="/images/edx_logo_1.png"
              alt="Edxelera's Logo"
              width={148}
              height={32}
              className="h-auto"
            />
          </div>

          <p>
            Stuck on something? We’re here to help with all your questions and answers in one place
          </p>

          <div className="flex gap-3 justify-center">
            <ReactSVG src="/icons/chat.svg" className="mb-5" />
            <ReactSVG src="/icons/chat.svg" className="mb-5" />
            <ReactSVG src="/icons/chat.svg" className="mb-5" />
            <ReactSVG src="/icons/chat.svg" className="mb-5" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
