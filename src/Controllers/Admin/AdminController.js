import Axios from "axios";
import Config from "../Config.controller";

class AdminController{
    constructor(){
        this.api = {
            getAllUserAccess: "/api/webnotifications/getall",
        };
    }

    //GET all customers
    getAllUserAccess = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllUserAccess}`,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                resp = Response.status;
                userData = Response.data;
            })
            .catch(err => {
                try {
                    resp = err.response.status;
                } catch (error) {
                    resp = 600;
                }
            });

        if (resp === 200) {
            return userData;
        }
        return resp;
    }





}
var UserObject = new AdminController();
export default UserObject;