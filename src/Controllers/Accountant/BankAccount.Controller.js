import Axios from "axios";
import Config from "../Config.controller";

class BankAccountController {
    constructor(){
        this.api = {
            addBankAccount: "/api/bank_accounts/create",
            getAllBankAccounts: "/api/bank_accounts/get?",
            getBankAccountByID: "/api/bank_accounts/get",
            updateBankAccount: "/api/bank_accounts/update",
            deleteBankAccount: "/api/bank_accounts/delete",
        };
    }

    //ADD a new Bank Account
    addBankAccount = async (data, token) => {
        return await Axios.post( `${Config.host}${Config.port}${this.api.addBankAccount}`, data,
            { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data , status : 201 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    };

    //Get all bankaccounts
    getAllBankAccounts = async (postSize,pageNumber,token) => {
        var resp = 600;
        var userData = {};
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllBankAccounts}size=${postSize}&page=${pageNumber}`,
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

    //GET Bank Account by ID
    getBankAccountByID = async (id, token) => {
        var resp = 600;
        var userData = {};
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getBankAccountByID}/${id}`,
            { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }})
            .then(Response => {
                console.log("sup res", Response);
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

    //UPDATE a Bank Account
    updateBankAccount = async ( data , token ) => {
        return await Axios.patch( `${Config.host}${Config.port}${this.api.updateBankAccount}/${data.id}`, data,
            { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data , status : 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }

    //DELETE a bank account
    deleteBankAccount = async ( id , token ) => {
        return await Axios.delete( `${Config.host}${Config.port}${this.api.deleteBankAccount}/${id}`,
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

var UserObject = new BankAccountController();
export default UserObject;
