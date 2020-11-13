import React from "react";
import Employee_CONTROLLER from '../../../../Controllers/HR Staff/Employee.controller';
import { Table } from 'react-bootstrap';


export class ComponentToPrint extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            curTime : new Date().toLocaleString(),

            employeeList: [],
        };
    }

    async componentDidMount() {
        this.loadAllEmployees();
    }

     //GET all supplliers
    loadAllEmployees = async () => {
        const res = await Employee_CONTROLLER.getAllEmployee(this.props.proid);
        this.setState({
            employeeList: res.data.rows,
        });
    }


    render() {
        const {employeeList } = this.state;

        return (
            <div className="container-fluid" >
                <div className="col-sm" style={{marginTop:"50px"}}>
                    <div className="row">
                        <div className="col">
                            <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>All Employees<br></br>
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
                            <th>EMP No</th>
                            <th>Name</th>
                            <th>DOB</th>
                            <th>Gender</th>
                            <th>Address</th>
                            <th>Land Line </th>
                            <th>Mobile </th>
                            <th>Department</th>
                            <th>Designation</th>
                            <th>Service Loc. </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeList && employeeList.map((name) => this.renderOneCustomer(name))}
                        
                    </tbody>
                </Table>
                
                </div>
            </div>
        );
    }

    renderOneCustomer = (item, i) => {
        const { search } = this.state;
        return(
            <div>
                <tr key={item.id}>
                    <td>{item.emp_no}</td>
                    <td>{item.full_name}</td>
                    <td>{item.date_of_birth}</td>
                    <td>{item.gender}</td>
                    <td>{item.address}</td>
                    <td>{item.home_phone}</td>
                    <td>{item.phone}</td>
                    <td>{item.department}</td>
                    <td>{item.designation}</td>
                    <td>{item.service_location}</td>
                </tr>
            </div>
        
        );
    }











}


  