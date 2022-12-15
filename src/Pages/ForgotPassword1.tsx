import { MailIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { passwordResetSendEmail } from "../api/apiSuper";
import FormField from "../Components/FormField";
import Loading from "../Components/Loading";
import NavPagesParent from "../Components/NavPagesParent";
import { triggerToast } from "../utils/notification";
import ForgotPassword2 from "./ForgotPassword2";


export default function ForgotPassword1() {

    const [email, setEmail] = useState("")
    const [step2, setStep2] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChangeEmail = (e:any)=>{
        setEmail(e.target.value)
    }

    const handleEmailSend = async ()=>{

        setLoading(true)

        if(email === "")
        {
            triggerToast("error", "Please enter an email")
            setLoading(false)
            return
        }

        try{
            await passwordResetSendEmail(email)
            setLoading(false)
        }
        catch(err)
        {
            triggerToast("error", "Error in sending email")
            setLoading(false)
            return
        }
        setStep2(true)
        triggerToast("success", "Email sent")
    }

    if(step2)
    return (
        <ForgotPassword2 email={email}/>
    )
    else
        return (
            
            <>

            <NavPagesParent loading={false}>
                <div className="flex justify-center mt-10">
                <div className="block p-10 rounded-lg shadow-lg bg-white max-w-sm">
                    <p className="text-gray-900 text-l leading-tight font-medium mb-2 text-center">Enter the email with which your account was created.</p>
                    <FormField 
                    handleChangeCB={handleChangeEmail} 
                    id="1" 
                    label="Email" 
                    type="email"
                    value={email}
                    />

                    <div className="flex justify-center">
                        {loading?
                        <Loading />
                        :
                        <button 
                        onClick={handleEmailSend} 
                        type="button" 
                        className="h-10 px-6 pt-2.5 pb-2 bg-red-700 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-red-800 hover:shadow-lg focus:bg-red-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-lg transition duration-150 ease-in-out flex align-center items-center">
                            <MailIcon className="h-5 w-5 mr-2" />
                            Send Email
                        </button>
                        }
                        
                    </div>
                </div>
                </div>
            </NavPagesParent>

            </>
            
        )
}