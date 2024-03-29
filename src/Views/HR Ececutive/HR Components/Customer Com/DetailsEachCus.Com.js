import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {FormInput  } from '../../../../Components/Form'
import { Tab , Row , Col, Nav , Card , InputGroup , FormControl, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import ScrollArea from 'react-scrollbar'
import moment from 'moment';
import CUST_CONTROLLER from '../../../../Controllers/HR Staff/Customer.controller';

class DetailsEachCusCom extends React.Component {

    render() {
        return (
            <div>

                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Basic Information</a>
                        <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Payment History</a>
                        <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Statistics</a>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    {/* basic information tab start here */}
                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div className="row ml-3 mt-1">
                            <div className="col-sm-8">
                                <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Update {this.props.CusName} Details<br></br>
                                <span className="text-muted small">You can Update or Delete each Customer</span></h6>

                                <div className="row">
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={'Customer Name *'}
                                            placeholder={"Select one Customer"}
                                            //error={ errors.group_mo}
                                            value={this.props.CusName}
                                            name="name"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={"Username *"}
                                            placeholder={"Select one Customer"}
                                            //error={ errors.group_mo}
                                            value={this.props.cus_username}
                                            name="username"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={'Email *'}
                                            placeholder={"Select one Customer"}
                                            //error={ errors.group_mo}
                                            value={this.props.cus_email}
                                            name="email"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={"NIC *"}
                                            placeholder={"Select one Customer"}
                                            //error={ errors.group_mo}
                                            value={this.props.cus_nic}
                                            name="nic"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6  mt-1 mb-1" >
                                        <FormInput 
                                            label={"Contact Number *"}
                                            placeholder={"Select one Customer"}
                                            //error={ errors.group_mo}
                                            value={this.props.cus_phone}
                                            name="phone"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                    <div className="col-md-6  mt-1 mb-1" >
                                        <FormInput 
                                            label={"Date of Birth *"}
                                            //error={ errors.group_mo}
                                            value={this.props.cus_dob}
                                            placeholder={"Select one Customer"}
                                            name="dob"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 mt-1 mb-1" >
                                        <FormInput 
                                            label={"Address *"}
                                            placeholder={"Select one Customer"}
                                            //error={ errors.group_mo}
                                            value={this.props.cus_address}
                                            name="address"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div> 
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={"Postal Code *"}
                                            placeholder={"Select one Customer"}
                                            //error={ errors.group_mo}
                                            value={this.props.cus_postal}
                                            name="postal_code"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={'City *'}
                                            placeholder={"Select one Customer"}
                                            //error={ errors.group_mo}
                                            value={this.props.cus_city}
                                            name="city"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                        <div className="col-md-6 mt-1 mb-1" >
                                            <FormInput 
                                                label={"Credit Limit *"}
                                                placeholder={"Select one Customer"}
                                                //error={ errors.group_mo}
                                                value={this.props.cus_credit}
                                                name="credit_limit"
                                                //onChange={this.formValueChange}
                                                //error_meesage={'*Group Number required'}
                                            />
                                        </div>
                                </div>
                                
                            </div>
                            <div className="col-sm-4">
                                <Image src="/images/isaiah_1.jpg" className="img-fluid" style={{ padding:"20px"}} roundedCircle />
                               
                                <div className="row">
                                    <div className="col-sm">
                                        <div className="col-12 mt-1 mb-1" >
                                            <FormInput 
                                                label={"Latitude *"}
                                                placeholder={"Select one Customer"}
                                                //error={ errors.group_mo}
                                                value={this.props.cus_lat}
                                                name="lat"
                                                //onChange={this.formValueChange}
                                                //error_meesage={'*Group Number required'}
                                            />
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="row">
                                    <div className="col-sm">
                                        <div className="col-12 mt-1 mb-1" >
                                            <FormInput 
                                                label={"Longitude *"}
                                                placeholder={"Select one Customer"}
                                                //error={ errors.group_mo}
                                                value={this.props.cus_long}
                                                name="long"
                                                //onChange={this.formValueChange}
                                                //error_meesage={'*Group Number required'}
                                            />
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>

                        </div>
                        <div className="row ml-3 mt-1">
                            <div className="col-6 mt-3 mb-5" >
                                <button type="submit" style={{backgroundColor:"#475466" , color:"#FFFFFF",  cursor: 'pointer'}} className="btn mt-2 btn btn-sm px-5">Update</button>
                                <button type="submit" style={{backgroundColor:"red",marginLeft:"10px", color:"#FFFFFF", cursor: 'pointer'}}  className="btn mt-2 btn btn-sm px-5">Delete</button>
                            </div>
                        </div>

                    </div>
                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"> 
                        fff
                    </div>
                    <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                        ff
                    </div>
                </div>
                
            </div>
        );
    }
}


const mapStateToProps = state => ({
    auth: state.auth || {},
  });
 
  
export default connect(mapStateToProps, null)(withRouter(DetailsEachCusCom));