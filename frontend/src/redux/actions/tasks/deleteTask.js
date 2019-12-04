import axios from 'axios'

import { API } from '../../../services/api'

import {
  TASK_DELETE,
  TASK_DELETE_FAILURE,
  TASK_DELETE_SUCCESS
} from '../../actionTypes'

export default (taskId, status) => async dispatch => {
  try {

    dispatch({ type: TASK_DELETE })
    const response = await axios.delete(`${API.url}tasks/${taskId}`, { headers: { token: localStorage.getItem("token") } })
    console.log(response)
    dispatch({
      type: TASK_DELETE_SUCCESS,
      payload: {
        status,
        id: taskId
      }
    })
  }
  catch (err) {
    const errorMessage = 'oi'

    dispatch({
      type: TASK_DELETE_FAILURE,
      payload: errorMessage
    })
  }
}