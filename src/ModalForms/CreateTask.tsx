import React, { useEffect, useState } from "react";
import FormField from "../Components/FormField";
import TextAreaField from "../Components/TextAreaField";
import ModalParent from '../Components/ModalParent'
import { BoardApi, StageApi, TaskCreateApi, validateTaskCreation } from "../types/api/task";
import { createTask, getBoards, stagesOfBoard } from "../api/apiSuper";
import DropDownField from "../Components/DropDownField";
import { Error } from "../types/api/user";


const getBoardsApiCall = async (setLoading:(load:boolean)=>void, 
setBoards:(board:BoardApi[])=>void)=>{

    setLoading(true)
    try{

        const boards:BoardApi[] = await getBoards()

        setBoards(boards)
    }
    catch(error)
    {
        console.log(error)
    }

    setLoading(false)
}

const getStageApiCall =async (
setLoading:(load:boolean)=>void, 
setStage:(stage:StageApi[])=>void, 
boardId:number)=>{

    setLoading(true)

    try{
        const stage:StageApi[] = await stagesOfBoard(boardId);

        setStage(stage)
    }
    catch(error){
        console.log(error)
    }
    
   
    setLoading(false)

}

export default function(props:{
    open:boolean,
    toogleOpen: (open:boolean)=>void
}) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState("")
    const [boardObjects, setBoardObjects] = useState<BoardApi[]>([] as BoardApi[])
    const [boardId, setBoardId] = useState(-1)
    const [stageObjects, setStageObjects] = useState<StageApi[]>([] as StageApi[])
    const [stage, setStage] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [boardLoading, setBoardLoading] = useState(false)
    const [stageLoading, setStageLoading] = useState(false)
    const [error, setError] = useState<Error<TaskCreateApi>>({})
    const [submitLoading, setSubmitLoading] = useState(false)

    useEffect(()=>{
        getBoardsApiCall(setBoardLoading, setBoardObjects)
    },[])

    useEffect(()=>{
        getStageApiCall(setStageLoading, setStageObjects, boardId)
    },[boardId])

    const handleTitleChange = (e:any)=>{
        setTitle(e.target.value)
    }

    const handleDescriptionChange = (e:any)=>{
        setDescription(e.target.value)
    }

    const handlePriorityChange = (e:any)=>{
        setPriority(e.target.value)
    }


    const getBoardOptions = ()=>{
        const options:string[] = boardObjects.map((board)=>{
            return board.title
        })

        return options
    }

    const getStageOptions = ()=>{
        const options:string[] = stageObjects.map((stage)=>{
            return stage.title
        })

        return options
    }

    const handleBoardSelect = (option:string)=>{
        boardObjects.forEach((board)=>{
            if(board.title === option)
                setBoardId(board.id)
        })
    }

    const handleStageSelect = (option:string)=>{
        stageObjects.forEach((stage)=>{
            if(stage.title === option)
                setStage(stage.id.toString())
        })
    }

    const handleDueDateChange = (e:any)=>{
        setDueDate(e.target.value)
    }

    const handleClickStage = ()=>{
        if(boardId === -1)
            setError({stage:"Please select  a board"})
    }

    const handleSubmit = async ()=>{

        setSubmitLoading(true)
        if(stage === "")
        {
            setSubmitLoading(false)
            setError({stage:"Please select a stage"})
        }
        const task:TaskCreateApi = {
            title:title, 
            description:description, 
            due_date:dueDate,
            priority: parseInt(priority),
            stage: parseInt(stage)    
        }

        // console.log(task)

        const validationError = validateTaskCreation(task)
        setError(validationError);

        // if user form is valid
        if(Object.keys(validationError).length === 0) {
            try {
                const data = await createTask(task)  
                window.location.reload()
            } 
            catch(error)
            {
                console.log(error)
                // triggerToast("error", "Server Error, Please try again later.")
            }
        }
        else {
            // if(validationError.username)
            //     triggerToast("warning", `${validationError.username}`)
            // if(validationError.password)
            //     triggerToast("warning", `${validationError.password}`)
        }

        setBoardLoading(false)
    }

    return (
        <ModalParent loading={submitLoading} open={props.open} title="Create Task" toogleOpen={props.toogleOpen} handleSubmit={handleSubmit}>
            <div className="flex flex-col ml-5 gap-y-2">
                <FormField id="1" label="Title" type="text" value={title} handleChangeCB={handleTitleChange}/>
                <TextAreaField id="2" label="Description" value={description} handleChangeCB={handleDescriptionChange}/>
                <FormField id="3" label="Priority" type="number" value={priority}  handleChangeCB={handlePriorityChange}/>
                {/* Board Choices */}
                <div className="flex flex-row justify-center items-center">
                    {boardLoading?
                    <>
                    <p className="mr-3 text-yellow-400">Fetching Boards</p>
                    <div className="spinner-border animate-spin inline-block w-8 h-8 text-yellow-400 border-4 rounded-full" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    </>
                    :
                    <DropDownField  label="Select Board" options={getBoardOptions()} handleSelectCB={handleBoardSelect}/>
                    }
                </div>
                {/* Stage Choices */}
                <div className="flex flex-row justify-center items-center">
                    {boardLoading || stageLoading?
                    <>
                    <p className="mr-3 text-yellow-400">Fetching Stages</p>
                    <div className="spinner-border animate-spin inline-block w-8 h-8 text-yellow-400 border-4 rounded-full" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    </>
                    :
                    <DropDownField handleDropDownClickCB={handleClickStage}  label="Select Stage" options={getStageOptions()} handleSelectCB={handleStageSelect}/>
                    }
                </div>
                <FormField id="4" label="Due Date" type="date" value={dueDate} handleChangeCB={handleDueDateChange} />
                
                {Object.keys(error).length !== 0 && <p className='text-yellow-400 text-center mt-10'>{error.title} <br/> {error.description} <br/> {error.priority} <br/> {error.stage} <br/> {error.due_date}</p>}
            </div>
        </ModalParent>
    );
}