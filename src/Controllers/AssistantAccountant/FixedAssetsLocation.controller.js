import Axios from "axios";
import Config from "../Config.controller";

class FixedAssetsLocation {
    constructor() {
        this.api = {
            addFixedAssetsLocation: "/api/fix_assets/locations/create",
            getAllFixedAssetsLocations: "/api/fix_assets/locations/get",
            getFixedAssetsLocationByID: "/api/fix_assets/locations/get",
            updateFixedAssetsLocation: "/api/fix_assets/locations/update",
            DeleteFixedAssetsLocation: "/api/fix_assets/locations/delete",
        };
    }

    //ADD a new FixedAssetsLocation
    addFixedAssetsLocation = async (data, token) => {
        return await Axios.post(`${Config.host}${Config.port}${this.api.addFixedAssetsLocation}`, data, {
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

    //GET all FixedAssetsLocations
    getAllFixedAssetsLocations = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllFixedAssetsLocations}`, {
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

    //GET FixedAssetsLocation by ID
    getFixedAssetsLocationByID = async (id, token) => {
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getFixedAssetsLocationByID}/${id}`, {
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

    //UPDATE a FixedAssetsLocation
    updateFixedAssetsLocation = async (data, token) => {
        return await Axios.patch(`${Config.host}${Config.port}${this.api.updateFixedAssetsLocation}/${data.id}`, data,
            { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', } })
            .then(Response => {
                return { ...Response.data, status: 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err, status: 400 }
            });
    }

    //DELETE a FixedAssetsLocation
    DeleteFixedAssetsLocation = async (id, token) => {
        return await Axios.delete(`${Config.host}${Config.port}${this.api.DeleteFixedAssetsLocation}/${id}`, {
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
var UserObject = new FixedAssetsLocation();
export default UserObject;