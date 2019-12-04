import axios from 'axios'

import { API } from '../../../services/api'

import { 
  TASK_EDIT, 
  TASK_EDIT_FAILURE, 
  TASK_EDIT_SUCCESS 
} from '../../actionTypes'

export default (body, id) => async dispatch => {
  try {
    console.clear()
    console.log(API)
    dispatch({ type: TASK_EDIT })
    console.log(body)
    const response = await axios.put(`${API.url}tasks/${id}`, body, {headers: { token: localStorage.getItem("token")}})

    dispatch({ 
      type: TASK_EDIT_SUCCESS,
      payload: response.data
    })
  }
  catch(err) {
    const errorMessage = 'oi'
    
    dispatch({ 
      type: TASK_EDIT_FAILURE, 
      payload: errorMessage
    })
  }
}