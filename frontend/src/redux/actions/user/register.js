import axios from 'axios'

import { API } from '../../../services/api'

import { 
  USER_CREATE, 
  USER_CREATE_FAILURE, 
  USER_CREATE_SUCCESS 
} from '../../actionTypes'

export default (body) => async dispatch => {
  try {
    dispatch({ type: USER_CREATE })
    const response = await axios.post(`${API.url}register`, body)

    dispatch({ 
      type: USER_CREATE_SUCCESS,
      payload: {
        data: response.data,
        status: body.status
      }
    })
  }
  catch(err) {
    const errorMessage = 'oi'
    
    dispatch({ 
      type: USER_CREATE_FAILURE, 
      payload: err.response.data.error
    })
  }
}