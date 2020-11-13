import Axios from "axios";
import Config from "./Config.controller";

class MainController{
    
    apiCallFn=(method="get",url="",headers={},data={})=>{
        return Axios({
            method,
            data,
            headers,
            url:`${Config.host}${Config.port}${url}`
        });
    }

    postWithJWT=(url,data,token)=>{
        return this.apiCallFn(
            'post',
            url,
            {
                'Authorization': `bearer ${token}`,
                'Content-Type': 'application/json' 
            },
            data
        );
    }

    getWithJWT=(url,token)=>{
        return this.apiCallFn(
            'get',
            url,
            {
                'Authorization': `bearer ${token}`, 
            },
        );
    }

}
var MainControllerObject = new MainController();
export default MainControllerObject;