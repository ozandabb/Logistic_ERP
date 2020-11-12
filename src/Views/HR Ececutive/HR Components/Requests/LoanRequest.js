import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import HRSidebar from "../../HRSidebar";
import { connect } from 'react-redux';

class LoanRequest extends Component {   
    render() {
        return (
            <div className="bg-light wd-wrapper">
                <HRSidebar activemenu={'REQUEST'} submenu={'LOAN'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">
                        <h4>Loans baby</h4>

                        {/* 
                            Add Customer Section with the Header
                            Component
                            addCustomer.Com.js
                        */}
                        {/* <AddCustomerSection/> */}

                        {/* 
                            Display All Customers and Each Customer Details section
                            Component
                            DisplayCustomer.Com.js
                        */}
                        {/* <DisplayCustomerSection/> */}

                    </div>
                </div>
            </div>
        );
    }
   
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});
 
  
export default connect(mapStateToProps, null)(withRouter(LoanRequest));