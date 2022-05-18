import React, { useEffect, useState } from "react";
import { User } from "../types/api/user";
import DropDownField from "../Components/DropDownField";
import FormField from "../Components/FormField";
import { Task } from "../types/tasks";
import TaskListingCard from "../Components/TaskListingCard";
import { taskList } from "../api/apiSuper";
import CreateTask from "../ModalForms/CreateTask";
import NavPagesParent from "../Components/NavPagesParent";
import { triggerToast } from "../utils/notification";
import NavbarResponsive from "../Components/NavbarResponsive";
import {PlusCircleIcon} from '@heroicons/react/outline'
import {motion} from 'framer-motion'
import DropDownSelect from "../Components/DropdownSelect";

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
            // console.log(error)
        }
        setLoading(false)


}

export default function ListTask(props:{currentUser:User}) {

    const [filter, setFilter] = useState("All");
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

    const handleModify = async ()=>{
        await getTasks(setLoading, setTask, filter, date, search)
        triggerToast("info", "Tasks Filtered")
    }

    const handleClearFilter = async ()=>{
        await getTasks(setLoading, setTask, "", "", "")
        setDate("")
        setFilter("All")
        setSearch("")
        triggerToast("info", "Filters Cleared")
    }

    const handleOpenCreate = (open:boolean)=>{
        setOpenCreate(open)
    }

    return (
        <>
        {/* <Navbar user={props.currentUser} page="Task" /> */}
        <NavbarResponsive user={props.currentUser} page="Task"/>

        <CreateTask open={openCreate} toogleOpen={handleOpenCreate} />
            


        

        <NavPagesParent loading={loading}>
        
            <h2 className="text-center text-[25px] sm:text-[30px] lg:text-[50px] font-semibold text-beta-700">All Tasks</h2>

            {/* Filter section */}
            <div className="flex flex-col justify-center lg:grid lg:grid-cols-2 mt-[50px]">
                <div className="flex flex-col justify-center gap-y-3 lg:flex-row lg:col-start-1 lg:gap-x-[100px]"> 
                    <div className="inline-flex justify-center pt-3">
                        <DropDownSelect label={filter} options={filters} handleSelectCB={handleFilterSelect}/>
                    </div>    
                    <FormField label="Date" id="1" type="date" value={date} handleChangeCB={handleDateChange} />       
                </div>

                <div className="flex flex-col mb-3 justify-center lg:flex-row lg:justify-end lg:col-start-2 lg:gap-x-[100px]">
                    <FormField label="Search" id="2" type="text" value={search} handleChangeCB={handleSearchChange} />
                    <div className="inline-flex justify-center pt-2">
                        <div>
                            <button onClick={()=>handleOpenCreate(true)} type="button" className="px-6 pt-2.5 pb-2 bg-beta-700 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-beta-800 hover:shadow-lg focus:bg-beta-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-beta-900 active:shadow-lg transition duration-150 ease-in-out flex align-center items-center">
                            <PlusCircleIcon className="h-5 w-5 mr-2" />
                            Create Task
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-x-5">
                <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleModify} 
                type="button" 
                className="inline-block px-6 py-2.5 bg-yellow-400 text-secondary-600 font-medium text-xs leading-tight uppercase rounded shadow-md">
                    Modify Result
                </motion.button>

                <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClearFilter} 
                type="button" 
                className="inline-block px-6 py-2.5 bg-yellow-400 text-secondary-600 font-medium text-xs leading-tight uppercase rounded shadow-md">
                    Clear Filters
                </motion.button>
            </div>

            <div className="flex flex-row flex-wrap justify-center md:justify-between lg:flex-col mt-10 gap-y-5 gap-x-5">
                {tasks.length === 0?
                <div className="mt-10 flex flex-row justify-center p-4 mx-auto bg-white shadow-lg rounded-2xl overflow-auto">
                    <p>Nothing Found</p>
                </div>
                :
                tasks.map((task)=>{
                    return (
                        <TaskListingCard key={task.id} task={task} />
                    );
                })
                }
            </div>

        </NavPagesParent>
            
        
        </>
    );
}