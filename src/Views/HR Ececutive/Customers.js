import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import HRSidebar from "./HRSidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {FormInput , FormSelect , MultiFormSelect} from '../../Components/Form'
import { Tab , Row , Col, Nav , Button, Card , InputGroup , FormControl, Form, Image, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import CONFIG from '../../Controllers/Config.controller';
import moment from 'moment';

import CUST_CONTROLLER from '../../Controllers/HR.controller';

class Customers extends Component {
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

            customerList: [],
            search: '',
            oneCusID: '',
            CustByTCODE : [],


        };
    }

    async componentDidMount() {
        const res = await CUST_CONTROLLER.getAllCustomer(this.props.auth.token);
        this.setState({
            customerList: res.data.rows,
        });
    }

    onChange = e =>{
        this.setState({search : e.target.value });
      }

    
    change_toggle = () => {
        if (this.state.addCustomerState) {
            this.setState({ addCustomerState: false })
        } else {
            this.setState({ addCustomerState: true })
        }
    }

    change_search_toggle = () => {
        if (this.state.searchState) {
            this.setState({ searchState: false })
        } else {
            this.setState({ searchState: true })
        }
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }

    loadData = async (t_code) => {
        const res = await CUST_CONTROLLER.getOneCustByTCODE(t_code,this.props.auth.token);
        if(res.status == 200 ){
            this.setState({
                CustByTCODE: res.data.data,
                oneCusID: res.data.name,
            });
        }

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

        if (this.state.addCustomerState) {
            this.setState({ addCustomerState: false })
        } else {
            this.setState({ addCustomerState: true })
        }
    }

    render() {

        const {customerList , CustByTCODE , oneCusID} = this.state;

    return (
        <div className="bg-light wd-wrapper">
            <HRSidebar activemenu={'CUSTOMERS'} />
            <div className="wrapper-wx" style={{height:"100hv"}}>
                <div className="container-fluid">

                    {/* Title and the add new customer button */}
                    <div className="row" style={{marginTop:"5px", fontFamily:"sans-serif", marginBottom:"15px"}}>
                        <div className="col-sm-9">
                            <h5>Customer Details</h5>
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
                                           
                                                <div className="row" >
                                                    <div class="col-sm-8">
                                                        <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Customer Details<br></br>
                                                        <span className="text-muted small">You can add a new customer by filling relavant Information</span></h6>
                                                        <div class="row">
                                                            <div class="col-sm">

                                                                <div className="col-12 mt-1 mb-1" >
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
                                                                <div className="col-12 mt-1 mb-1" >
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
                                                            <div class="col-sm">

                                                                <div className="col-12 mt-1 mb-1" >
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
                                                                <div className="col-12 mt-1 mb-1" >
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
                                                        </div>

                                                        <div className="row">
                                                            <div class="col-sm-12">
                                                                <div className="col-12 mt-1 mb-1" >
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
                                                        </div>
                                                        <div className="row">
                                                            <div class="col-sm">

                                                                <div className="col-12 mt-1 mb-1" >
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
                                                                <div className="col-12 mt-1 mb-1" >
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
                                                            <div class="col-sm">

                                                                <div className="col-12 mt-1 mb-1" >
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
                                                                <div className="col-12 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={"Date of Birth *"}
                                                                        //error={ errors.group_mo}
                                                                        //value={this.state.group_mo}
                                                                        type="Date"
                                                                        name="dob"
                                                                        //onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>

                                                            </div>
                                                        </div>
                                                        

                                                        
                                                    </div>
                                                    <div class="col-sm-4">
                                                        <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1" style={{color:"#ffffff"}}>Other Details<br></br>
                                                        <span className="text-color-light hide small" style={{color:"#ffffff"}}>Geopoint and the Credit Limit</span></h6>
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
                                                            <div class="col-sm">
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
                                                            <div class="col-sm">
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
                                                                <Form>
                                                                <Form.Group>
                                                                    <Form.File id="exampleFormControlFile1" label="Customer Profile Picture" />
                                                                </Form.Group>
                                                                </Form>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 mb-1" >
                                                                <Form>
                                                                <Form.Group>
                                                                    <Form.File id="exampleFormControlFile1" label="Customer Signature" />
                                                                </Form.Group>
                                                                </Form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row"> 
                                                    <div class="col-sm">
                                                        <div className="col-6 mt-3 mb-1" >
                                                        <button type="submit" style={{backgroundColor:"#475466" , color:"#FFFFFF",  cursor: 'pointer'}} className="btn mt-2 btn btn-sm px-5">Submit</button>
                                                        <button type="submit" style={{backgroundColor:"red",marginLeft:"10px", color:"#FFFFFF", cursor: 'pointer'}} onClick={() => this.clear()} className="btn mt-2 btn btn-sm px-5">Cancel</button>
                                                        </div>
                                                    </div>
                                                </div>

                                                
                                            </form>
                                        </div>

                                </Card.Body>
                            </Card>
                        </div>
                    </div>

                    {/* Customer details display here with the tab view */}
                    <Tab.Container id="left-tabs-example">
                        <Row>
                            <Col sm={9}>
                                <Card >
                                  
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
                                                <div className="col-sm-8">
                                                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Customer Details<br></br>
                                                    <span className="text-muted small">You can add a new customer by filling relavant Information</span></h6>
                                                </div>
                                                <div className="col-sm-4">
                                                    <Image src="/images/isaiah_1.jpg" className="img-fluid" style={{ padding:"20px"}} roundedCircle />
                                                </div>
                                            </div>
            
                                            {CustByTCODE.name}
                                        </div>
                                        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"> 
                                        
                                        </div>
                                        <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">

                                        </div>
                                    </div>
                                
                                    

                                </Card>
                            </Col>

                            <Col sm={3}>

                                <Nav variant="pills" className="flex-column bg-white">
                                    <Card>
                                    <Nav.Item>
                                        <Row>
                                            <Col xs={12} md={8}>
                                                <h6 style={{display: this.state.searchState == false ? 'block' : 'none' ,paddingBottom:"15px", paddingTop:"19px", paddingLeft:"15px", paddingRight:"15px", color:"#475466", fontFamily:"Roboto, sans-serif"}}>Customers</h6>
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
                                    
                                    <Nav.Item>
                                        <Nav.Link>
                                            {customerList && customerList.map((name) => this.renderOneCustomer(name))}
                                        </Nav.Link>
                                    </Nav.Item>
                                    </Card>
                                </Nav>
                            </Col>
                        </Row>
                    </Tab.Container>
 
                        
                </div>
            </div>
        </div>
    );
  }

    showEachCustomerDetails = (itemM) => {
        return(
            <div className="row" key={itemM.id}>
                <h1>{itemM.name}</h1>
            </div> 
              
        );
    }

    renderOneCustomer = (item, i) => {
        const { search } = this.state;
        if( search !== "" && item.name.toLowerCase().indexOf(search.toLowerCase()) === -1 && item.t_code.indexOf(search.toLowerCase()) === -1){
        return null;
        }

        return(
            <div className="row" key={item.id} onClick={() => this.loadData(item.t_code)}>
                <div className="col-sm-4">
                    <Image src="/images/isaiah_1.jpg" className="d-none d-lg-block" style={{width:"50px", marginLeft:"10px"}} rounded />
                </div>
                <div className="col-sm-8">
                    <div className="row">
                        <div className="col-sm"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>{item.city}</p></div>
                        <div className="col-sm"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466",  marginBottom:"0px"}}> {moment(new Date(item.createdAt)).format("YYYY MMM DD")}</p></div>
                    </div>
                    <h6>{item.name}</h6>
                    <hr></hr>
                </div>
            </div>
        );
    } 
    
   


















}

const cardstyle = "card border-0 shadow-sm rounded mt-3 bg-white py-3 d-flex flex-row"
const mapStateToProps = state => ({
    auth: state.auth || {},
  });
 
  
export default connect(mapStateToProps, null)(withRouter(Customers));