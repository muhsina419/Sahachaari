import { apiClient } from "../api"

export const getUsers = ()=>{
    return apiClient.get('/user')
}

export const createUser = (data:any)=>{
    return apiClient.post('/user',data)
}

export const updateUser = (data:any)=>{
    return apiClient.put('/user',data)
}

export const deleteUser = (data:any)=>{
    return apiClient.delete('/user',{
        data: {id:data}
    })
}