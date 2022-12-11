import React, { useState } from "react";
import { verifyCode } from "../api/apiSuper";
import FormField from "../Components/FormField";
import ModalParent from "../Components/ModalParent";
import { validateVerification, VerificationApi } from "../types/api/task";
import { triggerToast } from "../utils/notification";
import { Error } from "../types/api/user";

const handleVerifyCodeApi = async (
    phone:string,
    code:string,
    setSubmitLoading: (loading:boolean)=>void,
    toogleOpen: (open:boolean)=>void
    )=>{
        
        try {
            await verifyCode(phone, code)
        } catch (error:any) {
            setSubmitLoading(false)
            return
        }

        setSubmitLoading(false)
        toogleOpen(false)
        window.location.reload()
        triggerToast("success", "Phone number added successfully")
    }

export default function CreateBoard(props:{
    open:boolean
    toogleOpen: (open:boolean)=>void
    phone:string
}) {

    const [verificationCode, setVerificationCode] = useState("")
    const [error, setError] = useState<Error<VerificationApi>>({})
    const [submitLoading, setSubmitLoading] = useState(false)

   const handleVerificationCodeChange = (e:any)=>{
        setVerificationCode(e.target.value)
    }

   
    const handleSubmit = ()=>{

        setSubmitLoading(true)

        const body:VerificationApi = {
            phone: props.phone,
            code: verificationCode
        }

        const validationError = validateVerification(body)
        setError(validationError)

        if(Object.keys(validationError).length !== 0)
        {    
            setSubmitLoading(false) 
            return
        }  
        
        handleVerifyCodeApi(props.phone, verificationCode, setSubmitLoading, props.toogleOpen)



    }

    return (
        <ModalParent loading={submitLoading} open={props.open} title="Verify Your Number" toogleOpen={props.toogleOpen} handleSubmit={handleSubmit}>
            <div className="flex flex-col ml-5 gap-y-2">
                <FormField id="1" label="Verification Code" type="number" handleChangeCB={handleVerificationCodeChange} value={verificationCode}/>
                {Object.keys(error).length !== 0 && <p className='text-red-600 text-center mt-10'>{error.code} <br/> {error.phone}</p>}
            </div>
        </ModalParent>
    )
}