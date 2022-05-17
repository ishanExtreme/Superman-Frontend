import { Link, navigate } from "raviger";
import React from "react";
import { User } from "../types/api/user";
import {
    LogoutIcon, 
    UserIcon, 
    HomeIcon, 
    ViewBoardsIcon, 
    PencilIcon} from '@heroicons/react/outline'
import {motion} from 'framer-motion'

export default function NavbarResponsive(props:{user:User, page:string}) {

    const logout = ()=>{
        localStorage.removeItem("token")
        navigate("/")
        window.location.reload()
    }

    return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-4 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light">
        <div className="container-fluid w-full flex flex-row flex-wrap items-center justify-between px-6">
            <button className="navbar-toggler text-gray-500 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline " 
            type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars"
                    className="w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor"
                    d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z">
                    </path>
                </svg>
            </button>
            <a className="flex items-center text-gray-900 hover:text-gray-900 focus:text-gray-900 mt-2 lg:mt-0 mr-1 " href="#">
                {/* Brand logo */}
                <motion.img 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                src={process.env.PUBLIC_URL + "/images/logo/half_logo_1.svg"} 
                className="w-10" alt="superman"
                loading="lazy" />
            </a>

            <div className="flex items-center relative lg:order-last">
            
                <div className="dropdown relative">
                    <a className="dropdown-toggle flex items-center hidden-arrow" href="#" id="dropdownMenuButton2" role="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://mdbootstrap.com/img/new/avatars/2.jpg" className="rounded-full"
                        style={{height: "25px", width: "25px"}} alt="" loading="lazy" />
                    </a>
                    <ul className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0 " aria-labelledby="dropdownMenuButton2">
                    <li>
                        <a className="flex items-center gap-x-1 dropdown-item text-sm py-2 px-4 font-normal w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 " href="#">
                            <UserIcon className="h-4 w-4 text-purple-500"/>
                            Profile
                        </a>
                    </li>
                    <li>
                        <a onClick={logout} className="cursor-pointer flex items-center gap-x-1 dropdown-item text-sm py-2 px-4 font-normal w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 ">
                            <LogoutIcon className="h-4 w-4 text-red-500"/>
                            Logout
                        </a>
                    </li>
                    </ul>
                </div>
            </div>

            <div className="collapse navbar-collapse flex-grow items-center ml-5" id="navbarSupportedContent">
                {/* Links */}
                <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
                    {props.page === "Home"?
                    <Link href="/dashboard" className="flex items-center gap-x-2 text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded bg-beta-700" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                        <HomeIcon className="w-5 h-5 text-alpha-400" />
                        <span className="text-white">Home</span>
                    </Link>
                    :
                    <Link href="/dashboard" className="flex items-center gap-x-2 text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                        <HomeIcon className="w-5 h-5 text-alpha-400" />
                        <span>Home</span>
                    </Link>
                    }

                    {props.page === "Board"?
                    <Link href="/boards" className="flex items-center gap-x-2 text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded bg-beta-700" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                        <ViewBoardsIcon className="w-5 h-5 text-alpha-400" />
                        <span className="text-white">Boards</span>
                    </Link>
                    :
                    <Link href="/boards" className="flex items-center gap-x-2 text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                        <ViewBoardsIcon className="w-5 h-5 text-alpha-400" />
                        <span>Boards</span>
                    </Link>
                    }

                    {props.page === "Task"?
                        <Link href="/tasks" className="flex items-center gap-x-2 text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded bg-beta-700" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                            <PencilIcon className="w-5 h-5 text-alpha-400" />
                            <span className="text-white">Tasks</span>
                        </Link>
                        :
                        <Link href="/tasks" className="flex items-center gap-x-2 text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                            <PencilIcon className="w-5 h-5 text-alpha-400" />
                            <span>Tasks</span>
                        </Link>
                    }
                </ul>
                {/* Links end */}
            </div>
            
        </div>
    </nav>
    );
}