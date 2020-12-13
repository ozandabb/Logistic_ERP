import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch , faRedo} from '@fortawesome/free-solid-svg-icons'
import { Tab , Row , Col, Nav , Card , InputGroup , FormControl, Image , OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import ScrollArea from 'react-scrollbar'
import moment from 'moment';
import {FormInput  } from '../../../../Components/Form'
import Employee_CONTROLLER from '../../../../Controllers/HR Staff/Employee.controller';
import Spinner from "react-bootstrap/Spinner";

class DisplayEmployeeCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addCustomerState: false,
            searchState: false, 

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

            errors : {},
            isLoading: '',

            employeeList: [],
            search: '',

        };
    }

    async componentDidMount() {
       this.loadAllEmployee();
       this.refreshList();
    }

    //REFRESH All Employee list
    refreshList = () => {
        this.loadAllEmployee();
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }

    //SEARCH input text
    onChange = e =>{
        this.setState({search : e.target.value });
    }

    //GET all supplliers
    loadAllEmployee = async () => {
        this.setState({
            isLoading : true,
        })
        const res = await Employee_CONTROLLER.getAllEmployee(this.props.auth.token);
        this.setState({
            isLoading : false,
            employeeList: res.data.rows,
        });
    }

    //Function for search icon to toggle 
    change_search_toggle = () => {
        if (this.state.searchState) {
            this.setState({ searchState: false })
        } else {
            this.setState({ searchState: true })
        }
    }

    //Get Employee by ID - function
    loadEmployeeData = async (id) => {
        const resSup = await Employee_CONTROLLER.getOneEmpoyeByID(id,this.props.auth.token);
        console.log("user table eke ewa",resSup.data.data );
        if(resSup.status == 200 ){
            this.setState({
                errors : {},
                // id: resSup.data.data.id,
                emp_no:resSup.data.data.emp_no,
                full_name:resSup.data.data.full_name,
                date_of_birth:resSup.data.data.date_of_birth,
                gender:resSup.data.data.gender,
                address:resSup.data.data.address,
                marital_status: resSup.data.data.marital_status,
                spouse_name:resSup.data.data.spouse_name,
                city:resSup.data.data.city,
                zip_code:resSup.data.data.zip_code,
                home_phone:resSup.data.data.home_phone,
                phone:resSup.data.data.phone,
                department:resSup.data.data.department,
                designation: resSup.data.data.designation,
                service_location:resSup.data.data.service_location,
                bank_name:resSup.data.data.bank_name,
                bank_branch:resSup.data.data.bank_branch,
                bank_account_holder_name:resSup.data.data.bank_account_holder_name,
                bank_account_number:resSup.data.data.bank_account_number,
                basic_salary:resSup.data.data.basic_salary,
                system_access:resSup.data.data.system_access,
            });
        }

    }

    render() {
        const {employeeList ,emp_no,full_name,date_of_birth,errors, gender, address , marital_status,spouse_name, city,
            zip_code, home_phone, phone, department,designation,service_location,bank_name,bank_branch,bank_account_holder_name,
            bank_account_number,basic_salary,system_access,joined_date} = this.state;
        return (
            <div>

                {/* Customer details display here with the tab view */}
                <Tab.Container id="left-tabs-example">
                    <Row>

                        <Col sm={9}>
                            <Card className="shadow">
                                <nav>
                                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                        <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Basic Information</a>
                                        <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Payment History</a>
                                        <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Statistics</a>
                                    </div>
                                </nav>
                                <div class="tab-content" id="nav-tabContent">
                                    {/* basic information tab start here */}
                                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                        <div className="row ml-3 mt-1">
                                            <div className="col-sm-12">
                                                <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Update {this.props.Emp_fullname} Details<br></br>
                                                <span className="text-muted small">You can Update or Delete each Customer</span></h6>
                                            </div></div>
                                        <div className="row ml-3 mt-1">
                                            <div className="col-sm-8">
                                            

                                                <div className="row">
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={'Employee Name *'}
                                                            placeholder={"Select one Employee"}
                                                            value={full_name}
                                                            name="full_name"
                                                            onChange={this.formValueChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"Employee Number *"}
                                                            placeholder={"Select one Employee"}
                                                            value={emp_no}
                                                            name="emp_no"
                                                            onChange={this.formValueChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={'Gender *'}
                                                            placeholder={"Select one Employee"}
                                                            value={gender}
                                                            name="gender"
                                                            onChange={this.formValueChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"Date of Birth *"}
                                                            value={date_of_birth}
                                                            placeholder={"Select one Employee"}
                                                            name="nic"
                                                            onChange={this.formValueChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6  mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"Marital Status  *"}
                                                            value={marital_status}
                                                            placeholder={"Select one Employee"}
                                                            name="marital_status"
                                                            onChange={this.formValueChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-6  mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"Spouse Name  *"}
                                                            placeholder={"Select one Employee"}
                                                            value={spouse_name}
                                                            name="spouse_name"
                                                            onChange={this.formValueChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"Address *"}
                                                            value={address}
                                                            placeholder={"Select one Employee"}
                                                            name="address"
                                                            onChange={this.formValueChange}
                                                        />
                                                    </div> 
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"City *"}
                                                            value={city}
                                                            placeholder={"Select one Employee"}
                                                            name="city"
                                                            onChange={this.formValueChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={'Zip Code *'}
                                                            placeholder={"Select one Employee"}
                                                            value={zip_code}
                                                            name="zip_code"
                                                            onChange={this.formValueChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"Mobile Number *"}
                                                            placeholder={"Select one Employee"}
                                                            value={phone}
                                                            name="phone"
                                                            onChange={this.formValueChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={'Land Number *'}
                                                            placeholder={"Select one Employee"}
                                                            value={home_phone}
                                                            name="home_phone"
                                                            onChange={this.formValueChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"Department *"}
                                                            value={department}
                                                            placeholder={"Select one Employee"}
                                                            name="department"
                                                            onChange={this.formValueChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={'Designation *'}
                                                            value={designation}
                                                            placeholder={"Select one Employee"}
                                                            name="designation"
                                                            onChange={this.formValueChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"Service Location *"}
                                                            value={service_location}
                                                            placeholder={"Select one Employee"}
                                                            name="service_location"
                                                            onChange={this.formValueChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={'System Access *'}
                                                            placeholder={"Select one Employee"}
                                                            value={system_access}
                                                            name="system_access"
                                                            onChange={this.formValueChange}
                                                        />
                                                    </div>
                                                </div>
                                            
                                                
                                            </div>
                                            <div className="col-sm-4">
                                            
                                                <div className="row">
                                                    <div className="col-sm">
                                                        <div className="col-12 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Basic Salary *"}
                                                                value={basic_salary}
                                                                placeholder={"Select one Employee"}
                                                                name="basic_salary"
                                                                onChange={this.formValueChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm">
                                                        <div className="col-12 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Bank Name *"}
                                                                value={bank_name}
                                                                placeholder={"Select one Employee"}
                                                                name="bank_name"
                                                                onChange={this.formValueChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm">
                                                        <div className="col-12 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Branch Name *"}
                                                                value={bank_branch}
                                                                placeholder={"Select one Employee"}
                                                                name="bank_branch"
                                                                onChange={this.formValueChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm">
                                                        <div className="col-12 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Account Holder *"}
                                                                value={bank_account_holder_name}
                                                                placeholder={"Select one Employee"}
                                                                name="bank_account_holder_name"
                                                                onChange={this.formValueChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm">
                                                        <div className="col-12 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Account Number *"}
                                                                value={bank_account_number}
                                                                placeholder={"Select one Employee"}
                                                                name="bank_account_number"
                                                                onChange={this.formValueChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            
                                            </div>

                                        </div>
                                        <div className="row ml-3 mt-1">
                                            <div className="col-6 mt-3 mb-5" >
                                                <button type="submit" style={{backgroundColor:"#475466" , color:"#FFFFFF",  cursor: 'pointer'}} className="btn mt-2 btn btn-sm px-5">Update</button>
                                                <button type="submit" style={{backgroundColor:"red",marginLeft:"10px", color:"#FFFFFF", cursor: 'pointer'}}  className="btn mt-2 btn btn-sm px-5">Delete</button>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"> 
                                        fff
                                    </div>
                                    <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                        ff
                                    </div>
                                </div>
                            </Card>
                        </Col>

                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column bg-white shadow">
                                <Card>
                                <Nav.Item style={{backgroundColor:"#475466", height:"65px"}}>
                                    <Row>
                                        <Col xs={12} md={8}>
                                            <h6 style={{display: this.state.searchState == false ? 'block' : 'none' , paddingTop:"22px", paddingLeft:"15px", paddingRight:"15px", color:"#FFFFFF", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>All Employees</h6>
                                            <div className="col" style={{ display: this.state.searchState == true ? 'block' : 'none' , paddingTop:"15px"}}>
                                                <InputGroup className="" >
                                                    <FormControl
                                                    style={{height:"30px"}}
                                                    aria-label="Username"
                                                    placeholder="Search"
                                                    onChange={ this.onChange}
                                                    aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                            </div>
                                        </Col>
                                        {/* <Col xs={6} md={4}> */}
                                        <Col md="auto"  style={{paddingTop:"20px", paddingBottom:"8px"}}>
                                            <div className="row">
                                            <FontAwesomeIcon onClick={() => this.change_search_toggle()}  icon={faSearch} style={{cursor: 'pointer', color:"#FFFFFF", marginLeft:"5px", alignContent:"flex-end", alignItems:"flex-end"}} />
                                                {['bottom'].map((placement) => (
                                                    <OverlayTrigger
                                                        key={placement}
                                                        placement={placement}
                                                        overlay={
                                                            <Tooltip id={`tooltip-${placement}`}>
                                                                Refresh List
                                                        </Tooltip>
                                                        }
                                                    >
                                                    <FontAwesomeIcon  onClick={() => this.refreshList()} icon={faRedo} style={{cursor: 'pointer', color:"#FFFFFF", marginLeft:"15px", alignContent:"flex-end", alignItems:"flex-end"}} />
                                                    </OverlayTrigger>
                                                ))}
                                            </div>
                                        </Col>
                                    </Row>
                                </Nav.Item>
                                
                                <Nav.Item  >
                                    <Nav.Link >
                                        <ScrollArea
                                        speed={1}
                                        className="area"
                                        style={{height:"600px"}}
                                        contentClassName="content"
                                        horizontal={false}
                                        >
                                        {employeeList && employeeList.map((name) => this.renderOneCustomer(name))}
                                        <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto', alignContent:'center'}}>
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>
                                        </ScrollArea>
                                    </Nav.Link>
                                </Nav.Item>
                                </Card>
                            </Nav>
                        </Col>

                    </Row>

                </Tab.Container>
                
            </div>
        );
    }

    renderOneCustomer = (item, i) => {
        const { search } = this.state;
        if( search !== "" && item.full_name.toLowerCase().indexOf(search.toLowerCase()) === -1 && item.emp_no.indexOf(search.toLowerCase()) === -1){
        return null;
        }

        return(
            <div key={item.id} onClick={() => this.loadEmployeeData(item.id)}>
                <div className="row">
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>EMP ID : {item.id} </p></div>
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466",  marginBottom:"0px"}}> </p></div>
                </div>
                <p style={{fontSize:"18px", color:"#18A0FB",fontFamily:"sans-serif", marginBottom:"0px"}}>{item.full_name}</p>
                <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginTop:"0px",  marginBottom:"0px"}}> {item.address}</p>
                <hr></hr>
            </div>
        );
    } 
    


    validate = () => {
        let { errors, name } = this.state;
        let count = 0;

        if (name.length === 0) {
            errors.name =  'Please select a Supplier'
            count++
        } else {
            errors.name = ''
        }

        this.setState({ errors });
        return count == 0;
    }

















}

const mapStateToProps = state => ({
    auth: state.auth || {},
});
 
  
export default connect(mapStateToProps, null)(withRouter(DisplayEmployeeCom));