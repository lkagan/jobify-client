import React, { useState } from 'react';
import Wrapper from "../assets/wrappers/Navbar";
import { FaBars, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useAppContext } from '../context/appContext';
import Logo from "./Logo";

const Navbar = () => {
    const { toggleSidebar, user } = useAppContext();
    const [showLogout, setShowLogout] = useState(false);

    return (
        <Wrapper>
            <div className="nav-center">
                <button
                    type="button"
                    className="toggle-btn"
                    onClick={ toggleSidebar }
                >
                    <FaBars/>
                </button>
                <div>
                    <Logo/>
                    <h3 className="logo-text">
                        dashboard
                    </h3>
                </div>
                <div className="btn-container">
                    <button
                        type="button"
                        className="btn"
                        onClick={ () => setShowLogout(!showLogout) }
                    >
                        <FaUserCircle/>
                        { user.name }
                        <FaCaretDown/>
                    </button>
                    <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                        <button
                            type="button"
                            className="dropdown-btn"
                            onClick={ () => console.log('logout')}
                        >logout
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Navbar;