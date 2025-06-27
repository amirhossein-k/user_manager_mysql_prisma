// actions\GetProductList.ts
"use server";
import prisma from '@/lib/db'
import { POSTTYPE } from '@/utils/types';
import { NextResponse } from 'next/server'
import { format } from 'date-fns';

// رابط جدید برای خروجی با createdAt و updatedAt به صورت string
interface FormattedPostType extends Omit<POSTTYPE, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}
// تابع کمکی برای تبدیل تاریخ به فرمت میلادی
 function formatToGregorianDate(date: Date): string {
  return format(date, 'MM/dd/yyyy/HH');
}
export async function GetProduct() {
    try {
        const listProduct:POSTTYPE[] = await prisma.post.findMany({ orderBy: {
            createdAt: 'desc'
          },include:{
            productImage:true,categoryList:true,review:true,listProperty:true,
          }
      })
        // تبدیل تاریخ createdAt و updatedAt به فرمت میلادی
    const formattedListProduct: FormattedPostType[] = listProduct.map((product) => ({
      ...product,
      createdAt: formatToGregorianDate(product.createdAt),
      updatedAt: formatToGregorianDate(product.updatedAt),
    }));

        return NextResponse.json(formattedListProduct)

    } catch (error) {
        console.log(error, 'error get listproduct error')
        return NextResponse.json(
            { error: 'خطا در سرور' },
            { status: 500 }
        );
    }

}



export async function GetProductOffer(): Promise<FormattedPostType[] | { error: string }> {
  try {
    const listProduct: POSTTYPE[] = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        productImage: true,
        categoryList: true,
        review: true,
        listProperty: true,
      },
    });
    const filterListProduct = listProduct.filter(pro=>pro.priceOffer !== 0)
  // تبدیل تاریخ createdAt و updatedAt به فرمت میلادی
    const formattedListProduct: FormattedPostType[] = filterListProduct.map((product) => ({
      ...product,
      createdAt: formatToGregorianDate(product.createdAt),
      updatedAt: formatToGregorianDate(product.updatedAt),
    }));

    return formattedListProduct;
  } catch (error) {
    console.error(error, 'error get listproduct error');
    return { error: 'خطا در سرور' };
  }
}


export async function GetNewProducts(): Promise<FormattedPostType[] | { error: string }> {
    try {
    const sevenDaysAgo = new Date(Date.now() - 7*24*60*60*1000)
    const listProduct: POSTTYPE[]= await prisma.post.findMany({
      where:{
        createdAt:{ gte:sevenDaysAgo},
      },
      orderBy:{
        createdAt:"desc"
      },
      include:{
        productImage:true,
        categoryList:true,
        review:true
      }
    })

    const formattedListProduct:FormattedPostType[] = listProduct.map((product)=> ({
      ...product,
      createdAt:formatToGregorianDate(product.createdAt),
      updatedAt:formatToGregorianDate(product.updatedAt)
    }))

    return formattedListProduct;

  } catch (error) {
    console.error(error, 'error get new products error');
    return { error: 'خطا در سرور' };
  }
}