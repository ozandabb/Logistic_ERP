import React,{useState} from 'react';
import Backoffice_Sidebar from "../../Sidebar.Backoffice";
import {SampleTabel} from '../shared/table';
import {BaseBtn} from '../shared/button'
import { ViewUser } from './viewUser';


const Cheque=({

})=>{

    const [show, setshow] = useState(false);

    const getAcceptBtn=(id="")=>{
        return(
            <BaseBtn
                btnText={"Accept"}
                btnVarient={"success"}
                onClickFn={()=>console.log("Accept")}
            />
        );
    }
    
    const getRejectBtn=(id="")=>{
        return(
            <BaseBtn
                btnText={"Reject"}
                btnVarient={"danger"}
                onClickFn={()=>console.log("Reject")}
            />
        );
    }

    const getViewBtn=(id="")=>{
        return(
            <BaseBtn
                btnText={"View"}
                btnVarient={"info"}
                onClickFn={()=>setshow(true)}
            />
        );
    }
    return(
        <div className="bg-light wd-wrapper">
        <Backoffice_Sidebar activemenu={'backOffice_Cheque'} />
        <div  className="wrapper-wx" style={{height:"100hv"}}>
            <ViewUser
                show={show}
                handleClose={()=>setshow(false)}
            />
            <SampleTabel
                columns={[
                    {name:"Name",key:"name"},
                    {name:"Age",key:"age"},
                    {name:"",key:"accept"},
                    {name:"",key:"reject"},
                    {name:"",key:"view"},

                ]}
                rows={[
                    {
                    "name":"Pradeepa Sandaruwan",
                    "age":"11",
                    "accept":getAcceptBtn(),
                    'reject':getRejectBtn(),
                    "view":getViewBtn()

                    },
                    {
                        "name":"Pradeepa Sandaruwan",
                        "age":"11",
                        "accept":getAcceptBtn(),
                        'reject':getRejectBtn(),
                        "view":getViewBtn()
                    }
                ]}
            /> 
           
        </div>
       
    </div>
    );
}

export{
    Cheque
}