import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import HODsidebar from "../Sidebar.HeadDept";
import { Card } from 'react-bootstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import Salary_request_CONTROLLER from '../../../Controllers/HeadOfDept/request.controller';
import Spinner from "react-bootstrap/Spinner";
import ScrollArea from 'react-scrollbar'

class SalaryRequest extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            PendingOrderList: [],
            CompletedOrderList: [],
            RejectedOrderList: [],
            isLoading: '',
 
        };
    }

    async componentDidMount() {
        this.loadAllPendingOrders();
        this.loadAllCompletedOrders();
        this.loadAllRejectedOrders();
    }

    // //GET all Pending Orders
    loadAllPendingOrders = async () => {
        this.setState({
            isLoading : true,
        })
        const resPending = await Salary_request_CONTROLLER.getAllPending(this.props.auth.token);
        this.setState({
            isLoading : false,
            PendingOrderList: resPending.data.rows,
        });
    }

    //GET all Completed Orders
    loadAllCompletedOrders = async () => {
        const resCompleted = await Salary_request_CONTROLLER.getAllCompleted(this.props.auth.token);
        console.log("completed ", resCompleted);
        this.setState({
            CompletedOrderList: resCompleted.data.rows,
        });
    }

    //GET all Rejected Orders
    loadAllRejectedOrders = async () => {
        const resRejected = await Salary_request_CONTROLLER.getAllRejected(this.props.auth.token);
        console.log("rejecteed ", resRejected);
        this.setState({
            RejectedOrderList: resRejected.data.rows,
        });
    }

    render() {

        const {RejectedOrderList , CompletedOrderList,PendingOrderList} = this.state;

        return (
            <div className="bg-light wd-wrapper">
                <HODsidebar activemenu={'REQUESTS'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">

                        <div class="row">
                            <div class="col-sm">
                                <Card style={{height:"660px"}}>
                                    <h6 style={{ padding:"20px",marginBottom:"0px", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>Pending Requests</h6>
                                    <hr style={{marginTop:"0px"}}></hr>
                                    <ScrollArea
                                        speed={1}
                                        className="area"
                                        style={{height:"660px"}}
                                        contentClassName="content"
                                        horizontal={false}
                                        >
                                    {PendingOrderList && PendingOrderList.map((name) => this.renderPendingOrders(name))}
                                    <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto'}}>
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                    </ScrollArea>
                                </Card>
                            </div>
                            <div class="col-sm">
                                <Card style={{height:"660px"}}>
                                    <h6 style={{ padding:"20px",marginBottom:"0px", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>Approved Requests</h6>
                                    <hr style={{marginTop:"0px"}}></hr>
                                    <ScrollArea
                                        speed={1}
                                        className="area"
                                        style={{height:"660px"}}
                                        contentClassName="content"
                                        horizontal={false}
                                        >
                                    {CompletedOrderList && CompletedOrderList.map((name) => this.renderCompletedOrders(name))}
                                    <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto'}}>
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                    </ScrollArea>
                                </Card>
                            </div>
                            <div class="col-sm">
                                <Card style={{height:"660px"}}>
                                    <h6 style={{ padding:"20px",marginBottom:"0px", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>Rejected Requests</h6>
                                    <hr style={{marginTop:"0px"}}></hr>
                                    <ScrollArea
                                        speed={1}
                                        className="area"
                                        style={{height:"660px"}}
                                        contentClassName="content"
                                        horizontal={false}
                                        >
                                    {RejectedOrderList && RejectedOrderList.map((name) => this.renderRejectedOrders(name))}
                                    <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto'}}>
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

    // Pending requests card view
    renderPendingOrders = (item) => {
        return(
            <Card style={{padding:"15px",marginLeft:"10px", marginRight:"10px", marginBottom:"10px"}} key={item.id} >
                 <div className="row">
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>ID : {item.id}</p></div>
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466",  marginBottom:"0px"}}>Dept ID : {item.department_id}</p></div>
                </div>
                <p style={{fontSize:"18px", color:"#18A0FB",fontFamily:"sans-serif", marginBottom:"0px"}}>Percentage : {item.percentage} %</p>
                <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginTop:"0px",  marginBottom:"0px"}}>Created Date : {moment(new Date(item.createdAt)).format("YYYY MMM DD")}</p>
                <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginTop:"0px",  marginBottom:"0px"}}>Description : {item.description}</p>
                <div className="row" >
                    <Link to={"/backOffice/SinglePending/" + item.customer_id}><button type="button" className="btn btn-warning mt-3 ml-3" style={{color:"#FFFFFF"}}>View</button></Link>
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
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>ID : {item.id}</p></div>
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466",  marginBottom:"0px"}}>Dept ID : {item.department_id}</p></div>
                </div>
                <p style={{fontSize:"18px", color:"#18A0FB",fontFamily:"sans-serif", marginBottom:"0px"}}>Percentage : {item.percentage} %</p>
                <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginTop:"0px",  marginBottom:"0px"}}>Created Date : {moment(new Date(item.createdAt)).format("YYYY MMM DD")}</p>
                <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginTop:"0px",  marginBottom:"0px"}}>Description : {item.description}</p>
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
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>ID : {item.id}</p></div>
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466",  marginBottom:"0px"}}>Dept ID : {item.department_id}</p></div>
                </div>
                <p style={{fontSize:"18px", color:"#18A0FB",fontFamily:"sans-serif", marginBottom:"0px"}}>Percentage : {item.percentage} %</p>
                <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginTop:"0px",  marginBottom:"0px"}}>Created Date : {moment(new Date(item.createdAt)).format("YYYY MMM DD")}</p>
                <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginTop:"0px",  marginBottom:"0px"}}>Description : {item.description}</p>
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
 
  
export default connect(mapStateToProps, null)(withRouter(SalaryRequest));