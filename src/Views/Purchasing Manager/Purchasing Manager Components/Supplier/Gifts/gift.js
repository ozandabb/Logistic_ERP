import React,{useState} from 'react';
import {   Card  } from 'react-bootstrap';
import { FormInput, FormSelect } from '../../../../../Components/Form';
import { FileUploader } from '../../../../../Components/fileUploader';
import {  faPaperclip} from '@fortawesome/free-solid-svg-icons'
import PurchaseOrder from '../../../../../Controllers/Purchasing Order/PurchaseOrder.controller'
import { Spinner } from '../../../../../Components/smallspinner';


const SupplierGift=({
    suppliers=[],
    token="",
})=>{

    const initialState={
        name:"",
        description:"",
        quantity:"",
        supplier_id:"",
        image:null,
    };

   

    const [form, setform] = useState(initialState);
    const [error, seterror] = useState(initialState);
    const [spinner, setspinner] = useState(false);

    const onChangeHandler=(name,value)=>{
        
        setform(pre=>{
            return {
                ...pre,
                [name]:value
            };
        });
        seterror(pre=>{
            return {
                ...pre,
                [name]:value===''?`This Field is Required`:'',
            };
        });
        
        var pattern=/[^0-9]/;
        if(name=="quantity" && pattern.test(value)){
            seterror(pre=>{
                return {
                    ...pre,
                    [name]:`Value should be a number `
                };
            }); 
        }
    }
    const onSubmitHandler=(e)=>{
        e.preventDefault();
        let flag=false;
        for(const i in error){
            if(form[i]==='' ||form[i] === null){
                seterror(pre=>{
                    return {
                        ...pre,
                        [i]:`This Field is Required`
                    };
                });    
                flag=true; 
            }
            
        }
        if(flag)return;
        for(const i in error){
            if(!(error[i]==='' || error[i]===null))return;
        }
        setspinner(true);
        PurchaseOrder.addSupplierGift(
            {
                ...form,
                image:form.image.name
            },
            token,
            (err,response)=>{
                setspinner(false);
                if(!err){
                    seterror(initialState);
                    setform(initialState);
                }
            }
        )
    }

    return(
        <div className="row" style={{ marginBottom:"15px" }} style={{minHeight:"100vh"}} onSubmit={(e)=>onSubmitHandler(e)}>
            <div className="col-12">
                <Card className="col-8" style={{margin:"auto",marginTop:50}}>
                    <Card.Body>
                            <div className="col-12 bg-white mt-1 pb-1" >
                                <form onSubmit={(e) => undefined}>
                                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Gift Details<br></br>
                                    <span className="text-muted small">You can Add supplier gifts to the system</span></h6>
                                           
                                    <div className="row" >
                                        <div className="col-sm-6">
                                            <FormInput
                                                label={'Gift Name *'}
                                                error={ error.name?true:false}
                                                value={form.name}
                                                name="name"
                                                onChange={(e)=>onChangeHandler(e.target.name,e.target.value)}
                                                error_meesage={error.name}
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <FormInput
                                                label={'Gift Description *'}
                                                error={ error.description?true:false}
                                                value={form.description}
                                                name="description"
                                                onChange={(e)=>onChangeHandler(e.target.name,e.target.value)}
                                                error_meesage={error.description}
                                            />
                                        </div>
                                    </div>
                                    <div className="row" >
                                        <div className="col-sm-6">
                                            <FormInput
                                                label={'Number Of Gifts*'}
                                                error={ error.quantity?true:false}
                                                value={form.quantity}
                                                name="quantity"
                                                onChange={(e)=>onChangeHandler(e.target.name,e.target.value)}
                                                error_meesage={error.quantity}
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <FormSelect
                                                options={suppliers}
                                                label={'Supplier*'}
                                                error={ error.supplier_id?true:false}
                                                value={form.supplier_id}
                                                name="supplier_id"
                                                onChange={(e)=>onChangeHandler(e.target.name,e.target.value)}
                                                error_meesage={error.supplier_id}
                                            />
                                        </div>
                                    </div>
                                    <div className="row" >
                                        <div className="col-sm-6">
                                            <FileUploader
                                                icon={faPaperclip}
                                                label="Select Your Image*"
                                                fileChange={(file)=>onChangeHandler('image',file)}
                                                error={error.image}
                                                file={form.image}
                                            />
                                        </div>
                                        
                                       
                                    </div>
                                    <div className="row">
                                        <div className="col-5" style={{textAlign:"center",display:"block"}}>
                                            {
                                                spinner?
                                                <Spinner
                                                // size={25} 
                                                style={{margin:"auto"}}
                                                />:
                                                ""
                                            }
                                        </div> 
                                        <div className="col-8 mt-3 mb-1" >
                                            <button disabled={spinner} type="submit" style={{backgroundColor:"#475466" , color:"#FFFFFF",  cursor: 'pointer'}} className="btn mt-2 btn btn-sm px-5">
                                            
                                                Submit</button>
                                            <button type="reset" disabled={spinner} style={{backgroundColor:"red",marginLeft:"10px", color:"#FFFFFF", cursor: 'pointer'}} 
                                            // onClick={() => this.clear()}
                                             className="btn mt-2 btn btn-sm px-5">Cancel</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export{
    SupplierGift
}