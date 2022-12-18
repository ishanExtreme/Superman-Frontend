import { KeyIcon, MailIcon, LoginIcon } from "@heroicons/react/outline";
import { navigate } from "raviger";
import React, { useEffect, useState } from "react";
import { passwordResetConfirm, passwordResetSendEmail } from "../api/apiSuper";
import FormField from "../Components/FormField";
import Loading from "../Components/Loading";
import NavPagesParent from "../Components/NavPagesParent";
import { triggerToast } from "../utils/notification";

const passwordResetHelper = async (
    setLoading:(load:boolean)=>void,
    token:string,
    password:string
    )=>{

        setLoading(true)
        
        try{
            await passwordResetConfirm(token, password)
        }
        catch {
            triggerToast("error", "Password Change Failed")
            setLoading(false)
            return
        }

        setLoading(false)

        triggerToast("success", "Password Reset Succesfull!")
        
}

export default function ForgotPassword2(props:{email:string}) {

    const [token, setToken] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [enableEmailSend, setEnableEmailSend] = useState(false)

    const handleChangeToken = (e:any)=>{
        setToken(e.target.value)
    }
    const handleChangePassword = (e:any)=>{
        setPassword(e.target.value)
    }

    const handleEmailSend = async ()=>{

        setEnableEmailSend(false)

        try{
            await passwordResetSendEmail(props.email)
        }
        catch(err)
        {
            triggerToast("error", "Error in sending email")
            return
        }
        triggerToast("success", "Email sent")
        setTimeout(()=>setEnableEmailSend(true), 30000)
    }

    // Send Email cooldown
    useEffect(()=>{
        const timer = setTimeout(()=>setEnableEmailSend(true), 30000)

        return ()=>{
            clearTimeout(timer)
        }
    },[])

    return (

        <>

        <NavPagesParent loading={false}>
            <div className="flex justify-center mt-10">
            <div className="block p-10 rounded-lg shadow-lg bg-white max-w-sm">
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2 text-center">Reset Password</h5>
                <FormField 
                handleChangeCB={handleChangeToken} 
                id="1" 
                label="Verification Token" 
                type="text"
                value={token}
                />

                <FormField 
                handleChangeCB={handleChangePassword} 
                id="2" 
                label="New Password" 
                type="password"
                value={password}
                />

                <div className="flex justify-center">
                    {loading?
                        <Loading />
                        :
                        <div className="flex flex-col">
                            <button 
                            onClick={()=>passwordResetHelper(setLoading, token, password)} 
                            type="button" 
                            className="h-10 px-6 pt-2.5 pb-2 bg-red-700 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-red-800 hover:shadow-lg focus:bg-red-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-lg transition duration-150 ease-in-out flex align-center items-center">
                                <KeyIcon className="h-5 w-5 mr-2" />
                                Reset Password
                            </button>

                            {enableEmailSend?
                            <button 
                            onClick={handleEmailSend} 
                            type="button" 
                            
                            className="h-10 mt-3 px-6 pt-2.5 pb-2 bg-red-700 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-red-800 hover:shadow-lg focus:bg-red-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-lg transition duration-150 ease-in-out flex align-center items-center">
                                <MailIcon className="h-5 w-5 mr-2" />
                                Resend Email
                            </button>
                            :
                            <button 
                            type="button" 
                            disabled={true}
                            className="h-10 mt-3 px-6 pt-2.5 pb-2 bg-gray-700 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-gray-800 hover:shadow-lg focus:bg-gray-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out flex align-center items-center">
                                <MailIcon className="h-5 w-5 mr-2" />
                                Resend Email
                            </button>
                            }


                            <button 
                            onClick={()=>navigate("/login")} 
                            type="button" 
                            className="h-10 mt-3 px-6 pt-2.5 pb-2 bg-red-700 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-red-800 hover:shadow-lg focus:bg-red-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-lg transition duration-150 ease-in-out flex align-center items-center">
                                <LoginIcon className="h-5 w-5 mr-2" />
                                Login Page
                            </button>
                        
                       
                        </div>
                        
                    }
                </div>
            </div>
            </div>
        </NavPagesParent>

    </>
        
    )
}