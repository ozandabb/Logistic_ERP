import { toast } from 'react-toastify';

class Config{
    constructor(){
        //backend server details
        this.host = "http://localhost:";
        // this.host = "http://saleserp-env.eba-u2mkdt2x.us-east-2.elasticbeanstalk.com";
        this.port = "4000";
        this.password = "";
    }

    // for toast messages
    setToast(msg){
        toast.info( msg, {
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        });
    }

    // for error messges
    setErrorToast(msg){
        toast.error( msg, {
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        });
    }

}

var obj = new Config();
export default obj;