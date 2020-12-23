import Axios from "axios";
import Config from "../Config.controller";

class SalesOrdercontroller{
    constructor(){
        this.api = {
            getAllPending: "/api/sales_orders/get/pending",
            getAllCompleted: "/api/sales_orders/get/completed",
            getAllConfirm: "/api/sales_orders/get/confirm/notassign",
            getAllRejected: "/api/sales_orders/get/reject",

            getOneOrder : "/api/sales_orders/get/single",
            getPendingByCusID : "/api/sales_orders/get/pending",

            getStockItems: "/api/stocks/get",

            UpdateApproveStatus : "/api/sales_orders/backoffice/confirm",
            UpdateRejectStatus:"/api/sales_orders/backoffice/reject"

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

     //GET all Confirm orders
    getAllConfirm = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllConfirm}`,
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

    //GET all stock items
    getStockItems = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getStockItems}`,
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

    //Get signle order
    getOneOrder = async (id, token) => {
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getOneOrder}/${id}`,
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

    //UPDATE approve status
    UpdateApproveStatus = async ( data , token ) => {
        console.log("data aaaaa", data.items);
        return await Axios.patch( `${Config.host}${Config.port}${this.api.UpdateApproveStatus}/${data.id}`, data.items,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data , status : 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }

    //UPDATE reject status
    UpdateRejectStatus = async ( data , token ) => {
        console.log("data aaaaa", data.items);
        return await Axios.patch( `${Config.host}${Config.port}${this.api.UpdateRejectStatus}/${data.id}`, data.items,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data , status : 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }



}

var UserObject = new SalesOrdercontroller();
export default UserObject;