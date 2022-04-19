import React from "react";
import 'react-toastify/dist/ReactToastify.css';


export default function AppContainer(props:{children:React.ReactNode}) {
    

    return (
       
        <div className="flex h-screen bg-gray-100 items-center">
            {props.children}
        </div>
        
    )
}