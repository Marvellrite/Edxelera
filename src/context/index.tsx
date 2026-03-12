import { ReactNode } from "react"
import { SidebarProvider } from "./sidebar.context"
import { ThemeProvider } from "./theme.context"

const ContextProvider = ({ children }: { children: ReactNode }) => {
    return(
        <ThemeProvider>
            <SidebarProvider>
                { children }
            </SidebarProvider>
        </ThemeProvider>
    )
}

export default ContextProvider