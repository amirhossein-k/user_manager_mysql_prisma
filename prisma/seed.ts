
import { PrismaClient } from '@prisma/client';

 const prisma = new PrismaClient()

 async function main() {
    await prisma.user.create({
        data:{
            name:"amir",
            password:"123456",
            user:"userAmir"
        }
    })

    console.log('DataBase seeded !')
 }

 main()
    .catch((e)=>{
        console.log(e)
        process.exit(1)
    })
    .finally(async()=>{
        await prisma.$disconnect()
    })