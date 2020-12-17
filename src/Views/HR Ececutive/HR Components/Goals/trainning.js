import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import HRSidebar from "../../HRSidebar";
import { connect } from 'react-redux';
import {  Button, Card , Form , Image , OverlayTrigger , Tooltip , Popover } from 'react-bootstrap';
import {FormInput  } from '../../../../Components/Form'
import GOAL_CONTROLLER from '../../../../Controllers/HR Staff/Goals.controller';
import CONFIG from '../../../../Controllers/Config.controller';


class Training extends Component { 
    constructor(props) {
        super(props);
        this.state = {

            title:'',
            description:'',
            total_tasks:'',
            due_date:'',
            empid : '',

        };
    }

   
    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }

    onFormSubmit = async (e) => {
        e.preventDefault();

            var data = {
                title: "Training - " + this.state.title,
                description: this.state.description,
                total_tasks: this.state.total_tasks,
                due_date: this.state.due_date,
                empid: this.state.empid,
            }

            const result = await GOAL_CONTROLLER.addGoal(data, this.props.auth.token);

            if(result.status == 201){
                CONFIG.setToast("Successfully Added");
                this.clear();
            }else{
                CONFIG.setErrorToast(" Somthing Went Wrong!");
                this.clear();
            }
    }

    clear = ()=>{
        this.setState({
            title:'',
            description:'',
            total_tasks:'',
            due_date:'',
            empid : '',
        })

    }

    render() {
        return (
            <div className="bg-light wd-wrapper">
                <HRSidebar activemenu={'Training'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">

                        {/* Title and the add new customer button */}
                        <div className="row" style={{marginTop:"5px", fontFamily:"sans-serif", marginBottom:"15px"}}>
                            <div className="col-sm-9">
                                <div className="row">
                                    <div className="col-sm">
                                        <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Training and Development<br></br>
                                        <span className="text-muted small">Dashboard / Training</span></h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <Button variant="" style={{backgroundColor:"#475466" , color:"#FFFFFF", width:"100%",  cursor: 'pointer'}} >Create Training Goal</Button>
                            </div>
                        </div>


                         {/* Add customer form toggle */}
                        <div className="row" style={{  marginBottom:"15px" }}>
                            <div className="col-12">
                                <Card className="col-12 shadow" style={{paddingBottom:"15px"}}>
                                    <Card.Body>

                                            <div className="col-12 bg-white mt-1 pb-1" >
                                                <form onSubmit={(e) => this.onFormSubmit(e)}>
                                                        <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Training and Development Details<br></br>
                                                        <span className="text-muted small">You can add a goal by filling relavant Information</span></h6>
                                                    <div className="row" >
                                                        <div className="col-sm-8">
                                                            
                                                            <div className="row">
                                                                    <div className="col-sm-6 mt-1 mb-1" >
                                                                        <FormInput 
                                                                            label={'Title *'}
                                                                            placeholder={"Enter Title"}
                                                                            value={this.state.title}
                                                                            name="title"
                                                                            required
                                                                            onChange={this.formValueChange}
                                                                        />
                                                                    </div>
                                                                    <div className="col-sm-6 mt-1 mb-1" >
                                                                        <FormInput 
                                                                            label={'Due Date *'}
                                                                            type="date"
                                                                            value={this.state.due_date}
                                                                            name="due_date"
                                                                            required
                                                                            onChange={this.formValueChange}
                                                                        />
                                                                    </div>
                                                            </div>

                                                            <div className="row">
                                                                    <div className="col-12 mt-1 mb-1" >
                                                                        <FormInput 
                                                                            label={'Description *'}
                                                                            placeholder={"Enter Description"}
                                                                            value={this.state.description}
                                                                            name="description"
                                                                            required
                                                                            onChange={this.formValueChange}
                                                                        />
                                                                    </div>
                                                            </div>
        
                                                        </div>

                                                        <div className="col-sm-4">

                                                            <div className="row">
                                                                <div className="col-12 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Total Tasks *"}
                                                                        placeholder={"Enter Total Tasks"}
                                                                        value={this.state.total_tasks}
                                                                        name="total_tasks"
                                                                        required
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-12 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Employee ID *"}
                                                                        placeholder={"Enter Employee ID"}
                                                                        value={this.state.empid}
                                                                        name="empid"
                                                                        required
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
                                </Card>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
   
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});
 
  
export default connect(mapStateToProps, null)(withRouter(Training));