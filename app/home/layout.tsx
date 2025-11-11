import "../globals.css";
import { Sidebar, Tabs } from "./components/nav";
import Header from "./components/header";

export default function HomeLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col md:grid md:grid-cols-12 h-screen">
        <Sidebar />
        <section className="col-span-10 h-full">
            <Header />
            { children }
        </section>
        <Tabs />
    </main>
  );
}