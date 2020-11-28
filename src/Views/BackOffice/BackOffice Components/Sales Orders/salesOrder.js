import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import BackOfficeSidebar from "../../Sidebar.Backoffice";
import {  Card } from 'react-bootstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import SALESORDER_CONTROLLER from '../../../../Controllers/BackOffice/SalesOrder.Controller';

class SalesOrder extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            PendingOrderList: [],
            CompletedOrderList: [],
            RejectedOrderList: [],
 
        };
    }

    async componentDidMount() {
        this.loadAllPendingOrders();
        this.loadAllCompletedOrders();
        this.loadAllRejectedOrders();
    }

    //GET all Pending Orders
    loadAllPendingOrders = async () => {
        const resPending = await SALESORDER_CONTROLLER.getAllPending(this.props.auth.token);
        console.log("pending ", resPending);
        this.setState({
            PendingOrderList: resPending.data.rows,
        });
    }

    //GET all Completed Orders
    loadAllCompletedOrders = async () => {
        const resCompleted = await SALESORDER_CONTROLLER.getAllCompleted(this.props.auth.token);
        console.log("completed ", resCompleted);
        this.setState({
            CompletedOrderList: resCompleted.data.rows,
        });
    }

    //GET all Rejected Orders
    loadAllRejectedOrders = async () => {
        const resRejected = await SALESORDER_CONTROLLER.getAllRejected(this.props.auth.token);
        console.log("rejecteed ", resRejected);
        this.setState({
            RejectedOrderList: resRejected.data.rows,
        });
    }

    render() {

        const {RejectedOrderList , CompletedOrderList,PendingOrderList} = this.state;

        return (
            <div className="bg-light wd-wrapper">
                <BackOfficeSidebar activemenu={'SalesOrder'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">

                        <div class="row">
                            <div class="col-sm">
                                <Card style={{height:"660px"}}>
                                    <h6 style={{ padding:"20px",marginBottom:"0px", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>Pending Orders</h6>
                                    <hr style={{marginTop:"0px"}}></hr>

                                    {PendingOrderList && PendingOrderList.map((name) => this.renderPendingOrders(name))}

                                </Card>
                            </div>
                            <div class="col-sm">
                                <Card style={{height:"660px"}}>
                                    <h6 style={{ padding:"20px",marginBottom:"0px", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>Completed Orders</h6>
                                    <hr style={{marginTop:"0px"}}></hr>

                                    {CompletedOrderList && CompletedOrderList.map((name) => this.renderCompletedOrders(name))}

                                </Card>
                            </div>
                            <div class="col-sm">
                                <Card style={{height:"660px"}}>
                                    <h6 style={{ padding:"20px",marginBottom:"0px", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>Rejected Orders</h6>
                                    <hr style={{marginTop:"0px"}}></hr>

                                    {RejectedOrderList && RejectedOrderList.map((name) => this.renderRejectedOrders(name))}

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
                    <Link to={"/backOffice/SinglePending/" + item.customer_id}><button type="button" className="btn btn-warning mt-3 ml-3" style={{color:"#FFFFFF"}}>View</button></Link>
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