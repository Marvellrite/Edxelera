import React from 'react'
import { Outlet } from 'react-router'

const AuthLayout: React.FC = () => {
  return (
    <section>
      AUTH
      <div>
        <Outlet />
      </div>
    </section>
  )
}

export default AuthLayout