import React from "react";
import { Link } from "raviger";
import {motion} from 'framer-motion'
import { buttonType } from "../utils/colorPallete";

export default function CustomLink(props:{
    location:string
    theme:buttonType
    children:React.ReactNode
}) {

    const renderButton = ()=>{

        switch(props.theme)
        {
            case "default":
                return (
                <Link href={props.location} className={`inline-flex items-center justify-center px-5 py-3 border border-transparent text-sm lg:text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700`}>
                    {props.children}
                </Link>
                )
        }
    }

    return (
        <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        >
            {renderButton()}
        </motion.div>
    )
}