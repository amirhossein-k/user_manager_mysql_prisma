// src\app\api\mysql\prisma\post\route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient()

export async function POST(req:Request) {
    try {
        
        const {content,userId} = await req.json()
        if(!content||!userId) return NextResponse.json({error:"تمامی قسمت ها الازامی است"},{status:400})
        
        const newPost = await prisma.post.create({
            data:{content,userId}
        })

        return NextResponse.json(newPost,{status:201})

    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"مشکل سرور"},{status:500})
    }finally{
        await prisma.$disconnect()
    }
}