import MainController from '../main.controller'
import Config from "../Config.controller";

class SalesOrdercontroller{

    constructor(){
        this.api = {
            getAllItems: "/api/stocks/main/get",
            getAllPendingRequests: "/api/sales_orders/get/pending",
            getAllAcceptedRequests: "/api/sales_orders/get/completed",
            getAllRejectedRequests: '/api/sales_orders/get/reject',
            acceptSaledOrder: '/api/sales_orders/backoffice/confirm/',
            rejectSaledOrder: '/api/sales_orders/backoffice/reject/',
            updateQuantity:'/api/sales_orders/update/'

        };
    }


    getAllItems = async (token ,cb=()=>undefined) => {
        MainController.getWithJWT(this.api.getAllItems,token).then(data=>{
            cb(null,data.data);
        }).catch(error=>{
            console.log(error);
            cb(error,null);
        });
    }

    getAllPendingRequests = async (token,cb=()=>undefined) => {
        MainController.getWithJWT(this.api.getAllPendingRequests,token).then(data=>{
            cb(null,data.data);
        }).catch(error=>{
            cb(error,null);
        });
    }
    getAllAcceptedRequests = async (token,cb=()=>undefined) => {
        MainController.getWithJWT(this.api.getAllAcceptedRequests,token).then(data=>{
            cb(null,data.data);
        }).catch(error=>{
            cb(error,null);
        });
        
    }
    getAllRejectedRequests = async (token,cb=()=>undefined) => {
        MainController.getWithJWT(this.api.getAllRejectedRequests,token).then(data=>{
            console.log(data)
            cb(null,data.data);
        }).catch(error=>{
            cb(error,null);
        });
    }

    acceptSaledOrder = async (id, data, token ,cb=()=>undefined) => {
         
        MainController.patchWithJWT(this.api.acceptSaledOrder+id,data,token).then(response=>{
            Config.setToast("Successfully Accepted!!!");
            cb(null,response.data);
        }).catch(error=>{
            Config.setErrorToast("Something Went Wrong Please Try again!!!");
            cb(error,null);
        });
        MainController.patchWithJWT(this.api.updateQuantity+id,data,token).then(response=>{
            Config.setToast("Successfully Updated!!!");
            cb(null,response.data);
        }).catch(error=>{
            Config.setErrorToast("Something Went Wrong Please Try again!!!");
            cb(error,null);
        });
    }

    rejectSaledOrder = async (id, token ,cb=()=>undefined) => {
        
        MainController.patchWithJWT(this.api.rejectSaledOrder+id,{},token).then(response=>{
            Config.setToast("Successfully Rejected!!!");
            cb(null,response.data);
        }).catch(error=>{
            Config.setErrorToast("Something Went Wrong Please Try again!!!");
            cb(error,null);
        });
    }
 
    



}
var SalesOrdercontrollerObject = new SalesOrdercontroller();
export default SalesOrdercontrollerObject;