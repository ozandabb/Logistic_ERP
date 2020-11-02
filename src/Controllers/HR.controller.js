import Axios from "axios";
import Config from "./Config.controller";

class HRcontroller{
    constructor(){
        this.api = {
            addCustomer: "/api/customer/create",
            // getAllParallel: "/api/parallel/get",
            // getOne: "/api/parallel/getOne",
            // deleteGenerate : "/api/parallel/delete",
        };
    }

    addCustomer = async (data) => {
        console.log("data methanata enooo", data)
        return await Axios.post( `${Config.host}${Config.port}${this.api.addCustomer}`, data )
            .then(Response => {
                console.log(Response);
                return { ...Response.data , status : 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }










}
var UserObject = new HRcontroller();
export default UserObject;