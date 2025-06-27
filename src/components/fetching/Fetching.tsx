'use server'

import { studentTypeReq, studentTypeRes } from "@/types/types"
import { GetStudents } from "../../../actions/getStudent"
import { userType } from "../fetch/Fetchh"





export default async function Fetching() {


    const listStudents = await GetStudents()
    if(listStudents&& typeof listStudents==='string' ){
          <div className="text-red-500 text-center p-4">
       خطا در بارگذازی دانش اموزان 
      </div>
    }

    const students:userType[]|string|null=listStudents

    
  return (
    <div>
      <ul>
        { typeof students!=='string' && students?.map((student)=>{
            return(
                <li key={student.id}>usersss:{student.user}</li>
            )
        })}
      </ul>
    </div>
  )
}

