import { LoginIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import { navigate } from "raviger";
import React, { useEffect, useState } from "react";
import { login } from "../api/apiSuper";
import FormField from "../Components/FormField";
import ImageElement from "../Components/ImageElement";
import { Error, User, UserLoginApi, validateUserLogin } from "../types/api/user";
import { triggerToast } from "../utils/notification";


const repeatType: "loop" | "reverse" | "mirror" = "reverse"

const imageVariant = {
    hidden: { y:'-10px'},
    visible: {
      y:'10px',
      transition: {
        repeat: Infinity,
        repeatType: repeatType,
        duration: 1,
      }
    }
  }


export default function Signin(props:{user?:User}) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<Error<UserLoginApi>>({})
    const [loading, setLoading] = useState(false)


    useEffect(()=>{
        if(props.user)
            navigate("/dashboard")
    },[])

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
                // console.log(error)
                // triggerToast("error", "Server Error, Please try again later.")
            }
        }
        else {
            if(validationError.username)
                triggerToast("warning", `${validationError.username}`)
            if(validationError.password)
                triggerToast("warning", `${validationError.password}`)
        }

        setLoading(false)
    }
    

    

    return (
   
    <div className="container px-6 py-12 h-full">
        <div className="flex flex-col justify-center items-center flex-wrap h-full g-6 text-gray-800">
        <motion.div 
        variants={imageVariant}
        initial='hidden'
        animate='visible' 
        className="hidden lg:block md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
            <ImageElement
            src={process.env.PUBLIC_URL+" /images/logo/half_logo_2.svg"}
            className="w-full"
            alt="Half Logo 2"
            width="500px"
            height="500px"
            />
        </motion.div>
        <div className="md:w-8/12 lg:w-5/12 lg:ml-20 mt-5 p-5 mx-auto max-h-full bg-white shadow-lg rounded-xl">
            <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ rotate: 180 }}
            className="flex items-center justify-center">
                <ImageElement 
                src={process.env.PUBLIC_URL+" /images/logo/half_logo_1.svg"}
                alt="Half Logo 1"
                className="w-[200px]"
                width="200px"
                height="200px"
                />
            </motion.div>
            <form>

            <FormField id="1" label="Username" type="text" value={username} handleChangeCB={handleUsernameChange} />
            
            <FormField id="2" label="Password" type="password" value={password} handleChangeCB={handlePasswordChange} />
            

    
            <div className="flex flex-col gap-y-3 lg:flex-row justify-between items-center mb-6">
                <div className="form-group form-check">
                <input
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-alpha-400 checked:border-alpha-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    id="exampleCheck3"
                />
                <label className="form-check-label inline-block text-secondary-600" htmlFor="exampleCheck2">
                    Remember me
                </label>
                </div>
                <a
                href="/password-reset"
                className="text-secondary-600 hover:text-secondary-700 focus:text-secondary-700 active:text-secondary-800 duration-200 transition ease-in-out"
                >Forgot password?</a>
            </div>

            {loading?
            <div className="flex justify-center items-center">
                <div className="spinner-border text-alpha-400 animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            :
            <button
                type="submit"
                className="mt-10 inline-block px-7 py-3 bg-alpha-400 text-secondary-600 font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-yellow-500 hover:shadow-lg focus:bg-yellow-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-600 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                onClick={handleSubmit}
            >
                Login
            </button>
            }

            <button
                className="mt-3 inline-block px-7 py-3 bg-beta-700 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-beta-800 hover:shadow-lg focus:bg-beta-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-beta-900 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                onClick={()=>navigate("/register")}
            >
                Switch to Register
            </button>

            {Object.keys(error).length !== 0 && <p className='text-red-500 text-center mt-10'>{error.password} <br/> {error.username}</p>}
    
            </form>
        </div>
        </div>
    </div>
     
    );
}