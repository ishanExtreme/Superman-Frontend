import React from 'react';
import {useRoutes} from 'raviger'
import Home from '../Pages/Home';
import AppContainer from '../Components/AppContainer';



const routes = {
    '/': ()=> <Home /> ,
}

export default function AppRouter() {

    let routeResult = useRoutes(routes);
    return <AppContainer>{routeResult}</AppContainer>;
}