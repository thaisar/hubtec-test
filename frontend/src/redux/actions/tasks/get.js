import axios from 'axios'

import { API } from '../../../services/api'

import { 
  TASK_GET_ALL, 
  TASK_GET_ALL_FAILURE, 
  TASK_GET_ALL_SUCCESS 
} from '../../actionTypes'

export default () => async dispatch => {
  try {
    dispatch({ type: TASK_GET_ALL })
    const response = await axios.get(`${API.url}tasks`, {headers: { token: localStorage.getItem("token")}})
    dispatch({ 
      type: TASK_GET_ALL_SUCCESS,
      payload: response.data
    })
  }
  catch(err) {
    const errorMessage = 'oi'
    
    dispatch({ 
      type: TASK_GET_ALL_FAILURE, 
      payload: errorMessage
    })
  }
}