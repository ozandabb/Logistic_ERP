import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faArrowAltCircleDown, faTrash, faEllipsisV, faPeace, faPenAlt } from '@fortawesome/free-solid-svg-icons'
import { Tab, Row, Col, Nav, Card, InputGroup, FormControl, Image, Button, Table, Dropdown, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import ScrollArea from 'react-scrollbar'
import moment from 'moment';
import CONFIG from '../../../../Controllers/Config.controller';
import { FormInput } from '../../../../Components/Form';
import './DisplayFixedAssetsPostingGroup.Com.css';
import FixedAssetsPostingGroup_CONTROLLER from '../../../../Controllers/AssistantAccountant/FixedAssetsPostingGroups.controller';
import Accounts_CONTROLLER from '../../../../Controllers/AssistantAccountant/Accounts.controller';

class DisplayFixedAssetsPostingGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchState: false,
            addFixedAssetsPostingGroupState: false,
            updateFixedAssetsPostingGroupState: false,

            id: '',
            code: '',
            acquisition_cost_account: '',
            accum_depreciation_account: '',
            acq_cost_acc_on_disposal: '',
            accum_depr_acc_on_disposal: '',
            gains_acc_on_disposal: '',
            losses_acc_on_disposal: '',
            maintenance_expense_account: '',
            depreciation_expense_acc: '',

            fixedAssetsPostingGroupList: [],
            accountList: [],
            search: '',

            no_of_pages: 0,
            current_page: 1,

            errors: {},
        };
    }

    async componentDidMount() {
        this.loadAllFixedAssetsPostingGroups();
        this.loadAllFixedAssetsClasses();
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
        if (this.state.addFixedAssetsPostingGroupState) {
            this.setState({ addFixedAssetsPostingGroupState: false })
        } else {
            this.setState({ addFixedAssetsPostingGroupState: true })
        }
    }

    //GET all FixedAssetsPostingGroups
    loadAllFixedAssetsPostingGroups = async () => {
        const res = await FixedAssetsPostingGroup_CONTROLLER.getAllFixedAssetsPostingGroups(5, this.state.current_page - 1, this.props.auth.token);
        this.setState({
            fixedAssetsPostingGroupList: res.data.rows,
            no_of_pages: res.data.pages
        });
    }

    //GET all accountList
    loadAllFixedAssetsClasses = async () => {
        const res = await Accounts_CONTROLLER.getAllAccountsWithoutPagination(this.props.auth.token);
        this.setState({
            accountList: res.data.rows
        });
    }

    //DELETE Fucntion
    onClickDelete = (id) => {
        if (id == '') {
            CONFIG.setErrorToast("Please Select a Fixed Assets Posting Group to Delete!");
        } else {
            CONFIG.setDeleteConfirmAlert(
                "",
                "Are you sure you want to delete this Fixed Assets Posting Group ?",
                () => this.clickDeleteFixedAssetsPostingGroup(id),
                () => { }
            );
        }
    };

    clickDeleteFixedAssetsPostingGroup = async (id) => {
        const result = await FixedAssetsPostingGroup_CONTROLLER.DeleteFixedAssetsPostingGroup(id, this.props.auth.token);

        if (result.status == 200) {
            CONFIG.setToast("Successfully Deleted!");
            this.loadAllFixedAssetsPostingGroups();
        } else {
            CONFIG.setErrorToast("Somthing Went Wrong!");
        }
    };

    //FixedAssetsPostingGroup form value change
    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    //add FixedAssetsPostingGroup submit
    onFormSubmit = async (e) => {
        e.preventDefault();
        if (this.validate()) {
            var data = {
                code: this.state.code,
                acquisition_cost_account: this.state.acquisition_cost_account,
                accum_depreciation_account: this.state.accum_depreciation_account,
                acq_cost_acc_on_disposal: this.state.acq_cost_acc_on_disposal,
                accum_depr_acc_on_disposal: this.state.accum_depr_acc_on_disposal,
                gains_acc_on_disposal: this.state.gains_acc_on_disposal,
                losses_acc_on_disposal: this.state.losses_acc_on_disposal,
                maintenance_expense_account: this.state.maintenance_expense_account,
                depreciation_expense_acc: this.state.depreciation_expense_acc,
            }

            const result = await FixedAssetsPostingGroup_CONTROLLER.addFixedAssetsPostingGroup(data, this.props.auth.token);

            if (result.status == 201) {
                CONFIG.setToast("Successfully Added");
                this.clear();
                this.loadAllFixedAssetsPostingGroups();
            } else {
                CONFIG.setErrorToast(" Somthing Went Wrong!");
            }
        }
    }

    //Get FixedAssetsPostingGroup by ID - function
    onClickEdit = async (id) => {
        const response = await FixedAssetsPostingGroup_CONTROLLER.getFixedAssetsPostingGroupByID(id, this.props.auth.token);

        if (response.status == 200) {
            this.setState({
                errors: {},
                updateFixedAssetsPostingGroupState: true,
                id: response.data.data.id,
                code: response.data.data.code,
                acquisition_cost_account: response.data.data.acquisition_cost_account,
                accum_depreciation_account: response.data.data.accum_depreciation_account,
                acq_cost_acc_on_disposal: response.data.data.acq_cost_acc_on_disposal,
                accum_depr_acc_on_disposal: response.data.data.accum_depr_acc_on_disposal,
                gains_acc_on_disposal: response.data.data.gains_acc_on_disposal,
                losses_acc_on_disposal: response.data.data.losses_acc_on_disposal,
                maintenance_expense_account: response.data.data.maintenance_expense_account,
                depreciation_expense_acc: response.data.data.depreciation_expense_acc,
            });
        }
    }

    //Update form submit
    onFormSubmitUpdate = async (e) => {
        e.preventDefault();

        if (this.validate()) {
            var data = {
                id: this.state.id,
                code: this.state.code,
                acquisition_cost_account: this.state.acquisition_cost_account,
                accum_depreciation_account: this.state.accum_depreciation_account,
                acq_cost_acc_on_disposal: this.state.acq_cost_acc_on_disposal,
                accum_depr_acc_on_disposal: this.state.accum_depr_acc_on_disposal,
                gains_acc_on_disposal: this.state.gains_acc_on_disposal,
                losses_acc_on_disposal: this.state.losses_acc_on_disposal,
                maintenance_expense_account: this.state.maintenance_expense_account,
                depreciation_expense_acc: this.state.depreciation_expense_acc,
            }

            const result = await FixedAssetsPostingGroup_CONTROLLER.updateFixedAssetsPostingGroup(data, this.props.auth.token);

            if (result.status == 200) {
                CONFIG.setToast("Successfully Updated!");
                this.clear();
                this.loadAllFixedAssetsPostingGroups();
            }
            else {
                CONFIG.setErrorToast("Somthing Went Wrong!");
            }
        }
    }

    //Clear all input details
    clear = () => {
        this.setState({
            id: '',
            code: '',
            acquisition_cost_account: '',
            accum_depreciation_account: '',
            acq_cost_acc_on_disposal: '',
            accum_depr_acc_on_disposal: '',
            gains_acc_on_disposal: '',
            losses_acc_on_disposal: '',
            maintenance_expense_account: '',
            depreciation_expense_acc: '',
            updateFixedAssetsPostingGroupState: false,
            addFixedAssetsPostingGroupState: false,
        })
    }

    paginate = async pageNum => {
        this.setState({
            current_page: pageNum
        }, () => {
            this.loadAllFixedAssetsPostingGroups();
        });
    };
    nextPage = async () => {
        if (this.state.current_page < this.state.no_of_pages) {
            this.setState({
                current_page: this.state.current_page + 1
            }, () => {
                this.loadAllFixedAssetsPostingGroups();
            });
        }

    };

    prevPage = async () => {
        if (this.state.current_page >= this.state.no_of_pages) {
            this.setState({
                current_page: this.state.current_page - 1
            }, () => {
                this.loadAllFixedAssetsPostingGroups();
            });
        }
    };
    render() {
        const { fixedAssetsPostingGroupList, accountList, errors, search, current_page, no_of_pages } = this.state;
        const pageNumbers = [];

        for (let i = 1; i <= no_of_pages; i++) {
            pageNumbers.push(i);
        }

        return (
            <div>
                <div>
                    {/* Title and the add new customer button */}
                    <div className="row" style={{ marginTop: "5px", fontFamily: "sans-serif", marginBottom: "15px" }}>
                        <div className="col-sm-9">
                            <div className="row">
                                <div className="col-sm">
                                    <h6 style={{ paddingTop: "10px", paddingLeft: "5px" }}>Fixed Assets Posting Group Details<br></br>
                                        <span className="text-muted small">Dashboard / Fixed Assets Posting Groups</span></h6>
                                </div>
                                <div className="col-sm">
                                    {['bottom'].map((placement) => (
                                        <OverlayTrigger
                                            key={placement}
                                            placement={placement}
                                            overlay={
                                                <Tooltip id={`tooltip-${placement}`}>
                                                    Print All Fixed Assets Posting Groups
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
                            <Button variant="" style={{ backgroundColor: "#475466", color: "#FFFFFF", width: "100%", cursor: 'pointer' }} onClick={() => this.change_toggle()}>Add New Fixed Assets Posting Group</Button>
                        </div>
                    </div>
                    <div>
                        <Row className="mt-5">
                            {/*search bar*/}
                            <Col md={3} style={{}}>
                                <InputGroup className="" >
                                    <FormControl
                                        style={{ height: "38px" }}
                                        aria-label="search"
                                        placeholder="Search"
                                        onChange={this.onChange}
                                        aria-describedby="basic-addon1"
                                    />
                                    <InputGroup.Append>
                                        <Button variant="outline-secondary">
                                            <i className="fas fa-search"></i>
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>

                        </Row>
                    </div>
                    {/* Add FixedAssetsPostingGroup form toggle */}
                    <div className="row" style={{ display: this.state.addFixedAssetsPostingGroupState == true ? 'block' : 'none', marginBottom: "15px" }}>
                        <div className="col-12">
                            <Card className="col-12">
                                <Card.Body>

                                    <div className="col-12 bg-white mt-1 pb-1" >
                                        <form onSubmit={(e) => this.onFormSubmit(e)}>
                                            <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Fixed Assets Posting Group Details<br></br>
                                                <span className="text-muted small">You can add a new Fixed Assets Posting Group by filling relavant Information</span></h6>
                                            <div className="row" >
                                                <div className="col-sm-8">

                                                    <div className="row">
                                                        <div className="col-sm-12 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Fixed Assets Posting Group Code *'}
                                                                placeholder={"Enter Fixed Assets Posting Group Code"}
                                                                value={this.state.code}
                                                                name="code"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.code && errors.code.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.code}</h4>}
                                                        </div>

                                                        {/* 1 */}
                                                        <div className="col-sm-6 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Acquisition Cost Account</Form.Label>
                                                                <Form.Control as="select" name="acquisition_cost_account" value={this.state.acquisition_cost_account} onChange={this.formValueChange}>
                                                                    <option value="">Select Acquisition Cost Account</option>
                                                                    {
                                                                        accountList && accountList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.name}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.acquisition_cost_account && errors.acquisition_cost_account.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.acquisition_cost_account}</h4>}
                                                        </div>

                                                        {/* 2 */}
                                                        <div className="col-sm-6 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Accumulated Depreciation Account</Form.Label>
                                                                <Form.Control as="select" name="accum_depreciation_account" value={this.state.accum_depreciation_account} onChange={this.formValueChange}>
                                                                    <option value="">Select Accumulated Depreciation Account</option>
                                                                    {
                                                                        accountList && accountList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.name}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.accum_depreciation_account && errors.accum_depreciation_account.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.accum_depreciation_account}</h4>}
                                                        </div>

                                                        {/* 3 */}
                                                        <div className="col-sm-6 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Acquisition Cost Account On Disposal</Form.Label>
                                                                <Form.Control as="select" name="acq_cost_acc_on_disposal" value={this.state.acq_cost_acc_on_disposal} onChange={this.formValueChange}>
                                                                    <option value="">Select Acquisition Cost Account On Disposal</option>
                                                                    {
                                                                        accountList && accountList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.name}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.acq_cost_acc_on_disposal && errors.acq_cost_acc_on_disposal.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.acq_cost_acc_on_disposal}</h4>}
                                                        </div>

                                                        {/* 4 */}
                                                        <div className="col-sm-6 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Accumulated Depreciation Account On Disposal</Form.Label>
                                                                <Form.Control as="select" name="accum_depr_acc_on_disposal" value={this.state.accum_depr_acc_on_disposal} onChange={this.formValueChange}>
                                                                    <option value="">Select Accumulated Depreciation Account On Disposal</option>
                                                                    {
                                                                        accountList && accountList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.name}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.accum_depr_acc_on_disposal && errors.accum_depr_acc_on_disposal.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.accum_depr_acc_on_disposal}</h4>}
                                                        </div>

                                                        {/* 5 */}
                                                        <div className="col-sm-6 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Gains Account On Disposal</Form.Label>
                                                                <Form.Control as="select" name="gains_acc_on_disposal" value={this.state.gains_acc_on_disposal} onChange={this.formValueChange}>
                                                                    <option value="">Select Gains Account On Disposal</option>
                                                                    {
                                                                        accountList && accountList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.name}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.gains_acc_on_disposal && errors.gains_acc_on_disposal.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.gains_acc_on_disposal}</h4>}
                                                        </div>

                                                        {/* 6 */}
                                                        <div className="col-sm-6 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Losses Account On Disposal</Form.Label>
                                                                <Form.Control as="select" name="losses_acc_on_disposal" value={this.state.losses_acc_on_disposal} onChange={this.formValueChange}>
                                                                    <option value="">Select Losses Account On Disposal</option>
                                                                    {
                                                                        accountList && accountList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.name}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.losses_acc_on_disposal && errors.losses_acc_on_disposal.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.losses_acc_on_disposal}</h4>}
                                                        </div>

                                                        {/* 7 */}
                                                        <div className="col-sm-6 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Maintanence Expense Account On Disposal</Form.Label>
                                                                <Form.Control as="select" name="maintenance_expense_account" value={this.state.maintenance_expense_account} onChange={this.formValueChange}>
                                                                    <option value="">Select Maintanence Expense Account On Disposal</option>
                                                                    {
                                                                        accountList && accountList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.name}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.maintenance_expense_account && errors.maintenance_expense_account.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.maintenance_expense_account}</h4>}
                                                        </div>

                                                        {/* 8 */}
                                                        <div className="col-sm-6 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Depreciation Expense Account On Disposal</Form.Label>
                                                                <Form.Control as="select" name="depreciation_expense_acc" value={this.state.depreciation_expense_acc} onChange={this.formValueChange}>
                                                                    <option value="">Select Depreciation Expense Account On Disposal</option>
                                                                    {
                                                                        accountList && accountList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.name}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.depreciation_expense_acc && errors.depreciation_expense_acc.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.depreciation_expense_acc}</h4>}
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

                    {/* Update FixedAssetsPostingGroup form toggle */}
                    <div className="row" style={{ display: this.state.updateFixedAssetsPostingGroupState == true ? 'block' : 'none', marginBottom: "15px" }}>
                        <div className="col-12">
                            <Card className="col-12">
                                <Card.Body>

                                    <div className="col-12 bg-white mt-1 pb-1" >
                                        <form onSubmit={(e) => this.onFormSubmitUpdate(e)}>
                                            <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Update Fixed Assets Posting Group Details<br></br>
                                                <span className="text-muted small">You can update a Fixed Assets Posting Group by filling relavant Information</span></h6>
                                            <div className="row" >
                                                <div className="col-sm-8">

                                                    <div className="row">
                                                        <div className="col-sm-12 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Fixed Assets Posting Group Code *'}
                                                                placeholder={"Enter Fixed Assets Posting Group Code"}
                                                                value={this.state.code}
                                                                name="code"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.code && errors.code.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.code}</h4>}
                                                        </div>
                                                        {/* 1 */}
                                                        <div className="col-sm-6 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Acquisition Cost Account</Form.Label>
                                                                <Form.Control as="select" name="acquisition_cost_account" value={this.state.acquisition_cost_account} onChange={this.formValueChange}>
                                                                    <option value="">Select Acquisition Cost Account</option>
                                                                    {
                                                                        accountList && accountList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.name}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.acquisition_cost_account && errors.acquisition_cost_account.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.acquisition_cost_account}</h4>}
                                                        </div>

                                                        {/* 2 */}
                                                        <div className="col-sm-6 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Accumulated Depreciation Account</Form.Label>
                                                                <Form.Control as="select" name="accum_depreciation_account" value={this.state.accum_depreciation_account} onChange={this.formValueChange}>
                                                                    <option value="">Select Accumulated Depreciation Account</option>
                                                                    {
                                                                        accountList && accountList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.name}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.accum_depreciation_account && errors.accum_depreciation_account.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.accum_depreciation_account}</h4>}
                                                        </div>

                                                        {/* 3 */}
                                                        <div className="col-sm-6 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Acquisition Cost Account On Disposal</Form.Label>
                                                                <Form.Control as="select" name="acq_cost_acc_on_disposal" value={this.state.acq_cost_acc_on_disposal} onChange={this.formValueChange}>
                                                                    <option value="">Select Acquisition Cost Account On Disposal</option>
                                                                    {
                                                                        accountList && accountList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.name}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.acq_cost_acc_on_disposal && errors.acq_cost_acc_on_disposal.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.acq_cost_acc_on_disposal}</h4>}
                                                        </div>

                                                        {/* 4 */}
                                                        <div className="col-sm-6 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Accumulated Depreciation Account On Disposal</Form.Label>
                                                                <Form.Control as="select" name="accum_depr_acc_on_disposal" value={this.state.accum_depr_acc_on_disposal} onChange={this.formValueChange}>
                                                                    <option value="">Select Accumulated Depreciation Account On Disposal</option>
                                                                    {
                                                                        accountList && accountList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.name}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.accum_depr_acc_on_disposal && errors.accum_depr_acc_on_disposal.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.accum_depr_acc_on_disposal}</h4>}
                                                        </div>

                                                        {/* 5 */}
                                                        <div className="col-sm-6 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Gains Account On Disposal</Form.Label>
                                                                <Form.Control as="select" name="gains_acc_on_disposal" value={this.state.gains_acc_on_disposal} onChange={this.formValueChange}>
                                                                    <option value="">Select Gains Account On Disposal</option>
                                                                    {
                                                                        accountList && accountList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.name}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.gains_acc_on_disposal && errors.gains_acc_on_disposal.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.gains_acc_on_disposal}</h4>}
                                                        </div>

                                                        {/* 6 */}
                                                        <div className="col-sm-6 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Losses Account On Disposal</Form.Label>
                                                                <Form.Control as="select" name="losses_acc_on_disposal" value={this.state.losses_acc_on_disposal} onChange={this.formValueChange}>
                                                                    <option value="">Select Losses Account On Disposal</option>
                                                                    {
                                                                        accountList && accountList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.name}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.losses_acc_on_disposal && errors.losses_acc_on_disposal.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.losses_acc_on_disposal}</h4>}
                                                        </div>

                                                        {/* 7 */}
                                                        <div className="col-sm-6 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Maintanence Expense Account On Disposal</Form.Label>
                                                                <Form.Control as="select" name="maintenance_expense_account" value={this.state.maintenance_expense_account} onChange={this.formValueChange}>
                                                                    <option value="">Select Maintanence Expense Account On Disposal</option>
                                                                    {
                                                                        accountList && accountList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.name}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.maintenance_expense_account && errors.maintenance_expense_account.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.maintenance_expense_account}</h4>}
                                                        </div>

                                                        {/* 8 */}
                                                        <div className="col-sm-6 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Depreciation Expense Account On Disposal</Form.Label>
                                                                <Form.Control as="select" name="depreciation_expense_acc" value={this.state.depreciation_expense_acc} onChange={this.formValueChange}>
                                                                    <option value="">Select Depreciation Expense Account On Disposal</option>
                                                                    {
                                                                        accountList && accountList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.name}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.depreciation_expense_acc && errors.depreciation_expense_acc.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.depreciation_expense_acc}</h4>}
                                                        </div>
                                                    </div>

                                                </div>


                                            </div>

                                            <div className="row">
                                                <div className="col-6 mt-3 mb-1" >
                                                    <button type="submit" style={{ backgroundColor: "#475466", color: "#FFFFFF", cursor: 'pointer' }} className="btn mt-2 btn btn-sm px-5">Update</button>
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
                                    <th>Created At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fixedAssetsPostingGroupList && fixedAssetsPostingGroupList.map((name) => this.renderOneFixedAssetPostingGroup(name))}
                            </tbody>
                        </Table>
                        {/*//Pagination*/}
                        <nav style={{ marginTop: "15px" }}>
                            <ul className="pagination justify-content-center">
                                <li className="page-item">
                                    <a className="page-link" href="javascript:void(0)" onClick={() => this.prevPage()} style={{ cursor: current_page == 1 ? "default" : "" }}>Previous</a>
                                </li>
                                {pageNumbers.map(num => (
                                    <li className="page-item" key={num}>
                                        <a onClick={() => this.paginate(num)} href="javascript:void(0)" className="page-link" style={{ color: current_page == num ? "blue" : "black" }}>{num}</a>
                                    </li>
                                ))}
                                <li className="page-item">
                                    <a className="page-link" href="javascript:void(0)" onClick={() => this.nextPage()} style={{ cursor: current_page == no_of_pages ? "default" : "" }}>Next</a>
                                </li>
                            </ul>
                        </nav>
                    </Card>
                </div>
            </div>
        );
    }

    renderOneFixedAssetPostingGroup = (item, i) => {
        const { search } = this.state;
        if (search !== "") {
            if (item.code.toLowerCase().indexOf(search.toLowerCase()) === -1) {
                return null;
            }
        }

        return (
            <tr key={i}>
                <td>{item.code}</td>
                <td>{moment(new Date(item.createdAt)).format("YYYY MMM DD")}</td>
                <td>
                    <Dropdown>
                        <Dropdown.Toggle variant="" id="dropdown-basic" >
                            <FontAwesomeIcon icon={faEllipsisV} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.onClickEdit(item.id)}>
                                <FontAwesomeIcon className="text-primary" icon={faPenAlt} />&nbsp;&nbsp;Edit
                            </Dropdown.Item>
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
        let { errors, code, acquisition_cost_account, accum_depreciation_account, acq_cost_acc_on_disposal, accum_depr_acc_on_disposal, gains_acc_on_disposal, losses_acc_on_disposal, maintenance_expense_account, depreciation_expense_acc } = this.state;
        let count = 0;

        if (code.length === 0) {
            errors.code = 'Code can not be empty !'
            count++
        } else {
            errors.code = ''
        }

        if (acquisition_cost_account.length === 0) {
            errors.acquisition_cost_account = 'Accuisition Cost Account Cannot be empty !'
            count++
        } else {
            errors.acquisition_cost_account = ''
        }

        if (accum_depreciation_account.length === 0) {
            errors.accum_depreciation_account = 'Accumulated Depreciation Account Cannot be empty !'
            count++
        } else {
            errors.accum_depreciation_account = ''
        }

        if (acq_cost_acc_on_disposal.length === 0) {
            errors.acq_cost_acc_on_disposal = 'Accuisition Cost Account on disposal Cannot be empty !'
            count++
        } else {
            errors.acq_cost_acc_on_disposal = ''
        }

        if (accum_depr_acc_on_disposal.length === 0) {
            errors.accum_depr_acc_on_disposal = 'Accumulated Depreciation Account on disposal Cannot be empty !'
            count++
        } else {
            errors.accum_depr_acc_on_disposal = ''
        }

        if (gains_acc_on_disposal.length === 0) {
            errors.gains_acc_on_disposal = 'Gains Account on disposal Cannot be empty !'
            count++
        } else {
            errors.gains_acc_on_disposal = ''
        }

        if (losses_acc_on_disposal.length === 0) {
            errors.losses_acc_on_disposal = 'Losses Account on disposal Cannot be empty !'
            count++
        } else {
            errors.losses_acc_on_disposal = ''
        }

        if (maintenance_expense_account.length === 0) {
            errors.maintenance_expense_account = 'Maintanence Expense Account Cannot be empty !'
            count++
        } else {
            errors.maintenance_expense_account = ''
        }

        if (depreciation_expense_acc.length === 0) {
            errors.depreciation_expense_acc = 'Depreciation Expense Account Cannot be empty !'
            count++
        } else {
            errors.depreciation_expense_acc = ''
        }

        this.setState({ errors });
        return count == 0;
    }
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});

export default connect(mapStateToProps, null)(withRouter(DisplayFixedAssetsPostingGroup));