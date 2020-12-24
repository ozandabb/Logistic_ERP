import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faArrowAltCircleDown, faTrash, faEllipsisV, faPeace, faPenAlt } from '@fortawesome/free-solid-svg-icons'
import { Tab, Row, Col, Nav, Card, InputGroup, FormControl, Image, Button, Table, Dropdown, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import CONFIG from '../../../../Controllers/Config.controller';
import { FormInput } from '../../../../Components/Form';
import './DisplayAccount.Com.css';
import Account_CONTROLLER from '../../../../Controllers/AccountsExecutives/Accounts.controller';

class DisplayAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchState: false,
            addAccountState: false,
            updateAccountState: false,

            id: '',
            name: '',
            type: '',

            accountList: [],
            search: '',

            no_of_pages: 0,
            current_page: 1,

            errors: {},
        };
    }

    async componentDidMount() {
        this.loadAllAccounts();
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
        if (this.state.addAccountState) {
            this.setState({ addAccountState: false })
        } else {
            this.setState({ addAccountState: true })
        }
    }

    //GET all Accounts
    loadAllAccounts = async () => {
        const res = await Account_CONTROLLER.getAllAccounts(5, this.state.current_page - 1, this.props.auth.token);
        this.setState({
            accountList: res.data.rows,
            no_of_pages: res.data.pages
        });
    }

    //DELETE Fucntion
    onClickDelete = (id) => {
        if (id == '') {
            CONFIG.setErrorToast("Please Select an Account to Delete!");
        } else {
            CONFIG.setDeleteConfirmAlert(
                "",
                "Are you sure you want to delete this Account ?",
                () => this.clickDeleteAccount(id),
                () => { }
            );
        }
    };
    clickDeleteAccount = async (id) => {
        const result = await Account_CONTROLLER.DeleteAccounts(id, this.props.auth.token);

        if (result.status == 200) {
            CONFIG.setToast("Successfully Deleted!");
            this.loadAllAccounts();
        } else {
            CONFIG.setErrorToast(result.response.data.message);
        }
    };

    //Account form value change
    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    //add Account submit
    onFormSubmit = async (e) => {
        e.preventDefault();
        if (this.validate()) {
            var data = {
                id: this.state.id,
                name: this.state.name,
                type: this.state.type,
            }

            const result = await Account_CONTROLLER.addAccounts(data, this.props.auth.token);

            if (result.status == 201) {
                CONFIG.setToast("Successfully Added");
                this.clear();
                this.loadAllAccounts();
            } else {
                CONFIG.setErrorToast(result.response.data.message);
            }
        }
    }

    //Get Account by ID - function
    onClickEdit = async (id) => {
        const response = await Account_CONTROLLER.getAccountsByID(id, this.props.auth.token);

        if (response.status == 200) {
            this.setState({
                errors: {},
                updateAccountState: true,
                id: response.data.data.id,
                name: response.data.data.name,
                type: response.data.data.type,
            });
        }
    }

    //Update form submit
    onFormSubmitUpdate = async (e) => {
        e.preventDefault();

        if (this.updateValidate()) {
            var data = {
                id: this.state.id,
                name: this.state.name,
                type: this.state.type,
            }

            const result = await Account_CONTROLLER.updateAccounts(data, this.props.auth.token);

            if (result.status == 200) {
                CONFIG.setToast("Successfully Updated!");
                this.clear();
                this.loadAllAccounts();
            }
            else {
                CONFIG.setErrorToast(result.response.data.message);
            }
        }
    }

    //Clear all input details
    clear = () => {
        this.setState({
            id: '',
            name: '',
            type: '',
            updateAccountState: false,
            addAccountState: false,
        })
    }

    paginate = async pageNum => {
        this.setState({
            current_page: pageNum
        }, () => {
            this.loadAllAccounts();
        });
    };
    nextPage = async () => {
        if (this.state.current_page < this.state.no_of_pages) {
            this.setState({
                current_page: this.state.current_page + 1
            }, () => {
                this.loadAllAccounts();
            });
        }

    };

    prevPage = async () => {
        if (this.state.current_page >= this.state.no_of_pages) {
            this.setState({
                current_page: this.state.current_page - 1
            }, () => {
                this.loadAllAccounts();
            });
        }
    };

    render() {
        const { accountList, errors, current_page, no_of_pages } = this.state;
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
                                    <h6 style={{ paddingTop: "10px", paddingLeft: "5px" }}>Account Details<br></br>
                                        <span className="text-muted small">Dashboard / Accounts</span></h6>
                                </div>
                                <div className="col-sm">
                                    {['bottom'].map((placement) => (
                                        <OverlayTrigger
                                            key={placement}
                                            placement={placement}
                                            overlay={
                                                <Tooltip id={`tooltip-${placement}`}>
                                                    Print All Accounts
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
                            <Button variant="" style={{ backgroundColor: "#475466", color: "#FFFFFF", width: "100%", cursor: 'pointer' }} onClick={() => this.change_toggle()}>Add New Account</Button>
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

                    {/* Add Account form toggle */}
                    <div className="row" style={{ display: this.state.addAccountState == true ? 'block' : 'none', marginBottom: "15px" }}>
                        <div className="col-12">
                            <Card className="col-12">
                                <Card.Body>

                                    <div className="col-12 bg-white mt-1 pb-1" >
                                        <form onSubmit={(e) => this.onFormSubmit(e)}>
                                            <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Account Details<br></br>
                                                <span className="text-muted small">You can add a new Account by filling relavant Information</span></h6>
                                            <div className="row" >
                                                <div className="col-sm-8">

                                                    <div className="row">
                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Account ID*'}
                                                                placeholder={"Enter Account ID"}
                                                                value={this.state.id}
                                                                name="id"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.id && errors.id.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.id}</h4>}
                                                        </div>
                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Account Name*'}
                                                                placeholder={"Enter Account Name"}
                                                                value={this.state.name}
                                                                name="name"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.name && errors.name.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.name}</h4>}
                                                        </div>
                                                        <div className="col-sm-12 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Type</Form.Label>
                                                                <Form.Control as="select" name="type" value={this.state.type} onChange={this.formValueChange}>
                                                                    <option value="">Select Type</option>
                                                                    <option value="Asset">Asset</option>
                                                                    <option value="Liability">Liability</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.type && errors.type.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.type}</h4>}
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

                    {/* Update Account form toggle */}
                    <div className="row" style={{ display: this.state.updateAccountState == true ? 'block' : 'none', marginBottom: "15px" }}>
                        <div className="col-12">
                            <Card className="col-12">
                                <Card.Body>

                                    <div className="col-12 bg-white mt-1 pb-1" >
                                        <form onSubmit={(e) => this.onFormSubmitUpdate(e)}>
                                            <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Update Account Details<br></br>
                                                <span className="text-muted small">You can update a Account by filling relavant Information</span></h6>
                                            <div className="row" >
                                                <div className="col-sm-8">

                                                    <div className="row">
                                                        {/* <div className="col-sm-6 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Account ID*'}
                                                                placeholder={"Enter Account ID"}
                                                                value={this.state.id}
                                                                name="id"
                                                                onChange={this.formValueChange}
                                                                readonly
                                                            />
                                                            {errors.id && errors.id.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.id}</h4>}
                                                        </div> */}
                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Account Name*'}
                                                                placeholder={"Enter Account Name"}
                                                                value={this.state.name}
                                                                name="name"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.name && errors.name.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.name}</h4>}
                                                        </div>
                                                        {/* <div className="col-sm-12 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Type</Form.Label>
                                                                <Form.Control as="select" name="type" value={this.state.type} onChange={this.formValueChange}>
                                                                    <option value="">Select Type</option>
                                                                    <option value="Asset">Asset</option>
                                                                    <option value="Liability">Liability</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.type && errors.type.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.type}</h4>}
                                                        </div> */}
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
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Created At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accountList && accountList.map((name) => this.renderOneAccount(name))}
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

    renderOneAccount = (item, i) => {
        const { search } = this.state;
        if (search !== "") {
            if (item.id.toLowerCase().indexOf(search.toLowerCase()) === -1) {
                if (item.name.toLowerCase().indexOf(search.toLowerCase()) === -1) {
                    if (item.type.toLowerCase().indexOf(search.toLowerCase()) === -1) {
                        return null;
                    }
                }
            }
        }

        return (
            <tr key={i}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.type}</td>
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
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
        );
    }

    validate = () => {
        let { errors, id, name, type } = this.state;
        let count = 0;

        if (type.length === 0) {
            errors.type = 'Type can not be empty !';
            count++;
        } else {
            errors.type = '';
            if (id.length === 0) {
                errors.id = 'ID can not be empty !'
                count++
            }
            else if (id.length != 6) {
                errors.id = 'ID must be 6 digits!'
                count++
            } else {
                let firstDigit = Math.floor(this.firstDigit(id));
                let lastDigit = id % 10;

                switch (type) {
                    case "Asset":
                        if (firstDigit != 1 || lastDigit != 1) {
                            errors.id = 'ID must be in the format of 1xxxx1 format for Asset Account !'
                            count++
                        } else {
                            errors.id = '';
                        }
                        break;
                    case "Liability":
                        if (firstDigit != 2 || lastDigit != 1) {
                            errors.id = 'ID must be in the format of 2xxxx1 format for Liability Account !'
                            count++
                        } else {
                            errors.id = '';
                        }
                        break;
                    default:
                        break;
                }
            }
        }

        if (name.length === 0) {
            errors.name = 'Name can not be empty !';
            count++;
        } else {
            errors.name = '';
        }

        this.setState({ errors });
        return count == 0;
    }

    updateValidate = () => {
        let { errors, name } = this.state;
        let count = 0;

        if (name.length === 0) {
            errors.name = 'Name can not be empty !';
            count++;
        } else {
            errors.name = '';
        }

        this.setState({ errors });
        return count == 0;
    }

    firstDigit = (x) => {
        while (x > 9) {
            x /= 10;
        }
        return x;
    }
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});

export default connect(mapStateToProps, null)(withRouter(DisplayAccount));