import React from "react";
import Vehicle_CONTROLLER from '../../../../Controllers/HR Staff/Vehicle.controller';
import { Table } from 'react-bootstrap';


export class ComponentToPrint extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            curTime : new Date().toLocaleString(),

            vehicleList: [],
        };
        this.loadAllVehicles();
    }

    async componentDidMount() {
        this.loadAllVehicles();
    }

    //GET all vehicles
    loadAllVehicles = async () => {
        const res = await Vehicle_CONTROLLER.getAllVehicle(this.props.proid);
        this.setState({
            vehicleList: res.data.rows,
        });
    }


    render() {
        const {vehicleList } = this.state;

        return (
            <div className="container-fluid" >
                <div className="col-sm" style={{marginTop:"50px"}}>
                    <div className="row">
                        <div className="col">
                            <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>All Vehicles<br></br>
                            <span className="text-muted small">Printed by : {this.props.HRname} </span></h6>
                        </div>
                        <div className="col" style={{justifyContent:"right"}}>
                            <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Printed Date<br></br>
                            <span className="text-muted small">{this.state.curTime}</span></h6>
                        
                        </div>
                    </div>
                    <hr></hr>
                <Table striped bordered hover variant="light" style={{marginTop:"30px"}}>
                    <thead>
                        <tr>
                            <th>Vehicle Name</th>
                            <th>Year</th>
                            <th>Type</th>
                            <th>Vehicle Number</th>
                            <th>License No</th>
                            <th>License Renew</th>
                            <th>Mileage</th>
                            <th>Service Due</th>
                            <th>Insurance Number</th>
                            <th>Insurance Renew</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicleList && vehicleList.map((name) => this.renderVehicles(name))}
                        
                    </tbody>
                </Table>
                
                </div>
            </div>
        );
    }

    renderVehicles = (item, i) => {
        const { search } = this.state;
        return(
            <div>
                <tr key={item.id}>
                    <td>{item.vehicle_name}</td>
                    <td>{item.vehicle_year}</td>
                    <td>{item.vehicle_type}</td>
                    <td>{item.vehicle_number}</td>
                    <td>{item.licen_number}</td>
                    <td>{item.licen_renew_date}</td>
                    <td>{item.mileage}</td>
                    <td>{item.service_due}</td>
                    <td>{item.insurance_number}</td>
                    <td>{item.insurance_renew_date}</td>
                </tr>
            </div>
        );
    }











}


  