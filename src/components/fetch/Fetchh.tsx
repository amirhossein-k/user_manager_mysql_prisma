'use client'

import { MainContext } from '@/context/MainContext';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react'
import { generateRandomId } from '../../../hooks/RoundomId';
import { studentTypeRes } from '@/types/types';


export interface userType {
    id:number
    user:string |null
    password:string |null
    name:string|null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getStudent = async(open:any):Promise<studentTypeRes[]|string|undefined>=>{
   try {
    open(true)

       const result = await fetch("/api/mysql/studensts", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      
    });
         await new Promise((resolve)=>setTimeout(resolve,1000))

    console.log(result,'reeee')
    open(false)
    return  result.json()
   } catch (error) {
    console.log(error)
    open(false)
    return 'errr'
   }
   

    
}


const Fetchh = () => {
  const {setLoading} = useContext(MainContext);

  const [open, setOpen] = useState(false);

    const [user,setUser]=useState<userType[]>()
    // const [student,setStudent]=useState()

   const { data}:{data:studentTypeRes[]|undefined|string} = useQuery({
    queryKey: ['student'],
    queryFn:()=>getStudent(setOpen),
    staleTime:60*1000
    
    
   })
 

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
const getUser = async():Promise<userType[]|string|undefined>=>{
   try {
// open(true)
       const result = await fetch("/api/mysql/prisma/user", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      
    });
        //  await new Promise((resolve)=>setTimeout(resolve,1000))

        // open(false)
    console.log(result,'reeee')
    
          const data = await result.json();
          console.log(data)
setUser(data)
    // return  result.json()
   } catch (error) {
    console.log(error)
    
    // open(false)

    return 'errr'
   }
   

    
}

  
   useEffect(() => {
    getUser()
    if (open) {
setLoading(true)
      
    }
    return () => {
        
      if (open) setLoading(false)
    };
  }, [open,setLoading]);

 
// const re:studentType[] = getStudent()
// console.log(re,'reeee')
  return (
    <div>
      student:{typeof(data)!=='undefined'&& typeof(data)!=='string' ?  data.map((st:studentTypeRes)=>{
        return(

        <div key={st.id+generateRandomId()} className="">
{st.name}
        </div>
        )
      }):
      (
        <div className="text-red-400">اطلااعات دریافت نشده اینترنت خود را چک کنید</div>
      )
      }
      user:
       {typeof(user)!=='undefined'&& typeof(user)!=='string' ?  user.map((st:userType)=>{
        return(

        <div key={st.id+generateRandomId()} className="">
{st.user}
        </div>
        )
      }):
      (
        <div className="text-red-400">اطلااعات دریافت نشده اینترنت خود را چک کنید</div>
      )
      }
    </div>
  )
}

export default Fetchh
