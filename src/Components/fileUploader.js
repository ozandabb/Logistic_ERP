import React ,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "../assersts/sharedcss/fileuploader.css";
const FileUploader=({
    label="",
    icon=null,
    fileChange=()=>undefined,
    error="111",
    name="",
    file=null,
})=>{
    const FileOnchange=(e)=>{
        fileChange(e.target.files[0]);
    }
    return(
        <React.Fragment>
            <label className={`${error && 'text-danger'} form-label`} style={{display:"block"}} >{label}</label>
            <input type="file" id="actual-btn" hidden onChange={(e)=>FileOnchange(e)}/>
            <label
              
                id="file-uploader-label" 
                for="actual-btn" 
                style={{backgroundColor:"#007bff" , color:"white",  cursor: 'pointer'}}
            >
                {icon?<FontAwesomeIcon icon={icon}/>:""}
                {name}
            </label>
            <span id="file-chosen" style={{marginLeft:10}} className={`${error?'text-danger':''}`}>{file?file.name:"No file chosen"}</span>
            <span className="error small text-danger" style={{display:"block"}}>
                { error }
            </span>
    
        </React.Fragment>
        
    );
} 

export{
    FileUploader
}