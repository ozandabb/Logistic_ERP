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

    async common_sign(username, password) {
        var requestData = {
            username: username,
            password: password
        }
        var userData = {};
        var resp = 600;
        await Axios.post(
            `${Config.host}${Config.port}${this.api.signin}`,
            requestData
        )
            .then(Response => {
                resp = Response.status;
                userData = Response;
            })
            .catch(err => {
                console.error(err);
                try {
                    console.error(err);
                    resp = err.response.status;
                } catch (error) {
                    console.log(error);

                    resp = 600;
                }
            });

        if (resp === 200) {
            return userData;
        }
        return resp;

    }

    // sign in
    // common_sign = (username, password) =>{
    //     var requestData = {
    //         username: username,
    //         password: password
    //     }
    //     var userData = {};
    //     var resp = 600;
    //     await Axios.post(
    //         `${Config.host}${Config.port}${this.api.signin}`,
    //         requestData
    //     )
    //         .then(Response => {
    //             resp = Response.status;
    //             userData = Response.data.userData;
    //             console.log("menna result eka" , resp);
    //         })
    //         .catch(err => {
    //             console.error(err);
    //             try {
    //                 console.error(err);
    //                 resp = err.response.status;
    //             } catch (error) {
    //                 console.log(error);

    //                 resp = 600;
    //             }
    //         });

    //     if (resp === 200) {
    //         return userData;
    //     }
    //     return resp;
 
        // return new Promise((resolve, reject) => {
        //     return Axios.post(`${Config.host}${Config.port}${this.api.signin}`, requestData)
        //         .then(result => {
        //             resolve({ code: 200, data: result.data })
        //             console.log("log in eka success" , result);
        //         })
        //         .catch(err => {
        //             reject({ code: 0, error: err })
        //         })
        // })
    //}
}

var obj = new Common();
export default obj;
