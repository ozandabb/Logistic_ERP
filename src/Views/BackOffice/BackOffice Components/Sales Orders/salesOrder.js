import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import BackOfficeSidebar from "../../Sidebar.Backoffice";
import {  Card } from 'react-bootstrap';
import { connect } from 'react-redux';

class SalesOrder extends Component {   
    render() {
        return (
            <div className="bg-light wd-wrapper">
                <BackOfficeSidebar activemenu={'SalesOrder'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">

                        <div class="row">
                            <div class="col-sm" >
                                <Card style={{height:"600px"}}>
                                    <h6 style={{ padding:"20px",marginBottom:"0px", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>Pending Orders</h6>
                                    <hr style={{marginTop:"0px"}}></hr>
                                </Card>
                            </div>
                            <div class="col-sm">
                                <Card style={{height:"600px"}}>
                                    <h6 style={{ padding:"20px",marginBottom:"0px", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>Completed Orders</h6>
                                    <hr style={{marginTop:"0px"}}></hr>
                                </Card>
                            </div>
                            <div class="col-sm">
                                <Card style={{height:"600px"}}>
                                    <h6 style={{ padding:"20px",marginBottom:"0px", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>Rejected Orders</h6>
                                    <hr style={{marginTop:"0px"}}></hr>
                                </Card>
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
 
  
export default connect(mapStateToProps, null)(withRouter(SalesOrder));