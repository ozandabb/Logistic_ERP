import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Tab , Row , Col, Nav , Card , InputGroup , FormControl, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import ScrollArea from 'react-scrollbar'
import Vehicle_CONTROLLER from '../../../../Controllers/HR Staff/Vehicle.controller';

import DetailsEachVehicleCom from './DetailsEachVehicle.Com'

class DisplayVehiclesCom extends React.Component {
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

            search: '',
            VehicleByID : [],

        };
    }

    async componentDidMount() {
        const res = await Vehicle_CONTROLLER.getAllVehicle(this.props.auth.token);
        this.setState({
            vehicleList: res.data.rows,
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
    loadVehicleData = async (id) => {
        const res = await Vehicle_CONTROLLER.getOneVehicleByID(id,this.props.auth.token);

        console.log("vehicle eke ewa",res );
        if(res.status === 200 ){
            this.setState({
                VehicleByID: res.data.data,
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
        const {vehicleList , VehicleByID } = this.state;
        return (
            <div>

                {/* Customer details display here with the tab view */}
                <Tab.Container id="left-tabs-example">
                    <Row>

                        <Col sm={9}>
                            <Card >
                                {/* Each customer tab section DetailsEachCus.Com.js  */}
                                <DetailsEachVehicleCom
                                    Cusid={VehicleByID.id}
                                    VEHICLE_NAME={VehicleByID.vehicle_name}
                                    VEHICLE_YEAR={VehicleByID.vehicle_year}
                                    VEHICLE_TYPE={VehicleByID.vehicle_type}
                                    VEHICLE_NUMBER={VehicleByID.vehicle_number}
                                    VEHICLE_WEIGHT={VehicleByID.weight}
                                    VEHICLE_LI_NUM={VehicleByID.licen_number}
                                    VEHICLE_LI_RENEW_DATE={VehicleByID.licen_renew_date}
                                    VEHICLE_MILEAGE={VehicleByID.mileage}
                                    VEHICLE_SERVICE_DUE={VehicleByID.service_due}
                                    VEHICLE_INSUARANCE_NUMBER={VehicleByID.insurance_number}
                                    VEHICLE_INSU_RENEW_DATE={VehicleByID.insurance_renew_date}
                                    VEHICLE_DESCRIPTION={VehicleByID.description}
                                />
                            </Card>
                        </Col>

                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column bg-white">
                                <Card>
                                <Nav.Item>
                                    <Row>
                                        <Col xs={12} md={8}>
                                            <h6 style={{display: this.state.searchState === false ? 'block' : 'none' ,paddingBottom:"15px", paddingTop:"19px", paddingLeft:"15px", paddingRight:"15px", color:"#475466", fontFamily:"Roboto, sans-serif"}}>Vehicles</h6>
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
        if( search !== "" && item.vehicle_number.toLowerCase().indexOf(search.toLowerCase()) === -1 && item.vehicle_name.indexOf(search.toLowerCase()) === -1){
        return null;
        }

        return(
            <div className="row" key={item.id} onClick={() => this.loadVehicleData(item.id)}>
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
    



















}


const mapStateToProps = state => ({
    auth: state.auth || {},
  });
 
  
export default connect(mapStateToProps, null)(withRouter(DisplayVehiclesCom));