import Axios from "axios";
import Config from "../Config.controller";

class VatProductPostingGroupController {
    constructor() {
        this.api = {
            getAllVatProductPostingGroups: "/api/prodvatgroups/getall",
            getOneVatProductPostingGroup: "/api/prodvatgroups/getone",
            createOneVatProductPostingGroup: '/api/prodvatgroups/create',
            deleteVatProductPostingGroup: '/api/prodvatgroups/delete',
            updateVatProductPostingGroup: '/api/prodvatgroups/update'

        };
    }

    //Get all vat product posting groups
    getAllVatProductPostingGroups = async (token) => {
        var resp = 600;
        var userData = {};
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllVatProductPostingGroups}`,
            { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', } })
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

    //ADD a new vat product posting group
    createOneVatProductPostingGroup = async (data, token) => {
        return await Axios.post(`${Config.host}${Config.port}${this.api.createOneVatProductPostingGroup}`, data,
            { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', } })
            .then(Response => {
                return { ...Response.data, status: 201 }
            })
            .catch(err => {
                console.error(err);
                return { ...err, status: 400 }
            });
    };

    //DELETE a vat product posting group
    deleteVatProductPostingGroup = async (id, token) => {
        return await Axios.delete(`${Config.host}${Config.port}${this.api.deleteVatProductPostingGroup}/${id}`,
            { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', } })
            .then(Response => {
                return { ...Response.data, status: 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err, status: 400 }
            });
    }

    //GET vat product posting group by ID
    getOneVatProductPostingGroupById = async (id, token) => {
        var resp = 600;
        var userData = {};
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getOneVatProductPostingGroup}/${id}`,
            { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', } })
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

    //UPDATE a vat product posting group
    updateVatProductPostingGroup = async (data, token) => {
        return await Axios.patch(`${Config.host}${Config.port}${this.api.updateVatProductPostingGroup}/${data.id}`, data,
            { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', } })
            .then(Response => {
                return { ...Response.data, status: 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err, status: 400 }
            });
    }
}

var UserObject = new VatProductPostingGroupController();
export default UserObject;