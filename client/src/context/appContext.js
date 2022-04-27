import { useContext, createContext, useReducer } from 'react';
import reducer from "./reducer";
import { DISPLAY_ALERT, HIDE_ALERT } from './actions';

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
}

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT });
    }

    const hideAlert = () => {
        dispatch({ type: HIDE_ALERT });
    }

    return (
        <AppContext.Provider value={ { ...state, displayAlert, hideAlert } }>
            { children }
        </AppContext.Provider>
    );
}

const useAppContext = () => {
    return useContext(AppContext);
}

export { AppProvider, useAppContext };
