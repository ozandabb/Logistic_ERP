import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import HRSidebar from "../../HRSidebar";
import { connect } from 'react-redux';
import {  Button, Card, Table ,Row , Col } from 'react-bootstrap';
import {FormInput ,FormSelect } from '../../../../Components/Form';
import moment from 'moment';
import Leave_CONTROLLER from '../../../../Controllers/Requests/Leave.controller';
import CONFIG from '../../../../Controllers/Config.controller';

class LeaveRequest extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            addLeaveState: false,

            start_date:'',
            end_date:'',
            date_count:'',
            type_of_leave:'',
            no_baby:'',
            id:'',
            typeL :'',
        };

        console.log("poppppppppppp", this.props);
    } 

    formValueChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value ,
        });
        
    }

    //Normal Leave request from submit
    onFormSubmitNormal = async (e) => {
        e.preventDefault();

        // if (this.validate()) {
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
                CONFIG.setErrorToast(" Somthing Went Wrong!");
                this.clear();
            }
        //}
    }

    //Normal Leave request from submit
    onFormSubmitMaternity = async (e) => {
        e.preventDefault();

        // if (this.validate()) {
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
                CONFIG.setErrorToast(" Somthing Went Wrong!");
                this.clear();
            }
        //}
    }

    
    change_toggle = () => {
        if (this.state.addLeaveState) {
            this.setState({ addLeaveState: false })
        } else {
            this.setState({ addLeaveState: true })
        }
    }

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
        return (
            <div className="bg-light wd-wrapper">
                <HRSidebar activemenu={'REQUEST'} submenu={'LEAVE'} />
                <div className="wrapper-wx" >
                    <div className="container-fluid">

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

                        {/* <div className="row" style={{marginBottom:"10px"}}>
                            <div className="col">
                                <div className="row">
                                    <div className="col-sm">
                                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
                                    </div>
                                    <div className="col-sm">
                                        <button type="submit" style={{backgroundColor:"#475466" , color:"#FFFFFF",  cursor: 'pointer'}} className="btn mt-2 btn btn-sm px-5">Submit</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                
                            </div>
                        
                        </div> */}


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
                                                                                    // value={this.state.start_date}
                                                                                    name="start_date"
                                                                                    onChange={this.formValueChange}
                                                                                />
                                                                            </div>
                                                                            <div className="col-sm-6 mt-1 mb-1" >
                                                                                <FormInput 
                                                                                    label={'To *'}
                                                                                    type="date"
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
                                                                                    value={this.state.start_date}
                                                                                    name="start_date"
                                                                                    onChange={this.formValueChange}
                                                                                />
                                                                            </div>
                                                                            <div className="col-sm-6 mt-1 mb-1" >
                                                                                <FormInput 
                                                                                    label={'To *'}
                                                                                    type="date"
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
                        {/* Add customer form toggle ends here */}
                                           

                        {/* Card view start here */}
                        <div className="row">
                            <div className="col-sm">
                                <Card className="shadow" style={{alignContent:"center", alignItems:"center", padding:"10px"}}>
                                    <h5>Annual Leaves</h5>
                                    9
                                </Card>
                            </div>
                            <div className="col-sm">
                                <Card className="shadow" style={{alignContent:"center", alignItems:"center", padding:"10px"}}>
                                    <h5>Casual Leaves</h5>
                                    8
                                </Card>
                            </div>
                            <div className="col-sm">
                                <Card className="shadow" style={{alignContent:"center", alignItems:"center", padding:"10px"}}>
                                    <h5>Maternity Leaves</h5>
                                    5
                                </Card>
                            </div>
                            <div className="col-sm">
                                <Card className="shadow" style={{alignContent:"center", alignItems:"center", padding:"10px"}}>
                                    <h5>Remaining Leaves</h5>
                                    2
                                </Card>
                            </div>
                        </div>

                        {/* Table start here */}
                        <div className="row" style={{marginTop:"20px"}}>
                            <div className="col-sm">
                            <Card>
                                <Table striped bordered hover variant="light">
                                    <thead>
                                        <tr>
                                            <th>Leave Type</th>
                                            <th>From</th>
                                            <th>To</th>
                                            <th>Days</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Maternity Leaves</td>
                                            <td>2020/10/09</td>
                                            <td>2020/10/09</td>
                                            <td>10</td>
                                            <td>Active</td>
                                            <td>100,000.00</td>
                                        </tr>
                                        <tr>
                                            <td>Casual Leaves</td>
                                            <td>2020/10/09</td>
                                            <td>2020/10/09</td>
                                            <td>1</td>
                                            <td>Active</td>
                                            <td>100,000.00</td>
                                        </tr>
                                        <tr>
                                            <td>Casual Leaves</td>
                                            <td>2020/10/09</td>
                                            <td>2020/10/09</td>
                                            <td>6</td>
                                            <td>Approved</td>
                                            <td>100,000.00</td>
                                        </tr>
                                        <tr>
                                            <td>Maternity Leaves</td>
                                            <td>2020/10/09</td>
                                            <td>2020/10/09</td>
                                            <td>7</td>
                                            <td>Approved</td>
                                            <td>100,000.00</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card>
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