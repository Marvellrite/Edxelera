'use client'

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { getQueryClient } from "./lib/query-client";

const Provider = ({children}:{children: ReactNode})=>{
    return(

    <QueryClientProvider client={getQueryClient()}>
        {children}
    </QueryClientProvider>
    )
}

export default Provider
