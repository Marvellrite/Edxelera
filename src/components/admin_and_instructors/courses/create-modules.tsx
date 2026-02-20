import { AddCircle } from '@/components/admin_and_instructors/icons/modified'
import { Button } from '@/components/admin_and_instructors/ui/button'
import Link from 'next/link'

interface Props {
    setShowModuleFields: (state:boolean)=>void
}

const CreateModules = ({setShowModuleFields}:Props) => {
  return (
    <>
            <div className=" border rounded-xl border-neutral-500 h-20.25 flex flex-col justify-center items-center py-3.5 cursor-pointer" onClick={()=>setShowModuleFields(true)}>
                <div className=" text-neutral-800 text-center"><AddCircle/></div>
                <div className=" text-center mt-2.5 text-neutral-800">Add a module</div>
            </div>
            <div className='flex justify-between w-full mt-3.5'>
                            <Button variant={"outline"}  className='border rounded-full py-2 px-4'>Save as draft</Button>
                            <Button className='border rounded-full py-2 px-4'>
                                <Link href={'/course/add-course/preview'}>Proceed</Link> 
                            </Button>
                        </div>
            </>
  )
}

export default CreateModules