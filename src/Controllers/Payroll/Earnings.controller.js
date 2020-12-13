import Axios from "axios";
import Config from "../Config.controller";

class Earningscontroller{
    constructor(){
        this.api = {
            addEarnings: "/api/earns/create",
            getAllEarning: "/api/earns/getall",
            getEarnByID: "/api/earns/getone",
            // UpdateSupplier: "/api/suppliers/update",
            DeleteEarnigs: "/api/earns/delete",
        };
    }

    //ADD a new supplier
    addEarnings = async (data, token) => {
        return await Axios.post( `${Config.host}${Config.port}${this.api.addEarnings}`, data,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data , status : 201 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }

    //GET all Earnings
    getAllEarning = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllEarning}`,
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

    //GET earning by earn ID
    getEarnByID = async (id, token) => {
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getEarnByID}/${id}`,
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

    //DELETE earnings
    DeleteEarnigs = async ( id , token ) => {
        return await Axios.delete( `${Config.host}${Config.port}${this.api.DeleteEarnigs}/${id}`,
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
var UserObject = new Earningscontroller();
export default UserObject;