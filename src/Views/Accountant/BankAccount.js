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
import {Button, Card, Table} from "react-bootstrap";
import {FormInput} from "../../Components/Form";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import _findIndex from "lodash.findindex";

let active = 2;
let items = [];

class BankAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addBankAccountState: false,
            updateBankAccountState: false,
            bank_name:'',
            account_type:'',
            account_number:'',
            holder_name:'',
            branch_name:'',
            added_by:'',

            bank_accounts: [],
            no_of_pages : ''
        };
    }

    change_toggle = () => {
        if (this.state.addBankAccountState) {
            this.setState({ addBankAccountState: false })
        } else {
            this.setState({ addBankAccountState: true })
        }
    };

    update_toggle = () => {
        if (this.state.updateBankAccountState) {
            this.setState({ updateBankAccountState: false })
        } else {
            this.setState({ updateBankAccountState: true })
        }
    };



    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    };

    onFormSubmit = async (e) => {
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

        if(result.status == 201){
            CONFIG.setToast("Successfully Added");
            console.log("OLD :" +this.state.bank_accounts);
            this.clear();
            this.setState(  {
                bank_accounts : [result.data , ...this.state.bank_accounts]
            });
            console.log("new " + this.state.bank_accounts);

        }else{
            CONFIG.setErrorToast(" Somthing Went Wrong!");
            this.clear();
        }
    };

    clear = ()=>{
        this.setState({
            bank_name:'',
            account_type:'',
            account_number:'',
            holder_name:'',
            branch_name:'',
            added_by: ''
        });

        this.change_toggle();
    };

    onChange = e =>{
        this.setState({search : e.target.value });
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
        const res = await Accountant_CONTROLLER.getAllBankAccounts(this.props.auth.token);
        this.setState({
            bank_accounts: res.data.rows,
            no_of_pages : res.data.pages
        });
        this.paginations();
        console.log("load"+this.state.no_of_pages);
    };

    paginations = async () => {
        var pages = this.state.no_of_pages;
        console.log("hello" + this.state.no_of_pages);
        for (let number = 1; number <= pages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active}>
                    {number}
                </Pagination.Item>,
            );
        }
    };

    //delete a bank account
    onClickDelete = (id) => {
        if(id == ''){
            CONFIG.setErrorToast("Please Select a Supplier to Delete!");
        }else{
            CONFIG.setDeleteConfirmAlert(
                "",
                "Are you sure you want to delete this Supplier ?",
                () => this.deleteBankAccount(id),
                () => {}
            );
        }
    };

    deleteBankAccount = async (id) => {
        const res = await Accountant_CONTROLLER.deleteBankAccount(id,this.props.auth.token);
        let bank_account = this.state.bank_accounts;
        let record_index  = _findIndex (bank_account, {id: id});
        //this.loadAllBankAccounts();
        bank_account.splice(record_index,1);
        this.setState({
            bank_accounts: bank_account
        });
        console.log(res);
    };

    //get a bank account by id
    getBankAccountById = async (id) => {
        const res = await Accountant_CONTROLLER.getBankAccountByID(id,this.props.auth.token);


    }


    render() {
        return (
            <div className="bg-light wd-wrapper">
                <AccountantSidebar activemenu={'BANK_ACCOUNTS'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">

                        {/*
                            Add Bank Account Section with the Header
                            Component
                            AddBankAccount.Com.js
                        */}
                        <div>
                            {/* Title and the add new bank account button */}
                            <div className="row" style={{marginTop:"5px", fontFamily:"sans-serif", marginBottom:"15px"}}>
                                <div className="col-sm-9">
                                    <div className="row">
                                        <div className="col-sm">
                                            <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Bank Account Details<br></br>
                                                <span className="text-muted small">Dashboard / Bank Accounts</span></h6>
                                        </div>
                                        {/*<div className="col-sm">*/}
                                        {/*    {['bottom'].map((placement) => (*/}
                                        {/*        <OverlayTrigger*/}
                                        {/*            key={placement}*/}
                                        {/*            placement={placement}*/}
                                        {/*            overlay={*/}
                                        {/*                <Tooltip id={`tooltip-${placement}`}>*/}
                                        {/*                    Print All Bank Accounts*/}
                                        {/*                </Tooltip>*/}
                                        {/*            }*/}
                                        {/*        >*/}
                                        {/*            <Image src="/images/printer.png" className="d-none d-lg-block" style={{width:"40px", marginTop:"10px", marginLeft:"10px"}} rounded />*/}
                                        {/*        </OverlayTrigger>*/}
                                        {/*    ))}*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <Button variant="" style={{backgroundColor:"#475466" , color:"#FFFFFF", width:"100%",  cursor: 'pointer'}} onClick={() => this.change_toggle()}>Add New Bank Account</Button>
                                </div>
                            </div>

                            {/* Add bank account form toggle */}
                            <div className="row" style={{ display: this.state.addBankAccountState == true ? 'block' : 'none', marginBottom:"15px" }}>
                                <div className="col-12">
                                    <Card className="col-12">
                                        <Card.Body>

                                            <div className="col-12 bg-white mt-1 pb-1" >
                                                <form onSubmit={(e) => this.onFormSubmit(e)}>
                                                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Bank Account Details<br></br>
                                                        <span className="text-muted small">You can add a new Bank Account by filling relavant Information</span></h6>
                                                    <div className="row" >
                                                        <div className="col-sm-8">

                                                            <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput
                                                                        label={'Bank Name *'}
                                                                        placeholder={"Enter Bank Name"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.bank_name}
                                                                        name="bank_name"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput
                                                                        label={'Account Type *'}
                                                                        placeholder={"Enter Account Type "}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.account_type}
                                                                        name="account_type"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-12 mt-1 mb-1" >
                                                                    <FormInput
                                                                        label={'Account Number *'}
                                                                        placeholder={"Enter Account Number"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.account_number}
                                                                        name="account_number"
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
                                                                        label={"Holder Name *"}
                                                                        placeholder={"Enter Holder Name"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.holder_name}
                                                                        name="holder_name"
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

                            {/* update bank account form toggle */}
                            <div className="row" style={{ display: this.state.updateBankAccountState == true ? 'block' : 'none', marginBottom:"15px" }}>
                                <div className="col-12">
                                    <Card className="col-12">
                                        <Card.Body>

                                            <div className="col-12 bg-white mt-1 pb-1" >
                                                <form onSubmit={(e) => this.onFormSubmit(e)}>
                                                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Update Bank Account Details<br></br>
                                                        <span className="text-muted small">You can add a new Bank Account by filling relavant Information</span></h6>
                                                    <div className="row" >
                                                        <div className="col-sm-8">

                                                            <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput
                                                                        label={'Bank Name *'}
                                                                        placeholder={"Enter Bank Name"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.bank_name}
                                                                        name="bank_name"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput
                                                                        label={'Account Type *'}
                                                                        placeholder={"Enter Account Type "}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.account_type}
                                                                        name="account_type"
                                                                        onChange={this.formValueChange}
                                                                        //error_meesage={'*Group Number required'}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-12 mt-1 mb-1" >
                                                                    <FormInput
                                                                        label={'Account Number *'}
                                                                        placeholder={"Enter Account Number"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.account_number}
                                                                        name="account_number"
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
                                                                        label={"Holder Name *"}
                                                                        placeholder={"Enter Holder Name"}
                                                                        //error={ errors.group_mo}
                                                                        value={this.state.holder_name}
                                                                        name="holder_name"
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
                        </div>


                        {/*
                            Display All Bank Accounts

                        */}

                        <div>
                            <div className="row" style={{marginTop:"20px"}}>
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
                                                this.state.bank_accounts.map((value , ) =>  {
                                                    return(
                                                        <tr key={value.id}>
                                                            <td>{value.bank_name}</td>
                                                            <td>{value.account_type}</td>
                                                            <td>{value.account_number}</td>
                                                            <td>{value.holder_name}</td>
                                                            <td>{value.branch_name}</td>
                                                            <td><Dropdown as={ButtonGroup}>


                                                                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item href="#/action-1" onClick={() => this.update_toggle()}>
                                                                        Edit
                                                                    </Dropdown.Item>
                                                                    <Dropdown.Item href="#/action-2" onClick = {(() => this.onClickDelete(value.id))}>
                                                                        Delete
                                                                    </Dropdown.Item>

                                                                </Dropdown.Menu>
                                                            </Dropdown></td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </Table>
                                        <div >
                                            <Row>

                                                <Col md={{ span: 3, offset: 3 }}>
                                                    {/*<ReactBootstrapStyle/>*/}
                                                    <Pagination>{items}</Pagination>
                                                    <br />
                                                </Col>
                                            </Row>


                                        </div>
                                    </Card>
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

export default connect(mapStateToProps, null)(withRouter(BankAccount));
