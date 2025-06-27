//src\app\api\mysql\user\route.ts

// import { GetDBSetting } from '@/lib/common'
// import mysql from 'mysql2/promise'
// import { studentType } from '../studensts/route';
// import { generateRandomId } from '../../../../../hooks/RoundomId';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// const connectionParams = GetDBSetting()

const prisma  = new PrismaClient()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// export async function POST(request:Request) {
//     try {
//         // connect to database
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const {name,password,user,id}: studentType = await request.json();
//         const idd = generateRandomId()
//         const conection = await mysql.createConnection(connectionParams)

//         let puts_query =``
//         puts_query= `INSERT INTO students (id,user,password,name) VALUES (?,?,?,?)`


//         const values : studentType[] = []

//         const [results] = await conection.execute(puts_query,[Number(idd),user,password,name])
//         console.log(results,'res')

//         conection.end()

//         return NextResponse.json(results)

//     } catch (error) {
//        console.log(error) 
//        throw Error('error')
//     }
// }

export async function GET() {
    try {
        const students = await prisma.student.findMany()

        return NextResponse.json(students,{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"سرور مشکل دارد"},{status:500})
    }finally{
        await prisma.$disconnect()
    }
}


export async function POST(request:Request) {
    try {
        const  {name,gpa,grade} = await request.json()
        if(!name||!gpa||!grade){
            return NextResponse.json({error:"تمامی فیلد های الزامی است"},{status:400})
        }
        const newStudent= await prisma.student.create({
            data:{gpa,grade,name}
        })
        return NextResponse.json(newStudent,{status:201})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"خطا در سرور"},{status:500})
    }finally{
        await prisma.$disconnect()
    }
}