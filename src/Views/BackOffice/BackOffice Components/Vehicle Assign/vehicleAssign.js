import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import BackOfficeSidebar from "../../Sidebar.Backoffice";
import { connect } from 'react-redux';
import ChequeController from '../../../../Controllers/BackOffice/Cheque.Controller';
import {Button, Card, Table, Form} from "react-bootstrap";
import { FormInput, FormSelect, MultiFormSelect } from '../../../../Components/Form'

class VehicleAssign extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            jobcards: [],
            id: 0,
            route_id: 0,
            state: 0,
            vehicle_id: 0,
            cash_collector_id: 0,
            CC_Options: [],
            V_Options: []
        }
    }

    async componentDidMount() {
        let jobcards = await ChequeController.getAllJobCards(this.props.auth.token);

        console.log(jobcards.data.rows);

        //let allVehicles = await ChequeController.getAllVehicles(this.props.auth.token);
        //let allEmps = await ChequeController.getAllEmployees(this.props.auth.token);

        // console.log("All vehicles: ", allVehicles);
        // console.log("All Emps: ", allEmps);

        await this.setDropdownData();

        this.setState({
            jobcards: jobcards.data.rows
        })
    }

    async setDropdownData() {
        let allVehicles = await ChequeController.getAllVehicles(this.props.auth.token);
        let allEmps = await ChequeController.getAllEmployees(this.props.auth.token);
        console.log("Vehicles", allVehicles.data.rows);
        console.log(allEmps.data.rows);
        let Vehicles = allVehicles.data.rows;
        let Employees = allEmps.data.rows;
        this.setState({
            V_Options: Vehicles.map(i => ({ label: i.vehicle_name, value: i.id })),
            CC_Options: Employees.map(i => ({ label: i.full_name, value: i.id })),
        })
    }

    formValueChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onFormSubmit = async (e) => {
        
        e.preventDefault();
        console.log("submitted")
    }

    setFormValues(e, item) {
        e.preventDefault();
        console.log("Form set values: ", item);
        this.setState({
            route_id: item.route_id,
            vehicle_id: item.vehical_id,
            cash_collector_id: item.cash_collector,
            state: item.state
        })
    }
    
    render() {
        const {jobcards} = this.state;
        console.log(this.state.V_Options)
        console.log(this.state.CC_Options)
        return (
            <div className="bg-light wd-wrapper">
                <BackOfficeSidebar activemenu={'ASSIGN_VEHICLE'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm">
                                <h4 style={{paddingTop:"10px", paddingLeft:"5px"}}>Assign Vehicle To Delivery<br></br>
                                <span className="text-muted small">Assign a Vehicle to Delivery a load</span></h4>
                            </div>
                        </div>

                        
                        <div className="row">
                            <div className="card col-7 mx-3 shadow">
                                {/* <Card style={{paddingRight: "8px", paddingLeft: "8px"}}> */}
                                    <h5 className="ml-2 mt-2">Job Cards</h5>
                                
                                    {/* <table>
                                        <thead>
                                            <tr>
                                                <th></th>
                                            </tr>
                                        </thead>
                                    </table> */}
                                    <Table striped bordered hover variant="dark">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Route ID</th>
                                                <th>State</th>
                                                <th>Vehicle</th>
                                                <th>Cash Collector</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {jobcards.map(i => this.renderTable(i))}
                                        </tbody>
                                    </Table>
                                {/* </Card> */}
                            </div>
                            {/* <div className="col-4">
                                <Card style={{paddingRight: "8px", paddingLeft: "8px"}}>
                                    <h5 className="ml-2 mt-2">Assign to Job Card</h5>
                                    <form onSubmit={(e) => this.onFormSubmit(e)}>
                                        <div className="row">
                                            <FormInput
                                                label={"Route ID"}
                                                placeholder={"Route ID"}

                                            />
                                        </div>
                                    </form>
                                </Card>
                            </div> */}
                            <div className="card col-4 mx-3 shadow">
                                <h5 className="ml-2 mt-2">Assign to Job Card</h5>

                                <form onSubmit={(e) => this.onFormSubmit(e)} className="mt-2 mx-3 mb-4">
                                    <div className="row">
                                        <div className="col-sm-12 mt-1 mb-1" >
                                            <FormInput
                                                label={"Route ID"}
                                                placeholder={"Route ID"}
                                                value={this.state.route_id}
                                                disabled={true}
                                                name="routeid"
                                                onChange={this.formValueChange}
                                            />
                                        </div>
                                        <div className="col-sm-12 mt-1 mb-1" >
                                            <FormSelect
                                                label={"State"}
                                                value={this.state.state}
                                                name="state"
                                                onChange={this.formValueChange}
                                                options={[
                                                    {label: "Select a job card State", value: 0},
                                                    {label: "Ready", value: 2},
                                                    {label: "Dispatched", value: 3}
                                                ]}
                                            />
                                        </div>
                                        <div className="col-sm-12 mt-1 mb-1" >
                                            <FormSelect
                                                label={"Cash Collector"}
                                                value={this.state.cash_collector_id}
                                                name="cashCollector"
                                                onChange={this.formValueChange}
                                                options={this.state.CC_Options}
                                            />
                                        </div>
                                        <div className="col-sm-12 mt-1 mb-1" >
                                            <FormSelect
                                                label={"Vehicle"}
                                                value={this.state.vehicle_id}
                                                name="cashCollector"
                                                onChange={this.formValueChange}
                                                options={this.state.V_Options}
                                            />
                                        </div>

                                        <div className="row">
                                            <div className="col-6 mt-3 mb-1 mx-3">
                                                <button type="submit" style={{ backgroundColor: "#475466", color: "#FFFFFF", cursor: 'pointer' }} className="btn mt-2 btn btn-sm px-5">Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }

    renderTable (element) {
        let state = "";

        if(element.state == 1) {
            state = "Placed"
        }
        else if(element.state == 2) {
            state = "Ready"
        }
        else if(element.state == 3) {
            state = "Dispatched"
        }

        return (
            <tr style={{backgroundColor: "white", textAlign: "center"}} className="text-dark" key={element.id}>
                <td>{element.id}</td>
                <td>{element.route_id}</td>
                <td>{state}</td>
                <td>{element.vehicleprofile.vehicle_name}</td>
                <td>{element.employee.full_name}</td>
                <td><button className="btn-dark px-4 py-1" style={{borderRadius: "5px"}} onClick={(e) => this.setFormValues(e, element)}>Edit</button></td>
            </tr>
        )
    }
   
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});
 
  
export default connect(mapStateToProps, null)(withRouter(VehicleAssign));