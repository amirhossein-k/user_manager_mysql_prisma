// src\app\api\mysql\users\route.ts

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export  async function GET() {
    try {
        const users = await prisma.user.findMany({
            include:{posts:true}
        })
        return NextResponse.json(users,{status:200})
    } catch (error) {
        console.log(error)
       return NextResponse.json([], { status: 200 }); // آرایه خالی برگردانید
    }finally{
        await prisma.$disconnect()
    }
}

export async function POST(request:Request) {
    try {
        const {name,user,password} = await request.json()
        if(!name||!user){
            return NextResponse.json({error:'نام و یوزرنیم ضروری است'},{status:400})
        }
        
        const newUser = await prisma.user.create({
            data:{name,user,password}
        })
        return NextResponse.json(newUser,{status:201})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"مشکل در سرور"},{status:500})
    }finally{
        await prisma.$disconnect()
    }
}

