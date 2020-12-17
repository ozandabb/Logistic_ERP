import Axios from "axios";
import Config from "../Config.controller";

class BusinessVatPostingGroupController {

    constructor() {
        this.api = {
            getAllBusinessVatPostingGroups: "/api/businessvatgroups/getall",
            getOneBusinessVatPostinGroupById: "/api/businessvatgroups/getone",
            addNewBusinessVatPostingGroup: '/api/businessvatgroups/create',
            deleteBusinessVatPostingGroup: '/api/businessvatgroups/delete',
            updateBusinessVatPostingGroup: '/api/businessvatgroups/update'

        };
    }

    //Get all business vat posting groups
    getAllBusinessVatPostingGroups = async (token) => {
        var resp = 600;
        var userData = {};
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllBusinessVatPostingGroups}`,
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

    //ADD a new business vat posting group
    addNewBusinessVatPostingGroup = async (data, token) => {
        return await Axios.post(`${Config.host}${Config.port}${this.api.addNewBusinessVatPostingGroup}`, data,
            { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', } })
            .then(Response => {
                return { ...Response.data, status: 201 }
            })
            .catch(err => {
                console.error(err);
                return { ...err, status: 400 }
            });
    };

    //DELETE a vat posting group
    deleteBusinessVatPostingGroup = async (id, token) => {
        return await Axios.delete(`${Config.host}${Config.port}${this.api.deleteBusinessVatPostingGroup}/${id}`,
            { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', } })
            .then(Response => {
                return { ...Response.data, status: 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err, status: 400 }
            });
    }

    //GET Business Vat posting group by ID
    getOneBusinessVatPostinGroupById = async (id, token) => {
        var resp = 600;
        var userData = {};
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getOneBusinessVatPostinGroupById}/${id}`,
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

    //UPDATE a  Business Vat posting group
    updateBusinessVatPostingGroup = async (data, token) => {
        return await Axios.patch(`${Config.host}${Config.port}${this.api.updateBusinessVatPostingGroup}/${data.id}`, data,
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

var UserObject = new BusinessVatPostingGroupController();
export default UserObject;