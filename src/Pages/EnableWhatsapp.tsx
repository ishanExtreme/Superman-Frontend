import { PhoneIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import CustomSwitch from "../Components/CustomSwitch";
import FormField from "../Components/FormField";
import Loading from "../Components/Loading";
import NavbarResponsive from "../Components/NavbarResponsive";
import NavPagesParent from "../Components/NavPagesParent";
import { User } from "../types/api/user";

export default function EnableWhatsapp(props:{currentUser:User}) {

    const [phone, setPhone] = useState<string>(props.currentUser && props.currentUser.number?props.currentUser.number:"")

    const handleChangePhone = (e:any)=>{
        setPhone(e.target.value)
    }

    // const sanitizePhoneNumber = (phone:string)=>{
    //     if(phone[0] === "0")
    //     {
    //         phone = phone.substring(1,)
    //     }

    //     if(phone[0] !== "+")
    //     {
    //         phone = "+91"+phone
    //     }

    //     let pattern = /^(+91)\d{10}/
    // }

    return(
    <>
    <NavbarResponsive user={props.currentUser} page="User"/>

    <NavPagesParent loading={false}>
        <div className="flex justify-center mt-10">
            <div className="block p-10 rounded-lg shadow-lg bg-white max-w-sm">
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-3 text-center">Whatsapp Feature</h5>
                <FormField 
                handleChangeCB={handleChangePhone} 
                id="1" 
                label="Whatsapp number" 
                type="tel"
                value={phone}
                />

                <div className="flex justify-center">
                    {false?
                        <Loading />
                        :
                        <button 
                        // onClick={()=>changePasswordHelper(setLoading, oldPass, newPass)} 
                        type="button" 
                        className="h-10 px-6 pt-2.5 pb-2 bg-red-700 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-red-800 hover:shadow-lg focus:bg-red-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-lg transition duration-150 ease-in-out flex align-center items-center">
                            <PhoneIcon className="h-5 w-5 mr-2" />
                            Add/Change Number
                        </button>
                    }
                </div>

                <div className="border border-alpha-400 mt-3 mb-3"></div>
                
                <div className="flex flex-col gap-y-3 items-start">
                    <CustomSwitch 
                    title="Enable Whatsapp Feature"
                    enable={props.currentUser?props.currentUser.wa_sending:false}
                    handleSwitchCB={()=>console.log("ss")}
                    />

                    <CustomSwitch 
                    title="Enable Whatsapp notifications"
                    enable={props.currentUser?props.currentUser.notification_on:false}
                    handleSwitchCB={()=>console.log("ee")}
                    />
                </div>
              
            </div>
        </div>
    </NavPagesParent>
    </>
    )
}