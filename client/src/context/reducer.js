import { initialState } from "./appContext";

import {
    DISPLAY_ALERT,
    HIDE_ALERT,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER
} from "./actions";

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            alertText: 'Please provide all values!',
        }
    } else if (action.type === HIDE_ALERT) {
        return state;
    } else if (action.type === SETUP_USER_BEGIN) {
        return { ...state, isLoading: true };
    } else if (action.type === SETUP_USER_SUCCESS) {
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
    } else if (action.type === SETUP_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        };
    } else if (action.type === TOGGLE_SIDEBAR) {
        return {
            ...state,
            showSidebar: !state.showSidebar
        }
    } else if(action.type == LOGOUT_USER) {
        return {
            ...initialState,
            user: null,
            token: null,
            userLocation: null,
            jobLocation: null
        }
    }
     else {
        throw new Error('Action not found: ', action.type);
    }
}

export default reducer;