import React from 'react';
import {Outlet, Link} from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import ProtectedRoute from "../ProtectedRoute";
import { Navbar, SmallSidebar, BigSidebar } from "../../components/";

const SharedLayout = () => {
    return (
        <ProtectedRoute>
            <Wrapper>
                <main className="dashboard">
                    <SmallSidebar />
                    <BigSidebar />
                    <div>
                        <Navbar />
                        <div className="dashboard-page">
                            <Outlet/>
                        </div>
                    </div>
                </main>
            </Wrapper>
        </ProtectedRoute>
    );
};

export default SharedLayout;