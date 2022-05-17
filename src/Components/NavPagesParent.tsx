import React from "react";

export default function NavPagesParent(props:{loading:boolean, children:React.ReactNode}) {

    return (
        <div className="w-full h-full p-3 px-5 xl:px-[100px]">
            {props.loading?
            <div className="flex h-full justify-center items-center">
                <div className="spinner-border animate-spin inline-block w-20 h-20 border-4 rounded-full" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            :
            <>
            {props.children}
            </>
            }
            <br/>
        </div>
    )
}