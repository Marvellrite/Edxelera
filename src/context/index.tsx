import { ReactNode } from "react"
import { SidebarProvider } from "./sidebar.context"
import { ThemeProvider } from "./theme.context"
import ClearPendingEmailOnLoad from "@/app/home/components/clear-pending-email-on-load"

const ContextProvider = ({ children }: { children: ReactNode }) => {
    return(
        <ThemeProvider>
            <SidebarProvider>
                <ClearPendingEmailOnLoad />
                { children }
            </SidebarProvider>
        </ThemeProvider>
    )
}

export default ContextProvider