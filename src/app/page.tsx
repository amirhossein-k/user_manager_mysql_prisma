// src\app\page.tsx
"use server";


import { StudentType, UserType } from '@/types/types';
import { PrismaClient } from '@prisma/client';
import React from 'react'
import ClientComponent from './components/clientComponent/ClientComponent';

const prisma = new PrismaClient()
async function FetchUsers():Promise<UserType[]> {
  try {
    const users = await prisma.user.findMany({include:{posts:true}})
    return users
  } catch (error) {
console.error('خطا در دریافت کاربران:', error);
    return []
  }finally {
  await prisma.$disconnect();
}
}
  async function FetchStudents():Promise<StudentType[]> {
  try {
    const students = await prisma.student.findMany()
    return students
  } catch (error) {
console.error('خطا در دریافت دانش‌آموزان:', error);
    return []
  }finally {
  await prisma.$disconnect();
}
}
export default async function Page() {


  let  initialUsers :UserType[] = []
  let initialStudents : StudentType[] = []
let errorMessage: string | null = null;

try {

  initialUsers = await FetchUsers()
  initialStudents = await FetchStudents()
} catch (error) {
  console.error('خطا در بارگذاری داده‌ها:', error);
  errorMessage = 'خطایی در اتصال به پایگاه داده رخ داد. لطفاً بعداً تلاش کنید.';
}
   

  return (
   <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">مدیریت کاربران و دانش‌آموزان</h1>
      {errorMessage ? (
<div className="text-red-500 mb-4">{errorMessage}</div>
      ):(
      <ClientComponent initialUser={initialUsers} initialStudents={initialStudents} />

      )}
    </div>
  )
}

