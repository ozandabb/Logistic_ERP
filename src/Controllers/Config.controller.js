import { toast } from 'react-toastify';
import { confirmAlert } from "react-confirm-alert";

class Config{
  constructor(){
    //backend server details
    this.host = "http://localhost:";
    // this.host = "http://saleserp-env.eba-u2mkdt2x.us-east-2.elasticbeanstalk.com";
    this.port = "4000";
    // this.port = "";
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

  //Toast for error display
  setErrorToast(msg){
    toast.error( msg, {
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
    });
  }

  //delete confirm alert
  setDeleteConfirmAlert(title , msg , confirm , cancel ){
    confirmAlert({
      title: title,
      message: msg,
      buttons: [
        {
          label: 'Yes',
          onClick: () => confirm()
        },
        {
          label: 'No',
          onClick: () => cancel()
        }
      ]
    });
  }

  //Validation alert
  setValidateConfirmAlert(title , msg , confirm , cancel ){
    confirmAlert({
      title: title,
      message: msg,
      buttons: [
        {
          label: 'Yes',
          onClick: () => confirm()
        },
        {
          label: 'No',
          onClick: () => cancel()
        }
      ]
    });
  }








}

var obj = new Config();
export default obj;