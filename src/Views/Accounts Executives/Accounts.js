import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AccSidebar from "./Sidebar.Acc.Exe";
import { connect } from 'react-redux';
import DisplayAccountSection from "./Components/Account.Com/DisplayAccount.Com";

class Accounts extends Component {
    render() {
        return (
            <div className="bg-light wd-wrapper">
                <AccSidebar activemenu={'ACCOUNTS'} />
                <div className="wrapper-wx" style={{ height: "100hv" }}>
                    <div className="container-fluid">

                        {/* 
                            Display All Accounts and Each Account Details section
                            Component
                            DisplayAccount.Com.js
                        */}
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm">
                                <DisplayAccountSection />
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


export default connect(mapStateToProps, null)(withRouter(Accounts));