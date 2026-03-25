import { ReviewReceivedIcon } from "@/components/icons/modified"
import { Button } from "@/components/ui/button"


const ReviewReceived = () => {
  return (
    <div className=' bg-surface-home grow flex-col flex justify-between items-center'>
        <div className='flex flex-col gap-12 items-center'>
            <div className=' text-[40px] font-medium'>Review Received</div>
            <ReviewReceivedIcon/>
            <div className='text-[18px]'>Thank you for sharing your experience</div>
        </div>

        
          <Button className=' @cq-md:w-146.5 @cq-lg:w-112.5'>Go to Dashboard</Button>
        
    </div>
  )
}

export default ReviewReceived
