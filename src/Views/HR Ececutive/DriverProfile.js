import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import HRSidebar from "./HRSidebar";
import { connect } from 'react-redux';
import AddDriverSection from "./HR Components/DriverProfile.Com/addDriver.Com";
import DisplayDriversSection from "./HR Components/DriverProfile.Com/displayDrivers";

class Drivers extends Component {   
    render() {
        return (
            <div className="bg-light wd-wrapper">
                <HRSidebar activemenu={'DRIVERS'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">

                        {/* 
                            Add Customer Section with the Header
                            Component
                            addCustomer.Com.js
                        */}
                        <AddDriverSection/>

                        {/* 
                            Display All Customers and Each Customer Details section
                            Component
                            DisplayCustomer.Com.js
                        */}
                        <DisplayDriversSection/>

                    </div>
                </div>
            </div>
        );
    }
   
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});
 
  
export default connect(mapStateToProps, null)(withRouter(Drivers));