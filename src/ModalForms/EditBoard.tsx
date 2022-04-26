import React, { useState } from "react";
import { createBoard, editBoard } from "../api/apiSuper";
import FormField from "../Components/FormField";
import ModalParent from "../Components/ModalParent";
import TextAreaField from "../Components/TextAreaField";
import { BoardCreateApi, Error, validateBoardCreation } from "../types/api/task";
import { Board } from "../types/tasks";
import { triggerToast } from "../utils/notification";

export default function EditBoard(props:{
    open:boolean
    toogleOpen: (open:boolean)=>void
    board:Board
}) {

    const [submitLoading, setSubmitLoading] = useState(false)
    const [title, setTitle] = useState(props.board.title)
    const [description, setDescription] = useState(props.board.description)
    const [error, setError] = useState<Error<BoardCreateApi>>({})

    const handleChangeTitle = (e:any)=>{
        setTitle(e.target.value)
    }

    const handleChangeDescription = (e:any)=>{
        setDescription(e.target.value)
    }

    const handleSubmit = async ()=>{
        
        setSubmitLoading(true)

        const board:BoardCreateApi = {
            title:title, 
            description:description,
        }

        // console.log(task)

        const validationError = validateBoardCreation(board)
        setError(validationError);

        // if user form is valid
        if(Object.keys(validationError).length === 0) {
            try {
                await editBoard(props.board.id, board)  
                window.location.reload()
        
            } 
            catch(error)
            {
                // console.log(error)
                // triggerToast("error", "Server Error, Please try again later.")
            }
        }
        else {
            // if(validationError.username)
            //     triggerToast("warning", `${validationError.username}`)
            // if(validationError.password)
            //     triggerToast("warning", `${validationError.password}`)
        }

        setSubmitLoading(false)
        // triggerToast("success", "Task created successfully!")
    }

    return (
        <ModalParent loading={submitLoading} open={props.open} title="Create Board" toogleOpen={props.toogleOpen} handleSubmit={handleSubmit}>
            <div className="flex flex-col ml-5 gap-y-2">
                <FormField id="1" label="Title" type="text" handleChangeCB={handleChangeTitle} value={title}/>
                <TextAreaField id="2" label="Description" handleChangeCB={handleChangeDescription} value={description}/>
                {Object.keys(error).length !== 0 && <p className='text-yellow-400 text-center mt-10'>{error.title} <br/> {error.description}</p>}
            </div>
        </ModalParent>
    )
}