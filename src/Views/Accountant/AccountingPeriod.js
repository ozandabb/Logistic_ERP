import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AccountantSidebar from "./Sidebar.Accountant";
import { connect } from 'react-redux';

import CONFIG from "../../Controllers/Config.controller";
import { Button, Card, Table } from "react-bootstrap";
import { FormInput } from "../../Components/Form";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import _findIndex from "lodash.findindex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEllipsisV, faTrash } from "@fortawesome/free-solid-svg-icons";
import FiscalYear_CONTROLLER from "../../Controllers/Accountant/FiscalYear.Controller";



class AccountingPeriod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateFiscalYearState: false,
            fiscal_years: [],
            addFiscalYearState: false,

            year: '',
            start_date: '',
            end_date: ''

        }
    }


    async componentDidMount() {
        this.getAllFiscalYears();
    }

    getAllFiscalYears = async () => {

        const res = await FiscalYear_CONTROLLER.getAllFiscalYears(this.props.auth.token);

        if (res.success == true) {
            this.setState({
                fiscal_years: res.data.rows
            });
            console.log(this.state.exchange_rates);
        }
        else {
            CONFIG.setErrorToast(" Error");
        }

    };

    change_toggle = () => {
        if (this.state.addFiscalYearState) {

            this.setState({ addFiscalYearState: false })
        } else {
            //this.clear();
            this.setState({ addFiscalYearState: true })
            this.setState({ updateFiscalYearState: false })
        }
    };

    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    addNewFiscalYear = async (e) => {
        e.preventDefault();

        var data = {
            year: this.state.year,
            start_date: this.state.start_date,
            end_date: this.state.end_date,

        };

        const result = await FiscalYear_CONTROLLER.addNewFiscalYear(data, this.props.auth.token);
        console.log(data);


        if (result.status == 201) {
            CONFIG.setToast("Successfully Added");
            this.clear();
            this.change_toggle();
            this.getAllFiscalYears();

        } else {
            // this.setState({
            //     error_message : result.response.statusText
            // });
            CONFIG.setErrorToast(" Somthing Went Wrong!");
            console.log(result.response.statusText);
            //this.clear();
        }
    };

    clear = () => {
        this.setState({
            year: '',
            start_date: '',
            end_date: ''
        });

        //this.change_toggle();
    };

    render() {
        return (
            <div className="bg-light wd-wrapper">
                <AccountantSidebar activemenu={'ACCOUNTING_PERIODS'} />
                <div className="wrapper-wx" style={{ height: "100hv" }}>
                    <div className="container-fluid">
                        <div>
                            {/* Title and the add new fiscal year button */}
                            <div className="row" style={{ marginTop: "5px", fontFamily: "sans-serif", marginBottom: "15px" }}>
                                <div className="col-sm-9">
                                    <div className="row">
                                        <div className="col-sm">
                                            <h6 style={{ paddingTop: "10px", paddingLeft: "5px" }}>Accounting Periods <br></br>
                                                <span className="text-muted small">Dashboard / Accounting Periods</span></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <Button variant="" style={{ backgroundColor: "#475466", color: "#FFFFFF", width: "100%", cursor: 'pointer' }} onClick={() => this.change_toggle()}>Create Year</Button>
                                </div>
                            </div>
                            {/* Add fiscal year form toggle */}
                            <div className="row" style={{ display: this.state.addFiscalYearState == true ? 'block' : 'none', marginBottom: "15px" }}>
                                <div className="col-12">
                                    <Card className="col-12">
                                        <Card.Body>
                                            <div className="col-12 bg-white mt-1 pb-1" >
                                                <form onSubmit={(e) => this.addNewFiscalYear(e)}>
                                                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Fiscal Year Details<br></br>
                                                        <span className="text-muted small">You can add a new fiscal year by filling relavant Information</span></h6>
                                                    <div className="row" >
                                                        <div className="col-sm-12">
                                                            <div className="row">
                                                                <div className="col-sm-4 mt-1 mb-1" >
                                                                    <FormInput
                                                                        required={true}
                                                                        type="Number"
                                                                        label={'Year *'}
                                                                        placeholder={"Enter Year"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.year}
                                                                        name="year"
                                                                        onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-4 mt-1 mb-1" >
                                                                    <FormInput
                                                                        required={true}
                                                                        type="Date"
                                                                        label={'Start Date *'}
                                                                        placeholder={"Enter Start Date "}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.start_date}
                                                                        name="start_date"
                                                                        onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-4 mt-1 mb-1" >
                                                                    <FormInput
                                                                        required={true}
                                                                        type="Date"
                                                                        label={'End Date *'}
                                                                        placeholder={"Enter End Date"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.end_date}
                                                                        name="end_date"
                                                                        onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                    />
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{this.state.error_message}</h4>
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
                            <div>
                                {/*
                            Display All Fiscal Years                 
                            */}
                                <div className="row" style={{ marginTop: "20px" }}>
                                    <div className="col-sm">
                                        <Card>
                                            <Table striped bordered hover variant="light">
                                                <thead>
                                                    <tr>
                                                        <th>Year</th>
                                                        <th>Start Date</th>
                                                        <th>End Date</th>

                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.fiscal_years.map((value,) => {
                                                            return (
                                                                <tr key={value.id}>
                                                                    <td>{value.year}</td>
                                                                    <td>{value.start_date}</td>
                                                                    <td>{value.end_date}</td>
                                                                    <td><Dropdown as={ButtonGroup}>
                                                                        <Dropdown.Toggle variant="" id="dropdown-split-basic" >
                                                                            <FontAwesomeIcon icon={faEllipsisV} />
                                                                        </Dropdown.Toggle>

                                                                        <Dropdown.Menu>
                                                                            {this.state.updateFiscalYearState
                                                                                ? <Dropdown.Item href="#/action-1" onClick={() => this.getBankAccountById(value.id)}>
                                                                                    <FontAwesomeIcon className="text-warning" icon={faEdit} />&nbsp;&nbsp;Edit
                                                                        </Dropdown.Item>
                                                                                : <Dropdown.Item href="#/action-1" onClick={() => this.update_toggle(value.id)}>
                                                                                    <FontAwesomeIcon className="text-warning" icon={faEdit} />&nbsp;&nbsp;Edit
                                                                        </Dropdown.Item>
                                                                            }

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

export default connect(mapStateToProps, null)(withRouter(AccountingPeriod));
