import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AccSidebar from "./Sidebar.Acc.Exe";
import { connect } from 'react-redux';
import AddPaymentSection from "./Components/Payment.Com/addPayment.Com";
import DisplayPaymentSection from "./Components/Payment.Com/DisplayPayment.Com";

class Payments extends Component {
    render() {
        return (
            <div className="bg-light wd-wrapper">
                <AccSidebar activemenu={'PAYMENTS'} />
                <div className="wrapper-wx" style={{ height: "100hv" }}>
                    <div className="container-fluid">

                        {/* 
                            Add Payment Section with the Header
                            Component
                            addPayment.Com.js
                        */}
                        <AddPaymentSection />

                        {/* 
                            Display All Payments and Each Payment Details section
                            Component
                            DisplayPayment.Com.js
                        */}
                        <DisplayPaymentSection />

                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    auth: state.auth || {},
});


export default connect(mapStateToProps, null)(withRouter(Payments));