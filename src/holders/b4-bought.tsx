<h1 className=" text-[40px] font-medium mb-2.5 max-sm:text-[24px] leading-[120%]">
               Product Design (UI/UX)
            </h1>
            <div className=" text-[28px] font-medium mb-1">
               &#8358;{formatMoney(150000)}
            </div>
            <div className=" mb-1 flex items-center gap-1">
               <span>5.0</span>
               <span>
                  <StarRating value={3} max={5} readOnly />
               </span>
            </div>
            <div className="grid grid-cols-[repeat(2,auto)] grid-rows-2 gap-x-5 gap-y-3">
               <div className=" flex">
                  <ReactSVG src="/icons/user-tag.svg" />{' '}
                  <span>Utange Kevin</span>
               </div>
               <div className=" flex ">
                  <ReactSVG src="/icons/video-square.svg" />{' '}
                  <span>Starts August 15th</span>
               </div>
               <div className=" flex">
                  <ReactSVG src="/icons/video-square.svg" />{' '}
                  <span>8 Weeks</span>
               </div>

               <div className=" flex">
                  <ReactSVG src="/icons/students-enrolled.svg" />{' '}
                  <span>137 students enrolled</span>
               </div>
            </div>
            <Link
               href={'#'}
               className=" mt-7 bg-primary text-accent-foreground flex items-center justify-center rounded-[500px] px-2.5 py-3 w-[292px] h-[45px] max-md:hidden"
            >
               <span>Purchase Course</span>
            </Link>