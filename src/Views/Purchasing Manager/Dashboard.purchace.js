import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Purchase_Sidebar from "./sidebar.purchase";

class PurchaseManagerDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
    }


    render() {
        return (
            <div className="bg-light wd-wrapper">
                <Purchase_Sidebar activemenu={'DASHBOARD'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">
                        <h4>Purchasing Manager Dashboard</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(PurchaseManagerDashboard);
