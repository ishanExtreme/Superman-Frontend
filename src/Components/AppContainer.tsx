import React from "react";
import { User } from "../types/api/user";


export default function AppContainer(props:{children:React.ReactNode}) {
    

    return (
       
        <div className="flex h-screen bg-gray-100">
            {props.children}
        </div>
        
    )
}