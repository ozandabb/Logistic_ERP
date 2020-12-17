import React from "react";
import { withRouter } from "react-router-dom";
import {FormInput  } from '../../../../Components/Form'
import {  Button, Card , FormFile , Popover ,OverlayTrigger, Image , Form} from 'react-bootstrap';
import { connect } from 'react-redux';
import CONFIG from '../../../../Controllers/Config.controller';
import { ComponentToPrint } from './PrintAllVehicles';
import ReactToPrint from 'react-to-print';


import Vehicle_CONTROLLER from '../../../../Controllers/HR Staff/Vehicle.controller';

class addVehicleCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addVehicleState: false,
            printSupplierState: false,

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

            errors : {},
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

        if (this.validate()) {
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
                image: this.state.image
            }

            const result = await Vehicle_CONTROLLER.addVehicle(data, this.props.auth.token);

            if(result.status == 201){
                CONFIG.setToast("Vehicle Successfully Added! Refresh the List");
                this.props.history.push("/hr/vehicles");
                this.clear();
            }else{
                CONFIG.setErrorToast("Somthing Went Wrong!");
                this.clear();
            }
        }
    }

    clear = ()=>{
        this.setState({
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
            image: ''
        })

       this.change_toggle();
    }

    render() {
        const {errors } = this.state;

        return (
            <div>
                {/* Title and the add new customer button */}
                <div className="row" style={{marginTop:"5px", fontFamily:"sans-serif", marginBottom:"15px"}}>
                        <div className="col-sm-9">
                            <div className="row">
                            <div className="col-sm">
                                    <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Vehicle Details<br></br>
                                    <span className="text-muted small">Dashboard / Vehicles</span></h6>
                                </div>
                                <div className="col-sm">
                                    <div className="row">
                                        <ReactToPrint
                                            trigger={() => {
                                                return <Image src="/images/printer.png" className="d-none d-lg-block" style={{width:"40px", marginTop:"10px", marginLeft:"10px", cursor:"pointer"}} rounded />;
                                            }}
                                            content={() => this.componentRef}
                                        />
                                        {/* <>
                                        {['bottom'].map((placement) => (
                                            <OverlayTrigger
                                            trigger="click"
                                            key={placement}
                                            placement={placement}
                                            overlay={
                                                <Popover id={`popover-positioned-${placement}`}>
                                                <Popover.Title as="h3">{`Quick Email`}</Popover.Title>
                                                <Popover.Content>
                                                    <Form>
                                                        <Form.Group controlId="exampleForm.ControlInput1">
                                                            <Form.Label>Email address</Form.Label>
                                                            <Form.Control type="email" placeholder="name@example.com" />
                                                        </Form.Group>
                                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                                            <Form.Label>Message</Form.Label>
                                                            <Form.Control as="textarea" rows={3} />
                                                        </Form.Group>
                                                        <Button style={{backgroundColor:"#7800B7", color:"#FFFFFF", cursor: 'pointer'}}  className="btn mt-2 form-control btn btn-sm ">Send</Button>
                                                    </Form>
                                                </Popover.Content>
                                                </Popover>
                                            }
                                            >
                                            <Image src="/images/email.png" className="d-none d-lg-block" style={{width:"40px", marginTop:"10px", marginLeft:"10px", cursor:"pointer"}} rounded />
                                            </OverlayTrigger>
                                        ))}
                                        </> */}
                                    </div>
                                </div>
                            </div>
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
                                            <form onSubmit={(e) => this.onFormSubmit(e)} >
                                                <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Vehicle Details<br></br>
                                                <span className="text-muted small">You can add a new vehicle by filling relavant Information</span></h6>
                                           
                                                <div className="row" >
                                                    <div className="col-sm-8">
                                                       
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'Vehicle Name *'}
                                                                        placeholder={"Enter Vehicle Name"}
                                                                        value={this.state.vehicle_name}
                                                                        name="vehicle_name"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                    {errors.vehicle_name && errors.vehicle_name.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.vehicle_name}</h4>}
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Year *"}
                                                                        placeholder={"Enter year"}
                                                                        value={this.state.vehicle_year}
                                                                        name="vehicle_year"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                    {errors.vehicle_year && errors.vehicle_year.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.vehicle_year}</h4>}
                                                                </div>
                                                        </div>
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'Vehicle Type *'}
                                                                        placeholder={"Enter vehicle Type"}
                                                                        value={this.state.vehicle_type}
                                                                        name="vehicle_type"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                    {errors.vehicle_type && errors.vehicle_type.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.vehicle_type}</h4>}
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Vehicle Number *"}
                                                                        placeholder={"Enter Vehicle Number"}
                                                                        value={this.state.vehicle_number}
                                                                        name="vehicle_number"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                    {errors.vehicle_number && errors.vehicle_number.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.vehicle_number}</h4>}
                                                                </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'Weight (Kg) *'}
                                                                        placeholder={"Enter weight"}
                                                                        value={this.state.weight}
                                                                        name="weight"
                                                                        type="Number"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                    {errors.weight && errors.weight.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.weight}</h4>}
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Mileage  *"}
                                                                        placeholder={"Enter Mileage"}
                                                                        value={this.state.mileage}
                                                                        name="mileage"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                    {errors.mileage && errors.mileage.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.mileage}</h4>}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={'Description *'}
                                                                    placeholder={"Description about the Vehicle"}
                                                                    value={this.state.description}
                                                                    name="description"
                                                                    onChange={this.formValueChange}
                                                                />
                                                                {errors.description && errors.description.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.description}</h4>}
                                                            </div>
                                                        </div>
   
                                                        <div className="row">
                                                            <div className="col-sm-6 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={'Service Due Date *'}
                                                                    type="date"
                                                                    value={this.state.service_due}
                                                                    name="service_due"
                                                                    onChange={this.formValueChange}
                                                                />
                                                                   {errors.service_due && errors.service_due.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.service_due}</h4>} 
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
                                                                    value={this.state.licen_number}
                                                                    name="licen_number"
                                                                    onChange={this.formValueChange}
                                                                />
                                                                   {errors.licen_number && errors.licen_number.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.licen_number}</h4>} 
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={'License Renew Date *'}
                                                                    type="date"
                                                                    value={this.state.licen_renew_date}
                                                                    name="licen_renew_date"
                                                                    onChange={this.formValueChange}
                                                                />
                                                                 {errors.licen_renew_date && errors.licen_renew_date.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.licen_renew_date}</h4>}   
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={'Insurance Number  *'}
                                                                    placeholder={"Enter Insurance Number"}
                                                                    value={this.state.insurance_number}
                                                                    name="insurance_number"
                                                                    onChange={this.formValueChange}
                                                                />
                                                                  {errors.insurance_number && errors.insurance_number.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.insurance_number}</h4>}  
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={'Insurance Renew Date  *'}
                                                                    type="date"
                                                                    value={this.state.insurance_renew_date}
                                                                    name="insurance_renew_date"
                                                                    onChange={this.formValueChange}
                                                                />
                                                                {errors.insurance_renew_date && errors.insurance_renew_date.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.insurance_renew_date}</h4>}
                                                                    
                                                            </div>
                                                        </div>
                                                       
                                                    </div>
                                                </div>

                                                <div className="row"> 
                                                        <div className="col-6 mt-3 mb-1" >
                                                        <button type="submit" style={{backgroundColor:"#475466" , color:"#FFFFFF",  cursor: 'pointer'}} className="btn mt-2 btn btn-sm px-5">Submit</button>
                                                        <Button  style={{backgroundColor:"red",marginLeft:"10px", color:"#FFFFFF", cursor: 'pointer'}} onClick={() => this.clear()} className="btn mt-2 btn btn-sm px-5">Cancel</Button>
                                                        </div>
                                                </div>

                                                
                                            </form>
                                        </div>

                                </Card.Body>
                            </Card>
                        </div>
                    </div>


                    
                    {/* print all suppliers */}
                    <div className="row" style={{ display: this.state.printSupplierState == true ? 'block' : 'none', marginBottom:"15px" }}>
                    <ComponentToPrint
                        proid={this.props.auth.token}
                        HRname = {this.props.auth.user.user_details.username}
                        ref={el => (this.componentRef = el)} />
                    </div>
            </div>
        );
    }

    validate = () => {
        let { errors, description, insurance_renew_date, insurance_number, service_due , mileage , 
            licen_renew_date, licen_number, weight, vehicle_number, vehicle_type, vehicle_year, vehicle_name } = this.state;
        let count = 0;

        if (vehicle_name.length === 0) {
            errors.vehicle_name =  'Vehicle Name can not be empty !'
            count++
        } else {
            errors.vehicle_name = ''
        }

        if (vehicle_year.length === 0) {
            errors.vehicle_year =  'Vehicle year can not be empty !'
            count++
        } else {
            if(vehicle_year.length < 4){
                errors.vehicle_year = "Need 4 Digits for a Year"
                count++
            }else{
                errors.vehicle_year = ''
            }
        }

        if (vehicle_type.length === 0) {
            errors.vehicle_type =  'Vehicle type can not be empty !'
            count++
        } else {
            errors.vehicle_type = ''
        }

        if (vehicle_number.length === 0) {
            errors.vehicle_number =  'Vehicle number can not be empty !'
            count++
        } else {
            errors.vehicle_number = ''
        }

        if (weight.length === 0) {
            errors.weight =  'Weight can not be empty !'
            count++
        } else {
            errors.weight = ''
        }

        if (licen_number.length === 0) {
            errors.licen_number =  'License number can not be empty !'
            count++
        } else {
            errors.licen_number = ''
        }

        if (licen_renew_date.length === 0) {
            errors.licen_renew_date =  'License Renew date can not be empty !'
            count++
        } else {
            errors.licen_renew_date = ''
        }

        if (mileage.length === 0) {
            errors.mileage =  'Mileage can not be empty !'
            count++
        } else {
            errors.mileage = ''
        }

        if (service_due.length === 0) {
            errors.service_due =  'Service Due date can not be empty !'
            count++
        } else {
            errors.service_due = ''
        }

        if (insurance_number.length === 0) {
            errors.insurance_number =  'Insurance number can not be empty !'
            count++
        } else {
            errors.insurance_number = ''
        }

        if (insurance_renew_date.length === 0) {
            errors.insurance_renew_date =  'Insurance Renew date can not be empty !'
            count++
        } else {
            errors.insurance_renew_date = ''
        }

        if (description.length === 0) {
            errors.description =  'Description can not be empty !'
            count++
        } else {
            errors.description = ''
        }

        this.setState({ errors });
        return count == 0;
    }












}


const mapStateToProps = state => ({
    auth: state.auth || {},
  });
 
  
export default connect(mapStateToProps, null)(withRouter(addVehicleCom));