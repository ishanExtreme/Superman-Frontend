import { navigate } from "raviger";
import React, { useState } from "react";
import { deleteBoard } from "../api/apiSuper";
import EditBoard from "../ModalForms/EditBoard";
import { Board } from "../types/tasks";
import DropDownIcon from "./DropDownIcon";
import Loading from "./Loading";

const options:string[] = ["Edit", "Delete"]

export default function BoardCard(props:{
    board:Board
    handleEditCallBack:()=>void
    handleOpenCallBack:()=>void
}) {

    const [openEdit, setOpenEdit] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSelect = async (option:string)=>{
        if(option === "Edit")
        {
            handleOpenEditToogle(true)
        }

        if(option === "Delete")
        {
            handleDelete()
        }
    }

    const handleOpenEditToogle = (open:boolean)=>{
        setOpenEdit(open)
    }

    const handleDelete = async ()=>{

        setLoading(true)
         try{
            await deleteBoard(props.board.id)
        }
        catch(error) {
            setLoading(false)
            return
        }
        setLoading(false)
        window.location.reload()
    }

    const handleBoardOpen = ()=>{
        navigate(`/board/${props.board.id}`)
    }

    return (
        <>
            <EditBoard open={openEdit} toogleOpen={handleOpenEditToogle} board={props.board} />
            <div className="flex flex-col gap-y-5 p-5 bg-white shadow-lg rounded-2xl w-[400px] h-[200px]">
                <div className="flex flex-row justify-between">
                    <p className="font-semibold text-xl">{props.board.title}</p>
                    {loading?
                    <Loading/>
                    :
                    <DropDownIcon options={options} handleSelectCB={handleSelect} />
                    }   
                </div>
                <p>{props.board.description}</p>
                <div className="mt-5 flex space-x-2 justify-center">
                    <button onClick={handleBoardOpen} type="button" className="inline-block px-6 py-2.5 bg-red-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-800 hover:shadow-lg focus:bg-red-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-lg transition duration-150 ease-in-out">
                        Open
                    </button>
                </div>
            </div>
        </>
    );
}