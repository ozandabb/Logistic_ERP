import React,{useState} from 'react';
import { Spinner } from '../../../../../Components/smallspinner';
import { FormInput } from '../../../../../Components/Form';
import { BasicModal } from '../../../../BackOffice/BackOffice Components/shared/modal';
import PurchaseOrderObject from '../../../../../Controllers/Purchasing Order/PurchaseOrder.controller'

const AddOrderPopUp=({
    item=null,
    supplier="",
    submitBtnTxt="",
    cancelBtnTxt="",
    show=false,
    token="",
    handleClose=()=>undefined,
    
})=>{
    const [quantity,setQuantity]=useState("");
    const [error,setError]=useState("");
    const [spinner,setSpinner]=useState(false);


    const handleChange=(val)=>{
        var pattern=/[^0-9]/;
        setQuantity(val);
        if(val==="" || val ==='0'){
            setError("Field is Required");
            return;
        }else{
            setError("");
        }
        if(pattern.test(val)){
            setError("Value must be a Number");
        }else{
            setError("");
        }
    }
    const onSubmitHandler=()=>{
        if(!error){
            setSpinner(true);
            PurchaseOrderObject.addOrder(
                {
                    "supplier_code" : supplier,
                    "items" : [
                        { 
                            "id" : item.id,
                            "quantity" : quantity
                        }
                    ]
                },
            token,
            ((err,data)=>{
                setSpinner(false);
                if(!err){
                    handleCloseFn();
                }

            }));
        }
    }
    const handleCloseFn=()=>{
        if(spinner)return;
        setQuantity("");
        setError("");
        setSpinner(false);
        handleClose();
    }
    return(
        <BasicModal
            headerTxt={item?item.name:""}
            submitBtnTxt={submitBtnTxt}
            cancelBtnTxt={cancelBtnTxt}
            show={show}
            handleClose={handleCloseFn}
            onSubmitFn={onSubmitHandler}
            cancelFn={handleChange}
        >
           <div className="row" style={{textAlign:"center"}}>
               <div className="col-md-3"></div>
               <div className="col-md-6">
               <FormInput
                    value={quantity}
                    onChange={(e)=>{
                        handleChange(e.target.value)
                    }}
                    error={error?true:false}
                    error_meesage={error}
                    style={{margin:"auto",width:'100%'}}
                    name="quantity"
                    label="Enter Quentity"
                />
                {
                    spinner?
                    <Spinner
                        style={{marginTop:30}} 
                    />:
                    ""
                }
               </div>
           </div>
        </BasicModal>
    );
}
export{
    AddOrderPopUp
}