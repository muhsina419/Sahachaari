import { useMutation } from "react-query"
import { createUser, deleteUser, updateUser } from "./userApi"


export const useCreateUser = ()=>{
    return useMutation((data)=>createUser(data))
}

export const useUpdateUser = ()=>{
    return useMutation((data)=>updateUser(data))
}

export const useDeleteUser = ()=>{
    return useMutation((data)=>deleteUser(data))
}