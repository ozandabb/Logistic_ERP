import React, {useState} from 'react';
import { FormInput, FormSelect } from '../../../Components/Form';
import { BasicModal } from '../../BackOffice/BackOffice Components/shared/modal';
import AssignGiftControllerObject from '../../../Controllers/Managment Team/AssignGift.controller';
import { Spinner } from '../../../Components/smallspinner';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

const AssignCustomer=({
    show=false,
    handleClose=()=>undefined,
    customers=[],
    quantity=0,
    gift=undefined,
    token="",
})=>{
    const init={
        quantity:"",
        customer:"",
        deliverydate:''
    }
    const [form, setForm] = useState(init);
    const [error, setError] = useState(init);
    const [spinner, setspinner] = useState(false);


    const onChangeHandler=(name,value)=>{
        setForm(pre=>{
            return{
                ...pre,
                [name]:value
            };
        });
        if( name === 'quantity'){
            const pattern=/[^0-9]/;
            if(pattern.test(value)){
                setError(pre=>{
                    return{
                        ...pre,
                        quantity:"Input Should Be A Number"
                    }
                })
            }else{
                if(value<1 || value>quantity){
                    setError(pre=>{
                        return{
                            ...pre,
                            quantity:`Input Should Be A Number Beetween 1-${quantity}`
                        }
                    });  
                }else{
                    setError(pre=>{
                        return{
                            ...pre,
                            quantity:''
                        }
                    });
                }
            }
            
        }else if(name === 'customer'){
            console.log(value);
            if(value===''){
                setError(pre=>{
                    return{
                        ...pre,
                        customer:'This Field Required'
                    }
                });
            }else{
                setError(pre=>{
                    return{
                        ...pre,
                        customer:''
                    }
                });
            }
        }else{
            if((new Date(value))<(new Date())){
                setError(pre=>{
                    return{
                        ...pre,
                        deliverydate:'Please Select Valid Date'
                    }
                }); 
            }else{
                setError(pre=>{
                    return{
                        ...pre,
                        deliverydate:''
                    }
                });
            }
            console.log(value);
        }
    }
    const handleCloseExtended=(q)=>{
        setspinner(false);
        setError(init);
        setForm(init);
        handleClose(q);
    }

    const onsubmitHandler=()=>{
        if (error.customer!=='' || error.quantity!=='')return;
        let flag=false;
        for(const i in form){
            if(form[i]===''){
                flag=true;
                setError(pre=>{
                    return{
                        ...pre,
                        [i]:'Required'
                    };
                });
            }else{
                setError(pre=>{
                    return{
                        ...pre,
                        [i]:''
                    };
                });
            }
        }
        if(flag)return
        setspinner(true);
        AssignGiftControllerObject.assignGift(
            {
                'customerid':form.customer,
                giftid:gift.id,
                deliverydate:form.deliverydate,
                quantity,
            },
            token,
            (error,response)=>{
                console.log(error);
                console.log(response);
                if(!error){
                    handleCloseExtended(quantity-form.quantity);
                }
            }
        );
    }
    const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Popover right</Popover.Title>
          <Popover.Content>
            And here's some <strong>amazing</strong> content. It's very engaging.
            right?
          </Popover.Content>
        </Popover>
      );
    return(
        <BasicModal
            btnDisable={spinner}
            show={show}
            onSubmitFn={onsubmitHandler}
            handleClose={()=>handleCloseExtended(quantity)}
            cancelFn={()=>handleCloseExtended(quantity)}
            headerTxt={
                (
                    <div style={{textAlign:'center'}}>
                        Assign To Customer
                    </div>
                )
            }
            size='md'
            submitBtnTxt="Assign"
            cancelBtnTxt="Cancel"
        >
            
            <div className="row">
                <div className="col-12">
                    <FormSelect
                        name={"customer"}
                        onChange={(e)=>{
                            onChangeHandler(e.target.name,e.target.value);
                        }}
                        // disabled={this.state.supplierLoader}
                        label={'Select A Supplier'}
                        value={form.customer}
                        error={error.customer?true:false}
                        error_meesage={error.customer}
                        options={[
                            { label : 'Select the Customers',value:'' },
                                ...customers.map(customer=>{
                                return{
                                    label:customer.name,
                                    value:customer.id,
                                };
                            })
                        ]}
                    />  
                </div>
                {/* <div className="col-3" style>
                    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                        <Button variant="success">view</Button>
                    </OverlayTrigger>
                </div> */}

            </div>
            <FormInput
                onChange={(e)=>{
                    onChangeHandler(e.target.name,e.target.value);
                }}
                error={error.quantity?true:false}
                error_meesage={error.quantity}
                value={form.quantity}
                name="quantity"
                label={`Quantity (Max ${quantity})`}
            />
            <FormInput
                type="date"
                onChange={(e)=>{
                    onChangeHandler(e.target.name,e.target.value);
                }}
                error={error.deliverydate?true:false}
                error_meesage={error.deliverydate}
                value={form.deliverydate}
                name="deliverydate"
                label={`Delivery Date`}
            />
            {spinner?<div className="row">
                <Spinner style={{margin:'auto',marginTop:20}} />
            </div>:''}
        </BasicModal>
    );
}

export{
    AssignCustomer
}