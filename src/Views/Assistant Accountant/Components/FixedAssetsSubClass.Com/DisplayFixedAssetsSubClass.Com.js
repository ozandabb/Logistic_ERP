import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faArrowAltCircleDown, faTrash, faEllipsisV, faPeace, faPenAlt } from '@fortawesome/free-solid-svg-icons'
import { Tab, Row, Col, Nav, Card, InputGroup, FormControl, Image, Button, Table, Dropdown, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import CONFIG from '../../../../Controllers/Config.controller';
import { FormInput } from '../../../../Components/Form';
import './DisplayFixedAssetsSubClass.Com.css';
import FixedAssetsSubClass_CONTROLLER from '../../../../Controllers/AssistantAccountant/FixedAssetsSubClasses.controller';
import FixedAssetsClass_CONTROLLER from '../../../../Controllers/AssistantAccountant/FixedAssetsClasses.controller';

class DisplayFixedAssetsSubClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchState: false,
            addFixedAssetsSubClassState: false,
            updateFixedAssetsSubClassState: false,

            id: '',
            code: '',
            description: '',
            primary_code_id: '',
            depreciation_rate: '',

            fixedAssetsSubClassList: [],
            fixedAssetsClassList: [],
            search: '',

            no_of_pages: 0,
            current_page: 1,

            errors: {},
        };
    }

    async componentDidMount() {
        this.loadAllFixedAssetsSubClasses();
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
        if (this.state.addFixedAssetsSubClassState) {
            this.setState({ addFixedAssetsSubClassState: false })
        } else {
            this.setState({ addFixedAssetsSubClassState: true })
        }
    }

    //GET all FixedAssetsSubClasses
    loadAllFixedAssetsSubClasses = async () => {
        const res = await FixedAssetsSubClass_CONTROLLER.getAllFixedAssetsSubClasses(5, this.state.current_page - 1, this.props.auth.token);
        this.setState({
            fixedAssetsSubClassList: res.data.rows,
            no_of_pages: res.data.pages
        });
    }

    //GET all FixedAssetsClasses
    loadAllFixedAssetsClasses = async () => {
        const res = await FixedAssetsClass_CONTROLLER.getAllFixedAssetsClassesWithoutPagination(this.props.auth.token);
        this.setState({
            fixedAssetsClassList: res.data.rows
        });
    }

    //DELETE Fucntion
    onClickDelete = (id) => {
        if (id == '') {
            CONFIG.setErrorToast("Please Select a Fixed Assets Sub Class to Delete!");
        } else {
            CONFIG.setDeleteConfirmAlert(
                "",
                "Are you sure you want to delete this Fixed Assets SubClass ?",
                () => this.clickDeleteFixedAssetsSubClass(id),
                () => { }
            );
        }
    };
    clickDeleteFixedAssetsSubClass = async (id) => {
        const result = await FixedAssetsSubClass_CONTROLLER.DeleteFixedAssetsSubClass(id, this.props.auth.token);

        if (result.status == 200) {
            CONFIG.setToast("Successfully Deleted!");
            this.loadAllFixedAssetsSubClasses();
        } else {
            CONFIG.setErrorToast(result.response.data.message);
        }
    };

    //FixedAssetsSubClass form value change
    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    //add FixedAssetsSubClass submit
    onFormSubmit = async (e) => {
        e.preventDefault();
        if (this.validate()) {
            var data = {
                code: this.state.code,
                description: this.state.description,
                primary_code_id: this.state.primary_code_id,
                depreciation_rate: this.state.depreciation_rate,
            }

            const result = await FixedAssetsSubClass_CONTROLLER.addFixedAssetsSubClass(data, this.props.auth.token);
            console.log(result);
            if (result.status == 201) {
                CONFIG.setToast("Successfully Added");
                this.clear();
                this.loadAllFixedAssetsSubClasses();
            } else {
                CONFIG.setErrorToast(result.response.data.message);
            }
        }
    }

    //Get FixedAssetsSubClass by ID - function
    onClickEdit = async (id) => {
        const response = await FixedAssetsSubClass_CONTROLLER.getFixedAssetsSubClassByID(id, this.props.auth.token);

        if (response.status == 200) {
            this.setState({
                errors: {},
                updateFixedAssetsSubClassState: true,
                id: response.data.data.id,
                code: response.data.data.code,
                description: response.data.data.description,
                primary_code_id: response.data.data.primary_code_id,
                depreciation_rate: response.data.data.depreciation_rate,
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
                description: this.state.description,
                primary_code_id: this.state.primary_code_id,
                depreciation_rate: this.state.depreciation_rate,
            }

            const result = await FixedAssetsSubClass_CONTROLLER.updateFixedAssetsSubClass(data, this.props.auth.token);

            if (result.status == 200) {
                CONFIG.setToast("Successfully Updated!");
                this.clear();
                this.loadAllFixedAssetsSubClasses();
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
            code: '',
            description: '',
            primary_code_id: '',
            depreciation_rate: '',
            updateFixedAssetsSubClassState: false,
            addFixedAssetsSubClassState: false,
        })
    }

    paginate = async pageNum => {
        this.setState({
            current_page: pageNum
        }, () => {
            this.loadAllFixedAssetsSubClasses();
        });
    };
    nextPage = async () => {
        if (this.state.current_page < this.state.no_of_pages) {
            this.setState({
                current_page: this.state.current_page + 1
            }, () => {
                this.loadAllFixedAssetsSubClasses();
            });
        }

    };

    prevPage = async () => {
        if (this.state.current_page >= this.state.no_of_pages) {
            this.setState({
                current_page: this.state.current_page - 1
            }, () => {
                this.loadAllFixedAssetsSubClasses();
            });
        }
    };

    render() {
        const { fixedAssetsSubClassList, fixedAssetsClassList, code, description, depreciation_rate, primary_code_id, errors, search, current_page, no_of_pages } = this.state;
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
                                    <h6 style={{ paddingTop: "10px", paddingLeft: "5px" }}>Fixed Assets Sub Class Details<br></br>
                                        <span className="text-muted small">Dashboard / Fixed Assets Sub Classes</span></h6>
                                </div>
                                <div className="col-sm">
                                    {['bottom'].map((placement) => (
                                        <OverlayTrigger
                                            key={placement}
                                            placement={placement}
                                            overlay={
                                                <Tooltip id={`tooltip-${placement}`}>
                                                    Print All Fixed Assets Sub Classes
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
                            <Button variant="" style={{ backgroundColor: "#475466", color: "#FFFFFF", width: "100%", cursor: 'pointer' }} onClick={() => this.change_toggle()}>Add New Fixed Assets Sub Class</Button>
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

                    {/* Add FixedAssetsSubClass form toggle */}
                    <div className="row" style={{ display: this.state.addFixedAssetsSubClassState == true ? 'block' : 'none', marginBottom: "15px" }}>
                        <div className="col-12">
                            <Card className="col-12">
                                <Card.Body>
                                    <div className="col-12 bg-white mt-1 pb-1" >
                                        <form onSubmit={(e) => this.onFormSubmit(e)}>
                                            <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Fixed Assets Sub Class Details<br></br>
                                                <span className="text-muted small">You can add a new Fixed Assets Sub Class by filling relavant Information</span></h6>
                                            <div className="row" >
                                                <div className="col-sm-8">

                                                    <div className="row">
                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Fixed Assets Sub Class Code *'}
                                                                placeholder={"Enter Fixed Assets Sub Class Code"}
                                                                value={this.state.code}
                                                                name="code"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.code && errors.code.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.code}</h4>}
                                                        </div>
                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Fixed Assets Sub Class Depreciation Rate *'}
                                                                placeholder={"Enter Fixed Assets Sub Class Depreciation Rate"}
                                                                value={this.state.depreciation_rate}
                                                                type='number'
                                                                name="depreciation_rate"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.depreciation_rate && errors.depreciation_rate.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.depreciation_rate}</h4>}
                                                        </div>
                                                        <div className="col-sm-6 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Primary Class</Form.Label>
                                                                <Form.Control as="select" name="primary_code_id" value={this.state.primary_code_id} onChange={this.formValueChange}>
                                                                    <option value="">Select Primary Class</option>
                                                                    {
                                                                        fixedAssetsClassList && fixedAssetsClassList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.code}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.primary_code_id && errors.primary_code_id.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.primary_code_id}</h4>}
                                                        </div>
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

                    {/* Update FixedAssetsSubClass form toggle */}
                    <div className="row" style={{ display: this.state.updateFixedAssetsSubClassState == true ? 'block' : 'none', marginBottom: "15px" }}>
                        <div className="col-12">
                            <Card className="col-12">
                                <Card.Body>

                                    <div className="col-12 bg-white mt-1 pb-1" >
                                        <form onSubmit={(e) => this.onFormSubmitUpdate(e)}>
                                            <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Update Fixed Assets Sub Class Details<br></br>
                                                <span className="text-muted small">You can update a Fixed Assets Sub Class by filling relavant Information</span></h6>
                                            <div className="row" >
                                                <div className="col-sm-8">

                                                    <div className="row">
                                                        <div className="col-sm-12 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Fixed Assets Sub Class Code *'}
                                                                placeholder={"Enter Fixed Assets Sub Class Code"}
                                                                value={this.state.code}
                                                                name="code"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.code && errors.code.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.code}</h4>}
                                                        </div>
                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Fixed Assets Sub Class Depreciation Rate *'}
                                                                placeholder={"Enter Fixed Assets Sub Class Depreciation Rate"}
                                                                value={this.state.depreciation_rate}
                                                                type='number'
                                                                name="depreciation_rate"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.depreciation_rate && errors.depreciation_rate.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.depreciation_rate}</h4>}
                                                        </div>
                                                        <div className="col-sm-6 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Primary Class</Form.Label>
                                                                <Form.Control as="select" name="primary_code_id" value={this.state.primary_code_id} onChange={this.formValueChange}>
                                                                    <option value="">Select Primary Class</option>
                                                                    {
                                                                        fixedAssetsClassList && fixedAssetsClassList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.code}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.primary_code_id && errors.primary_code_id.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.primary_code_id}</h4>}
                                                        </div>
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
                                    <th>Depreciation Rate</th>
                                    <th>Primary Class</th>
                                    <th>Description</th>
                                    <th>Created At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fixedAssetsSubClassList && fixedAssetsSubClassList.map((name) => this.renderOneFixedAssetSubClass(name))}
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

    renderOneFixedAssetSubClass = (item, i) => {
        const { search } = this.state;
        if (search !== "") {
            if (item.code.toLowerCase().indexOf(search.toLowerCase()) === -1) {
                if (item.fa_class_code && item.fa_class_code.code.toLowerCase().indexOf(search.toLowerCase()) === -1) {
                    if (item.description.toLowerCase().indexOf(search.toLowerCase()) === -1) {
                        return null;
                    }
                }
            }
        }

        return (
            <tr key={i}>
                <td>{item.code}</td>
                <td>{item.depreciation_rate}%</td>
                <td>{item.fa_class_code ? item.fa_class_code.code : ''}</td>
                <td>{item.description}</td>
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
        let { errors, code, description, primary_code_id, depreciation_rate } = this.state;
        let count = 0;

        if (code.length === 0) {
            errors.code = 'Code can not be empty !'
            count++
        } else {
            errors.code = ''
        }

        if (primary_code_id.length === 0) {
            errors.primary_code_id = 'Select a primary class!'
            count++
        } else {
            errors.primary_code_id = ''
        }

        if (depreciation_rate.length === 0) {
            errors.depreciation_rate = 'Depreciation Rate can not be empty !'
            count++
        } else {
            if (depreciation_rate > 100) {
                errors.depreciation_rate = 'Depreciation Rate can not be larger than 100 !'
                count++
            } else if (depreciation_rate < 0) {
                errors.depreciation_rate = 'Depreciation Rate can not be a negative value !'
                count++
            } else {
                errors.depreciation_rate = ''
            }
        }

        if (description.length === 0) {
            errors.description = 'Description can not be empty !'
            count++
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

export default connect(mapStateToProps, null)(withRouter(DisplayFixedAssetsSubClass));