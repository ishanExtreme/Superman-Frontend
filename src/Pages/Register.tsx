import React, { useState } from "react";
import FormField from "../Components/FormField";

export default function Register() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const handleUsernameChange = (e:any)=>{

        setUsername(e.target.value)
    }

    const handleEmailChange = (e:any)=>{

        setEmail(e.target.value)
    }

    const handlePasswordChange = (e:any)=>{

        setPassword(e.target.value)
    }

    const handlePassword2Change = (e:any)=>{

        setPassword2(e.target.value)
    }
    

    return (
   
    <div className="container px-6 py-12 h-full">
        <div className="flex flex-col justify-center items-center flex-wrap h-full g-6 text-gray-800">
        <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
            <img
            src={process.env.PUBLIC_URL+" /images/logo/half_logo_2.svg"}
            className="w-full"
            alt="Half Logo 2"
            />
        </div>
        <div className="md:w-8/12 lg:w-5/12 lg:ml-20 mt-5 p-5 mx-auto max-h-full bg-white shadow-lg rounded-xl">
            <div className="flex items-center justify-center">
                <img 
                src={process.env.PUBLIC_URL+" /images/logo/half_logo_1.svg"}
                alt="Half Logo 1"
                className="w-[200px]"
                />
            </div>
            <form>

            <FormField id="1" label="Username" type="text" value={username} handleChangeCB={handleUsernameChange} />
            <FormField id="2" label="Email" type="email" value={email} handleChangeCB={handleEmailChange} />
            <FormField id="3" label="Password" type="password" value={password} handleChangeCB={handlePasswordChange} />
            <FormField id="4" label="Confirm Password" type="password" value={password2} handleChangeCB={handlePassword2Change} />

    
            <button
                type="submit"
                className="mt-10 inline-block px-7 py-3 bg-yellow-400 text-red-700 font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-yellow-500 hover:shadow-lg focus:bg-yellow-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-600 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
            >
                Register
            </button>
    
            </form>
        </div>
        </div>
    </div>
     
    );
}