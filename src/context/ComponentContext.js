import { createContext, useReducer } from 'react';

export const ComponentContext = createContext();

const initialState = {

    isAddEpisode: false,
    isAddCategory: false,
    isUpdateCategory: false,
};

const reducer = (state, action) => {
    const { type, _ } = action;

    switch (type) {

        case 'ADD_EPISODE_MODAL':
            return {
                isAddEpisode: true,
            };
        case 'UPDATE_EPISODE_MODAL':
            return {
                isUpdateEpisode: true,
            };
        case 'ADD_CATEGORY_MODAL':
            return {
                isAddCategory: true,
            };
        case 'CLOSE_MODAL':
            return {
                isAddCategory: false,
                isAddEpisode: false,
                isUpdateEpisode: false,
            };
        default:
            throw new Error();
    }
};

export const ComponentContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <ComponentContext.Provider value={[state, dispatch]}>{children}</ComponentContext.Provider>;
};