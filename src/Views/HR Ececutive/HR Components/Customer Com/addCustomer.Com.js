import React from "react";
import { withRouter } from "react-router-dom";
import {FormInput  } from '../../../../Components/Form'
import {  Button, Card, FormFile } from 'react-bootstrap';
import { connect } from 'react-redux';
import CONFIG from '../../../../Controllers/Config.controller';

import CUST_CONTROLLER from '../../../../Controllers/HR Staff/Customer.controller';

class addCustomerCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addCustomerState: false,

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

        if(result.status == 201){
            CONFIG.setToast(result.data.message);
            this.clear();
        }
        // else{
        //     CONFIG.setErrorToast(" Somthing Went Wrong!");
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

      this.change_toggle();
    }

    render() {
        return (
            <div>
                {/* Title and the add new customer button */}
                <div className="row" style={{marginTop:"5px", fontFamily:"sans-serif", marginBottom:"15px"}}>
                        <div className="col-sm-9">
                            <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Customer Details<br></br>
                            <span className="text-muted small">Dashboard / Customers</span></h6>
                        </div>
                        <div className="col-sm-3">
                            <Button variant="" style={{backgroundColor:"#475466" , color:"#FFFFFF", width:"100%",  cursor: 'pointer'}} onClick={() => this.change_toggle()}>Add new Customer</Button>
                        </div>
                    </div>

                    {/* Add customer form toggle */}
                    <div className="row" style={{ display: this.state.addCustomerState == true ? 'block' : 'none', marginBottom:"15px" }}>
                        <div className="col-12">
                            <Card className="col-12">
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
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.name}
                                                                        name="name"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Username *"}
                                                                        placeholder={"Enter Customer's username"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.username}
                                                                        name="username"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                        </div>
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'Email *'}
                                                                        placeholder={"Enter Customer's Email"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.email}
                                                                        name="email"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"NIC *"}
                                                                        placeholder={"Enter Customer's NIC"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.nic}
                                                                        name="nic"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                        </div>

                                                        <div className="row">
                                                                <div className="col-sm-12 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Address *"}
                                                                        placeholder={"Enter Customer's Addres"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.address}
                                                                        name="address"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                        </div>
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'City *'}
                                                                        placeholder={"Enter Customer's City"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.city}
                                                                        name="city"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Contact Number *"}
                                                                        placeholder={"Enter Customer's Contact Number"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.phone}
                                                                        name="phone"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                        </div>
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Postal Code *"}
                                                                        placeholder={"Enter Customer's Postal Code"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.postal_code}
                                                                        name="postal_code"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Date of Birth *"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.dob}
                                                                        type="Date"
                                                                        name="dob"
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
                                                                    label={"Credit Limit *"}
                                                                    placeholder={"Enter Customer's Credit Limit"}
                                                                    //error={ errors.group_mo}
                                                                    value={this.state.credit_limit}
                                                                    name="credit_limit"
                                                                    onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm">
                                                                <FormInput 
                                                                    label={'Latitude *'}
                                                                    placeholder={"Enter Latitude"}
                                                                    //error={ errors.group_mo}
                                                                    value={this.state.lat}
                                                                    name="lat"
                                                                    onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                />

                                                            </div>
                                                            <div className="col-sm">
                                                                <FormInput 
                                                                    label={"Longitude *"}
                                                                    placeholder={"Enter Longitude"}
                                                                    //error={ errors.group_mo}
                                                                    value={this.state.long}
                                                                    name="long"
                                                                    onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                />

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
 
  
export default connect(mapStateToProps, null)(withRouter(addCustomerCom));