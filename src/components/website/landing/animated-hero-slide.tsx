"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { hero_slides } from "@/lib/landing-data"
import { HeroSlides } from "@/types/website.types"

interface Props {
        slides: HeroSlides[]
}

const AnimatedHeroslide = ({slides}: Props)=>{

    const [slideIndex, setSlideIndex] = useState(0)

    return (

            <Image  src={hero_slides[0].imgSrc}
                    alt="Students learning together"
                    fill
                    className="object-cover w-fit "
                    priority
                    style={{transformOrigin: "center center"}}
            />

    )
}

export default AnimatedHeroslide;