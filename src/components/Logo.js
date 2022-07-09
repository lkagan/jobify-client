import logo from "../assets/images/logo.svg";
import React from 'react';

const Logo = () => {
    return (
        <img
            src={ logo }
            alt="Jobify"
            className={ "logo" }
        />
    );
}

export default Logo;