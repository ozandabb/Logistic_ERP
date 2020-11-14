import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faArrowAltCircleDown, faTrash, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { Tab, Row, Col, Nav, Card, InputGroup, FormControl, Image, Button, Table, Dropdown, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import ScrollArea from 'react-scrollbar'
import moment from 'moment';
import CONFIG from '../../../../Controllers/Config.controller';
import { FormInput } from '../../../../Components/Form';
import './DisplayPayment.Com.css';
import Payment_CONTROLLER from '../../../../Controllers/AccountsExecutives/Payment.controller';

class DisplayPaymentCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchState: false,
            addPaymentState: false,

            icon_id: '',
            name: '',
            type: '',
            description: '',
            added_by: '',

            paymentList: [],
            search: '',

            errors: {},
        };
    }

    async componentDidMount() {
        this.loadAllPayments();
    }

    //Search input text
    onChange = e => {
        this.setState({ search: e.target.value });
    }

    //Function for search icon to toggle 
    change_search_toggle = () => {
        if (this.state.searchState) {
            this.setState({ searchState: false })
        } else {
            this.setState({ searchState: true })
        }
    }

    change_toggle = () => {
        if (this.state.addPaymentState) {
            this.setState({ addPaymentState: false })
        } else {
            this.setState({ addPaymentState: true })
        }
    }

    //GET all payments
    loadAllPayments = async () => {
        const res = await Payment_CONTROLLER.getAllPayments(this.props.auth.token);
        this.setState({
            paymentList: res.data.rows,
        });
    }

    //DELETE Fucntion
    onClickDelete = (id) => {
        if (id == '') {
            CONFIG.setErrorToast("Please Select a Payment to Delete!");
        } else {
            CONFIG.setDeleteConfirmAlert(
                "",
                "Are you sure you want to delete this Payment ?",
                () => this.clickDeletePayment(id),
                () => { }
            );
        }
    };
    clickDeletePayment = async (id) => {
        const result = await Payment_CONTROLLER.DeletePayment(id, this.props.auth.token);

        if (result.status == 200) {
            CONFIG.setToast("Successfully Deleted!");
            this.loadAllPayments();
        } else {
            CONFIG.setErrorToast("Somthing Went Wrong!");
        }
    };

    //Payment form value change
    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    //add Payment submit
    onFormSubmit = async (e) => {
        e.preventDefault();

        if (this.validate()) {
            var data = {
                icon_id: "DE123",
                name: this.state.name,
                type: this.state.type,
                description: this.state.description,
                added_by: this.props.auth.user.user_details.id,
            }

            const result = await Payment_CONTROLLER.addPayment(data, this.props.auth.token);

            if (result.status == 201) {
                CONFIG.setToast("Successfully Added");
                this.clear();
                this.loadAllPayments();
            } else {
                CONFIG.setErrorToast(" Somthing Went Wrong!");
                this.clear();
            }
        }
    }

    //Clear all input details
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
        const { paymentList, name, type, description, added_by, icon_id, errors } = this.state;
        return (
            <div>
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
                                                                label={'Payment Name *'}
                                                                placeholder={"Enter Payment Name"}
                                                                value={this.state.name}
                                                                name="name"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.name && errors.name.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.name}</h4>}
                                                        </div>
                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Type *'}
                                                                placeholder={"Enter Type"}
                                                                value={this.state.type}
                                                                name="type"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.type && errors.type.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.type}</h4>}
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-12 mt-1 mb-1" >
                                                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                                                <Form.Label>Description *</Form.Label>
                                                                <Form.Control as="textarea" placeholder={"Enter Description"} value={this.state.description} name="description" onChange={this.formValueChange} rows={3} />
                                                            </Form.Group>
                                                            {errors.description && errors.description.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.description}</h4>}
                                                        </div>
                                                    </div>

                                                </div>


                                            </div>

                                            <div className="row">
                                                <div className="col-6 mt-3 mb-1" >
                                                    <button type="submit" style={{ backgroundColor: "#475466", color: "#FFFFFF", cursor: 'pointer' }} className="btn mt-2 btn btn-sm px-5">Submit</button>
                                                    <button type="button" style={{ backgroundColor: "red", marginLeft: "10px", color: "#FFFFFF", cursor: 'pointer' }} onClick={() => this.clear()} className="btn mt-2 btn btn-sm px-5">Cancel</button>
                                                </div>
                                            </div>


                                        </form>
                                    </div>

                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="my-4">
                    <Card>
                        <Table striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Description</th>
                                    <th>Created At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentList && paymentList.map((name) => this.renderOnePayment(name))}
                            </tbody>
                        </Table>
                    </Card>
                </div>
            </div>
        );
    }

    renderOnePayment = (item, i) => {
        const { search } = this.state;
        if (search !== "" && item.name.toLowerCase().indexOf(search.toLowerCase()) === -1) {
            return null;
        }

        return (
            <tr key={i}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.description}</td>
                <td>{moment(new Date(item.createdAt)).format("YYYY MMM DD")}</td>
                <td>
                    <Dropdown>
                        <Dropdown.Toggle variant="" id="dropdown-basic" >
                            <FontAwesomeIcon icon={faEllipsisV} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.onClickDelete(item.id)}>
                                <FontAwesomeIcon className="text-danger" icon={faTrash} />&nbsp;&nbsp;Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
        );
    }

    validate = () => {
        let { errors, name, type, description } = this.state;
        let count = 0;

        if (name.length === 0) {
            errors.name = 'Payment Name can not be empty !';
            count++;
        } else {
            errors.name = ''
        }

        if (type.length === 0) {
            errors.type = 'Payment Type can not be empty !';
            count++;
        } else {
            errors.type = ''
        }

        if (description.length === 0) {
            errors.description = 'Description can not be empty !';
            count++;
        } else {
            errors.description = ''
        }

        this.setState({ errors });
        return count == 0;
    }
}


const mapStateToProps = state => ({
    auth: state.auth || {},
});

export default connect(mapStateToProps, null)(withRouter(DisplayPaymentCom));