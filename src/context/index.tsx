import { ReactNode } from "react"
import { SidebarProvider } from "./sidebar"

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    return(
        <SidebarProvider>
            { children }
        </SidebarProvider>
    )
}