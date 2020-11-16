import Axios from "axios";
import Config from "../Config.controller";

class FixedAssetsClasses {
    constructor() {
        this.api = {
            addFixedAssetsClass: "/api/fix_assets/classes/create",
            getAllFixedAssetsClasses: "/api/fix_assets/classes/get",
            getFixedAssetsClassByID: "/api/fix_assets/classes/get",
            updateFixedAssetsClass: "/api/fix_assets/classes/update",
            DeleteFixedAssetsClass: "/api/fix_assets/classes/delete",
        };
    }

    //ADD a new FixedAssetsClass
    addFixedAssetsClass = async (data, token) => {
        return await Axios.post(`${Config.host}${Config.port}${this.api.addFixedAssetsClass}`, data, {
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

    //GET all FixedAssetsClasses
    getAllFixedAssetsClasses = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllFixedAssetsClasses}`, {
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

    //GET FixedAssetsClass by ID
    getFixedAssetsClassByID = async (id, token) => {
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getFixedAssetsClassByID}/${id}`, {
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

    //UPDATE a FixedAssetsClass
    updateFixedAssetsClass = async (data, token) => {
        return await Axios.patch(`${Config.host}${Config.port}${this.api.updateFixedAssetsClass}/${data.id}`, data,
            { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', } })
            .then(Response => {
                return { ...Response.data, status: 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err, status: 400 }
            });
    }

    //DELETE a FixedAssetsClass
    DeleteFixedAssetsClass = async (id, token) => {
        return await Axios.delete(`${Config.host}${Config.port}${this.api.DeleteFixedAssetsClass}/${id}`, {
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
var UserObject = new FixedAssetsClasses();
export default UserObject;