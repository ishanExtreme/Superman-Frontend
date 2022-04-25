import { TaskCreateApi } from "../types/api/task";
import { UserLoginApi, UserRegisterApi } from "../types/api/user";
import { triggerToast } from "../utils/notification";

const API_BASE_URL = "https://superman-api.herokuapp.com/api/"

type RequestMethod = 'POST' | 'GET' | 'PATCH' | 'DELETE' | 'PUT'

const request = async (endpoint: string, method:RequestMethod = 'GET', data:any = {}, returnData:boolean = true)=>{

    let url;
    let payload;
    if(method === 'GET')
    {
        const requestParams = data ? `?${Object.keys(data).map(key => `${key}=${data[key]}`).join('&')}`:""
        url = `${API_BASE_URL}${endpoint}${requestParams}`
        payload = null
    } else {
        url = `${API_BASE_URL}${endpoint}`
        payload = data? JSON.stringify(data) : null;
    }

    // Basic Authentication
    // const auth = "BASIC " + window.btoa("extreme:Ishan@2605");

    // Token Based Authentication
    const token = localStorage.getItem("token");
    let auth = token ? "Token " + token : "";

    if(!token && endpoint === "user/me")
        return

    let response
    if(token)
    {
        response = await fetch(
            url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: auth,
            },

            body: (method !== 'GET') ? payload : null
            
        })
    }
    else
    {
        response = await fetch(
            url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },

            body: (method !== 'GET') ? payload : null
            
        })
    }
    

    if(response.ok) {
        if(returnData)
        {
            const json = await response.json();
            return json;
        }
    } else {
        const errorJson = await response.json()
        Object.values(errorJson).forEach((errors:any)=>{
            errors.map((error:string)=>{
                triggerToast("error", error)
            })
        })
        throw Error(errorJson);

    }
} 

export const register = (user:UserRegisterApi)=> {
    return request('user/register/', 'POST', user)
}

export const login = (user:UserLoginApi)=> {
    return request('token', 'POST', user)
}

export const me = ()=>{
    return request('user/me', 'GET')
}

export const taskList = (filters:any)=>{
    return request('task', 'GET', filters)
}

export const stagesOfBoard = (board_id:number)=>{
    return request(`board/${board_id}/stage`, 'GET')
}

export const createTask = (task:TaskCreateApi)=>{
    return request('task/', 'POST', task)
}

export const getBoards = ()=>{
    return request('board', 'GET')
}

export const deleteTask = (task_id:number)=>{
    return request(`task/${task_id}`, 'DELETE', {}, false)
}

export const editTask = (task_id:number, task:TaskCreateApi)=>{
    return request(`task/${task_id}/`, 'PUT', task, false)
}

export const toogleTaskComplete = (task_id:number,completed:boolean)=>{
    return request(`task/${task_id}/`, 'PATCH', {completed:completed}, false)
}

export const getCompleteTaskCount = ()=>{
    return request(`count/task_complete`, 'GET')
}

export const getIncompleteTaskCount = ()=>{
    return request(`count/task_incomplete`, 'GET')
}