import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import HRSidebar from "./HRSidebar";
import { connect } from 'react-redux';
import AddEmployeeSection from "./HR Components/Employee.Com/addEmployee.Com";
import DisplayEmployeeSection from "./HR Components/Employee.Com/DisplayEmployee.Com";

class Employees extends Component {   
    render() {
        return (
            <div className="bg-light wd-wrapper">
                <HRSidebar activemenu={'EMPLOYEES'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">

                        {/* 
                            Add Customer Section with the Header
                            Component
                            addCustomer.Com.js
                        */}
                        <AddEmployeeSection/>

                        {/* 
                            Display All Customers and Each Customer Details section
                            Component
                            DisplayCustomer.Com.js
                        */}
                        <DisplayEmployeeSection/>

                    </div>
                </div>
            </div>
        );
    }
   
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});
 
  
export default connect(mapStateToProps, null)(withRouter(Employees));