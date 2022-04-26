import { navigate } from "raviger";
import React, { useEffect, useState } from "react";
import { register } from "../api/apiSuper";
import FormField from "../Components/FormField";
import ImageElement from "../Components/ImageElement";
import { Error as CustomError, User, UserRegisterApi, validateUserRegister } from "../types/api/user";
import { triggerToast } from "../utils/notification";

export default function Register(props:{user?:User}) {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [error, setError] = useState<CustomError<UserRegisterApi>>({})
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        if(props.user)
            navigate("/dashboard")
        return (()=>{
            setUsername("")
            setEmail("")
            setPassword("")
            setPassword2("")
            setError({})
            setLoading(false)
        })
    },[])

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

    const handleSubmit = async (e:any)=>{
        e.preventDefault()

        setLoading(true)
        const user:UserRegisterApi = {username:username, email:email, password: password}

        const validationError = validateUserRegister(user)
        setError(validationError);
        if(password !== password2)
        {
            setError({...error, password:"Passwords doest not match"})
        }

        // if user form is valid
        if(Object.keys(validationError).length === 0) {
            try {
                await register(user)
                triggerToast("success", "Registared succesfully!")
                navigate("/login")
            } 
            catch(error:any)
            {
                
    
            }
        }
        else {
            if(validationError.username)
                triggerToast("warning", `${validationError.username}`)
            if(validationError.password)
                triggerToast("warning", `${validationError.password}`)
            if(validationError.email)
            triggerToast("warning", `${validationError.email}`)
        }
        setLoading(false)

    }
    

    return (
   
    <div className="container px-6 py-12 h-full">
        <div className="flex flex-col justify-center items-center flex-wrap h-full g-6 text-gray-800">
        <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
            <ImageElement
            src={process.env.PUBLIC_URL+" /images/logo/half_logo_2.svg"}
            className="w-full"
            alt="Half Logo 2"
            width="500px"
            height="500px"
            />
        </div>
        <div className="md:w-8/12 lg:w-5/12 lg:ml-20 mt-5 p-5 mx-auto max-h-full bg-white shadow-lg rounded-xl">
            <div className="flex items-center justify-center">
                <ImageElement 
                src={process.env.PUBLIC_URL+" /images/logo/half_logo_1.svg"}
                alt="Half Logo 1"
                className="w-[200px]"
                width="200px"
                height="200px"
                />
            </div>
            <form>

            <FormField id="1" label="Username" type="text" value={username} handleChangeCB={handleUsernameChange} />
            <FormField id="2" label="Email" type="email" value={email} handleChangeCB={handleEmailChange} />
            <FormField id="3" label="Password" type="password" value={password} handleChangeCB={handlePasswordChange} />
            <FormField id="4" label="Confirm Password" type="password" value={password2} handleChangeCB={handlePassword2Change} />

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
                Register
            </button>
            }   


            {Object.keys(error).length !== 0 && <p className='text-red-500 text-center mt-10'>{error.password} <br/> {error.username} <br/> {error.email}</p>}
    
            </form>
        </div>
        </div>
    </div>
     
    );
}