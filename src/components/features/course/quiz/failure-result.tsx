import { Button } from "@/components/ui/button";
import { ReactSVG } from "react-svg";


const FailureResult = ()=>{
    return(
        <div className='fixed inset-0 z-[999] h-full w-full overflow-y-auto bg-white max-[990px]:pt-30'>
            <div className=' flex items-center justify-center w-full h-full  max-[990px]:flex-col gap-x-10'>
                <div className=' basis-1/2 h-full flex justify-center items-center max-[990px]:flex-col max-[990px]: bg-error-light'>
                    <h1 className="text-center text-[40px] text-medium mb-5.5 text-black min-[990px]:hidden min-[990px]:w-70% mx-auto">Oops...</h1>
                    <div className=' min-[990px]:w-[90%] mx-auto min-[990px]:max-w-[450px] max-[990px]:size-[280px]'>
                        <ReactSVG beforeInjection={(svg)=>{ svg.setAttribute('style', 'width:100%;height:100%'); svg.setAttribute('preserveAspectRatio', 'xMidYMid meet'); }} src='https://res.cloudinary.com/dx5iohojj/image/upload/v1773340574/repo-images/public/icons/sad-emoji.svg'/>

                    </div>
                    {/* <ReactSVG className=" md:hidden " src='https://res.cloudinary.com/dx5iohojj/image/upload/v1773340471/repo-images/public/icons/confetti-mobile.svg'/> */}
                </div>
                <div className=" basis-1/2 flex w-full justify-center">
                    <div className=" p-5 max-w-[480px] min-[990px]:w-[90%]">
                        <h1 className="text-center text-[40px] text-medium  text-black max-[990px]:hidden mb-7">Oops...</h1>
                        <p className="text-md font-normal text-center">You scored 29% on the assessment and did not qualify to go to the next module. Kindly take the test again. Note that you have only 2 more trials today</p>
                        <div className=" space-y-4 mt-10">

                            <Button className=' h-[50px] w-full '>Retake Test</Button>
                            <Button variant="secondary" className=' h-[50px] w-full '>Revisit Module</Button>
                            <Button variant="outline" className=' h-[50px] w-full text-medium text-primary rounded-[500px]'>Review Answers</Button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FailureResult
