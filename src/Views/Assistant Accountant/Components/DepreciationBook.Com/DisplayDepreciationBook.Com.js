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
import './DisplayDepreciationBook.Com.css';
import DepreciationBook_CONTROLLER from '../../../../Controllers/AssistantAccountant/DepreciationBook.controller';
import FixedAssetsPostingGroup_CONTROLLER from '../../../../Controllers/AssistantAccountant/FixedAssetsPostingGroups.controller';

class DisplayDepreciationBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchState: false,
            addDepreciationBookState: false,
            updateDepreciationBookState: false,

            id: '',
            depreciation_method: '',
            posting_group: '',
            month: '',
            description: '',
            year: '',

            depreciationBookList: [],
            fixedAssetsPostingGroupList: [],
            search: '',

            no_of_pages: 0,
            current_page: 1,

            errors: {},
        };
    }

    async componentDidMount() {
        this.loadAllDepreciationBooks();
        this.loadAllFixedAssetsPostingGroups();
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
        if (this.state.addDepreciationBookState) {
            this.setState({ addDepreciationBookState: false })
        } else {
            this.setState({ addDepreciationBookState: true })
        }
    }

    //GET all DepreciationBooks
    loadAllDepreciationBooks = async () => {
        const res = await DepreciationBook_CONTROLLER.getAllDepreciationBooks(5, this.state.current_page - 1, this.props.auth.token);
        this.setState({
            depreciationBookList: res.data.rows,
            no_of_pages: res.data.pages
        });
    }

    //GET all FixedAssetsPostingGroups
    loadAllFixedAssetsPostingGroups = async () => {
        const res = await FixedAssetsPostingGroup_CONTROLLER.getAllFixedAssetsPostingGroupsWithoutPagination(this.props.auth.token);

        this.setState({
            fixedAssetsPostingGroupList: res.data.rows
        });
    }

    //DepreciationBook form value change
    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    //add DepreciationBook submit
    onFormSubmit = async (e) => {
        e.preventDefault();
        if (this.validate()) {
            var data = {
                depreciation_method: this.state.depreciation_method,
                posting_group: this.state.posting_group,
                description: this.state.description,
                year: this.state.year
            }

            const result = await DepreciationBook_CONTROLLER.addDepreciationBook(data, this.props.auth.token);

            if (result.status == 201) {
                CONFIG.setToast("Successfully Added");
                this.clear();
                this.loadAllDepreciationBooks();
            } else {
                CONFIG.setErrorToast(result.response.data.message);
            }
        }
    }

    //Get DepreciationBook by ID - function
    onClickEdit = async (id) => {
        const response = await DepreciationBook_CONTROLLER.getDepreciationBookByID(id, this.props.auth.token);

        if (response.status == 200) {
            this.setState({
                errors: {},
                updateDepreciationBookState: true,
                id: response.data.data.id,
                depreciation_method: response.data.data.depreciation_method,
                posting_group: response.data.data.posting_group,
                month: response.data.data.month,
                description: response.data.data.description,
                year: response.data.data.year
            });
        }
    }

    //Clear all input details
    clear = () => {
        this.setState({
            id: '',
            depreciation_method: '',
            posting_group: '',
            month: '',
            description: '',
            year: '',
            updateDepreciationBookState: false,
            addDepreciationBookState: false,
        })
    }

    paginate = async pageNum => {
        this.setState({
            current_page: pageNum
        }, () => {
            this.loadAllDepreciationBooks();
        });
    };
    nextPage = async () => {
        if (this.state.current_page < this.state.no_of_pages) {
            this.setState({
                current_page: this.state.current_page + 1
            }, () => {
                this.loadAllDepreciationBooks();
            });
        }

    };

    prevPage = async () => {
        if (this.state.current_page >= this.state.no_of_pages) {
            this.setState({
                current_page: this.state.current_page - 1
            }, () => {
                this.loadAllDepreciationBooks();
            });
        }
    };
    render() {
        const { depreciationBookList, fixedAssetsPostingGroupList, errors, search, current_page, no_of_pages } = this.state;
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
                                    <h6 style={{ paddingTop: "10px", paddingLeft: "5px" }}>Depreciation Book Details<br></br>
                                        <span className="text-muted small">Dashboard / Depreciation Books</span></h6>
                                </div>
                                <div className="col-sm">
                                    {['bottom'].map((placement) => (
                                        <OverlayTrigger
                                            key={placement}
                                            placement={placement}
                                            overlay={
                                                <Tooltip id={`tooltip-${placement}`}>
                                                    Print All Depreciation Books
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
                            <Button variant="" style={{ backgroundColor: "#475466", color: "#FFFFFF", width: "100%", cursor: 'pointer' }} onClick={() => this.change_toggle()}>Add New Depreciation Book</Button>
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
                    {/* Add DepreciationBook form toggle */}
                    <div className="row" style={{ display: this.state.addDepreciationBookState == true ? 'block' : 'none', marginBottom: "15px" }}>
                        <div className="col-12">
                            <Card className="col-12">
                                <Card.Body>

                                    <div className="col-12 bg-white mt-1 pb-1" >
                                        <form onSubmit={(e) => this.onFormSubmit(e)}>
                                            <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Depreciation Book Details<br></br>
                                                <span className="text-muted small">You can add a new Depreciation Book by filling relavant Information</span></h6>
                                            <div className="row" >
                                                <div className="col-sm-8">

                                                    <div className="row">
                                                        <div className="col-sm-12 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Depreciation Book Depreciation Method *'}
                                                                placeholder={"Depreciation Book Depreciation Method *"}
                                                                value={this.state.depreciation_method}
                                                                name="depreciation_method"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.depreciation_method && errors.depreciation_method.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.depreciation_method}</h4>}
                                                        </div>
                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Depreciation Book Year *'}
                                                                placeholder={"Depreciation Book Year *"}
                                                                value={this.state.year}
                                                                name="year"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.year && errors.year.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.year}</h4>}
                                                        </div>
                                                        {/* 1 */}
                                                        <div className="col-sm-6 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Posting Group</Form.Label>
                                                                <Form.Control as="select" name="posting_group" value={this.state.posting_group} onChange={this.formValueChange}>
                                                                    <option value="">Select Posting Group</option>
                                                                    {
                                                                        fixedAssetsPostingGroupList && fixedAssetsPostingGroupList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.code}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.posting_group && errors.posting_group.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.posting_group}</h4>}
                                                        </div>
                                                        <div className="col-sm-12 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Depreciation Book Description *'}
                                                                placeholder={"Depreciation Book Description *"}
                                                                value={this.state.description}
                                                                name="description"
                                                                onChange={this.formValueChange}
                                                            />
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

                    {/* Update DepreciationBook form toggle */}
                    <div className="row" style={{ display: this.state.updateDepreciationBookState == true ? 'block' : 'none', marginBottom: "15px" }}>
                        <div className="col-12">
                            <Card className="col-12">
                                <Card.Body>

                                    <div className="col-12 bg-white mt-1 pb-1" >
                                        <form>
                                            <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">View Depreciation Book Details<br></br>
                                                <span className="text-muted small">You can view a Depreciation Book</span></h6>
                                            <div className="row" >
                                                <div className="col-sm-8">

                                                    <div className="row">
                                                        <div className="col-sm-12 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Depreciation Book Depreciation Method *'}
                                                                placeholder={"Depreciation Book Depreciation Method *"}
                                                                value={this.state.depreciation_method}
                                                                name="depreciation_method"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.depreciation_method && errors.depreciation_method.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.depreciation_method}</h4>}
                                                        </div>
                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Depreciation Book Year *'}
                                                                placeholder={"Depreciation Book Year *"}
                                                                value={this.state.year}
                                                                name="year"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.year && errors.year.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.year}</h4>}
                                                        </div>
                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Depreciation Book Month *'}
                                                                placeholder={"Depreciation Book Month *"}
                                                                value={this.state.month}
                                                                name="month"
                                                                onChange={this.formValueChange}
                                                            />
                                                        </div>
                                                        {/* 1 */}
                                                        <div className="col-sm-12 mt-1 mb-1">
                                                            <Form.Group controlId="exampleForm.ControlSelect1">
                                                                <Form.Label>Select Posting Group</Form.Label>
                                                                <Form.Control as="select" name="posting_group" value={this.state.posting_group} onChange={this.formValueChange}>
                                                                    <option value="">Select Acquisition Cost Account</option>
                                                                    {
                                                                        fixedAssetsPostingGroupList && fixedAssetsPostingGroupList.map((value,) => {
                                                                            return (
                                                                                <option value={value.id}>{value.code}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {errors.posting_group && errors.posting_group.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.posting_group}</h4>}
                                                        </div>
                                                        <div className="col-sm-12 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Depreciation Book Description *'}
                                                                placeholder={"Depreciation Book Description *"}
                                                                value={this.state.description}
                                                                name="description"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.description && errors.description.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.description}</h4>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-6 mt-3 mb-1" >
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
                                    <th>Description</th>
                                    <th>Created At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {depreciationBookList && depreciationBookList.map((name) => this.renderOneDepreciationBook(name))}
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

    renderOneDepreciationBook = (item, i) => {
        const { search } = this.state;
        if (search !== "") {
            if (item.depreciation_method.toLowerCase().indexOf(search.toLowerCase()) === -1) {
                if (item.description.toLowerCase().indexOf(search.toLowerCase()) === -1) {
                    return null;
                }
            }
        }

        return (
            <tr key={i}>
                <td>{item.depreciation_method}</td>
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
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
        );
    }

    validate = () => {
        let { errors, depreciation_method, posting_group, description, year } = this.state;
        let count = 0;

        if (depreciation_method.length === 0) {
            errors.depreciation_method = 'Depreciation Method can not be empty !'
            count++
        } else {
            errors.depreciation_method = ''
        }

        if (posting_group.length === 0) {
            errors.posting_group = 'Posting Group Cannot be empty !'
            count++
        } else {
            errors.posting_group = ''
        }

        if (description.length === 0) {
            errors.description = 'Description Cannot be empty !'
            count++
        } else {
            errors.description = ''
        }

        if (year.length === 0) {
            errors.year = 'Year Cannot be empty !'
            count++
        } else {
            errors.year = ''
        }

        this.setState({ errors });
        return count == 0;
    }
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});

export default connect(mapStateToProps, null)(withRouter(DisplayDepreciationBook));