import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Tab , Row , Col, Nav , Card , InputGroup , FormControl, Image, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import ScrollArea from 'react-scrollbar'
import moment from 'moment';
import CONFIG from '../../../../Controllers/Config.controller';
import {FormInput  } from '../../../../Components/Form'
import SUPPLIER_CONTROLLER from '../../../../Controllers/HR Staff/Supplier.controller';

class DisplatSupplierCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchState: false, 

            id:'',
            name:'',
            address:'',
            phoneNo:'',
            email:'',

            supplierList: [],
            search: '',

        };
    }

    async componentDidMount() {
        this.loadAllSuppliers();
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

    //GET all supplliers
    loadAllSuppliers = async () => {
        const res = await SUPPLIER_CONTROLLER.getAllSuppliers(this.props.auth.token);
        this.setState({
            supplierList: res.data.rows,
        });
    }

    //Get supplier by ID - function
    loadSupplierData = async (id) => {
        const resSup = await SUPPLIER_CONTROLLER.getSupplierByID( id , this.props.auth.token );

        if( resSup.status == 200 ){
            this.setState({
                id: resSup.data.data.id,
                name: resSup.data.data.name,
                address: resSup.data.data.address,
                phoneNo: resSup.data.data.phoneNo,
                email: resSup.data.data.email,
            });
        }
    }

    //DELETE Fucntion
    onClickDelete = (id) => {
        CONFIG.setDeleteConfirmAlert(
            "",
            "Are you sure you want to delete this Supplier ?",
            () => this.clickDeleteSupplier(id),
            () => {}
        );
    };
    clickDeleteSupplier = async (id) => {
        const result = await SUPPLIER_CONTROLLER.DeleteSupplier( id , this.props.auth.token );

        if(result.status == 200){
            CONFIG.setToast("Successfully Deleted!");
            this.clear();
            this.loadAllSuppliers();
        }else{
            CONFIG.setErrorToast("Somthing Went Wrong!");
            this.clear();
        }
    };

    //Update form submit
    onFormSubmit = async (e) => {
        e.preventDefault();

        var data = {
            id: this.state.id,
            name: this.state.name,
            address: this.state.address,
            phoneNo: this.state.phoneNo,
            email: this.state.email,
        }

        const result = await SUPPLIER_CONTROLLER.UpdateSupplier( data , this.props.auth.token );

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

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }

    //Clear all input details
    clear = ()=>{
        this.setState({
            name:'' ,
            address:'' ,
            phoneNo:'' ,
            email: '',
        })
    }

    render() {
        const {supplierList , name,address,phoneNo, email, id } = this.state;
        return (
            <div>

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
                                    <form onSubmit={(e) => this.onFormSubmit(e)} >
                                        <div className="row ml-3 mt-1">
                                        <div className="col-sm" style={{paddingRight:"50px"}}>
                                            <div className="row">
                                                <div className="col-sm">
                                                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Update {this.props.name} Details<br></br>
                                                    <span className="text-muted small">You can Update or Delete each Supplier</span></h6>
                                                </div>
                                            </div>
                                        

                                                <div className="row">
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={'Customer Name *'}
                                                            placeholder={"Select one Supplier"}
                                                            //error={ errors.group_mo}
                                                            value={name}
                                                            name="name"
                                                            onChange={(e) => this.formValueChange(e)}
                                                            //error_meesage={'*Group Number required'}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"Contact Number *"}
                                                            placeholder={"Select one Supplier"}
                                                            //error={ errors.group_mo}
                                                            value={phoneNo}
                                                            name="phoneNo"
                                                            onChange={this.formValueChange}
                                                            //error_meesage={'*Group Number required'}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                    
                                                    <div className="col-sm-12 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={'Address *'}
                                                            placeholder={"Select one Supplier"}
                                                            //error={ errors.group_mo}
                                                            value={address}
                                                            name="address"
                                                            onChange={this.formValueChange}
                                                            //error_meesage={'*Group Number required'}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"Email *"}
                                                            placeholder={"Select one Supplier"}
                                                            //error={ errors.group_mo}
                                                            value={email}
                                                            name="email"
                                                            onChange={this.formValueChange}
                                                            //error_meesage={'*Group Number required'}
                                                        />
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
                            <Nav variant="pills" className="flex-column bg-white">
                                <Card>
                                <Nav.Item>
                                    <Row>
                                        <Col xs={12} md={8}>
                                            <h6 style={{display: this.state.searchState == false ? 'block' : 'none' ,paddingBottom:"15px", paddingTop:"19px", paddingLeft:"15px", paddingRight:"15px", color:"#475466", fontFamily:"Roboto, sans-serif"}}>Suppliers</h6>
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
                                        style={{height:"500px"}}
                                        contentClassName="content"
                                        horizontal={false}
                                        >
                                        {supplierList && supplierList.map((name) => this.renderOneCustomer(name))}
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
        if( search !== "" && item.name.toLowerCase().indexOf(search.toLowerCase()) === -1 ){
        return null;
        }

        return(
            <div style={{paddingLeft:"20px"}} key={item.id} onClick={() => this.loadSupplierData(item.id)}>
                 <div className="row">
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>{item.id}</p></div>
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466",  marginBottom:"0px"}}> {moment(new Date(item.createdAt)).format("YYYY MMM DD")}</p></div>
                </div>
                <p style={{fontSize:"18px", color:"#18A0FB",fontFamily:"sans-serif", marginBottom:"0px"}}>{item.name}</p>
                <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginTop:"0px",  marginBottom:"0px"}}> {item.address}</p>
                <hr></hr>
            </div>
        );
    } 


    
    
  
    



















}


const mapStateToProps = state => ({
    auth: state.auth || {},
  });
 
  
export default connect(mapStateToProps, null)(withRouter(DisplatSupplierCom));