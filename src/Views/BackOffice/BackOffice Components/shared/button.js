import React from 'react';
import { Button } from 'react-bootstrap';

const BaseBtn=({
    btnVarient="primary",
    btnText="",
    onClickFn=()=>undefined
})=>{
    return(
        <Button
         variant={btnVarient}
         onClick={onClickFn}
        >
            {btnText}
        </Button>
    );
}

export{
    BaseBtn
}