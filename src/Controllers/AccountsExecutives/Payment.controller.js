import Axios from "axios";
import Config from "../Config.controller";

class Paymentcontroller {
    constructor() {
        this.api = {
            addPayment: "/api/payment/create",
            getAllPayments: "/api/payment/get",
            getPaymentByID: "/api/payment",
            DeletePayment: "/api/payment",
        };
    }

    //ADD a new payment
    addPayment = async (data, token) => {
        return await Axios.post(`${Config.host}${Config.port}${this.api.addPayment}`, data, {
            headers: {
                'Authorization': `bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then(Response => {
                return {
                    ...Response.data,
                    status: 201
                }
            })
            .catch(err => {
                console.error(err);
                return {
                    ...err,
                    status: 400
                }
            });
    }

    //GET all payments
    getAllPayments = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllPayments}`, {
            headers: {
                'Authorization': `bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
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

    //GET payment by ID
    getPaymentByID = async (id, token) => {
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getPaymentByID}/${id}`, {
            headers: {
                'Authorization': `bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
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

    //DELETE a payment
    DeletePayment = async (id, token) => {
        return await Axios.delete(`${Config.host}${Config.port}${this.api.DeletePayment}/${id}`, {
            headers: {
                'Authorization': `bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then(Response => {
                return {
                    ...Response.data,
                    status: 200
                }
            })
            .catch(err => {
                console.error(err);
                return {
                    ...err,
                    status: 400
                }
            });
    }

}
var UserObject = new Paymentcontroller();
export default UserObject;