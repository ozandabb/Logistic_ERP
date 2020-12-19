import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AccountantSidebar from "./Sidebar.Accountant";
import { connect } from 'react-redux';


import AddSupplierSection from "../HR Ececutive/HR Components/Supplier.Com/addSupplier.Com";
import DisplaySupplierSection from "../HR Ececutive/HR Components/Supplier.Com/DisplaySupplier.Com";
import AddBankAccountSection from "./AccountantComponents/BankAccounts.Com/AddBankAccount.Com";
import DisplayBankAccountSections from "./AccountantComponents/BankAccounts.Com/DisplayBankAccount.Com";
import Accountant_CONTROLLER from "../../Controllers/Accountant/BankAccount.Controller";
import CONFIG from "../../Controllers/Config.controller";
import { Button, Card, Table } from "react-bootstrap";
import { FormInput } from "../../Components/Form";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import _findIndex from "lodash.findindex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEllipsisV, faTrash } from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";



class BankAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addBankAccountState: false,
            updateBankAccountState: false,
            id: '',
            bank_name: '',
            account_type: '',
            account_number: '',
            holder_name: '',
            branch_name: '',
            added_by: '',

            bank_accounts: [],
            no_of_pages: 0,
            current_page: 1,

            error_message: '',
            errors: {},
            isLoading: '',
        };
    }

    change_toggle = () => {
        if (this.state.addBankAccountState) {

            this.setState({ addBankAccountState: false })
        } else {
            this.clear();
            this.setState({ addBankAccountState: true })
            this.setState({ updateBankAccountState: false })

        }
    };

    update_toggle = (id) => {
        if (this.state.updateBankAccountState) {
            this.setState({ updateBankAccountState: false })
        } else {
            this.getBankAccountById(id);
            this.setState({ addBankAccountState: false });

            this.setState({ updateBankAccountState: true })
            this.clear();

        }
    };



    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    addBankAccount = async (e) => {
        e.preventDefault();
        console.log(this.props.auth.user.user_details.username);
        var data = {
            bank_name: this.state.bank_name,
            account_type: this.state.account_type,
            account_number: this.state.account_number,
            holder_name: this.state.holder_name,
            branch_name: this.state.branch_name,
            added_by: this.props.auth.user.user_details.id,


        };
        console.log(data);
        const result = await Accountant_CONTROLLER.addBankAccount(data, this.props.auth.token);

        if (result.status == 201) {
            CONFIG.setToast("Successfully Added");
            console.log("OLD :" + this.state.bank_accounts);
            this.clear();
            this.change_toggle();
            this.loadAllBankAccounts();

        } else {
            this.setState({
                error_message: result.response.statusText
            });
            CONFIG.setErrorToast(" Somthing Went Wrong!");
            console.log(result.response.statusText);
            //this.clear();
        }
    };

    clear = () => {
        this.setState({
            bank_name: '',
            account_type: '',
            account_number: '',
            holder_name: '',
            branch_name: '',
            added_by: '',
            error_message: ''
        });

        //this.change_toggle();
    };

    updateClear = () => {
        this.setState({
            bank_name: '',
            account_type: '',
            account_number: '',
            holder_name: '',
            branch_name: '',
            added_by: '',
            error_message: ''
        });

        this.update_toggle();
    };

    onChange = e => {
        this.setState({ search: e.target.value });
    };

    async componentDidMount() {
        this.loadAllBankAccounts();
        // this.paginations();
    }

    //Function for search icon to toggle
    change_search_toggle = () => {
        if (this.state.searchState) {
            this.setState({ searchState: false })
        } else {
            this.setState({ searchState: true })
        }
    };

    //GET all bank accounts
    loadAllBankAccounts = async () => {
        this.setState({
            isLoading: true,
        })
        const res = await Accountant_CONTROLLER.getAllBankAccounts(10, this.state.current_page - 1, this.props.auth.token);
        this.setState({
            bank_accounts: res.data.rows,
            no_of_pages: res.data.pages,
            isLoading: false,

        });

        console.log("load" + this.state.no_of_pages);
    };


    //delete a bank account
    onClickDelete = (id) => {
        if (id == '') {
            CONFIG.setErrorToast("Please select business vat posting group to delete!");
        } else {
            CONFIG.setDeleteConfirmAlert(
                "",
                "Are you sure you want to delete this business vat posting group ?",
                () => this.deleteBankAccount(id),
                () => { }
            );
        }
    };

    deleteBankAccount = async (id) => {
        const res = await Accountant_CONTROLLER.deleteBankAccount(id, this.props.auth.token);

        if (res.status == 200) {
            CONFIG.setToast("Successfully Deleted!");
            this.loadAllBankAccounts();
        } else {
            CONFIG.setErrorToast("Somthing Went Wrong!");
        }
    };

    //get a bank account by id
    getBankAccountById = async (id) => {

        const res = await Accountant_CONTROLLER.getBankAccountByID(id, this.props.auth.token);
        console.log(res.data.data.holder_name);
        this.setState({
            id: res.data.data.id,
            bank_name: res.data.data.bank_name,
            account_type: res.data.data.account_type,
            account_number: res.data.data.account_number,
            holder_name: res.data.data.holder_name,
            branch_name: res.data.data.branch_name,
            added_by: ''
        })
        console.log(this.state.bank_name);
    };

    //update a bank acccount
    updateBankAccount = async (e) => {
        e.preventDefault();
        var data = {
            id: this.state.id,
            bank_name: this.state.bank_name,
            account_type: this.state.account_type,
            account_number: this.state.account_number,
            holder_name: this.state.holder_name,
            branch_name: this.state.branch_name,
            added_by: this.props.auth.user.user_details.id,


        };
        console.log(data);
        const result = await Accountant_CONTROLLER.updateBankAccount(data, this.props.auth.token);

        if (result.status == 200) {
            CONFIG.setToast("Successfully Updated!");
            this.updateClear();
            this.loadAllBankAccounts();


        } else {
            this.setState({
                error_message: result.response.statusText
            });
            CONFIG.setErrorToast(" Somthing Went Wrong!");
            //this.updateClear();
        }

    }

    paginate = async pageNum => {
        this.setState({
            current_page: pageNum
        }, () => {
            this.loadAllBankAccounts();
        }
        );
    };
    nextPage = async () => {
        if (this.state.current_page < this.state.no_of_pages) {


            this.setState({
                current_page: this.state.current_page + 1
            }, () => {
                this.loadAllBankAccounts();
            }
            );
        }

    };

    prevPage = async () => {
        if (this.state.current_page >= this.state.no_of_pages) {
            this.setState({
                current_page: this.state.current_page - 1
            }, () => {
                this.loadAllBankAccounts();
            }
            );
        }
    };


    render() {
        const { current_page, no_of_pages } = this.state;



        const pageNumbers = [];

        for (let i = 1; i <= no_of_pages; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="bg-light wd-wrapper">
                <AccountantSidebar activemenu={'BANK_ACCOUNTS'} />
                <div className="wrapper-wx" style={{ height: "100hv" }}>
                    <div className="container-fluid">

                        <div>
                            {/* Title and the add new bank account button */}
                            <div className="row" style={{ marginTop: "5px", fontFamily: "sans-serif", marginBottom: "15px" }}>
                                <div className="col-sm-9">
                                    <div className="row">
                                        <div className="col-sm">
                                            <h6 style={{ paddingTop: "10px", paddingLeft: "5px" }}>Bank Account Details<br></br>
                                                <span className="text-muted small">Dashboard / Bank Accounts</span></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <Button variant="" style={{ backgroundColor: "#475466", color: "#FFFFFF", width: "100%", cursor: 'pointer' }} onClick={() => this.change_toggle()}>Add New Bank Account</Button>
                                </div>
                            </div>

                            {/* Add bank account form toggle */}
                            <div className="row" style={{ display: this.state.addBankAccountState == true ? 'block' : 'none', marginBottom: "15px" }}>
                                <div className="col-12">
                                    <Card className="col-12">
                                        <Card.Body>

                                            <div className="col-12 bg-white mt-1 pb-1" >
                                                <form onSubmit={(e) => this.addBankAccount(e)}>
                                                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Bank Account Details<br></br>
                                                        <span className="text-muted small">You can add a new Bank Account by filling relavant Information</span></h6>
                                                    <div className="row" >
                                                        <div className="col-sm-12">

                                                            <div className="row">
                                                                <div className="col-sm-4 mt-1 mb-1" >
                                                                    <FormInput
                                                                        required={true}
                                                                        label={'Bank Name *'}
                                                                        placeholder={"Enter Bank Name"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.bank_name}
                                                                        name="bank_name"
                                                                        onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-4 mt-1 mb-1" >
                                                                    <FormInput
                                                                        required={true}
                                                                        label={'Account Type *'}
                                                                        placeholder={"Enter Account Type "}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.account_type}
                                                                        name="account_type"
                                                                        onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                    />


                                                                </div>
                                                                <div className="col-sm-4 mt-1 mb-1" >
                                                                    <FormInput
                                                                        required={true}
                                                                        type="Number"
                                                                        label={'Account Number *'}
                                                                        placeholder={"Enter Account Number"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.account_number}
                                                                        name="account_number"
                                                                        onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                    />
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{this.state.error_message}</h4>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-8">

                                                            <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput
                                                                        required={true}
                                                                        label={"Holder Name *"}
                                                                        placeholder={"Enter Holder Name"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.holder_name}
                                                                        name="holder_name"
                                                                        onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput
                                                                        required={true}
                                                                        label={"Branch Name *"}
                                                                        placeholder={"Enter Branch Name"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.branch_name}
                                                                        name="branch_name"
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

                            {/* update bank account form toggle */}
                            <div className="row" style={{ display: this.state.updateBankAccountState == true ? 'block' : 'none', marginBottom: "15px" }}>
                                <div className="col-12">
                                    <Card className="col-12">
                                        <Card.Body>
                                            <div className="col-12 bg-white mt-1 pb-1" >
                                                <form onSubmit={(e) => this.updateBankAccount(e)}>
                                                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Update Bank Account Details<br></br>
                                                        <span className="text-muted small">You can update Bank Account by updating relevant Information</span></h6>
                                                    <div className="row" >
                                                        <div className="col-sm-12">

                                                            <div className="row">
                                                                <div className="col-sm-4 mt-1 mb-1" >
                                                                    <FormInput
                                                                        required={true}
                                                                        label={'Bank Name *'}
                                                                        placeholder={"Enter Bank Name"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.bank_name}
                                                                        name="bank_name"
                                                                        onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-4 mt-1 mb-1" >
                                                                    <FormInput
                                                                        required={true}
                                                                        label={'Account Type *'}
                                                                        placeholder={"Enter Account Type "}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.account_type}
                                                                        name="account_type"
                                                                        onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                    />


                                                                </div>
                                                                <div className="col-sm-4 mt-1 mb-1" >
                                                                    <FormInput
                                                                        required={true}
                                                                        type="Number"
                                                                        label={'Account Number *'}
                                                                        placeholder={"Enter Account Number"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.account_number}
                                                                        name="account_number"
                                                                        onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                    />
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{this.state.error_message}</h4>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-sm-8">

                                                            <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput
                                                                        required={true}
                                                                        label={"Holder Name *"}
                                                                        placeholder={"Enter Holder Name"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.holder_name}
                                                                        name="holder_name"
                                                                        onChange={this.formValueChange}
                                                                    //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput
                                                                        required={true}
                                                                        label={"Branch Name *"}
                                                                        placeholder={"Enter Branch Name"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.branch_name}
                                                                        name="branch_name"
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

                        {/*
                            Display All Bank Accounts
                        */}
                        <div>
                            <div className="row" style={{ display: this.state.isLoading == false ? 'block' : 'none', marginTop: "20px" }}>
                                <div className="col-sm">
                                    <Card>
                                        <Table striped bordered hover variant="light">
                                            <thead>
                                                <tr>
                                                    <th>Bank Name</th>
                                                    <th>Account Type</th>
                                                    <th>Account Number</th>
                                                    <th>Holder Name </th>
                                                    <th>Branch Name</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.bank_accounts.map((value,) => {
                                                        return (
                                                            <tr key={value.id}>
                                                                <td>{value.bank_name}</td>
                                                                <td>{value.account_type}</td>
                                                                <td>{value.account_number}</td>
                                                                <td>{value.holder_name}</td>
                                                                <td>{value.branch_name}</td>
                                                                <td><Dropdown as={ButtonGroup}>


                                                                    <Dropdown.Toggle variant="" id="dropdown-split-basic" >
                                                                        <FontAwesomeIcon icon={faEllipsisV} />
                                                                    </Dropdown.Toggle>

                                                                    <Dropdown.Menu>
                                                                        {this.state.updateBankAccountState
                                                                            ? <Dropdown.Item href="#/action-1" onClick={() => this.getBankAccountById(value.id)}>
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
                        </div>


                        <Spinner animation="border" role="status" style={{ display: this.state.isLoading == true ? 'block' : 'none', margin: 'auto' }}>
                            <span className="sr-only">Loading...</span>
                        </Spinner>


                        {/*//Pagination*/}
                        <nav style={{ display: this.state.isLoading == false ? 'block' : 'none', marginTop: "15px" }}>
                            <ul className="pagination justify-content-center">
                                <li className="page-item">
                                    <button className="page-link" onClick={() => this.prevPage()}>Previous</button>
                                </li>
                                {pageNumbers.map(num => (
                                    <li className="page-item" key={num}>
                                        <button onClick={() => this.paginate(num)} className="page-link" style={{ color: current_page == num ? "blue" : "black" }}>{num}</button>
                                    </li>
                                ))}
                                <li className="page-item">
                                    <button className="page-link" onClick={() => this.nextPage()}>Next</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});

export default connect(mapStateToProps, null)(withRouter(BankAccount));
