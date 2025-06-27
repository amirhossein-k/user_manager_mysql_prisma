'use server'

import { userType } from "@/components/fetch/Fetchh"
import { GetDBSetting } from "@/lib/common"
import { studentTypeRes } from "@/types/types"
import { USERTYPE } from "@/utils/types"
import { PrismaClient } from "@prisma/client"
import { PrismaClientValidationError } from "@prisma/client/runtime/library"
// import { studentTypeRes } from "@/types/types"
import mysql from 'mysql2/promise'
import { NextResponse } from "next/server"
// import { NextResponse } from "next/server"
const connect = GetDBSetting()
const prisma = new PrismaClient()

export async function GetStudents() {
    

    // const name = formData.get('name')?.toString().trim()
    try {
//  conect to databse
        // const connection = await mysql.createConnection(connect)

        // let query_text = ''

        // query_text= 'SELECT * FROM user'

        // const values :[] = []

        // const [results]= await connection.execute(query_text,values)
        // console.log(results,'result')

        // connection.end()

        // return results

    const users:userType[]|undefined = await prisma.user.findMany()


    return NextResponse.json(users)
        
    } catch (error) {
        console.log(error)
        return NextResponse.json('ix')
        return   'خطا در سرور';
         throw Error('errorr');
    }



}


