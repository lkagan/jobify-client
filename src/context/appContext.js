import { useContext, createContext, useReducer } from 'react';
import reducer from "./reducer";
import axios from "axios";

import {
    DISPLAY_ALERT,
    HIDE_ALERT,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_JOB_BEGIN,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,
    SET_EDIT_JOB,
    EDIT_JOB_BEGIN,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_ERROR,
    GET_JOBS_BEGIN,
    GET_JOBS_SUCCESS,
    DELETE_JOB_BEGIN,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    CLEAR_FILTERS,
    CHANGE_PAGE,
} from "./actions";

// Get default state from local storage if exists.
const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const location = localStorage.getItem('location') || '';

const initialState = {
    isLoading: false,
    showAlert: false,
    showSidebar: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: location,
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobLocation: location,
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['pending', 'interview', 'declined'],
    status: 'pending',
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: [],
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    const authAxios = axios.create();

    authAxios.interceptors.request.use(config => {
        config.headers.common['Authorization'] = `Bearer ${ state.token }`;
        return config;
    }, error => {
        return Promise.reject(error);
    });

    authAxios.interceptors.response.use(response => response, error => {
        if (error.response.status === 401) {
            logoutUser();
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
            const { data } = await axios.post(`/auth/${ endPoint }`, currentUser);
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

    const updateUser = async (currentUser, alertText) => {
        dispatch({ type: UPDATE_USER_BEGIN });

        try {
            const { data } = await authAxios.patch(
                '/auth/update',
                currentUser
            );

            const { user, location, token } = data;

            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: { user, location, token, alertText }
            });

            addUserToLocalStorage({ user, location, token });
        } catch (e) {
            if (e.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: { msg: e.response.data.msg }
                });
            }
        }

        hideAlert();
    }

    const handleChange = ({ name, value }) => {
        dispatch({
            type: HANDLE_CHANGE,
            payload: { name, value }
        })
    }

    const clearValues = () => {
        dispatch({ type: CLEAR_VALUES });
    }

    const createJob = async () => {
        dispatch ({ type: CREATE_JOB_BEGIN });

        try {
            const {position, company, jobLocation, jobType, status, token } = state;

            await authAxios.post('/jobs', {
                company, position, jobLocation, jobType, status
            });

            dispatch({ type: CREATE_JOB_SUCCESS });
            dispatch({ type: CLEAR_VALUES });
        } catch (e) {
            if (e.response.status === 401) {
                return
            }

            dispatch({
                type: CREATE_JOB_ERROR,
                payload: { msg: e.response.data.msg }
            });
        }

        hideAlert();
    }

    const getJobs = async () => {
        const { page, search, searchStatus, searchType, sort } = state;
        dispatch({ type: GET_JOBS_BEGIN });

        try {
            const params = {
                search,
                status: searchStatus,
                jobType: searchType,
                sort,
                page
            };

            const { data } = await authAxios.get('/jobs', {params});
            const { jobs, totalJobs, numOfPages } = data;

            dispatch({
                type: GET_JOBS_SUCCESS,
                payload: { jobs, totalJobs, numOfPages }
            });
        } catch (e) {
            console.log(e.response);
        }

        hideAlert();
    }

    const setEditJob = (id) => {
        dispatch({ type: SET_EDIT_JOB, payload: { id }});
    }

    const editJob = async (id) => {
        dispatch({ type: EDIT_JOB_BEGIN });

        try {
            const { position, company, jobLocation, jobType, status } = state;

            await authAxios.patch(`/jobs/${state.editJobId}`, {
                company, position, jobLocation, jobType, status
            });

            dispatch({ type: EDIT_JOB_SUCCESS });
            dispatch({ type: CLEAR_VALUES });
        } catch (e) {
            if (e.response.status === 401) return;

            dispatch({
                type: EDIT_JOB_ERROR,
                payload: { msg: e.response.data.msg }
            });
        }

        hideAlert();
    }

    const deleteJob = async (id) => {
        dispatch( {type: DELETE_JOB_BEGIN} );
        try {
            await authAxios.delete(`/jobs/${ id }`);
            getJobs();
        } catch (e) {
            console.log(e.toJSON());
        }
    }

    const showStats = async () => {
        dispatch({ type: SHOW_STATS_BEGIN })

        try {
            const { data } = await authAxios('/jobs/stats');
            const { stats, monthlyApplications } = data;

            dispatch({
                type: SHOW_STATS_SUCCESS,
                payload: { stats, monthlyApplications }
            });

        } catch (e) {
            console.log(e.response);
        }

        hideAlert();
    }

    const clearFilters = () => {
        dispatch({ type: CLEAR_FILTERS });
    }

    const changePage = (page) => {
        dispatch({ type: CHANGE_PAGE, payload: { page } })
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
                handleChange,
                clearValues,
                createJob,
                getJobs,
                setEditJob,
                deleteJob,
                editJob,
                showStats,
                clearFilters,
                changePage,
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
