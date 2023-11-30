import React from 'react';

export type ProtectedRouteProps = {
    isAuth: boolean,
    component: React.JSX.Element;
}