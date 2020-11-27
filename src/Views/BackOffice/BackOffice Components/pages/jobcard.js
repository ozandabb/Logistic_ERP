
import React, { Component } from 'react';
import { SampleTabel } from '../shared/table';
import { BaseBtn } from '../shared/button'
import { Modal } from "react-bootstrap";

import Backoffice_Sidebar from "../../Sidebar.Backoffice";
import { ViewSaleOrder } from './viewsaleorder';
import { withRouter } from "react-router-dom";
import { FormInput, MultiFormSelect } from '../../../../Components/Form'
import { Tab, Row, Col, Nav, Card, InputGroup, FormControl, Image, Button, Table, Dropdown, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import CONFIG from '../../../../Controllers/Config.controller';
import ReactToPrint from 'react-to-print';
import BACKOFFICE from '../../../../Controllers/Backoffice/backoffice';
import moment from 'moment';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

var _ = require('lodash');



class JobCards extends Component {
    constructor() {
        super();
        this.state = {
            addCustomerState: true,
            printSupplierState: true,
            description: '',
            name: '',
            errors: {},
            customers: [],
            loading: true,
            WD_DAYS: [],
            current_list: [],
            routes_all: [],
            no_of_pages: 0,
            current_page: 1,
            current_route_in_model: null,
            show: false
        };


    }


    handleClose = () => this.setState({ show: false });
    // handleShow = () => this.setState({ show: true });

    componentDidMount() {
        this.get_all_customers()
        this.get_all_routes()
    }
    get_all_customers = async () => {
        const cus = await BACKOFFICE.getAllCustomers(this.props.auth.token)
        this.setState({ customers: cus.data.rows, loading: false })
        console.log(this.state.customers);
        this.setState({
            WD_DAYS: this.state.customers.map(i => ({ label: i.name, value: i.id }))
        })
    }
    get_all_routes = async () => {
        const res = await BACKOFFICE.getAllRoutes(this.props.auth.token)
        this.setState({ routes_all: res.data.rows })
        console.log(res);
    }
    // paginate = async pageNum => {
    //     this.setState({
    //         current_page: pageNum
    //     }, () => {
    //         this.loadAllFixedAssetsClasses();
    //     });
    // };
    // nextPage = async () => {
    //     if (this.state.current_page < this.state.no_of_pages) {
    //         this.setState({
    //             current_page: this.state.current_page + 1
    //         }, () => {
    //             this.loadAllFixedAssetsClasses();
    //         });
    //     }

    // };

    // prevPage = async () => {
    //     if (this.state.current_page >= this.state.no_of_pages) {
    //         this.setState({
    //             current_page: this.state.current_page - 1
    //         }, () => {
    //             this.loadAllFixedAssetsClasses();
    //         });
    //     }
    // };

    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleMultiselect = (newValue) => {
        this.setState({
            current_list: newValue == null ? [] : newValue,
        });
    };

    model_item_load = (id) =>{
        const rr = this.state.routes_all.filter(route => route.id == id)[0]
        this.setState({
            current_route_in_model : rr ,
            show: true,
        })
    }


    clear = () => {
        this.setState({ name: '', description: '', current_list: [] })
    }
    onFormSubmit = async (e) => {
        const results = this.state.customers.filter(cus => this.state.current_list.map(i => (i.value)).includes(cus.id))
        e.preventDefault();
        if (this.validate()) {
            const data = {
                name: this.state.name,
                description: this.state.description,
                customer: results.map(cus => ({ customer_id: cus.id, address: cus.address, lat: cus.lat, long: cus.long }))
            }
            const result = await BACKOFFICE.addRoute(data, this.props.auth.token)
            if (result.status == 201) {
                CONFIG.setToast("Successfully Added");
                this.get_all_routes()
                this.clear()
            } else {
                CONFIG.setErrorToast(result.message);
                this.clear()
            }


        }
     
    }

    delete_route = async (id) =>{
        const res = await BACKOFFICE.delete_route(id, this.props.auth.token)
        console.log(res);
        if(res.status == 200){
            this.setState({show: false})
            CONFIG.setToast("Successfully Deleted");

            this.get_all_routes()

        }else{
            CONFIG.setErrorToast(res.message);
        }
    }


    render() {
        const { errors, routes_all, current_page, no_of_pages } = this.state;

        const pageNumbers = [];

        for (let i = 1; i <= no_of_pages; i++) {
            pageNumbers.push(i);
        }
        return (
            <div className="bg-light wd-wrapper">
                <Backoffice_Sidebar activemenu={'backoffice_job_card'} />
                <div className="wrapper-wx" style={{ height: "100hv", margin: '20px' }} >
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

                    {/* Add customer form toggle */}
                    <div className="row" style={{ display: this.state.addCustomerState == true ? 'block' : 'none', marginBottom: "15px" }}>
                        <div className="col-12">
                            <Card className="col-12 shadow">
                                <Card.Body>

                                    <div className="col-12 bg-white mt-1 pb-1" >
                                        <form onSubmit={(e) => this.onFormSubmit(e)}>
                                            <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Route Details<br></br>
                                                <span className="text-muted small">You can add a new route by filling relavant Information</span></h6>

                                            <div className="row" >
                                                <div className="col-sm-12">

                                                    <div className="row">
                                                        <div className="col-sm-4 mt-1 mb-1" >
                                                            <FormInput
                                                                label={'Route Name *'}
                                                                placeholder={"Enter Route's Name"}
                                                                value={this.state.name}
                                                                name="name"
                                                                onChange={this.formValueChange}
                                                            />
                                                            {errors.name && errors.name.length > 0 &&
                                                                <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.name}</h4>}
                                                        </div>
                                                        <div className="col-sm-6 mt-1 mb-1" >
                                                            <FormInput
                                                                label={"Description "}
                                                                placeholder={"Enter Description"}
                                                                value={this.state.description}
                                                                name="description"
                                                                onChange={this.formValueChange}
                                                            />

                                                        </div>
                                                        <div className="col-md-12 mt-1 mb-1" >
                                                            {!this.state.loading &&
                                                                <MultiFormSelect
                                                                    label={'Customers'}
                                                                    error={errors.current_list}
                                                                    onChange={this.handleMultiselect}
                                                                    placeholder={'Select customers'}
                                                                    defaultValue={this.state.current_list}
                                                                    options={this.state.WD_DAYS}
                                                                    error_meesage={'*Wokring days required'}
                                                                />}
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

                    <Card>
                        <Table striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>#Customers</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.routes_all && this.state.routes_all.map((value,) => {
                                    return (
                                        <tr key={value.id}>
                                            <td>{value.name}</td>
                                            <td>{value.description != null ? value.description : "No Description"}</td>
                                            <td>{value.route_details.length}</td>
                                            <td> <button className="btn btn-xs py-0   btn-success"  onClick={()=>this.model_item_load(value.id)}><FontAwesomeIcon icon={faEye} /></button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        {/*//Pagination*/}
                        {/* <nav style={{ marginTop: "15px" }}>
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
                        </nav> */}
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
                    <Modal.Title>{ this.state.current_route_in_model && this.state.current_route_in_model.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       <center> <h6>Customer List</h6></center>
                    <Table striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Address</th>
                                    <th>Lat</th>
                                    <th>Long</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.current_route_in_model && this.state.current_route_in_model.route_details.map((value,) => {
                                    return (
                                        <tr key={value.id}>
                                            <td>{value.id}</td>
                                            <td>{value.address != null ? value.address : "No Address"}</td>
                                            <td>{value.lat}</td>
                                            <td>{value.long}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                  </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={()=>this.delete_route(this.state.current_route_in_model.id)}>Delete</Button>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }

    validate = () => {
        let { errors, name, current_list } = this.state;
        let count = 0;

        if (name.length === 0) {
            errors.name = 'Username can not be empty !'
            count++
        } else {
            errors.name = ''
        }
        if (current_list.length == 0) {
            errors.customers_list = true
            count++
        } else {
            errors.days = false
        }

        this.setState({ errors });
        return count == 0;
    }
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});


export default connect(mapStateToProps, null)(withRouter(JobCards));
