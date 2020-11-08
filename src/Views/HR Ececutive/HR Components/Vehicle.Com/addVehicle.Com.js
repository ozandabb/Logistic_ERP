import React from "react";
import { withRouter } from "react-router-dom";
import {FormInput  } from '../../../../Components/Form'
import {  Button, Card , FormFile } from 'react-bootstrap';
import { connect } from 'react-redux';
import CONFIG from '../../../../Controllers/Config.controller';


import Vehicle_CONTROLLER from '../../../../Controllers/HR Staff/Vehicle.controller';

class addVehicleCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addVehicleState: false,

            vehicle_name:'',
            vehicle_year:'',
            vehicle_type:'',
            vehicle_number:'',
            weight: '',
            licen_number: '',
            licen_renew_date:'',
            mileage:'',
            service_due:'',
            insurance_number:'',
            insurance_renew_date:'',
            description:'',
            image: "https://cdn.vox-cdn.com/thumbor/-lBwP_zdIxKxEfwUb1NSwS3UqOk=/0x0:4243x3079/920x613/filters:focal(1783x1201:2461x1879):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/65022936/TuSimple_Self_Drving_Truck_4_copy.0.jpg",

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

            vehicle_name: this.state.vehicle_name,
            vehicle_year: this.state.vehicle_year,
            vehicle_type: this.state.vehicle_type,
            vehicle_number: this.state.vehicle_number,
            weight:  this.state.weight,
            licen_number:  this.state.licen_number,
            licen_renew_date:this.state.licen_renew_date,
            mileage:this.state.mileage,
            service_due: this.state.service_due,
            insurance_number:this.state.insurance_number,
            insurance_renew_date:this.state.insurance_renew_date,
            description:this.state.description,
            image:this.state.image
        }

        const result = await Vehicle_CONTROLLER.addVehicle(data, this.props.auth.token);

        if(result.status == 201){
            CONFIG.setToast("Successfully Added");
            this.clear();
        }
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
                            <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Vehicle Details<br></br>
                            <span className="text-muted small">Dashboard / Vehicle</span></h6>
                        </div>
                        <div className="col-sm-3">
                            <Button variant="" style={{backgroundColor:"#475466" , color:"#FFFFFF", width:"100%",  cursor: 'pointer'}} onClick={() => this.change_toggle()}>Add new Vehicle</Button>
                        </div>
                    </div>

                    {/* Add customer form toggle */}
                    <div className="row" style={{ display: this.state.addVehicleState == true ? 'block' : 'none', marginBottom:"15px" }}>
                        <div className="col-12">
                            <Card className="col-12">
                                <Card.Body>

                                        <div className="col-12 bg-white mt-1 pb-1" >
                                            <form onSubmit={(e) => this.onFormSubmit(e)}>
                                                <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Vehicle Details<br></br>
                                                <span className="text-muted small">You can add a new vehicle by filling relavant Information</span></h6>
                                           
                                                <div className="row" >
                                                    <div className="col-sm-8">
                                                       
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'Vehicle Name *'}
                                                                        placeholder={"Enter Vehicle Name"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.vehicle_name}
                                                                        name="vehicle_name"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Year *"}
                                                                        placeholder={"Enter year"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.vehicle_year}
                                                                        name="vehicle_year"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                        </div>
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'Vehicle Type *'}
                                                                        placeholder={"Enter vehicle Type"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.vehicle_type}
                                                                        name="vehicle_type"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Vehicle Number *"}
                                                                        placeholder={"Enter Vehicle Number"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.vehicle_number}
                                                                        name="vehicle_number"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'Weight *'}
                                                                        placeholder={"Enter weight"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.weight}
                                                                        name="weight"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Mileage  *"}
                                                                        placeholder={"Enter Mileage"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.mileage}
                                                                        name="mileage"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={'Description *'}
                                                                    placeholder={"Description about the Vehicle"}
                                                                    //error={ errors.group_mo}
                                                                    value={this.state.description}
                                                                    name="description"
                                                                    onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                />
                                                            </div>
                                                        </div>
   
                                                        <div className="row">
                                                            <div className="col-sm-6 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={'Service Due Date *'}
                                                                    //error={ errors.group_mo}
                                                                    type="date"
                                                                    value={this.state.service_due}
                                                                    name="service_due"
                                                                    onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                />
                                                                    
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-12 mb-1" >
                                                                <FormFile
                                                                    label={'Image'}/>
                                                            </div>
                                                        </div>
                                                      

                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="row">
                                                            <div className="col-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={'License Number*'}
                                                                    placeholder={"Enter License Number"}
                                                                    //error={ errors.group_mo}
                                                                    value={this.state.licen_number}
                                                                    name="licen_number"
                                                                    onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                />
                                                                    
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={'License Renew Date *'}
                                                                    //error={ errors.group_mo}
                                                                    type="date"
                                                                    value={this.state.licen_renew_date}
                                                                    name="licen_renew_date"
                                                                    onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                />
                                                                    
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={'Insurance Number  *'}
                                                                    placeholder={"Enter Insurance Number"}
                                                                    //error={ errors.group_mo}
                                                                    value={this.state.insurance_number}
                                                                    name="insurance_number"
                                                                    onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                />
                                                                    
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={'Insurance Renew Date  *'}
                                                                    //error={ errors.group_mo}
                                                                    type="date"
                                                                    value={this.state.insurance_renew_date}
                                                                    name="insurance_renew_date"
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
 
  
export default connect(mapStateToProps, null)(withRouter(addVehicleCom));