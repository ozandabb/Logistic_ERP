import get from 'lodash.get';
import React,{useEffect,useState} from 'react';
import { FormInput } from '../../../../Components/Form';
import { BasicModal } from '../shared/modal';
import { SampleTabel } from '../shared/table';
import SalesOrdercontroller from '../../../../Controllers/BackOffice/SalesOrder.controller';


const ViewSaleOrder=({
    items=[],
    order=null,
    show=false,
    token='',
    disable=false,
    handleClose=()=>undefined,


})=>{
    const [form, setform] = useState([]);
    const [error, setError] = useState([]);

    const [itemsWithDetail, setItems] = useState([]);

    useEffect(() => {
        let tempForm=[];
        get(order,'order_items',[]).forEach(ele=>{
            tempForm.push(get(ele,'quantity',0));
        });
        let tempItems=get(order,'order_items',[]).map(ele=>{
            return{
                ...ele,
                item:getItem(ele.item_id)
            }
        });
        setItems(tempItems);
        setform(tempForm);
    }, [show]);
    useEffect(() => {
        if(itemsWithDetail.length>0)isValid();
    }, [form]);

    const isValid=()=>{
        const pattern=/[^0-9]/;
        let flag=true;
        for(const index in form){
            if(pattern.test(form[index])){
                flag=false;
                setError(pre=>{
                    return {...pre,[index]:'Value Should Be A Number'};
                });
            }else{
                if(form[index] < 0 || form[index]>itemsWithDetail[index].item.quantity){
                    flag=false;
                    setError(pre=>{
                        return {...pre,[index]:'Please Enter Valid Quantity'};
                    });
                }else{
                    setError(pre=>{
                        return {...pre,[index]:''};
                    });
                }   
            }

        }
        return flag;
    }
    const getItem=(id)=>{
        return items.find(ele=>get(ele,'item.id','')===id);
    }
    const changeHandler=(index,value)=>{
        const temp=form;
        temp[index]=value
        setform(pre=>{
                return {
                    ...pre,
                    [index]:value,
                };
            }
        );
    }

    const getFormField=(index)=>{
        if(disable)return form[index];
        return(
            <FormInput
                onChange={(e)=>changeHandler(index,e.target.value)}
                value={form[index]}
                error_meesage={error[index]}
                error={error[index]}
            />
        );
    }
    const accetHandler=()=>{
        if(isValid()){
            const data=[];
            for(const i in form){
                data.push({
                    id:itemsWithDetail[i].id,
                    order_id:order.id,
                    item_id:itemsWithDetail[i].item_id,
                    quantity:form[i],
                });
            }
            SalesOrdercontroller.acceptSaledOrder(order.id,{items:data},token, (error,respone)=>{
                if(!error){
                    handleClose();
                }
            });
        }
    }
    const rejectHandler=()=>{
        SalesOrdercontroller.rejectSaledOrder(order.id,token, (error,respone)=>{
            
        });
    }
    const getSum=()=>{
        let sum=0;
        for ( const i in itemsWithDetail){
            sum+=(form[i]*itemsWithDetail[i].purchase_price);
        }
        const pattern=/[^0-9]/;
        if(pattern.test(sum))return 0;
        return sum;
    }
    return(
        <BasicModal
            show={show}
            submitBtnTxt={disable?"":'Accept'}
            cancelBtnTxt={disable?"Close":'Reject'}
            headerTxt="Order Details"
            handleClose={handleClose}
            cancelFn={disable?handleClose:rejectHandler}
            onSubmitFn={accetHandler}
                
        >
            <div style={{maxHeight:'70vh',overflowY:'scroll'}}>
                {
                    itemsWithDetail.map((item,index)=>{
                        return(
                            <div>
                                {/* {JSON.stringify(form)} */}
                                <h6 style={{textAlign:'center'}} className="text-primary">{item.item.item.name}</h6>
                                <SampleTabel
                                    columns={[
                                        {name:'',key:'name'},
                                        {name:'',key:'value'}
                                    ]}
                                    rows={
                                        [
                                            {name:'Name',value:item.item.item.name},
                                            {name:'Available Quantity',value:item.item.quantity},
                                            {name:'Quantity',value:getFormField(index)},
                                            {name:'Purchase Price',value:item.purchase_price*form[index]}

                                        ]
                                    }
                                />
                            </div>  
                        );
                    })
                }
                <SampleTabel
                    columns={[
                        {name:"Total",key:''},
                        {name:getSum(),key:''},

                    ]}
                />
            </div>

        </BasicModal>
    );
}
export{
    ViewSaleOrder
}