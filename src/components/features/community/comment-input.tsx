import { ReactSVG } from "react-svg";
import { SetStateAction, Dispatch } from "react";

const CommentInput = ({setIsThereText}:{setIsThereText:Dispatch<SetStateAction<boolean>>}) => {
  return (
    
            <div className=' p-4 gap-2  border rounded-full border-neutral-400 h-[53px] flex items-centerm w-full'>
                <ReactSVG src='/icons/reply.svg' beforeInjection={(svg)=>{ const paths = svg.querySelectorAll('path');
                paths.forEach((path)=>{ path.setAttribute("fill", "#939393")})}}/>
                <input className=' border-none outline-none w-full h-full placeholder:text-neutral-400' placeholder='Start a converstaion' onChange={(e)=>{
                    const isThereText = !!e.target.value;
                    setIsThereText(isThereText)
                }}/>
            </div>


  )
}

export default CommentInput
