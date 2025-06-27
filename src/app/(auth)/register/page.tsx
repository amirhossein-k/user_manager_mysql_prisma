// src\app\(auth)\register\page.tsx

'use client'

import { MainContext } from "@/context/MainContext"
import React, { useContext, useEffect } from "react"
import { singUp } from "../../../../actions/signup"

export default function RegisterPage(){

    const {loading,setLoading} = useContext(MainContext)
     useEffect(()=>{
        if(loading){
            setLoading(false)
        }
    },[])
console.log(loading,'loading')
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
console.log('dddd')
        try {
                    await singUp(formData);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            console.error(error)

        }finally{
setLoading(false)
        }
    }
    return(
        <form onSubmit={handleSubmit} className="space-y-4 text-black">


        <div className=" flex flex-col gap-5 bg-gray-400  justify-center items-center h-screen w-full">
           <div className="border px-3 py-2 flex gap-3 flex-col">
             <div className="name text-center justify-center items-center flex gap-3">
                <label htmlFor="name" className="flex-1">Name:</label>
                <input type="text" name="name" id="name" className="p-2 border-2" placeholder="name" />
            </div>
             <div className="password flex justify-center items-center gap-3">
                <label htmlFor="password" className="flex-1">Password:</label>
                <input type="text" name="password" id="password" className="p-2 border-2" placeholder="password" />
            </div>
            <div className="sumbit bg-blue-400 text-center px-3 py-2 ">
                <button className="text-white font-bold text-lg border rounded-lg px-2 py-2 inline w-full bg-blue-500"  disabled={loading} type="submit">
                   
                {loading ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
                   </button>
            </div>
           </div>
        </div>
        </form>
    )
}