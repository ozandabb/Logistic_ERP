import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import HRSidebar from "../../HRSidebar";
import { Tab , Row , Col, Nav , Card , InputGroup , FormControl, Table, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import {FormInput  } from '../../../../Components/Form';
import CONFIG from '../../../../Controllers/Config.controller';
import BENEFITS_CONTROLLER from '../../../../Controllers/HR Staff/Benefits.controller';
import moment from 'moment';
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrash } from '@fortawesome/free-solid-svg-icons'

class Benefits extends Component { 
    constructor(props) {
        super(props);
        this.state = {

            benefit:'',
            description:'',
            percentage:'',

            benefit_id:'',
            employee_id:'',

            userBene:[],
            MakeBene:[],

            isLoading: '',


        };
    } 

    async componentDidMount() {
        this.loadAllBenefits();
        this.loadAllUserBenefits();
    }

     //GET all benefits
    loadAllBenefits = async () => {
        this.setState({
            isLoading : true,
        })
        const resmake = await BENEFITS_CONTROLLER.getAllBenefits(this.props.auth.token);
        this.setState({
            isLoading : false,
            MakeBene: resmake.data.rows,
        });
    }

     //GET all benefits
    loadAllUserBenefits = async () => {
        this.setState({
            isLoading : true,
        })
        const resuser = await BENEFITS_CONTROLLER.getAllUserBenefits(this.props.auth.token);
        this.setState({
            isLoading : false,
            userBene: resuser.data.rows,
        });
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }

    // make benefits
    onFormSubmitMakeBehefits = async (e) => {
        e.preventDefault();

            var data = {
                benefit: this.state.benefit,
                description: this.state.description,
                percentage: this.state.percentage,
            }

            const result = await BENEFITS_CONTROLLER.makeBenefits(data, this.props.auth.token);

            if(result.status == 201){
                CONFIG.setToast("Successfully Added");
                this.clear();
            }else{
                CONFIG.setErrorToast(" Somthing Went Wrong!");
            }
    }

     // user benefits
     onFormSubmitUserBehefits = async (e) => {
        e.preventDefault();

            var data = {
                benefit_id: this.state.benefit_id,
                employee_id: this.state.employee_id,
            }

            const result = await BENEFITS_CONTROLLER.userBenefits(data, this.props.auth.token);

            if(result.status == 201){
                CONFIG.setToast("Successfully Added");
                this.clearuserBenefits();
            }else{
                CONFIG.setErrorToast(" Somthing Went Wrong!");
            }
    }

    //DELETE Fucntion for make bene
    onClickmakeDelete = (id) => {
            CONFIG.setDeleteConfirmAlert(
                "",
                "Are you sure you want to delete this Benefit ?",
                () => this.clickDeleteSupplier(id),
                () => {}
            );
    };
    clickDeleteSupplier = async (id) => {
        const result = await BENEFITS_CONTROLLER.DeleteMakeBene( id , this.props.auth.token );

        if(result.status == 200){
            CONFIG.setToast("Successfully Deleted!");
            this.loadAllBenefits();
        }else{
            CONFIG.setErrorToast("Somthing Went Wrong!");
        }
    };

    //DELETE Fucntion for user bene
    onClickuserDelete = (id) => {
            CONFIG.setDeleteConfirmAlert(
                "",
                "Are you sure you want to delete this Benefit ?",
                () => this.clickDeleteSupplier2(id),
                () => {}
            );
    };
    clickDeleteSupplier2 = async (id) => {
        const result = await BENEFITS_CONTROLLER.DeleteUserBene( id , this.props.auth.token );

        if(result.status == 200){
            CONFIG.setToast("Successfully Deleted!");
            this.loadAllUserBenefits();
        }else{
            CONFIG.setErrorToast("Somthing Went Wrong!");
        }
    };

    clear = ()=>{
        this.setState({
            benefit:'',
            description:'',
            percentage:'',
        })
    }

    clearuserBenefits = ()=>{
        this.setState({
            benefit_id:'',
            employee_id:'',
        })
    }



