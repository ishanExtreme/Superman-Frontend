import React, { useEffect, useState } from "react";
import { getCompleteTaskCount, getIncompleteTaskCount, taskList } from "../api/apiSuper";
import Navbar from "../Components/Navbar";
import NavbarResponsive from "../Components/NavbarResponsive";
import NavPagesParent from "../Components/NavPagesParent";
import SmallCard from "../Components/SmallCards";
import TaskListCardSemi from "../Components/TaskListCardSemi";
import { User } from "../types/api/user";
import { tab, Task } from "../types/tasks";

const getTodaysDate = ()=>{

    let today = new Date()
    
    return today.toDateString()
}

const capitalize = (word:string|undefined)=>{

    if(word)
        return word.charAt(0).toUpperCase() + word.slice(1);
    else
        return ""
}

const tabs:tab[] = [
    {id:'pending', title:"To Do"},
    {id:'progress', title:"On Progress"},
    {id:'completed', title:"Done"}
]

const getTasks = async (
    setLoading:(load:boolean)=>void,
    setTask:(task:Task[])=>void, 
    filter:string, date:string, 
    search:string)=>{

        setLoading(true)
        let complete = ""
        if(filter === "completed")
            complete = "true"
        else if(filter === "pending")
            complete = "false"

        const filterList = {
            completed:complete,
            title:search,
            due_date:date
        }
        try{
        const tasks:Task[] = await taskList(filterList)

        setTask(tasks)
        }
        catch(error)
        {
            console.log(error)
        }
        setLoading(false)


}

const getTaskCompleteCountApiCall = async (
    setLoading:(load:boolean)=>void,
    setCount:(count:number)=>void, )=>{

        setLoading(true)
        try{

            const count = await getCompleteTaskCount()
            setCount(count.count)

        }
        catch(error)
        {
            console.log(error)
        }
        setLoading(false)
}

const getTaskIncompleteCountApiCall = async (
    setLoading:(load:boolean)=>void,
    setCount:(count:number)=>void, )=>{

        setLoading(true)
        try{

            const count = await getIncompleteTaskCount()
            setCount(count.count)

        }
        catch(error)
        {
            console.log(error)
        }
        setLoading(false)
}

export default function Dashboard(props:{currentUser:User}) {

    const [loading, setLoading] = useState(false)
    const [tasks, setTask] = useState<Task[]>([] as Task[])
    const [taskLoading, setTaskLoading] = useState(false)
    const [completeCountLoading, setCompleteCountLoading] = useState(false)
    const [completeCout, setCompleteCount] = useState(-1)
    const [incompleteCountLoading, setIncompleteCountLoading] = useState(false)
    const [incompleteCout, setincompleteCount] = useState(-1)

    useEffect(()=>{
        getTasks(setLoading, setTask, "pending", "", "")
        getTaskCompleteCountApiCall(setCompleteCountLoading, setCompleteCount)
        getTaskIncompleteCountApiCall(setIncompleteCountLoading, setincompleteCount)
    },[])


    const handleModifyTask = (type:string)=>{

        getTasks(setTaskLoading, setTask, type, "", "")

    }

    const renderTasks = ()=>{

        return (

            taskLoading?
            <div className="flex mt-10 w-full justify-center">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            :
           (
            tasks.length === 0?
            (<div className="mt-10 flex flex-row justify-center p-4 mx-auto bg-white shadow-lg rounded-2xl overflow-auto">
                <p>Nothing Found</p>
            </div>)
            :
           (<div className="flex flex-col mt-10 gap-y-5">
                {tasks.map((task, index)=>{

                    return(
                        <TaskListCardSemi key={index} task={task} />
                    )
                })}
            </div>)
            )
            

        )
    }

    return (
        <>
        {/* <Navbar user={props.currentUser} page="Home" /> */}
        <NavbarResponsive user={props.currentUser} page="Home"/>

        <NavPagesParent loading={loading}>
            <div className="flex flex-row justify-center gap-x-3">
                <h2 className="text-[50px] font-semibold text-red-700">
                    Super
                </h2>
                
                <h2 className="text-[50px] font-semibold text-yellow-400">
                    Task Manager
                </h2>
            </div>
            <p className="mt-10 text-gray-500 text-xl">{getTodaysDate()}</p>
            <p className="mt-3 text-2xl text-gray-600 font-semibold">Welcome To Your Dashboard, {` ${capitalize(props.currentUser?.username)}`}</p>
            <div className="flex flex-row gap-x-10 mt-10">
                <SmallCard 
                loading = {completeCountLoading}
                title="Completed Tasks" 
                content={completeCout.toString()} 
                end="Task Count" />
                <SmallCard 
                loading = {incompleteCountLoading}
                title="Incompleted Tasks" 
                content={incompleteCout.toString()} 
                end="Task Count" />
                <SmallCard 
                loading = {completeCountLoading}
                title="Inprogress Tasks" 
                content={incompleteCout.toString()} 
                end="Task Count" />
                <SmallCard 
                loading = {completeCountLoading || incompleteCountLoading}
                title="Total Tasks" 
                content={(completeCout + incompleteCout).toString()} 
                end="Task Count" />
            </div>
            <h1 className="font-semibold text-2xl mt-[100px]">My Tasks</h1>
           
            {/* Tab start */}
            <ul className="mt-5 nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <a href="#tabs-pending"
                    onClick={()=>handleModifyTask("pending")}
                    className="nav-link block font-semibold text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-white focus:border-transparent active" 
                    id="tabs-pending-tab" data-bs-toggle="pill" data-bs-target="#tabs-pending" role="tab" aria-controls="tabs-pending"
                    aria-selected="true">
                        To Do
                    </a>
                </li>

                <li className="nav-item" role="presentation">
                    <a href="#tabs-progress"
                    onClick={()=>handleModifyTask("pending")} 
                    className="nav-link block font-semibold text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-white focus:border-transparent" 
                    id="tabs-progress-tab" data-bs-toggle="pill" data-bs-target="#tabs-progress" role="tab" aria-controls="tabs-progress"
                    aria-selected="true">
                        On Progress
                    </a>
                </li>

                <li className="nav-item" role="presentation">
                    <a href="#tabs-done" 
                    onClick={()=>handleModifyTask("completed")}
                    className="nav-link block font-semibold text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-white focus:border-transparent" 
                    id="tabs-done-tab" data-bs-toggle="pill" data-bs-target="#tabs-done" role="tab" aria-controls="tabs-done"
                    aria-selected="true">
                        Done
                    </a>
                </li>
  
            </ul>       
        
            <div className="tab-content" id="tabs-tabContent">
                
                <div className="tab-pane fade show active" id="tabs-pending" role="tabpanel" aria-labelledby="tabs-pending-tab">
                    {renderTasks()}
                </div>
                <div className="tab-pane fade" id="tabs-progress" role="tabpanel" aria-labelledby="tabs-progress-tab">
                    {renderTasks()}
                </div>
                <div className="tab-pane fade" id="tabs-done" role="tabpanel" aria-labelledby="tabs-done-tab">
                    {renderTasks()}
                </div>
            </div>
            {/* Tab ends */}
    
        </NavPagesParent>
        </>
    );
}