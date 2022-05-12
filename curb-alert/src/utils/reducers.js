import { useReducer } from 'react';

import {
    UPDATE_COORDS
} from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_COORDS:
            return {
                ...state,
                products: [...action.coords]
            }
        default:
            return state;
    }
}

export function useCoordReducer(initialState) {
    return useReducer(reducer, initialState)
}