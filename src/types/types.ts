export interface studentTypeRes {
    id:number
    user:string
    password:string
    name:string
}
export interface studentTypeReq {
    user:string
    password:string
    name:string
}


export interface UserType {
    id: number;
  name: string;
  user: string;
  posts: PostType[];
  password:string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt: any;
}


export interface PostType{
    id: number;
  content: string;
  userId: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt: any;
}

export interface StudentType{
    id: number
    name:string
    grade: string
    gpa:number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createdAt:any
}
