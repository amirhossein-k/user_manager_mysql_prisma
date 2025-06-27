"use client";

import { studentTypeReq, studentTypeRes } from "@/types/types";
import { useMutation,
    //  useQuery, 
     useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const PutStudent = async (credentials: {
  name: string;
  password: string;
  user: string;
}): Promise<studentTypeRes> => {
  const res = await fetch("/api/mysql/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return res.json();
};

const Student = () => {
  const [user, SetUser] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userDetail, SetUserDetail] = useState<studentTypeReq>();
  const [name, SetName] = useState<string>("");
  const [password, SetPassword] = useState<string>("");

  const queryClient = useQueryClient();
  // مدیریت اضافه کردن دانش اموز
  const mutation = useMutation({
    mutationFn: PutStudent,
    onSuccess: (data) => {
      SetUserDetail(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      SetUserDetail({name:"",password:"",user:""})
      SetPassword("")
      SetName('')
    },
  });
  async function handleSubmitt(e: React.FormEvent) {
    e.preventDefault();

    mutation.mutate({ name, password, user });
  }
  // const {data} = useQuery({
  //     queryKey:["student"],
  //     queryFn:()=>PutStudent(),
  //     staleTime:60*1000
  // })

  return (
    <form onSubmit={handleSubmitt} className="space-y-4 text-black">
      <div className=" flex flex-col gap-5 bg-gray-400  justify-center items-center h-screen w-full">
        <div className="border px-3 py-2 flex gap-3 flex-col">
          <div className="name text-center justify-center items-center flex gap-3">
            <label htmlFor="name" className="flex-1">
              Name:
            </label>
            <input
              value={name}
              onChange={(e) => SetName(e.target.value)}
              type="text"
              name="name"
              id="name"
              className="p-2 border-2"
              placeholder="name"
            />
          </div>
          <div className="name text-center justify-center items-center flex gap-3">
            <label htmlFor="user" className="flex-1">
              user:
            </label>
            <input
              value={user}
              onChange={(e) => SetUser(e.target.value)}
              type="text"
              name="user"
              id="user"
              className="p-2 border-2"
              placeholder="user"
            />
          </div>
          <div className="password flex justify-center items-center gap-3">
            <label htmlFor="password" className="flex-1">
              Password:
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
              name="password"
              id="password"
              className="p-2 border-2"
              placeholder="password"
            />
          </div>
          <div className="sumbit bg-blue-400 text-center px-3 py-2 ">
            <button
              className="text-white font-bold text-lg border rounded-lg px-2 py-2 inline w-full bg-blue-500"
              // disabled={loading}

              type="submit"
            >
              ثبت
              {/* {loading ? 'در حال ثبت‌نام...' : 'ثبت‌نام'} */}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Student;
