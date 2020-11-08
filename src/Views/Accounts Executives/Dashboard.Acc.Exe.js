import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Account_execu_Sidebar from "./Sidebar.Acc.Exe";

class Account_Executive_Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
    }


    render() {
        return (
            <div className="bg-light wd-wrapper">
                <Account_execu_Sidebar activemenu={'DASHBOARD'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">
                        <h4>Account Executive</h4>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Account_Executive_Dashboard);
