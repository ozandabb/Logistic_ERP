import React from "react";
import ManagementSidebar from "../Sidebar.Mangement";
import {  Button, Card , Form , Image , OverlayTrigger , Tooltip , Table } from 'react-bootstrap';
import MISMATCH_CONTROLLER from '../../../Controllers/Managment Team/paymentMismatch.controller';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Spinner from "react-bootstrap/Spinner";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTrash , faRedo , faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

class AllPaymentMismatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PaymentMismatchList:[],

            isLoading: '',

        };
    }

    async componentDidMount() {
        this.loadAllPaymentMismatch();
    }


    //GET all vehicles
    loadAllPaymentMismatch = async () => {
        this.setState({
            isLoading : true,
        })
        const res = await MISMATCH_CONTROLLER.getAllPaymentMismatch(this.props.auth.token);

        console.log("ballllo", res);
        this.setState({
            isLoading : false,
            PaymentMismatchList: res.data.rows,
        });
    }

    render() {

        const { PaymentMismatchList } = this.state;
        return (
            <div className="bg-light wd-wrapper">
                <ManagementSidebar activemenu={'MISMATCH'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">

                         {/* Title  */}
                        <div className="row" style={{marginTop:"5px", fontFamily:"sans-serif", marginBottom:"15px"}}>
                                <div className="col-sm-9">
                                    <div className="row">
                                        <div className="col-sm">
                                            <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Payment Mismatch Approval<br></br>
                                            <span className="text-muted small">Dashboard / Mismatch</span></h6>
                                        </div>                                    
                                    </div>
                                </div>
                        </div>

                        {/* all payment mismatch table start here */}
                        <div className="row" style={{marginTop:"5px", fontFamily:"sans-serif", marginBottom:"15px"}}>

                            <div className="col-sm">
                                <Card>
                                    <Table striped bordered hover variant="light">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Load ID</th>
                                                <th>Order ID</th>
                                                <th>Customer Name</th>
                                                <th>Status</th>
                                                <th>Remark</th>
                                                <th>Order Date</th>
                                                <th>Act</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {PaymentMismatchList && PaymentMismatchList.map((name) => this.renderPaymentMismatchDetails(name))}

                                        <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto', alignContent:'center'}}>
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>
                                        </tbody>
                                    </Table>
                                </Card>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        );
    }

    renderPaymentMismatchDetails = (item) => {
        return(
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.load_id}</td>
                    <td>{item.order_id}</td>
                    <td>{item.customer.name}</td>
                    <td>
                        <span className={`bg-${item.order.current_state == 0 ? 'danger' : 0 || item.order.current_state == 1 ? 'primary' : 0  || item.order.current_state == 2 ? 'primary' : 0 || item.order.current_state == 3 ? 'success' : 0 || item.order.current_state == 10 ? 'primary' : 0  || item.order.current_state == 20 ? 'success' : 0 || item.order.current_state == -10 ? 'danger' : 0  || item.order.current_state == -20 ? 'danger' : 0 || item.order.current_state == 100 ? 'success' : 0 || item.order.current_state == 200 ? 'success' : 0 } px-2 text-white rounded small`}>
                            {item.order.current_state == 0 ? 'Back Office Rejected' : '' }
                            {item.order.current_state == 1 ? 'O. Limit Pending' : '' }
                            {item.order.current_state == 2 ? 'Back Office Pending' : '' }
                            {item.order.current_state == 3 ? 'Back Office Approved' : '' }
                            {item.order.current_state == 10 ? 'Cheeck Veri. Pending' : '' }
                            {item.order.current_state == 20 ? 'Payment Mismatch Approved' : '' }
                            {item.order.current_state == -10 ? 'Cheeck Veri. Rejected' : '' }
                            {item.order.current_state == -20 ? 'Payment Mismatch Rejected' : '' }
                            {item.order.current_state == 100 ? 'Ready to Delivery' : '' }
                            {item.order.current_state == 200 ? 'DELIVERED ' : '' }
                        </span>
                    </td>
                    <td>{item.remark}</td>
                    <td>{moment(new Date(item.order.createdAt)).format("YYYY MMM DD")}</td>
                    <td>
                        <div className="row" >
                        <Link to={"/ManagementTeam/SinglePaymentMismatch/" + item.id}>
                            <span className={`px-2 text-white rounded small`} style={{backgroundColor:"#475466"}}>View more</span>                        
                        </Link>
                        </div>                        
                    </td>
                </tr>
        );
    } 

















}

const mapStateToProps = state => ({
    auth: state.auth || {},
  });
 

export default connect(mapStateToProps, null)(withRouter(AllPaymentMismatch));

