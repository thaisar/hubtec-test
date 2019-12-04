import {
    USER_AUTHENTICATE,
    USER_AUTHENTICATE_SUCCESS,
    USER_AUTHENTICATE_FAILURE,
    USER_CREATE,
    USER_CREATE_FAILURE,
    USER_CREATE_SUCCESS,
    USER_LOGOUT,
    USER_LOGOUT_FAILURE,
    USER_LOGOUT_SUCCESS,
    USER_CLEAR_ERROR,
    USER_CLEAR_ERROR_FAILURE,
    USER_CLEAR_ERROR_SUCCESS
} from '../actionTypes'

const initialState = {
    // isAuthenticated: !!localStorage.getItem('token'),
    isCreating: false,
    isCreated: false,
    isAuthenticated: false,
    authenticating: false,
    error: '',
    id: ""
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_CLEAR_ERROR: {
            return {
                ...state,
                error: ''
            }
        }
        case USER_AUTHENTICATE: {
            return {
                ...state,
                authenticating: true,
                isAuthenticated: false,
                error: ''
            }
        }
        case USER_AUTHENTICATE_FAILURE: {
            return {
                ...state,
                authenticating: false,
                error: action.payload
            }
        }
        case USER_AUTHENTICATE_SUCCESS: {
            return {
                ...state,
                authenticating: false,
                isAuthenticated: true,
                id: action.payload._id
            }
        }
        case USER_CREATE: {
            return {
                ...state,
                isCreating: true,
                isCreated: false,
                error: ''
            }
        }
        case USER_CREATE_FAILURE: {
            return {
                ...state,
                isCreating: false,
                error: action.payload
            }
        }
        case USER_CREATE_SUCCESS: {
            return {
                ...state,
                isCreating: false,
                isCreated: true,
                id: action.payload._id
            }
        }
        case USER_LOGOUT: {
            return {
                ...state,
                isAuthenticated: false,
                error: ''
            }
        }
        case USER_LOGOUT_FAILURE: {
            return {
                ...state,
                isAuthenticated: false,
                error: action.payload
            }
        }
        case USER_LOGOUT_SUCCESS: {
            return {
                ...state,
                error: '',
                isAuthenticated: false,
            }
        }

        default:
            return state
    }
}