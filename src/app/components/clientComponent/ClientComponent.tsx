// src\app\components\clientComponent\ClientComponent.tsx

'use client'

import { PostType, StudentType, UserType } from '@/types/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'


const fetchUsers= async():Promise<UserType[]>=>{

  const res = await fetch('/api/mysql/users')
  if(!res)throw new Error("اینترنت را چک کن")
    return res.json()
}

const fetchStudents = async():Promise<StudentType[]>=>{

  const res = await fetch('/api/mysql/studensts')
  if(!res)throw new Error("اینترنت را چک کن")
    return res.json()
}

const createPost =async (newPost:{content:string,userId:number}):Promise<PostType>=>{

  const res = await fetch('/api/mysql/prisma/post',{
    method:"POST",
    headers:{ 'Content-Type': 'application/json'},
    body:JSON.stringify(newPost)
  })
    if (!res.ok) throw new Error('Failed to create post');

    return res.json()
}

const createUser = async(newUser:{name:string,user:string,password:string}):Promise<UserType>=>{
  const res = await fetch('/api/mysql/users',{
    method:"POST",
    headers:{ 'Content-Type': 'application/json'},
    body:JSON.stringify(newUser)
  })
  if(!res.ok) throw new Error("ذخیره نشد")
  return res.json()
}
const createStudent = async (newStudent: { name: string; grade: string; gpa: number }): Promise<StudentType> => {
  const res = await fetch('/api/mysql/studensts',{
    method:"POST",
    headers:{ 'Content-Type': 'application/json'},
    body:JSON.stringify(newStudent)
  })
  if(!res.ok) throw new Error("ذخیره نشد")
  return res.json()
}
// const createPOST = async (newStudent: { name: string; grade: string; gpa: number }): Promise<StudentType> => {
//   const res = await fetch('/api/mysql/studensts',{
//     method:"POST",
//     headers:{ 'Content-Type': 'application/json'},
//     body:JSON.stringify(newStudent)
//   })
//   if(!res.ok) throw new Error("ذخیره نشد")
//   return res.json()
// }



interface ClientComponentProps {
    initialUser:UserType[]
    initialStudents:StudentType[]
} 

export default function ClientComponent({initialUser,initialStudents}:ClientComponentProps) {
      const [name, setName] = useState('');
      const [user, setUser] = useState('');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [password, setPassword] = useState('');
const [postContent, setPostContent] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [studentName, setStudentName] = useState('');
  const [studentGrade, setStudentGrade] = useState('');
  const [studentGpa, setStudentGpa] = useState('');


      const queryClient = useQueryClient()

      const {data:users,isLoading:isUsersLoading,error:usersError}  = useQuery<UserType[],Error>({
        queryKey:['users'],
        queryFn:fetchUsers,
        initialData:initialUser
      })
        const { data: students, isLoading: isStudentsLoading, error: studentsError } = useQuery<StudentType[], Error>({
    queryKey: ['students'],
    queryFn: fetchStudents,
    initialData: initialStudents,
  });

 

  const userMutation = useMutation<UserType,Error,{name:string,user:string,password:string}>({
    mutationFn:createUser,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['users']})
      setName('')
      setUser('')
    }
  })

  const studentMutation = useMutation<StudentType,Error,{name:string,grade:string,gpa:number}>({
    mutationFn:createStudent,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['students']})
      setStudentGpa('')
      setStudentGrade('')
      setStudentName('')

    }
  })

  const postMutation = useMutation<PostType,Error,{content:string,userId:number}>({
    mutationFn:createPost,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['users']})
       setPostContent('');
      setSelectedUserId(null);
    }

  })


  const handleUserSubmit = (e:React.FormEvent)=>{
    e.preventDefault()
    if(!name||!user) return
    userMutation.mutate({name,user,password})
  }
  const handleStudentSubmit = (e:React.FormEvent)=>{
    e.preventDefault()
    if(!studentName || !studentGrade || !studentGpa) return
    studentMutation.mutate({name:studentName,grade:studentGrade,gpa:parseFloat(studentGpa)})
  }
  const handlePostSubmit = (e:React.FormEvent)=>{
    e.preventDefault()
    if(!postContent||!selectedUserId) return
    postMutation.mutate({content:postContent,userId:selectedUserId})
  }

    if (isUsersLoading || isStudentsLoading) return <div>در حال بارگذاری...</div>;
  if (usersError) return <div>خطا در بارگذاری کاربران: {usersError.message}</div>;
        if (studentsError) return <div>خطا در بارگذاری دانش‌آموزان: {studentsError.message}</div>;

  return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">مدیریت کاربران</h2>
        <form onSubmit={handleUserSubmit} className="mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام"
            className="border p-2 mr-2"
          />
          <input
            type="email"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="ایمیل"
            className="border p-2 mr-2"
          />
          <button
            type="submit"
            disabled={userMutation.isPending}
            className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
          >
            {userMutation.isPending ? 'در حال افزودن...' : 'افزودن کاربر'}
          </button>
        </form>

        {userMutation.isError && <div className="text-red-500 mb-4">خطا: {userMutation.error.message}</div>}

        <form onSubmit={handlePostSubmit} className="mb-4">
          <select
            value={selectedUserId || ''}
            onChange={(e) => setSelectedUserId(Number(e.target.value) || null)}
            className="border p-2 mr-2"
          >
            <option value="">انتخاب کاربر</option>
            {users?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="محتوای پست"
            className="border p-2 mr-2"
          />
          <button
            type="submit"
            disabled={postMutation.isPending || !selectedUserId}
            className="bg-red-500 text-white p-2 rounded disabled:opacity-50"
          >
            {postMutation.isPending ? 'در حال افزودن...' : 'افزودن پست'}
          </button>
        </form>

        {postMutation.isError && <div className="text-red-500 mb-4">خطا: {postMutation.error.message}</div>}

        <ul>
          {users?.map((user) => (
            <li key={user.id} className="border-b py-2">
              <div>
                {user.name} - {user.user}
              </div>
              <ul className="ml-4">
                {user.posts?.map((post) => (
                  <li key={post.id} className="text-sm text-gray-600">
                    {post.content} (ایجاد شده در: {new Date(post.createdAt).toLocaleString('fa-IR')})
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">مدیریت دانش‌آموزان</h2>
        <form onSubmit={handleStudentSubmit} className="mb-4">
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="نام دانش‌آموز"
            className="border p-2 mr-2"
          />
          <input
            type="text"
            value={studentGrade}
            onChange={(e) => setStudentGrade(e.target.value)}
            placeholder="کلاس"
            className="border p-2 mr-2"
          />
          <input
            type="number"
            value={studentGpa}
            onChange={(e) => setStudentGpa(e.target.value)}
            placeholder="معدل"
            step="0.01"
            min="0"
            max="20"
            className="border p-2 mr-2"
          />
          <button
            type="submit"
            disabled={studentMutation.isPending}
            className="bg-purple-500 text-white p-2 rounded disabled:opacity-50"
          >
            {studentMutation.isPending ? 'در حال افزودن...' : 'افزودن دانش‌آموز'}
          </button>
        </form>

        {studentMutation.isError && <div className="text-red-500 mb-4">خطا: {studentMutation.error.message}</div>}

        <ul>
          {students?.map((student) => (
            <li key={student.id} className="border-b py-2">
              {student.name} - کلاس: {student.grade} - معدل: {student.gpa}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

