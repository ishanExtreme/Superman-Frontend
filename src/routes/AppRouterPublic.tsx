import React from 'react';
import {useRoutes} from 'raviger'
import Home from '../Pages/Home';
import AppContainer from '../Components/AppContainer';
import Register from '../Pages/Register';
import Signin from '../Pages/Signin';
import ForgotPassword1 from '../Pages/ForgotPassword1';
import ForgotPassword2 from '../Pages/ForgotPassword2';

const Publicroutes = {
    '/': ()=> <Home /> ,
    '/register': ()=> <Register user={null}/>,
    '/login': ()=><Signin user={null}/>,
    '/dashboard':()=><Signin user={null}/>,
    '/tasks': ()=><Signin user={null}/>,
    '/boards': ()=><Signin user={null} />,
    '/change-password': ()=><Signin user={null} />,
    '/password-reset': ()=><ForgotPassword1 />,
}


export default function AppRouterPublic() {

    // Private routes
    const routeResult = useRoutes(Publicroutes);
    
    return <AppContainer>{routeResult}</AppContainer>;
}
