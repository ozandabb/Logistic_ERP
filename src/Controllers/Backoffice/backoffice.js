import Axios from "axios";
import Config from "../Config.controller";

class BackOffice {
    constructor() {
        this.api = {
            get_all_customers: "/api/customer/all",
            get_all_routes: "/api/route/all",
            create_route: "/api/route/create",
            delete_route: "/api/route/delete",
            all_confirm_orders: "/api/sales_orders/get/confirm/notassign",
            create_job_card: "/api/jobcards/create",

            getAllJobCards: "/api/jobcards/get",
            getOneJobCrad : "/api/jobcards/get",
            UpdateJobCard : "/api/jobcards/update",
          
        };
    }

    addRoute = async (data, token) => {
        return await Axios.post(`${Config.host}${Config.port}${this.api.create_route}`, data, {
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
    creae_job_card_i = async (data, token) => {
        console.log(data);
        return await Axios.post(`${Config.host}${Config.port}${this.api.create_job_card}`, data, {
            headers: {
                'Authorization': `bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then(Response => {
                console.log(Response);
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
    delete_route = async (id, token) => {
        console.log(id);
        return await Axios.delete(`${Config.host}${Config.port}${this.api.delete_route}/${id}`, {
            headers: {
                'Authorization': `bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then(Response => {
                console.log(Response);
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

    //GET all customers
    getAllCustomers = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.get_all_customers}`, {
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

    //GET all customers
    getAllRoutes = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.get_all_routes}`, {
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

    
    // get one job card by id
    getOneJobCrad = async (id, token) => {
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getOneJobCrad}/${id}`,
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

    //update job card
     UpdateJobCard = async ( data , token ) => {
        return await Axios.patch( `${Config.host}${Config.port}${this.api.UpdateJobCard}/${data.id}`, data,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data , status : 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }

    //GET all job cards
    getAllJobCards = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllJobCards}`, {
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

    get_all_confirm_orders = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.all_confirm_orders}`, {
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


}
var UserObject = new BackOffice();
export default UserObject;