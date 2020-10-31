import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import HRSidebar from "./HRSidebar";

class HRDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }


  render() {
    return (

    //   <div className="app" >
    // <Sidebar activemenu={'STUDENT'}   submenu={'STUDENT_TB_LIST'} />
    // <main></main>
    // </div>
      <div className="bg-light wd-wrapper">
        <HRSidebar activemenu={'DASHBOARD'} />
          <div className="wrapper-wx" style={{height:"100hv"}}>
            <div className="container-fluid">
                    <div className="row">
                          <div class="col-sm">
                          <Link to='/hrstaff/customerProfile' style={{textDecoration: 'none'}}>
                            <h6 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                                <div className="row">
                                            <div className="col">
                                                    <div className="card border-0 shadow-sm rounded mt-1 bg-white pb-2" style={{padding:"10px", color:"#929b94"}}> 
                                                        <div className="row">
                                                            <div className="col-4">
                                                                    <center><img src="/images/customers.png" className="img-fluid my-auto" style={{width:"100px"}}/></center>
                                                            </div>
                                                            <div className="col-8">
                                                                    <h5 style={{color: "green" }}>Customers </h5> 
                                                                    <h6></h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>
                                </div>
                            </h6>  
                            </Link>      
                          </div>

                          <div class="col-sm">
                          <Link to='/hrstaff/supplierProfile' style={{textDecoration: 'none'}}>
                            <h6 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                                <div className="row">
                                            <div className="col">
                                                    <div className="card border-0 shadow-sm rounded mt-1 bg-white pb-2" style={{padding:"10px", color:"#929b94"}}> 
                                                        <div className="row">
                                                            <div className="col-4">
                                                                    <center><img src="/images/supplier.png" className="img-fluid my-auto" style={{width:"90px"}}/></center>
                                                            </div>
                                                            <div className="col-8">
                                                                    <h5 style={{color: "green" }}>Suppliers </h5> 
                                                                    <h6></h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>
                                </div>
                            </h6> 
                            </Link>       
                          </div>

                          <div class="col-sm">
                          <Link to='' style={{textDecoration: 'none'}}>
                            <h6 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                                <div className="row">
                                            <div className="col">
                                                    <div className="card border-0 shadow-sm rounded mt-1 bg-white pb-2" style={{padding:"10px", color:"#929b94"}}> 
                                                        <div className="row">
                                                            <div className="col-4">
                                                                    <center><img src="/images/employee.png" className="img-fluid my-auto" style={{width:"90px"}}/></center>
                                                            </div>
                                                            <div className="col-8">
                                                                    <h5 style={{color: "green" }}>Employees </h5> 
                                                                    <h6>45,000 LKR</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>
                                </div>
                            </h6>  
                            </Link>      
                          </div>

                          <div class="col-sm">
                          <Link to='/hrstaff/driverProfile' style={{textDecoration: 'none'}}>
                            <h6 className="text-dark bold-normal py-2 bg-white shadow-sm px-2 mt-3 rounded">
                                <div className="row">
                                            <div className="col">
                                                    <div className="card border-0 shadow-sm rounded mt-1 bg-white pb-2" style={{padding:"10px", color:"#929b94"}}> 
                                                        <div className="row">
                                                            <div className="col-4">
                                                                    <center><img src="/images/driver.png" className="img-fluid my-auto" style={{width:"90px"}}/></center>
                                                            </div>
                                                            <div className="col-8">
                                                                    <h5 style={{color: "green" }}>Drivers </h5> 
                                                                    <h6></h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>
                                </div>
                            </h6> 
                            </Link>       
                          </div>
 
                    </div>
                    <div className="row">
 
                    </div>
          </div>
      </div>
      </div>
    );
  }
}

const cardstyle = "card border-0 shadow-sm rounded mt-3 bg-white py-3 d-flex flex-row"

export default withRouter(HRDashboard);
