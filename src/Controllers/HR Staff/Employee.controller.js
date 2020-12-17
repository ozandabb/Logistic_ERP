import Axios from "axios";
import Config from "../Config.controller";

class Employeecontroller{
    constructor(){
        this.api = {
            addEmployee: "/api/employees/create",
            getAllEmployee: "/api/employees/getall",
            getOneEmpoyeByID: "/api/employees/getone",
            GetAllGoals: "/api/goals/get",
            UpdateGoals: "/api/goals/update/tasks",
            DeleteGoal: "/api/goals/delete"
        };
    }

    addEmployee = async (data, token) => {
        return await Axios.post( `${Config.host}${Config.port}${this.api.addEmployee}`, data,
        { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
            .then(Response => {
                return { ...Response.data  }
            })
            .catch(err => {
                console.error(err);
                return { ...err , status : 400 }
            });
    }

 
    getAllEmployee = async (token) => {
        var resp = 600;
        var userData = {}
        await Axios.get(`${Config.host}${Config.port}${this.api.getAllEmployee}`,
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


    getOneEmpoyeByID = async (id, token) => {
        var resp = 600;
        var userData = {}
        const data = await Axios.get(
            `${Config.host}${Config.port}${this.api.getOneEmpoyeByID}/${id}`,
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

   //get all gaols
   GetAllGoals = async (id,token) => {
    var resp = 600;
    var userData = {}
    await Axios.get(`${Config.host}${Config.port}${this.api.GetAllGoals}/${id}`,
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

  //UPDATE a goals
  UpdateGoals = async ( data , token ) => {
      console.log("gooooooooooooooooooooool id", data.id);
    return await Axios.patch( `${Config.host}${Config.port}${this.api.UpdateGoals}/${data.id}`, data,
    { headers: { 'Authorization': `bearer ${token}`, 'Content-Type': 'application/json', }} )
        .then(Response => {
            return { ...Response.data , status : 200 }
        })
        .catch(err => {
            console.error(err);
            return { ...err , status : 400 }
        });
}

//DELETE a Goal
DeleteGoal = async ( id , token ) => {
    return await Axios.delete( `${Config.host}${Config.port}${this.api.DeleteGoal}/${id}`,
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
var UserObject = new Employeecontroller();
export default UserObject;