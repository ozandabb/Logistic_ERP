import MainController from '../main.controller'
import Config from "../Config.controller";

class PurchaseOrderRequestcontroller{

    constructor(){
        this.api = {
    
            createLeave:'/api/leave/request/',
            CreateMaternityLeave:'/api/leave/request/maternity/',
            getAvailableLeaves:'/api/leave/get/available/',
            leaveEntitlement:'/api/leave/get/entitlement',
            checkMaternityLeave:'/api/leave/get/maternity',


        };
    }


    createLeave = async (data, token, id, cb=()=>undefined) => {
        MainController.postWithJWT(this.api.createLeave+id,data,token).then(data=>{
            Config.setToast("Successfully Added!!!");
            cb(null,data.data);
        }).catch(error=>{
            console.log(error);
            Config.setErrorToast("Something Went Wrong Please Try again!!!");
            cb(error,null);
        });
    }

    CreateMaternityLeave = async (data, token, id, cb=()=>undefined) => {
        MainController.postWithJWT(this.api.createLeave+id,data,token).then(data=>{
            Config.setToast("Successfully Added!!!");
            cb(null,data.data);
        }).catch(error=>{
            console.log(error);
            Config.setErrorToast("Something Went Wrong Please Try again!!!");
            cb(error,null);
        });
    }
    getAvailableLeaves = async (id, token, cb=()=>undefined) => {
        MainController.getWithJWT(this.api.getAvailableLeaves+id,token).then(data=>{
            cb(null,data.data);
        }).catch(error=>{
            cb(error,null);
        });
    }
    leaveEntitlement = async (token, cb=()=>undefined) => {
        MainController.getWithJWT(this.api.leaveEntitlement,token).then(data=>{
            cb(null,data.data);
        }).catch(error=>{
            cb(error,null);
        });
    }

    checkMaternityLeave = async (token ,cb=()=>undefined) => {
        
        MainController.getWithJWT(this.api.checkMaternityLeave,token).then(data => {
            Config.setToast("Successfully Added!!!");
            cb(null,data.data);
        }).catch(error=>{
            Config.setErrorToast("Something Went Wrong Please Try again!!!");
            cb(error,null);
        });
    }

   
    



}
var PurchaseOrderRequestcontrollerObject = new PurchaseOrderRequestcontroller();
export default PurchaseOrderRequestcontrollerObject;