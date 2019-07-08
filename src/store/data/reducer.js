import * as actionTypes from './actionTypes';

const initialState = {
    items: [],
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DATA_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload
            };
        case actionTypes.DATA_FETCH_ONE_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload
            };
        case actionTypes.DATA_CREATE_SUCCESS:
            return {
                ...state,
                items: action.payload
            };
        case actionTypes.DATA_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                id: action.payload.id,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                email: action.payload.email,
                gender: action.payload.gender,
                ip_address: action.payload.ip_address,
                size: action.payload.size,
                title: action.payload.title
            }
        case actionTypes.DATA_EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload
            }
        case actionTypes.DATA_DELETE_SUCCESS:
            // return { data: state.data.filter( datas => datas.id !== action.id )}
            const newData = state.items.filter(data => data.id !== action.payload.id)
            return {
                ...state,
                newData
            }
        default:
            return state;
    }
};
