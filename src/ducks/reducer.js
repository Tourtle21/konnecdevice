let initialState = {
    username: '',
    requests: []
}

const GET_USER = "GET_USER";
const LOGOUT_USER = "LOGOUT_USER";
const UPDATE_REQUESTS = "UPDATE_REQUESTS";
const DELETE_REQUEST = "DELETE_REQUEST";

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

export function updateRequests(requests) {
    return {
        type: UPDATE_REQUESTS,
        payload: requests
    }
}

export function deleteRequest(id) {
    return {
        type: DELETE_REQUEST,
        payload: id
    }
}



export default function reducer(state=initialState, action) {
    const {payload, type} = action;
    switch (type) {
        case GET_USER:
            return {...state, ...payload};
        case UPDATE_REQUESTS:
            return {...state, requests: payload};
        case DELETE_REQUEST:
            let newRequests = state.requests.slice();
            const index = newRequests.findIndex(request => request.id === payload);
            newRequests.splice(index, 1);
            return {...state, requests: newRequests}
        case LOGOUT_USER:
            return {username: '', requests: []};
        default:
            return state;
    }
};