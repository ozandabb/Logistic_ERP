import Axios from "axios";
import Config from "../Config.controller";

class Vehiclecontroller{
    constructor(){
        this.api = {
            addVehicle: "/api/vehicle/create",
            getAllVehicle: "/api/vehicle/all",
            getOneVehicleByID: "/api/vehicle",
            UpdateVehicle: "/api/vehicle",
            DeleteVehicle: "/api/vehicle",
            addFuel : "/api/vehicle/fuel/create",
            addRepire : "/api/vehicle/repair/create",
            getAllFuel_by_VehicleID :"/api/vehicle/fuel/getbyvehicle",
            GetRepaireDetails : "/api/vehicle/repair/getbyvehicle",
            DeleteFuel : "/api/vehicle/fuel", 
            DeleteRepaire: ""
        };
    }

    //add a new vehicle
    addVehicle = async (data, token) => {
        return await Axios.post( `${Config.host}${Config.port}${this.api.addVehicle}`, data,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data , status : 201 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }

    //add a new fuel details
    addFuel = async (data, token) => {
        return await Axios.post( `${Config.host}${Config.port}${this.api.addFuel}/${data.id}`, data,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data , status : 201 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }

    //add a new fuel Repaire
    addRepire = async (data, token) => {
        console.log("repaire" , data);
        return await Axios.post( `${Config.host}${Config.port}${this.api.addRepire}/${data.id}`, data,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data , status : 201 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }

    //GET all vehicles
    getAllVehicle = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllVehicle}`,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
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

    //GET all Repaire details by vehicle id
    GetRepaireDetails = async (id, token) => {
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.GetRepaireDetails}/${id}`,
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

    //GET all Fuel details by vehicleid
    getAllFuel_by_VehicleID = async (id, token) => {
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getAllFuel_by_VehicleID}/${id}`,
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


    getOneVehicleByID = async (id, token) => {
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getOneVehicleByID}/${id}`,
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

    //UPDATE a Vehicle
    UpdateVehicle = async ( data , token ) => {
        return await Axios.patch( `${Config.host}${Config.port}${this.api.UpdateVehicle}/${data.id}`, data,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
        .then(Response => {
            return { ...Response.data , status : 200 }
        })
        .catch(err => {
            console.error(err);
            return { ...err , status : 400 }
        });
    }

    //DELETE a Vehicle
    DeleteVehicle = async ( id , token ) => {
        return await Axios.delete( `${Config.host}${Config.port}${this.api.DeleteVehicle}/${id}`,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                console.log("delete datda", Response);
                return { ...Response.data , status : 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }

    //DELETE a Fuel details
    DeleteFuel = async ( id , token ) => {
        return await Axios.delete( `${Config.host}${Config.port}${this.api.DeleteFuel}/${id}`,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                console.log("delete datda", Response);
                return { ...Response.data , status : 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }

     //DELETE a Repaire details
     DeleteRepaire = async ( id , token ) => {
        return await Axios.delete( `${Config.host}${Config.port}${this.api.DeleteRepaire}/${id}`,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                console.log("delete datda", Response);
                return { ...Response.data , status : 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }










}
var UserObject = new Vehiclecontroller();
export default UserObject;