'use client'

import { MainContext } from "@/context/MainContext"
import { useRouter } from "next/navigation"
import {  useContext, useEffect, useTransition } from "react"

export default  function Navbar() {

    const {setLoading} = useContext(MainContext)
    const router = useRouter()
const [isPending,startTransition] = useTransition()
    const handlePush = async(url:string)=>{
        setLoading(true)
        startTransition(()=>{
                router.push(url)
        })
    }

    useEffect(()=>{
        if(!isPending){
            setLoading(false)
        }
    },[isPending,setLoading])
    console.log('dd')
    
  return (
    <div>
      <button
      className="font-bold text-xl px-2 bg-red-400 py-3"
      onClick={()=>handlePush('/register')}>register</button>
    </div>
  )
}

