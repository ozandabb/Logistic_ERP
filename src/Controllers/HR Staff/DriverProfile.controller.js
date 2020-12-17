import Axios from "axios";
import Config from "../Config.controller";

class DriverController{
    constructor(){
        this.api = {
            addDriver: "/api/driver/create",
            getAllDriver: "/api/driver/getall",
            getOneDriverByID: "/api/driver",
            UpdateDriver: "api/driver/update",
        };
    }

    addDriver = async (data, token) => {
        return await Axios.post( `${Config.host}${Config.port}${this.api.addDriver}`, data,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                console.log("driver data" ,Response );
                return { ...Response.data , status : 200 }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }

 
    getAllDriver = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllDriver}`,
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

    getOneDriverByID = async (id, token) => {
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getOneDriverByID}/${id}`,
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

      //UPDATE a driver
      UpdateDriver = async ( data , token ) => {
          console.log("drivr idddd", data);
        return await Axios.patch( `${Config.host}${Config.port}${this.api.UpdateDriver}/${data.id}`, data,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
        .then(Response => {
            return { ...Response.data , status : 200 }
        })
        .catch(err => {
            console.error(err);
            return { ...err , status : 400 }
        });
    }












}
var UserObject = new DriverController();
export default UserObject;