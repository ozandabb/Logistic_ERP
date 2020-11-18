
import MainController from '../main.controller'
import Config from "../Config.controller";

class ManagmentTeamOrderController{

    constructor(){
        this.api = {
            acceptOLA: "/api/outstanding_limit/approve/",
            rejectOLA: "/api/outstanding_limit/reject/",
            getAllPendingOLA: "/api/outstanding_limit/get/pending",
            getAllAccept: "/api/outstanding_limit/get/approved/",
            getAllReject: '/api/outstanding_limit/get/rejected/',
           
        };
    }


    acceptOLA = async (comment, id, token, cb=()=>undefined) => {
        console.log(comment);
        MainController.patchWithJWT(this.api.acceptOLA+id, {comment}, token).then(data=>{
            Config.setToast("Successfully Accepted!!!");
            cb(null,data.data);
        }).catch(error=>{
            console.log(error);
            Config.setErrorToast("Something Went Wrong Please Try again!!!");
            cb(error,null);
        });
    }

    rejectOLA = async (comment, id, token, cb=()=>undefined) => {
        console.log(comment);
        MainController.patchWithJWT(this.api.rejectOLA+id, {comment}, token).then(data=>{
            Config.setToast("Successfully Rejeted!!!");
            cb(null,data.data);
        }).catch(error=>{
            console.log(error);
            Config.setErrorToast("Something Went Wrong Please Try again!!!");
            cb(error,null);
        });
    }
    

    getAllPendingOLA = async (token,cb=()=>undefined) => {
        MainController.getWithJWT(this.api.getAllPendingOLA,token).then(data=>{
            cb(null,data.data);
        }).catch(error=>{
            cb(error,null);
        });
    }
    getAllAccept = async (token,cb=()=>undefined) => {
        MainController.getWithJWT(this.api.getAllAccept,token).then(data=>{
            cb(null,data.data);
        }).catch(error=>{
            cb(error,null);
        });
    }
    getAllReject = async (token,cb=()=>undefined) => {
        MainController.getWithJWT(this.api.getAllReject,token).then(data=>{
            cb(null,data.data);
        }).catch(error=>{
            cb(error,null);
        });
    }
    


}
var ManagmentTeamOrderControllerObject = new ManagmentTeamOrderController();
export default ManagmentTeamOrderControllerObject;