import { PhoneIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { configureWhatsapp, sendVerificationCode } from "../api/apiSuper";
import CustomSwitch from "../Components/CustomSwitch";
import FormField from "../Components/FormField";
import Loading from "../Components/Loading";
import NavbarResponsive from "../Components/NavbarResponsive";
import NavPagesParent from "../Components/NavPagesParent";
import VerifyNumber from '../ModalForms/VerifyNumber'
import { User } from "../types/api/user";
import { triggerToast } from "../utils/notification";

const handleSendVerificationCodeApi = async (
    phone:string, 
    setOpenVerifyModal:(open:boolean)=>void,
    setLoading:(loading:boolean)=>void
    )=>{
    
    try {
        await sendVerificationCode(phone)
    }
    catch(error:any)
    {
        setLoading(false)
        return
    }
    setLoading(false)
    setOpenVerifyModal(true)
    

}

const sanitizePhoneNumber = (phone:string, setPhone:(phone:string)=>void)=>{
        if(phone[0] === "0")
        {
            phone = phone.substring(1,)
        }

        if(phone[0] === "+")
        {
            phone = phone.substring(3,)
        }

        if(phone.length !== 10)
        {
            triggerToast("error", "Phone number should be 10 digits(without country code)")
            return null
        }

        setPhone(phone)
        return phone
    }

export default function EnableWhatsapp(props:{currentUser:User}) {

    const [phone, setPhone] = useState<string>(props.currentUser && props.currentUser.phone?props.currentUser.phone:"")
    const [openVerifyModal, setOpenVerifyModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [switchLoading, setSwitchLoading] = useState(false)

    const handleChangePhone = (e:any)=>{
        setPhone(e.target.value)
    }


    const onAddChangeNumber = ()=>{
        if(!phone)
        {
            triggerToast("error", "Please enter a phone number")
            return
        }
        let santiziedNumber = sanitizePhoneNumber(phone, setPhone)

        if(santiziedNumber)
        {
            setLoading(true)
            handleSendVerificationCodeApi(phone, setOpenVerifyModal, setLoading)
        }
    }

    const handleSwitchToogle = async (checked:boolean, updateField:string)=>{

        setSwitchLoading(true)
        try{
            await configureWhatsapp({[updateField]:checked})
        }
        catch(error:any)
        {
            setSwitchLoading(false)
            return
        }
        
        setSwitchLoading(false)
        window.location.reload()
        
    }

    return(
    <>
    <NavbarResponsive user={props.currentUser} page="User"/>

    <VerifyNumber open={openVerifyModal} phone={phone} toogleOpen={setOpenVerifyModal}/>
    <NavPagesParent loading={false}>
        <div className="flex justify-center mt-10">
            <div className="block p-10 rounded-lg shadow-lg bg-white max-w-sm">
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-3 text-center">Whatsapp Feature</h5>
                <div className="flex flex-row items-center">
                    <p className="text-gray-500">+91</p>

                    <FormField 
                    handleChangeCB={handleChangePhone} 
                    id="1" 
                    label="Whatsapp number" 
                    type="tel"
                    value={phone}
                    />
                </div>

                <div className="flex justify-center">
                    {loading?
                        <Loading />
                        :
                        <button 
                        onClick={onAddChangeNumber} 
                        type="button" 
                        className="h-10 px-6 pt-2.5 pb-2 bg-red-700 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-red-800 hover:shadow-lg focus:bg-red-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-lg transition duration-150 ease-in-out flex align-center items-center">
                            <PhoneIcon className="h-5 w-5 mr-2" />
                            Add/Change Number
                        </button>
                    }
                </div>

                <div className="border border-alpha-400 mt-3 mb-3"></div>
                
                <div className="flex flex-col gap-y-3 items-start">
                    {switchLoading?
                    <Loading />
                    :
                    (
                    <>
                    <CustomSwitch 
                    title="Enable Whatsapp Feature"
                    enable={props.currentUser?props.currentUser.wa_sending:false}
                    handleSwitchCB={(checked)=>handleSwitchToogle(checked, "wa_sending")}
                    />

                    <CustomSwitch 
                    title="Enable Whatsapp notifications"
                    enable={props.currentUser?props.currentUser.notification_on:false}
                    handleSwitchCB={(checked)=>handleSwitchToogle(checked, "notification_on")}
                    />
                    </>
                    )
                    }
                </div>
              
            </div>
        </div>
    </NavPagesParent>
    </>
    )
}