import Axios from "axios";
import Config from "../Config.controller";

class deductioncontroller{
    constructor(){
        this.api = {
            addDeduction: "/api/deductions/create",
            getAllDeductions: "/api/deductions/getall",
            // getSupplierByID: "/api/suppliers/getone",
            // UpdateSupplier: "/api/suppliers/update",
            DeleteDeductions: "/api/deductions/delete",
        };
    }

    //ADD new deduction
    addDeduction = async (data, token) => {
        return await Axios.post( `${Config.host}${Config.port}${this.api.addDeduction}`, data,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data , status : 201 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }

    //GET all Deductions
    getAllDeductions = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllDeductions}`,
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

    //UPDATE a supplier
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
    DeleteDeductions = async ( id , token ) => {
        return await Axios.delete( `${Config.host}${Config.port}${this.api.DeleteDeductions}/${id}`,
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
var UserObject = new deductioncontroller();
export default UserObject;