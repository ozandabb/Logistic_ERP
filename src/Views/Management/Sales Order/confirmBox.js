import React ,{useState} from 'react';
import { Card } from 'react-bootstrap';
import { FormInput } from '../../../Components/Form';
import { BasicModal } from '../../BackOffice/BackOffice Components/shared/modal';
import {Spinner} from '../../../Components/smallspinner';
const ConfirmBox=({
    handleClose=()=>undefined,
    show=false,
    onSubmitFn=()=>undefined,
    onChangeHandler=()=>undefined,
    commnent='',
    spinner=false,

})=>{
    const [error, seterror] = useState('');
    const onSubmitExtend=()=>{
        if(commnent===''){
            seterror("Comment is Required");
        }else{
            seterror("");
            onSubmitFn();
        }
    }
    return(
        <BasicModal
            show={show}
            handleClose={handleClose}
            headerTxt="Confirm Box"
            onSubmitFn={onSubmitExtend}
            submitBtnTxt="Submit"
            size="md"
            btnDisable={spinner}
        
        >
            <Card> 
                <Card.Body>
                   
                    <FormInput
                        error={error?true:false}
                        error_meesage={error}
                        label={"Comment"}
                        name={'comment'}
                        value={commnent}
                        onChange={(e)=>onChangeHandler(e.target.value)}
                    />
                </Card.Body>
                {
                    spinner?
                    <Spinner
                        style={{margin:'auto',marginBottom:40}}
                        
                    />:
                    ''
                }
            </Card>
        </BasicModal>

    );

}
export{
    ConfirmBox
};