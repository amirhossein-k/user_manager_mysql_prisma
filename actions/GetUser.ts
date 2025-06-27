//actions\GetUser.ts
"use server";
import { getSession } from '@/lib/auth';
import prisma from '@/lib/db'
import { ADRESS, USERTYPE } from '@/utils/types';
import { NextResponse } from 'next/server'


export async function GetUser(id: string) {
    try {
        const user: USERTYPE | null = await prisma.user.findUnique({
            where: { id }, include: { posts: { include: { productImage: true,categoryList:true,review:true,listProperty:true } }, address: true }
        })


console.log(user,'action get user')
        return NextResponse.json(user)

    } catch (error) {
        console.log(error, 'error get listproduct error')
        return NextResponse.json(
            { error: 'خطا در سرور' },
            { status: 500 }
        );
    }

}

export async function updateUserAddress({ address }: { address: ADRESS[] }) {
    const session = await getSession();
    if (!session) return { error: "Unauthorized" };
    if (!address || !Array.isArray(address)) {
        return { error: "آدرس نامعتبر است" };
      }
      // بررسی تمام فیلدهای ضروری
  for (const addr of address) {
    if (!addr.location || !addr.state || !addr.zipcode) {
      return { error: "تمام فیلدهای آدرس باید پر شوند" };
    }
  }
  console.log(session,'seesion addres')
   
      try {
        console.log(address,'address action')
        // ابتدا آدرس‌های فعلی کاربر را خالی می‌کنیم
        // await prisma.user.update({
        //   where: { id: session.id },
        //   data: { address: { set: [] } },
        // });
        await prisma.adress.deleteMany({
            where: { userId: session.id },
          });
          
  
        // سپس آدرس‌های جدید را ایجاد کرده و به کاربر متصل می‌کنیم

        const createad = await prisma.adress.create({
            data:{
                location:address[0].location,
                state:address[0].state,
                zipcode:address[0].zipcode,
                id:address[0].id, 
                userId:session.id, 
                
            }
        })
        console.log(createad,'created action')
  
        return { 
            success: true,
            data: {
              id: session.id,
              address: createad
              
            }
          };
      } catch (error) {
        return { 
            error: "خطا در بروزرسانی آدرس",
            details: error instanceof Error ? error.message : "Unknown error"
          };
      }

  }
  
  export async function GetUserAD(id: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            include: { 
                posts: { 
                    include: { productImage: true } 
                }, 
                address: true 
            }
        });

        if (!user) {
            return { error: 'User not found' };
        }

        // تبدیل تمام Dateها به string
        const serializedUser = {
            ...user,
            createdAt: user.createdAt.toISOString(),
            // updatedAt: user.updatedAt.toISOString(),
            posts: user.posts.map(post => ({
                ...post,
                createdAt: post.createdAt.toISOString(),
                updatedAt: post.updatedAt.toISOString(),
                productImage: post.productImage.map(image => ({
                    ...image,
                    // تبدیل سایر Dateها اگر وجود دارد
                }))
            })),
            address: user.address.map(addr => ({
                ...addr,
                // تبدیل سایر Dateها اگر وجود دارد
            }))
        };

        console.log(serializedUser, 'action get user');
        return serializedUser;

    } catch (error) {
        console.error(error, 'error in GetUser');
        return { error: 'خطا در سرور' };
    }
}
