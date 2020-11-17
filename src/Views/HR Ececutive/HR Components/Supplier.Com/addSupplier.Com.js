import React from "react";
import { withRouter } from "react-router-dom";
import {FormInput  } from '../../../../Components/Form'
import {  Button, Card , Form , Image , OverlayTrigger , Tooltip , Popover } from 'react-bootstrap';
import { connect } from 'react-redux';
import CONFIG from '../../../../Controllers/Config.controller';
// import SelectSearch from 'react-select-search';
import Supplier_CONTROLLER from '../../../../Controllers/HR Staff/Supplier.controller';
import { ComponentToPrint } from '././PrintAllSuppliers';
import ReactToPrint from 'react-to-print';

 
class addSupplierCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addSupplierState: false,
            printSupplierState: false,

            name:'',
            address:'',
            phoneNo:'',
            email:'',
            errors : {},
            error_message : '',

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

        if (this.validate()) {
            var data = {
                name: this.state.name,
                address: this.state.address,
                phoneNo: this.state.phoneNo,
                email: this.state.email,
            }

            const result = await Supplier_CONTROLLER.addSupplier(data, this.props.auth.token);

            if(result.status == 201){
                CONFIG.setToast("Successfully Added");
                this.clear();
            }else{
                CONFIG.setErrorToast(" Somthing Went Wrong!");
                this.clear();
            }
        }
    }

    clear = ()=>{
        this.setState({
            name:'' ,
            email:'' ,
            address:'' ,
            phoneNo: '',
        })

        this.change_toggle();
    }

    render() {
        const {errors } = this.state;
        return (
            <div>
                {/* Title and the add new customer button */}
                <div className="row" style={{marginTop:"5px", fontFamily:"sans-serif", marginBottom:"15px"}}>
                        <div className="col-sm-9">
                            <div className="row">
                                <div className="col-sm">
                                    <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Supplier Details<br></br>
                                    <span className="text-muted small">Dashboard / Suppliers</span></h6>
                                </div>
                                <div className="col-sm">
                                    <div className="row">
                                        <ReactToPrint
                                            trigger={() => {
                                                return <Image src="/images/printer.png" className="d-none d-lg-block" style={{width:"40px", marginTop:"10px", marginLeft:"10px", cursor:"pointer"}} rounded />;
                                            }}
                                            content={() => this.componentRef}
                                        />
                                        <>
                                        {['bottom'].map((placement) => (
                                            <OverlayTrigger
                                            trigger="click"
                                            key={placement}
                                            placement={placement}
                                            overlay={
                                                <Popover id={`popover-positioned-${placement}`}>
                                                <Popover.Title as="h3">{`Quick Email`}</Popover.Title>
                                                <Popover.Content>
                                                    <Form>
                                                        <Form.Group controlId="exampleForm.ControlInput1">
                                                            <Form.Label>Email address</Form.Label>
                                                            <Form.Control type="email" placeholder="name@example.com" />
                                                        </Form.Group>
                                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                                            <Form.Label>Message</Form.Label>
                                                            <Form.Control as="textarea" rows={3} />
                                                        </Form.Group>
                                                        <Button style={{backgroundColor:"#7800B7", color:"#FFFFFF", cursor: 'pointer'}}  className="btn mt-2 form-control btn btn-sm ">Send</Button>
                                                    </Form>
                                                </Popover.Content>
                                                </Popover>
                                            }
                                            >
                                            <Image src="/images/email.png" className="d-none d-lg-block" style={{width:"40px", marginTop:"10px", marginLeft:"10px", cursor:"pointer"}} rounded />
                                            </OverlayTrigger>
                                        ))}
                                        </>
                                    </div>
                                </div>
                               
                            </div>
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
                                                                        value={this.state.name}
                                                                        name="name"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                    {errors.name && errors.name.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.name}</h4>}
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'Email *'}
                                                                        type="Email"
                                                                        placeholder={"Enter Supplier's Email"}
                                                                        value={this.state.email}
                                                                        name="email"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                    {errors.email && errors.email.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.email}</h4>}
                                                                </div>
                                                        </div>

                                                        <div className="row">
                                                                <div className="col-12 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'Address *'}
                                                                        placeholder={"Enter Supplier's Address"}
                                                                        value={this.state.address}
                                                                        name="address"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                    {errors.address && errors.address.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.address}</h4>}
                                                                </div>
                                                        </div>
    
                                                    </div>

                                                    <div className="col-sm-4">

                                                        <div className="row">
                                                            <div className="col-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={"Contact Number *"}
                                                                    type="Number"
                                                                    placeholder={"Enter Supplier's Contact No"}
                                                                    value={this.state.phoneNo}
                                                                    name="phoneNo"
                                                                    onChange={this.formValueChange}
                                                                />
                                                                {errors.phoneNo && errors.phoneNo.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.phoneNo}</h4>}
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                    {/* <SelectSearch options={options} value="sv" name="language" placeholder="Choose your language" /> */}
                                                </div>

                                                <div className="row"> 
                                                        <div className="col-6 mt-3 mb-1" >
                                                        <button type="submit" style={{backgroundColor:"#475466" , color:"#FFFFFF",  cursor: 'pointer'}} className="btn mt-2 btn btn-sm px-5">Submit</button>
                                                        <button type="button" style={{backgroundColor:"red",marginLeft:"10px", color:"#FFFFFF", cursor: 'pointer'}} onClick={() => this.clear()} className="btn mt-2 btn btn-sm px-5">Cancel</button>
                                                        </div>
                                                </div>

                                                
                                            </form>
                                        </div>

                                </Card.Body>
                            </Card>
                        </div>
                    </div>

                    {/* print all suppliers */}
                    <div className="row" style={{ display: this.state.printSupplierState == true ? 'block' : 'none', marginBottom:"15px" }}>
                    <ComponentToPrint
                        proid={this.props.auth.token}
                        HRname = {this.props.auth.user.user_details.username}
                        ref={el => (this.componentRef = el)} />
                    </div>
            </div>
        );
    }

    validate = () => {
        let { errors, name, address, phoneNo, email } = this.state;
        let count = 0;

        if (name.length === 0) {
            errors.name =  'Supplier Name can not be empty !'
            count++
        } else {
            errors.name = ''
        }

        if (address.length === 0) {
            errors.address =  'Address can not be empty !'
            count++
        } else {
            errors.address = ''
        }

        if (phoneNo.length === 0) {
            errors.phoneNo = "Contact Number can not be empty"
            count++
        } else {
            if(phoneNo.length < 10){
                errors.phoneNo = "Need 10 Digits for a number"
                count++
            }else{
                errors.phoneNo = ""
            }
        }

        if (email.length === 0) {
            errors.email =  'Email can not be empty !'
            count++
        } else {
            errors.email = ''
        }

        this.setState({ errors });
        return count == 0;
    }





}

const options = [
    {name: 'Swedish', value: 'sv'},
    {name: 'English', value: 'en'},
    {
        type: 'group',
        name: 'Group name',
        items: [
            {name: 'Spanish', value: 'es'},
        ]
    },
];

const mapStateToProps = state => ({
    auth: state.auth || {},
});
 
  
export default connect(mapStateToProps, null)(withRouter(addSupplierCom));