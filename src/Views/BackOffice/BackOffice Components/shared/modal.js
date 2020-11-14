import { Modal }  from "react-bootstrap";
import { Button } from 'react-bootstrap';

import React from 'react';


const BasicModal=({
    show=false,
    handleClose=()=>undefined,
    headerTxt="",
    children=null,
    onSubmitFn=()=>undefined,
    submitBtnTxt="",
    cancelBtnTxt="",
    
})=>{
    return(
        <Modal show={show} onHide={handleClose}  backdrop="static">
        <Modal.Header closeButton>
            <Modal.Title>{headerTxt}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {cancelBtnTxt}
          </Button>
          <Button variant="primary" onClick={onSubmitFn}>
            {submitBtnTxt}
          </Button>
        </Modal.Footer>
      </Modal>
    );
}

export{
    BasicModal
}