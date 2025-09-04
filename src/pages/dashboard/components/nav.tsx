import React from 'react'

export const Sidebar: React.FC = () => {
  return (
    <aside>
      <img src="/assets/logo.webp" alt="" />
    </aside>
  )
}

// THIS TAB IS THE MOBILE TABS
export const Tabs: React.FC = () => {
    return (
        <aside className='grid md:hidden grid-cols-5 bg-primary h-14 items-center *:flex *:justify-center'>
          <p>A</p>
          <p>B</p>
          <p>C</p>
          <p>D</p>
          <p>E</p>
        </aside>
    )
}