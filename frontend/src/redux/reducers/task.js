import {
    TASK_GET,
    TASK_GET_SUCCESS,
    TASK_GET_FAILURE,
    TASK_GET_ALL,
    TASK_GET_ALL_SUCCESS,
    TASK_GET_ALL_FAILURE,
    TASK_CREATE,
    TASK_CREATE_SUCCESS,
    TASK_CREATE_FAILURE,
    TASK_EDIT,
    TASK_EDIT_SUCCESS,
    TASK_EDIT_FAILURE,
    TASK_CHANGE_STATUS,
    TASK_CHANGE_STATUS_SUCCESS,
    TASK_CHANGE_STATUS_FAILURE,
    TASK_DELETE,
    TASK_DELETE_SUCCESS,
    TASK_DELETE_FAILURE,
} from '../actionTypes'

const initialState = {
    creating: false,
    created: false,
    editing: false,
    edited: false,
    all: {},
    data: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case TASK_GET: {
            return {
                ...state,
                creating: true,
                error: ''
            }
        }
        case TASK_GET_FAILURE: {
            return {
                ...state,
                creating: false,
                error: action.payload
            }
        }
        case TASK_GET_SUCCESS: {

            return {
                ...state,
                creating: false,
                data: action.payload
            }
        }
        case TASK_GET_ALL: {
            return {
                ...state,
                creating: true,
                error: ''
            }
        }
        case TASK_GET_ALL_FAILURE: {
            return {
                ...state,
                creating: false,
                error: action.payload
            }
        }
        case TASK_GET_ALL_SUCCESS: {

            return {
                ...state,
                creating: false,
                all: action.payload
            }
        }
        case TASK_CREATE: {
            return {
                ...state,
                creating: true,
                error: ''
            }
        }
        case TASK_CREATE_FAILURE: {
            return {
                ...state,
                creating: false,
                error: action.payload
            }
        }
        case TASK_CREATE_SUCCESS: {
            const { status } = action.payload
            return {
                ...state,
                creating: false,
                all: {
                    ...state.all,
                    [status]: [...state.all[status], action.payload.data]
                }
            }
        }
        case TASK_DELETE:
            return {
                ...state
            }
        case TASK_DELETE_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case TASK_DELETE_SUCCESS:
            const tasksDeleted = state.all[action.payload.status].filter(t => t._id != action.payload.id)
            return {
                ...state,
                all: {
                    ...state.all,
                    [action.payload.status]: tasksDeleted
                }
            }
        case TASK_EDIT:
            return {
                ...state
            }
        case TASK_EDIT_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case TASK_EDIT_SUCCESS:
            console.clear();
            console.error(state.all[action.payload.status]);
            const tasks = state.all[action.payload.status].filter(t => t._id != action.payload._id);
            console.warn(tasks);
            console.log(action.payload);
            return {
                ...state,
                all: {
                    ...state.all,

                    [action.payload.status]: [
                        ...tasks,
                        action.payload
                    ]
                }

            }
        case TASK_CHANGE_STATUS:
            return {
                ...state
            }
        case TASK_CHANGE_STATUS_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        case TASK_CHANGE_STATUS_SUCCESS:
            const oldTasks = state.all[action.payload.currentStatus].filter(t => t._id != action.payload.data._id);
            return {
                ...state,
                all: {
                    ...state.all,

                    [action.payload.currentStatus]: oldTasks,
                    [action.payload.newStatus]: [
                        action.payload.data,
                        ...state.all[action.payload.newStatus]
                    ]
                }

            }

        default:
            return state
    }
}