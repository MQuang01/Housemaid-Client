export const setPreviousPath = (path) => {
    return {
        type: 'SET_PREVIOUS_PATH',
        payload: path,
    };
};

export const setCurrentUser = (user) => {
    return {
        type: 'SET_CURRENT_USER',
        payload: user,
    };
}