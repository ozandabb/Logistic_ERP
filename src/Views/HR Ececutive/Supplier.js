import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import HRSidebar from "./HRSidebar";
import { connect } from 'react-redux';
import AddSupplierSection from "./HR Components/Supplier.Com/addSupplier.Com";
import DisplaySupplierSection from "./HR Components/Supplier.Com/DisplaySupplier.Com";

class Suppliers extends Component {   
    render() {
        return (
            <div className="bg-light wd-wrapper">
                <HRSidebar activemenu={'SUPPLIERS'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">

                        {/* 
                            Add Customer Section with the Header
                            Component
                            addCustomer.Com.js
                        */}
                        <AddSupplierSection/>

                        {/* 
                            Display All Customers and Each Customer Details section
                            Component
                            DisplayCustomer.Com.js
                        */}
                        <DisplaySupplierSection/>

                    </div>
                </div>
            </div>
        );
    }
   
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});
 
  
export default connect(mapStateToProps, null)(withRouter(Suppliers));