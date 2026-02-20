import { Video } from '@/components/admin_and_instructors/icons/modified'
import { Button } from '@/components/ui/button'

const CreateLesson = () => {
  return (

            <div className=" space-y-3">
                    <p className=" text-[14px] font-normal text-neutral-700 mb-2">Create lesson</p>
                <input className=" py-4 px-3 w-full border border-neutral-500 rounded-xl" type="text" placeholder="Lesson title" />
                    <fieldset className={`  border rounded-lg py-1 px-2 h-36 relative flex flex-col`}>
                    <span className=" text-neutral-700">Cover image</span>
                    <div className=' grow text-center'>
                        <div className=' flex justify-center mb-3'> <Video/> </div>
                        <div className=' mb-1 text-neutral-800 text-[14px]'>Click or drag and drop your video</div>
                        <div className=" text-neutral-600 text-[12px] font-normal">PNG, JPEG, WEBP, SVG (5MB max)</div>
                    </div>
                    <label className='absolute w-full h-full' htmlFor="thumbnail"></label>
                    <input id='thumbnail' type="file"  className='outline-none border-none opacity w-0 h-0 pointer-events-none fixed z' />
                </fieldset>

                    <input className=" py-4 px-3 w-full border border-neutral-500 rounded-xl" type="text" placeholder="External resources" />

                    <div className='flex justify-end w-full mt-1'>
                        <Button className='border rounded-full py-2 px-4'>Add lesson</Button>
                    </div>

            </div>
)
}

export default CreateLesson