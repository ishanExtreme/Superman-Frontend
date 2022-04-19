import React from "react";
import { User } from "../types/api/user";

export default function Dashboard(props:{currentUser:User}) {

    return (
        <p>{props.currentUser?.username}</p>
    );
}