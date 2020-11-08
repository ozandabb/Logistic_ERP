import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {FormInput  } from '../../../../Components/Form'
import { Tab , Row , Col, Nav , Card , InputGroup , FormControl, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import ScrollArea from 'react-scrollbar'
import CONFIG from '../../../../Controllers/Config.controller';
import Supplier_CONTROLLER from '../../../../Controllers/HR Staff/Supplier.controller';

class DetailsEachSupplierCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
            name:'',
            address:'',
            phoneNo:'',
            email:'',

        };

    }

    async componentDidMount() {
        const res = await Supplier_CONTROLLER.getSupplierByID(this.props.SUP_ID, this.props.auth.token);
        // this.setState({
        //     supplierList: res.data.rows,
        // });
    }

    formValueChange = (e) => {
        this.setState({
            name : e.target.name,
            address : e.target.address
          });
    }

    onFormSubmit = async (e) => {
        e.preventDefault();
        

        var data = {
            name: this.state.name,
            address: this.state.address,
            phoneNo: this.state.phoneNo,
            email: this.state.email,
        }

        // const result = await Supplier_CONTROLLER.UpdateSupplier(data, this.props.auth.token);

        // if(result.status == 200){
        //     CONFIG.setToast("Successfully Added");
        //     this.clear();
        // }
    }

    render() {
        const {id } = this.state;

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
                    {/* <form onSubmit={(e) => this.onFormSubmit(e)}> */}
                        <div className="row ml-3 mt-1">
                        <div className="col-sm" style={{paddingRight:"50px"}}>
                            <div className="row">
                                <div className="col-sm">
                                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Update {this.props.name} Details<br></br>
                                    <span className="text-muted small">You can Update or Delete each Supplier</span></h6>
                                </div>
                            </div>
                        

                                <div className="row">
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={'Customer Name *'}
                                            placeholder={"Select one Supplier"}
                                            //error={ errors.group_mo}
                                            value={this.props.SUP_ID}
                                            name="name"
                                            onChange={(e) => this.formValueChange(e)}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={"Contact Number *"}
                                            placeholder={"Select one Supplier"}
                                            //error={ errors.group_mo}
                                            value={this.props.phoneNo}
                                            name="phoneNo"
                                            onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                </div>

                                <div className="row">
     
                                    <div className="col-sm-12 mt-1 mb-1" >
                                        <FormInput 
                                            label={'Address *'}
                                            placeholder={"Select one Supplier"}
                                            //error={ errors.group_mo}
                                            value={this.props.address}
                                            name="address"
                                            onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mt-1 mb-1" >
                                        <FormInput 
                                            label={"Email *"}
                                            placeholder={"Select one Supplier"}
                                            //error={ errors.group_mo}
                                            value={this.props.email}
                                            name="email"
                                            onChange={this.formValueChange}
                                            //error_meesage={'*Group Number required'}
                                        />
                                    </div>
                                </div>

                        </div>
                        </div>
                        

                        <div className="row ml-3 mt-1">
                            <div className="col-6 mt-3 mb-5" >
                                <button type="submit" style={{backgroundColor:"#475466" , color:"#FFFFFF",  cursor: 'pointer'}} className="btn mt-2 btn btn-sm px-5">Update</button>
                                <button  style={{backgroundColor:"red",marginLeft:"10px", color:"#FFFFFF", cursor: 'pointer'}}  className="btn mt-2 btn btn-sm px-5">Delete</button>
                            </div>
                        </div>

                     {/* </form> */}
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
 
  
export default connect(mapStateToProps, null)(withRouter(DetailsEachSupplierCom));