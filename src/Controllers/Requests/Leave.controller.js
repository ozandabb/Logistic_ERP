import Axios from "axios";
import Config from "../Config.controller";

class LeaveController{
    constructor(){
        this.api = {
            requestNormalLeave: "/api/leave/request",
            requestMaternity_Leave: "/api/leave/request/maternity",
            getAvailableLeaves: "/api/leave/get/available",
            // getSupplierByID: "/api/suppliers/getone",
            // UpdateSupplier: "/api/suppliers/update",
            // DeleteSupplier: "/api/suppliers/delete",
        };
    }

    //REQUEST a normal Leave
    requestNormalLeave = async (data, token) => {
        return await Axios.post(`${Config.host}${Config.port}${this.api.requestNormalLeave}/${data.id}`, data,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data , status : 201 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }

    //REQUEST a Maternity_Leave 
    requestMaternity_Leave = async (data, token) => {
        return await Axios.post(`${Config.host}${Config.port}${this.api.requestMaternity_Leave}/${data.id}`, data,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data , status : 201 }
            })
            .catch(err => {
                console.error(err);
                return { ...err  }
            });
    }

    //GET available leaves
    getAvailableLeaves = async (data,token) => {
        return await Axios.post(`${Config.host}${Config.port}${this.api.getAvailableLeaves}/${data.id}`, data,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                console.log("ressssssss", Response);
                return { ...Response.data , status : 201 }
            })
            .catch(err => {
                console.error(err);
                return { ...err  }
            });
    }

    //GET supplier by ID
    // getSupplierByID = async (id, token) => {
    //     var resp = 600;
    //     var userData = {}
    //     const data = await Axios.get(
    //         `${Config.host}${Config.port}${this.api.getSupplierByID}/${id}`,
    //         { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }})      
    //         .then(Response => {
    //             console.log("sup res", Response);
    //             resp = Response.status;
    //             userData = Response;
    //         })
    //         .catch(err => {
    //             try {
    //                 resp = err.response.status;
    //             } catch (error) {
    //                 resp = 600;
    //             }
    //         });

    //     if (resp === 200) {
    //         return userData;
    //     }
    //     return resp;
    // }

    // //UPDATE a supplier
    // UpdateSupplier = async ( data , token ) => {
    //     return await Axios.patch( `${Config.host}${Config.port}${this.api.UpdateSupplier}/${data.id}`, data,
    //     { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
    //         .then(Response => {
    //             return { ...Response.data , status : 200 }
    //         })
    //         .catch(err => {
    //             console.error(err);
    //             return { ...err , status : 400 }
    //         });
    // }

    //DELETE a supplier
    // DeleteSupplier = async ( id , token ) => {
    //     return await Axios.delete( `${Config.host}${Config.port}${this.api.DeleteSupplier}/${id}`,
    //     { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
    //         .then(Response => {
    //             return { ...Response.data , status : 200 }
    //         })
    //         .catch(err => {
    //             console.error(err);
    //             return { ...err , status : 400 }
    //         });
    // }












}
var UserObject = new LeaveController();
export default UserObject;