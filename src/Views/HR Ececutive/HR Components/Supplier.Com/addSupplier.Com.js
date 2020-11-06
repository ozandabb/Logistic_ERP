import React from "react";
import { withRouter } from "react-router-dom";
import {FormInput  } from '../../../../Components/Form'
import {  Button, Card , Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import CONFIG from '../../../../Controllers/Config.controller';


import Supplier_CONTROLLER from '../../../../Controllers/HR Staff/Supplier.controller';

class addSupplierCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addSupplierState: false,

            name:'',
            address:'',
            phoneNo:'',
            email:'',

        };
    }

    change_toggle = () => {
        if (this.state.addSupplierState) {
            this.setState({ addSupplierState: false })
        } else {
            this.setState({ addSupplierState: true })
        }
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }

    onFormSubmit = async (e) => {
        e.preventDefault();

        var data = {
            name: this.state.name,
            address: this.state.address,
            phoneNo: this.state.phoneNo,
            email: this.state.email,
        }

        const result = await Supplier_CONTROLLER.addSupplier(data, this.props.auth.token);

        if(result.status == 200){
            CONFIG.setToast("Successfully Added");
            this.clear();
        }
    }

    clear = ()=>{
        this.setState({
            name:'' ,
            email:'' ,
            address:'' ,
            phoneNo: '',
        })

        if (this.state.addSupplierState) {
            this.setState({ addSupplierState: false })
        } else {
            this.setState({ addSupplierState: true })
        }
    }

    render() {
        return (
            <div>
                {/* Title and the add new customer button */}
                <div className="row" style={{marginTop:"5px", fontFamily:"sans-serif", marginBottom:"15px"}}>
                        <div className="col-sm-9">
                            <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Supplier Details<br></br>
                            <span className="text-muted small">Dashboard / Suppliers</span></h6>
                        </div>
                        <div className="col-sm-3">
                            <Button variant="" style={{backgroundColor:"#475466" , color:"#FFFFFF", width:"100%",  cursor: 'pointer'}} onClick={() => this.change_toggle()}>Add new Supplier</Button>
                        </div>
                    </div>

                    {/* Add customer form toggle */}
                    <div className="row" style={{ display: this.state.addSupplierState == true ? 'block' : 'none', marginBottom:"15px" }}>
                        <div className="col-12">
                            <Card className="col-12">
                                <Card.Body>

                                        <div className="col-12 bg-white mt-1 pb-1" >
                                            <form onSubmit={(e) => this.onFormSubmit(e)}>
                                                <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Supplier Details<br></br>
                                                <span className="text-muted small">You can add a new Supplier by filling relavant Information</span></h6>
                                           
                                                <div className="row" >
                                                    <div className="col-sm-8">
                                                        
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'Supplier Name *'}
                                                                        placeholder={"Enter Supplier's Name"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.name}
                                                                        name="name"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'Email *'}
                                                                        placeholder={"Enter Supplier's Email"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.email}
                                                                        name="email"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                        </div>

                                                        <div className="row">
                                                                <div className="col-12 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'Address *'}
                                                                        placeholder={"Enter Supplier's Address"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.address}
                                                                        name="address"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                        </div>
    
                                                    </div>

                                                    <div className="col-sm-4">

                                                        <div className="row">
                                                            <div className="col-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={"Contact Number *"}
                                                                    placeholder={"Enter Supplier's Contact No"}
                                                                    //error={ errors.group_mo}
                                                                    value={this.state.phoneNo}
                                                                    name="phoneNo"
                                                                    onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                />
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>

                                                <div className="row"> 
                                                        <div className="col-6 mt-3 mb-1" >
                                                        <button type="submit" style={{backgroundColor:"#475466" , color:"#FFFFFF",  cursor: 'pointer'}} className="btn mt-2 btn btn-sm px-5">Submit</button>
                                                        <button type="submit" style={{backgroundColor:"red",marginLeft:"10px", color:"#FFFFFF", cursor: 'pointer'}} onClick={() => this.clear()} className="btn mt-2 btn btn-sm px-5">Cancel</button>
                                                        </div>
                                                </div>

                                                
                                            </form>
                                        </div>

                                </Card.Body>
                            </Card>
                        </div>
                    </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    auth: state.auth || {},
  });
 
  
export default connect(mapStateToProps, null)(withRouter(addSupplierCom));