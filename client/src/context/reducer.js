import { initialState } from "./appContext";

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
} from "./actions";

const reducer = (state, action) => {
    switch (action.type) {
        case DISPLAY_ALERT:
            return {
                ...state,
                showAlert: true,
                alertType: 'danger',
                alertText: 'Please provide all values!',
            };
        case HIDE_ALERT:
            return {
                ...state,
                showAlert: false,
                alertType: '',
                alertText: ''
            };
        case SETUP_USER_BEGIN:
        case UPDATE_USER_BEGIN:
            return { ...state, isLoading: true };
        case SETUP_USER_SUCCESS:
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: action.payload.token,
                user: action.payload.user,
                userLocation: action.payload.location,
                jobLocation: action.payload.location,
                showAlert: true,
                alertType: 'success',
                alertText: action.payload.alertText
            };
        case SETUP_USER_ERROR:
        case UPDATE_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg
            };
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                showSidebar: !state.showSidebar
            };
        case LOGOUT_USER:
            return {
                ...initialState,
                user: null,
                token: null,
                userLocation: null,
                jobLocation: null
            };
        case HANDLE_CHANGE:
            return { ...state, [action.payload.name]: action.payload.value };
        case CLEAR_VALUES:
            return {
                ...state,
                isEditing: false,
                editJobId: '',
                position: '',
                company: '',
                jobLocation: state.userLocation,
                jobType: 'full-time',
                status: 'pending',
            };
        case CREATE_JOB_BEGIN:
            return { ...state, isLoading: true };
        case CREATE_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'New Job Created!'
            };
        case CREATE_JOB_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg
            };
        case GET_JOBS_BEGIN:
              return { ...state, isLoading: true, showAlert: false };
        case GET_JOBS_SUCCESS:
            const { jobs, totalJobs, numOfPages} = action.payload;
            return { ...state, isLoading: false, jobs, totalJobs, numOfPages };
        case DELETE_JOB_BEGIN:
            return { ...state, isLoading: true };
        case SET_EDIT_JOB:
            const job = state.jobs.find(job => job._id === action.payload.id);
            const { _id, position, company, jobLocation, jobType, status } = job;
            return {
                ...state,
                isEditing: true,
                editJobId: _id,
                position,
                company,
                jobLocation,
                jobType,
                status,
            };
        case EDIT_JOB_BEGIN:
            return { ...state, isLoading: true };
        case EDIT_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'success',
                alertText: 'Job updated',
            };
        case EDIT_JOB_ERROR:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg,
            };
        case SHOW_STATS_BEGIN:
            return {
                ...state,
                isLoading: true,
                showAlert: false,
            };
        case SHOW_STATS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                stats: action.payload.stats,
                monthlyApplications: action.payload.monthlyApplications,
            };
        default:
            throw new Error('Action not found: ', action.type);
    }
}

export default reducer;