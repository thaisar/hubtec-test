import axios from 'axios'

import { API } from '../../../services/api'

import { 
  USER_AUTHENTICATE, 
  USER_AUTHENTICATE_FAILURE, 
  USER_AUTHENTICATE_SUCCESS 
} from '../../actionTypes'

export default ({ email, password }) => async dispatch => {
  try {

    dispatch({ type: USER_AUTHENTICATE })
    
    const body = { email, password }
    const response = await axios.post(`${API.url}auth`, body)
    console.log(response)
    const { token } = response.data

    localStorage.setItem('token', token)

    dispatch({ 
      type: USER_AUTHENTICATE_SUCCESS,
      payload: response.data
    })
  }
  catch(err) {
    console.log(err.response)
    const errorMessage = 'oi'
    console.log(err.response.data)
    dispatch({ 
      type: USER_AUTHENTICATE_FAILURE, 
      payload: err.response.data
    })
  }
}