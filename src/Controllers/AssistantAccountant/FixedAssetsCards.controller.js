import Axios from "axios";
import Config from "../Config.controller";

class FixedAssetsCards {
    constructor() {
        this.api = {
            addFixedAssetsCard: "/api/fixedassetcards/create",
            getAllFixedAssetsCards: "/api/fixedassetcards/getall",
            getFixedAssetsCardByID: "/api/fixedassetcards/getone",
        };
    }

    //ADD a new FixedAssetsCard
    addFixedAssetsCard = async (data, token) => {
        return await Axios.post(`${Config.host}${Config.port}${this.api.addFixedAssetsCard}`, data, {
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

    //GET all FixedAssetsCards
    getAllFixedAssetsCards = async (postSize, pageNumber, token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllFixedAssetsCards}?size=${postSize}&page=${pageNumber}`, {
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

    //GET all FixedAssetsCards Without Pagination
    getAllFixedAssetsCardsWithoutPagination = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllFixedAssetsCards}`, {
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

    //GET FixedAssetsCard by ID
    getFixedAssetsCardByID = async (id, token) => {
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getFixedAssetsCardByID}/${id}`, {
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

}
var UserObject = new FixedAssetsCards();
export default UserObject;