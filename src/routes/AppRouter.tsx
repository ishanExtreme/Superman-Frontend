import React from 'react';
import {useRoutes} from 'raviger'
import Home from '../Pages/Home';
import AppContainer from '../Components/AppContainer';
import Register from '../Pages/Register';
import Signin from '../Pages/Signin';



const routes = {
    '/': ()=> <Home /> ,
    '/register': ()=> <Register />,
    '/login': ()=><Signin />
}

export default function AppRouter() {

    let routeResult = useRoutes(routes);
    return <AppContainer>{routeResult}</AppContainer>;
}