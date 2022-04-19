import { navigate } from "raviger";
import React, { useState } from "react";
import { login } from "../api/apiSuper";
import FormField from "../Components/FormField";
import { Error, UserLoginApi, validateUserLogin } from "../types/api/user";

export default function Signin() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<Error<UserLoginApi>>({})
    const [loading, setLoading] = useState(false)

    const handleUsernameChange = (e:any)=>{

        setUsername(e.target.value)
    }


    const handlePasswordChange = (e:any)=>{

        setPassword(e.target.value)
    }

    const handleSubmit = async (e:any)=>{
        e.preventDefault();

        setLoading(true)
        const user:UserLoginApi = {username:username, password: password}

        const validationError = validateUserLogin(user)
        setError(validationError);

        // if user form is valid
        if(Object.keys(validationError).length === 0) {
            try {
                const data = await login(user)
                localStorage.setItem("token", data.token)
                navigate("/dashboard")
                
                window.location.reload()

               
            } 
            catch(error)
            {
                console.log(error)
                // triggerToast("error", "Server Error, Please try again later.")
            }
        }
        else {
            // if(validationError.username)
            //     triggerToast("warning", `${validationError.username}`)
            // if(validationError.password)
            //     triggerToast("warning", `${validationError.password}`)
        }

        setLoading(false)
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

            {loading?
            <div className="flex justify-center items-center">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            :
            <button
                type="submit"
                className="mt-10 inline-block px-7 py-3 bg-yellow-400 text-red-700 font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-yellow-500 hover:shadow-lg focus:bg-yellow-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-600 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                onClick={handleSubmit}
            >
                Login
            </button>
            }

            {Object.keys(error).length !== 0 && <p className='text-red-500 text-center mt-10'>{error.password} <br/> {error.username}</p>}
    
            </form>
        </div>
        </div>
    </div>
     
    );
}