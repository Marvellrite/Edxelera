import '@/styles/admin/admin.css'

import { ReactNode } from "react";

import ScreenSize from "./ScreenSize";
import Header from "@/components/admin_and_instructors/header";
import Sidebar from "@/components/admin_and_instructors/sidebar";


export default function AdminLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
      <section className={` antialiased h-dvh grid grid-cols-12 grid-rows-12 p-4`}>
        <ScreenSize>
            <Header />

            <main className="w-full h-full  grid grid-cols-10 gap-4 col-span-12 row-span-10">
              <Sidebar />
              {children}
            </main>
        </ScreenSize>
      </section>

  );
}
