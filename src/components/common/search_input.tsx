import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";
import { ReactSVG } from "react-svg"

type Props = {
   wrapperClassNames?: string
}

const SearchInput = ({ wrapperClassNames = "", ...rest}:Props & InputHTMLAttributes<HTMLInputElement>)=>{

return (
            <div
               className={cn("flex items-center gap-3 border-2 border-neutral-900 w-full h-12 p-4 rounded-full focus-within:ring-2 focus-within:ring-primary  transition-all duration-300 ", wrapperClassNames)}
            >
               <ReactSVG
                  src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340576/repo-images/public/icons/search-outline.svg"
                  width={25}
                  height={25}
               />
               <input
                  {...rest}
                  type="search"
                  className="w-full border-none outline-none"
               />
            </div>
        )
}

export default SearchInput;