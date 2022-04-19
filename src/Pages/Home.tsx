import React from "react";

export default function Home() {

    return (
        <div className="flex w-full items-center justify-center">
        <div>
            <div className="w-full flex items-center justify-center">
                <img className="b w-[250px]" src={process.env.PUBLIC_URL+" /images/logo/full_logo.svg"} alt="logo" />
            </div>
            <div className="mt-5 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between bg-white shadow-lg p-5 rounded-2xl overflow-auto">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <span className="block">Ready to commit?</span>
                <span className="block text-indigo-600 mr-5">Login or signup to manage your tasks</span>
            </h2>
            <div className="pt-5 flex lg:mt-0 lg:flex-shrink-0">
                <div className="inline-flex rounded-md shadow">
                    <a href="/user/login" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                        Login
                    </a>
                </div>
                <div className="ml-3 inline-flex rounded-md shadow">
                    <a href="/user/signup" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Signup
                    </a>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}