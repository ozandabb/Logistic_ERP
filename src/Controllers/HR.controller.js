import Axios from "axios";
import Config from "./Config.controller";

class HRcontroller{
    constructor(){
        this.api = {
            addCustomer: "/api/customer/create",
            getAllCustomer: "/api/customer/all",
            // getOne: "/api/parallel/getOne",
            // deleteGenerate : "/api/parallel/delete",
        };
    }

    addCustomer = async (data, token) => {
        return await Axios.post( `${Config.host}${Config.port}${this.api.addCustomer}`, data,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data , status : 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }

 
    getAllCustomer = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllCustomer}`,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                resp = Response.status;
                userData = Response.data;
                console.log("all customers", userData);
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










}
var UserObject = new HRcontroller();
export default UserObject;