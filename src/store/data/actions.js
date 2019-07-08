import axios from 'axios';
import * as actionTypes from './actionTypes';
import API from '../../root/root';
// import swal from 'sweetalert';

export function getDataById(id){
    return function(dispatch){
        const URL = API + `get/data/${id}`;
        return axios.get(URL)
            .then((res) => {
                dispatch(editDataDetails(res.data));
            })
    };
}

export function editDataDetails(data){
    return {
        type: actionTypes.DATA_FETCH_ONE_SUCCESS,
        payload: data
    }
}

export function getData(){
    return function(dispatch){
        const URL = API + `get/data`;
        return axios.get(URL)
            .then((res) => {
                dispatch({ type: actionTypes.DATA_FETCH_SUCCESS, payload: res.data })
            })
            .catch((error) => {
                dispatch(getDataFailed(error));
            })
    }
}

export function createData(data){
    return function(dispatch){
        const URL = API + `post/data`;
        return axios.post(URL, data)
            .then((res) => {
                dispatch({ type: actionTypes.DATA_CREATE_SUCCESS, payload: res.data })
            })
            .catch((error) => {
                dispatch(getDataFailed(error));
            })        
    }
}

export function updateData(id, payload){
    return function(dispatch){
        const URL = API + `edit/data/`;
        return axios.post(URL, payload)
            .then((res) => {
                dispatch(updateDataDetail());
            })
    }   
}

export function updateDataDetail(){
    return{
        type: actionTypes.DATA_UPDATE_SUCCESS
    }
}

export function deleteData(id){
    return function(dispatch){
        const URL = API + `delete/data/${id}`;
        return axios.delete(URL)
            .then((res) => {
                dispatch({ type: actionTypes.DATA_DELETE_SUCCESS, payload: res.data, id });
            })
    };
}

export function getDataFailed(error){
    return function(dispatch){
        const URL = API + `get/data`;
        return axios.get(URL)
            .then((res) => {
                dispatch({ type: actionTypes.DATA_FETCH_FAILED, payload: error })
            })
    };
}

export function getDataFailedById(id, error){
    return function(dispatch){
        const URL = API + `get/data/${id}`;
        return axios.get(URL)
            .then((res) => {
                dispatch({ type: actionTypes.DATA_FETCH_ONE_FAILED, payload: error })
            })
    }
}

// handle http request where error get data
// function handleErrors(response){
//     if(!response.ok){
//         throw Error(response.statusText);
//     }
//     return response;
// }