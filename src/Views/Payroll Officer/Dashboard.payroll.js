import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PAYROLL_Sidebar from "./sidebar.payroll";
import { Image } from 'react-bootstrap';

class PayrollDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
    }


    render() {
        return (
            <div className="bg-light wd-wrapper">
                <PAYROLL_Sidebar activemenu={'DASHBOARD'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">

                        <div className="row" >
                            <div className="col-sm shadow" style={{ backgroundColor:"#FFFFFF", margin:"20px", padding:"20px"}}>
                                <div className="row" >
                                    <div className="col-sm-3">
                                    <Image src="/images/money.png" style={{width:"50px",height:"50px" }} rounded />
                                    </div>
                                    <div className="col-sm-9">
                                        <h6 style={{fontFamily:"sans-serif", fontWeight:"bold",  color:"#9F9F9F"}}>Total Payroll</h6>
                                        <h3 style={{fontFamily:"sans-serif", fontWeight:"bold",  color:"#00D19D", marginTop:"0px"}}>230,890 LKR</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm shadow" style={{ backgroundColor:"#FFFFFF", margin:"20px", padding:"20px"}}>
                                <div className="row" >
                                    <div className="col-sm-3">
                                    <Image src="/images/Annual.png" style={{width:"50px",height:"50px" }} rounded />
                                    </div>
                                    <div className="col-sm-9">
                                        <h6 style={{fontFamily:"sans-serif", fontWeight:"bold",  color:"#9F9F9F"}}>Employee Earnings</h6>
                                        <h3 style={{fontFamily:"sans-serif", fontWeight:"bold",  color:"#F94700", marginTop:"0px"}}>230,890 LKR</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm shadow" style={{ backgroundColor:"#FFFFFF", margin:"20px", padding:"20px"}}>
                                <div className="row" >
                                    <div className="col-sm-3">
                                    <Image src="/images/smartphone.png" style={{width:"50px",height:"50px" }} rounded />
                                    </div>
                                    <div className="col-sm-9">
                                        <h6 style={{fontFamily:"sans-serif", fontWeight:"bold",  color:"#9F9F9F"}}>Employee Deductions</h6>
                                        <h3 style={{fontFamily:"sans-serif", fontWeight:"bold",  color:"#5301F5", marginTop:"0px"}}>230,890 LKR</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm shadow" style={{ backgroundColor:"#FFFFFF", margin:"20px", padding:"20px"}}>
                                <div className="row" >
                                    <div className="col-sm-3">
                                    <Image src="/images/admin.Categories.png" style={{width:"50px",height:"50px" }} rounded />
                                    </div>
                                    <div className="col-sm-9">
                                        <h6 style={{fontFamily:"sans-serif", fontWeight:"bold",  color:"#9F9F9F"}}>This Month Payroll</h6>
                                        <h3 style={{fontFamily:"sans-serif", fontWeight:"bold",  color:"#F4E102", marginTop:"0px"}}>230,890 LKR</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(PayrollDashboard);
