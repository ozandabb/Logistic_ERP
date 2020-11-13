import React from "react";
import SUPPLIER_CONTROLLER from '../../../../Controllers/HR Staff/Supplier.controller';
import { Table } from 'react-bootstrap';


export class ComponentToPrint extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            curTime : new Date().toLocaleString(),

            supplierList: [],
        };
    }

    async componentDidMount() {
        this.loadAllSuppliers();
    }

     //GET all supplliers
    loadAllSuppliers = async () => {
        const res = await SUPPLIER_CONTROLLER.getAllSuppliers(this.props.proid);
        this.setState({
            supplierList: res.data.rows,
        });
    }


    render() {
        const {supplierList } = this.state;

        return (
            <div className="container-fluid" >
                <div className="col-sm" style={{marginTop:"50px"}}>
                    <div className="row">
                        <div className="col">
                            <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>All Suppliers<br></br>
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone No</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supplierList && supplierList.map((name) => this.renderOneCustomer(name))}
                        
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
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                    <td>{item.phoneNo}</td>
                    <td>{item.createdAt}</td>
                    <td>{item.updatedAt}</td>
                </tr>
            </div>
        
        );
    }











}


  