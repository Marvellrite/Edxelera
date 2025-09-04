import { Outlet } from "react-router"
import { Sidebar } from "./components/nav"
import Header from "./components/header"

const DashboardLayout: React.FC = () => {
  return (
    <main className="grid grid-cols-12">
      <Sidebar />
      <section className="col-span-10">
        <Header />
        <Outlet />
      </section>
    </main>
  )
}

export default DashboardLayout