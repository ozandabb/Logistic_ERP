import Axios from "axios";
import Config from "../Config.controller";

class OrderTraking{
    constructor(){
        this.api = {
            getSingleRoute : "/api/route",
        };
    }

    //get Single Route Details
    getSingleRoute = async (route_id ,token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getSingleRoute}/${route_id}`,
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
var Order = new OrderTraking();
export default Order;