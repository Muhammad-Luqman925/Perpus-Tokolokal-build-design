import { createContext, useContext, useReducer } from "react";

const initialState = {
    auth: {
        isAuthenticated: false,
        user: null,
    },
};

const StoreContext = createContext({
    state: initialState,
    dispatch: () => undefined,
});

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                auth: {
                    isAuthenticated: true,
                    user: action.payload ?? {},
                },
            };
        case "LOGOUT":
            return {
                ...state,
                auth: {
                    isAuthenticated: false,
                    user: null,
                },
            };
        default:
            return state;
    }
};

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);




