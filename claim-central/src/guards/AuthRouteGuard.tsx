import { Navigate } from 'react-router-dom';
import { ProtectedRouteProps } from '../types/ProtectedRouteProps';


export default function AuthRouteGuard({isAuth,component}: ProtectedRouteProps ) {
    if (isAuth) {
        return component;
    } else {
        return <Navigate to={'/login'}/>;
    }
}