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

class DetailsEachVehicleCom extends React.Component {

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
                            <div className="col-sm-8">
                                <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Update {this.props.CusName} Details<br></br>
                                <span className="text-muted small">You can Update or Delete each Vehicle</span></h6>

                                <div className="row">
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={'Vehicle Name *'}
                                            placeholder={"Select one Vehicle"}
                                            //error={ errors.group_mo}
                                            value={this.props.VEHICLE_NAME}
                                            name="vehicle_name"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={"Year *"}
                                            placeholder={"Select one Vehicle"}
                                            //error={ errors.group_mo}
                                            value={this.props.VEHICLE_YEAR}
                                            name="vehicle_year"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={'Vehicle Type *'}
                                            placeholder={"Select one Vehicle"}
                                            //error={ errors.group_mo}
                                            value={this.props.VEHICLE_TYPE}
                                            name="vehicle_type"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={"Vehicle Number *"}
                                            placeholder={"Select one Vehicle"}
                                            //error={ errors.group_mo}
                                            value={this.props.VEHICLE_NUMBER}
                                            name="vehicle_number"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6  mt-1 mb-1" >
                                        <FormInput 
                                            label={"Weight *"}
                                            placeholder={"Select one Vehicle"}
                                            //error={ errors.group_mo}
                                            value={this.props.VEHICLE_WEIGHT}
                                            name="weight"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                    <div className="col-md-6  mt-1 mb-1" >
                                        <FormInput 
                                            label={"Mileage *"}
                                            //error={ errors.group_mo}
                                            value={this.props.VEHICLE_MILEAGE}
                                            placeholder={"Select one Vehicle"}
                                            name="mileage"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 mt-1 mb-1" >
                                        <FormInput 
                                            label={"Description *"}
                                            placeholder={"Select one Vehicle"}
                                            //error={ errors.group_mo}
                                            value={this.props.VEHICLE_DESCRIPTION}
                                            name="description"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div> 
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={"Insurance Number *"}
                                            placeholder={"Select one Vehicle"}
                                            //error={ errors.group_mo}
                                            value={this.props.VEHICLE_INSUARANCE_NUMBER}
                                            name="insurance_number"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={'Insurance Renew Date *'}
                                            placeholder={"Select one Vehicle"}
                                            //error={ errors.group_mo}
                                            value={this.props.VEHICLE_INSU_RENEW_DATE}
                                            name="insurance_renew_date"
                                            //onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                        <div className="col-md-6 mt-1 mb-1" >
                                            <FormInput 
                                                label={"Service Due Date *"}
                                                placeholder={"Select one Vehicle"}
                                                //error={ errors.group_mo}
                                                value={this.props.VEHICLE_SERVICE_DUE}
                                                name="service_due"
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
                                                label={"License Number *"}
                                                placeholder={"Select one Customer"}
                                                //error={ errors.group_mo}
                                                value={this.props.VEHICLE_LI_NUM}
                                                name="licen_number"
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
                                                label={"License Renew Date *"}
                                                placeholder={"Select one Customer"}
                                                //error={ errors.group_mo}
                                                value={this.props.VEHICLE_LI_RENEW_DATE}
                                                name="licen_renew_date"
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
 
  
export default connect(mapStateToProps, null)(withRouter(DetailsEachVehicleCom));