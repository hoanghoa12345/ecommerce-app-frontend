export const setRoles = (role) =>{
    return {
        type: 'SET_ROLES',
        payload: role
    };
};

export const setName = (name) =>{
    return {
        type: 'SET_NAME',
        payload: name,
    };
};

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}