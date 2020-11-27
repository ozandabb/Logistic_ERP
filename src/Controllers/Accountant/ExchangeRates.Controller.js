import Axios from "axios";
import Config from "../Config.controller";

class ExchangeRatesController {
    constructor(){
        this.api = {
            getAllExchangeRates: "/api/exchange_rates/get",
            getAllExchangeRatesForDate: "/api/exchange_rates/get/",

        };
    }

    getAllExchangeRates = async () => {
        var resp = 600;
        var userData = {};
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllExchangeRates}`,
            { headers: { 'Authorization': `bearer `, 'Content-Type': 'application/json', }} )
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

    getAllExchangeRatesForDate = async (date) => {
        var resp = 600;
        var userData = {};
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllExchangeRates}/${date}`,
            { headers: { 'Authorization': `bearer `, 'Content-Type': 'application/json', }} )
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

}

var UserObject = new ExchangeRatesController();
export default UserObject;
