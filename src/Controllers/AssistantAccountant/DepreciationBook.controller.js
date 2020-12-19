import Axios from "axios";
import Config from "../Config.controller";

class DepreciationBook {
    constructor() {
        this.api = {
            addDepreciationBook: "/api/depreciation/create",
            getAllDepreciationBooks: "/api/depreciation/getall",
            getDepreciationBookByID: "/api/depreciation/getone",
            getDepreciationBookByMethod: "/api/depreciation/method",
        };
    }

    //ADD a new DepreciationBook
    addDepreciationBook = async (data, token) => {
        return await Axios.post(`${Config.host}${Config.port}${this.api.addDepreciationBook}`, data, {
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

    //GET all DepreciationBooks
    getAllDepreciationBooks = async (postSize, pageNumber, token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllDepreciationBooks}?size=${postSize}&page=${pageNumber}`, {
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

    //GET all DepreciationBooks Without Pagination
    getAllDepreciationBooksWithoutPagination = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllDepreciationBooks}`, {
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

    //GET DepreciationBook by ID
    getDepreciationBookByID = async (id, token) => {
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getDepreciationBookByID}/${id}`, {
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
                    console.log(err.response);
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

    //Get DepreciationBook By Method
    getDepreciationBookByMethod = async (data, token) => {
        return await Axios.post(`${Config.host}${Config.port}${this.api.getDepreciationBookByMethod}`, data, {
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
}
var UserObject = new DepreciationBook();
export default UserObject;