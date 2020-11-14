import React,{useState} from 'react';
import { Spinner } from '../../../../../Components/smallspinner';
import { FormInput, FormSelect } from '../../../../../Components/Form';
import { BasicModal } from '../../../../BackOffice/BackOffice Components/shared/modal';
import PurchaseOrderObject from '../../../../../Controllers/Purchasing Order/PurchaseOrder.controller'



const AddSupplierClaim = ({
    token="",
    supplier="",
    customers=null,
    item=null,
    submitBtnTxt="",
    cancelBtnTxt="",
    show=false,
    handleCloseFn=()=>undefined,
   
})=>  {

    const [form, setForm] = useState({discount:0,customer:""});
    const [error, setError] = useState({discount:'',customer:""});
    const [spinner, setSpinner] = useState(false);

    const handleClose=()=>{
        if(spinner)return;
        handleCloseFn();
        setForm({discount:0,customer:""});
        setError({discount:'',customer:""});
    }

    const onSubmitHandler=()=>{
        console.log(error,form)
        if(error.customer || error.discount || form.customer==='' || form.discount===0){
            return;
        }
        setSpinner(true);
        console.log({
            customer_id:form.customer,
            item_id:item.id,
            supplier_id:supplier,
            discount:form.discount
        })
        PurchaseOrderObject.addSupplierDiscount(
            {
                customer_id:form.customer,
                item_id:item.id,
                supplier_id:supplier,
                discount:form.discount
            },
            token,
            (err,data)=>{
                setSpinner(false);
                if(!err){
                    handleClose();
                }

            }
        );


    }

    const onChangeHandler=(name,value)=>{
        setForm(pre=>{
            return{
                ...pre,
                [name]:value
            }
        });
        if(value===""){
            setError(pre=>{
                return {
                    ...pre,
                    [name]:`${name} is required`
                }
            });
        }else{
            setError(pre=>{
                return {
                    ...pre,
                    [name]:''
                }
            });
        }
        if(name==="discount"){
            var pattern=/[^0-9]/;
            if( pattern.test(value) || value<0 || value>100){
                setError(pre=>{
                    return {
                        ...pre,
                        [name]:`${name} should be 0-100 number`
                    }
                }); 
            }
        }
    }
    return(
        <BasicModal
            
            headerTxt={item?item.name:""}
            submitBtnTxt={submitBtnTxt}
            cancelBtnTxt={cancelBtnTxt}
            show={show}
            handleClose={handleClose}
            onSubmitFn={onSubmitHandler}
            
        >
            <div className="row">
                <div className="col-md-8">
                    <FormSelect
                        error={error.customer?true:false}
                        error_meesage={error.customer}
                        options={customers}
                        value={form.customer}
                        label="Customer"
                        name="customer"
                        onChange={(e)=>{
                            onChangeHandler(e.target.name,e.target.value)
                        }}
                    />
                </div>
                <div className="col-md-4">
                    <FormInput
                        error={error.discount?true:false}
                        error_meesage={error.discount}
                        value={form.discount}
                        label="Discount Rate(%)"
                        name="discount"
                        onChange={(e)=>{
                            onChangeHandler(e.target.name,e.target.value)
                        }}
                    />
                </div>  

            </div>
            <div className="row" style={{textAlign:"center"}}>
                    {
                        spinner?
                        <Spinner
                            style={{margin:'auto',marginTop:30}} 
                        />
                        :
                        ""
                    }
                </div>


        </BasicModal>
    );
}

export{
    AddSupplierClaim
}