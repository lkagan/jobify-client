import React from 'react';
import {Outlet, Link} from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import ProtectedRoute from "../ProtectedRoute";

const SharedLayout = () => {
    return (
        <ProtectedRoute>
            <Wrapper>
                <nav>
                    <Link to={ "all-jobs" }>all jobs</Link>
                    <Link to={ "add-job" }>add jobs</Link>
                </nav>
                <Outlet/>
            </Wrapper>
        </ProtectedRoute>
    );
};

export default SharedLayout;