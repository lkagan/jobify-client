import { useContext, createContext, useReducer } from 'react';
import reducer from "./reducer";
import axios from "axios";

import {
    DISPLAY_ALERT,
    HIDE_ALERT,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR
} from "./actions";

// Get default state from local storage if exists.
const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const location = localStorage.getItem('location');

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.stringify(user) : null,
    token: token,
    userLocation: location,
    jobLocation: location
}

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addUserToLocalStorage = ({user, token, location}) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('location', location);
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('location');
    }

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT });
        hideAlert()
    }

    const hideAlert = () => {
        setTimeout(() => {
            dispatch({ type: HIDE_ALERT });
        }, 3000);
    }

    const setupUser = async ({currentUser, endPoint, alertText}) => {
        dispatch({ type: SETUP_USER_BEGIN });
        try {
            const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser);
            const {user, token, location} = data;

            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: { user, token, location, alertText }
            });

            addUserToLocalStorage(data)
        } catch (error) {
            dispatch({
                type: SETUP_USER_ERROR,
                payload: {msg: error.response.data.msg}
            });
        }

        hideAlert();
    }

    return (
        <AppContext.Provider
            value={ {
                ...state,
                displayAlert,
                hideAlert,
                setupUser
            } }
        >
            { children }
        </AppContext.Provider>
    );
}

const useAppContext = () => {
    return useContext(AppContext);
}

export { AppProvider, useAppContext };
