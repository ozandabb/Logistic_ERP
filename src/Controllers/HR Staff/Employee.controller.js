import Axios from "axios";
import Config from "../Config.controller";

class Employeecontroller{
    constructor(){
        this.api = {
            addEmployee: "/api/employees/create",
            getAllEmployee: "/api/employees/getall",
            getOneEmpoyeByID: "/api/employees/getone",
            // getOneUserByUSERNAME: "/api/users/username",
        };
    }

    addEmployee = async (data, token) => {
        return await Axios.post( `${Config.host}${Config.port}${this.api.addEmployee}`, data,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data , status : 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }

 
    getAllEmployee = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllEmployee}`,
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


    getOneEmpoyeByID = async (id, token) => {
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getOneEmpoyeByID}/${id}`,
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
var UserObject = new Employeecontroller();
export default UserObject;