import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Backoffice_Sidebar from "./Sidebar.Backoffice";

class BacOfficeDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
    }


    render() {
        return (
            <div className="bg-light wd-wrapper">
                <Backoffice_Sidebar activemenu={'DASHBOARD'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">
                        <h4>Accountant Dashboard</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(BacOfficeDashboard);
