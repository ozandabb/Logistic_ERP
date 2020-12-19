import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AccountantSidebar from "./Sidebar.Accountant";
import { connect } from 'react-redux';
import VatProductPostingGroup_CONTROLLER from "../../Controllers/Accountant/VatProductPostingGroup.Controller";
import { Button, Card, Col, FormControl, InputGroup, Table } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import CONFIG from "../../Controllers/Config.controller";
import Spinner from 'react-bootstrap/Spinner';

import { FormInput } from "../../Components/Form";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import _findIndex from "lodash.findindex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEllipsisV, faTrash } from "@fortawesome/free-solid-svg-icons";


class VatProductPostingGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            add_vat_product_posting_group: false,
            update_vat_product_posting_group: false,
            id: '',
            name: '',
            value: '',
            added_by: '',
            vat_product_posting_group: [],
            isLoading: '',
            error_message: ''

        }
    }

    async componentDidMount() {
        this.getAllVatProductPostingGroups();

    }

    getAllVatProductPostingGroups = async () => {
        this.setState({
            isLoading: true,
        })

        const res = await VatProductPostingGroup_CONTROLLER.getAllVatProductPostingGroups(this.props.auth.token);
        console.log(res);

        this.setState({
            isLoading: false,
            vat_product_posting_group: res.data.rows

        });
    };

    onClickDelete = (id) => {
        if (id == '') {
            CONFIG.setErrorToast("Please Select a vat product posting group to delete!");
        } else {
            CONFIG.setDeleteConfirmAlert(
                "",
                "Are you sure you want to delete this vat product posting group ?",
                () => this.deleteVatProductPostingGroup(id),
                () => { }
            );
        }
    };

    deleteVatProductPostingGroup = async (id) => {
        const res = await VatProductPostingGroup_CONTROLLER.deleteVatProductPostingGroup(id, this.props.auth.token);

        if (res.status == 200) {
            CONFIG.setToast("Successfully Deleted!");
            this.getAllVatProductPostingGroups();
        } else {
            CONFIG.setErrorToast("Somthing Went Wrong!");
        }
    };

    change_toggle = () => {
        if (this.state.add_vat_product_posting_group) {
            this.setState({ add_vat_product_posting_group: false })
        } else {
            this.clear();
            this.setState({ add_vat_product_posting_group: true })
            this.setState({ update_vat_product_posting_group: false })
        }
    };

    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    clear = () => {
        this.setState({
            name: '',
            value: '',
            added_by: '',
            error_message: ''
        });
    };

    addVatProductPostingGroup = async (e) => {
        e.preventDefault();
        console.log(this.props.auth.user.user_details.username);
        var data = {
            name: this.state.name,
            value: this.state.value,
            added_by: this.props.auth.user.user_details.id,
        };
        console.log(data);
        const result = await VatProductPostingGroup_CONTROLLER.createOneVatProductPostingGroup(data, this.props.auth.token);

        if (result.status == 201) {
            CONFIG.setToast("Successfully Added");
            console.log("OLD :" + this.state.code);
            this.clear();
            this.change_toggle();
            this.getAllVatProductPostingGroups();

        } else {
            this.setState({
                error_message: result.response.statusText
            });
            CONFIG.setErrorToast(" Somthing Went Wrong!");
            console.log(result.response.statusText);
            //this.clear();
        }
    };

    update_toggle = (id) => {
        if (this.state.update_vat_product_posting_group) {
            this.setState({ update_vat_product_posting_group: false })
        } else {
            this.getOneVatProductPostingGroupById(id);
            this.setState({ add_vat_product_posting_group: false });

            this.setState({ update_vat_product_posting_group: true })
            this.clear();

        }
    };

    onChange = e => {
        this.setState({ search: e.target.value });
    };

    getOneVatProductPostingGroupById = async (id) => {

        const res = await VatProductPostingGroup_CONTROLLER.getOneVatProductPostingGroupById(id, this.props.auth.token);

        this.setState({
            id: res.data.data.id,
            name: res.data.data.name,
            value: res.data.data.value,
            added_by: ''
        })
        console.log(this.state.name);
    };

    updateVatProductPostingGroup = async (e) => {
        e.preventDefault();
        var data = {
            id: this.state.id,
            name: this.state.name,
            value: this.state.value,
            added_by: this.props.auth.user.user_details.id,
        };
        console.log(data);
        const result = await VatProductPostingGroup_CONTROLLER.updateVatProductPostingGroup(data, this.props.auth.token);

        if (result.status == 200) {
            CONFIG.setToast("Successfully Updated!");
            this.updateClear();
            this.getAllVatProductPostingGroups();


        } else {
            this.setState({
                error_message: result.response.statusText
            });
            CONFIG.setErrorToast(" Somthing Went Wrong!");
            //this.updateClear();
        }

    }

    updateClear = () => {
        this.setState({
            name: '',
            code: '',
            added_by: '',
            error_message: ''
        });

        this.update_toggle();
    };

    render() {
        const { vat_product_posting_group } = this.state;
        return (
            <div>
                <div className="bg-light wd-wrapper">
                    <AccountantSidebar activemenu={'VAT_PRODUCT_POSTING_GROUP'} />
                    <div className="wrapper-wx" style={{ height: "100hv" }}>
                        <div className="container-fluid">
                            <div>
                                {/* Title and the add vat product posting group button */}
                                <div className="row" style={{ marginTop: "5px", fontFamily: "sans-serif", marginBottom: "15px" }}>
                                    <div className="col-sm-9">
                                        <div className="row">
                                            <div className="col-sm">
                                                <h6 style={{ paddingTop: "10px", paddingLeft: "5px" }}> Vat Product Posting Group<br></br>
                                                    <span className="text-muted small">Dashboard /  Vat Product Posting Group</span>
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <Button variant="" style={{ backgroundColor: "#475466", color: "#FFFFFF", width: "100%", cursor: 'pointer' }} onClick={() => this.change_toggle()}>Add New Vat Product Posting Group</Button>
                                    </div>
                                </div>
                                {/* Add vat product posting group form toggle */}
                                <div className="row" style={{ display: this.state.add_vat_product_posting_group == true ? 'block' : 'none', marginBottom: "15px" }}>
                                    <div className="col-12">
                                        <Card className="col-12">
                                            <Card.Body>

                                                <div className="col-12 bg-white mt-1 pb-1" >
                                                    <form onSubmit={(e) => this.addVatProductPostingGroup(e)}>
                                                        <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Vat Product Group Details<br></br>
                                                            <span className="text-muted small">You can add a new Vat Product Group by filling relavant Information</span></h6>
                                                        <div className="row" >
                                                            <div className="col-sm-12">

                                                                <div className="row">
                                                                    <div className="col-sm-4 mt-1 mb-1" >
                                                                        <FormInput
                                                                            required={true}
                                                                            label={'Name *'}
                                                                            placeholder={"Enter Name"}
                                                                            //error={ errors.group_mo}
                                                                            value={this.state.name}
                                                                            name="name"
                                                                            onChange={this.formValueChange}
                                                                        />
                                                                    </div>
                                                                    <div className="col-sm-4 mt-1 mb-1" >
                                                                        <FormInput
                                                                            required={true}
                                                                            type="Number"
                                                                            label={'Value*'}
                                                                            placeholder={"Enter Va;ue"}
                                                                            //error={ errors.group_mo}
                                                                            value={this.state.value}
                                                                            name="value"
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
                                                                <button type="button" style={{ backgroundColor: "red", marginLeft: "10px", color: "#FFFFFF", cursor: 'pointer' }} onClick={() => this.change_toggle()} className="btn mt-2 btn btn-sm px-5">Cancel</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                                {/* update vat product posting group form toggle */}
                                <div className="row" style={{ display: this.state.update_vat_product_posting_group == true ? 'block' : 'none', marginBottom: "15px" }}>
                                    <div className="col-12">
                                        <Card className="col-12">
                                            <Card.Body>
                                                <div className="col-12 bg-white mt-1 pb-1" >
                                                    <form onSubmit={(e) => this.updateVatProductPostingGroup(e)}>
                                                        <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1"> Update Vat Product Posting Group<br></br>
                                                            <span className="text-muted small">You can update Vat Product Posting Group by updating relevant Information</span></h6>
                                                        <div className="row" >
                                                            <div className="col-sm-12">
                                                                <div className="row">
                                                                    <div className="col-sm-4 mt-1 mb-1" >
                                                                        <FormInput
                                                                            required={true}
                                                                            label={'Name *'}
                                                                            placeholder={"Enter Name"}
                                                                            //error={ errors.group_mo}
                                                                            value={this.state.name}
                                                                            name="name"
                                                                            onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                        />
                                                                    </div>
                                                                    <div className="col-sm-4 mt-1 mb-1" >
                                                                        <FormInput
                                                                            required={true}
                                                                            type="Number"
                                                                            label={'Value *'}
                                                                            placeholder={"Enter Value"}
                                                                            //error={ errors.group_mo}
                                                                            value={this.state.value}
                                                                            name="value"
                                                                            onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-6 mt-3 mb-1" >
                                                                <button type="submit" style={{ backgroundColor: "#475466", color: "#FFFFFF", cursor: 'pointer' }} className="btn mt-2 btn btn-sm px-5" >Update</button>
                                                                <button type="button" style={{ backgroundColor: "red", marginLeft: "10px", color: "#FFFFFF", cursor: 'pointer' }} onClick={() => this.updateClear()} className="btn mt-2 btn btn-sm px-5">Cancel</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                            {/* Data Table */}
                            <div>
                                <div className="row" style={{ display: this.state.isLoading == false ? 'block' : 'none', marginTop: "20px" }}>
                                    <div className="col-sm">
                                        <Card>
                                            <Table striped bordered hover variant="light">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Value</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        vat_product_posting_group.map((value,) => {
                                                            return (
                                                                <tr key={value.id}>
                                                                    <td>{value.name}</td>
                                                                    <td>{value.value}</td>
                                                                    <td><Dropdown as={ButtonGroup}>
                                                                        <Dropdown.Toggle variant="" id="dropdown-split-basic" >
                                                                            <FontAwesomeIcon icon={faEllipsisV} />
                                                                        </Dropdown.Toggle>

                                                                        <Dropdown.Menu>
                                                                            {this.state.update_vat_posting_group
                                                                                ? <Dropdown.Item href="#/action-1" onClick={() => this.getBusinessVatPostingGroupById(value.id)}>
                                                                                    <FontAwesomeIcon className="text-warning" icon={faEdit} />&nbsp;&nbsp;Edit
                                                                        </Dropdown.Item>
                                                                                : <Dropdown.Item href="#/action-1" onClick={() => this.update_toggle(value.id)}>
                                                                                    <FontAwesomeIcon className="text-warning" icon={faEdit} />&nbsp;&nbsp;Edit
                                                                        </Dropdown.Item>
                                                                            }
                                                                            {/*<Dropdown.Item href="#/action-1" onClick={() => this.update_toggle(value.id)}>*/}
                                                                            {/*    <FontAwesomeIcon className="text-warning" icon={faEdit} />&nbsp;&nbsp;Edit*/}
                                                                            {/*</Dropdown.Item>*/}
                                                                            <Dropdown.Item href="#/action-2" onClick={(() => this.onClickDelete(value.id))}>
                                                                                <FontAwesomeIcon className="text-danger" icon={faTrash} />&nbsp;&nbsp;Delete
                                                                    </Dropdown.Item>

                                                                        </Dropdown.Menu>
                                                                    </Dropdown></td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </Table>
                                        </Card>
                                    </div>
                                </div>
                                <Spinner animation="border" role="status" style={{ display: this.state.isLoading == true ? 'block' : 'none', margin: 'auto' }}>
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});

export default connect(mapStateToProps, null)(withRouter(VatProductPostingGroup));
