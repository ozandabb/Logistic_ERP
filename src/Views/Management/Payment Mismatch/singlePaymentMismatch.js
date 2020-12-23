import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ManagementSidebar from "../Sidebar.Mangement";
import { connect } from 'react-redux';
import { Card , Image ,Button , InputGroup , FormControl , Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch  } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import ScrollArea from 'react-scrollbar'
import MISMATCH_CONTROLLER from '../../../Controllers/Managment Team/paymentMismatch.controller';
import CUST_CONTROLLER from '../../../Controllers/HR Staff/Customer.controller';
import SALESORDER_CONTROLLER from '../../../Controllers/BackOffice/SalesOrder.Controller';
import Spinner from "react-bootstrap/Spinner";
import {FormInput , FormSelect } from '../../../Components/Form'
import CONFIG from '../../../Controllers/Config.controller';

class SinglePaymentMismatch extends Component {  
    
    constructor(props) {
        super(props);
        this.state = {
            addSupplierState: false,
            approveBtnState:true,

            cus_tcode : '',
            isLoading: '',
            singleMismacth:[],
            customerDetails:[],
            orderDetails:[],
            userDetails:[],

            stateOf:'',
            comment:'',


            id:'',

        }

    }

    async componentDidMount() {
        this.loadsinglePaymentMismatch();

    }

    //update status of the misatch payment
    onFormSubmit = async (e) => {
        e.preventDefault();

        var data = {
            id: this.state.singleMismacth.id,
            state: parseInt(this.state.stateOf),
            remark: this.state.comment,
            load_id: this.state.singleMismacth.load_id,
        }

        const result = await MISMATCH_CONTROLLER.UpdateStatus(data, this.props.auth.token);

        if(result.status == 200){
            CONFIG.setToast("Successfully Updated!");
            this.props.history.push("/ManagementTeam/PaymentMismatch");
        }else{
            CONFIG.setErrorToast("Somthing Went Wrong!");
        }

    }

    change_toggle = () => {
        if (this.state.addSupplierState) {
            this.setState({ addSupplierState: false })
        } else {
            this.setState({ addSupplierState: true })
        }
    }




    //GET single order and customer details
    loadsinglePaymentMismatch = async (id) => {
        this.setState({
            isLoading : true,
        })
        const resFuel = await MISMATCH_CONTROLLER.getOneMismatch( this.props.match.params.id, this.props.auth.token);
        const resPhone = await CUST_CONTROLLER.getOneUserByUSERNAME(resFuel.data.data.customer.username ,this.props.auth.token);

        console.log("single mismatch", resFuel);
        
        // if(resFuel.data.data.current_state ===3 ){
        //     this.setState({
        //         approveBtnState : false,

        //     })
        // }else{
        //     this.setState({
        //         approveBtnState : true,
        //     })
        // }
        this.setState({
            singleMismacth: resFuel.data.data,
            customerDetails: resFuel.data.data.customer,
            orderDetails: resFuel.data.data.order,
            userDetails:resPhone.data.data,
            isLoading : false,
        });    
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }

