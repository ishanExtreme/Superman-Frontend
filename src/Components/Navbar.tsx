import React from "react";
import { User } from "../types/api/user";

export default function Navbar(props:{user:User}) {

    return (
    <div className="w-60 h-full shadow-md bg-white absolute" id="sidenavSecExample">
        <div className="pt-4 pb-2 px-6 mb-3">
            
            <div className="flex items-center">
                <div className="shrink-0">
                <img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" className="rounded-full w-10" alt="Avatar"/>
                </div>
                <div className="grow ml-3">
                <p className="text-sm font-semibold text-blue-600">{props.user?.username}</p>
                </div>
            </div>
           
        </div>

        <ul className="relative px-1">
            <li className="relative">
            <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                <img src={process.env.PUBLIC_URL + "/images/icons/home.png"} className="w-[20px] mr-2" />
                <span>Home</span>
            </a>
            </li>
        </ul>
        <hr className="my-2"/>
        <ul className="relative px-1">
            <li className="relative">
            <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                <img src={process.env.PUBLIC_URL + "/images/icons/board.png"} className="w-[20px] mr-2" />
                <span>Boards</span>
            </a>
            </li>
        </ul>
        <hr className="my-2"/>
        <ul className="relative px-1">
            <li className="relative">
            <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                <img src={process.env.PUBLIC_URL + "/images/icons/task.png"} className="w-[20px] mr-2" />
                <span>Tasks</span>
            </a>
            </li>
        </ul>
       
        <div className="text-center bottom-0 absolute w-full p-5">
            <hr className="mb-3"/>
            <button type="button" className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">Logout</button>
        </div>
    </div>
    );
}