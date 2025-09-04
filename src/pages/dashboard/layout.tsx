import { Outlet } from "react-router"

const DashboardLayout: React.FC = () => {
  return (
    <main>
      HOME
      <section>
        <Outlet />
      </section>
    </main>
  )
}

export default DashboardLayout