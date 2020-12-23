import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import BackOfficeSidebar from "../../Sidebar.Backoffice";
import { connect } from 'react-redux';
import { Card , Image ,Button , InputGroup , FormControl , Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch  } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import ScrollArea from 'react-scrollbar'
import CUST_CONTROLLER from '../../../../Controllers/HR Staff/Customer.controller';
import SALESORDER_CONTROLLER from '../../../../Controllers/BackOffice/SalesOrder.Controller';
import Spinner from "react-bootstrap/Spinner";
import {FormInput  } from '../../../../Components/Form'
import CONFIG from '../../../../Controllers/Config.controller';

class SinglePending extends Component {  
    
    constructor(props) {
        super(props);
        this.state = {
            addSupplierState: false,
            searchState: false, 
            approveBtnState:true,
            showUserModal: false,

            singleOrderList : [],
            cus_tcode : '',
            isLoading: '',
            customerDetails:[],
            stockList:[],
            userDetails:[],

            search: '',
            viewUser: [],

            id:'',

        }

        console.log("proprrrrr", this.props.match.params.id);
    }

    async componentDidMount() {
        this.loadsingleOrder();
        this.loadAllStockItems();

    }

    // update approve status
    UpdateApproveStatus = async (e) => {
        e.preventDefault();

        const resSingle = await SALESORDER_CONTROLLER.getOneOrder( this.props.match.params.id, this.props.auth.token);

        var data = {
            id: this.props.match.params.id,
            items: resSingle.data.data.order_items,
        }   
        
        const resultStatus = await SALESORDER_CONTROLLER.UpdateApproveStatus( data ,this.props.auth.token );

        if(resultStatus.status == 200){
            CONFIG.setToast("Successfully Approved !");
            this.setState({
                approveBtnState : false,
            })
            this.props.history.push("/backOffice/salesOrder");
        }
        else{
            CONFIG.setErrorToast("Somthing Went Wrong!");
        }
    }

     // update Reject status
     UpdateRejectStatus = async (e) => {
        e.preventDefault();

        const resSingle = await SALESORDER_CONTROLLER.getOneOrder( this.props.match.params.id, this.props.auth.token);

        var data = {
            id: this.props.match.params.id,
            items: resSingle.data.data.order_items,
        }   
        
        const resultStatus = await SALESORDER_CONTROLLER.UpdateRejectStatus( data ,this.props.auth.token );

        console.log("ummmmma", resultStatus);

        if(resultStatus.status == 200){
            CONFIG.setToast("Order is Rejected !");
            this.setState({
                approveBtnState : false,
            })
            this.props.history.push("/backOffice/salesOrder");
        }
        else{
            CONFIG.setErrorToast(resultStatus.response.data.message);
        }
    }

    change_toggle = () => {
        if (this.state.addSupplierState) {
            this.setState({ addSupplierState: false })
        } else {
            this.setState({ addSupplierState: true })
        }
    }

    //Function for search icon to toggle 
    change_search_toggle = () => {
        if (this.state.searchState) {
            this.setState({ searchState: false })
        } else {
            this.setState({ searchState: true })
        }
    }

    //Search input text
    onChange = e =>{
        this.setState({search : e.target.value });
    }

    //GET all Completed Orders
    loadAllStockItems = async () => {
        this.setState({
            isLoading : true,
        })
        const resStock = await SALESORDER_CONTROLLER.getStockItems(this.props.auth.token);
        this.setState({
            stockList: resStock.data.rows,
            isLoading : false,
        });
    }

    // view user modal
    async showViewUser(i) {
        const resFuel = await SALESORDER_CONTROLLER.getOneOrder( this.props.match.params.id, this.props.auth.token);
        await this.setState({
            showUserModal: true,
            viewUser: resFuel.data.data.order_items
        })
    }

