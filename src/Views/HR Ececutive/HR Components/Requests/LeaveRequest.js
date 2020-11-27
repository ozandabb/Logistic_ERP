import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import HRSidebar from "../../HRSidebar";
import { connect } from 'react-redux';
import {  Button, Card, Image ,Row , Col } from 'react-bootstrap';
import {FormInput ,FormSelect } from '../../../../Components/Form';
import moment from 'moment';
import Leave_CONTROLLER from '../../../../Controllers/Requests/Leave.controller';
import Employee_CONTROLLER from '../../../../Controllers/HR Staff/Employee.controller';
import CONFIG from '../../../../Controllers/Config.controller';

class LeaveRequest extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            addLeaveState: false,
            LeaveDashboard : false,

            start_date:'',
            end_date:'',
            date_count:'',
            type_of_leave:'',
            no_baby:'',
            id:'',
            typeL :'',

            emp_id:'',
            availableLeves: [],

            Maternity:'',
        };
    } 

    formValueChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value ,
        });
        
    }

    //Get available Leaves
    onFormSubmitLeaves = async (e) => {
        e.preventDefault();

        var data = {
            id: this.state.emp_id,
        }
        const result = await Leave_CONTROLLER.getAvailableLeaves(data, this.props.auth.token);
        const resEmpID = await Employee_CONTROLLER.getOneEmpoyeByID(data.id,this.props.auth.token);

        if(result.status == 201){
            this.change_Leave_toggle();
            this.setState({
                availableLeves :result.data, 
            });
        }else{
            CONFIG.setErrorToast("Somthing Went Wrong!");
        } 

        if(resEmpID.data.data.gender === 'Male' || resEmpID.data.data.gender === 'male'){
            this.setState({
                Maternity :"0", 
            });

        }else if(resEmpID.data.data.gender === 'Female' || resEmpID.data.data.gender === 'female'){
            this.setState({
                Maternity :"42", 
            });
        }

        
    }

    //Normal Leave request from submit
    onFormSubmitNormal = async (e) => {
        e.preventDefault();

        if(this.state.type_of_leave === "Annual_Leave"){
            this.state.typeL =1
        }else{
            this.state.typeL = 2
        }
        
        var data = {
            start_date:this.state.start_date,
            end_date:this.state.end_date,
            date_count: moment(new Date(this.state.end_date)).format("DD") - moment(new Date(this.state.start_date)).format("DD"),
            type_of_leave:this.state.typeL,
            id:this.state.id,
        }
        
        const result = await Leave_CONTROLLER.requestNormalLeave(data, this.props.auth.token);

        if(result.status == 201){
            CONFIG.setToast("Successfully Requested");
            this.clear();
        }else{
            CONFIG.setErrorToast(result.response.data.message);
            this.clear();
        }
    }

    //Normal Leave request from submit
    onFormSubmitMaternity = async (e) => {
        e.preventDefault();

        var data = {
            start_date:this.state.start_date,
            end_date:this.state.end_date,
            date_count: moment(new Date(this.state.end_date)).format("DD") - moment(new Date(this.state.start_date)).format("DD"),
            no_baby:this.state.no_baby,
            id:this.state.id,
        }
        
        const result = await Leave_CONTROLLER.requestMaternity_Leave(data, this.props.auth.token);

        if(result.status == 201){
            CONFIG.setToast("Successfully Requested");
            this.clear();
        }else{
            CONFIG.setErrorToast(result.response.data.message);
            this.clear();
        }
    }

    //Toggle for add leave section
    change_toggle = () => {
        if (this.state.addLeaveState) {
            this.setState({ addLeaveState: false })
        } else {
            this.setState({ addLeaveState: true })
        }
    }

    //Toggle for add leave section
    change_Leave_toggle = () => {
        if (this.state.LeaveDashboard) {
            this.setState({ LeaveDashboard: false })
        } else {
            this.setState({ LeaveDashboard: true })
        }
    }

    //CLEAR form input data
    clear = ()=>{
        this.setState({
            start_date:'',
            end_date:'',
            date_count:'',
            type_of_leave:'',
            no_baby:'',
            id:'',
            typeL :'',
        })

        this.change_toggle();
    }


    render() {
        const {availableLeves , Maternity} = this.state;

        return (
            <div className="bg-light wd-wrapper" >
                <HRSidebar activemenu={'REQUEST'} submenu={'LEAVE'} />
                <div className="wrapper-wx" style={{height:"600px"}}>
                    <div className="container-fluid"  >

                        {/* Title and the button section start here */}
                        <div className="row" style={{marginTop:"5px", fontFamily:"sans-serif", marginBottom:"15px"}}>
                            <div className="col-sm-9">
                                <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Leaves <br></br>
                                <span className="text-muted small">Dashboard / Requests / Leaves</span></h6>
                            </div>
                            <div className="col-sm-3"> 
                                <Button variant="" style={{backgroundColor:"#475466" , color:"#FFFFFF", width:"100%",  cursor: 'pointer'}} onClick={() => this.change_toggle()}>Add Leave</Button>
                            </div>
                        </div>
                        {/* Title and the button section ends here */}


                        {/* Add Request form toggle start here */}
                        <div className="row" style={{ display: this.state.addLeaveState == true ? 'block' : 'none', marginBottom:"15px" }}>
                            <div className="col-12">
                                <Card className="shadow">
                                    
                                        <nav>
                                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Normal Leave Request</a>
                                                <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Maternity Leave Request</a>
                                            </div>
                                        </nav>
                                        <div className="tab-content" id="nav-tabContent">
                                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                                <Card.Body>
                                                    <div className="col-12 bg-white mt-1 pb-1" >
                                                        <form onSubmit={(e) => this.onFormSubmitNormal(e)}>
                                                            <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Leave Request Details<br></br>
                                                            <span className="text-muted small">You can request a leave filling relavant Information</span></h6>

                                                            <div className="row" >
                                                                <div className="col-sm-8">

                                                                    <div className="row">
                                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                                            <FormInput 
                                                                                label={'From *'}
                                                                                type="date"
                                                                                required={true}
                                                                                // value={this.state.start_date}
                                                                                name="start_date"
                                                                                onChange={this.formValueChange}
                                                                            />
                                                                        </div>
                                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                                            <FormInput 
                                                                                label={'To *'}
                                                                                type="date"
                                                                                required={true}
                                                                                // value={this.state.end_date}
                                                                                name="end_date"
                                                                                onChange={this.formValueChange}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                                            <FormInput 
                                                                                label={'Emp No *'}
                                                                                required={true}
                                                                                placeholder={"Enter Employee Number"}
                                                                                // value={this.state.id}
                                                                                name="id"
                                                                                onChange={this.formValueChange}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="col-sm-4">

                                                                    <div className="row">
                                                                        <div className="col-12 mt-1 mb-1" >
                                                                            <FormSelect 
                                                                                label={'Leave Type *'}
                                                                                options={Leave}
                                                                                required={true}
                                                                                name="type_of_leave"
                                                                                onChange={this.formValueChange}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div className="row"> 
                                                                <div className="col-6 mt-3 mb-1" >
                                                                    <button type="submit" style={{backgroundColor:"#475466" , color:"#FFFFFF",  cursor: 'pointer'}} className="btn mt-2 btn btn-sm px-5">Submit</button>
                                                                    <button type="button" style={{backgroundColor:"red",marginLeft:"10px", color:"#FFFFFF", cursor: 'pointer'}} onClick={() => this.clear()} className="btn mt-2 btn btn-sm px-5">Cancel</button>
                                                                </div>
                                                            </div>

                                                        </form>
                                                    </div>
                                                </Card.Body>
                                            </div>
                                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"> 
                                                <Card.Body>
                                                    <div className="col-12 bg-white mt-1 pb-1" >
                                                        <form onSubmit={(e) => this.onFormSubmitMaternity(e)}>
                                                            <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Maternity Leave Request Details<br></br>
                                                            <span className="text-muted small">You can request a leave filling relavant Information</span></h6>

                                                            <div className="row" >
                                                                <div className="col-sm-8">
                                                                    
                                                                    <div className="row">
                                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                                            <FormInput 
                                                                                label={'From *'}
                                                                                type="date"
                                                                                required={true}
                                                                                value={this.state.start_date}
                                                                                name="start_date"
                                                                                onChange={this.formValueChange}
                                                                            />
                                                                        </div>
                                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                                            <FormInput 
                                                                                label={'To *'}
                                                                                type="date"
                                                                                required={true}
                                                                                value={this.state.end_date}
                                                                                name="end_date"
                                                                                onChange={this.formValueChange}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                                            <FormInput 
                                                                                label={'Emp No *'}
                                                                                required={true}
                                                                                placeholder={"Enter Employee Number"}
                                                                                value={this.state.id}
                                                                                name="id"
                                                                                onChange={this.formValueChange}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-4">
                                                                    <div className="row">
                                                                        <div className="col-12 mt-1 mb-1" >
                                                                            <FormInput 
                                                                                label={'Number of the Baby *'}
                                                                                required={true}
                                                                                placeholder={"Enter a Number of the Baby"}
                                                                                value={this.state.no_baby}
                                                                                name="no_baby"
                                                                                onChange={this.formValueChange}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row"> 
                                                                <div className="col-6 mt-3 mb-1" >
                                                                    <button type="submit" style={{backgroundColor:"#475466" , color:"#FFFFFF",  cursor: 'pointer'}} className="btn mt-2 btn btn-sm px-5">Submit</button>
                                                                    <button type="button" style={{backgroundColor:"red",marginLeft:"10px", color:"#FFFFFF", cursor: 'pointer'}} onClick={() => this.clear()} className="btn mt-2 btn btn-sm px-5">Cancel</button>
                                                                </div>
                                                            </div>

                                                        </form>
                                                    </div>
                                                </Card.Body>
                                            </div>
                                        </div>
                                    
                                </Card>
                            </div>
                        </div>
                        {/* Add Request form toggle ends here */}

                        {/* Input field to enter employee ID */}
                        <div className="row mb-3"> 
                            <div className="col-sm-6">
                                <Card style={{padding:"20px"}}>
                                    <form onSubmit={(e) => this.onFormSubmitLeaves(e)} >
                                        <div className="row">
                                            <div className="col-sm-12 mt-1 mb-1" >
                                                <FormInput 
                                                    label={'Enter Employee ID to See the Request Details *'}
                                                    value={this.state.emp_id}
                                                    required={true}
                                                    name="emp_id"
                                                    onChange={this.formValueChange}
                                                />
                                                {/* {errors.description && errors.description.length > 0 &&
                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.description}</h4>} */}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 mt-1 mb-1" >
                                                <button type="submit" style={{backgroundColor:"#475466" , color:"#FFFFFF",  cursor: 'pointer'}} className="btn mt-2 btn btn-sm px-5">Submit</button>
                                            </div>  
                                        </div>
                                    </form>
                                </Card>
                            </div> 
                        </div>        

                        {/* Card view start here */}
                        <div style={{ display: this.state.LeaveDashboard == true ? 'block' : 'none'}}>
                            <div className="row">
                                <div className="col-sm-4">
                                    <Card className="shadow" style={{alignContent:"center", alignItems:"center", padding:"10px"}}>
                                        <h5>Annual Leaves</h5>
                                        {availableLeves.Annual}
                                    </Card>
                                </div>
                                <div className="col-sm-4">
                                    <Card className="shadow" style={{alignContent:"center", alignItems:"center", padding:"10px"}}>
                                        <h5>Casual Leaves</h5>
                                        {availableLeves.Casual}
                                    </Card>
                                </div>
                                <div className="col-sm-4">
                                    <Card className="shadow" style={{alignContent:"center", alignItems:"center", padding:"10px"}}>
                                        <h5>Maternity Leaves</h5>
                                        {Maternity}
                                    </Card>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }


   
}
const Leave = [{ label : 'Select the Leave type' ,value : 'NONE' } , 
...['Annual_Leave','Casual_Leave'].map( i => {
    return{
        label : i  ,
         value : i 
    }
})];


const mapStateToProps = state => ({
    auth: state.auth || {},
});
 
  
export default connect(mapStateToProps, null)(withRouter(LeaveRequest));