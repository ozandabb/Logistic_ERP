import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import HRSidebar from "./HRSidebar";
import { connect } from 'react-redux';
import AddCustomerSection from "./HR Components/Customer Com/addCustomer.Com";
import DisplayCustomerSection from "./HR Components/Customer Com/DisplayCustomer.Com";

class Drivers extends Component {   
    render() {
        return (
            <div className="bg-light wd-wrapper">
                <HRSidebar activemenu={'CUSTOMERS'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">

                        {/* 
                            Add Customer Section with the Header
                            Component
                            addCustomer.Com.js
                        */}
                        <AddCustomerSection/>

                        {/* 
                            Display All Customers and Each Customer Details section
                            Component
                            DisplayCustomer.Com.js
                        */}
                        <DisplayCustomerSection/>

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