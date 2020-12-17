import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTrash , faRedo , faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'
import { Tab , Row , Col, Nav , Card , InputGroup , FormControl, Image , Table , OverlayTrigger, Tooltip} from 'react-bootstrap';
import { connect } from 'react-redux';
import ScrollArea from 'react-scrollbar'
import {FormInput  } from '../../../../Components/Form'
import CONFIG from '../../../../Controllers/Config.controller';
import moment from 'moment';
import Vehicle_CONTROLLER from '../../../../Controllers/HR Staff/Vehicle.controller';
import DRIVER_CONTROLLER from '../../../../Controllers/HR Staff/DriverProfile.controller';
import Spinner from "react-bootstrap/Spinner";

class DisplayDriversCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addCustomerState: false,
            searchState: false, 
            fuelState:false,
            RepaireState:false,
            WarningState: false, 

            curTime : new Date().toLocaleString(),

            emp_id:'',
            licine_no:'',
            next_renew_date:'',
            description:'',
            licen_type:'',
            country:'',

            EmpNme:'',

            search: '',
            VehicleByID : [],
            FuelDetailsList: [],
            RepaireDetailsList: [],

            error:true,
            errors : {},
            isLoading: '',

            fulepumped:'',
            distance:'',
            totalmileage:'',

            black: true,

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
        this.setState({
            isLoading : true,
        })
        const res = await DRIVER_CONTROLLER.getAllDriver(this.props.auth.token);
        this.setState({
            isLoading : false,
            vehicleList: res.data.rows,
        });
    }

    //REFRESH all Vehicles
    refreshList = () => {
        this.loadAllVehicles();
    }

    //Get driver by id - function
    loadVehicleData = async (id) => {
        const res = await DRIVER_CONTROLLER.getOneDriverByID(id,this.props.auth.token);
        console.log("driver daata" , res);
        if(res.status === 200 ){
            this.setState({
                errors : {},
                emp_id:res.data.data.emp_id,
                licine_no: res.data.data.licine_no,
                next_renew_date: res.data.data.next_renew_date,
                description: res.data.data.description,
                licen_type: res.data.data.licen_type,
                country: res.data.data.country,
                EmpNme: res.data.data.employee.full_name,
                id: res.data.data.id,
            });

            if(this.state.next_renew_date < this.state.curTime){
                CONFIG.setToast("License Renew Date is due");
                this.setState({
                    WarningState:true,
                });
               
            }
        }
    }

    //DELETE Fucntion
    onClickDelete = (id) => {
        if(id == ''){
            CONFIG.setErrorToast("Please Select a Vehicle to Delete!");
        }else{
            CONFIG.setDeleteConfirmAlert(
                "",
                "Are you sure you want to delete this Vehicle ?",
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

        if(this.state.id == ''){
            CONFIG.setErrorToast("Please Select a Vehicle to Update!");
        }else{
            var data = {
                id: this.state.id,
                emp_id: this.state.emp_id,
                licine_no:  this.state.licine_no,
                next_renew_date: this.state.next_renew_date,
                description: this.state.description,
                licen_type:  this.state.licen_type,
                country:  this.state.country,
            }

            const result = await DRIVER_CONTROLLER.UpdateDriver( data , this.props.auth.token );

            console.log("driver update result", result);

            // if(result.status == 200){
            //     CONFIG.setToast("Successfully Updated!");
            //     this.clear();
            //     this.loadAllVehicles();
            // }
            // else{
            //     CONFIG.setErrorToast("Somthing Went Wrong!");
            //     this.loadAllVehicles();
            // }
        }
    }

    //Clear all input details
    clear = ()=>{
        this.setState({
            emp_id:'',
            licine_no:'',
            next_renew_date:'',
            description:'',
            licen_type:'',
            country:'',
        })
    }

    clearFuel = () => {
        this.setState({
            date: '',
            driver_id: '',
            price: '',
            amount: '',
            fuel_station: '',
            fuel_type:'',
            descriptionfuel: '',
            added_by: '',
        })
        if (this.state.fuelState) {
            this.setState({ fuelState: false })
        } else {
            this.setState({ fuelState: true })
        }
    }

    clearRepaire = () => {
        this.setState({
            Repair_date: '',
            Repair_driver_id: '',
            Repair_price: '',
            Repair_amount: '',
            garage_location: '',
            Repair_description:'',
            Repair_added_by:'',
        })
        if (this.state.RepaireState) {
            this.setState({ RepaireState: false })
        } else {
            this.setState({ RepaireState: true })
        }
    }

    render() {
        const {vehicleList , vehicle_name, EmpNme, vehicle_number, emp_id, licine_no , id, 
            next_renew_date, licen_type, country, description, image , errors , RepaireDetailsList,
            driver_id, fuel_station , fuel_type,price, amount, date, descriptionfuel, FuelDetailsList,
            garage_location, Repair_added_by, Repair_amount, Repair_date, Repair_description, Repair_driver_id, Repair_price,
            fulepumped,distance ,totalmileage } = this.state;
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
                                            <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Vehicle Assign</a>
                                        </div>
                                    </nav>
                                    <div class="tab-content" id="nav-tabContent">
                                        
                                        {/* basic information tab start here */}
                                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                        <form onSubmit={(e) => this.onFormSubmit(e)} >
                                            <div className="row ml-3 mt-1">
                                                <div className="col-sm-12" style={{paddingRight:"50px"}}>
                                                    <div className="row">
                                                        <div className="col-sm">
                                                            <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Update {EmpNme} Details<br></br>
                                                            <span className="text-muted small">You can Update or Delete each Driver</span></h6>
                                                        </div>
                                                        <div className="col-sm" style={{marginTop:"15px"}} >
                                                            <FontAwesomeIcon icon={faTrash} onClick={() => this.onClickDelete(id)} style={{color:"red" , cursor: 'pointer'}} />
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={'Employee ID *'}
                                                                placeholder={"Select one Driver"}
                                                                value={emp_id}
                                                                name="emp_id"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.licen_type && errors.licen_type.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.licen_type}</h4>}
                                                        </div>
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Country *"}
                                                                placeholder={"Select one Driver"}
                                                                value={country}
                                                                name="country"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.licen_type && errors.licen_type.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.licen_type}</h4>}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={'License Number *'}
                                                                placeholder={"Select one Driver"}
                                                                value={licine_no}
                                                                name="licine_no"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.licen_type && errors.licen_type.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.licen_type}</h4>}
                                                        </div>
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"License Renew Date *"}
                                                                placeholder={"Select one Driver"}
                                                                value={next_renew_date}
                                                                name="next_renew_date"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.licen_type && errors.licen_type.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.licen_type}</h4>}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6  mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"License Type *"}
                                                                placeholder={"Select one Driver"}
                                                                value={licen_type}
                                                                name="licen_type"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.licen_type && errors.licen_type.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.licen_type}</h4>}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Description *"}
                                                                placeholder={"Select one Driver"}
                                                                value={description}
                                                                name="description"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.licen_type && errors.licen_type.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.licen_type}</h4>}
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
                                        
                                        {/* vehicle assign  tab start here */}
                                        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
