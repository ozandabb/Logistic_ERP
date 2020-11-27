import MainController from '../main.controller'
import Config from "../Config.controller";

class PurchaseOrdercontroller{

    constructor(){
        this.api = {
            create: "/api/purchase_orders/create",
            getAllSupliers: "/api/suppliers/getall",
            getAllCustomners: "/api/customer/all",
            getItemBySupplier: '/api/items/get/supplier/',
            addSupplierDiscount: '/api/supplierdiscounts/create',
            addSupplierGift:'/api/gifts/create',
        };
    }


    addOrder = async (data, token ,cb=()=>undefined) => {
        MainController.postWithJWT(this.api.create,data,token).then(data=>{
            Config.setToast("Successfully Added!!!");
            cb(null,data.data);
        }).catch(error=>{
            console.log(error);
            Config.setErrorToast("Something Went Wrong Please Try again!!!");
            cb(error,null);
        });
    }

    getAllSupliers = async (token,cb=()=>undefined) => {
        MainController.getWithJWT(this.api.getAllSupliers,token).then(data=>{
            cb(null,data.data);
        }).catch(error=>{
            cb(error,null);
        });
    }
    getAllCustomners = async (token,cb=()=>undefined) => {
        MainController.getWithJWT(this.api.getAllCustomners,token).then(data=>{
            cb(null,data.data);
        }).catch(error=>{
            cb(error,null);
        });
    }
    getItemsBySuplier = async (token,id,cb=()=>undefined) => {
        MainController.getWithJWT(this.api.getItemBySupplier+id,token).then(data=>{
            cb(null,data.data);
        }).catch(error=>{
            cb(error,null);
        });
    }

    addSupplierDiscount = async (data, token ,cb=()=>undefined) => {
        
        MainController.postWithJWT(this.api.addSupplierDiscount,data,token).then(data=>{
            Config.setToast("Successfully Added!!!");
            cb(null,data.data);
        }).catch(error=>{
            Config.setErrorToast("Something Went Wrong Please Try again!!!");
            cb(error,null);
        });
    }

    addSupplierGift = async (data, token ,cb=()=>undefined) => {
        
        MainController.postWithJWT(this.api.addSupplierGift,data,token).then(data=>{
            Config.setToast("Successfully Added!!!");
            cb(null,data.data);
        }).catch(error=>{
            Config.setErrorToast("Something Went Wrong Please Try again!!!");
            cb(error,null);
        });
    }
 
    



}
var PurchaseOrderObject = new PurchaseOrdercontroller();
export default PurchaseOrderObject;