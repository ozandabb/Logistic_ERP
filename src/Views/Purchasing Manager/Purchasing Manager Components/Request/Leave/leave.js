import React, {useEffect} from 'react';
import PurchaseOrderRequestcontrollerObject from '../../../../../Controllers/Purchasing Order/PurchasingOrderRequest.controller'
const PurchasingManagerLeaveRequest=({
    id="",
    token="",
})=>{

    useEffect(() => {
        PurchaseOrderRequestcontrollerObject.checkMaternityLeave(token,(err,data)=>{
            console.log(err);
            console.log(data);
        })
        PurchaseOrderRequestcontrollerObject.getAvailableLeaves(id,token,(err,data)=>{
            console.log(err);
            console.log(data);
        })

        PurchaseOrderRequestcontrollerObject.leaveEntitlement(token,(err,data)=>{
            console.log(err);
            console.log(data);
        })

    }, [])

    return(
        <div className="row">
            
        </div>
    );
}
export{
    PurchasingManagerLeaveRequest
}