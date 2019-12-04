import axios from 'axios'

import { API } from '../../../services/api'

import { 
  USER_LOGOUT, 
  USER_LOGOUT_FAILURE, 
  USER_LOGOUT_SUCCESS 
} from '../../actionTypes'

export default (body) => async dispatch => {
  try {
    dispatch({ type: USER_LOGOUT })

    const response = await axios.delete(`${API.url}logout`, {headers: { token: localStorage.getItem("token")}})

    dispatch({ 
      type: USER_LOGOUT_SUCCESS
    })
  }
  catch(err) {
    const errorMessage = 'oi'
    
    dispatch({ 
      type: USER_LOGOUT_FAILURE, 
      payload: errorMessage
    })
  }
}