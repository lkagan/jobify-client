import { useContext, createContext, useReducer } from 'react';
import reducer from "./reducer";
import axios from "axios";

import {
    DISPLAY_ALERT,
    HIDE_ALERT,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER
} from "./actions";

// Get default state from local storage if exists.
const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const location = localStorage.getItem('location');

const initialState = {
    isLoading: false,
    showAlert: false,
    showSidebar: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: location,
    jobLocation: location
}

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const authFetch = axios.create({
        baseURL: '/api/v1/',
    });

    authFetch.interceptors.request.use(config => {
        config.headers.common['Authorization'] = `Bearer ${ state.token }`;
        return config;
    }, error => {
        return Promise.reject(error);
    });

    authFetch.interceptors.response.use(response => response, error => {
        console.log(error);

        if (error.response.status === 401) {
            console.log('AUTH ERROR');
        }

        return Promise.reject(error);
    });


    const addUserToLocalStorage = ({ user, token, location }) => {
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

    const setupUser = async ({ currentUser, endPoint, alertText }) => {
        dispatch({ type: SETUP_USER_BEGIN });
        try {
            const { data } = await axios.post(`/api/v1/auth/${ endPoint }`, currentUser);
            const { user, token, location } = data;

            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: { user, token, location, alertText }
            });

            addUserToLocalStorage(data)
        } catch (error) {
            dispatch({
                type: SETUP_USER_ERROR,
                payload: { msg: error.response.data.msg }
            });
        }

        hideAlert();
    }

    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR });
    }

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER });
        removeUserFromLocalStorage();
    }

    const updateUser = async (currentUser) => {
        try {
            const { data } = await authFetch.patch(
                '/auth/update',
                currentUser
            );

            console.log(data);
        } catch (e) {
            // console.log(e);
        }
    }

    return (
        <AppContext.Provider
            value={ {
                ...state,
                displayAlert,
                hideAlert,
                setupUser,
                toggleSidebar,
                logoutUser,
                updateUser,
            } }
        >
            { children }
        </AppContext.Provider>
    );
}

const useAppContext = () => {
    return useContext(AppContext);
}

export { AppProvider, useAppContext, initialState };
