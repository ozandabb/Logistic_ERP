import React from 'react';

const Spinner=({
        size=35,
        style={}
    })=>{
    return <div class="spinner-border text-primary" style={{...style,width:size,height:size}}></div>;
}
export{
    Spinner
}