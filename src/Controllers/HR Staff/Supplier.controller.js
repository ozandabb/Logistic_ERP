import Axios from "axios";
import Config from "../Config.controller";

class Suppliercontroller{
    constructor(){
        this.api = {
            addSupplier: "/api/suppliers/create",
            getAllSuppliers: "/api/suppliers/getall",
            getSupplierByID: "/api/suppliers/getone",
            // getOneUserByUSERNAME: "/api/users/username",
        };
    }

    addSupplier = async (data, token) => {
        return await Axios.post( `${Config.host}${Config.port}${this.api.addSupplier}`, data,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data , status : 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }

 
    getAllSuppliers = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllSuppliers}`,
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


    getSupplierByID = async (id, token) => {
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getSupplierByID}/${id}`,
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

    // getOneUserByUSERNAME = async (username, token) => {
    //     var resp = 600;
    //     var userData = {}
    //     const data = await Axios.get(
    //         `${Config.host}${Config.port}${this.api.getOneUserByUSERNAME}/${username}`,
    //         { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }})      
    //         .then(Response => {
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










}
var UserObject = new Suppliercontroller();
export default UserObject;