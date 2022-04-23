import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { User } from "../types/api/user";
import DropDownField from "../Components/DropDownField";
import FormField from "../Components/FormField";
import { Task } from "../types/tasks";
import TaskListingCard from "../Components/TaskListingCard";
import { taskList } from "../api/apiSuper";
import CreateTask from "../ModalForms/CreateTask";

const filters = ["All", "Completed", "Pending"]

const getTasks = async (
    setLoading:(load:boolean)=>void,
    setTask:(task:Task[])=>void, 
    filter:string, date:string, 
    search:string)=>{

        setLoading(true)
        let complete = ""
        if(filter === "Completed")
            complete = "true"
        else if(filter === "Pending")
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

export default function ListTask(props:{currentUser:User}) {

    const [filter, setFilter] = useState("");
    const [date, setDate] = useState("");
    const [search, setSearch] = useState("");
    const [tasks, setTask] = useState<Task[]>([] as Task[])
    const [loading, setLoading] = useState(false)
    const [openCreate, setOpenCreate] = useState(false)

    useEffect(()=>{
        getTasks(setLoading, setTask, "", "", "")
    },[])

    const handleFilterSelect = (option:string)=>{
        setFilter(option)
    }

    const handleDateChange = (e:any)=>{
        setDate(e.target.value)
    }

    const handleSearchChange = (e:any)=>{
        setSearch(e.target.value)
    }

    const handleModify = ()=>{
        getTasks(setLoading, setTask, filter, date, search)
    }

    const handleClearFilter = ()=>{
        getTasks(setLoading, setTask, "", "", "")
    }

    const handleOpenCreate = (open:boolean)=>{
        setOpenCreate(open)
    }

    return (
        <>
        <Navbar user={props.currentUser} page="Task" />
        <CreateTask open={openCreate} toogleOpen={handleOpenCreate} />
            


        <div className="w-full ml-[15rem] p-3 px-10">
            {loading?
            <div className="flex h-full justify-center items-center">
                <div className="spinner-border animate-spin inline-block w-20 h-20 border-4 rounded-full" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            :
            <>
                <h2 className="text-center text-[50px] font-semibold">All Tasks</h2>

                {/* Filter section */}
                <div className="grid grid-cols-2 mt-[50px]">
                    <div className="flex flex-row col-start-1 gap-x-[100px]"> 
                        <div className="inline-flex pt-3">
                            <DropDownField label="Filter" options={filters} handleSelectCB={handleFilterSelect}/>
                        </div>    
                        <FormField label="Date" id="1" type="date" value={date} handleChangeCB={handleDateChange} />
                        
                    </div>
                    <div className="flex flex-row justify-end col-start-2 gap-x-[100px]">
                        <FormField label="Search" id="2" type="text" value={search} handleChangeCB={handleSearchChange} />
                        <div className="inline-flex pt-2">
                            <div>
                                <button onClick={()=>handleOpenCreate(true)} type="button" className="px-6 pt-2.5 pb-2 bg-red-700 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-red-800 hover:shadow-lg focus:bg-red-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-lg transition duration-150 ease-in-out flex align-center items-center">
                                <img src={process.env.PUBLIC_URL + "/images/icons/add.png"} className="mr-2" />
                                Create Task
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-center gap-x-5">
                    <button onClick={handleModify} type="button" className="inline-block px-6 py-2.5 bg-yellow-400 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yello-500 hover:shadow-lg focus:bg-yellow-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-600 active:shadow-lg transition duration-150 ease-in-out">
                        Modify Result
                    </button>

                    <button onClick={handleClearFilter} type="button" className="inline-block px-6 py-2.5 bg-yellow-400 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yello-500 hover:shadow-lg focus:bg-yellow-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-600 active:shadow-lg transition duration-150 ease-in-out">
                        Clear Filters
                    </button>
                </div>

                <div className="flex flex-col mt-10 gap-y-5">
                    {tasks.map((task)=>{
                        return (
                            <TaskListingCard key={task.id} task={task} />
                        );
                    })}
                </div>
            </>
            }
        </div>
        </>
    );
}