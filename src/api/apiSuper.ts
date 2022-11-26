import { BoardCreateApi, StageCreateApi, TaskCreateApi } from "../types/api/task";
import { UserLoginApi, UserRegisterApi } from "../types/api/user";
import { triggerToast } from "../utils/notification";

const API_BASE_URL = "http://127.0.0.1:8000/api/"

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
            errors.forEach((error:string)=>{
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

export const getBoardsFiltered = (filter:any)=>{
    return request("board", 'GET', filter)
}

export const createBoard = (board:BoardCreateApi)=>{
    return request("board/", 'POST', board)
}

export const editBoard = (board_id:number, board:BoardCreateApi)=>{
    return request(`board/${board_id}/`, 'PUT', board, false)
}

export const getBoard = (board_id:number)=>{
    return request(`board/${board_id}`, 'GET')
}

export const createStage = (stage:StageCreateApi)=>{
    return request('stage/', 'POST', stage)
}

export const deleteStage = (stage_id:number)=>{
    return request(`stage/${stage_id}`, 'DELETE', {}, false)
}

export const changeTaskStage = (task_id:number, stage:number)=>{
    return request(`task/${task_id}/`, 'PATCH', {stage:stage}, false)
}

export const changePassword = (old_password:string, new_password:string)=>{
    return request("change-password/", "PATCH", {old_password:old_password, new_password:new_password}, false)
}

export const passwordResetSendEmail = (email:string)=>{
    return request("password-reset/", "POST", {email:email}, false)
}

export const passwordResetConfirm = (token:string, password:string)=>{
    return request("password-reset/confirm/", "POST", {token:token, password:password}, false)
}

