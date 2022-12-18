import React from 'react';
import {useRoutes} from 'raviger'
import Home from '../Pages/Home';
import AppContainer from '../Components/AppContainer';
import Register from '../Pages/Register';
import Signin from '../Pages/Signin';
import { User } from '../types/api/user';
import Dashboard from '../Pages/Dashboard';
import ListTask from '../Pages/ListTask';
import BoardList from '../Pages/BoardList';
import BoardDetail from '../Pages/BoardDetail';
import ChangePass from '../Pages/ChangePass';
import Profile from '../Pages/Profile';
import EnableWhatsapp from '../Pages/EnableWhatsapp';

const Privateroutes = {
    '/': ()=> <Home /> ,
    '/register': ({user}:{user?:User})=> <Register user={user}/>,
    '/login': ({user}:{user?:User})=><Signin user={user}/>,
    '/dashboard': ({user}:{user?:User})=><Dashboard currentUser={user?user:null} />,
    '/tasks': ({user}:{user?:User})=><ListTask currentUser={user?user:null} />,
    '/boards': ({user}:{user?:User})=><BoardList currentUser={user?user:null} />,
    '/board/:id': ({id, user}:{id:string, user?:User})=>
    <BoardDetail 
    boardId={Number(id)}
    currentUser={user?user:null}
    />,
    '/change-password': ({user}:{user?:User})=><ChangePass currentUser={user?user:null}/>,
    '/profile': ({user}:{user?:User})=><Profile currentUser={user?user:null}/>,
    '/configure-whatsapp': ({user}:{user?:User})=><EnableWhatsapp currentUser={user?user:null}/>,
}

export default function AppRouterPrivate(props:{currentUser:User}) {

    // Private routes
    const routeResult = useRoutes(Privateroutes, { routeProps: { user: props.currentUser } });
    
    return <AppContainer>{routeResult}</AppContainer>;
}