"use client"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface SidebarContextType {
    toggle: boolean
    setToggle: Dispatch<SetStateAction<boolean>>
}

export const SidebarContext = createContext<SidebarContextType>({
    toggle: false,
    setToggle: () => {}
});

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [toggle, setToggle] = useState<boolean>(false);

    return (
        <SidebarContext.Provider value={{ toggle, setToggle }}>
            { children }
        </SidebarContext.Provider>
    )
}

export const useSidebar = () => {
    return (
        useContext(SidebarContext)
    )
}