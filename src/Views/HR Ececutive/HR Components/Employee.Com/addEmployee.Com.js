import React from "react";
import { withRouter } from "react-router-dom";
import {FormInput , FormSelect  } from '../../../../Components/Form'
import {  Button, Card , Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import CONFIG from '../../../../Controllers/Config.controller';
import ToggleButton from 'react-toggle-button'

// import CUST_CONTROLLER from '../../../../Controllers/Customer.controller';

class addEmployeeCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addEmployeeState: false,

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
            dob:"1997-03-25",
            postal_code:'',

        };
    }

    change_toggle = () => {
        if (this.state.addEmployeeState) {
            this.setState({ addEmployeeState: false })
        } else {
            this.setState({ addEmployeeState: true })
        }
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }

    onFormSubmit = async (e) => {
        e.preventDefault();
        if(this.state.marital_status == "Yes"){
            console.log("yes bn");
        }
        else{
            console.log("no");
        }
       

        // var data = {
        //     username: this.state.username,
        //     email: this.state.email,
        //     nic: this.state.nic,
        //     phone: this.state.phone,

        //     role: this.state.role,
        //     image : this.state.image,
        //     credit_limit: this.state.credit_limit,
        //     city: this.state.city,

        //     address: this.state.address,
        //     name: this.state.name,
        //     lat: this.state.lat,
        //     long : this.state.long,

        //     signature: this.state.signature,
        //     dob: this.state.dob,
        //     postal_code : this.state.postal_code,
        // }

        // const result = await CUST_CONTROLLER.addCustomer(data, this.props.auth.token);

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

       this.change_toggle();
    }

    render() {
        return (
            <div>
                {/* Title and the add new customer button */}
                <div className="row" style={{marginTop:"5px", fontFamily:"sans-serif", marginBottom:"15px"}}>
                        <div className="col-sm-9">
                            <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Employee Details<br></br>
                            <span className="text-muted small">Dashboard / Employees</span></h6>
                        </div>
                        <div className="col-sm-3">
                            <Button variant="" style={{backgroundColor:"#475466" , color:"#FFFFFF", width:"100%",  cursor: 'pointer'}} onClick={() => this.change_toggle()}>Add new Employee</Button>
                        </div>
                    </div>

                    {/* Add customer form toggle */}
                    <div className="row" style={{ display: this.state.addEmployeeState == true ? 'block' : 'none', marginBottom:"15px" }}>
                        <div className="col-12">
                            <Card className="col-12">
                                <Card.Body>

                                        <div className="col-12 bg-white mt-1 pb-1" >
                                            <form onSubmit={(e) => this.onFormSubmit(e)}>
                                                <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Employee Details<br></br>
                                                <span className="text-muted small">You can add a new employee by filling relavant Information</span></h6>
                                           
                                                <div className="row" >
                                                    <div className="col-sm-8">
                                                       
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'Full Name *'}
                                                                        placeholder={"Enter Employee's Name"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.full_name}
                                                                        name="full_name"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Employee No"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.emp_no}
                                                                        name="emp_no"
                                                                        readOnly 
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                        </div>
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormSelect 
                                                                        label={'Gender *'}
                                                                        //error={ errors.group_mo}
                                                                        options={GENDER}
                                                                        value={this.state.gender}
                                                                        name="gender"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Date of Birth *"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.date_of_birth}
                                                                        type="Date"
                                                                        name="date_of_birth"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                        </div>
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormSelect 
                                                                        label={'Marital Status *'}
                                                                        placeholder={"Enter Employee's Marital Status"}
                                                                        //error={ errors.group_mo}
                                                                        options={marital_status}
                                                                        value={this.state.marital_status}
                                                                        name="marital_status"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'Spouse Name *'}
                                                                        placeholder={"Enter Employee's Spouse Name"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.spouse_name}
                                                                        name="spouse_name"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                        </div>

                                                        <div className="row">
                                                                <div className="col-sm-12 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Address *"}
                                                                        placeholder={"Enter Employee's Addres"}
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
                                                                        placeholder={"Enter Employee's City"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.city}
                                                                        name="city"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Zip Code *"}
                                                                        placeholder={"Enter Employee's Zip code"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.zip_code}
                                                                        name="zip_code"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                        </div>
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Mobile Number *"}
                                                                        placeholder={"Enter Employee's Mobile No"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.phone}
                                                                        name="phone"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Land Number *"}
                                                                        placeholder={"Enter Employee's Land No"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.home_phone}
                                                                        name="home_phone"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                        </div>

                                                     
                                                        <h6 className="text-header py-3 mb-0 font-weight-bold mt-4 line-hight-1">Enter Work Details<br></br>
                                                        <span className="text-muted small">You can Enter Employee's Working details </span></h6>
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormSelect 
                                                                        label={"Department *"}
                                                                        placeholder={"Enter Department"}
                                                                        //error={ errors.group_mo}
                                                                        options={DEPARTMENTS}
                                                                        value={this.state.department}
                                                                        name="department"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormSelect 
                                                                        label={"Designation *"}
                                                                        placeholder={"Enter Designation"}
                                                                        options={DESIGNATIONS}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.designation}
                                                                        name="designation"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                        </div>
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Service Location *"}
                                                                        placeholder={"Enter Service Location"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.service_location}
                                                                        name="service_location"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormSelect 
                                                                        label={"System Access *"}
                                                                        placeholder={"Enter Service Location"}
                                                                        options={SYSTEM_ACCESS}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.system_access}
                                                                        name="system_access"
                                                                        //onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                        </div>
                                                        <div className="row mt-3">
                                                            <div className="col-sm">
                                                                {/* <Form.Group controlId="formBasicCheckbox">
                                                                    <Form.Check type="checkbox" style={{color:"blue"}} label="Check me out" />
                                                                </Form.Group> */}
                                                                
                                                            </div>
                                                        </div>
                                                        

                                                        
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="row">
                                                            <div className="col-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={"Basic Salary *"}
                                                                    placeholder={"Enter Basic Salary"}
                                                                    //error={ errors.group_mo}
                                                                    value={this.state.basic_salary}
                                                                    name="basic_salary"
                                                                    onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={"Bank Name *"}
                                                                    placeholder={"Enter Employee's Bank Name"}
                                                                    //error={ errors.group_mo}
                                                                    value={this.state.bank_name}
                                                                    name="bank_name"
                                                                    onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={"Bank Branch *"}
                                                                    placeholder={"Enter Employee's Bank Branch"}
                                                                    //error={ errors.group_mo}
                                                                    value={this.state.bank_branch}
                                                                    name="bank_branch"
                                                                    onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={"Bank Account Holder *"}
                                                                    placeholder={"Enter Bank Account Holder Name"}
                                                                    //error={ errors.group_mo}
                                                                    value={this.state.bank_account_holder_name}
                                                                    name="bank_account_holder_name"
                                                                    onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={"Bank Account Number *"}
                                                                    placeholder={"Enter Bank Account Number"}
                                                                    //error={ errors.group_mo}
                                                                    value={this.state.bank_account_number}
                                                                    name="bank_account_number"
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

const GENDER = [{ label : 'Select the Gender' ,value : 'NONE' } , 
...['Male','Female', 'None'].map( i => {
    return{
        label : i  ,
         value : i 
    }
})];

const marital_status = [{ label : 'Select the Status' ,value : 'NONE' } , 
...['Yes','No'].map( i => {
    return{
        label : i  ,
         value : i 
    }
})];

const SYSTEM_ACCESS = [{ label : 'Select the Option' ,value : 'NONE' } , 
...['Yes','No'].map( i => {
    return{
        label : i  ,
         value : i 
    }
})];

const DESIGNATIONS = [{ label : 'Select the Option' ,value : 'NONE' } , 
...['IT','Accountant'].map( i => {
    return{
        label : i  ,
         value : i 
    }
})];

const DEPARTMENTS = [{ label : 'Select the Option' ,value : 'NONE' } , 
...['IT','No'].map( i => {
    return{
        label : i  ,
         value : i 
    }
})];


const mapStateToProps = state => ({
    auth: state.auth || {},
  });
 
  
export default connect(mapStateToProps, null)(withRouter(addEmployeeCom));