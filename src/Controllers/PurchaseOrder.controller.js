import Axios from "axios";
import MainController from './main.controller'

class PurchaseOrdercontroller{

    constructor(){
        this.api = {
            create: "/api/purchase_orders/create",
            getAllSupliers: "/api/suppliers/getall",
            getItemBySupplier: '/api/items/get/supplier/'
        };
    }


    addOrder = async (data, token ,cb=()=>undefined) => {
        MainController.postWithJWT(this.api.create,data,token).then(data=>{
            cb(null,data.data);
        }).catch(error=>{
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
    getItemsBySuplier = async (token,id,cb=()=>undefined) => {
        console.log(id);
        MainController.getWithJWT(this.api.getItemBySupplier+id,token).then(data=>{
            cb(null,data.data);
        }).catch(error=>{
            cb(error,null);
        });
    }

 
    



}
var PurchaseOrderObject = new PurchaseOrdercontroller();
export default PurchaseOrderObject;