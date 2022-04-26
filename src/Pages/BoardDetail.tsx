import React, { useEffect, useState } from "react";
import { getBoard, stagesOfBoard, taskList } from "../api/apiSuper";
import DropDownField from "../Components/DropDownField";
import FormField from "../Components/FormField";
import ImageElement from "../Components/ImageElement";
import Navbar from "../Components/Navbar";
import NavPagesParent from "../Components/NavPagesParent";
import CreateStage from "../ModalForms/CreateStage";
import CreateTask from "../ModalForms/CreateTask";
import EditBoard from "../ModalForms/EditBoard";
import { StageApi } from "../types/api/task";
import { User } from "../types/api/user";
import { Board, Task } from "../types/tasks";
import { triggerToast } from "../utils/notification";
import {DragDropContext} from 'react-beautiful-dnd';
import StageColumn from "../Components/StageColumn";


const capitalize = (word:string|undefined)=>{

    if(word)
        return word.charAt(0).toUpperCase() + word.slice(1);
    else
        return ""
}

const getTasks = async (
    
    setLoading:(load:boolean)=>void,
    setTask:(task:Task[])=>void, 
    date:string,
    boardId?:number,
    setStage?:(stage:StageApi[])=>void,
    setBoard?:(board:Board)=>void)=>{

        setLoading(true)
        const filterList = {
            completed:false,
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
        if(boardId && setStage && setBoard)
        {
            getBoardFromId(boardId, setLoading, setStage,  setBoard)
        }
        else
        {
            setLoading(false)
        }


}

const getBoardFromId = async (
    boardId:number,
    setLoading:(load:boolean)=>void,
    setStage:(stage:StageApi[])=>void, 
    setBoard:(board:Board)=>void)=>{

        setLoading(true)
        try{

            const board:Board = await getBoard(boardId)
            setBoard(board)
        }
        catch(error)
        {
            setLoading(false)
        }

        getStageApiCall(setLoading, setStage, boardId);


}

const getStageApiCall =async (
    setLoading:(load:boolean)=>void, 
    setStage:(stage:StageApi[])=>void, 
    boardId:number)=>{
    
        try{
            const stage:StageApi[] = await stagesOfBoard(boardId);
    
            setStage(stage)
        }
        catch(error){
            console.log(error)
        }
        
       
        setLoading(false)
}
    

export default function BoardDetail(props:{boardId:number, currentUser:User}){

    const [loading, setLoading] = useState(false)
    const [board, setBoard] = useState<Board | null>(null)
    const [openEdit, setOpenEdit] = useState(false)
    const [openCreate, setOpenCreate] = useState(false)
    const [openStageCreate, setOpenStageCreate] = useState(false)
    const [stages, setStages] = useState<StageApi[]>([] as StageApi[])
    const [date, setDate] = useState("")
    const [tasks, setTasks] = useState<Task[]>([] as Task[])

    useEffect(()=>{
        getTasks(setLoading, setTasks, "", props.boardId, setStages, setBoard)
    },[])

    const openEditToogle = (open:boolean)=>{
        setOpenEdit(open)
    }

    const openCreateToogle = (open:boolean)=>{
        setOpenCreate(open)
    }

    const openStageCreateToogle = (open:boolean)=>{
        setOpenStageCreate(open)
    }

    const getStageTitle:()=>string[] = ()=>{
        
        const options:string[] =  stages.map((stage)=>stage.title)

        return ["ALL", ...options]
    }

    const handleFilterSelect = async (option:string)=>{

        if(option === "ALL")
        {
            setLoading(true)
            await getStageApiCall(setLoading, setStages, props.boardId)
            triggerToast("info", "Showing All Stages")      
        }
        else
        {
            setStages(stages.filter((stage)=>{
                return stage.title === option
            }))

            triggerToast("info", `Showing ${option} Stage`)
        }
    }

    const handleDateChange = (e:any)=>{
        setDate(e.target.value)
    }

    const modifyResult = async ()=>{
        await getTasks(setLoading, setTasks, date)
        triggerToast("info", "Tasks Filtered")
    }

    const handleClearFilter = async ()=>{
        await getTasks(setLoading, setTasks, "", props.boardId, setStages, setBoard) 
        setDate("")
        triggerToast("info", "Filters Cleared")  
    }

    return (
       <>
       <Navbar user={props.currentUser} page="Board" />

       <NavPagesParent loading={loading}>
            {board === null?
            <div className="mt-10 flex flex-row justify-center p-4 mx-auto bg-white shadow-lg rounded-2xl overflow-auto">
                <p>Nothing Found</p>
            </div>
            :
            <>
            <EditBoard board={board} open={openEdit} toogleOpen={openEditToogle} />
            <CreateTask open={openCreate} toogleOpen={openCreateToogle} />
            <CreateStage open={openStageCreate} toogleOpen={openStageCreateToogle} boardId={board.id} />
            <h2 className="text-center text-[50px] font-semibold text-red-700">Board</h2>
            <div className="flex flex-row gap-x-5 items-center">
                <p className="mt-3 text-2xl text-black font-bold">{capitalize(board.title)}</p>
                <button onClick={()=>openEditToogle(true)} type="button" className="mt-2 inline-block shadow-md w-7 h-7">
                    <ImageElement 
                    src={process.env.PUBLIC_URL + "/images/icons/edit.png"} 
                    alt="edit"
                    className="w-[30px]"
                    height="30px"
                    width="30px"
                    />
                </button>
            </div>

            {/* Filter section */}
            <div className="grid grid-cols-2 mt-[50px]">
                <div className="flex flex-row col-start-1 gap-x-[100px]"> 
                    <div className="inline-flex pt-3">
                        <DropDownField label="Filter Stage" options={getStageTitle()} handleSelectCB={handleFilterSelect}/>
                    </div>    
                    <FormField label="Date" id="1" type="date" value={date} handleChangeCB={handleDateChange} />
                    
                </div>
                <div className="flex flex-row justify-end col-start-2 gap-x-[100px]">
                    <div className="inline-flex pt-2">
                        <div>
                            <button onClick={()=>openStageCreateToogle(true)} type="button" className="px-6 pt-2.5 pb-2 bg-red-700 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-red-800 hover:shadow-lg focus:bg-red-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-lg transition duration-150 ease-in-out flex align-center items-center">
                            <img src={process.env.PUBLIC_URL + "/images/icons/add.png"} className="mr-2" alt="Add"/>
                            Add Stage
                            </button>
                        </div>
                    </div>

                    <div className="inline-flex pt-2">
                        <div>
                            <button onClick={()=>openCreateToogle(true)} type="button" className="px-6 pt-2.5 pb-2 bg-red-700 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-red-800 hover:shadow-lg focus:bg-red-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-lg transition duration-150 ease-in-out flex align-center items-center">
                            <img src={process.env.PUBLIC_URL + "/images/icons/add.png"} className="mr-2" alt="Add"/>
                            Create Task
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-x-5">
                <button onClick={modifyResult} type="button" className="inline-block px-6 py-2.5 bg-yellow-400 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yello-500 hover:shadow-lg focus:bg-yellow-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-600 active:shadow-lg transition duration-150 ease-in-out">
                    Modify Result
                </button>

                <button onClick={handleClearFilter} type="button" className="inline-block px-6 py-2.5 bg-yellow-400 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yello-500 hover:shadow-lg focus:bg-yellow-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-600 active:shadow-lg transition duration-150 ease-in-out">
                    Clear Filters
                </button>
            </div>
            {
            stages.length === 0?
            <div className="mt-10 flex flex-row justify-center p-4 mx-auto bg-white shadow-lg rounded-2xl overflow-auto">
                <p>Nothing Found</p>
            </div>
            :
            <div className="grid grid-cols-3 mt-10 gap-y-3">
                {stages.map((stage, index)=>(
                    <StageColumn key={stage.id} stage={stage}  task={tasks[0]}/>
                ))}
            </div>
            }

            </>
            }
       </NavPagesParent>
       </>
    )
}