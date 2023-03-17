import React from 'react';
import { Navigate } from 'react-router-dom';

const isLogin = () => {
    if(localStorage.getItem("token")){
        return true;
    }
    else return false;
}

const UserRoutes = ({Component}) => {
    const result = isLogin();
    return result? <Component />: <Navigate to="/login"/>;
};

export default UserRoutes;