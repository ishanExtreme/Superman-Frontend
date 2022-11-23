import React, { useEffect, useState } from "react";
import { changeTaskStage, getBoard, stagesOfBoard, taskList } from "../api/apiSuper";
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
import {DragDropContext, DropResult} from 'react-beautiful-dnd';
import StageColumn from "../Components/StageColumn";
import NavbarResponsive from "../Components/NavbarResponsive";
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/outline";


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

    const handleTaskStageChane = async (taskId:number, stage:number)=>{

        try{
            await changeTaskStage(taskId, stage)
            triggerToast("info", "Stage Changed")  
        }
        catch(error)
        {

        }
    }

    const onDragEnd = (result:DropResult) => {
        const {destination, source, draggableId} = result;
        if (!destination) {
          return;
        }
        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        ) {
          return;
        }
        const newStage:StageApi = stages.filter((stage)=>stage.id === Number(destination.droppableId))[0];

        setTasks(
            tasks.map((task)=>{
                if(task.id === Number(draggableId))
                {
                    task.stage_name = newStage.title
                    handleTaskStageChane(task.id, newStage.id)
                }
                
                return task
            })
        )

        // const newHeroIds = Array.from(column.heroIds);
        // newHeroIds.splice(source.index, 1);
        // newHeroIds.splice(destination.index, 0, draggableId);
        // const newColumn = {
        //   ...column,
        //   heroIds: newHeroIds,
        // };
        // const newState = {
        //   ...this.state,
        //   columns: {
        //     ...this.state.columns,
        //     [newColumn.id]: newColumn,
        //   },
        // };
        // this.setState(newState);
      };

    return (
       <>
       {/* <Navbar user={props.currentUser} page="Board" /> */}
       <NavbarResponsive user={props.currentUser} page="Board"/>

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
            <div className="flex flex-row gap-x-2 items-center">
                <p className="text-2xl text-black font-bold">{capitalize(board.title)}</p>
                   <PencilIcon onClick={()=>openEditToogle(true)} className="w-6 h-6 cursor-pointer text-alpha-400" />
                
            </div>

            {/* Filter section */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 mt-[50px]">
                <div className="flex flex-col items-center gap-y-3 lg:flex lg:flex-row lg:col-start-1 lg:items-start lg:gap-x-[100px]"> 
                    <div className="inline-flex pt-3">
                        <DropDownField label="Filter Stage" options={getStageTitle()} handleSelectCB={handleFilterSelect}/>
                    </div>    
                    <FormField label="Date" id="1" type="date" value={date} handleChangeCB={handleDateChange} />
                    
                </div>
                <div className="flex flex-col gap-y-3 items-center lg:flex lg:flex-row lg:justify-end lg:items-start lg:col-start-2 lg:gap-x-[100px]">
                    <div className="inline-flex pt-2">
                        <div>
                            <button onClick={()=>openStageCreateToogle(true)} type="button" className="px-6 pt-2.5 pb-2 bg-red-700 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-red-800 hover:shadow-lg focus:bg-red-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-lg transition duration-150 ease-in-out flex align-center items-center">
                            <PlusCircleIcon className="h-5 w-5 mr-2" />
                            Add Stage
                            </button>
                        </div>
                    </div>

                    <div className="inline-flex pt-2">
                        <div>
                            <button onClick={()=>openCreateToogle(true)} type="button" className="px-6 pt-2.5 pb-2 bg-red-700 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-red-800 hover:shadow-lg focus:bg-red-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-lg transition duration-150 ease-in-out flex align-center items-center">
                            <PlusCircleIcon className="h-5 w-5 mr-2" />
                            Create Task
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-x-5 mt-3">
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
            <div className="flex flex-row overflow-x-auto gap-x-3 lg:grid lg:grid-cols-3 mt-10 lg:gap-y-3">
                <DragDropContext onDragEnd={onDragEnd}>
                    {stages.map((stage, index)=>{
                        
                        const stageTasks = tasks.filter((task)=>task.stage_name === stage.title)
                        return(
                        <StageColumn key={stage.id} stage={stage} tasks={stageTasks}/>
                        )
                    })}
                </DragDropContext>
            </div>
            }

            </>
            }
       </NavPagesParent>
       </>
    )
}