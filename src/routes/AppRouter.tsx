import React from 'react';
import {useRoutes} from 'raviger'
import Home from '../Pages/Home';
import AppContainer from '../Components/AppContainer';
import Register from '../Pages/Register';
import Signin from '../Pages/Signin';
import { User } from '../types/api/user';
import Dashboard from '../Pages/Dashboard';
import Restricted from '../Pages/Restricted';
import ListTask from '../Pages/ListTask';



const routes = {
    '/': ()=> <Home /> ,
    '/register': ({user}:{user?:User})=> <Register user={user}/>,
    '/login': ({user}:{user?:User})=><Signin user={user}/>,
    '/dashboard': ({user}:{user?:User})=>user?
    <Dashboard currentUser={user} />:<Restricted />,
    '/tasks': ({user}:{user?:User})=>user?
    <ListTask currentUser={user} />:<Restricted />
}

export default function AppRouter(props:{currentUser:User}) {

    let routeResult = useRoutes(routes, { routeProps: { user: props.currentUser } });
    return <AppContainer>{routeResult}</AppContainer>;
}