import React from "react";
import { withRouter } from "react-router-dom";
import {FormInput  } from '../../../../Components/Form'
import {  Button, Card , FormFile } from 'react-bootstrap';
import { connect } from 'react-redux';
import CONFIG from '../../../../Controllers/Config.controller';


import Driver_CONTROLLER from '../../../../Controllers/HR Staff/DriverProfile.controller';

class addDriverCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addVehicleState: false,

            emp_id:'',
            licine_no:'',
            next_renew_date:'',
            description:'',
            licen_type: '',
            country: '',

        };
    }

    change_toggle = () => {
        if (this.state.addVehicleState) {
            this.setState({ addVehicleState: false })
        } else {
            this.setState({ addVehicleState: true })
        }
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }

    onFormSubmit = async (e) => {
        e.preventDefault();

        var data = {

            emp_id: this.state.emp_id,
            licine_no: this.state.licine_no,
            next_renew_date: this.state.next_renew_date,
            description: this.state.description,
            licen_type:  this.state.licen_type,
            country:  this.state.country,
            
        }

        const result = await Driver_CONTROLLER.addDriver(data, this.props.auth.token);

        // if(result.status == 201){
        //     CONFIG.setToast("Successfully Added");
        //     this.clear();
        // }
    }

    clear = ()=>{
        this.setState({
            username:'' ,
            email:'' ,
            nic:'' ,
            phone: '',
            //image : this.state.image,
            credit_limit: '',
            city: '',
            address: '',
            name: '',
            lat: '',
            long : '',
            //signature: this.state.signature,
            //dob: this.state.dob,
            postal_code : '',
        })

        if (this.state.addVehicleState) {
            this.setState({ addVehicleState: false })
        } else {
            this.setState({ addVehicleState: true })
        }
    }

    render() {
        return (
            <div>
                {/* Title and the add new customer button */}
                <div className="row" style={{marginTop:"5px", fontFamily:"sans-serif", marginBottom:"15px"}}>
                        <div className="col-sm-9">
                            <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Driver Details<br></br>
                            <span className="text-muted small">Dashboard / Driver Profile</span></h6>
                        </div>
                        <div className="col-sm-3">
                            <Button variant="" style={{backgroundColor:"#475466" , color:"#FFFFFF", width:"100%",  cursor: 'pointer'}} onClick={() => this.change_toggle()}>Add new Driver</Button>
                        </div>
                    </div>

                    {/* Add customer form toggle */}
                    <div className="row" style={{ display: this.state.addVehicleState == true ? 'block' : 'none', marginBottom:"15px" }}>
                        <div className="col-12">
                            <Card className="col-12">
                                <Card.Body>

                                        <div className="col-12 bg-white mt-1 pb-1" >
                                            <form onSubmit={(e) => this.onFormSubmit(e)}>
                                                <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Driver Details<br></br>
                                                <span className="text-muted small">You can add a new driver by filling relavant Information</span></h6>
                                           
                                                <div className="row" >
                                                    <div className="col-sm-8">
                                                       
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'Employee ID *'}
                                                                        placeholder={"Enter Employee ID"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.emp_id}
                                                                        name="emp_id"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"License Number *"}
                                                                        placeholder={"Enter License Number"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.licine_no}
                                                                        name="licine_no"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                        </div>
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'License Renew Date  *'}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.next_renew_date}
                                                                        name="next_renew_date"
                                                                        type="date"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"License Type *"}
                                                                        placeholder={"Enter License Type "}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.licen_type}
                                                                        name="licen_type"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-sm-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={'Description *'}
                                                                    placeholder={"Description about the Driver"}
                                                                    //error={ errors.group_mo}
                                                                    value={this.state.description}
                                                                    name="description"
                                                                    onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                />
                                                            </div>
                                                        </div>
   

                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="row">
                                                            <div className="col-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={'Country*'}
                                                                    placeholder={"Enter Country"}
                                                                    //error={ errors.group_mo}
                                                                    value={this.state.country}
                                                                    name="country"
                                                                    onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                />
                                                                    
                                                            </div>
                                                        </div>
                                                    
                                                       
                                                    </div>
                                                </div>

                                                <div className="row"> 
                                                        <div className="col-6 mt-3 mb-1" >
                                                        <button type="submit" style={{backgroundColor:"#475466" , color:"#FFFFFF",  cursor: 'pointer'}} className="btn mt-2 btn btn-sm px-5">Submit</button>
                                                        <button type="submit" style={{backgroundColor:"red",marginLeft:"10px", color:"#FFFFFF", cursor: 'pointer'}} onClick={() => this.clear()} className="btn mt-2 btn btn-sm px-5">Cancel</button>
                                                        </div>
                                                </div>

                                                
                                            </form>
                                        </div>

                                </Card.Body>
                            </Card>
                        </div>
                    </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    auth: state.auth || {},
  });
 
  
export default connect(mapStateToProps, null)(withRouter(addDriverCom));