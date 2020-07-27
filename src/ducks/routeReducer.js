let initialState = {
    myIdeas: false,
}

const GET_BOOL = "GET_BOOL";


export function changeBool(bool) {
    return {
        type: GET_BOOL,
        payload: bool
    }
}



export default function reducer(state=initialState, action) {
    const {payload, type} = action;
    switch (type) {
        case GET_BOOL:
            console.log(payload)
            return {...state, myIdeas: payload};
        default:
            return state;
    }
};