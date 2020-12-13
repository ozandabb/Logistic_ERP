import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import BackOfficeSidebar from "../../Sidebar.Backoffice";
import { connect } from 'react-redux';
import ChequeController from '../../../../Controllers/BackOffice/Cheque.Controller';
import {Button, Card, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEllipsisV, faTrash} from "@fortawesome/free-solid-svg-icons";

class ChequeVerify extends Component {  
    
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        }
    }

    async componentDidMount() {
        let data = await ChequeController.getAllCheques(this.props.auth.token);
        this.setState({
            data: data.data.rows
        })
    }

    onMoreClicked(id) {
        console.log(id);
    }

    render() {
        const {data} = this.state;
        return (
            <div className="bg-light wd-wrapper">
                <BackOfficeSidebar activemenu={'backOffice_Cheque'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">
                        <div className="col-sm-9">
                            <div className="row">
                                <div className="col-sm">
                                    <h4 style={{paddingTop:"10px", paddingLeft:"5px"}}>Cheque Verification<br></br>
                                    <span className="text-muted small">Approve or reject customer requests</span></h4>
                                </div>
                            </div>
                        </div>
                        <div>
                            
                            <div className="row mt-4">
                                <div className="col-sm">
                                    <Card>
                                        <Table striped bordered hover variant="light">
                                            <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Customer Name</th>
                                                <th>Order ID</th>
                                                <th>Amount</th>
                                                <th>State</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {console.log(data)}
                                                {data.map(i => this.renderTable(i))}
                                            </tbody>
                                        </Table>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderTable (element) {
        // <th>ID</th>
        // <th>Customer Name</th>
        // <th>Order ID</th>
        // <th>Amount</th>
        // <th>State</th>
        // <th>Actions</th>
        let state;
        if(element.state == 0) {
            state = <td>PENDING</td>
        }
        else if(element.state == 1) {
            state = <td>APPROVED</td>
        }
        else if(element.state == 2) {
            state = <td>REJECTED</td>
        }
        return (<tr>
            <td>{element.id}</td>
            <td>{element.customer.name}</td>
            <td>{element.order_id}</td>
            <td>{element.amount}</td>
            {/* <td>{element.state == 0 ? }</td> */}
            {state}
            <td><FontAwesomeIcon className="text-success" icon={faEdit} />&nbsp;&nbsp;More
            <FontAwesomeIcon className="text-danger ml-3" icon={faTrash} />&nbsp;&nbsp;Delete</td>
        </tr>)
    } 
   
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});
 
  
export default connect(mapStateToProps, null)(withRouter(ChequeVerify));