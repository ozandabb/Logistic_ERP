import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import BackOfficeSidebar from "../../Sidebar.Backoffice";
import {  Card } from 'react-bootstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import SALESORDER_CONTROLLER from '../../../../Controllers/BackOffice/SalesOrder.Controller';
import Spinner from "react-bootstrap/Spinner";
import ScrollArea from 'react-scrollbar'

class SalesOrder extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            PendingOrderList: [],
            CompletedOrderList: [],
            ConfirmOrderList: [],
            RejectedOrderList: [],

            isLoading: '',
            backOfficApproveTxt:' ',
 
        };
    }

    async componentDidMount() {
        this.loadAllPendingOrders();
        this.loadAllCompleted();
        this.loadAllRejectedOrders();
    }

    //GET all Pending Orders
    loadAllPendingOrders = async () => {
        this.setState({
            isLoading : true,
        })
        const resPending = await SALESORDER_CONTROLLER.getAllPending(this.props.auth.token);
        console.log("pending ", resPending);
        this.setState({
            PendingOrderList: resPending.data.rows,
            isLoading : false,
        });
    }

    //GET all Completed Orders
    loadAllCompleted = async () => {
        this.setState({
            isLoading : true,
        })
        const resCompl = await SALESORDER_CONTROLLER.getAllCompleted(this.props.auth.token);
        console.log("completed ", resCompl);
        this.setState({
            CompletedOrderList: resCompl.data.rows,
            isLoading : false,
        });
    }

    //GET all Rejected Orders
    loadAllRejectedOrders = async () => {
        this.setState({
            isLoading : true,
        })
        const resRejected = await SALESORDER_CONTROLLER.getAllRejected(this.props.auth.token);
        console.log("rejecteed ", resRejected);
        this.setState({
            RejectedOrderList: resRejected.data.rows,
            isLoading : false,
        });
    }

    render() {

        const {RejectedOrderList , CompletedOrderList,PendingOrderList, ConfirmOrderList} = this.state;

        return (
            <div className="bg-light wd-wrapper">
                <BackOfficeSidebar activemenu={'backOffice_salesOrder'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-sm">
                                <Card style={{height:"100hv"}} className="shadow">
                                    <h6 style={{ padding:"20px",marginBottom:"0px", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>Approval Pending Orders</h6>
                                    <hr style={{marginTop:"0px"}}></hr>
                                    <ScrollArea
                                                speed={1}
                                                className="area"
                                                style={{height:"600px"}}
                                                contentClassName="content"
                                                horizontal={false}
                                                >
                                        {PendingOrderList && PendingOrderList.map((name) => this.renderPendingOrders(name))}
                                        <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto', alignContent:'center'}}>
                                                <span className="sr-only">Loading...</span>
                                            </Spinner>

                                        </ScrollArea>

                                </Card>
                            </div>
                            <div className="col-sm">
                                <Card style={{height:"100hv"}} className="shadow">
                                    <h6 style={{ padding:"20px",marginBottom:"0px", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>Completed Orders</h6>
                                    <hr style={{marginTop:"0px"}}></hr>

                                    <ScrollArea
                                                speed={1}
                                                className="area"
                                                style={{height:"600px"}}
                                                contentClassName="content"
                                                horizontal={false}
                                                >
                                    {CompletedOrderList && CompletedOrderList.map((name) => this.renderCompletedOrders(name))}
                                    <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto', alignContent:'center'}}>
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>

                                    </ScrollArea>

                                </Card>
                            </div>
                            <div className="col-sm">
                                <Card style={{height:"100hv"}} className="shadow">
                                    <h6 style={{ padding:"20px",marginBottom:"0px", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>Rejected Orders</h6>
                                    <hr style={{marginTop:"0px"}}></hr>

                                    <ScrollArea
                                        speed={1}
                                        className="area"
                                        style={{height:"600px"}}
                                        contentClassName="content"
                                        horizontal={false}
                                        >
                                    {RejectedOrderList && RejectedOrderList.map((name) => this.renderRejectedOrders(name))}
                                        <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto', alignContent:'center'}}>
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>

                                    </ScrollArea>

                                </Card>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    // Pending Order card view
    renderPendingOrders = (item) => {


        return(
            <Card style={{padding:"15px",marginLeft:"10px", marginRight:"10px", marginBottom:"10px"}} key={item.id} >
                 <div className="row">
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>Tcode : {item.customer_tcode}</p></div>
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466",  marginBottom:"0px"}}>Date : {moment(new Date(item.createdAt)).format("YYYY MMM DD")}</p></div>
                </div>
                <p style={{fontSize:"18px", color:"#18A0FB",fontFamily:"sans-serif", marginBottom:"0px"}}>Total Amount : {item.total} LKR</p>
                <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginTop:"0px",  marginBottom:"0px"}}>Delivery Date : {moment(new Date(item.delivery_date)).format("YYYY MMM DD")}</p>
                {/* <p className="d-none d-lg-block" style={{fontSize:"14px", color:"#00FF00", marginTop:"0px",  marginBottom:"0px"}}>
                    <span className={`bg-${item.current_state == 3 ? 'success' : 'info'} px-2 text-white rounded small`} >
                    {item.current_state == 3 ? 'Back Office Approved' : 'Not Approved' }</span>
                </p>
                <p className="d-none d-lg-block" style={{fontSize:"14px", color:"#00FF00", marginTop:"0px",  marginBottom:"0px"}}>
                    <span className={`bg-${item.current_state == 0 ? 'danger' : 0} px-2 text-white rounded small`}>
                    {item.current_state == 0 ? 'Back Office Rejected' : 0}</span>
                </p> */}
                <p className="d-none d-lg-block" style={{fontSize:"14px", color:"#00FF00", marginTop:"0px",  marginBottom:"0px"}}>
                    <span className={`bg-${item.current_state == 0 ? 'danger' : 0 || item.current_state == 1 ? 'primary' : 0  || item.current_state == 2 ? 'primary' : 0 || item.current_state == 3 ? 'success' : 0 || item.current_state == 10 ? 'primary' : 0  || item.current_state == 20 ? 'success' : 0 || item.current_state == -10 ? 'danger' : 0  || item.current_state == -20 ? 'danger' : 0 || item.current_state == 100 ? 'success' : 0 || item.current_state == 200 ? 'success' : 0 } px-2 text-white rounded small`}>
                                                    {item.current_state == 0 ? 'Back Office Rejected' : '' }
                                                    {item.current_state == 1 ? 'O. Limit Approval Pending' : '' }
                                                    {item.current_state == 2 ? 'Back Office Approval Pending' : '' }
                                                    {item.current_state == 3 ? 'Back Office Approved' : '' }
                                                    {item.current_state == 10 ? 'Cheeck Veri. Approval Pending' : '' }
                                                    {item.current_state == 20 ? 'Payment Mismatch Approved' : '' }
                                                    {item.current_state == -10 ? 'Cheeck Veri. Rejected' : '' }
                                                    {item.current_state == -20 ? 'Payment Mismatch Rejected' : '' }
                                                    {item.current_state == 100 ? 'Ready to Delivery' : '' }
                                                    {item.current_state == 200 ? 'DELIVERED ' : '' }
                                                </span>
                </p>
                <div className="row" >
                    <Link to={"/backOffice/SinglePending/" + item.id}><button type="button" className="btn  mt-3 ml-3" style={{color:"#FFFFFF", backgroundColor:"#475466"}}>View</button></Link>
                    {/* <button type="button" className="btn btn-success">Success</button> */}
                </div>
            </Card>
        );
    }
    
    // Completed Order card view
    renderCompletedOrders = (item) => {
        // const { search } = this.state;
        // if( search !== "" && item.name.toLowerCase().indexOf(search.toLowerCase()) === -1 ){
        // return null;
        // }

        return(
            <Card style={{padding:"15px",marginLeft:"10px", marginRight:"10px", marginBottom:"10px"}} key={item.id} >
                 <div className="row">
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>Tcode : {item.customer_tcode}</p></div>
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466",  marginBottom:"0px"}}>Date : {moment(new Date(item.createdAt)).format("YYYY MMM DD")}</p></div>
                </div>
                <p style={{fontSize:"18px", color:"#18A0FB",fontFamily:"sans-serif", marginBottom:"0px"}}>Total Amount : {item.total} LKR</p>
                <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginTop:"0px",  marginBottom:"0px"}}>Delivery Date : {moment(new Date(item.delivery_date)).format("YYYY MMM DD")}</p>
                <div className="row" >
                    <button type="button" className="btn btn-success mt-3 ml-3">View</button>
                    {/* <button type="button" className="btn btn-success">Success</button> */}
                </div>
            </Card>
        );
    }

    // Rejected order card view
    renderRejectedOrders = (item) => {
        // const { search } = this.state;
        // if( search !== "" && item.name.toLowerCase().indexOf(search.toLowerCase()) === -1 ){
        // return null;
        // }

        return(
            <Card style={{padding:"15px",marginLeft:"10px", marginRight:"10px", marginBottom:"10px"}} key={item.id} >
                 <div className="row">
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>Tcode : {item.customer_tcode}</p></div>
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466",  marginBottom:"0px"}}>Date : {moment(new Date(item.createdAt)).format("YYYY MMM DD")}</p></div>
                </div>
                <p style={{fontSize:"18px", color:"#18A0FB",fontFamily:"sans-serif", marginBottom:"0px"}}>Total Amount : {item.total} LKR</p>
                <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginTop:"0px",  marginBottom:"0px"}}>Delivery Date : {moment(new Date(item.delivery_date)).format("YYYY MMM DD")}</p>
                <div className="row" >
                    <button type="button" className="btn btn-danger mt-3 ml-3">View</button>
                    {/* <button type="button" className="btn btn-success">Success</button> */}
                </div>
            </Card>
        );
    }









   
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});
 
  
export default connect(mapStateToProps, null)(withRouter(SalesOrder));