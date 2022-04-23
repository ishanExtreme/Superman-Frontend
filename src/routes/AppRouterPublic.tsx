import React from 'react';
import {useRoutes} from 'raviger'
import Home from '../Pages/Home';
import AppContainer from '../Components/AppContainer';
import Register from '../Pages/Register';
import Signin from '../Pages/Signin';

const Publicroutes = {
    '/': ()=> <Home /> ,
    '/register': ()=> <Register user={null}/>,
    '/login': ()=><Signin user={null}/>,
    '/dashboard':()=><Signin user={null}/>,
    '/tasks': ()=><Signin user={null}/>
}


export default function AppRouterPublic() {

    // Private routes
    const routeResult = useRoutes(Publicroutes);
    
    return <AppContainer>{routeResult}</AppContainer>;
}
