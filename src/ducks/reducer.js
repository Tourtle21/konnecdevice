let initialState = {
    username: '',
}

const GET_USER = "GET_USER";
const LOGOUT_USER = "LOGOUT_USER";

export function getUser(userObj) {
    return {
        type: GET_USER,
        payload: userObj
    }
};

export function logoutUser() {
    return {
        type: LOGOUT_USER
    }
}



export default function reducer(state=initialState, action) {
    const {payload, type} = action;
    switch (type) {
        case GET_USER:
            return {...state, ...payload};
        case LOGOUT_USER:
            return {};
        default:
            return state;
    }
};