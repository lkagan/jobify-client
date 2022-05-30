import React from 'react';
import Wrapper from "../assets/wrappers/Navbar";
import { FaBars, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useAppContext } from '../context/appContext';
import Logo from "./Logo";

const Navbar = () => {
    const { toggleSidebar } = useAppContext();

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
                        onClick={ () => console.log('toggle dropdown') }
                    >
                        <FaUserCircle/>
                        John
                        <FaCaretDown/>
                    </button>
                    <div className="dropdown show-dropdown">
                        <button
                            type="button"
                            className="dropdown-btn"
                            onClick={ () => console.log('logout user')}
                        >logout
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Navbar;