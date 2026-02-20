"use client"

import React from 'react'
import { ReactSVG } from 'react-svg'
import {useRef, useState} from "react"


interface VideoPlayerProps {
    src: string,
    poster?:string
}

const VideoPlayer = ({src, poster}: VideoPlayerProps) => {

  const videoPlayer = useRef<HTMLVideoElement|null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay =()=>{
    const vid = videoPlayer.current; 

    if(!vid) return
    else if (vid.paused){
      vid.play()
      setIsPlaying(true)
    }
    else{
      vid.pause()
      setIsPlaying(false)
    }

  }

  return (
    <div className='relative'>
      <video ref={videoPlayer} poster={poster} src={src}></video>
      <div className=' w-full h-full top-0 left-0 absolute flex items-end p-[30px]'>
          {/* <button onClick={togglePlay} className='p-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
            <ReactSVG src='/icons/video-play-btn.svg'/>
          </button> */}
          <div className=" bottom-0 left-0 w-full space-y-2 items-center">
            <ProgressBar/>
            <div className="flex justify-between w-full">
              <div className=' flex items-center gap-2'>
                <button onClick={ togglePlay} className='p-0'><ReactSVG src="/icons/video-pause-btn.svg"/></button>
                <div className=' text-white flex items-center gap-1.5 text-[13.5px] font-medium'><span>00:54 </span>/ <span>14:49</span></div>
                
              </div>
              <div className=' flex gap-x-2.5 items-center'>
                <button className='p-0'><ReactSVG src='/icons/video-volume-btn.svg'/></button>
                <button className='p-0'><ReactSVG src='/icons/video-settings-btn.svg'/></button>
                <button className='p-0'><ReactSVG src='/icons/video-expand-btn.svg'/></button>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

const ProgressBar = ()=>{
  return(
    <div className="w-full h-[7.5px] rounded-[37.5px] bg-neutral-100 flex items-center">
      <div className=" w-2/5 bg-primary h-full "></div> <ReactSVG src="/icons/video-end.svg"/>
    </div>
  )
}

export default VideoPlayer
