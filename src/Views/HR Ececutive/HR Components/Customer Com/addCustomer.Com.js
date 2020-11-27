import React from "react";
import { withRouter } from "react-router-dom";
import {FormInput  } from '../../../../Components/Form'
import {  Button, Card , Form , Image ,FormFile, OverlayTrigger , Tooltip , Popover } from 'react-bootstrap';
import { connect } from 'react-redux';
import CONFIG from '../../../../Controllers/Config.controller';
import { ComponentToPrint } from './PrintAllCustomers';
import ReactToPrint from 'react-to-print';

import CUST_CONTROLLER from '../../../../Controllers/HR Staff/Customer.controller';

class addCustomerCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addCustomerState: false,
            printSupplierState: false,

            username:'',
            email:'',
            nic:'',
            phone:'',
            role: 2,
            image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
            credit_limit:'',
            city:'',
            address:'',
            name:'',
            lat:'',
            long:'',
            signature: "https://www.docsketch.com/assets/vip-signatures/muhammad-ali-signature-6a40cd5a6c27559411db066f62d64886c42bbeb03b347237ffae98b0b15e0005.svg",
            dob:'',
            postal_code:'',

            errors : {},

        };
    }

    change_toggle = () => {
        if (this.state.addCustomerState) {
            this.setState({ addCustomerState: false })
        } else {
            this.setState({ addCustomerState: true })
        }
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }

    onFormSubmit = async (e) => {
        e.preventDefault();

        if (this.validate()) {
            var data = {
                username: this.state.username,
                email: this.state.email,
                nic: this.state.nic,
                phone: this.state.phone,

                role: this.state.role,
                image : this.state.image,
                credit_limit: this.state.credit_limit,
                city: this.state.city,

                address: this.state.address,
                name: this.state.name,
                lat: this.state.lat,
                long : this.state.long,

                signature: this.state.signature,
                dob: this.state.dob,
                postal_code : this.state.postal_code,
            }

            const result = await CUST_CONTROLLER.addCustomer(data, this.props.auth.token);
            console.log("cus result",result );

            if(result.status === 201){
                CONFIG.setToast("Successfully Added!");
                this.clear();
            }else{
                CONFIG.setErrorToast(result.response.data.message);
            }
        }
    }

    clear = ()=>{
        this.setState({
            username:'',
            email:'',
            nic:'',
            phone:'',
            role: '',
            credit_limit:'',
            city:'',
            address:'',
            name:'',
            lat:'',
            long:'',
            dob:'',
            postal_code:'',
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
                                    <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Customer Details<br></br>
                                    <span className="text-muted small">Dashboard / Customers</span></h6>
                                </div>
                                <div className="col-sm">
                                    <div className="row">
                                        <ReactToPrint
                                            trigger={() => {
                                                return <Image src="/images/printer.png" className="d-none d-lg-block" style={{width:"40px", marginTop:"10px", marginLeft:"10px", cursor:"pointer"}} rounded />;
                                            }}
                                            content={() => this.componentRef}
                                        />
                                        <>
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
                                        </>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <Button variant="" style={{backgroundColor:"#475466" , color:"#FFFFFF", width:"100%",  cursor: 'pointer'}} onClick={() => this.change_toggle()}>Add new Customer</Button>
                        </div>
                    </div>

                    {/* Add customer form toggle */}
                    <div className="row" style={{ display: this.state.addCustomerState == true ? 'block' : 'none', marginBottom:"15px" }}>
                        <div className="col-12">
                            <Card className="col-12 shadow">
                                <Card.Body>

                                        <div className="col-12 bg-white mt-1 pb-1" >
                                            <form onSubmit={(e) => this.onFormSubmit(e)}>
                                                <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Customer Details<br></br>
                                                <span className="text-muted small">You can add a new customer by filling relavant Information</span></h6>
                                           
                                                <div className="row" >
                                                    <div className="col-sm-8">
                                                       
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'Customer Name *'}
                                                                        placeholder={"Enter Customer's Name"}
                                                                        value={this.state.name}
                                                                        name="name"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                    {errors.name && errors.name.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.name}</h4>}
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Username *"}
                                                                        placeholder={"Enter Customer's username"}
                                                                        value={this.state.username}
                                                                        name="username"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                    {errors.username && errors.username.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.username}</h4>}
                                                                </div>
                                                        </div>
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'Email *'}
                                                                        placeholder={"Enter Customer's Email"}
                                                                        value={this.state.email}
                                                                        name="email"
                                                                        type="Email"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                    {errors.email && errors.email.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.email}</h4>}
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"NIC *"}
                                                                        placeholder={"Enter Customer's NIC"}
                                                                        value={this.state.nic}
                                                                        name="nic"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                    {errors.nic && errors.nic.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.nic}</h4>}
                                                                </div>
                                                        </div>

                                                        <div className="row">
                                                                <div className="col-sm-12 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Address *"}
                                                                        placeholder={"Enter Customer's Addres"}
                                                                        value={this.state.address}
                                                                        name="address"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                    {errors.address && errors.address.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.address}</h4>}
                                                                </div>
                                                        </div>
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'City *'}
                                                                        placeholder={"Enter Customer's City"}
                                                                        value={this.state.city}
                                                                        name="city"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                    {errors.city && errors.city.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.city}</h4>}
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Contact Number *"}
                                                                        placeholder={"Enter Customer's Contact Number"}
                                                                        value={this.state.phone}
                                                                        name="phone"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                    {errors.phone && errors.phone.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.phone}</h4>}
                                                                </div>
                                                        </div>
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Postal Code *"}
                                                                        placeholder={"Enter Customer's Postal Code"}
                                                                        value={this.state.postal_code}
                                                                        name="postal_code"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                    {errors.postal_code && errors.postal_code.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.postal_code}</h4>}
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Date of Birth *"}
                                                                        value={this.state.dob}
                                                                        type="Date"
                                                                        name="dob"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                    {errors.dob && errors.dob.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.dob}</h4>}
                                                                </div>
                                                        </div>
                                                        

                                                        
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="row">
                                                            <div className="col-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={"Credit Limit *"}
                                                                    placeholder={"Enter Customer's Credit Limit"}
                                                                    value={this.state.credit_limit}
                                                                    name="credit_limit"
                                                                    onChange={this.formValueChange}
                                                                />
                                                                {errors.credit_limit && errors.credit_limit.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.credit_limit}</h4>}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm">
                                                                <FormInput 
                                                                    label={'Latitude *'}
                                                                    placeholder={"Enter Latitude"}
                                                                    value={this.state.lat}
                                                                    name="lat"
                                                                    onChange={this.formValueChange}
                                                                />
                                                                {errors.lat && errors.lat.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.lat}</h4>}

                                                            </div>
                                                            <div className="col-sm">
                                                                <FormInput 
                                                                    label={"Longitude *"}
                                                                    placeholder={"Enter Longitude"}
                                                                    value={this.state.long}
                                                                    name="long"
                                                                    onChange={this.formValueChange}
                                                                />
                                                                {errors.long && errors.long.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.long}</h4>}

                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 mt-3 " >
                                                                <FormFile
                                                                    label={'files'}/>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 mb-1" >
                                                                    <FormFile
                                                                    label={'files'}/>
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
        let { errors, username, email,nic, phone, credit_limit, city, address , name, lat , long, dob, postal_code} = this.state;
        let count = 0;

        if (username.length === 0) {
            errors.username =  'Username can not be empty !'
            count++
        } else {
            errors.username = ''
        }

        if (email.length === 0) {
            errors.email =  'Email can not be empty !'
            count++
        } else {
            errors.email = ''
        }

        if (nic.length === 0) {
            errors.nic =  'NIC can not be empty !'
            count++
        } else {
            if(nic.length === 9){
                errors.nic = "Need letter V"
                count++
            }else if(nic.length < 9){
                errors.nic = "Need 10 Digits for a NIC"
            }else{
                errors.nic = ''
            }
        }

        if (phone.length === 0) {
            errors.phone = "Contact Number can not be empty"
            count++
        } else {
            if(phone.length < 10){
                errors.phone = "Need 10 Digits for a number"
                count++
            }else{
                errors.phone = ""
            }
        }

        if (city.length === 0) {
            errors.city =  'City can not be empty !'
            count++
        } else {
            errors.city = ''
        }

        if (address.length === 0) {
            errors.address =  'Address can not be empty !'
            count++
        } else {
            errors.address = ''
        }

        if (credit_limit.length === 0) {
            errors.credit_limit =  'Credit Limit can not be empty !'
            count++
        } else {
            errors.credit_limit = ''
        }

        if (name.length === 0) {
            errors.name =  'Customer Name can not be empty !'
            count++
        } else {
            errors.name = ''
        }

        if (lat.length === 0) {
            errors.lat =  'Latitude Required !'
            count++
        } else {
            errors.lat = ''
        }

        if (long.length === 0) {
            errors.long =  'Longitude Required !'
            count++
        } else {
            errors.long = ''
        }

        if (dob.length === 0) {
            errors.dob =  'Birthday can not be empty !'
            count++
        } else {
            errors.dob = ''
        }
        if (postal_code.length === 0) {
            errors.postal_code =  'Postal Code Required !'
            count++
        } else {
            errors.postal_code = ''
        }

        this.setState({ errors });
        return count == 0;
    }









}


const mapStateToProps = state => ({
    auth: state.auth || {},
  });
 
  
export default connect(mapStateToProps, null)(withRouter(addCustomerCom));