// src\app\api\mysql\prisma\user\route.ts

import { userType } from "@/components/fetch/Fetchh";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient()

export async function GET() {
    
    const users:userType[]|undefined = await prisma.user.findMany()

    console.log(users,'user')
    return NextResponse.json(users)
}