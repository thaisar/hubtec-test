import axios from 'axios'

import { API } from '../../../services/api'

import { 
  TASK_CREATE, 
  TASK_CREATE_FAILURE, 
  TASK_CREATE_SUCCESS 
} from '../../actionTypes'

export default (body) => async dispatch => {
  try {
    dispatch({ type: TASK_CREATE })
    const response = await axios.post(`${API.url}tasks`, body, {headers: { token: localStorage.getItem("token")}})

    dispatch({ 
      type: TASK_CREATE_SUCCESS,
      payload: {
        data: response.data,
        status: body.status
      }
    })
  }
  catch(err) {
    const errorMessage = 'oi'
    
    dispatch({ 
      type: TASK_CREATE_FAILURE, 
      payload: errorMessage
    })
  }
}