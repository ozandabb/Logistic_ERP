import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Tab , Row , Col, Nav , Card , InputGroup , FormControl, Image , Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import ScrollArea from 'react-scrollbar'
import {FormInput  } from '../../../../Components/Form'
import CONFIG from '../../../../Controllers/Config.controller';
import Vehicle_CONTROLLER from '../../../../Controllers/HR Staff/Vehicle.controller';

class DisplayVehiclesCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addCustomerState: false,
            searchState: false, 

            sortDirection: 'descending',

            id:'',
            vehicle_name:'',
            vehicle_year:'',
            vehicle_type:'',
            vehicle_number:'',
            weight: '',
            licen_number: "",
            licen_renew_date:'',
            mileage:'',
            service_due:'',
            insurance_number:'',
            insurance_renew_date:'',
            description: '',
            image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Freightliner_M2_106_6x4_2014_%2814240376744%29.jpg/1200px-Freightliner_M2_106_6x4_2014_%2814240376744%29.jpg",

            search: '',
            VehicleByID : [],

            errors : {},
        };
    }

    async componentDidMount() {
        this.loadAllVehicles();
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
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

    //GET all vehicles
    loadAllVehicles = async () => {
        const res = await Vehicle_CONTROLLER.getAllVehicle(this.props.auth.token);
        this.setState({
            vehicleList: res.data.rows,
        });
    }

    //Get vehicle by id - function
    loadVehicleData = async (id) => {
        const res = await Vehicle_CONTROLLER.getOneVehicleByID(id,this.props.auth.token);

        if(res.status === 200 ){
            this.setState({
                errors : {},
                id: res.data.data.id,
                vehicle_name: res.data.data.vehicle_name,
                vehicle_year:  res.data.data.vehicle_year,
                vehicle_type: res.data.data.vehicle_type,
                vehicle_number: res.data.data.vehicle_number,
                weight:  res.data.data.weight,
                licen_number:  res.data.data.licen_number,
                licen_renew_date: res.data.data.licen_renew_date,
                mileage: res.data.data.mileage,
                service_due: res.data.data.service_due,
                insurance_number: res.data.data.insurance_number,
                insurance_renew_date: res.data.data.insurance_renew_date,
                description:  res.data.data.description,
            });
        }
    }

    //DELETE Fucntion
    onClickDelete = (id) => {
        if(id == ''){
            CONFIG.setErrorToast("Please Select a Vehicle to Delete!");
        }else{
            CONFIG.setDeleteConfirmAlert(
                "",
                "Are you sure you want to delete this Supplier ?",
                () => this.clickDeleteVehicle(id),
                () => {}
            );
        }
       
    };
    clickDeleteVehicle = async (id) => {
        const resultDelete = await Vehicle_CONTROLLER.DeleteVehicle( id , this.props.auth.token );

        if(resultDelete.status == 200){
            CONFIG.setToast("Successfully Deleted!");
            this.clear();
            this.loadAllVehicles();
        }else{
            CONFIG.setErrorToast("Somthing Went Wrong!");
            this.clear();
            this.loadAllVehicles();
        }
    };

    //Update form submit
    onFormSubmit = async (e) => {
        e.preventDefault();

        if (this.validate()) {
            var data = {
                id: this.state.id,
                vehicle_name: this.state.vehicle_name,
                vehicle_year:  this.state.vehicle_year,
                vehicle_type: this.state.vehicle_type,
                vehicle_number: this.state.vehicle_number,
                weight:  this.state.weight,
                licen_number:  this.state.licen_number,
                licen_renew_date: this.state.licen_renew_date,
                mileage: this.state.mileage,
                service_due: this.state.service_due,
                insurance_number: this.state.insurance_number,
                insurance_renew_date: this.state.insurance_renew_date,
                description:  this.state.description,
            }

            const result = await Vehicle_CONTROLLER.UpdateVehicle( data , this.props.auth.token );

            if(result.status == 200){
                CONFIG.setToast("Successfully Updated!");
                this.clear();
                this.loadAllVehicles();
            }
            else{
                CONFIG.setErrorToast("Somthing Went Wrong!");
                this.clear();
                this.loadAllVehicles();
            }
        }
    }

    //Clear all input details
    clear = ()=>{
        this.setState({
            vehicle_name:'',
            vehicle_year:'',
            vehicle_type:'',
            vehicle_number:'',
            weight: '',
            licen_number: "",
            licen_renew_date:'',
            mileage:'',
            service_due:'',
            insurance_number:'',
            insurance_renew_date:'',
            description: '',
        })

    }

    render() {
        const {vehicleList , vehicle_name, vehicle_type, vehicle_number, vehicle_year, weight , id, 
            licen_number, licen_renew_date, insurance_number, insurance_renew_date, mileage, service_due, description, image , errors } = this.state;
        return (
            <div>

                {/* Customer details display here with the tab view */}
                <Tab.Container id="left-tabs-example">
                    <Row>

                        <Col sm={9}>
                            <Card >
                                    <nav>
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                            <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Basic Information</a>
                                            <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Payment History</a>
                                            <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Statistics</a>
                                        </div>
                                    </nav>
                                    <div class="tab-content" id="nav-tabContent">
                                        {/* basic information tab start here */}
                                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                        <form onSubmit={(e) => this.onFormSubmit(e)} >
                                            <div className="row ml-3 mt-1">
                                                <div className="col-sm-8">
                                                    <div className="row">
                                                        <div className="col-sm">
                                                            <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Update {vehicle_name} Details<br></br>
                                                            <span className="text-muted small">You can Update or Delete each Vehicle</span></h6>
                                                        </div>
                                                        <div className="col-sm" style={{marginTop:"15px"}} >
                                                            <FontAwesomeIcon icon={faTrash} onClick={() => this.onClickDelete(id)} style={{color:"red" , cursor: 'pointer'}} />
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={'Vehicle Name *'}
                                                                placeholder={"Select one Vehicle"}
                                                                value={vehicle_name}
                                                                name="vehicle_name"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.service_due && errors.service_due.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.service_due}</h4>}
                                                        </div>
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Year *"}
                                                                placeholder={"Select one Vehicle"}
                                                                value={vehicle_year}
                                                                name="vehicle_year"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.service_due && errors.service_due.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.service_due}</h4>}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={'Vehicle Type *'}
                                                                placeholder={"Select one Vehicle"}
                                                                value={vehicle_type}
                                                                name="vehicle_type"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.service_due && errors.service_due.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.service_due}</h4>}
                                                        </div>
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Vehicle Number *"}
                                                                placeholder={"Select one Vehicle"}
                                                                value={vehicle_number}
                                                                name="vehicle_number"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.service_due && errors.service_due.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.service_due}</h4>}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6  mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Weight *"}
                                                                placeholder={"Select one Vehicle"}
                                                                value={weight}
                                                                name="weight"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.service_due && errors.service_due.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.service_due}</h4>}
                                                        </div>
                                                        <div className="col-md-6  mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Mileage *"}
                                                                value={mileage}
                                                                placeholder={"Select one Vehicle"}
                                                                name="mileage"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.service_due && errors.service_due.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.service_due}</h4>}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Description *"}
                                                                placeholder={"Select one Vehicle"}
                                                                value={description}
                                                                name="description"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.service_due && errors.service_due.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.service_due}</h4>}
                                                        </div> 
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Insurance Number *"}
                                                                placeholder={"Select one Vehicle"}
                                                                value={insurance_number}
                                                                name="insurance_number"
                                                                onChange={this.formValueChange}
                                                            />
                                                              {errors.service_due && errors.service_due.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.service_due}</h4>}
                                                        </div>
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={'Insurance Renew Date *'}
                                                                placeholder={"Select one Vehicle"}
                                                                value={insurance_renew_date}
                                                                name="insurance_renew_date"
                                                                onChange={this.formValueChange}
                                                            />
                                                              {errors.service_due && errors.service_due.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.service_due}</h4>}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                            <div className="col-md-6 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={"Service Due Date *"}
                                                                    placeholder={"Select one Vehicle"}
                                                                    value={service_due}
                                                                    name="service_due"
                                                                    onChange={this.formValueChange}
                                                                />
                                                                  {errors.service_due && errors.service_due.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.service_due}</h4>}
                                                            </div>
                                                    </div>
                                                    
                                                </div>
                                                <div className="col-sm-4">
                                                    <Image src="/images/isaiah_1.jpg" className="img-fluid" style={{ padding:"20px"}} roundedCircle />
                                                
                                                    <div className="row">
                                                        <div className="col-sm">
                                                            <div className="col-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={"License Number *"}
                                                                    placeholder={"Select one Customer"}
                                                                    value={licen_number}
                                                                    name="licen_number"
                                                                    onChange={this.formValueChange}
                                                                />
                                                                  {errors.service_due && errors.service_due.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.service_due}</h4>}
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm">
                                                            <div className="col-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={"License Renew Date *"}
                                                                    placeholder={"Select one Customer"}
                                                                    value={licen_renew_date}
                                                                    name="licen_renew_date"
                                                                    onChange={this.formValueChange}
                                                                />
                                                                  {errors.service_due && errors.service_due.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.service_due}</h4>}
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="row ml-3 mt-1">
                                                <div className="col-6 mt-3 mb-5" >
                                                    <button type="submit" style={{backgroundColor:"#475466" , color:"#FFFFFF",  cursor: 'pointer'}} className="btn mt-2 btn btn-sm px-5">Update</button>
                                                    {/* <Button type="button" onClick={() => this.onClickDelete(id)} type="submit" style={{backgroundColor:"red",marginLeft:"10px", color:"#FFFFFF", cursor: 'pointer'}}  className="btn mt-2 btn btn-sm px-5">Delete</Button> */}
                                                </div>
                                            </div>
                                        </form>
                                        </div>
                                        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"> 
                                            fff
                                        </div>
                                        <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                            ff
                                        </div>
                                   
                                    </div>
                            </Card>
                        </Col>

                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column bg-white">
                                <Card>
                                <Nav.Item style={{backgroundColor:"#475466", height:"65px"}}>
                                    <Row>
                                        <Col xs={12} md={8}>
                                            <h6 style={{display: this.state.searchState === false ? 'block' : 'none' , paddingTop:"22px", paddingLeft:"15px", paddingRight:"15px", color:"#FFFFFF", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>All Vehicles</h6>
                                            <div className="col" style={{ display: this.state.searchState === true ? 'block' : 'none' , paddingTop:"15px"}}>
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
                                            <FontAwesomeIcon onClick={() => this.change_search_toggle()}  icon={faSearch} style={{cursor: 'pointer', color:"#FFFFFF", marginLeft:"20px", alignContent:"flex-end", alignItems:"flex-end"}}/>
                                        </Col>
                                    </Row>
                                </Nav.Item>
                                
                                <Nav.Item className="mt-2" >
                                    <Nav.Link >
                                        <ScrollArea
                                        speed={1}
                                        className="area"
                                        style={{height:"600px"}}
                                        contentClassName="content"
                                        horizontal={false}
                                        >
                                        {vehicleList && vehicleList.map((name) => this.renderOneCustomer(name))}
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
        if( search !== "" && item.vehicle_number.toLowerCase().indexOf(search.toLowerCase()) === -1  && item.vehicle_name.toLowerCase().indexOf(search.toLowerCase()) === -1){
        return null;
        }

        return(
            <div className="row" key={item.id} onClick={() => this.loadVehicleData(item.id)} >
                <div className="col-sm-4">
                    <Image src="/images/isaiah_1.jpg" className="d-none d-lg-block" style={{width:"50px", marginLeft:"10px"}} rounded />
                </div>
                <div className="col-sm-8">
                    <div className="row">
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>{item.vehicle_number}</p></div>
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466",  marginBottom:"0px"}}> {item.vehicle_year}</p></div>
                    </div>
                    <p style={{fontSize:"14px", color:"#18A0FB",fontFamily:"sans-serif" , marginBottom:"0px"}}>{item.vehicle_name}</p>
                    <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginTop:"0px",  marginBottom:"0px"}}> {item.vehicle_type}</p>

                    <hr></hr>
                </div>
            </div>
        );
    } 
    

    validate = () => {
        let { errors, service_due } = this.state;
        let count = 0;

        if (service_due.length === 0) {
            errors.service_due =  'Please select a Vehicle'
            count++
        } else {
            errors.service_due = ''
        }

        this.setState({ errors });
        return count == 0;
    }
    

















}


const mapStateToProps = state => ({
    auth: state.auth || {},
  });
 
  
export default connect(mapStateToProps, null)(withRouter(DisplayVehiclesCom));