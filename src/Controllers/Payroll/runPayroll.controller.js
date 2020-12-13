import Axios from "axios";
import Config from "../Config.controller";

class RunPayrollcontroller{
    constructor(){
        this.api = {
            runPayroll: "/api/payroll/create",
            getAllPayrolls: "/api/payroll/getall",
            getpayrollByID: "/api/payroll/getbyemp",
            // UpdateSupplier: "/api/suppliers/update",
            // DeleteEarnigs: "/api/earns/delete",
        };
    }

    //ADD a new supplier
    runPayroll = async (data, token) => {
        console.log("iddd", data);
        return await Axios.post( `${Config.host}${Config.port}${this.api.runPayroll}/${data.emp_id}`, data,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data , status : 201 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }

    //GET all Payroll
    getAllPayrolls = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllPayrolls}`,
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

    //GET payrool by ID
    getpayrollByID = async (id, token) => {
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getpayrollByID}/${id}`,
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

   











}
var UserObject = new RunPayrollcontroller();
export default UserObject;