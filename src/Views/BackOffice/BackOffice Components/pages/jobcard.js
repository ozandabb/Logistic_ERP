
import React, { Component } from 'react';
import { SampleTabel } from '../shared/table';
import {Link} from 'react-router-dom';
import { Modal } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Backoffice_Sidebar from "../../Sidebar.Backoffice";
import { ViewSaleOrder } from './viewsaleorder';
import { withRouter } from "react-router-dom";
import { FormInput, MultiFormSelect, FormSelect } from '../../../../Components/Form'
import { Tab, Row, Col, Nav, Card, InputGroup, FormControl, Image, Button, Table, Dropdown, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import CONFIG from '../../../../Controllers/Config.controller';
import ReactToPrint from 'react-to-print';
import BACKOFFICE from '../../../../Controllers/BackOffice/backoffice';
import moment from 'moment';
import { faEye, faPlug, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

var _ = require('lodash');



class JobCards extends Component {
    constructor() {
        super();
        this.state = {
            addCustomerState: true,
            printSupplierState: true,
            description: '',
            route_id: "",
            name: '',
            errors: {},
            customers: [],
            loading: true,
            WD_DAYS: [{ label: "Select Route", value: "" }],
            WD_ORDERS: [],
            current_list: [],
            routes_all: [],
            no_of_pages: 0,
            current_page: 1,
            current_route_in_model: null,
            show: false,
            date: "",
            order_list: [],
            confirms_order_list: [],
            hide: true,
            list_of_orders_in_the_job_card: [],
            isLoading:'',

            jobCardsList:[],
        };


    }


    handleClose = () => this.setState({ show: false });
    // handleShow = () => this.setState({ show: true });

    componentDidMount() {
        this.get_all_routes()
        this.get_all_customers();
        this.loadAllJobCards();
    }

    get_all_customers = async () => {
        const cus = await BACKOFFICE.getAllCustomers(this.props.auth.token)
        if(cus.data != undefined || cus.data != null){

            this.setState({ customers: cus.data.rows, loading: false })
            console.log(this.state.customers);
        }
    }

    //GET all job cards
    loadAllJobCards = async () => {
        this.setState({
            isLoading : true,
        })
        const res = await BACKOFFICE.getAllJobCards(this.props.auth.token);

        this.setState({
            isLoading : false,
            jobCardsList: res.data.rows,
        });
    }


    get_all_routes = async () => {
        const res = await BACKOFFICE.getAllRoutes(this.props.auth.token)
        console.log(res);
        if(res.data != undefined || res.data != null){

            this.setState({
                WD_DAYS: [this.state.WD_DAYS, ...res.data.rows.map(i => ({ label: i.name, value: i.id }))],
                routes_all: res.data.rows
            })
            console.log(this.state.routes_all);
        }
    }

    get_all_orders = async () => {

        this.setState({
            hide: false,
            WD_ORDERS: [...this.state.confirms_order_list.map(i => ({ label: i.id, value: i.id }))],

        })

    }

    add_to_the_list = (id) => {
        this.setState({
            list_of_orders_in_the_job_card: [...this.state.list_of_orders_in_the_job_card, id]
        })

        console.log(this.state.list_of_orders_in_the_job_card);
    }
    remove_from_the_list = (id) => {
        var index = this.state.list_of_orders_in_the_job_card.indexOf(id);
        if (index !== -1) {
            this.state.list_of_orders_in_the_job_card.splice(index, 1);
        }
    }

    check_orders_cusomer_id_for_route_id = async (e) => {
        e.preventDefault();
        let len = this.state.current_list.length
        console.log(len);
        if (len > 0) {
            CONFIG.setErrorToast("Please remove all order ids");
        } else {
            console.log(this.state.route_id);
            if (this.validate1()) {
                const r_id = this.state.route_id
                const main_route = this.state.routes_all.filter(route => route.id == r_id)[0]
                console.log(main_route);
                const cus_list = main_route.route_details.map(i => ({ customer_id: i.customer_id }))
                const res = await BACKOFFICE.get_all_confirm_orders(this.props.auth.token)
                if(res.data != undefined || res.data != null ){

                    this.setState({
                        order_list: res.data.rows
                    })
                    const results = this.state.order_list.filter(cus => cus_list.map(i => (i.customer_id)).includes(cus.customer_id))
                    this.setState({
                        confirms_order_list: results
                    })
                }
                this.get_all_orders()
            }
        }
    }
    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleMultiselect = (newValue) => {
        this.setState({
            current_list: newValue == null ? [] : newValue,
        });
    };

    model_item_load = (id) => {
        console.log(id);
        console.log(this.state.confirms_order_list);
        const rr = this.state.confirms_order_list.filter(route => route.id == id)[0]
        this.setState({
            current_route_in_model: rr,
            show: true,
        })
    }

    clear = () => {
        this.setState({ name: '', description: '', current_list: [] })
    }

    onFormSubmit = async (e) => {
        e.preventDefault();
        console.log(this.state.route_id);
        if (this.validate2()) {
            const data = {
                route_id: this.state.route_id,
                date: this.state.date,
                orders: this.state.current_list.map(cus => (cus.value))
            }
            const result = await BACKOFFICE.creae_job_card_i(data, this.props.auth.token)
            if(result.status == 400){
                CONFIG.setErrorToast("Please add sales route");

                window.location.replace("/backOffice/job_cards");
            }
            if (result.status == 201) {
                CONFIG.setToast("Successfully Added");
                this.get_all_routes()
                this.clear()
                window.location.replace("/backOffice/job_cards");

         } else {
                CONFIG.setErrorToast(result.message);
                this.clear()
            }


        }

    }




    render() {
        const { errors, routes_all, jobCardsList, no_of_pages } = this.state;

        const pageNumbers = [];

        for (let i = 1; i <= no_of_pages; i++) {
            pageNumbers.push(i);
        }
        return (
            <div className="bg-light wd-wrapper">
                <Backoffice_Sidebar activemenu={'backoffice_job_card'} />
                <div className="wrapper-wx" style={{ height: "100hv", marginLeft: '20px', marginRight:"20px", marginBottom:"20px" }} >

                    <div className="row " style={{ marginTop: "5px", fontFamily: "sans-serif", marginBottom: "15px" }}>
                        <div className="col-sm-9" >
                            <div className="row">
                                <div className="col-sm">
                                    <h6 style={{ paddingTop: "10px", paddingLeft: "5px" }}>Job Card Details<br></br>
                                        <span className="text-muted small">Dashboard / Job Cards</span></h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Card className="shadow">
                        <nav>
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Create Job Card</a>
                                <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">All Job Cards</a>
                                {/* <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Assign Job Card</a> */}
                            </div>
                        </nav>

                        <div class="tab-content" id="nav-tabContent">

                            {/* Create job cards */}
                            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">

                                 {/* Add customer form toggle */}
                                <div className="row" style={{ display: this.state.addCustomerState == true ? 'block' : 'none', marginBottom: "15px" }}>
                                    <div className="col-12">
                                        <Card className="col-12">
                                            <Card.Body>
                                                <div className="col-12 bg-white mt-1 pb-1" >
                                                    <form onSubmit={(e) => this.check_orders_cusomer_id_for_route_id(e)}>
                                                        <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Check orders<br></br>
                                                            <span className="text-muted small">You can check confirm orders by filling relavant Information</span></h6>

                                                        <div className="row" >
                                                            <div className="col-sm-12">

                                                                <div className="row">
                                                                    <div className="col-sm-9 mt-1 mb-1" >
                                                                        <FormSelect
                                                                            label={'Route *'}
                                                                            options={this.state.WD_DAYS}
                                                                            value={this.state.route_id}
                                                                            name="route_id"
                                                                            onChange={this.formValueChange}
                                                                        />
                                                                        {errors.route_id && errors.route_id.length > 0 &&
                                                                            <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.route_id}</h4>}
                                                                    </div>
                                                                    <div className="col-sm-4 mt-1 mb-1" >
                                                                        <button type="submit" style={{ backgroundColor: "#475466", color: "#FFFFFF", cursor: 'pointer' }} className="btn btn btn-sm px-5">Check Orders</button>
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
                                {this.state.hide == false ? <Card >
                                    <Table bordered variant="light">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Delivery Date</th>
                                                <th>#Items</th>
                                                <th>Total (Rs)</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.confirms_order_list && this.state.confirms_order_list.map((value,) => {
                                                return (
                                                    <tr key={value.id}>
                                                        <td>{value.id}</td>
                                                        <td>{value.delivery_date != null ? moment(value.delivery_date).format("MMM Do YYYY") : "No Delivery Date"}</td>
                                                        <td>{value.order_items.length}</td>
                                                        <td>{value.total}</td>
                                                        <td> <button className="btn btn-xs py-0 mr-1   btn-success" onClick={() => this.model_item_load(value.id)}><FontAwesomeIcon icon={faEye} /></button>
                                                        </td>

                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </Card>
                                    : null}

                                  {/* Add customer form toggle */}
                                    <div className="row mt-3" style={{ display: this.state.addCustomerState == true ? 'block' : 'none', marginBottom: "15px" }}>
                                        <div className="col-12">
                                            <Card className="col-12">
                                                <Card.Body>
                                                    <div className="col-12 bg-white mt-1 pb-1" >
                                                        <form onSubmit={(e) => this.onFormSubmit(e)}>
                                                            <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Add orders to the job card<br></br>
                                                                <span className="text-muted small">You can add orders to the job card by filling relavant Information</span></h6>

                                                            <div className="row" >
                                                                <div className="col-sm-12">

                                                                    <div className="row">
                                                                        <div className="col-md-8 mt-1 mb-1" >
                                                                            {!this.state.loading &&
                                                                                <MultiFormSelect
                                                                                    label={"Order Ids*"}
                                                                                    error={errors.current_list}
                                                                                    onChange={this.handleMultiselect}
                                                                                    placeholder={'Select Orders'}
                                                                                    defaultValue={this.state.current_list}
                                                                                    options={this.state.WD_ORDERS}
                                                                                    error_meesage={'*Order ids required'}
                                                                                />}

                                                                        </div>
                                                                        <div className="col-md-4 mt-1 mb-1" >
                                                                            <FormInput
                                                                                label={"Date *"}
                                                                                value={this.state.date}
                                                                                type="Date"
                                                                                name="date"
                                                                                onChange={this.formValueChange}
                                                                            />
                                                                            {errors.date && errors.date.length > 0 &&
                                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.date}</h4>}
                                                                        </div>
                                                                        <div className="col-sm-4 mt-1 mb-1" >
                                                                            <button type="submit" className="btn btn-success btn-sm px-4 mr-1">Create Job Card</button>
                                                                            <button type="reset" className="btn btn-danger btn-sm px-4 mx-1">Cancle</button>
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

                            {/* all job cards*/}
                            <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">

                                <div className="row" style={{marginTop:"10px"}}>
                                    <div className="col-sm-12">
                                        <div className="row" style={{ marginBottom:"15px" }}>
                                            <div className="col-sm">
                                                    <Table striped bordered hover variant="light">
                                                        <thead>
                                                            <tr>
                                                                <th>ID</th>
                                                                <th>Route ID</th>
                                                                <th>Vehicle ID</th>
                                                                <th>Cash Collector</th>
                                                                <th>State</th>
                                                                <th>Date</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {jobCardsList && jobCardsList.map((name) => this.renderAllUserBene(name))}
                                                            <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto'}}>
                                                                <span className="sr-only">Loading...</span>
                                                            </Spinner>
                                                        </tbody>
                                                    </Table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                    </Card>

                   

                  
                </div>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Order Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <center> <h6>Item List</h6></center>
                        <Table striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Purchase price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.current_route_in_model && this.state.current_route_in_model.order_items.map((value,) => {
                                    return (
                                        <tr key={value.id}>
                                            <td>{value.item_id}</td>
                                            <td>{value.purchase_price != null ? value.purchase_price : "No purchase_price"}</td>
                                            <td>{value.quantity}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <Button variant="primary" onClick={() => this.delete_route(this.state.current_route_in_model.id)}>Delete</Button> */}
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }


    //reander all salary increments
   renderAllUserBene = (item) => {

    return(
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>
                {item.route_id}
            </td>
            <td>
                {item.vehical_id == null ? 'Not Assign' : item.vehical_id }
            </td>
            <td>
            {item.cash_collector == null ? 'Not Assign' : item.cash_collector }</td>
            <td>
                <span className={`bg-${item.state == 1 ? 'primary' : 0 || item.state == 2 ? 'success' : 0  || item.state == 3 ? 'danger' : 0  } px-2 text-white rounded small`}>
                    {item.state == 1 ? 'PLACED' : '' }
                    {item.state == 2 ? 'READY' : '' }
                    {item.state == 3 ? 'DISPATCHED' : '' }
                </span>
            </td>
            <td>{moment(new Date(item.date)).format("YYYY MMM DD")}</td>
            <td>
                <div className="row" >
                    <Link to={"/backOffice/SingleJobCard/" + item.id}>
                        <span className={`px-2 text-white rounded small`} style={{backgroundColor:"#475466"}}>View more</span>                        
                    </Link>
                </div>                    
            </td>
        </tr>
    );
}

    validate1 = () => {
        let { errors, name, route_id, current_list } = this.state;
        let count = 0;
        if (route_id.length === 0) {
            errors.route_id = 'Route can not be empty !'
            count++
        } else {
            errors.route_id = ''
        }

        this.setState({ errors });
        return count == 0;
    }
    validate2 = () => {
        let { errors, name, route_id, current_list, date } = this.state;
        let count = 0;
        if (current_list.length == 0) {
            errors.current_list = "Orders can not be empty"
            count++
        } else {
            errors.current_list = ""
        }

        if (date.length == 0) {
            errors.date = 'Date can not be empty !'
            count++
        } else {
            errors.date = ''
        }

        this.setState({ errors });
        return count == 0;
    }
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});
export default connect(mapStateToProps, null)(withRouter(JobCards));
