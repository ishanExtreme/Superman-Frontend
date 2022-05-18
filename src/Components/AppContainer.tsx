import React from "react";
import { ToastContainer } from 'react-toastify';

export default function AppContainer(props:{children:React.ReactNode}) {
    

    return (
        <>
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
        
        <div className="h-screen bg-gray-100 overflow-y-auto overflow-x-hidden">
            {props.children}
        </div>
        </>
        
    )
}