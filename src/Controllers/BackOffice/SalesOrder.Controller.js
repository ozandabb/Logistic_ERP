import Axios from "axios";
import Config from "../Config.controller";

class SalesOrdercontroller{
    constructor(){
        this.api = {
            getAllPending: "/api/sales_orders/get/pending",
            getAllCompleted: "/api/sales_orders/get/completed",
            getAllRejected: "/api/sales_orders/get/reject",
            getPendingByCusID : "/api/sales_orders/get/pending",

        };
    }

    //GET all pending orders
    getAllPending = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllPending}`,
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

    //GET all Completed orders
    getAllCompleted = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllCompleted}`,
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

    //GET all rejected Orders
    getAllRejected = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllRejected}`,
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

    //Get Pending orders by cutomer id
    getPendingByCusID = async (id, token) => {
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getPendingByCusID}/${id}`,
            { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }})      
            .then(Response => {
                resp = Response.status;
                userData = Response;
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

var UserObject = new SalesOrdercontroller();
export default UserObject;