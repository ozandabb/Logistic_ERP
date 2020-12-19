import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AccSidebar from "./Sidebar.Assi.Acc";
import { connect } from 'react-redux';
import DisplayDepreciationBookSection from "./Components/DepreciationBook.Com/DisplayDepreciationBook.Com";

class DepreciationBook extends Component {
    render() {
        return (
            <div className="bg-light wd-wrapper">
                <AccSidebar activemenu={'DEPRECIATION_BOOK'} />
                <div className="wrapper-wx" style={{ height: "100hv" }}>
                    <div className="container-fluid">

                        {/* 
                            Display All Payments and Each Payment Details section
                            Component
                            DisplayPayment.Com.js
                        */}
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm">
                                <DisplayDepreciationBookSection />
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


export default connect(mapStateToProps, null)(withRouter(DepreciationBook));