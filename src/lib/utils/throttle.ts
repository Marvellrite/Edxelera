export default function throttle (func:()=>void, interval:number){
    let inThrottle = false
    return function(args:object){
      if(!inThrottle){
        func.apply(args)
        inThrottle = true
        setTimeout(()=>inThrottle=false, interval)
      }
    }
}