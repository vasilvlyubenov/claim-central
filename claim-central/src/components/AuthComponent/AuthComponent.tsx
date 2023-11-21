import { useAppSelector } from '../../app/hooks';
import { Outlet, Navigate, useLocation } from 'react-router-dom';


export default function AuthComponent(props: { allowedRole: string }) {
    const user = useAppSelector(state => state.user);
    const location = useLocation();
    console.log(user);

    if (props.allowedRole === '') {
        return (
            <>
                {user.uid === null
                    ? <Outlet />
                    : <Navigate to='/' state={{ from: location }} replace />}
            </>
        );
    }

    if (props.allowedRole === 'user') {
        return (
            <>
                {user.userType !== null
                    ? <Outlet />
                    : <Navigate to='/login' state={{ from: location }} replace />}
            </>
        );
    }


    return (
        <>
            {user.userType !== null
                ? ((user.userType as string).localeCompare(props.allowedRole) === 0
                    ? <Outlet />
                    : <Navigate to='/' state={{ from: location }} replace />)
                : <Navigate to='/login' state={{ from: location }} replace />}
        </>
    );
}