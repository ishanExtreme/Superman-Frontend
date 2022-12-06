import { ChatIcon, KeyIcon } from "@heroicons/react/outline";
import React from "react";
import NavbarResponsive from "../Components/NavbarResponsive";
import NavPagesParent from "../Components/NavPagesParent";
import { User } from "../types/api/user";
import { navigate } from "raviger";

export default function Profile(props:{currentUser:User}) {

    const handleChangePasswordClick = ()=>{
        navigate("/change-password")
    }
    return(
        <>
        <NavbarResponsive user={props.currentUser} page="User"/>
        
        <NavPagesParent loading={false}>
            <div className="flex flex-col justify-center items-center gap-y-5 mt-10">

                    <button 
                    onClick={handleChangePasswordClick} 
                    type="button" 
                    className="h-10 px-6 pt-2.5 pb-2 bg-alpha-400 text-black font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-alpha-500 hover:shadow-lg focus:bg-alpha-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-alpha-600 active:shadow-lg transition duration-150 ease-in-out flex align-center items-center">
                        <KeyIcon className="h-5 w-5 mr-2" />
                        Change Password
                    </button>

                    <button 
                    // onClick={()=>changePasswordHelper(setLoading, oldPass, newPass)} 
                    type="button" 
                    className="h-10 px-6 pt-2.5 pb-2 bg-alpha-400 text-black font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-alpha-500 hover:shadow-lg focus:bg-alpha-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-alpha-600 active:shadow-lg transition duration-150 ease-in-out flex align-center items-center">
                        <ChatIcon className="h-5 w-5 mr-2" />
                        Enable Whatsapp Feature
                    </button>

            </div>

        </NavPagesParent>
        </>
    )

}