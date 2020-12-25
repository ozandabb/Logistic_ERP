import Axios from "axios";
import Config from "../Config.controller";

class SalaryIncrementController {
    constructor(){
        this.api = {
            getAllSalryIncrment: "/api/salary/increment/all",
            getOneSalaryIncrement: "/api/cheques/getone",
            getDeptWise: "/api/salary/increment/dep",
            // getAllEmployees: "/api/employees/getall",
            // updateJobCard: "/api/jobcards/update",
        };
    }

    //get all salary increment
    getAllSalryIncrment = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllSalryIncrment}`,
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

     //Get signle salary increment
     getOneSalaryIncrement = async (id, token) => {
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getOneSalaryIncrement}/${id}`,
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

    //Get dept wise
    getDeptWise = async (data2, token) => {
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getDeptWise}/${data2.id}`,
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
    // UpdateStatus = async ( data , token ) => {
    //     console.log("data aaaaa", data);
    //     return await Axios.patch( `${Config.host}${Config.port}${this.api.UpdateStatus}/${data.id}`, data,
    //     { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
    //         .then(Response => {
    //             return { ...Response.data , status : 200 }
    //         })
    //         .catch(err => {
    //             console.error(err);
    //             return { ...err , status : 400 }
    //         });
    // }





    //get all job cards
    // getAllJobCards = async (token) => {
    //     var resp = 600;
    //     var userData = {}
    //     await Axios.get(`${Config.host}${Config.port}${this.api.getAllJobCards}`,
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

    //get all job cards
    // getAllVehicles = async (token) => {
    //     var resp = 600;
    //     var userData = {}
    //     await Axios.get(`${Config.host}${Config.port}${this.api.getAllVehicles}`,
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

    // async getAllEmployees(token) {
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
    
    // UpdateJobCard = async ( data , token ) => {
    //     return await Axios.patch( `${Config.host}${Config.port}${this.api.updateJobCard}/${data.id}`, data,
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

var UserObject = new SalaryIncrementController();
export default UserObject;