import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faRedo , faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import {FormInput  } from '../../../../Components/Form'
import { Tab , Row , Col, Nav , Card , InputGroup , FormControl, Image, OverlayTrigger, Tooltip , Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import ScrollArea from 'react-scrollbar'
import moment from 'moment';
import CUST_CONTROLLER from '../../../../Controllers/HR Staff/Customer.controller';
import CONFIG from '../../../../Controllers/Config.controller';
import QRCODE from './QRcode';
import QRCode from "react-qr-code";
import ReactToPrint from 'react-to-print';

class DisplatCustomerCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addCustomerState: false,
            searchState: false, 
            QRCodeState: false, 
            printQRState: false,

            id:'',
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

            t_code:'',
            user_id:'',

            error : true , 
            // error_message : '',

            customerList: [],
            search: '',

        };
    }

    async componentDidMount() {
       this.loadAllCustomers();
       this.refreshList();
    }

    //REFRESH all Customers
    refreshList = () => {
        this.loadAllCustomers();
    }

    //GET all Customers
    loadAllCustomers = async () => {
        const res = await CUST_CONTROLLER.getAllCustomer(this.props.auth.token);
        console.log("alll cus", res);
        this.setState({
            customerList: res.data.rows,
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

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }

    //toggle for QR code
    change_qrcode_toggle = () => {
        if (this.state.QRCodeState) {
            this.setState({ QRCodeState: false })
        } else {
            this.setState({ QRCodeState: true })
        }
    }

    //Get customer by t_code - function
    loadData = async (t_code, username) => {
        const res = await CUST_CONTROLLER.getOneCustByTCODE(t_code,this.props.auth.token);
        const res2 = await CUST_CONTROLLER.getOneUserByUSERNAME(username,this.props.auth.token);
        console.log("user",res2.data.data );
        console.log("custmoer" , res.data.data.id);

        // this.change_qrcode_toggle();
        if(res.status === 200 ){
            this.setState({
                error:false,
                id: res.data.data.user_id,
                address: res.data.data.address,
                city: res.data.data.city,
                dob: res.data.data.dob,
                lat: res.data.data.lat,
                long: res.data.data.long,
                name: res.data.data.name,
                postal_code: res.data.data.postal_code,
                t_code: res.data.data.t_code,
                user_id: res.data.data.user_id,
            });
        }
        if(res2.status === 200){
            this.setState({
                email: res2.data.data.email,
                nic: res2.data.data.nic,
                phone: res2.data.data.phone,
                username: res2.data.data.username,
            });
        }
    }

    //Update form submit
    onFormSubmit = async (e) => {
        e.preventDefault();

        if(this.state.id == ''){
            CONFIG.setErrorToast("Please Select a Customer to Update!");
        }else{
            var data = {
                id: this.state.id,
                city: this.state.city,
                address: this.state.address,
                name: this.state.name,
                signature: this.state.signature,
                dob: this.state.dob,
                postal_code: this.state.postal_code,
                // t_code: this.state.t_code,
                // user_id: this.state.user_id,
                // username: this.state.username,
                lat: this.state.lat,
                long: this.state.long,
            }

            const result = await CUST_CONTROLLER.UpdateCustomer( data ,this.props.auth.token );

            console.log("cussssssssssssssss", data.id);

            if(result.status == 200){
                CONFIG.setToast("Successfully Updated!");
                this.clear();
                this.loadAllSuppliers();
            }
            else{
                CONFIG.setErrorToast("Somthing Went Wrong!");
                this.clear();
            }
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
        const {customerList , username, nic , email, phone, credit_limit, city, address, name, lat, long, dob, postal_code, t_code, user_id , id} = this.state;
        return (
            <div>

                {/* Customer details display here with the tab view */}
                <Tab.Container id="left-tabs-example">
                    <Row>

                        <Col sm={9}>
                            <Card className="shadow" >
                            <nav>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Basic Information</a>
                                    <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">QR Code</a>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">

                                {/* basic information tab start here */}
                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <form onSubmit={(e) => this.onFormSubmit(e)} >

                                    <div className="row ml-3 mt-1">
                                        <div className="col-sm-8">
                                            <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Update {name} Details<br></br>
                                            <span className="text-muted small">You can Update or Delete each Customer</span></h6>

                                            <div className="row">
                                                <div className="col-md-6 mt-1 mb-1" >
                                                    <FormInput 
                                                        label={'Customer Name *'}
                                                        placeholder={"Select one Customer"}
                                                        value={name}
                                                        name="name"
                                                        onChange={this.formValueChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 mt-1 mb-1" >
                                                    <FormInput 
                                                        label={"Username *"}
                                                        placeholder={"Select one Customer"}
                                                        value={username}
                                                        name="username"
                                                        onChange={this.formValueChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mt-1 mb-1" >
                                                    <FormInput 
                                                        label={'Email *'}
                                                        placeholder={"Select one Customer"}
                                                        value={email}
                                                        name="email"
                                                        onChange={this.formValueChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 mt-1 mb-1" >
                                                    <FormInput 
                                                        label={"NIC *"}
                                                        placeholder={"Select one Customer"}
                                                        value={nic}
                                                        name="nic"
                                                        onChange={this.formValueChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6  mt-1 mb-1" >
                                                    <FormInput 
                                                        label={"Contact Number *"}
                                                        placeholder={"Select one Customer"}
                                                        value={phone}
                                                        name="phone"
                                                        onChange={this.formValueChange}
                                                    />
                                                </div>
                                                <div className="col-md-6  mt-1 mb-1" >
                                                    <FormInput 
                                                        label={"Date of Birth *"}
                                                        value={dob}
                                                        placeholder={"Select one Customer"}
                                                        name="dob"
                                                        onChange={this.formValueChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 mt-1 mb-1" >
                                                    <FormInput 
                                                        label={"Address *"}
                                                        placeholder={"Select one Customer"}
                                                        value={address}
                                                        name="address"
                                                        onChange={this.formValueChange}
                                                    />
                                                </div> 
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mt-1 mb-1" >
                                                    <FormInput 
                                                        label={"Postal Code *"}
                                                        placeholder={"Select one Customer"}
                                                        value={postal_code}
                                                        name="postal_code"
                                                        onChange={this.formValueChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 mt-1 mb-1" >
                                                    <FormInput 
                                                        label={'City *'}
                                                        placeholder={"Select one Customer"}
                                                        value={city}
                                                        name="city"
                                                        onChange={this.formValueChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"Credit Limit *"}
                                                            placeholder={"Select one Customer"}
                                                            value={credit_limit}
                                                            name="credit_limit"
                                                            onChange={this.formValueChange}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"T Code *"}
                                                            placeholder={"Select one Customer"}
                                                            value={t_code}
                                                            readOnly
                                                            name="credit_limit"
                                                        />
                                                    </div>
                                            </div>
                                            <div className="row">
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"User ID *"}
                                                            placeholder={"Select one Customer"}
                                                            value={user_id}
                                                            name="user_id"
                                                            readOnly
                                                        />
                                                    </div>
                                            </div>
                                            
                                        </div>
                                        <div className="col-sm-4">
                                            <Image src="/images/isaiah_1.jpg" className="img-fluid" style={{ padding:"20px"}} roundedCircle />
                                        
                                            <div className="row">
                                                <div className="col-sm">
                                                    <div className="col-12 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"Latitude *"}
                                                            placeholder={"Select one Customer"}
                                                            value={lat}
                                                            name="lat"
                                                            //onChange={this.formValueChange}
                                                        />
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div className="row">
                                                <div className="col-sm">
                                                    <div className="col-12 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"Longitude *"}
                                                            placeholder={"Select one Customer"}
                                                            value={long}
                                                            name="long"
                                                            //onChange={this.formValueChange}
                                                        />
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row ml-3 mt-1">
                                        <div className="col-6 mt-3 mb-5" >
                                            <button type="submit" style={{backgroundColor:"#475466" , color:"#FFFFFF",  cursor: 'pointer'}} className="btn mt-2 btn btn-sm px-5">Update</button>
                                            <Button onClick={() => this.onClickDelete(id)}  style={{backgroundColor:"red",marginLeft:"10px", color:"#FFFFFF", cursor: 'pointer'}}  className="btn mt-2 btn btn-sm px-5">Delete</Button>
                                        </div>
                                    </div>
                                </form>
                                </div>
                                
                                {/* QR CODE tab start here */}
                                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"> 

                                    <div className ="row ml-3 mt-1">
                                        <div className="col-sm">
                                            <h6 className="text-header py-3 font-weight-bold line-hight-1">Generate {name} QR Code<br></br>
                                            <span className="text-muted small">You can Generate the QR Code by selecting a Customer</span></h6>
                                        </div>
                                    </div>
                                    

                                    {/* ------------------------------ error message-------------------------- */}
                                    {  this.state.error && 
                                    <div className=" shadow-sm rounded bg-white mb-3 pt-2 pb-3" style={{marginLeft:"20px", marginRight:"20px", marginTop:"0px"}} >
                                        <h6 className="text-header text-warning pt-2 pb-2 ml-4 font-weight-bold line-hight-1">
                                            <FontAwesomeIcon icon={faExclamationTriangle}  className="mr-2"/>Conflict Found !
                                        </h6>
                                        <h6 className="text-header mb-0 ml-4 line-hight-1">
                                        <span className="text-muted small font-weight-bold">Please Select a Customer to Generate the QR Code</span></h6>
                                    </div>
                                    } 

                                    <div className="row">
                                        <div className="col-sm ml-4 mt-3 mb-4" >
                                            <div className="row">
                                                <div class="col-sm">
                                                    <div className="row">
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={'Customer Name *'}
                                                                placeholder={"Select one Customer"}
                                                                value={name}
                                                                name="name"
                                                                //onChange={this.formValueChange}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Username *"}
                                                                placeholder={"Select one Customer"}
                                                                value={username}
                                                                name="username"
                                                                //onChange={this.formValueChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Address *"}
                                                                placeholder={"Select one Customer"}
                                                                value={address}
                                                                name="address"
                                                                //onChange={this.formValueChange}
                                                            />
                                                        </div> 
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={'Email *'}
                                                                placeholder={"Select one Customer"}
                                                                value={email}
                                                                name="email"
                                                                //onChange={this.formValueChange}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"NIC *"}
                                                                placeholder={"Select one Customer"}
                                                                value={nic}
                                                                name="nic"
                                                                //onChange={this.formValueChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Credit Limit *"}
                                                                placeholder={"Select one Customer"}
                                                                value={credit_limit}
                                                                name="credit_limit"
                                                                //onChange={this.formValueChange}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"T Code *"}
                                                                placeholder={"Select one Customer"}
                                                                value={t_code}
                                                                readOnly
                                                                name="credit_limit"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 mt-4 mb-1" >
                                                            <ReactToPrint
                                                                trigger={() => {
                                                                    return <button type="submit" style={{ color:"#FFFFFF",  cursor: 'pointer', justifyItems:"center"}} className="btn mt-2 btn-success btn-sm px-5">Print</button>;
                                                                }}
                                                                content={() => this.componentRef}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm ml-5 mt-4" >
                                                    <QRCode value={t_code} />
                                                </div>
                                            </div>
                                           
                                           
                                        </div>
                                    </div>

                                </div>

                                
                                     {/* print all suppliers */}
                                    <div className="row" style={{ display: this.state.printQRState == true ? 'block' : 'none', marginBottom:"15px" }}>
                                        <QRCODE
                                        tcode={t_code} 
                                        cusNmae = {name}
                                        ref={el => (this.componentRef = el)}/>
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
                                            <h6 style={{display: this.state.searchState == false ? 'block' : 'none' , paddingTop:"22px", paddingLeft:"15px", paddingRight:"15px", color:"#FFFFFF", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>All Customers</h6>
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
                                        {customerList && customerList.map((name) => this.renderOneCustomer(name))}
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
        if( search !== "" && item.name.toLowerCase().indexOf(search.toLowerCase()) === -1 && item.t_code.indexOf(search.toLowerCase()) === -1){
        return null;
        }

        return(
            <div className="row" key={item.id} onClick={() => this.loadData(item.t_code, item.username)}>
                <div className="col-sm-4">
                    <Image src="/images/isaiah_1.jpg" className="d-none d-lg-block" style={{width:"50px", marginLeft:"10px"}} rounded />
                </div>
                <div className="col-sm-8">
                    <div className="row">
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>{item.city}</p></div>
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466",  marginBottom:"0px"}}> {moment(new Date(item.createdAt)).format("YYYY MMM DD")}</p></div>
                    </div>
                    <p style={{fontSize:"14px", color:"#18A0FB",fontFamily:"sans-serif"}}>{item.name}</p>
                    <hr></hr>
                </div>
            </div>
        );
    } 












}


const mapStateToProps = state => ({
    auth: state.auth || {},
  });
 
  
export default connect(mapStateToProps, null)(withRouter(DisplatCustomerCom));