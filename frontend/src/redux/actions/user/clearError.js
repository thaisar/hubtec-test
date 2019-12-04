import axios from 'axios'

import { API } from '../../../services/api'

import { 
  USER_CLEAR_ERROR, 
  USER_CLEAR_ERROR_FAILURE, 
  USER_CLEAR_ERROR_SUCCESS 
} from '../../actionTypes'

export default (body) => async dispatch => {
    dispatch({ type: USER_CLEAR_ERROR })
}