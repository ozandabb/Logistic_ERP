import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faArrowAltCircleDown, faTrash, faEllipsisV, faPeace, faPenAlt, faBook } from '@fortawesome/free-solid-svg-icons'
import { Tab, Row, Col, Nav, Card, InputGroup, FormControl, Image, Button, Table, Dropdown, Form, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import CONFIG from '../../../../Controllers/Config.controller';
import { FormInput } from '../../../../Components/Form';
import './DisplayFixedAssetsCard.Com.css';
import FixedAssetsCard_CONTROLLER from '../../../../Controllers/AssistantAccountant/FixedAssetsCards.controller';
import FixedAssetsClass_CONTROLLER from '../../../../Controllers/AssistantAccountant/FixedAssetsClasses.controller';
import FixedAssetsSubClass_CONTROLLER from '../../../../Controllers/AssistantAccountant/FixedAssetsSubClasses.controller';
import FixedAssetsLocation_CONTROLLER from '../../../../Controllers/AssistantAccountant/FixedAssetsLocation.controller';
import DepreciationBook_CONTROLLER from '../../../../Controllers/AssistantAccountant/DepreciationBook.controller';

class DisplayFixedAssetsCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchState: false,
            addFixedAssetsCardState: false,
            updateFixedAssetsCardState: false,

            id: '',
            description: '',
            serial_number: '',
            class_code: '',
            subclass_code: '',
            location_code: '',
            accountNumber: '',
            accountName: '',

            depreciation_book_id: '',
            fix_assert_id: '',

            fixedAssetsCardList: [],
            classList: [],
            subClassList: [],
            locationList: [],
            depreciationBookList: [],

            isModalOpen: false,

            search: '',

            no_of_pages: 0,
            current_page: 1,

            errors: {},
        };
    }

    async componentDidMount() {
        this.loadAllFixedAssetsCards();
        this.loadAllFixedAssetsClasses();
        this.loadAllFixedAssetsSubClasses();
        this.loadAllFixedAssetsLocations();
        this.loadAllDepreciationBooks();
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
        if (this.state.addFixedAssetsCardState) {
            this.setState({ addFixedAssetsCardState: false })
        } else {
            this.setState({ addFixedAssetsCardState: true })
        }
    }

    openModal = (id) => {
        this.setState({
            isModalOpen: true,
            fix_assert_id: id
        });
    }
    closeModal = () => {
        this.setState({
            isModalOpen: false,
            fix_assert_id: ''
        });
    }

    //GET all FixedAssetsCards
    loadAllFixedAssetsCards = async () => {
        const res = await FixedAssetsCard_CONTROLLER.getAllFixedAssetsCards(5, this.state.current_page - 1, this.props.auth.token);
        this.setState({
            fixedAssetsCardList: res.data,
            no_of_pages: res.data.pages
        });
    }


    //FixedAssetsCard form value change
    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    //add FixedAssetsCard submit
    onFormSubmit = async (e) => {
        e.preventDefault();
        if (this.validate()) {
            var data = {
                id: this.state.id,
                description: this.state.description,
                serial_number: this.state.serial_number,
                class_code: this.state.class_code,
                subclass_code: this.state.subclass_code,
                location_code: this.state.location_code,
                accountNumber: this.state.accountNumber,
                accountName: this.state.accountName,
            }

            const result = await FixedAssetsCard_CONTROLLER.addFixedAssetsCard(data, this.props.auth.token);

            if (result.status == 201) {
                CONFIG.setToast("Successfully Added");
                this.clear();
                this.loadAllFixedAssetsCards();
            } else {
                CONFIG.setErrorToast(result.response.data.message);
            }
        }
    }

    //Get FixedAssetsCard by ID - function
    onClickEdit = async (id) => {
        const response = await FixedAssetsCard_CONTROLLER.getFixedAssetsCardByID(id, this.props.auth.token);
        console.log(response);
        if (response.status == 200) {
            this.setState({
                errors: {},
                updateFixedAssetsCardState: true,
                id: response.data.data.id,
                description: response.data.data.description,
                serial_number: response.data.data.serial_number,
                class_code: response.data.data.class_code,
                subclass_code: response.data.data.subclass_code,
                location_code: response.data.data.location_code,
                accountNumber: response.data.data.accountNumber,
                accountName: response.data.data.accountName,
            });
        }
    }

    //GET all classes
    loadAllFixedAssetsClasses = async () => {
        const res = await FixedAssetsClass_CONTROLLER.getAllFixedAssetsClassesWithoutPagination(this.props.auth.token);
        this.setState({
            classList: res.data.rows
        });
    }

    //GET all sub_classes
    loadAllFixedAssetsSubClasses = async () => {
        const res = await FixedAssetsSubClass_CONTROLLER.getAllFixedAssetsSubClassesWithoutPagination(this.props.auth.token);
        this.setState({
            subClassList: res.data.rows
        });
    }

    //GET all locations
    loadAllFixedAssetsLocations = async () => {
        const res = await FixedAssetsLocation_CONTROLLER.getAllFixedAssetsLocationsWithoutPagination(this.props.auth.token);
        this.setState({
            locationList: res.data.rows
        });
    }

    //GET all DepreciationBooks
    loadAllDepreciationBooks = async () => {
        const res = await DepreciationBook_CONTROLLER.getAllDepreciationBooksWithoutPagination(this.props.auth.token);
        this.setState({
            depreciationBookList: res.data.rows
        });
    }

    //add FixedAssetsCardDepreciation submit
    onAssignFormSubmit = async (e) => {
        e.preventDefault();
        if (this.validateAssign()) {
            var data = {
                depreciation_book_id: this.state.depreciation_book_id,
                fix_assert_id: this.state.fix_assert_id,
            }

            const result = await DepreciationBook_CONTROLLER.assigningDepreciationBookToFixedAsset(data, this.props.auth.token);

            if (result.status == 201) {
                CONFIG.setToast("Successfully Assigned");
                this.clear();
            } else {
                CONFIG.setErrorToast(result.response.data.message);
            }
        }
    }

    //Clear all input details
    clear = () => {
        this.setState({
            id: '',
            description: '',
            serial_number: '',
            class_code: '',
            subclass_code: '',
            location_code: '',
            accountNumber: '',
            accountName: '',
            addFixedAssetsCardState: false,
            updateFixedAssetsCardState: false,
        })
    }

    paginate = async pageNum => {
        this.setState({
            current_page: pageNum
        }, () => {
            this.loadAllFixedAssetsCards();
        });
    };
    nextPage = async () => {
        if (this.state.current_page < this.state.no_of_pages) {
            this.setState({
                current_page: this.state.current_page + 1
            }, () => {
                this.loadAllFixedAssetsCards();
            });
        }

    };

    prevPage = async () => {
        if (this.state.current_page >= this.state.no_of_pages) {
            this.setState({
                current_page: this.state.current_page - 1
            }, () => {
                this.loadAllFixedAssetsCards();
            });
        }
    };

    render() {
        const { fixedAssetsCardList, errors, classList, locationList, subClassList, depreciationBookList, current_page, no_of_pages } = this.state;
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
                                    <h6 style={{ paddingTop: "10px", paddingLeft: "5px" }}>Fixed Assets Card Details<br></br>
                                        <span className="text-muted small">Dashboard / Fixed Assets Cards</span></h6>
                                </div>
                                <div className="col-sm">
                                    {['bottom'].map((placement) => (
                                        <OverlayTrigger
                                            key={placement}
                                            placement={placement}
                                            overlay={
                                                <Tooltip id={`tooltip-${placement}`}>
                                                    Print All Fixed Assets Cards
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
                            <Button variant="" style={{ backgroundColor: "#475466", color: "#FFFFFF", width: "100%", cursor: 'pointer' }} onClick={() => this.change_toggle()}>Add New Fixed Assets Card</Button>
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

                    {/* Add FixedAssetsCard form toggle */}
                    <div className="row" style={{ display: this.state.addFixedAssetsCardState == true ? 'block' : 'none', marginBottom: "15px" }}>
                        <div className="col-12">
                            <Card className="col-12">
                                <Card.Body>

                                    <div className="col-12 bg-white mt-1 pb-1" >
                                        <form onSubmit={(e) => this.onFormSubmit(e)}>
                                            <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Fixed Assets Card Details<br></br>
                                                <span className="text-muted small">You can add a new Fixed Assets Card by filling relavant Information</span></h6>
                                            <div className="row" >
                                                <div className="col-sm-8">

                                                    <div className="row">
                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Fixed Assets Card ID *'}
                                                                placeholder={"Enter Fixed Assets Card ID"}
                                                                value={this.state.id}
                                                                name="id"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.id && errors.id.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.id}</h4>}
                                                        </div>
                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Fixed Assets Card Serial Number *'}
                                                                placeholder={"Enter Fixed Assets Card Serial Number"}
                                                                value={this.state.serial_number}
                                                                name="serial_number"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.serial_number && errors.serial_number.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.serial_number}</h4>}
                                                        </div>
                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Fixed Assets Card Account Number *'}
                                                                placeholder={"Enter Fixed Assets Card Account Number"}
                                                                value={this.state.accountNumber}
                                                                name="accountNumber"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.accountNumber && errors.accountNumber.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.accountNumber}</h4>}
                                                        </div>
                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Fixed Assets Card Account Name *'}
                                                                placeholder={"Enter Fixed Card Account Name"}
                                                                value={this.state.accountName}
                                                                name="accountName"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.accountName && errors.accountName.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.accountName}</h4>}
                                                        </div>

                                                        <div className="col-sm-4 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Class</Form.Label>
                                                                <Form.Control as="select" name="class_code" value={this.state.class_code} onChange={this.formValueChange}>
                                                                    <option value="">Select Class</option>
                                                                    {
                                                                        classList && classList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.code}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.class_code && errors.class_code.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.class_code}</h4>}
                                                        </div>

                                                        <div className="col-sm-4 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Sub Class</Form.Label>
                                                                <Form.Control as="select" name="subclass_code" value={this.state.subclass_code} onChange={this.formValueChange}>
                                                                    <option value="">Select Sub Class</option>
                                                                    {
                                                                        subClassList && subClassList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.code}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.subclass_code && errors.subclass_code.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.subclass_code}</h4>}
                                                        </div>

                                                        <div className="col-sm-4 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Location</Form.Label>
                                                                <Form.Control as="select" name="location_code" value={this.state.location_code} onChange={this.formValueChange}>
                                                                    <option value="">Select Location</option>
                                                                    {
                                                                        locationList && locationList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.code}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.location_code && errors.location_code.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.location_code}</h4>}
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

                    {/* Update FixedAssetsCard form toggle */}
                    <div className="row" style={{ display: this.state.updateFixedAssetsCardState == true ? 'block' : 'none', marginBottom: "15px" }}>
                        <div className="col-12">
                            <Card className="col-12">
                                <Card.Body>

                                    <div className="col-12 bg-white mt-1 pb-1" >
                                        <form>
                                            <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">View Fixed Assets Card Details<br></br>
                                                <span className="text-muted small">You can view a Fixed Assets Card</span></h6>
                                            <div className="row" >
                                                <div className="col-sm-8">

                                                    <div className="row">
                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Fixed Assets Card ID*'}
                                                                placeholder={"Enter Fixed Assets Card ID"}
                                                                value={this.state.id}
                                                                name="id"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.id && errors.id.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.id}</h4>}
                                                        </div>
                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Fixed Assets Card Serial Number *'}
                                                                placeholder={"Enter Fixed Assets Card Serial Number"}
                                                                value={this.state.serial_number}
                                                                name="serial_number"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.serial_number && errors.serial_number.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.serial_number}</h4>}
                                                        </div>
                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Fixed Assets Card Account Number *'}
                                                                placeholder={"Enter Fixed Assets Card Account Number"}
                                                                value={this.state.accountNumber}
                                                                name="accountNumber"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.accountNumber && errors.accountNumber.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.accountNumber}</h4>}
                                                        </div>
                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Fixed Assets Card Account Name *'}
                                                                placeholder={"Enter Fixed Card Account Name"}
                                                                value={this.state.accountName}
                                                                name="accountName"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.accountName && errors.accountName.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.accountName}</h4>}
                                                        </div>

                                                        <div className="col-sm-4 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Class</Form.Label>
                                                                <Form.Control as="select" name="class_code" value={this.state.class_code} onChange={this.formValueChange}>
                                                                    <option value="">Select Class</option>
                                                                    {
                                                                        classList && classList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.code}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.class_code && errors.class_code.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.class_code}</h4>}
                                                        </div>

                                                        <div className="col-sm-4 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Sub Class</Form.Label>
                                                                <Form.Control as="select" name="subclass_code" value={this.state.subclass_code} onChange={this.formValueChange}>
                                                                    <option value="">Select Sub Class</option>
                                                                    {
                                                                        subClassList && subClassList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.code}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.subclass_code && errors.subclass_code.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.subclass_code}</h4>}
                                                        </div>

                                                        <div className="col-sm-4 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Location</Form.Label>
                                                                <Form.Control as="select" name="location_code" value={this.state.location_code} onChange={this.formValueChange}>
                                                                    <option value="">Select Location</option>
                                                                    {
                                                                        locationList && locationList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.code}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.location_code && errors.location_code.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.location_code}</h4>}
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
                                    <th>Serial #</th>
                                    <th>Description</th>
                                    <th>Created At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fixedAssetsCardList && fixedAssetsCardList.map((name) => this.renderOneFixedAssetCard(name))}
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
                <Modal show={this.state.isModalOpen} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Assign Depereciation Method</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) => this.onAssignFormSubmit(e)}>
                            <div className="row" >
                                <div className="col-md-12">
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Select Depreciation Method</Form.Label>
                                        <Form.Control as="select" name="depreciation_book_id" value={this.state.depreciation_book_id} onChange={this.formValueChange}>
                                            <option value="">Select Depreciation Method</option>
                                            {
                                                depreciationBookList && depreciationBookList.map((value,) => {
                                                    return (
                                                        <option value={value.id}>{value.depreciation_method}</option>
                                                    )
                                                })
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                    {errors.depreciation_book_id && errors.depreciation_book_id.length > 0 &&
                                        <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.depreciation_book_id}</h4>}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 my-2 text-center" >
                                    <button type="submit" style={{ backgroundColor: "#475466", color: "#FFFFFF", cursor: 'pointer' }} className="btn mt-2 btn btn-sm px-5">Submit</button>
                                </div>
                            </div>


                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }

    renderOneFixedAssetCard = (item, i) => {
        const { search } = this.state;
        if (search !== "") {
            if (item.serial_number.toLowerCase().indexOf(search.toLowerCase()) === -1) {
                if (item.description.toLowerCase().indexOf(search.toLowerCase()) === -1) {
                    return null;
                }
            }
        }

        return (
            <tr key={i}>
                <td>{item.serial_number}</td>
                <td>{item.description}</td>
                <td>{moment(new Date(item.createdAt)).format("YYYY MMM DD")}</td>
                <td>
                    <Dropdown>
                        <Dropdown.Toggle variant="" id="dropdown-basic" >
                            <FontAwesomeIcon icon={faEllipsisV} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.onClickEdit(item.id)}>
                                <FontAwesomeIcon className="text-primary" icon={faPenAlt} />&nbsp;&nbsp;View
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.onClickDelete(item.id)}>
                                <FontAwesomeIcon className="text-danger" icon={faTrash} />&nbsp;&nbsp;Delete
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.openModal(item.id)}>
                                <FontAwesomeIcon className="text-info" icon={faBook} />&nbsp;&nbsp;Assign Depereciation Book
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
        );
    }

    validate = () => {
        let { errors, serial_number, id, description, class_code, subclass_code, location_code, accountNumber, accountName } = this.state;
        let count = 0;

        if (id.length === 0) {
            errors.id = 'ID can not be empty !'
            count++
        } else {
            errors.id = ''
        }

        if (serial_number.length === 0) {
            errors.serial_number = 'Serial Number can not be empty !'
            count++
        } else {
            errors.serial_number = ''
        }

        if (class_code.length === 0) {
            errors.class_code = 'Class Code can not be empty !'
            count++
        } else {
            errors.class_code = ''
        }

        if (subclass_code.length === 0) {
            errors.subclass_code = 'Sub Class Code can not be empty !'
            count++
        } else {
            errors.subclass_code = ''
        }

        if (location_code.length === 0) {
            errors.location_code = 'Location Code can not be empty !'
            count++
        } else {
            errors.location_code = ''
        }

        if (accountNumber.length === 0) {
            errors.accountNumber = 'Account Number can not be empty !'
            count++
        } else {
            errors.accountNumber = ''
        }

        if (accountName.length === 0) {
            errors.accountName = 'Account Name can not be empty !'
            count++
        } else {
            errors.accountName = ''
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

    validateAssign = () => {
        let { errors, depreciation_book_id, fix_assert_id } = this.state;
        let count = 0;

        if (depreciation_book_id.length === 0) {
            errors.depreciation_book_id = 'Depreciation Book can not be empty !'
            count++
        } else {
            errors.depreciation_book_id = ''
        }

        if (fix_assert_id.length === 0) {
            errors.fix_assert_id = 'Fixed Asset can not be empty !'
            count++
        } else {
            errors.fix_assert_id = ''
        }

        this.setState({ errors });
        return count == 0;
    }
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});

export default connect(mapStateToProps, null)(withRouter(DisplayFixedAssetsCard));