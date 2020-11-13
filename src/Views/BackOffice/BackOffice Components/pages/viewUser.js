import React from 'react';
import { BasicModal } from '../shared/modal';

const ViewUser=({
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
            <h1>View User</h1>
            {data}
        </BasicModal>
    );
}

export{
    ViewUser
}