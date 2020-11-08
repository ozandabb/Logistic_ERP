import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Sidebar_Assi_Acc from "./Sidebar.Assi.Acc";

class Accoun_Assi_Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
    }


    render() {
        return (
            <div className="bg-light wd-wrapper">
                <Sidebar_Assi_Acc activemenu={'DASHBOARD'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">
                        <h4>Assistant Accountant</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Accoun_Assi_Dashboard);
