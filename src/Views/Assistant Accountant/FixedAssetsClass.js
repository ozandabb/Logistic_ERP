import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AccSidebar from "./Sidebar.Assi.Acc";
import { connect } from 'react-redux';
import DisplayFixedAssetsClassSection from "./Components/FixedAssetsClass.Com/DisplayFixedAssetsClass.Com";

class FixedAssetsClass extends Component {
    render() {
        return (
            <div className="bg-light wd-wrapper">
                <AccSidebar activemenu={'FIXED_ASSETS'} submenu={'FIXED_ASSETS_CLASS'} />

                <div className="wrapper-wx" style={{ height: "100hv" }}>
                    <div className="container-fluid">

                        {/* 
                            Display All Payments and Each Payment Details section
                            Component
                            DisplayPayment.Com.js
                        */}
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm">
                                <DisplayFixedAssetsClassSection />
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


export default connect(mapStateToProps, null)(withRouter(FixedAssetsClass));