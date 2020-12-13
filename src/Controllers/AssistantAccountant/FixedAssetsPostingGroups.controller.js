import Axios from "axios";
import Config from "../Config.controller";

class FixedAssetsPostingGroups {
    constructor() {
        this.api = {
            addFixedAssetsPostingGroup: "/api/fix_assets/posting_groups/create",
            getAllFixedAssetsPostingGroups: "/api/fix_assets/posting_groups/get",
            getFixedAssetsPostingGroupByID: "/api/fix_assets/posting_groups/get",
            updateFixedAssetsPostingGroup: "/api/fix_assets/posting_groups/update",
            DeleteFixedAssetsPostingGroup: "/api/fix_assets/posting_groups/delete",
        };
    }

    //ADD a new FixedAssetsPostingGroup
    addFixedAssetsPostingGroup = async (data, token) => {
        return await Axios.post(`${Config.host}${Config.port}${this.api.addFixedAssetsPostingGroup}`, data, {
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

    //GET all FixedAssetsPostingGroups
    getAllFixedAssetsPostingGroups = async (postSize, pageNumber, token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllFixedAssetsPostingGroups}?size=${postSize}&page=${pageNumber}`, {
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

    //GET all FixedAssetsPostingGroups Without Pagination
    getAllFixedAssetsPostingGroupsWithoutPagination = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllFixedAssetsPostingGroups}`, {
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

    //GET FixedAssetsPostingGroup by ID
    getFixedAssetsPostingGroupByID = async (id, token) => {
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getFixedAssetsPostingGroupByID}/${id}`, {
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

    //UPDATE a FixedAssetsPostingGroup
    updateFixedAssetsPostingGroup = async (data, token) => {
        return await Axios.patch(`${Config.host}${Config.port}${this.api.updateFixedAssetsPostingGroup}/${data.id}`, data,
            { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', } })
            .then(Response => {
                return { ...Response.data, status: 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err, status: 400 }
            });
    }

    //DELETE a FixedAssetsPostingGroup
    DeleteFixedAssetsPostingGroup = async (id, token) => {
        return await Axios.delete(`${Config.host}${Config.port}${this.api.DeleteFixedAssetsPostingGroup}/${id}`, {
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
var UserObject = new FixedAssetsPostingGroups();
export default UserObject;