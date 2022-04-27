import {DISPLAY_ALERT, HIDE_ALERT} from "./actions";

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            alertText: 'Please provide all values!',
        }
    } else if (action.type === HIDE_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: ''
        }
    }

    throw new Error('Action not found: ', action.type);
}

export default reducer;