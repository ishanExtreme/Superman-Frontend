import React, { useEffect, useState } from "react";
import { getBoardsFiltered } from "../api/apiSuper";
import BoardCard from "../Components/BoardCard";
import Navbar from "../Components/Navbar";
import NavbarResponsive from "../Components/NavbarResponsive";
import NavPagesParent from "../Components/NavPagesParent";
import SearchBar from "../Components/SearchBar";
import CreateBoard from "../ModalForms/CreateBoard";
import EditBoard from "../ModalForms/EditBoard";
import { User } from "../types/api/user";
import { Board } from "../types/tasks";
import { triggerToast } from "../utils/notification";

const getBoards = async (
    setLoading:(load:boolean)=>void,
    setBoards:(task:Board[])=>void, 
    search:string)=>{

        setLoading(true)

        const filterList = {
            title:search,
        }
        try{
        const boards:Board[] = await getBoardsFiltered(filterList)

        setBoards(boards)
        }
        catch(error)
        {
            // console.log(error)
        }
        setLoading(false)


}

export default function BoardList(props:{currentUser:User}) {

    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [boards, setBoards] = useState<Board[]>([] as Board[])
    const [openCreate, setOpenCreate] = useState(false)

    useEffect(()=>{
        getBoards(setLoading, setBoards, "")
        return ()=>{
            setLoading(false)
            setSearch("")
            setBoards([])
            setOpenCreate(false)
        }
    },[])

    const handleSearchChange = (e:any)=>{
        setSearch(e.target.value)
    }

    const modifyResult = async ()=>{
        await getBoards(setLoading, setBoards, search)
        triggerToast("info", "Boards Filtered")

    }

    const handleOpenCreateToogle = (open:boolean)=>{
        setOpenCreate(open)
    }


    const handleClearFilter = async ()=>{
        setSearch("")
        await getBoards(setLoading, setBoards, "")
        triggerToast("info", "Filters Cleared")
    }

    return (
        <>
        {/* <Navbar user={props.currentUser} page="Board" /> */}
        <NavbarResponsive user={props.currentUser} page="Board"/>
        
        <CreateBoard open={openCreate} toogleOpen={handleOpenCreateToogle} />

        <NavPagesParent loading={loading}>
            <h2 className="text-center text-[50px] font-semibold text-red-700">All Boards</h2>
            {/* Filter section */}
            <div className="grid grid-cols-2 mt-[50px]">
                <div className="flex items-start">
                    <SearchBar value={search} handleChangeCB={handleSearchChange} handleClickCB={modifyResult} />
                </div>
                <div className="flex justify-end">
                    <button onClick={()=>handleOpenCreateToogle(true)} type="button" className="h-10 px-6 pt-2.5 pb-2 bg-red-700 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-red-800 hover:shadow-lg focus:bg-red-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-900 active:shadow-lg transition duration-150 ease-in-out flex align-center items-center">
                        <img src={process.env.PUBLIC_URL + "/images/icons/add.png"} className="mr-2" alt="Add"/>
                        Create Board
                    </button>
                </div>
            </div>
            <div className="flex justify-center">
                <button onClick={handleClearFilter} type="button" className="inline-block px-6 py-2.5 bg-yellow-400 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yello-500 hover:shadow-lg focus:bg-yellow-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-600 active:shadow-lg transition duration-150 ease-in-out">
                    Clear Filters
                </button>
            </div>
            {boards.length === 0?
                <div className="mt-10 flex flex-row justify-center p-4 mx-auto bg-white shadow-lg rounded-2xl overflow-auto">
                    <p>Nothing Found</p>
                </div>
                :
                <div className="mt-5 grid grid-cols-3 gap-x-3 gap-y-3">
                    {boards.map((board)=>(
                    <BoardCard 
                    key={board.id}
                    board={board}
                    handleEditCallBack={()=>console.log("ss")}
                    handleOpenCallBack={()=>console.log("ss")} 
                    />))}
                </div>    
            }
            
           
        </NavPagesParent>
        </>
    );
}