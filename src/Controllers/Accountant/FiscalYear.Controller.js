import Axios from "axios";
import Config from "../Config.controller";

 class FiscalYearController {

    constructor(){
        this.api = {
            getAllFiscalYears: "/api/fiscal_year/get",
            getFiscalYearById: "/api/exchange_rates/get/",
            addNewFiscalYear: '/api/fiscal_year/create'

        };
    }

    getAllFiscalYears = async (token) => {
        var resp = 600;
        var userData = {};
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllFiscalYears}`,
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
    };

    //ADD a new accounting period
    addNewFiscalYear = async (data, token) => {
        return await Axios.post( `${Config.host}${Config.port}${this.api.addNewFiscalYear}`, data,
            { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data , status : 201 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    };

 }

var UserObject = new FiscalYearController();
export default UserObject;