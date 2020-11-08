import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ManageTeam_Sidebar from "./Sidebar.Mangement";

class ManageTeamDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
    }


    render() {
        return (
            <div className="bg-light wd-wrapper">
                <ManageTeam_Sidebar activemenu={'DASHBOARD'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">
                        <h4>Accountant Dashboard</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ManageTeamDashboard);
