import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import BackOfficeSidebar from "../../Sidebar.Backoffice";
import { connect } from 'react-redux';
import { Card , Image ,Button , InputGroup , FormControl , Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch  } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import ScrollArea from 'react-scrollbar'
import MISMATCH_CONTROLLER from '../../../../Controllers/Managment Team/paymentMismatch.controller';
import CUST_CONTROLLER from '../../../../Controllers/HR Staff/Customer.controller';
import ChequeController from '../../../../Controllers/BackOffice/Cheque.Controller';
import Spinner from "react-bootstrap/Spinner";
import {FormInput , FormSelect } from '../../../../Components/Form'
import CONFIG from '../../../../Controllers/Config.controller';

class SingleCheque extends Component {  
    
    constructor(props) {
        super(props);
        this.state = {
            addSupplierState: false,
            orderstate: false,
            showUserModal: false,
            showUserModal2: false,

            cus_tcode : '',
            isLoading: '',
            singleCheque:[],
            customerDetails:[],
            orderDetails:[],
            userDetails:[],

            stateOf:'',
            comment:'',
            isLoading:'',

            viewUser: [],
            viewUser2: [],

            id:'',

        }

    }

    async componentDidMount() {
        this.loadsingleCheque();

    }

    // view user modal
    async showViewUser(i) {
        const resFue2l = await ChequeController.getOneCheque( this.props.match.params.id, this.props.auth.token);

        await this.setState({
            showUserModal: true,
            viewUser: resFue2l.data.data.image
        })
    }

    // view user modal
    async showViewUser2(i) {
        const resFuel0 = await ChequeController.getOneCheque( this.props.match.params.id, this.props.auth.token);
        const resPhone0 = await CUST_CONTROLLER.getOneUserByUSERNAME(resFuel0.data.data.customer.username ,this.props.auth.token);

        await this.setState({
            showUserModal2: true,
            viewUser2: resPhone0.data.data.image
        })
    }

    //update status of the misatch payment
    onFormSubmit = async (e) => {
        e.preventDefault();

        var data = {
            id: this.state.singleCheque.id,
            state: parseInt(this.state.stateOf),
            remark: this.state.comment,
            load_id: this.state.singleCheque.load_id,
        }

        const result = await ChequeController.UpdateStatus(data, this.props.auth.token);

        if(result.status == 200){
            CONFIG.setToast("Successfully Updated!");
            this.props.history.push("/backOffice/ChequeVerify");
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

    change_ordet_toggle = () => {
        if (this.state.orderstate) {
            this.setState({ orderstate: false })
        } else {
            this.setState({ orderstate: true })
        }
    }

    //GET single order and customer details
    loadsingleCheque = async (id) => {
        this.setState({
            isLoading : true,
        })
        const resFuel = await ChequeController.getOneCheque( this.props.match.params.id, this.props.auth.token);
        const resPhone = await CUST_CONTROLLER.getOneUserByUSERNAME(resFuel.data.data.customer.username ,this.props.auth.token);

        console.log("single cheque", resPhone);
        
        this.setState({
            singleCheque: resFuel.data.data,
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
        const { customerDetails , orderDetails , userDetails, singleCheque , viewUser , viewUser2} = this.state;

        return (
            <div className="bg-light wd-wrapper">
                <BackOfficeSidebar activemenu={'CHEQUE_VERIFY'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">

                        <div class="row">
                            <div class="col-sm-8">
                                <Card style={{height:"100hv"}} className="shadow">

                                    {/* Cheque details */}
                                    <Card style={{margin:"10px"}}>
                                        <div className="row">
                                            <div className="col-sm">
                                                <h6 style={{ padding:"20px",marginBottom:"0px", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>Cheque Details</h6>
                                            </div>
                                        </div>
                                        <hr style={{marginTop:"0px"}}></hr>

                                        <div className="row">
                                            <div className="col-sm">
                                                <div className="row">
                                                    <div className="col-sm">
                                                        <h6 style={{ paddingLeft:"20px",marginBottom:"0px", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>Cheque (Cash Collector Upload)</h6>
                                                    </div>
                                                </div>
                                                <Card style={{margin:"10px"}}>
                                                    <Image 
                                                    src={singleCheque.image} 
                                                    onClick={() => this.showViewUser()}
                                                    style={{cursor:"pointer"}}/>
                                                        <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto'}}>
                                                            <span className="sr-only">Loading...</span>
                                                        </Spinner>
                                                </Card>
                                            </div>
                                            <div className="col-sm">
                                                <div className="row">
                                                    <div className="col-sm">
                                                        <h6 style={{ paddingLeft:"20px",marginBottom:"0px", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>Customer Signature</h6>
                                                    </div>
                                                </div>
                                                <Card style={{margin:"10px"}}>
                                                    <Image src={userDetails.image}/>
                                                        <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto'}}>
                                                            <span className="sr-only">Loading...</span>
                                                        </Spinner>
                                                </Card>
                                            </div>
                                        </div>
                                    </Card>

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
                                            <div className="col-sm-9">
                                                <h6 style={{ padding:"20px",marginBottom:"0px", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>Order Details</h6>
                                            </div>
                                            <div className="col-sm-3">
                                            <Image src="/images/arrowdown.png" className="d-none d-lg-block" style={{width:"40px",marginBottom:"0px",paddingTop:"10px",  marginLeft:"10px", cursor:"pointer"}} onClick={() => this.change_ordet_toggle()} rounded />
                                            </div>
                                        </div>
                                        <hr style={{marginTop:"0px"}}></hr>

                                        <div className="row ml-3 mt-0 mb-3" style={{ display: this.state.orderstate == true ? 'block' : 'none'}}>
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
                                                <Button type="submit" style={{backgroundColor:"#475466" , color:"#FFFFFF", width:"100%",  cursor: 'pointer'}} >Submit</Button>
                                                </div>
                                            </form>
                                            </div>
                                        </div>

                                    </Card>


                                </Card>
                            </div>
                        </div>



                        <Modal
                            size="lg"
                            show={this.state.showUserModal}
                            centered
                            onHide={() => this.setState({ showUserModal: false })}>

                            <Modal.Header closeButton>
                                <Modal.Title>Cheque (Cash Collector Upload)</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <div className="row">
                                    <div className="col-sm">
                                    <Image 
                                        src={viewUser} 
                                        />
                                    </div>
                                </div>

                            </Modal.Body>

                        </Modal>

                        <Modal
                            size="lg"
                            show={this.state.showUserModal2}
                            centered
                            onHide={() => this.setState({ showUserModal2: false })}>

                            <Modal.Header closeButton>
                                <Modal.Title>Cheque (Cash Collector Upload)</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <div className="row">
                                    <div className="col-sm">
                                    <Image 
                                        src={viewUser2} 
                                        />
                                    </div>
                                </div>

                            </Modal.Body>

                        </Modal>

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
 
  
export default connect(mapStateToProps, null)(withRouter(SingleCheque));