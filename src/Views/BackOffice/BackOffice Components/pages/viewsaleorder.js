import React from 'react';
import { BasicModal } from '../shared/modal';


const ViewSaleOrder=({
    data=null,
    show=false,
    handleClose=()=>undefined,


})=>{
    return(
        <BasicModal
            show={show}
            submitBtnTxt="Submit"
            cancelBtnTxt="Cancel"
            headerTxt="......... Order Details"
            handleClose={handleClose}
                
        >
            <h1>HIIIIIIIIIIIIS</h1>
            {data}

        </BasicModal>
    );
}
export{
    ViewSaleOrder
}