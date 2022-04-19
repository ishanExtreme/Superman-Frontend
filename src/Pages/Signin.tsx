import React, { useState } from "react";
import FormField from "../Components/FormField";

export default function Signin() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsernameChange = (e:any)=>{

        setUsername(e.target.value)
    }


    const handlePasswordChange = (e:any)=>{

        setPassword(e.target.value)
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
            
            <FormField id="2" label="Password" type="password" value={password} handleChangeCB={handlePasswordChange} />
            

    
            <div className="flex justify-between items-center mb-6">
                <div className="form-group form-check">
                <input
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-yellow-400 checked:border-yellow-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    id="exampleCheck3"
                />
                <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2">
                    Remember me
                </label>
                </div>
                <a
                href="#!"
                className="text-yellow-400 hover:text-yellow-500 focus:text-yellow-500 active:text-yellow-600 duration-200 transition ease-in-out"
                >Forgot password?</a
                >
            </div>
    
            <button
                type="submit"
                className="mt-10 inline-block px-7 py-3 bg-yellow-400 text-red-700 font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-yellow-500 hover:shadow-lg focus:bg-yellow-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-600 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
            >
                Login
            </button>
    
            </form>
        </div>
        </div>
    </div>
     
    );
}