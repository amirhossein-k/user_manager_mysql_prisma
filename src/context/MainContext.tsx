'use client'

import { createContext, ReactNode, useContext, useState } from "react"

interface MainType{
    loading:boolean
    setLoading: (isLoading: boolean) => void;
}

export const MainContext =  createContext<MainType>({}as MainType)


export  const MainProvider =({ children }: { children: ReactNode })=>{
  const [loading, setLoading] = useState<boolean>(true);

    return(
        <MainContext.Provider value={{loading,setLoading}}>
            {children}
        </MainContext.Provider>
    )
}

export const useMainContext =()=>{
    const context = useContext(MainContext)
    if(!context){
        throw new Error('providerMain error')

    }
    return context
}