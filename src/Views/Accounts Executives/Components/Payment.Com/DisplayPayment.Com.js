import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons'
import { Tab, Row, Col, Nav, Card, InputGroup, FormControl, Image, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import ScrollArea from 'react-scrollbar'
import moment from 'moment';
import CONFIG from '../../../../Controllers/Config.controller';
import { FormInput } from '../../../../Components/Form'

import Payment_CONTROLLER from '../../../../Controllers/AccountsExecutives/Payment.controller';

class DisplayPaymentCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchState: false,

            id: '',
            icon_id: '',
            name: '',
            type: '',
            description: '',
            added_by: '',

            paymentList: [],
            search: '',

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

    //GET all payments
    loadAllPayments = async () => {
        const res = await Payment_CONTROLLER.getAllPayments(this.props.auth.token);
        this.setState({
            paymentList: res.data.rows,
        });
    }

    //Get payment by ID - function
    loadPaymentData = async (id) => {
        const resPay = await Payment_CONTROLLER.getPaymentByID(id, this.props.auth.token);

        if (resPay.status == 200) {
            this.setState({
                id: resPay.data.data.id,
                icon_id: resPay.data.data.icon_id,
                name: resPay.data.data.name,
                type: resPay.data.data.type,
                description: resPay.data.data.description,
                added_by: resPay.data.data.added_by,
            });
        }
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
            this.clear();
            this.loadAllPayments();
        } else {
            CONFIG.setErrorToast("Somthing Went Wrong!");
            this.clear();
        }
    };

    //Update form submit
    onFormSubmit = async (e) => {
        e.preventDefault();

        var data = {
            id: this.state.id,
            icon_id: this.state.icon_id,
            name: this.state.name,
            type: this.state.type,
            address: this.state.address,
            added_by: this.state.added_by,
        }

        const result = await Payment_CONTROLLER.UpdateSupplier(data, this.props.auth.token);

        if (result.status == 200) {
            CONFIG.setToast("Successfully Updated!");
            this.clear();
            this.loadAllPayments();
        }
        else {
            CONFIG.setErrorToast("Somthing Went Wrong!");
            this.clear();
        }

    }

    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
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
    }

    render() {
        const { paymentList, name, type, description, added_by, icon_id, id } = this.state;
        return (
            <div>

                {/* Customer details display here with the tab view */}
                <Tab.Container id="left-tabs-example">
                    <Row>

                        <Col sm={9}>
                            <Card >
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
                                        <form onSubmit={(e) => this.onFormSubmit(e)} >
                                            <div className="row ml-3 mt-1">
                                                <div className="col-sm" style={{ paddingRight: "50px" }}>
                                                    <div className="row">
                                                        <div className="col-sm">
                                                            <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Update {name} Details<br></br>
                                                                <span className="text-muted small">You can Update or Delete each Payment</span></h6>
                                                        </div>
                                                    </div>


                                                    <div className="row">
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Icon *'}
                                                                placeholder={"Select one Payment"}
                                                                //error={ errors.group_mo}
                                                                value={icon_id}
                                                                name="icon_id"
                                                                onChange={(e) => this.formValueChange(e)}
                                                            //error_meesage={'*Group Number required'}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Payment Name *'}
                                                                placeholder={"Select one Payment"}
                                                                //error={ errors.group_mo}
                                                                value={name}
                                                                name="name"
                                                                onChange={(e) => this.formValueChange(e)}
                                                            //error_meesage={'*Group Number required'}
                                                            />
                                                        </div>
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput
                                                                label={"Type *"}
                                                                placeholder={"Select one Type"}
                                                                //error={ errors.group_mo}
                                                                value={type}
                                                                name="type"
                                                                onChange={this.formValueChange}
                                                            //error_meesage={'*Group Number required'}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row">

                                                        <div className="col-sm-12 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Description *'}
                                                                placeholder={"Description"}
                                                                //error={ errors.group_mo}
                                                                value={description}
                                                                name="description"
                                                                onChange={this.formValueChange}
                                                            //error_meesage={'*Group Number required'}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput
                                                                label={"Added By *"}
                                                                placeholder={"Select one Supplier"}
                                                                //error={ errors.group_mo}
                                                                value={added_by}
                                                                name="added_by"
                                                                onChange={this.formValueChange}
                                                            //error_meesage={'*Group Number required'}
                                                            />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>


                                            <div className="row ml-3 mt-1">
                                                <div className="col-6 mt-3 mb-5" >
                                                    <button type="submit" style={{ backgroundColor: "#475466", color: "#FFFFFF", cursor: 'pointer' }} className="btn mt-2 btn btn-sm px-5">Update</button>
                                                    <Button onClick={() => this.onClickDelete(id)} style={{ backgroundColor: "red", marginLeft: "10px", color: "#FFFFFF", cursor: 'pointer' }} className="btn mt-2 btn btn-sm px-5">Delete</Button>
                                                </div>
                                            </div>

                                        </form>
                                    </div>

                                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                        fff
                                    </div>
                                    <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                        ff
                                    </div>
                                </div>
                            </Card>
                        </Col>

                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column bg-white">
                                <Card>
                                    <Nav.Item style={{ backgroundColor: "#475466", height: "65px" }}>
                                        <Row>
                                            <Col xs={12} md={8}>
                                                <h6 style={{ display: this.state.searchState == false ? 'block' : 'none', paddingTop: "22px", paddingLeft: "15px", paddingRight: "15px", color: "#FFFFFF", fontFamily: "Roboto, sans-serif", fontStyle: "initial" }}>All Payments</h6>
                                                <div className="col" style={{ display: this.state.searchState == true ? 'block' : 'none', paddingTop: "15px" }}>
                                                    <InputGroup className="" >
                                                        <FormControl
                                                            style={{ height: "30px" }}
                                                            aria-label="Username"
                                                            placeholder="Search"
                                                            onChange={this.onChange}
                                                            aria-describedby="basic-addon1"
                                                        />
                                                    </InputGroup>
                                                </div>
                                            </Col>
                                            {/* <Col xs={6} md={4}> */}
                                            <Col md="auto" style={{ paddingTop: "16px", paddingBottom: "8px" }}>
                                                <FontAwesomeIcon onClick={() => this.change_search_toggle()} icon={faSearch} style={{ cursor: 'pointer', color: "#FFFFFF", marginLeft: "20px", alignContent: "flex-end", alignItems: "flex-end" }} />
                                            </Col>
                                        </Row>
                                    </Nav.Item>

                                    <Nav.Item  >
                                        <Nav.Link >
                                            <ScrollArea
                                                speed={1}
                                                className="area"
                                                style={{ height: "600px" }}
                                                contentClassName="content"
                                                horizontal={false}
                                            >
                                                {paymentList && paymentList.map((name) => this.renderOneCustomer(name))}
                                            </ScrollArea>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Card>
                            </Nav>
                        </Col>

                    </Row>

                </Tab.Container>

            </div>
        );
    }

    renderOneCustomer = (item, i) => {
        const { search } = this.state;
        if (search !== "" && item.name.toLowerCase().indexOf(search.toLowerCase()) === -1) {
            return null;
        }

        return (
            <div style={{ paddingLeft: "20px" }} key={item.id} onClick={() => this.loadPaymentData(item.id)}>
                <div className="row">
                    <div className="col"><p className="d-none d-lg-block" style={{ fontSize: "11px", color: "#475466", marginBottom: "0px" }}>{item.id}</p></div>
                    <div className="col"><p className="d-none d-lg-block" style={{ fontSize: "11px", color: "#475466", marginBottom: "0px" }}> {moment(new Date(item.createdAt)).format("YYYY MMM DD")}</p></div>
                </div>
                <p style={{ fontSize: "18px", color: "#18A0FB", fontFamily: "sans-serif", marginBottom: "0px" }}>{item.name}</p>
                <p className="d-none d-lg-block" style={{ fontSize: "11px", color: "#475466", marginTop: "0px", marginBottom: "0px" }}> {item.address}</p>
                <hr></hr>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    auth: state.auth || {},
});

export default connect(mapStateToProps, null)(withRouter(DisplayPaymentCom));