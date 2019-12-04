import axios from 'axios'

import { API } from '../../../services/api'

import {
  TASK_CHANGE_STATUS,
  TASK_CHANGE_STATUS_FAILURE,
  TASK_CHANGE_STATUS_SUCCESS
} from '../../actionTypes'

export default (task, id, currentStatus, newStatus) => async dispatch => {
  try {
    dispatch({ type: TASK_CHANGE_STATUS })
    const body = {
      ...task,
      status: newStatus
    }
    
    const response = await axios.put(`${API.url}tasks/${id}`, body, { headers: { token: localStorage.getItem("token") } })

    dispatch({
      type: TASK_CHANGE_STATUS_SUCCESS,
      payload: {
        data: response.data,
        currentStatus, 
        newStatus
      }
    })
  }
  catch (err) {
    const errorMessage = 'oi'

    dispatch({
      type: TASK_CHANGE_STATUS_FAILURE,
      payload: errorMessage
    })
  }
}