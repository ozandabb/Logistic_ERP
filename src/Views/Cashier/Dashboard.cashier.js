import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Cashier_sidebar from "./Sidebar.Cashier";

class cashierDash extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
    }


    render() {
        return (
            <div className="bg-light wd-wrapper">
                <Cashier_sidebar activemenu={'DASHBOARD'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">
                        <h4>Accountant Dashboard</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(cashierDash);
