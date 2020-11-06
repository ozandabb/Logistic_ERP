import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {FormInput  } from '../../../../Components/Form'
import { Tab , Row , Col, Nav , Card , InputGroup , FormControl, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import ScrollArea from 'react-scrollbar'
import moment from 'moment';
// import CUST_CONTROLLER from '../../../../Controllers/Customer.controller';

class DetailsEachEmployeeCom extends React.Component {

    render() {
        return (
            <div>

                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Basic Information</a>
                        <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Payment History</a>
                        <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Statistics</a>
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    {/* basic information tab start here */}
                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div className="row ml-3 mt-1">
                            <div className="col-sm-12">
                                <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Update {this.props.Emp_fullname} Details<br></br>
                                <span className="text-muted small">You can Update or Delete each Customer</span></h6>
                            </div></div>
                        <div className="row ml-3 mt-1">
                            <div className="col-sm-8">
                               

                                <div className="row">
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={'Employee Name *'}
                                            placeholder={"Select one Employee"}
                                            //error={ errors.group_mo}
                                            value={this.props.Emp_fullname}
                                            name="name"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={"Employee Number *"}
                                            placeholder={"Select one Employee"}
                                            //error={ errors.group_mo}
                                            value={this.props.Emp_no}
                                            name="username"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={'Gender *'}
                                            //error={ errors.group_mo}
                                            placeholder={"Select one Employee"}
                                            value={this.props.Emp_gender}
                                            name="email"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={"Date of Birth *"}
                                            //error={ errors.group_mo}
                                            value={this.props.Emp_dob}
                                            placeholder={"Select one Employee"}
                                            name="nic"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6  mt-1 mb-1" >
                                        <FormInput 
                                            label={"Marital Status  *"}
                                            //error={ errors.group_mo}
                                            value={this.props.Emp_marital}
                                            placeholder={"Select one Employee"}
                                            name="phone"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                    <div className="col-md-6  mt-1 mb-1" >
                                        <FormInput 
                                            label={"Spouse Name  *"}
                                            //error={ errors.group_mo}
                                            placeholder={"Select one Employee"}
                                            value={this.props.Emp_spouse}
                                            name="spouse_name"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 mt-1 mb-1" >
                                        <FormInput 
                                            label={"Address *"}
                                            //error={ errors.group_mo}
                                            value={this.props.Emp_address}
                                            placeholder={"Select one Employee"}
                                            name="address"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div> 
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={"City *"}
                                            //error={ errors.group_mo}
                                            value={this.props.Emp_city}
                                            placeholder={"Select one Employee"}
                                            name="postal_code"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={'Zip Code *'}
                                            placeholder={"Select one Employee"}
                                            //error={ errors.group_mo}
                                            value={this.props.Emp_zip}
                                            name="city"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={"Mobile Number *"}
                                            placeholder={"Select one Employee"}
                                            //error={ errors.group_mo}
                                            value={this.props.Emp_phone}
                                            name="postal_code"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={'Land Number *'}
                                            placeholder={"Select one Employee"}
                                            //error={ errors.group_mo}
                                            value={this.props.Emp_homePhone}
                                            name="city"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={"Department *"}
                                            //error={ errors.group_mo}
                                            value={this.props.Emp_dept}
                                            placeholder={"Select one Employee"}
                                            name="postal_code"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={'Designation *'}
                                            //error={ errors.group_mo}
                                            value={this.props.Emp_desig}
                                            placeholder={"Select one Employee"}
                                            name="city"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={"Service Location *"}
                                            //error={ errors.group_mo}
                                            value={this.props.cus_ser_locat}
                                            placeholder={"Select one Employee"}
                                            name="postal_code"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={'System Access *'}
                                            //error={ errors.group_mo}
                                            placeholder={"Select one Employee"}
                                            value={this.props.Emp_sys_access}
                                            name="city"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                </div>
                              
                                
                            </div>
                            <div className="col-sm-4">
                               
                                <div className="row">
                                    <div className="col-sm">
                                        <div className="col-12 mt-1 mb-1" >
                                            <FormInput 
                                                label={"Basic Salary *"}
                                                //error={ errors.group_mo}
                                                value={this.props.Emp_salary}
                                                placeholder={"Select one Employee"}
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
                                                label={"Bank Name *"}
                                                //error={ errors.group_mo}
                                                value={this.props.Emp_bankName}
                                                placeholder={"Select one Employee"}
                                                name="long"
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
                                                label={"Branch Name *"}
                                                //error={ errors.group_mo}
                                                value={this.props.Emp_branch_name}
                                                placeholder={"Select one Employee"}
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
                                                label={"Account Holder *"}
                                                //error={ errors.group_mo}
                                                value={this.props.Emp_holder_name}
                                                placeholder={"Select one Employee"}
                                                name="long"
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
                                                label={"Account Number *"}
                                                //error={ errors.group_mo}
                                                value={this.props.Emp_accout_number}
                                                placeholder={"Select one Employee"}
                                                name="lat"
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
                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"> 
                        fff
                    </div>
                    <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
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
 
  
export default connect(mapStateToProps, null)(withRouter(DetailsEachEmployeeCom));