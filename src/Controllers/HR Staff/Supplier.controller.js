import Axios from "axios";
import Config from "../Config.controller";

class Suppliercontroller{
    constructor(){
        this.api = {
            addSupplier: "/api/suppliers/create",
            getAllSuppliers: "/api/suppliers/getall",
            getSupplierByID: "/api/suppliers/getone",
            UpdateSupplier: "/api/suppliers/update",
            DeleteSupplier: "/api/suppliers/delete",
        };
    }

    //ADD a new supplier
    addSupplier = async (data, token) => {
        return await Axios.post( `${Config.host}${Config.port}${this.api.addSupplier}`, data,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data , status : 201 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }

    //GET all suppliers
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

    //GET supplier by ID
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

    //UPDATE a supplier
    UpdateSupplier = async ( data , token ) => {
        return await Axios.patch( `${Config.host}${Config.port}${this.api.UpdateSupplier}/${data.id}`, data,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data , status : 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }

    //DELETE a supplier
    DeleteSupplier = async ( id , token ) => {
        return await Axios.delete( `${Config.host}${Config.port}${this.api.DeleteSupplier}/${id}`,
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
var UserObject = new Suppliercontroller();
export default UserObject;