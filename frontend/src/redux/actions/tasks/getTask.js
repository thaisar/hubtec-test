import axios from 'axios'

import { API } from '../../../services/api'

import { 
  TASK_GET, 
  TASK_GET_FAILURE, 
  TASK_GET_SUCCESS 
} from '../../actionTypes'

export default (taskId) => async dispatch => {
  try {
    dispatch({ type: TASK_GET })
    
    const response = await axios.get(`${API.url}tasks/${taskId}`, {headers: { token: localStorage.getItem("token")}})
    
    dispatch({ 
      type: TASK_GET_SUCCESS,
      payload: response.data
    })
  }
  catch(err) {
    const errorMessage = 'oi'
    
    dispatch({ 
      type: TASK_GET_FAILURE, 
      payload: errorMessage
    })
  }
}