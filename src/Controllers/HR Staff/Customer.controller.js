import Axios from "axios";
import Config from "../Config.controller";

class Customercontroller{
    constructor(){
        this.api = {
            addCustomer: "/api/customer/create",
            getAllCustomer: "/api/customer/all",
            getOneCustByTCODE: "/api/customer/tcode",
            getOneUserByUSERNAME: "/api/users/username",
            UpdateCustomer: "/api/customer/cutomer",
            CutPromotions : "/api/customer/add/promotions",
            GetAllPromotions : "/api/customer/promos"
        };
    }

    //add a new customer
    addCustomer = async (data, token) => {
        return await Axios.post( `${Config.host}${Config.port}${this.api.addCustomer}`, data,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data , status : 201 }
            })
            .catch(err => {
                return { ...err , status : 400 }
            });
    }

    //add gifts, promo, discounts
    CutPromotions = async (data, token) => {
        return await Axios.post( `${Config.host}${Config.port}${this.api.CutPromotions}`, data,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data , status : 201 }
            })
            .catch(err => {
                return { ...err , status : 400 }
            });
    }

    //GET all customers
    getAllCustomer = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllCustomer}`,
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

    //get all promotions
    GetAllPromotions = async (id,token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.GetAllPromotions}/${id}`,
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


    getOneCustByTCODE = async (id, token) => {
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getOneCustByTCODE}/${id}`,
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

    getOneUserByUSERNAME = async (username, token) => {
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getOneUserByUSERNAME}/${username}`,
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

    //UPDATE a Customer
    UpdateCustomer = async ( data , token ) => {
        return await Axios.patch( `${Config.host}${Config.port}${this.api.UpdateCustomer}/${data.id}`, data,
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
var UserObject = new Customercontroller();
export default UserObject;