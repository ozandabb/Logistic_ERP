import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Tab , Row , Col, Nav , Card , InputGroup , FormControl, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import ScrollArea from 'react-scrollbar'
import moment from 'moment';
import Employee_CONTROLLER from '../../../../Controllers/HR Staff/Employee.controller';

import DetailsEachEmployeeCom from './DetailsEachEmployee.Com'

class DisplayEmployeeCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addCustomerState: false,
            searchState: false, 

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

            employeeList: [],
            search: '',
            oneCusID: '',
            EmployeeByID : [],
            UserByUsername: [],

        };
    }

    async componentDidMount() {
        const res = await Employee_CONTROLLER.getAllEmployee(this.props.auth.token);
        console.log("methnata ", res.data.rows);
        this.setState({
            employeeList: res.data.rows,
        });
    }

    //Search input text
    onChange = e =>{
        this.setState({search : e.target.value });
    }

    //Function for search icon to toggle 
    change_search_toggle = () => {
        if (this.state.searchState) {
            this.setState({ searchState: false })
        } else {
            this.setState({ searchState: true })
        }
    }

    //Get customer by t_code - function
    loadEmployeeData = async (id) => {
        const res = await Employee_CONTROLLER.getOneEmpoyeByID(id,this.props.auth.token);
        console.log("user table eke ewa",res.data.data );
        if(res.status == 200 ){
            this.setState({
                EmployeeByID: res.data.data,
            });
        }

    }


    //Clear all input details
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

    }

    render() {
        const {employeeList , UserByUsername, EmployeeByID , oneCusID} = this.state;
        return (
            <div>

                {/* Customer details display here with the tab view */}
                <Tab.Container id="left-tabs-example">
                    <Row>

                        <Col sm={9}>
                            <Card >
                                {/* Each customer tab section DetailsEachCus.Com.js  */}
                                <DetailsEachEmployeeCom
                                    Emp_id={EmployeeByID.id}
                                    Emp_no={EmployeeByID.emp_no}
                                    Emp_fullname={EmployeeByID.full_name}
                                    Emp_dob={EmployeeByID.date_of_birth}
                                    Emp_gender={EmployeeByID.gender}
                                    Emp_address={EmployeeByID.address}
                                    Emp_marital={EmployeeByID.marital_status}
                                    Emp_spouse={EmployeeByID.spouse_name}
                                    Emp_city={EmployeeByID.city}
                                    Emp_zip={EmployeeByID.zip_code}
                                    Emp_homePhone={EmployeeByID.home_phone}
                                    Emp_phone={EmployeeByID.phone}
                                    Emp_dept={EmployeeByID.department}
                                    Emp_desig={EmployeeByID.designation}
                                    cus_ser_locat={EmployeeByID.service_location}
                                    Emp_bankName={EmployeeByID.bank_name}
                                    Emp_branch_name={EmployeeByID.bank_branch}
                                    Emp_holder_name={EmployeeByID.bank_account_holder_name}
                                    Emp_accout_number={EmployeeByID.bank_account_number}
                                    Emp_salary={EmployeeByID.basic_salary}
                                    Emp_sys_access={EmployeeByID.system_access}
                
                                />
                            </Card>
                        </Col>

                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column bg-white">
                                <Card>
                                <Nav.Item>
                                    <Row>
                                        <Col xs={12} md={8}>
                                            <h6 style={{display: this.state.searchState == false ? 'block' : 'none' ,paddingBottom:"15px", paddingTop:"19px", paddingLeft:"15px", paddingRight:"15px", color:"#475466", fontFamily:"Roboto, sans-serif"}}>Employees</h6>
                                            <div className="col" style={{ display: this.state.searchState == true ? 'block' : 'none' , paddingTop:"15px"}}>
                                                <InputGroup className="mb-3" >
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
                                        <Col md="auto"  style={{paddingTop:"15px"}}>
                                            <FontAwesomeIcon onClick={() => this.change_search_toggle()}  icon={faSearch} style={{cursor: 'pointer', alignContent:"flex-end", alignItems:"flex-end"}} />
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
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>{item.emp_no} -{item.department}</p></div>
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466",  marginBottom:"0px"}}> </p></div>
                </div>
                <p style={{fontSize:"18px", color:"#18A0FB",fontFamily:"sans-serif", marginBottom:"0px"}}>{item.full_name}</p>
                <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginTop:"0px",  marginBottom:"0px"}}> {item.address}</p>
                <hr></hr>
            </div>
        );
    } 
    



















}


const mapStateToProps = state => ({
    auth: state.auth || {},
  });
 
  
export default connect(mapStateToProps, null)(withRouter(DisplayEmployeeCom));