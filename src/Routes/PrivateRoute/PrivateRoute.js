import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../../pages/Shared/Loading/Loading';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const {user, loading} = useContext(AuthContext);


    if(loading){
        return <Loading></Loading>
    }

    
    if(user) {
    return children
    }

    return <Navigate to='/login' state={{from: location}} replace/>
        
};

export default PrivateRoute;