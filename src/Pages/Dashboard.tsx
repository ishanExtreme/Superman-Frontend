import React from "react";
import Navbar from "../Components/Navbar";
import { User } from "../types/api/user";

export default function Dashboard(props:{currentUser:User}) {

    return (
        <Navbar user={props.currentUser} />
    );
}