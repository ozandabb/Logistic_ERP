import Config from './Config.controller'
import Axios from 'axios';
import setAuthToken from '../Redux/utils/setAuthToken';
import { setCurrentUser } from '../Redux/Action/authAction';
import jwt_decode from 'jwt-decode';

class Common {
    constructor() {
        this.api = {
            signin: "/api/users/signin",
        };
    }
    // sign in
    common_sign = (username, password) =>{
        var requestData = {
            username: username,
            password: password
        }
        // console.log(username,password )
        return new Promise((resolve, reject) => {
            return Axios.post(`${Config.host}${Config.port}${this.api.signin}`, requestData)
                .then(result => {
                    resolve({ code: 200, data: result.data })
                    console.log("login ewa: ",result.data.data.token );
                    setAuthToken(result.data.data.token);
                    //decode
                    const decoded = jwt_decode(result.data.data.token);
                    //set current user
                    setCurrentUser(decoded);
                })
                .catch(err => {
                    reject({ code: 0, error: err })
                })
        })
    }
}

var obj = new Common();
export default obj;
