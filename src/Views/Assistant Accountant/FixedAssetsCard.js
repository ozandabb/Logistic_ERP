import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AccSidebar from "./Sidebar.Assi.Acc";
import { connect } from 'react-redux';
import DisplayFixedAssetsCardSection from "./Components/FixedAssetsCard.Com/DisplayFixedAssetsCard.Com";
class FixedAssetsCard extends Component {
    render() {
        return (
            <div className="bg-light wd-wrapper">
                <AccSidebar activemenu={'FIXED_ASSETS'} submenu={'FIXED_ASSETS_CARD'} />

                <div className="wrapper-wx" style={{ height: "100hv" }}>
                    <div className="container-fluid">

                        {/* 
                            Display All Payments and Each Payment Details section
                            Component
                            DisplayPayment.Com.js
                        */}
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm">
                                <DisplayFixedAssetsCardSection />
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


export default connect(mapStateToProps, null)(withRouter(FixedAssetsCard));