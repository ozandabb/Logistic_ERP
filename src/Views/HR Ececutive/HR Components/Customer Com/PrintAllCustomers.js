import React from "react";
import CUST_CONTROLLER from '../../../../Controllers/HR Staff/Customer.controller';
import moment from 'moment';
import { Table } from 'react-bootstrap';


export class ComponentToPrint extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            curTime : new Date().toLocaleString(),

            customerList: [],
        };
    }

    async componentDidMount() {
        this.loadAllCustomers();
    }

     //GET all supplliers
    loadAllCustomers = async () => {
        const res = await CUST_CONTROLLER.getAllCustomer(this.props.proid);
        this.setState({
            customerList: res.data.rows,
        });
    }


    render() {
        const {customerList } = this.state;

        return (
            <div className="container-fluid" >
                <div className="col-sm" style={{marginTop:"50px"}}>
                    <div className="row">
                        <div className="col">
                            <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>All Customers<br></br>
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
                            <th>ID</th>
                            <th>Username</th>
                            <th>Name</th>
                            <th>T code</th>
                            <th>Credit Limit</th>
                            <th>Address </th>
                            <th>DOB</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerList && customerList.map((name) => this.renderCustomers(name))}
                        
                    </tbody>
                </Table>
                
                </div>
            </div>
        );
    }

    renderCustomers = (item, i) => {
        const { search } = this.state;
        return(
            <div>
                <tr key={item.id}>
                    <td>{item.user_id}</td>
                    <td>{item.username}</td>
                    <td>{item.name}</td>
                    <td>{item.t_code}</td>
                    <td>{item.credit_limit}</td>
                    <td>{item.address}</td>
                    <td>{item.dob}</td>
                    <td>{item.createdAt}</td>
                </tr>
            </div>
            
        );
    }











}


  