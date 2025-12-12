import {create} from "zustand"

export interface NavScrollProps {
    isNavScrolled: boolean,
    setIsNavScrolled: (update:boolean)=>void
}


export const useNavScrollStore = create<NavScrollProps>((set)=>
({
    isNavScrolled: false,
    setIsNavScrolled: (update:boolean)=>set({isNavScrolled:update})
}))
