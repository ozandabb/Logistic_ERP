import axios from 'axios';
import { SET_CURRENT_USER, GET_ERRORS } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import Config from '../../Controllers/Config.controller';

export const loginUser = userDate => dispatch => {
    axios
      .post(`${Config.host}${Config.port}/api/users/signin`, userDate)
      .then(res => {
        //save to localstorage
        const { token } = res.data.data.token;
        console.log("backend resullt eka:",res.data.data);
        //set token to local storage
        localStorage.setItem('jwtToken', res.data.data.token);
        //set token to auth header
        setAuthToken(res.data.data.token);
        //decode
        const decoded = jwt_decode(res.data.data.token);
        //set current user
        dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          user: err.response.data,
        })
        
    );
};

// user authentication
export const setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      user: decoded,
    };
};



//user logout
export const logoutUser = () => dispatch => {
    //remove token from local storage
    localStorage.removeItem('jwtToken');
    //remove auth heder
    setAuthToken(false);
    //set current user
    dispatch(setCurrentUser({}));
}
