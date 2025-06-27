"use server";
// import {prisma} from '@/lib/middleware/prisma'

// import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'; 
import { redirect } from 'next/navigation';

export async function singUp(formData:FormData) {
    
    
    // const email = formData.get('email')?.toString().trim()
    const name = formData.get('name')?.toString().trim()
    const password = formData.get('password')?.toString()
    
    console.log(name,'name')
    if(!name||!password){
        throw new Error('تمام فیلد ها الزامی هستند')
    }

    const hashedPassword = await hash(password,10)

    //بررسی وجود ایمیل
    // const existingUser = await prisma.user.findUnique({where:{email}})
    
    // if(existingUser){
    //     throw new Error('کاربری با این ایمیل قبلاً ثبت شده است.');
    // }
// listordershop = [idproduct1,idproduct2,....]
    // await prisma.user.create(
    //     {
    //         data:{
    //             email,
    //             name,
    //             password:hashedPassword,
    //             listordershop:[],
    //             address:{
    //                 create:[
    //                     {
    //                         location: "Default Location",
    //                         state: "Default State",
    //                         zipcode: "00000"
    //                     }
    //                 ]
    //             }

    //         },include:{address:true}
    //     }
    // )

    
//   redirect('/login');


}