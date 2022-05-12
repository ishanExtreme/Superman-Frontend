import React from "react";
import { Link } from "raviger";
import { buttonTheme } from "../utils/colorPallete";
import {motion} from 'framer-motion'

export default function CustomLink(props:{
    location:string
    theme:buttonTheme
    children:React.ReactNode
}) {

    return (
        <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        >
            <Link href={props.location} className={`inline-flex items-center justify-center px-5 py-3 border border-transparent text-sm lg:text-base font-medium rounded-md text-${props.theme.text} bg-${props.theme.color} hover:bg-${props.theme.hover}`}>
                {props.children}
            </Link>
        </motion.div>
    )
}