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

class DisplayVehiclesCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addCustomerState: false,
            searchState: false, 
            fuelState:false,
            RepaireState:false,

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

            date: '',
            driver_id: '',
            price: '',
            amount: '',
            fuel_station: '',
            fuel_type:'',
            descriptionfuel: '',
            added_by: '',

            Repair_date: '',
            Repair_driver_id: '',
            Repair_price: '',
            Repair_amount: '',
            garage_location: '',
            Repair_description:'',
            Repair_added_by:'',

            search: '',
            VehicleByID : [],
            FuelDetailsList: [],
            RepaireDetailsList: [],

            error:true,
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

    //Function for fuel details to toggle 
    change_fuel_toggle = () => {
        if (this.state.fuelState) {
            this.setState({ fuelState: false })
        } else {
            this.setState({ fuelState: true })
        }
    }

     //Function for Repaire details to toggle 
     change_repaire_toggle = () => {
        if (this.state.RepaireState) {
            this.setState({ RepaireState: false })
        } else {
            this.setState({ RepaireState: true })
        }
    }

    //GET all vehicles
    loadAllVehicles = async () => {
        const res = await Vehicle_CONTROLLER.getAllVehicle(this.props.auth.token);
        this.setState({
            vehicleList: res.data.rows,
        });
    }

    //REFRESH all Vehicles
    refreshList = () => {
        this.loadAllVehicles();
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

    
    //GET all vehicles
    loadAllFuel = async (id) => {
        const resFuel = await Vehicle_CONTROLLER.getAllFuel_by_VehicleID( id, this.props.auth.token);
        const resRepaire = await Vehicle_CONTROLLER.GetRepaireDetails( id, this.props.auth.token);
        console.log("iddddd", resRepaire);
        
        this.setState({
            error:false,
            RepaireDetailsList :resRepaire.data.data.rows, 
            FuelDetailsList: resFuel.data.data.rows,
        });
    }

    //delete fuel details
    onClickFuelDelete = (id) => {
        CONFIG.setDeleteConfirmAlert(
            "",
            "Are you sure you want to delete this Fuel Details ?",
            () => this.clickDeleteFuelVehicle(id),
            () => {}
        );
    }
    clickDeleteFuelVehicle = async (id) => {
        const resultDeleteFuel = await Vehicle_CONTROLLER.DeleteFuel( id , this.props.auth.token );

        if(resultDeleteFuel.status == 200){
            CONFIG.setToast("Successfully Deleted!");
            this.loadAllFuel(0)
        }else{
            CONFIG.setErrorToast("Somthing Went Wrong!");
            this.loadAllVehicles();
        }
    };

    //reapire details delete
    onClickRepaireDelete = (id) => {
        CONFIG.setDeleteConfirmAlert(
            "",
            "Are you sure you want to delete this Fuel Details ?",
            () => this.clickDeleteFuelVehicle(id),
            () => {}
        );
    }
    clickDeleteFuelVehicle = async (id) => {
        const resultDeleteFuel = await Vehicle_CONTROLLER.DeleteRepaire( id , this.props.auth.token );

        if(resultDeleteFuel.status == 200){
            CONFIG.setToast("Successfully Deleted!");
            this.loadAllFuel(0)
        }else{
            CONFIG.setErrorToast("Somthing Went Wrong!");
            this.loadAllVehicles();
        }
    };


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

    //Add Fuel Details
    onFuelFormSubmit = async (e) => {
        e.preventDefault();

        if(this.state.id == ''){
            CONFIG.setErrorToast("Please Select a Vehicle !");
        }else{
            var data = {
                id: this.state.id,
                date: this.state.date,
                driver_id:  this.state.driver_id,
                price: this.state.price,
                amount: this.state.amount,
                fuel_station:  this.state.fuel_station,
                fuel_type:  this.state.fuel_type,
                description: this.state.descriptionfuel,
                added_by: this.props.auth.user.user_details.id,
            }

            const result = await Vehicle_CONTROLLER.addFuel( data , this.props.auth.token );

            if(result.status == 201){
                CONFIG.setToast("Successfully Added !");
                this.clearFuel();
                this.loadAllVehicles();
            }
            else{
                CONFIG.setErrorToast("Somthing Went Wrong!");
                this.clearFuel();
                this.loadAllVehicles();
            }

        }

    }

    onRepaireFormSubmit = async (e) => {
        e.preventDefault();

        if(this.state.id == ''){
            CONFIG.setErrorToast("Please Select a Vehicle !");
        }else{
            var data = {
                id: this.state.id,
                date:this.state.Repair_date,
                driver_id: this.state.Repair_driver_id,
                price: this.state.Repair_price,
                amount: this.state.Repair_amount,
                garage_location: this.state.garage_location,
                description:this.state.Repair_description,
                added_by:this.props.auth.user.user_details.id,
            }

            const result = await Vehicle_CONTROLLER.addRepire( data , this.props.auth.token );

            if(result.status == 201){
                CONFIG.setToast("Successfully Added !");
                this.clearRepaire();
                this.loadAllVehicles();
            }
            else{
                CONFIG.setErrorToast("Somthing Went Wrong!");
                this.clearRepaire();
                this.loadAllVehicles();
            }

        }
        
    }

    //Update form submit
    onFormSubmit = async (e) => {
        e.preventDefault();

        if(this.state.id == ''){
            CONFIG.setErrorToast("Please Select a Vehicle to Update!");
        }else{
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
        const {vehicleList , vehicle_name, vehicle_type, vehicle_number, vehicle_year, weight , id, 
            licen_number, licen_renew_date, insurance_number, insurance_renew_date, mileage, service_due, description, image , errors , RepaireDetailsList,
            driver_id, fuel_station , fuel_type,price, amount, date, descriptionfuel, FuelDetailsList,
            garage_location, Repair_added_by, Repair_amount, Repair_date, Repair_description, Repair_driver_id, Repair_price} = this.state;
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
                                            <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Fuel Details</a>
                                            <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Repair Details</a>
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
                                        
                                        {/* Fuel tab start here */}
                                        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">

                                            <div className="row ml-3 mt-1">
                                                {['bottom'].map((placement) => (
                                                    <OverlayTrigger
                                                        key={placement}
                                                        placement={placement}
                                                        overlay={
                                                            <Tooltip id={`tooltip-${placement}`}>
                                                                Add New Fuel Details
                                                        </Tooltip>
                                                        }
                                                    >
                                                        <Image onClick={() => this.change_fuel_toggle()} src="/images/plusicon.png" className="d-none d-lg-block" style={{width:"30px", marginLeft:"10px",marginTop:"10px",marginBottom:"10px", cursor:"pointer"}} rounded />
                                                    </OverlayTrigger>
                                                ))}
                                            </div>

                                            {/* fuel toggle section */}
                                            <div className="row ml-3 mt-1 mb-5" style={{display: this.state.fuelState === true ? 'block' : 'none'}}>
                                            <form onSubmit={(e) => this.onFuelFormSubmit(e)} >
                                                <div className="col-sm" style={{paddingRight:"50px"}}>
                                                    <div className="row">
                                                        <div className="col-sm">
                                                            <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Add {vehicle_name} Fuel Details<br></br>
                                                            <span className="text-muted small">Select a Vehicle to Add Fuel Details</span></h6>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={'Vehicle ID *'}
                                                                placeholder={"Select one Vehicle"}
                                                                value={id}
                                                                name="id"
                                                                onChange={(e) => this.formValueChange(e)}
                                                            />
                                                            {errors.id && errors.id.length > 0 &&
                                                                        <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.id}</h4>}
                                                        </div>
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Driver ID  *"}
                                                                placeholder={"Enter Driver ID "}
                                                                value={this.state.driver_id}
                                                                name="driver_id"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.driver_id && errors.driver_id.length > 0 &&
                                                                        <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.driver_id}</h4>}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={'Fuel Station *'}
                                                                placeholder={"Enter Fuel Station "}
                                                                value={fuel_station}
                                                                name="fuel_station"
                                                                onChange={(e) => this.formValueChange(e)}
                                                            />
                                                            {errors.fuel_station && errors.fuel_station.length > 0 &&
                                                                        <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.fuel_station}</h4>}
                                                        </div>
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Fuel Type *"}
                                                                placeholder={"Enter Fuel Type "}
                                                                value={fuel_type}
                                                                name="fuel_type"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.fuel_type && errors.fuel_type.length > 0 &&
                                                                        <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.fuel_type}</h4>}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={'Price *'}
                                                                placeholder={"Enter Price"}
                                                                value={price}
                                                                name="price"
                                                                onChange={(e) => this.formValueChange(e)}
                                                            />
                                                            {errors.price && errors.price.length > 0 &&
                                                                        <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.price}</h4>}
                                                        </div>
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Amount *"}
                                                                placeholder={"Enter Amount"}
                                                                value={amount}
                                                                name="amount"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.amount && errors.amount.length > 0 &&
                                                                        <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.amount}</h4>}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={'Date *'}
                                                                value={date}
                                                                type="Date"
                                                                name="date"
                                                                onChange={(e) => this.formValueChange(e)}
                                                            />
                                                            {errors.date && errors.date.length > 0 &&
                                                                        <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.date}</h4>}
                                                        </div>
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Added By *"}
                                                                placeholder={"HR EXECUTIVE"}
                                                                readOnly 
                                                                value = {this.props.auth.user.user_details.username}                                                           />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="row">
                                                        <div className="col-sm-12 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={'Description *'}
                                                                placeholder={"Description about the Fuel Consumption "}
                                                                value={descriptionfuel}
                                                                name="descriptionfuel"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.descriptionfuel && errors.descriptionfuel.length > 0 &&
                                                                        <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.descriptionfuel}</h4>}
                                                        </div>
                                                    </div>

                                                    <div className="row"> 
                                                        <div className="col-6 mt-3 mb-1" >
                                                            <button type="submit" style={{ color:"#FFFFFF",  cursor: 'pointer'}} className="btn  btn-success btn-sm px-5">Add Fuel Details</button>
                                                        </div>
                                                    </div>


                                                </div>
                                                </form>
                                            </div>

                                            <div className="row">
                                            <div className="col-sm-12">
                                                {/* ------------------------------ error message-------------------------- */}
                                                {  this.state.error && 
                                                <div className=" shadow-sm rounded bg-white mb-3 pt-2 pb-3" style={{marginLeft:"20px", marginRight:"20px", marginTop:"0px"}} >
                                                    <h6 className="text-header text-warning pt-2 pb-2 ml-4 font-weight-bold line-hight-1">
                                                        <FontAwesomeIcon icon={faExclamationTriangle}  className="mr-2"/>Conflict Found !
                                                    </h6>
                                                    <h6 className="text-header mb-0 ml-4 line-hight-1">
                                                    <span className="text-muted small font-weight-bold">Please Select a Vehicle to Display Fuel Details</span></h6>
                                                </div>
                                                } 
                                                </div>
                                            </div>

                                            <div className="row" >
                                                <div className="col-sm">
                                                   
                                                            <h6 className="text-header py-3 mb-0 ml-3 font-weight-bold line-hight-1">{vehicle_name} Fuel Details<br></br>
                                                            <span className="text-muted small">Vehicle ID - {id} | Vehicle Number - {vehicle_number} | Vehicle Type - {vehicle_type}  </span></h6>
                                                            <Card>
                                                        <Table striped bordered hover variant="light">
                                                            <thead>
                                                                <tr>
                                                                    <th>Driver ID</th>
                                                                    <th>Fuel Station</th>
                                                                    <th>Fuel Type</th>
                                                                    <th>Price</th>
                                                                    <th>Amount</th>
                                                                    <th>Description</th>
                                                                    <th>By</th>
                                                                    <th>Date</th>
                                                                    <th>Act</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            {FuelDetailsList && FuelDetailsList.map((name) => this.renderFuelDetails(name))}
                                                            </tbody>
                                                        </Table>
                                                    </Card>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Repair details tab start here */}
                                        <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                            
                                            <div className="row ml-3 mt-1">
                                                {['bottom'].map((placement) => (
                                                    <OverlayTrigger
                                                        key={placement}
                                                        placement={placement}
                                                        overlay={
                                                            <Tooltip id={`tooltip-${placement}`}>
                                                                Add New Repaire Details
                                                        </Tooltip>
                                                        }
                                                    >
                                                        <Image onClick={() => this.change_repaire_toggle()} src="/images/plusicon.png" className="d-none d-lg-block" style={{width:"30px", marginLeft:"10px",marginTop:"10px",marginBottom:"10px", cursor:"pointer"}} rounded />
                                                    </OverlayTrigger>
                                                ))}
                                            </div>

                                            {/* fuel toggle section */}
                                            <div className="row ml-3 mt-1 mb-5" style={{display: this.state.RepaireState === true ? 'block' : 'none'}}>
                                                <form onSubmit={(e) => this.onRepaireFormSubmit(e)} >
                                                <div className="col-sm" style={{paddingRight:"50px"}}>
                                                    <div className="row">
                                                        <div className="col-sm">
                                                            <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Add {vehicle_name} Repaire Details<br></br>
                                                            <span className="text-muted small">Select Vehicle to add Repaire details</span></h6>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={'Vehicle ID *'}
                                                                placeholder={"Select one Vehicle"}
                                                                value={id}
                                                                name="id"
                                                                onChange={(e) => this.formValueChange(e)}
                                                            />
                                                            {errors.id && errors.id.length > 0 &&
                                                                        <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.id}</h4>}
                                                        </div>
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Driver ID  *"}
                                                                placeholder={"Enter Driver ID "}
                                                                value={Repair_driver_id}
                                                                name="Repair_driver_id"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.Repair_driver_id && errors.Repair_driver_id.length > 0 &&
                                                                        <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.Repair_driver_id}</h4>}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={'Price *'}
                                                                placeholder={"Enter Price"}
                                                                value={Repair_price}
                                                                name="Repair_price"
                                                                onChange={(e) => this.formValueChange(e)}
                                                            />
                                                            {errors.Repair_price && errors.Repair_price.length > 0 &&
                                                                        <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.Repair_price}</h4>}
                                                        </div>
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Amount *"}
                                                                placeholder={"Enter Amount"}
                                                                value={Repair_amount}
                                                                name="Repair_amount"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.Repair_amount && errors.Repair_amount.length > 0 &&
                                                                        <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.Repair_amount}</h4>}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={'Date *'}
                                                                value={Repair_date}
                                                                type="Date"
                                                                name="Repair_date"
                                                                onChange={(e) => this.formValueChange(e)}
                                                            />
                                                            {errors.Repair_date && errors.Repair_date.length > 0 &&
                                                                        <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.Repair_date}</h4>}
                                                        </div>
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Added By *"}
                                                                placeholder={"HR EXECUTIVE"}
                                                                readOnly 
                                                                value = {this.props.auth.user.user_details.username}                                                           />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="row">
                                                        <div className="col-sm-12 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={'Description *'}
                                                                placeholder={"Description about the Repaire"}
                                                                value={Repair_description}
                                                                name="Repair_description"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.Repair_description && errors.Repair_description.length > 0 &&
                                                                        <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.Repair_description}</h4>}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={'Garage Location *'}
                                                                placeholder={"Enter Garage Location"}
                                                                value={garage_location}
                                                                name="garage_location"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.garage_location && errors.garage_location.length > 0 &&
                                                                        <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.garage_location}</h4>}
                                                        </div>
                                                    </div>

                                                    <div className="row"> 
                                                        <div className="col-6 mt-3 mb-1" >
                                                            <button type="submit" style={{ color:"#FFFFFF",  cursor: 'pointer'}} className="btn  btn-success btn-sm px-5">Add Fuel Details</button>
                                                        </div>
                                                    </div>


                                                </div>
                                                </form>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-12">
                                                {/* ------------------------------ error message-------------------------- */}
                                                {  this.state.error && 
                                                <div className=" shadow-sm rounded bg-white mb-3 pt-2 pb-3" style={{marginLeft:"20px", marginRight:"20px", marginTop:"0px"}} >
                                                    <h6 className="text-header text-warning pt-2 pb-2 ml-4 font-weight-bold line-hight-1">
                                                        <FontAwesomeIcon icon={faExclamationTriangle}  className="mr-2"/>Conflict Found !
                                                    </h6>
                                                    <h6 className="text-header mb-0 ml-4 line-hight-1">
                                                    <span className="text-muted small font-weight-bold">Please Select a Vehicle to Display Repaire Details</span></h6>
                                                </div>
                                                } 
                                                </div>
                                            </div>

                                            <div className="row" >
                                                <div className="col-sm">
                                                   
                                                            <h6 className="text-header py-3 mb-0 ml-3 font-weight-bold line-hight-1">{vehicle_name} Repaire Details<br></br>
                                                            <span className="text-muted small">Vehicle ID - {id} | Vehicle Number - {vehicle_number} | Vehicle Type - {vehicle_type}  </span></h6>
                                                            <Card>
                                                        <Table striped bordered hover variant="light">
                                                            <thead>
                                                                <tr>
                                                                    <th>Driver ID</th>
                                                                    <th>Garage Location</th>
                                                                    <th>Price</th>
                                                                    <th>Description</th>
                                                                    <th>By</th>
                                                                    <th>Date</th>
                                                                    <th>Act</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            {RepaireDetailsList && RepaireDetailsList.map((name) => this.renderRepaireDetails(name))}
                                                            </tbody>
                                                        </Table>
                                                    </Card>
                                                </div>
                                            </div>

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
                <div className="col-sm-8"  onClick={() => this.loadAllFuel(item.id)}>
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


    renderFuelDetails = (item) => {
        return(
                <tr key={item.id}>
                    <td>{item.driver_id}</td>
                    <td>{item.fuel_station}</td>
                    <td>{item.fuel_type}</td>
                    <td>{item.price}</td>
                    <td>{item.amount}</td>
                    <td>{item.description}</td>
                    <td>{item.added_by}</td>
                    <td>{moment(new Date(item.date)).format("YYYY MMM DD")}</td>
                    <td><FontAwesomeIcon icon={faTrash} onClick={() => this.onClickFuelDelete(item.id)} style={{color:"red" , cursor: 'pointer'}} /></td>
                </tr>
        );
    }

    renderRepaireDetails = (item) => {
        return(
                <tr key={item.id}>
                    <td>{item.driver_id}</td>
                    <td>{item.garage_location}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>{item.added_by}</td>
                    <td>{moment(new Date(item.date)).format("YYYY MMM DD")}</td>
                    <td><FontAwesomeIcon icon={faTrash} onClick={() => this.onClickRepaireDelete(item.id)} style={{color:"red" , cursor: 'pointer'}} /></td>
                </tr>
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