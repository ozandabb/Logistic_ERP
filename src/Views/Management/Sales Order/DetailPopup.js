import React from 'react';
// import moduleName from ''
import { BasicModal } from '../../BackOffice/BackOffice Components/shared/modal';
import { SampleTabel } from '../../BackOffice/BackOffice Components/shared/table';
import get from 'lodash.get';


const DetailPopup=({
    customer=null,
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
            size='lg'
            headerTxt="About Customer"
            handleClose={handleClose}
        >
            
            <SampleTabel
                style={['borderless']}
                columns={[
                    {name:'',key:'name'},
                    {name:'',key:'value'}
                ]}
                rows={[
                    {'name':'Name','value':get(customer,'name',"")},
                    {'name':'Address','value':get(customer,'address',"")},
                    {'name':'City','value':get(customer,'city',"")},
                    {'name':'Credit Limit','value':get(customer,'credit_limit',"")},

                ]}
            />

        </BasicModal>
    );
}
export{
    DetailPopup
};