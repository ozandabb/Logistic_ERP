import Axios from "axios";
import Config from "../Config.controller";

class Benefitscontroller{
    constructor(){
        this.api = {
            makeBenefits: "/api/benefits/create",
            userBenefits: "/api/benefitsusers/create",
            getAllBenefits: "/api/benefits/getall",
            getAllUserBenefits: "/api/benefitsusers/getall",
            DeleteMakeBene: "/api/benefits/delete",
            DeleteUserBene: "/api/benefitsusers/delete",
        };
    }

    //make a benefits
    makeBenefits = async (data, token) => {
        return await Axios.post( `${Config.host}${Config.port}${this.api.makeBenefits}`, data,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data , status : 201 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }

    //user benefits create
    userBenefits = async (data, token) => {
    return await Axios.post( `${Config.host}${Config.port}${this.api.userBenefits}`, data,
    { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
        .then(Response => {
            return { ...Response.data , status : 201 }
        })
        .catch(err => {
            console.error(err);
            return { ...err , status : 400 }
        });
    }

    //GET all benefits
    getAllBenefits = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllBenefits}`,
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

    //GET all user benefits
    getAllUserBenefits = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllUserBenefits}`,
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

    //DELETE a make bene
    DeleteMakeBene = async ( id , token ) => {
        return await Axios.delete( `${Config.host}${Config.port}${this.api.DeleteMakeBene}/${id}`,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data , status : 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }

     //DELETE a user bene
     DeleteUserBene = async ( id , token ) => {
        return await Axios.delete( `${Config.host}${Config.port}${this.api.DeleteUserBene}/${id}`,
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
var UserObject = new Benefitscontroller();
export default UserObject;