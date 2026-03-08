import React from 'react'
import Video_card from '@/app/home/components/course-card'
import { courses } from '@/lib/landing-data'
import { cn } from '@/lib/utils'
import { ClassValue } from 'clsx'

interface Props {
    className?: ClassValue[]
}

const CoursesGrid = ({...className}: Props) => {
  return (
    <div className={cn("grid max-lg:grid-cols-2 lg:grid-cols-3 gap-6 mb-8", className)}>
          {courses.map((course) => (
            <Video_card key={course._id} {...course} hideCta={true} variant="compact" />
          ))}
        </div>
  )
}

export default CoursesGrid
