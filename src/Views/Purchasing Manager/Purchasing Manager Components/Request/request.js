import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Tab, Tabs } from 'react-bootstrap';
import Purchase_Sidebar from "../../sidebar.purchase";
import {PurchasingManagerLeaveRequest} from './Leave/leave';
class PurchasingManagerRequest extends Component {


    constructor(props){
        super(props);
        console.log(props.auth.user.user_details);
    }
    render() {
        return (
            <div className="bg-light wd-wrapper">
                <Purchase_Sidebar activemenu={'PurchasingManagerRequest'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid" style={{paddingLeft:30}}>
                        <Tabs defaultActiveKey="leave" id="uncontrolled-tab-example">
                            <Tab eventKey="leave" title="Leave Request">
                            <PurchasingManagerLeaveRequest 
                                token={this.props.auth.token}
                                id={this.props.auth.user.user_details.id}
                            />
                            </Tab>
                            <Tab eventKey="salary" title="Salary Advance Request">

                            </Tab>
                            <Tab eventKey="loan" title="Loan Request">

                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth || {},
  });
 
  
export default connect(mapStateToProps, null)(withRouter(PurchasingManagerRequest));
