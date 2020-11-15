import React from "react";
import { withRouter } from "react-router-dom";
import {FormInput , FormSelect  } from '../../../../Components/Form'
import {  Button, Card , Form , Image , OverlayTrigger , Tooltip , Popover } from 'react-bootstrap';
import { connect } from 'react-redux';
import CONFIG from '../../../../Controllers/Config.controller';
import Employee_CONTROLLER from '../../../../Controllers/HR Staff/Employee.controller';
import { ComponentToPrint } from './PrintAllEmployee';
import { ComponentToPrint2 } from './PrintBankAccounts';
import ReactToPrint from 'react-to-print';

// import CUST_CONTROLLER from '../../../../Controllers/Customer.controller';

class addEmployeeCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addEmployeeState: false,
            printSupplierState: false,
            printSupplierState2: false,
            curTime : new Date().toLocaleString(),

            emp_no:'',
            full_name:'',
            date_of_birth:'',
            gender:"NONE",
            address: '',
            marital_status: 'NONE',
            spouse_name:'',
            city:'',
            zip_code:'',
            home_phone:'',
            phone:'',
            department:'NONE',
            designation: 'NONE',
            service_location:'',
            bank_name:'',
            bank_branch:'',
            bank_account_holder_name:'',
            bank_account_number:'',
            basic_salary:'',
            system_access:'NONE',
            joined_date:'',

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
        // if(this.state.marital_status == "Yes"){
        //     console.log("yes bn");
        // }
        // else{
        //     console.log("no");
        // } 

        var data = {
            emp_no:this.state.emp_no,
            full_name:this.state.full_name,
            date_of_birth:this.state.date_of_birth,
            gender:this.state.gender,
            address: this.state.address,
            marital_status: this.state.marital_status,
            spouse_name:this.state.spouse_name,
            city:this.state.city,
            zip_code:this.state.zip_code,
            home_phone:this.state.home_phone,
            phone:this.state.phone,
            department:this.state.department,
            designation: this.state.designation,
            service_location:this.state.service_location,
            bank_name:this.state.bank_name,
            bank_branch:this.state.bank_branch,
            bank_account_holder_name:this.state.bank_account_holder_name,
            bank_account_number:this.state.bank_account_number,
            basic_salary:this.state.basic_salary,
            system_access:this.state.system_access,
            joined_date:this.state.curTime,
        }

        console.log("emploooooooo", data);

        const result = await Employee_CONTROLLER.addEmployee(data, this.props.auth.token);

        // if(result.status == 201){
        //     CONFIG.setToast("Successfully Added");
        //     this.clear();
        // }
    }

    clear = () =>{
        this.setState({
            emp_no:'',
            full_name:'',
            date_of_birth:'',
            gender:"NONE",
            address: '',
            marital_status: 'NONE',
            spouse_name:'',
            city:'',
            zip_code:'',
            home_phone:'',
            phone:'',
            department:'NONE',
            designation: 'NONE',
            service_location:'',
            bank_name:'',
            bank_branch:'',
            bank_account_holder_name:'',
            bank_account_number:'',
            basic_salary:'',
            system_access:'NONE',
            joined_date:'',
        })

       this.change_toggle();
    }

    render() {
        return (
            <div>
                {/* Title and the add new customer button */}
                <div className="row" style={{marginTop:"5px", fontFamily:"sans-serif", marginBottom:"15px"}}>
                        <div className="col-sm-9">
                            <div className="row">
                                <div className="col-sm">
                                    <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Employee Details<br></br>
                                    <span className="text-muted small">Dashboard / Employees</span></h6>
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
                                        <ReactToPrint
                                            trigger={() => {
                                                return <Image src="/images/bank.png" className="d-none d-lg-block" style={{width:"40px", marginTop:"10px", marginLeft:"10px", cursor:"pointer"}} rounded />;
                                            }}
                                            content={() => this.componentRef2}
                                        />
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <Button variant="" style={{backgroundColor:"#475466" , color:"#FFFFFF", width:"100%",  cursor: 'pointer'}} onClick={() => this.change_toggle()}>Add new Employee</Button>
                        </div>
                    </div>

                    {/* Add customer form toggle */}
                    <div className="row" style={{ display: this.state.addEmployeeState == true ? 'block' : 'none', marginBottom:"15px" }}>
                        <div className="col-12">
                            <Card className="col-12 shadow">
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
                                                                        value={this.state.full_name}
                                                                        name="full_name"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Employee No"}
                                                                        placeholder={"Enter Employee's Number"}
                                                                        value={this.state.emp_no}
                                                                        name="emp_no"
                                                                        // readOnly
                                                                        onChange={this.formValueChange} 
                                                                    />
                                                                </div>
                                                        </div>
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormSelect 
                                                                        label={'Gender *'}
                                                                        options={GENDER}
                                                                        value={this.state.gender}
                                                                        name="gender"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Date of Birth *"}
                                                                        value={this.state.date_of_birth}
                                                                        type="Date"
                                                                        name="date_of_birth"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                </div>
                                                        </div>
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormSelect 
                                                                        label={'Marital Status *'}
                                                                        placeholder={"Enter Employee's Marital Status"}
                                                                        options={marital_status}
                                                                        value={this.state.marital_status}
                                                                        name="marital_status"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'Spouse Name *'}
                                                                        placeholder={"Enter Employee's Spouse Name"}
                                                                        value={this.state.spouse_name}
                                                                        name="spouse_name"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                </div>
                                                        </div>

                                                        <div className="row">
                                                                <div className="col-sm-12 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Address *"}
                                                                        placeholder={"Enter Employee's Addres"}
                                                                        value={this.state.address}
                                                                        name="address"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                </div>
                                                        </div>
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'City *'}
                                                                        placeholder={"Enter Employee's City"}
                                                                        value={this.state.city}
                                                                        name="city"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Zip Code *"}
                                                                        placeholder={"Enter Employee's Zip code"}
                                                                        value={this.state.zip_code}
                                                                        name="zip_code"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                </div>
                                                        </div>
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Mobile Number *"}
                                                                        placeholder={"Enter Employee's Mobile No"}
                                                                        value={this.state.phone}
                                                                        name="phone"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Land Number *"}
                                                                        placeholder={"Enter Employee's Land No"}
                                                                        value={this.state.home_phone}
                                                                        name="home_phone"
                                                                        onChange={this.formValueChange}
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
                                                                        options={DEPARTMENTS}
                                                                        value={this.state.department}
                                                                        name="department"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormSelect 
                                                                        label={"Designation *"}
                                                                        placeholder={"Enter Designation"}
                                                                        options={DESIGNATIONS}
                                                                        value={this.state.designation}
                                                                        name="designation"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                </div>
                                                        </div>
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Service Location *"}
                                                                        placeholder={"Enter Service Location"}
                                                                        value={this.state.service_location}
                                                                        name="service_location"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormSelect 
                                                                        label={"System Access *"}
                                                                        placeholder={"Enter Service Location"}
                                                                        options={SYSTEM_ACCESS}
                                                                        value={this.state.system_access}
                                                                        name="system_access"
                                                                        onChange={this.formValueChange}
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
                                                                    value={this.state.basic_salary}
                                                                    name="basic_salary"
                                                                    onChange={this.formValueChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={"Bank Name *"}
                                                                    placeholder={"Enter Employee's Bank Name"}
                                                                    value={this.state.bank_name}
                                                                    name="bank_name"
                                                                    onChange={this.formValueChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={"Bank Branch *"}
                                                                    placeholder={"Enter Employee's Bank Branch"}
                                                                    value={this.state.bank_branch}
                                                                    name="bank_branch"
                                                                    onChange={this.formValueChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={"Bank Account Holder *"}
                                                                    placeholder={"Enter Bank Account Holder Name"}
                                                                    value={this.state.bank_account_holder_name}
                                                                    name="bank_account_holder_name"
                                                                    onChange={this.formValueChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={"Bank Account Number *"}
                                                                    placeholder={"Enter Bank Account Number"}
                                                                    value={this.state.bank_account_number}
                                                                    name="bank_account_number"
                                                                    onChange={this.formValueChange}
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

                    {/* print all suppliers */}
                    <div className="row" style={{ display: this.state.printSupplierState == true ? 'block' : 'none', marginBottom:"15px" }}>
                    <ComponentToPrint
                        proid={this.props.auth.token}
                        HRname = {this.props.auth.user.user_details.username}
                        ref={el => (this.componentRef = el)} />
                    </div>
                    {/* print all suppliers */}
                    <div className="row" style={{ display: this.state.printSupplierState2 == true ? 'block' : 'none', marginBottom:"15px" }}>
                    <ComponentToPrint2
                        proid={this.props.auth.token}
                        HRname = {this.props.auth.user.user_details.username}
                        ref={el => (this.componentRef2 = el)} />
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