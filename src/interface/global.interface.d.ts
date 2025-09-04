import type { ReactNode } from "react";

declare global {
    export interface Children {
       children: ReactNode
    }
}