import { Modal }  from "react-bootstrap";
import { Button } from 'react-bootstrap';

import React from 'react';


const BasicModal=({
    show=false,
    handleClose=()=>undefined,
    headerTxt="",
    children=null,
    onSubmitFn=()=>undefined,
    cancelFn=()=>undefined,
    submitBtnTxt="",
    cancelBtnTxt="",
    size='md',
    btnDisable=false,
    
})=>{
    return(
        <Modal show={show} onHide={handleClose} size={size}  backdrop="static">
        <Modal.Header closeButton>
            <Modal.Title>{headerTxt}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
        <Modal.Footer>
          {cancelBtnTxt?<Button variant="secondary" onClick={cancelFn}>
            {cancelBtnTxt}
          </Button>:""}
          {
            submitBtnTxt?
            <Button disabled={btnDisable} variant="primary" onClick={onSubmitFn}>
            {submitBtnTxt}
          </Button>:""}
        </Modal.Footer>
      </Modal>
    );
}

export{
    BasicModal
}