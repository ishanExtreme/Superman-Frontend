import React, { useState } from "react";
import { createStage } from "../api/apiSuper";
import FormField from "../Components/FormField";
import ModalParent from "../Components/ModalParent";
import TextAreaField from "../Components/TextAreaField";
import { Error, StageCreateApi, validateStageCreation } from "../types/api/task";



export default function CreateStage(props:{
    open:boolean
    toogleOpen: (open:boolean)=>void
    boardId:number
}) {

    const [submitLoading, setSubmitLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState<Error<StageCreateApi>>({})

    const handleChangeTitle = (e:any)=>{
        setTitle(e.target.value)
    }

    const handleChangeDescription = (e:any)=>{
        setDescription(e.target.value)
    }

    const handleSubmit = async ()=>{
        setSubmitLoading(true)

        const stage:StageCreateApi = {
            title:title, 
            description:description,
            board:props.boardId
        }

        // console.log(task)

        const validationError = validateStageCreation(stage)
        setError(validationError);

        // if user form is valid
        if(Object.keys(validationError).length === 0) {
            try {
                await createStage(stage)  
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
                {Object.keys(error).length !== 0 && <p className='text-red-600 text-center mt-10'>{error.title} <br/> {error.description} <br/> {error.board} </p>}
            </div>
        </ModalParent>
    );
}