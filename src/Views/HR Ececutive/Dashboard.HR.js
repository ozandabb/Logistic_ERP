import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import HRSidebar from "./HRSidebar";
import { Image } from 'react-bootstrap';
import SUPPLIER_CONTROLLER from '../../Controllers/HR Staff/Supplier.controller';
import CUSTOMER_CONTROLLER from '../../Controllers/HR Staff/Customer.controller';
import EMPLOYEE_CONTROLLER from '../../Controllers/HR Staff/Employee.controller';
import DRIVERS_CONTROLLER from '../../Controllers/HR Staff/DriverProfile.controller';
import { connect } from 'react-redux';
import Spinner from "react-bootstrap/Spinner";

class HRDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllSuppliers:[],
      AllEmployees:[],
      AllCustomers:[],
      AllVehicles:[],
      AllDrivers:[],

      isLoading: '',

    };
  }

  async componentDidMount() {
    this.loadAllCustomers();
    this.loadAllSuppliers();
    this.loadAllEmployees();
    this.loadAllDrivers();
  }

  //GET all Customers
loadAllCustomers = async () => {
  this.setState({
      isLoading : true,
  })
  const res = await CUSTOMER_CONTROLLER.getAllCustomer(this.props.auth.token);
  this.setState({
      isLoading : false,
      AllCustomers: res.data.rows,
  });
}

//GET all supplliers
loadAllSuppliers = async () => {
  this.setState({
      isLoading : true,
  })
  const res = await SUPPLIER_CONTROLLER.getAllSuppliers(this.props.auth.token);
  this.setState({
      isLoading : false,
      AllSuppliers: res.data.rows,
  });
}

//GET all Customers
loadAllEmployees = async () => {
  this.setState({
      isLoading : true,
  })
  const res = await EMPLOYEE_CONTROLLER.getAllEmployee(this.props.auth.token);
  this.setState({
      isLoading : false,
      AllEmployees: res.data.rows,
  });
}

//GET all drivers
loadAllDrivers = async () => {
  this.setState({
      isLoading : true,
  })
  const res = await DRIVERS_CONTROLLER.getAllDriver(this.props.auth.token);
  this.setState({
      isLoading : false,
      AllDrivers: res.data.rows,
  });
}


  render() {

    const {AllSuppliers, AllCustomers, AllEmployees, AllDrivers } = this.state;
    const allsup = AllSuppliers.length;
    const AllCus = AllCustomers.length;
    const AllEmpl = AllEmployees.length;
    const AllDriv = AllDrivers.length;

    return (

    //   <div className="app" >
    // <Sidebar activemenu={'STUDENT'}   submenu={'STUDENT_TB_LIST'} />
    // <main></main>
    // </div>
      <div className="bg-light wd-wrapper">
        <HRSidebar activemenu={'DASHBOARD'} />
          <div className="wrapper-wx" style={{height:"100hv"}}>
            <div className="container-fluid">

                        <div className="row" >
                            <div className="col-sm shadow" style={{ backgroundColor:"#FFFFFF", margin:"20px", padding:"20px"}}>
                                <div className="row" >
                                    <div className="col-sm-3">
                                    <Image src="/images/customer.png" style={{width:"50px",height:"50px" }} rounded />
                                    </div>
                                    <div className="col-sm-9" style={{display: this.state.isLoading == false ? 'block' : 'none'}}>
                                        <h6 style={{fontFamily:"sans-serif", fontWeight:"bold",  color:"#9F9F9F"}}>Customers</h6>
                                        <h3 style={{fontFamily:"sans-serif", fontWeight:"bold",  color:"#00D19D", marginTop:"0px"}}>0{AllCus}</h3>
                                    </div>
                                    <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto', alignContent:'center'}}>
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>
                                </div>
                            </div>
                            <div className="col-sm shadow" style={{ backgroundColor:"#FFFFFF", margin:"20px", padding:"20px"}}>
                                <div className="row" >
                                    <div className="col-sm-3">
                                    <Image src="/images/Annual.png" style={{width:"50px",height:"50px" }} rounded />
                                    </div>
                                    <div className="col-sm-9" style={{display: this.state.isLoading == false ? 'block' : 'none'}}>
                                        <h6 style={{fontFamily:"sans-serif", fontWeight:"bold",  color:"#9F9F9F"}}>Suppliers</h6>
                                        <h3 style={{fontFamily:"sans-serif", fontWeight:"bold",  color:"#F94700", marginTop:"0px"}}>0{allsup}</h3>
                                    </div>
                                    <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto', alignContent:'center'}}>
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>
                                </div>
                            </div>
                            <div className="col-sm shadow" style={{ backgroundColor:"#FFFFFF", margin:"20px", padding:"20px"}}>
                                <div className="row" >
                                    <div className="col-sm-3">
                                    <Image src="/images/employees.png" style={{width:"50px",height:"50px" }} rounded />
                                    </div>
                                    <div className="col-sm-9" style={{display: this.state.isLoading == false ? 'block' : 'none'}}>
                                        <h6 style={{fontFamily:"sans-serif", fontWeight:"bold",  color:"#9F9F9F"}}>Employees</h6>
                                        <h3 style={{fontFamily:"sans-serif", fontWeight:"bold",  color:"#5301F5", marginTop:"0px"}}>0{AllEmpl}</h3>
                                    </div>
                                    <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto', alignContent:'center'}}>
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>
                                </div>
                            </div>
                            <div className="col-sm shadow" style={{ backgroundColor:"#FFFFFF", margin:"20px", padding:"20px"}}>
                                <div className="row" >
                                    <div className="col-sm-3">
                                    <Image src="/images/drivvers.png" style={{width:"50px",height:"50px" }} rounded />
                                    </div>
                                    <div className="col-sm-9" style={{display: this.state.isLoading == false ? 'block' : 'none'}}>
                                        <h6 style={{fontFamily:"sans-serif", fontWeight:"bold",  color:"#9F9F9F"}}>Drivers</h6>
                                        <h3 style={{fontFamily:"sans-serif", fontWeight:"bold",  color:"#F4E102", marginTop:"0px"}}>0{AllDriv}</h3>
                                    </div>
                                    <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto', alignContent:'center'}}>
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>
                                </div>
                            </div>
                        </div>
          </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth || {},
});

const cardstyle = "card border-0 shadow-sm rounded mt-3 bg-white py-3 d-flex flex-row"
export default connect(mapStateToProps, null)(withRouter(HRDashboard));

