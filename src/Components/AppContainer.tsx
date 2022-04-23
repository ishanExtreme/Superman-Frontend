import React from "react";

export default function AppContainer(props:{children:React.ReactNode}) {
    

    return (
        
        <div className="flex h-screen bg-gray-100 overflow-y-auto overflow-x-hidden">
            {props.children}
        </div>
        
    )
}