import React, { useContext } from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from './context/userContext';

export function PrivateRouteLogin() {
    const [state] = useContext(UserContext);
    if (!state.isLogin) {
        return <Outlet />;
    }
    return <Outlet />

}
export function PrivateRouteUser() {
    const [state] = useContext(UserContext);

    if (state.user.roles === "admin") {
        return <Navigate to="/" />
    }
    return <Outlet />
}

export function PrivateRouteAdmin() {
    const [state] = useContext(UserContext);

    if (state.user.roles !== "admin") {
        return <Navigate to="/film" />
    }
    return <Outlet />
}
