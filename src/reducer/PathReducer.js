import {useState} from "react";

const initialState = {
    previousPath: '/',
    currentUser: {}
};

const currentUser = {
}

export const pathReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PREVIOUS_PATH':
            return {
                ...state,
                previousPath: action.payload,
            };
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload,
            }
        default:
            return state;
    }
};


