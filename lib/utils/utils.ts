import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}


export const throttle = (func:()=>void, interval:number)=>{
    let inThrottle = false
    return function(args:object){
      if(!inThrottle){
        func.apply(args)
        inThrottle = true
        setTimeout(()=>inThrottle=false, interval)
      }
    }
}