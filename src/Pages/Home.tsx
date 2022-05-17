import React from "react";
import CustomLink from "../Components/CustomLinks";
import ImageElement from "../Components/ImageElement";
import {motion} from 'framer-motion'

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


export default function Home() {

    return (
        <div className="flex w-full mt-[15rem] justify-center">
        <div>
            <div className="w-full flex items-center justify-center">
                <motion.div
                variants={imageVariant}
                initial='hidden'
                animate='visible' 
                >
                    <ImageElement 
                    className="w-[200px] lg:w-[250px]" 
                    src={process.env.PUBLIC_URL+" /images/logo/full_logo.svg"} 
                    alt="logo"
                    width="250px"
                    height="250px"
                    />
                </motion.div>
            </div>
            <div className="mt-5 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between bg-white shadow-lg p-5 rounded-2xl overflow-auto">
            <h2 className="text-1xl text-center font-extrabold tracking-tight text-gray-900 lg:text-4xl lg:text-left">
                <span className="block">Ready to commit?</span>
                <span className="block text-primary-600 mr-5">Login or signup to manage your tasks</span>
            </h2>
            <div className="pt-5 flex justify-center lg:mt-0 lg:flex-shrink-0">
                <div className="inline-flex rounded-md shadow">
                    <CustomLink location="/login" theme="default">
                        Login
                    </CustomLink>
                </div>
                <div className="ml-3 inline-flex rounded-md shadow">
                    <CustomLink location="/register" theme="default">
                        Signup
                    </CustomLink>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}