    render() {
        const { MakeBene , userBene } = this.state;
        return (
            <div className="bg-light wd-wrapper">
                <HRSidebar activemenu={'BENEFITS'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">

                        {/* Tab section start here */}
                        <Tab.Container id="left-tabs-example">
                            <Row>

                                <Col sm={12}>
                                    <Card className="shadow" >
                                    <nav>
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                            <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Create User Benefits</a>
                                            <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Make Benefits</a>
                                        </div>
                                    </nav>
                                    <div className="tab-content" id="nav-tabContent">

                                        {/* user benefits create */}
                                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                            <div className="row" style={{ marginBottom:"15px" }}>
                                                <div className="col-12">
                                                    <Card className="col-12" style={{paddingBottom:"15px"}}>
                                                        <Card.Body>

                                                                <div className="col-12 bg-white mt-1 pb-1" >
                                                                    <form onSubmit={(e) => this.onFormSubmitUserBehefits(e)}>
                                                                            <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">User Benefit<br></br>
                                                                            <span className="text-muted small">You can create user benefit by filling relavant information</span></h6>
                                                                        <div className="row" >
                                                                            <div className="col-sm-8">
                                                                                <div className="row">
                                                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                                                            <FormInput 
                                                                                                label={'Benefit ID*'}
                                                                                                placeholder={"Enter Benefit ID"}
                                                                                                value={this.state.benefit_id}
                                                                                                name="benefit_id"
                                                                                                required
                                                                                                onChange={this.formValueChange}
                                                                                            />
                                                                                        </div>
                                                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                                                            <FormInput 
                                                                                                label={'Employee ID *'}
                                                                                                placeholder={"Enter Employee ID"}
                                                                                                value={this.state.employee_id}
                                                                                                name="employee_id"
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

                                            {/* user benefit table eka */}
                                            <div className="row" style={{ marginBottom:"15px" }}>
                                                <div className="col-sm">
                                                    <Card className="shadow">
                                                        <Table striped bordered hover variant="light">
                                                            <thead>
                                                                <tr>
                                                                    <th>Benefit ID</th>
                                                                    <th>Benefit</th>
                                                                    <th>Percentage</th>
                                                                    <th>Emp ID</th>
                                                                    <th>Date</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            {userBene && userBene.map((name) => this.renderAllUserBene(name))}
                                                                <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto'}}>
                                                                    <span className="sr-only">Loading...</span>
                                                                </Spinner>
                                                            </tbody>
                                                        </Table>
                                                    </Card>
                                                </div>
                                            </div>


                                        </div>

                                        {/* make benefits section start here */}
                                        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"> 

                                            <div className="row" style={{ marginBottom:"15px" }}>
                                                <div className="col-12">
                                                    <Card className="col-12" style={{paddingBottom:"15px"}}>
                                                        <Card.Body>

                                                                <div className="col-12 bg-white mt-1 pb-1" >
                                                                    <form onSubmit={(e) => this.onFormSubmitMakeBehefits(e)}>
                                                                            <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Make Benefit<br></br>
                                                                            <span className="text-muted small">You can create a benefit by filling relavant information</span></h6>
                                                                        <div className="row" >
                                                                            <div className="col-sm-8">
                                                                                
                                                                                <div className="row">
                                                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                                                            <FormInput 
                                                                                                label={'Benefit*'}
                                                                                                placeholder={"ex : Free Health Care"}
                                                                                                value={this.state.benefit}
                                                                                                name="benefit"
                                                                                                required
                                                                                                onChange={this.formValueChange}
                                                                                            />
                                                                                        </div>
                                                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                                                            <FormInput 
                                                                                                label={'Percentage *'}
                                                                                                type="number"
                                                                                                placeholder={"Enter Percentage"}
                                                                                                value={this.state.percentage}
                                                                                                name="percentage"
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

                                             {/* make benefit table eka */}
                                             <div className="row" style={{ marginBottom:"15px" }}>
                                                <div className="col-sm">
                                                    <Card className="shadow">
                                                        <Table striped bordered hover variant="light">
                                                            <thead>
                                                                <tr>
                                                                    <th>Benefit ID</th>
                                                                    <th>Benefit</th>
                                                                    <th>Percentage</th>
                                                                    <th>Description</th>
                                                                    <th>Date</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            {MakeBene && MakeBene.map((name) => this.renderAllmakeBene(name))}
                                                                <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto'}}>
                                                                    <span className="sr-only">Loading...</span>
                                                                </Spinner>
                                                            </tbody>
                                                        </Table>
                                                    </Card>
                                                </div>
                                            </div>



                                        </div>


                                    </div>

                                    

                                    </Card>
                                </Col>
                            </Row>
                        </Tab.Container>


                    </div>
                </div>
            </div>
        );
    }

    
    //reander all make benef
    renderAllmakeBene = (item) => {
        const { search } = this.state;

        // if( search !== "" && item.employee.full_name.toLowerCase().indexOf(search.toLowerCase()) === -1 ){
        //     return null;
        // }

        return(
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.benefit}</td>
                <td>{item.percentage}</td>
                <td>{item.description}</td>
                <td>{moment(new Date(item.createdAt)).format("YYYY MMM DD")}</td>
                <td><FontAwesomeIcon icon={faTrash} onClick={() => this.onClickmakeDelete(item.id)} style={{color:"red" , cursor: 'pointer'}} /></td>
            </tr>
        );
    }

    //reander all user benef
    renderAllUserBene = (item) => {
        const { search } = this.state;

        // if( search !== "" && item.employee.full_name.toLowerCase().indexOf(search.toLowerCase()) === -1 ){
        //     return null;
        // }

        return(
            <tr key={item.id}>
                <td>{item.benefit_id}</td>
                <td>{item.benefit.benefit}</td>
                <td>{item.benefit.percentage}</td>
                <td>{item.employee_id}</td>
                <td>{moment(new Date(item.createdAt)).format("YYYY MMM DD")}</td>
                <td><FontAwesomeIcon icon={faTrash} onClick={() => this.onClickuserDelete(item.id)} style={{color:"red" , cursor: 'pointer'}} /></td>
            </tr>
        );
    }











   
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});
 
  
export default connect(mapStateToProps, null)(withRouter(Benefits));