import React from "react";

export default function Loading() {

    return (
    <div className="flex justify-center items-center">
        <div className="spinner-border text-alpha-400 animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
    )
}