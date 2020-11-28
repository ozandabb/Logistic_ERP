import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import BackOfficeSidebar from "../../Sidebar.Backoffice";
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import moment from 'moment';
import CUST_CONTROLLER from '../../../../Controllers/HR Staff/Customer.controller';
import SALESORDER_CONTROLLER from '../../../../Controllers/BackOffice/SalesOrder.Controller';

class SinglePending extends Component {  
    
    constructor(props) {
        super(props);
        this.state = {
            pendingOrderByCusID : [],
            cus_tcode : '',
        }
    }

    async componentDidMount() {
        this.loadData();
        this.loadPendingOrderByCusID();
    }

    //GET all Promo, gifts, discount
    loadPendingOrderByCusID = async (id) => {
        const resFuel = await SALESORDER_CONTROLLER.getPendingByCusID( this.props.match.params.id, this.props.auth.token);    
        console.log("huhuhuhu",resFuel.data.data.rows );    
        this.setState({
            pendingOrderByCusID :resFuel.data.data.rows, 
            cus_tcode : resFuel.data.data.rows.customer_tcode,
        });    
    }

    //Get customer by t_code - function
    loadData = async (t_code) => {
        const res = await CUST_CONTROLLER.getOneCustByTCODE(this.state.cus_tcode,this.props.auth.token);
        console.log("kaaaaaa", res);
        if(res.status === 200 ){
            // this.setState({
            //     error:false,
            //     id: res.data.data.id,
            //     address: res.data.data.address,
            //     city: res.data.data.city,
            //     dob: res.data.data.dob,
            //     lat: res.data.data.lat,
            //     long: res.data.data.long,
            //     name: res.data.data.name,
            //     postal_code: res.data.data.postal_code,
            //     t_code: res.data.data.t_code,
            //     user_id: res.data.data.user_id,
            // });
        }
    }


    render() {
        const {pendingOrderByCusID} = this.state;

        return (
            <div className="bg-light wd-wrapper">
                <BackOfficeSidebar activemenu={'backOffice_Cheque'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">

                        <div class="row">
                            <div class="col-sm-8">
                                <Card style={{height:"660px"}}>
                                    {/* {this.props.match.params.id} */}
                                    <Card style={{margin:"10px"}}>
                                        <h6 style={{ padding:"20px",marginBottom:"0px", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>Customer Details</h6>
                                        <hr style={{marginTop:"0px"}}></hr>
                                    </Card>
                                    <Card style={{margin:"10px"}}>
                                        <h6 style={{ padding:"20px",marginBottom:"0px", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>Order Details</h6>
                                        <hr style={{marginTop:"0px"}}></hr>

                                        {pendingOrderByCusID && pendingOrderByCusID.map((name) => this.renderPending(name))}

                                    </Card>
                                </Card>
                            </div>
                            <div class="col-sm-4">
                                <Card style={{height:"660px"}}>
                                    trtrntr
                                </Card>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
    
    // Pending Order card view
    renderPending = (item) => {
        // const { search } = this.state;
        // if( search !== "" && item.name.toLowerCase().indexOf(search.toLowerCase()) === -1 ){
        // return null;
        // }

        return(
            <Card style={{padding:"15px",marginLeft:"10px", marginRight:"10px", marginBottom:"10px"}} key={item.id} >
                <div className="row">
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>Order ID : {item.id}</p></div>
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466",  marginBottom:"0px"}}>Created Date : {moment(new Date(item.createdAt)).format("YYYY MMM DD")}</p></div>
                </div>
                <p style={{fontSize:"18px", color:"#18A0FB",fontFamily:"sans-serif", marginBottom:"0px"}}>Total Amount : {item.total} LKR</p>
                <p className="d-none d-lg-block" style={{fontSize:"14px", color:"#00FF00", marginTop:"0px",  marginBottom:"0px"}}>Pending Balance : {item.pending_balance}</p>
                <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginTop:"20px",  marginBottom:"0px"}}>Delivery Date : {moment(new Date(item.delivery_date)).format("YYYY MMM DD")}</p>
                <div className="row">
                        <div className="col-sm">
                            <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>Current State : {item.current_state}</p>
                            <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>Added By : {item.added_by}</p>
                            <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>Update At : {moment(new Date(item.updatedAt)).format("YYYY MMM DD")}</p>
                        </div>
                        <div className="col-sm">
                            {/* <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466",  marginBottom:"0px"}}>Date : {moment(new Date(item.createdAt)).format("YYYY MMM DD")}</p> */}
                        </div>
                </div>
                <div className="row" >
                    <Link to={"/backOffice/SinglePending/" + item.customer_id}><button type="button" className="btn btn-warning mt-3 ml-3" style={{color:"#FFFFFF"}}>View</button></Link>
                    {/* <button type="button" className="btn btn-success">Success</button> */}
                </div>
            </Card>
        );
    }
   
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});
 
  
export default connect(mapStateToProps, null)(withRouter(SinglePending));