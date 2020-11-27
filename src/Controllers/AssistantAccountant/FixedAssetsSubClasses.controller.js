import Axios from "axios";
import Config from "../Config.controller";

class FixedAssetsSubClasses {
    constructor() {
        this.api = {
            addFixedAssetsSubClass: "/api/fix_assets/sub_classes/create",
            getAllFixedAssetsSubClasses: "/api/fix_assets/sub_classes/get",
            getFixedAssetsSubClassByID: "/api/fix_assets/sub_classes/get",
            updateFixedAssetsSubClass: "/api/fix_assets/sub_classes/update",
            DeleteFixedAssetsSubClass: "/api/fix_assets/sub_classes/delete",
        };
    }

    //ADD a new FixedAssetsSubClass
    addFixedAssetsSubClass = async (data, token) => {
        return await Axios.post(`${Config.host}${Config.port}${this.api.addFixedAssetsSubClass}`, data, {
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

    //GET all FixedAssetsSubClasses
    getAllFixedAssetsSubClasses = async (postSize, pageNumber, token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllFixedAssetsSubClasses}?size=${postSize}&page=${pageNumber}`, {
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

    //GET all FixedAssetsSubClasses Without Pagination
    getAllFixedAssetsSubClassesWithoutPagination = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllFixedAssetsSubClasses}`, {
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

    //GET FixedAssetsSubClass by ID
    getFixedAssetsSubClassByID = async (id, token) => {
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getFixedAssetsSubClassByID}/${id}`, {
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

    //UPDATE a FixedAssetsSubClass
    updateFixedAssetsSubClass = async (data, token) => {
        return await Axios.patch(`${Config.host}${Config.port}${this.api.updateFixedAssetsSubClass}/${data.id}`, data,
            { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', } })
            .then(Response => {
                return { ...Response.data, status: 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err, status: 400 }
            });
    }

    //DELETE a FixedAssetsSubClass
    DeleteFixedAssetsSubClass = async (id, token) => {
        return await Axios.delete(`${Config.host}${Config.port}${this.api.DeleteFixedAssetsSubClass}/${id}`, {
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
var UserObject = new FixedAssetsSubClasses();
export default UserObject;