import Axios from "axios";
import Config from "../Config.controller";

class Mismatchcontroller{
    constructor(){
        this.api = {
            // makeBenefits: "/api/benefits/create",
            // userBenefits: "/api/benefitsusers/create",
            getAllPaymentMismatch: "/api/paymentmismatch/getall",
            getOneMismatch: "/api/paymentmismatch/getone",
            UpdateStatus: "/api/paymentmismatch/update",
            // DeleteUserBene: "/api/benefitsusers/delete",
        };
    }

     //GET all benefits
     getAllPaymentMismatch = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllPaymentMismatch}`,
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

    //Get signle Payment mismatch
    getOneMismatch = async (id, token) => {
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getOneMismatch}/${id}`,
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

    //UPDATE status
    UpdateStatus = async ( data , token ) => {
        console.log("data aaaaa", data);
        return await Axios.patch( `${Config.host}${Config.port}${this.api.UpdateStatus}/${data.id}`, data,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data , status : 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }

    //user benefits create
    // userBenefits = async (data, token) => {
    // return await Axios.post( `${Config.host}${Config.port}${this.api.userBenefits}`, data,
    // { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
    //     .then(Response => {
    //         return { ...Response.data , status : 201 }
    //     })
    //     .catch(err => {
    //         console.error(err);
    //         return { ...err , status : 400 }
    //     });
    // }

   

    //GET all user benefits
    // getAllUserBenefits = async (token) => {
    //     var resp = 600;
    //     var userData = {}
    //     await Axios.get(`${Config.host}${Config.port}${this.api.getAllUserBenefits}`,
    //     { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
    //         .then(Response => {
    //             resp = Response.status;
    //             userData = Response.data;
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

    //DELETE a make bene
    // DeleteMakeBene = async ( id , token ) => {
    //     return await Axios.delete( `${Config.host}${Config.port}${this.api.DeleteMakeBene}/${id}`,
    //     { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
    //         .then(Response => {
    //             return { ...Response.data , status : 200 }
    //         })
    //         .catch(err => {
    //             console.error(err);
    //             return { ...err , status : 400 }
    //         });
    // }

     //DELETE a user bene
    //  DeleteUserBene = async ( id , token ) => {
    //     return await Axios.delete( `${Config.host}${Config.port}${this.api.DeleteUserBene}/${id}`,
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
var UserObject = new Mismatchcontroller();
export default UserObject;