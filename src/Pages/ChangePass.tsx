import React, { useState } from "react";
import FormField from '../Components/FormField'
import NavbarResponsive from "../Components/NavbarResponsive";
import NavPagesParent from "../Components/NavPagesParent";
import { User } from "../types/api/user";
import {KeyIcon} from '@heroicons/react/outline'
import { changePassword } from "../api/apiSuper";
import { triggerToast } from "../utils/notification";
import Loading from "../Components/Loading";

const changePasswordHelper = async (
    setLoading:(load:boolean)=>void,
    old_password:string,
    new_password:string
    )=>{
    setLoading(true)

    try{
        await changePassword(old_password, new_password)
    }
    catch(error)
    {
        triggerToast("error", "Password change failed")
        setLoading(false)
        return
    }

    setLoading(false)
    triggerToast("success", "Password changed succesfully")
}

export default function ChangePass(props:{currentUser:User}) {

const [oldPass, setOldPass] = useState("")
const [newPass, setNewPass] = useState("")
const [loading, setLoading] = useState(false)

const handleOldPassChange = (e:any)=>{
    setOldPass(e.target.value)
}

const handleNewPassChange = (e:any)=>{
    setNewPass(e.target.value)
}

return(

    <>
        <NavbarResponsive user={props.currentUser} page="User"/>

        <NavPagesParent loading={false}>
            <div className="flex justify-center mt-10">
            <div className="block p-10 rounded-lg shadow-lg bg-white max-w-sm">
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2 text-center">Change Password</h5>
                <FormField 
                handleChangeCB={handleOldPassChange} 
                id="1" 
                label="Current Password" 
                type="password"
                value={oldPass}
                />

                <FormField 
                handleChangeCB={handleNewPassChange} 
                id="2" 
                label="New Password" 
                type="password"
                value={newPass}
                />

                <div className="flex justify-center">
                    {loading?
                        <Loading />
                        :
                        <button 
                        onClick={()=>changePasswordHelper(setLoading, oldPass, newPass)} 
                        type="button" 
                        className="h-10 px-6 pt-2.5 pb-2 bg-red-700 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-red-800 hover:shadow-lg focus:bg-red-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-lg transition duration-150 ease-in-out flex align-center items-center">
                            <KeyIcon className="h-5 w-5 mr-2" />
                            Change Password
                        </button>
                    }
                </div>
            </div>
            </div>
        </NavPagesParent>

    </>

)

}