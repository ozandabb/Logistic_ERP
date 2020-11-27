import React from 'react';
// import moduleName from ''
import { BasicModal } from '../../BackOffice/BackOffice Components/shared/modal';
import { SampleTabel } from '../../BackOffice/BackOffice Components/shared/table';
import get from 'lodash.get';


const GiftSupplier=({
    supplier=null,
    show=false,
    handleClose=()=>undefined
    
})=>{


    

    return(

        <BasicModal
            show={show}
            cancelBtnTxt="Close"
            cancelFn={handleClose}
            submitBtnTxt=""
            // onSubmitFn={acceptRequest}
            size='md'
            headerTxt="About Supplier"
            handleClose={handleClose}
        >
            
            <SampleTabel
                columns={[
                    {name:'',key:'name'},
                    {name:'',key:'value'}
                ]}
                rows={[
                    {'name':'Name','value': get(supplier,'name',"")},
                    {'name':'Address','value': get(supplier,'address',"")},
                    {'name':'Phone Number','value': get(supplier,'phoneNo',"")},
                    {'name':'Email','value': get(supplier,'email',"")},

                ]}
            />

        </BasicModal>
    );
}
export{
    GiftSupplier
};