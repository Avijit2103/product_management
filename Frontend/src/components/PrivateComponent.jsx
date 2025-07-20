import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Footer from './Footer';
 
const PrivateComp = ()=>{
    const auth = localStorage.getItem('userdata');
    return auth?<><Outlet/> <Footer/></>:<Navigate to="/Signup"/>;
}
export  default PrivateComp;