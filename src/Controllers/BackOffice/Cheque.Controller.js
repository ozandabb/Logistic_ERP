import Axios from "axios";
import Config from "../Config.controller";

class ChequeController {
    constructor(){
        this.api = {
            getAllCheques: "/api/cheques/getall",
            getAllJobCards: "/api/jobcards/get",
            getAllVehicles: "/api/vehicle/all",
            getAllEmployees: "/api/employees/getall",
            updateJobCard: "/api/jobcards/update",
        };
    }

    //get all cheques
    getAllCheques = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllCheques}`,
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

    //get all job cards
    getAllJobCards = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllJobCards}`,
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

    //get all job cards
    getAllVehicles = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllVehicles}`,
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

    //get all job cards
    // getAllEmployees = async (token) => {
    //     var resp = 600;
    //     var userData = {}
    //     await Axios.get(`${Config.host}${Config.port}${this.api.getAllEmployees}`,
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

    async getAllEmployees(token) {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllEmployees}`,
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
    
    UpdateJobCard = async ( data , token ) => {
        return await Axios.patch( `${Config.host}${Config.port}${this.api.updateJobCard}/${data.id}`, data,
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

var UserObject = new ChequeController();
export default UserObject;