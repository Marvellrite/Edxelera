'use client'

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import ContextProvider from "@/context";
import { getQueryClient } from "@/lib/react-query/get-query-client";
import env from "@/lib/config/client/env";

const Provider = ({children}:{children: ReactNode})=>{

    useEffect(
        ()=>{

    if(env.NEXT_PUBLIC_NODE_ENV==='development'){
        console.log('Hello in development mode nad runnig msw worker')
        import('@/lib/msw/browser').then(({default:worker})=>worker.start())
    }
        }, []
    )


    return(

    <QueryClientProvider client={getQueryClient()}>
        <ContextProvider>{children}</ContextProvider>
    </QueryClientProvider>
    )
}

export default Provider
