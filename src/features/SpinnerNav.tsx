'use client'

import { MainContext } from "@/context/MainContext";
import { Spinner} from "@heroui/react";
import React, { useContext } from 'react'

const SpinnersNav = () => {
    // const [isPending,startTransition] = useTransition()
  const { loading} = useContext(MainContext);
   
  return (
    <div className={`loading  ${loading ? "block " : "hidden"} fixed gap-4 text-center rounded-lg z-50  w-[300px] h-[50px] flex justify-center items-center  top-2 right-2   bg-gray-400`}
    dir="rtl"
    >
          {/* <ToastProvider placement={placement} toastOffset={placement.includes("top") ? 60 : 0} /> */}

          <Spinner classNames={{label: "text-foreground mt-4"}}  variant="wave" />

    <span>لطفا کمی صبر کنید</span>

      
   
    
      </div>
  )
}

export default SpinnersNav