hjhbhjb
                                          
                                        
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
                                            <h6 style={{display: this.state.searchState == false ? 'block' : 'none' , paddingTop:"22px", paddingLeft:"15px", paddingRight:"15px", color:"#FFFFFF", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>All Vehicles</h6>
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
        if( search !== "" && item.vehicle_number.toLowerCase().indexOf(search.toLowerCase()) === -1  && item.vehicle_name.toLowerCase().indexOf(search.toLowerCase()) === -1){
        return null;
        }

        return(
            <div key={item.id} onClick={() => this.loadVehicleData(item.id)}  >

                    <div className="row">
                            <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>EMP ID : {item.emp_id} </p></div>
                            <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466",  marginBottom:"0px"}}>Driver ID : {item.id} </p></div>
                    </div>
                    <p style={{fontSize:"18px", color:"#18A0FB",fontFamily:"sans-serif", marginBottom:"0px"}}>License No : {item.licine_no}</p>
                    <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginTop:"0px",  marginBottom:"0px"}}>License Type : {item.licen_type}</p>
                    <div style={{ display: this.state.WarningState == true ? 'block' : 'none'}}>
                        <FontAwesomeIcon icon={faExclamationTriangle} style={{color:"#FFC300"}}  className="mr-2"/>
                    </div>
                    <hr></hr>
            </div>

            
        );
    } 


 
    

    validate = () => {
        let { errors, licen_type } = this.state;
        let count = 0;

        if (licen_type.length === 0) {
            errors.licen_type =  'Please select a Vehicle'
            count++
        } else {
            errors.licen_type = ''
        }

        this.setState({ errors });
        return count == 0;
    }
    

















}


const mapStateToProps = state => ({
    auth: state.auth || {},
  });
 
  
export default connect(mapStateToProps, null)(withRouter(DisplayDriversCom));