import React from 'react';
import { Button } from 'react-bootstrap';

const BaseBtn=({
    btnVarient="primary",
    btnText="",
    onClickFn=()=>undefined,
    size="md",
    style={},
    disabled=false
})=>{
    return(
        <Button
        disabled={disabled}
         variant={btnVarient}
         onClick={onClickFn}
         size={size}
         style={style}
        >
            {btnText}
        </Button>
    );
}

export{
    BaseBtn
}