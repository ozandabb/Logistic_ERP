import get from 'lodash.get';
import React, { Fragment } from 'react';
import { BasicModal } from '../../BackOffice/BackOffice Components/shared/modal';
import { SampleTabel } from '../../BackOffice/BackOffice Components/shared/table';

const GiftCard=({
    gift=null,
    show=false,
    submitBtnTxt="",
    onSubmitFn=()=>undefined,
    size='lg',
    handleClose=()=>undefined,
})=>{
    return(
        <Fragment>
            <BasicModal
                show={show}
                cancelBtnTxt="Close"
                cancelFn={handleClose}
                submitBtnTxt=""
                // onSubmitFn={acceptRequest}
                size='md'
                headerTxt="Gift Details"
                handleClose={handleClose}
            >
                <div className="row">
                <img
                    style={{width:200,margin:'auto'}} 
                    src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
                />
                </div>
                <SampleTabel
                    rows={[
                        {'name':'Name',value:get(gift,'name','')},
                        {'name':'Quantity',value:get(gift,'quantity','')},
                        {'name':'Description',value:get(gift,'description','')},
                        {'name':'Supplier',value:get(gift,'supplier.name','')}
                    ]
                    }
                    columns={[
                        {name:'',key:'name'},
                        {name:'',key:'value'}
                    ]
                    }
                
                />
                
            </BasicModal>
        </Fragment>
    );
}
export {
    GiftCard
}