    render() {
        const { customerDetails , orderDetails , userDetails} = this.state;

        return (
            <div className="bg-light wd-wrapper">
                <ManagementSidebar activemenu={'MISMATCH'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">

                        <div class="row">
                            <div class="col-sm-8">
                                <Card style={{height:"100hv"}} className="shadow">

                                    {/* Customer details */}
                                    <Card style={{margin:"10px"}}>
                                        <div className="row">
                                            <div className="col-sm-9">
                                                <h6 style={{ padding:"20px",marginBottom:"0px", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>Customer Details - {customerDetails.name} ({customerDetails.t_code})</h6>
                                            </div>
                                            <div className="col-sm-3">
                                            <Image src="/images/arrowdown.png" className="d-none d-lg-block" style={{width:"40px",marginBottom:"0px",paddingTop:"10px",  marginLeft:"10px", cursor:"pointer"}} onClick={() => this.change_toggle()} rounded />
                                            </div>
                                        </div>
                                        <hr style={{marginTop:"0px"}}></hr>

                                        <div className="row ml-3 mt-0 mb-3" style={{ display: this.state.addSupplierState == true ? 'block' : 'none'}}>
                                            <div className="col-sm" style={{paddingRight:"50px"}}>

                                                <div className="row">
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={'Customer Name *'}
                                                            value={customerDetails.name}
                                                            readOnly                                                        />
                                                    </div>
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"Customer T code *"}
                                                            value={customerDetails.t_code}
                                                            readOnly                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"Address *"}
                                                            readOnly 
                                                            value = {customerDetails.address}
                                                            />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={'Contact Number *'}
                                                            value={userDetails.phone}
                                                            readOnly                                                        />
                                                    </div>
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"Email *"}
                                                            value={userDetails.email}
                                                            readOnly                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={'Credit Limit *'}
                                                            value= {CONFIG.numberWithCommas(parseInt(customerDetails.credit_limit))}
                                                            readOnly                                                        />
                                                    </div>
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"Joined Date` *"}
                                                            value={moment(new Date(customerDetails.createdAt)).format("YYYY MMM DD")}
                                                            //value={customerDetails.createdAt}
                                                            readOnly                                                        />
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </Card>

                                    {/* order details */}
                                    <Card style={{margin:"10px"}}>
                                        <div className="row">
                                            <h6 style={{ marginLeft:"20px", padding:"20px",marginBottom:"0px", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>Order Details</h6>
                                        </div>
                                        <hr style={{marginTop:"0px"}}></hr>

                                        <div className="row ml-3 mt-0 mb-3">
                                            <div className="col-sm" style={{paddingRight:"50px"}}>

                                                <div className="row">
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={'Completed *'}
                                                            value={orderDetails.complete}
                                                            readOnly                                                        />
                                                    </div>
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"Added By *"}
                                                            value={orderDetails.added_by}
                                                            readOnly                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={'Ordered Date *'}
                                                            value={moment(new Date(orderDetails.createdAt)).format("YYYY MMM DD")}
                                                            readOnly                                                        />
                                                    </div>
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"Deliver Date *"}
                                                            value={moment(new Date(orderDetails.delivery_date)).format("YYYY MMM DD")}
                                                            readOnly                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={'On the Spot *'}
                                                            value={orderDetails.on_the_spot}
                                                            readOnly                                                        />
                                                    </div>
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"Payment *"}
                                                            value={orderDetails.paid}
                                                            readOnly                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={'Pending Balance *'}
                                                            value={orderDetails.pending_balance}
                                                            readOnly                                                        />
                                                    </div>
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"Total *"}
                                                            value={orderDetails.total}
                                                            readOnly                                                        />
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                           
                                    </Card>


                                </Card>
                            </div>


                            <div class="col-sm-4">
                                {/* Status detaisl */}
                                <Card style={{height:"100hv"}} className="shadow">

                                    <Card style={{margin:"20px" }}>
                                        <div className="row" >
                                            <div className="col-sm">
                                            <form onSubmit={(e) => this.onFormSubmit(e)}>
                                                <div className="row" style={{marginLeft:"0px", marginRight:"0px"}}>
                                                    <div className="col-sm-12 mt-3 mb-1" >
                                                        <FormSelect 
                                                            label={"Status ( 1- Approve | 2- Reject )"}
                                                            options={SYSTEM_ACCESS}
                                                            value={this.state.stateOf}
                                                            name="stateOf"
                                                            required
                                                            onChange={(e) => this.formValueChange(e)}
                                                        />

                                                    </div>
                                                </div>
                                                <div className="row" style={{marginLeft:"0px", marginRight:"0px"}}>
                                                    <div className="col-sm-12 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"Enter a Comment *"}
                                                            placeholder={"Add a Comment"}
                                                            required
                                                            value={this.state.comment}
                                                            name="comment"
                                                            onChange={this.formValueChange}
                                                        />

                                                    </div>
                                                </div>
                                                <div className="row" style={{margin:"10px"}}>
                                                <Button type="submit" style={{backgroundColor:"#475466" , color:"#FFFFFF", width:"100%",  cursor: 'pointer',display: this.state.approveBtnState == true ? 'block' : 'none'}} >Submit</Button>
                                                </div>
                                            </form>
                                            </div>
                                        </div>

                                    </Card>

                                    <Card style={{margin:"20px" }}>

                                        <div className="row">
                                            <div className="col-sm">
                                                <h6 style={{ padding:"20px",marginBottom:"0px", fontFamily:"Roboto, sans-serif", fontStyle:"initial" }}>Order Current Status</h6>
                                            </div>
                                        </div>
                                        {/* {orderDetails.current_state} */}
                                        <hr style={{marginTop:"0px"}}></hr>

                                        <div className="row" >
                                            <div className="col-sm">
                                                <div style={{display: "flex", justifyContent: "center",alignItems: "center", marginTop:"5px", marginBottom:"20px"}}>
                                                    <span className={`bg-${orderDetails.current_state == 0 ? 'danger' : 0 || orderDetails.current_state == 1 ? 'primary' : 0  || orderDetails.current_state == 2 ? 'primary' : 0 || orderDetails.current_state == 3 ? 'success' : 0 || orderDetails.current_state == 10 ? 'primary' : 0  || orderDetails.current_state == 20 ? 'success' : 0 || orderDetails.current_state == -10 ? 'danger' : 0  || orderDetails.current_state == -20 ? 'danger' : 0 || orderDetails.current_state == 100 ? 'success' : 0 || orderDetails.current_state == 200 ? 'success' : 0 } px-5 text-white rounded small`}>
                                                        {orderDetails.current_state == 0 ? 'Back Office Rejected' : '' }
                                                        {orderDetails.current_state == 1 ? 'O. Limit Approval Pending' : '' }
                                                        {orderDetails.current_state == 2 ? 'Back Office Approval Pending' : '' }
                                                        {orderDetails.current_state == 3 ? 'Back Office Approved' : '' }
                                                        {orderDetails.current_state == 10 ? 'Cheeck Veri. Approval Pending' : '' }
                                                        {orderDetails.current_state == 20 ? 'Payment Mismatch Approved' : '' }
                                                        {orderDetails.current_state == -10 ? 'Cheeck Veri. Rejected' : '' }
                                                        {orderDetails.current_state == -20 ? 'Payment Mismatch Rejected' : '' }
                                                        {orderDetails.current_state == 100 ? 'Ready to Delivery' : '' }
                                                        {orderDetails.current_state == 200 ? 'DELIVERED ' : '' }
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                    </Card>


                                </Card>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
    
    
   
}

const SYSTEM_ACCESS = [{ label : 'Select the Option' ,value : 'NONE' } , 
...['1','2'].map( i => {
    return{
        label : i  ,
         value : i 
    }
})];

const mapStateToProps = state => ({
    auth: state.auth || {},
});
 
  
export default connect(mapStateToProps, null)(withRouter(SinglePaymentMismatch));