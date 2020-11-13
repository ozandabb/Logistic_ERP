import React from "react";
import { withRouter } from "react-router-dom";
import { FormInput } from '../../../../Components/Form'
import { Button, Card, Form, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import CONFIG from '../../../../Controllers/Config.controller';


import Payment_CONTROLLER from '../../../../Controllers/AccountsExecutives/Payment.controller';

class addPaymentCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addPaymentState: false,

            icon_id: '',
            name: '',
            type: '',
            description: '',
            added_by: '',

        };
    }

    change_toggle = () => {
        if (this.state.addPaymentState) {
            this.setState({ addPaymentState: false })
        } else {
            this.setState({ addPaymentState: true })
        }
    }

    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onFormSubmit = async (e) => {
        e.preventDefault();

        var data = {
            icon_id: this.state.icon_id,
            name: this.state.name,
            type: this.state.type,
            description: this.state.description,
            added_by: this.state.added_by,
        }

        const result = await Payment_CONTROLLER.addPayment(data, this.props.auth.token);

        if (result.status == 201) {
            CONFIG.setToast("Successfully Added");
            this.clear();
        } else {
            CONFIG.setErrorToast(" Somthing Went Wrong!");
            this.clear();
        }
    }

    clear = () => {
        this.setState({
            icon_id: '',
            name: '',
            type: '',
            description: '',
            added_by: '',
        })

        this.change_toggle();
    }

    render() {
        return (
            <div>
                {/* Title and the add new customer button */}
                <div className="row" style={{ marginTop: "5px", fontFamily: "sans-serif", marginBottom: "15px" }}>
                    <div className="col-sm-9">
                        <div className="row">
                            <div className="col-sm">
                                <h6 style={{ paddingTop: "10px", paddingLeft: "5px" }}>Payment Details<br></br>
                                    <span className="text-muted small">Dashboard / Payments</span></h6>
                            </div>
                            <div className="col-sm">
                                {['bottom'].map((placement) => (
                                    <OverlayTrigger
                                        key={placement}
                                        placement={placement}
                                        overlay={
                                            <Tooltip id={`tooltip-${placement}`}>
                                                Print All Payments
                                            </Tooltip>
                                        }
                                    >
                                        <Image src="/images/printer.png" className="d-none d-lg-block" style={{ width: "40px", marginTop: "10px", marginLeft: "10px" }} rounded />
                                    </OverlayTrigger>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <Button variant="" style={{ backgroundColor: "#475466", color: "#FFFFFF", width: "100%", cursor: 'pointer' }} onClick={() => this.change_toggle()}>Add new Payment</Button>
                    </div>
                </div>

                {/* Add payment form toggle */}
                <div className="row" style={{ display: this.state.addPaymentState == true ? 'block' : 'none', marginBottom: "15px" }}>
                    <div className="col-12">
                        <Card className="col-12">
                            <Card.Body>

                                <div className="col-12 bg-white mt-1 pb-1" >
                                    <form onSubmit={(e) => this.onFormSubmit(e)}>
                                        <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Payment Details<br></br>
                                            <span className="text-muted small">You can add a new Payment by filling relavant Information</span></h6>
                                        <div className="row" >
                                            <div className="col-sm-8">

                                                <div className="row">
                                                    <div className="col-sm-6 mt-1 mb-1" >
                                                        <FormInput
                                                            label={'Payment Icon *'}
                                                            placeholder={"Enter Payment Icon"}
                                                            //error={ errors.group_mo}
                                                            value={this.state.icon_id}
                                                            name="icon_id"
                                                            onChange={this.formValueChange}
                                                        //error_meesage={'*Group Number required'}
                                                        />
                                                    </div>
                                                    <div className="col-sm-6 mt-1 mb-1" >
                                                        <FormInput
                                                            label={'Payment Name *'}
                                                            placeholder={"Enter Payment Name"}
                                                            //error={ errors.group_mo}
                                                            value={this.state.name}
                                                            name="name"
                                                            onChange={this.formValueChange}
                                                        //error_meesage={'*Group Number required'}
                                                        />
                                                    </div>
                                                    <div className="col-sm-6 mt-1 mb-1" >
                                                        <FormInput
                                                            label={'Type *'}
                                                            placeholder={"Enter Type"}
                                                            //error={ errors.group_mo}
                                                            value={this.state.type}
                                                            name="type"
                                                            onChange={this.formValueChange}
                                                        //error_meesage={'*Group Number required'}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-12 mt-1 mb-1" >
                                                        <FormInput
                                                            label={'Description *'}
                                                            placeholder={"Enter Description"}
                                                            //error={ errors.group_mo}
                                                            value={this.state.description}
                                                            name="description"
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
                                                            label={"Added By *"}
                                                            placeholder={"Enter Added By"}
                                                            //error={ errors.group_mo}
                                                            value={this.state.added_by}
                                                            name="added_by"
                                                            onChange={this.formValueChange}
                                                        //error_meesage={'*Group Number required'}
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6 mt-3 mb-1" >
                                                <button type="submit" style={{ backgroundColor: "#475466", color: "#FFFFFF", cursor: 'pointer' }} className="btn mt-2 btn btn-sm px-5">Submit</button>
                                                <button type="submit" style={{ backgroundColor: "red", marginLeft: "10px", color: "#FFFFFF", cursor: 'pointer' }} onClick={() => this.clear()} className="btn mt-2 btn btn-sm px-5">Cancel</button>
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


export default connect(mapStateToProps, null)(withRouter(addPaymentCom));