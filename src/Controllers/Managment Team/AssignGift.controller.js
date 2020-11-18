
import MainController from '../main.controller'
import Config from "../Config.controller";

class AssignGiftController{

    constructor(){
        this.api = {
            getAllGift: "/api/gifts/getall",
            getAllCustomers: "/api/customer/all",
            assignGift:'/api/gifts/assign/create'
        };
    }


    assignGift = async (data, token, cb=()=>undefined) => {
        MainController.postWithJWT(this.api.assignGift, data, token).then(response=>{
            Config.setToast("Successfully Added!!!");
            cb(null,response.data);
        }).catch(error=>{
            console.log(error);
            Config.setErrorToast("Something Went Wrong Please Try again!!!");
            cb(error,null);
        });
    }

    

    getAllGift = async (token,cb=()=>undefined) => {
        MainController.getWithJWT(this.api.getAllGift,token).then(data => {
            cb(null,data.data);
        }).catch(error => {
            cb(error,null);
        });
    }
    getAllCustomers = async (token,cb=()=>undefined) => {
        MainController.getWithJWT(this.api.getAllCustomers,token).then(data=>{
            cb(null,data.data);
        }).catch(error=>{
            cb(error,null);
        });
    }
    // getAllReject = async (token,cb=()=>undefined) => {
    //     MainController.getWithJWT(this.api.getAllReject,token).then(data=>{
    //         cb(null,data.data);
    //     }).catch(error=>{
    //         cb(error,null);
    //     });
    // }
    


}
var AssignGiftControllerObject = new AssignGiftController();
export default AssignGiftControllerObject;