    //GET single order and customer details
    loadsingleOrder = async (id) => {
        this.setState({
            isLoading : true,
        })
        const resFuel = await SALESORDER_CONTROLLER.getOneOrder( this.props.match.params.id, this.props.auth.token);
        const resCusDetails = await CUST_CONTROLLER.getOneCustByTCODE(resFuel.data.data.customer_tcode,this.props.auth.token);
        const resPhone = await CUST_CONTROLLER.getOneUserByUSERNAME(resCusDetails.data.data.username ,this.props.auth.token);

        console.log("huuuu",resPhone );
        
        if(resFuel.data.data.current_state ===3 ){
            this.setState({
                approveBtnState : false,

            })
        }else{
            this.setState({
                approveBtnState : true,
            })
        }
        this.setState({
            singleOrderList :resFuel.data.data.order_items, 
            customerDetails:resCusDetails.data.data,
            userDetails:resPhone.data.data,
            isLoading : false,
            cus_tcode : resFuel.data.data.customer_tcode,
        });    
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.name 
        },()=>{
            console.log(this.state);
        })
        
    }


    render() {
        const {singleOrderList , customerDetails , stockList , viewUser , userDetails} = this.state;

        return (
            <div className="bg-light wd-wrapper">
                <BackOfficeSidebar activemenu={'backOffice_salesOrder'} />
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
                                                            value={customerDetails.credit_limit}
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
                                            <div className="col-sm-3" style={{marginTop:"10px"}}>
                                                <button type="submit" 
                                                //onClick={() => this.showViewUser(this.props.match.params.id)} 
                                                style={{backgroundColor:"#475466" , color:"#FFFFFF",  cursor: 'pointer'}} className="btn mt-2 btn btn-sm px-5">Update</button>
                                            </div>
                                        </div>
                                        <hr style={{marginTop:"0px"}}></hr>
                                        <ScrollArea
                                            speed={1}
                                            className="area"
                                            style={{height:"600px"}}
                                            contentClassName="content"
                                            horizontal={false}
                                            >
                                            {singleOrderList && singleOrderList.map((name) => this.renderPending(name))}

                                            <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto', alignContent:'center'}}>
                                                <span className="sr-only">Loading...</span>
                                            </Spinner>

                                        </ScrollArea>

                                    </Card>


                                </Card>
                            </div>


                            <div class="col-sm-4">
                                {/* Status detaisl */}
                                <Card style={{height:"100hv"}} className="shadow">
                                    <div className="row" style={{margin:"10px"}}>
                                        <Button onClick={(e) => this.UpdateApproveStatus(e)} style={{backgroundColor:"#475466" , color:"#FFFFFF", width:"100%",  cursor: 'pointer',display: this.state.approveBtnState == true ? 'block' : 'none'}} >Approve Order</Button>
                                        <Button onClick={(e) => this.UpdateRejectStatus(e)}  style={{backgroundColor:"red" , color:"#FFFFFF", width:"100%",  cursor: 'pointer', marginTop:"10px"}} >Reject Order</Button>
                                    </div>
                                    <Card style={{margin:"20px", }}>

                                        <div className="row">

                                            <div className="col-sm-9">
                                                <h6 style={{ padding:"20px",marginBottom:"0px", fontFamily:"Roboto, sans-serif", fontStyle:"initial",display: this.state.searchState == false ? 'block' : 'none' }}>Item List in Warehouse</h6>
                                                <div className="col" style={{ display: this.state.searchState == true ? 'block' : 'none' , paddingTop:"15px"}}>
                                                    <InputGroup className="" >
                                                        <FormControl
                                                        style={{height:"30px"}}
                                                        aria-label="Username"
                                                        placeholder="Search Items"
                                                        onChange={ this.onChange}
                                                        aria-describedby="basic-addon1"
                                                        />
                                                    </InputGroup>
                                                </div>
                                            </div>
                                            <div className="col-sm-3" style={{paddingTop:"20px", paddingBottom:"8px"}}>
                                                <FontAwesomeIcon onClick={() => this.change_search_toggle()}  icon={faSearch} style={{cursor: 'pointer', marginLeft:"5px", alignContent:"flex-end", alignItems:"flex-end"}} />
                                            </div>

                                        </div>
                                        <hr style={{marginTop:"0px"}}></hr>

                                        <div className="row">
                                            <div className="col-sm">
                                                <ScrollArea
                                                speed={1}
                                                className="area"
                                                style={{height:"600px"}}
                                                contentClassName="content"
                                                horizontal={false}
                                                >
                                                    {stockList && stockList.map((name) => this.renderStockItem(name))}
                                                    <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto', alignContent:'center'}}>
                                                        <span className="sr-only">Loading...</span>
                                                    </Spinner>
                                                </ScrollArea>
                                            </div>
                                        </div>


                                    </Card>
                                </Card>
                            </div>
                        </div>

                        {/* <Modal
                            size="lg"
                            show={this.state.showUserModal}
                            centered
                            onHide={() => this.setState({ showUserModal: false })}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Update Item Quantity and Price</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <div className="row">
                                <div className="col-sm">
                                    <ScrollArea
                                        speed={1}
                                        className="area"
                                        style={{height:"500px"}}
                                        contentClassName="content"
                                        horizontal={false}
                                        >
                                        {viewUser && viewUser.map((name) => this.renderUpdateItem(name))}

                                        <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto', alignContent:'center'}}>
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>

                                    </ScrollArea>
                                    </div>
                                </div>
                                    
                                   
                                   
                            </Modal.Body>
                        </Modal> */}

                    </div>
                </div>
            </div>
        );
    }
    
    // single Order card view
    renderPending = (item) => {

        return(
            <Card style={{padding:"15px",marginLeft:"10px", marginRight:"10px", marginBottom:"10px"}} key={item.id} >
                <div className="row">
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>Order ID : {item.order_id}</p></div>
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466",  marginBottom:"0px"}}>Item ID : {item.item_id} </p></div>
                </div>
                <p style={{fontSize:"18px", color:"#18A0FB",fontFamily:"sans-serif", marginBottom:"0px"}}>Item Name : {item.item.name} </p>
                <div className="row">
                    <div className="col"><p className="d-none d-lg-block" style={{fontSize:"14px", color:"#00FF00", marginTop:"0px",  marginBottom:"0px"}}>Selling Price : {item.item.selling_price} LKR</p></div>
                    <div className="col"><p className="d-none d-lg-block" style={{fontSize:"14px", color:"#00FF00", marginTop:"0px",  marginBottom:"0px"}}>Purchase Price : {item.purchase_price} LKR</p></div>
                </div>
                <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginTop:"20px",  marginBottom:"0px"}}>Description : {item.item.description}</p>
                <div className="row">
                    <div className="col-sm">
                        <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>Ref Code : {item.item.refcode}</p>
                        <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>Quantity : {item.quantity}</p>
                    </div>
                </div>
      
                <div className="row">
                    <div className="col-md-6 mt-1 mb-1" >
                        <FormInput 
                            label={'Update Purchase Price *'}
                            value={item.purchase_price}
                            name="item.purchase_price"
                            //formOnChange={(e) => this.formValueChange(e)}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="col-md-6 mt-1 mb-1" >
                        <FormInput 
                            label={"Update Quantity *"}
                            value={item.quantity}
                            name="item.quantity"
                            // formOnChange={(e) => this.formValueChange(e)}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
           
            </Card>
        );
    }

    // update items
    // renderUpdateItem = (item) => {

    //     return(
    //         <Card style={{padding:"15px",marginLeft:"10px", marginRight:"10px", marginBottom:"10px"}} key={item.id} >
    //             <div className="row">
    //                     <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>Order ID : {item.order_id}</p></div>
    //                     <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466",  marginBottom:"0px"}}>Item ID : {item.item_id} </p></div>
    //             </div>
    //             <p style={{fontSize:"18px", color:"#18A0FB",fontFamily:"sans-serif", marginBottom:"0px"}}>Item Name : {item.item.name} </p>
    //             <div className="row">
    //                 <div className="col"><p className="d-none d-lg-block" style={{fontSize:"14px", color:"#00FF00", marginTop:"0px",  marginBottom:"0px"}}>Selling Price : {item.item.selling_price} LKR</p></div>
    //                 <div className="col"><p className="d-none d-lg-block" style={{fontSize:"14px", color:"#00FF00", marginTop:"0px",  marginBottom:"0px"}}>Purchase Price : {item.purchase_price} LKR</p></div>
    //             </div>
    //             <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginTop:"20px",  marginBottom:"0px"}}>Description : {item.item.description}</p>
    //             <div className="row">
    //                     <div className="col-sm">
    //                         <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>Ref Code : {item.item.refcode}</p>
    //                         <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>Quantity : {item.quantity}</p>
    //                     </div>
    //                     <div className="col-sm">
    //                     </div>
    //             </div>
    //         </Card>
    //     );
    // }

    renderStockItem = (item, i) => {
        const { search } = this.state;
        if( search !== "" && item.item.name.toLowerCase().indexOf(search.toLowerCase()) === -1 ){
        return null;
        }

        return(
            <div className="row" key={item.id} >
                <div className="col-sm" >
                    <div className="row" style={{paddingLeft:"20px"}}>
                        <div className="col-sm"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>Item ID : {item.item_id}</p></div>
                        <div className="col-sm"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466",  marginBottom:"0px"}}>Quantity : {item.quantity}</p></div>
                    </div>
                    <p style={{fontSize:"14px",paddingLeft:"20px", color:"#18A0FB",fontFamily:"sans-serif"}}>{item.item.name}</p>
                    <div className="row" style={{paddingLeft:"20px"}}>
                        <div className="col-sm"><p className="d-none d-lg-block" style={{fontSize:"13px", color:"#475466", marginBottom:"0px", marginTop:"0px"}}>Warehouse ID : {item.warehouse_id}</p></div>
                    </div>
                    <div className="row" style={{paddingLeft:"20px"}}>
                        <div className="col-sm"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>Buying Price : {item.item.buying_price} LKR</p></div>
                        <div className="col-sm"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466",  marginBottom:"0px"}}>Selling Price : {item.item.selling_price} LKR</p></div>
                    </div>
                    <hr></hr>
                </div>
            </div>
        );
    }
   
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});
 
  
export default connect(mapStateToProps, null)(withRouter(SinglePending));