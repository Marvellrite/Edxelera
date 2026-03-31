'use client'

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import ContextProvider from "@/context";
import { getQueryClient } from "@/lib/react-query/get-query-client";

const Provider = ({children}:{children: ReactNode})=>{
    return(

    <QueryClientProvider client={getQueryClient()}>
        <ContextProvider>{children}</ContextProvider>
    </QueryClientProvider>
    )
}

export default Provider
