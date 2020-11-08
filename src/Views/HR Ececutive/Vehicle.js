import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import HRSidebar from "./HRSidebar";
import { connect } from 'react-redux';
import AddVehicleSection from "./HR Components/Vehicle.Com/addVehicle.Com";
import DisplayVehiclesSection from "./HR Components/Vehicle.Com/DisplayVehicles.Com";

class Vehicles extends Component {   
    render() {
        return (
            <div className="bg-light wd-wrapper">
                <HRSidebar activemenu={'VEHICLES'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">

                        {/* 
                            Add Customer Section with the Header
                            Component
                            addCustomer.Com.js
                        */}
                        <AddVehicleSection/>

                        {/* 
                            Display All Customers and Each Customer Details section
                            Component
                            DisplayCustomer.Com.js
                        */}
                        <DisplayVehiclesSection/>

                    </div>
                </div>
            </div>
        );
    }
   
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});
 
  
export default connect(mapStateToProps, null)(withRouter(Vehicles));