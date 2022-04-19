import React from 'react';
import {useRoutes} from 'raviger'
import Home from '../Pages/Home';
import AppContainer from '../Components/AppContainer';
import Register from '../Pages/Register';
import Signin from '../Pages/Signin';
import { User } from '../types/api/user';
import Dashboard from '../Pages/Dashboard';
import Restricted from '../Pages/Restricted';



const routes = {
    '/': ()=> <Home /> ,
    '/register': ()=> <Register />,
    '/login': ()=><Signin />,
    '/dashboard': ({user}:{user?:User})=>user?
    <Dashboard currentUser={user} />:<Restricted />
}

export default function AppRouter(props:{currentUser:User}) {

    let routeResult = useRoutes(routes, { routeProps: { user: props.currentUser } });
    return <AppContainer>{routeResult}</AppContainer>;
}