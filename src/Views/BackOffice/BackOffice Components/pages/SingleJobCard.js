import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import BackOfficeSidebar from "../../Sidebar.Backoffice";
import { connect } from 'react-redux';
import { Card , Image ,Button , InputGroup , FormControl , Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch  } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import ScrollArea from 'react-scrollbar'
import Vehicle_CONTROLLER from '../../../../Controllers/HR Staff/Vehicle.controller';
import CUST_CONTROLLER from '../../../../Controllers/HR Staff/Customer.controller';
import ChequeController from '../../../../Controllers/BackOffice/Cheque.Controller';
import Spinner from "react-bootstrap/Spinner";
import {FormInput , FormSelect } from '../../../../Components/Form'
import CONFIG from '../../../../Controllers/Config.controller';
import BACKOFFICE from '../../../../Controllers/BackOffice/backoffice';
import ReactToPrint from 'react-to-print';
import {GatePass} from './Gatepass';

class SingleJobCard extends Component {  
    
    constructor(props) {
        super(props);
        this.state = {
            addSupplierState: false,
            orderstate: false,
            searchState: false, 
            printSupplierState: false,

            cus_tcode : '',
            isLoading: '',
            singleJobCrad:[0],
            jobDetails:[],
            orderDetails:[],
            userDetails:[],
            vehicleList:[],
            stateOf:'',
            comment:'',
            isLoading:'',

            vehical_id:'',
            cash_collector:'',
            search: '',

            id:'',

        }

    }

    async componentDidMount() {
        this.loadsingleJobCard();
        this.loadAllVehicle();
    }

    //Search input text
    onChange = e =>{
        this.setState({search : e.target.value });
    }

     //Function for search icon to toggle 
     change_search_toggle = () => {
        if (this.state.searchState) {
            this.setState({ searchState: false })
        } else {
            this.setState({ searchState: true })
        }
    }

    //update status of the misatch payment
    onFormSubmit = async (e) => {
        e.preventDefault();

        var data = {
            id: this.state.singleJobCrad.id,
            vehical_id: parseInt(this.state.vehical_id),
            cash_collector: parseInt(this.state.cash_collector),
        }

        const result = await BACKOFFICE.UpdateJobCard(data, this.props.auth.token);

        if(result.status == 200){
            CONFIG.setToast("Successfully Updated!");
            this.props.history.push("/backOffice/job_cards");
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
    loadAllVehicle = async (id) => {
        this.setState({
            isLoading : true,
        })
        const resVehicle = await Vehicle_CONTROLLER.getAllVehicle(this.props.auth.token);
        
        this.setState({
            vehicleList: resVehicle.data.rows,
            isLoading : false,
        });    
    }

    //GET single order and customer details
    loadsingleJobCard = async (id) => {
        this.setState({
            isLoading : true,
        })
        const resFuel2 = await BACKOFFICE.getOneJobCrad( this.props.match.params.id ,this.props.auth.token);
        // const resPhone = await CUST_CONTROLLER.getOneUserByUSERNAME(resFuel.data.data.customer.username ,this.props.auth.token);

        console.log("Order detaisl", resFuel2);
        
        this.setState({
            singleJobCrad: resFuel2.data.data,
            jobDetails: resFuel2.data.data.jobs,
            // orderDetails: resFuel2.data.data.jobs,
            isLoading : false,
        });    
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }

    render() {
        const { jobDetails , orderDetails , userDetails, singleJobCrad , vehicleList } = this.state;

        return (
            <div className="bg-light wd-wrapper">
                <BackOfficeSidebar activemenu={'backoffice_job_card'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">

                        <div class="row">
                            <div class="col-sm-8">
                                <Card className="shadow">

                                    {/* Job card details */}
                                    <Card style={{margin:"10px"}}>
                                        <div className="row">
                                            <div className="col-sm">
                                                <h6 style={{ padding:"20px",marginBottom:"0px", fontFamily:"Roboto, sans-serif", fontStyle:"initial"}}>Job Card Details</h6>
                                            </div>
                                        </div>
                                        <hr style={{marginTop:"0px"}}></hr>

                                            <div className="row ml-3 mt-0 mb-3" >
                                                <div className="col-sm" style={{paddingRight:"50px"}}>

                                                    <div className="row">
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={'Route ID *'}
                                                                value={singleJobCrad.route_id}
                                                                readOnly                                                        />
                                                        </div>
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Vehicle ID *"}
                                                                value={singleJobCrad.vehical_id}
                                                                readOnly                                                        />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                    <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={'Cash Collector ID *'}
                                                                value={singleJobCrad.cash_collector}
                                                                readOnly                                                        />
                                                        </div>
                                                        <div className="col-md-6 mt-1 mb-1" >
                                                            <FormInput 
                                                                label={"Date *"}
                                                                value={moment(new Date(singleJobCrad.date)).format("YYYY MMM DD")}
                                                                readOnly                                                        />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            
                                    </Card>                        
                                </Card>

                                {/* Generate gate pass  */}
                                <Card className="shadow" style={{marginTop:"20px"}}>
                                <ReactToPrint
                                            trigger={() => {
                                                return <Button type="submit" style={{backgroundColor:"green" , color:"#FFFFFF", width:"100%",  cursor: 'pointer'}} >Generate Gate Pass</Button>
                                                ;
                                            }}
                                            content={() => this.componentRef}
                                        />
                                </Card>
                            </div>


                            <div class="col-sm-4">
                                {/* All vehicle */}
                                <Card style={{height:"100hv"}} className="shadow">

                                    <Card style={{margin:"20px" }}>
                                        <div className="row" >
                                            <div className="col-sm">
                                            <form onSubmit={(e) => this.onFormSubmit(e)}>
                                                <div className="row" style={{marginLeft:"0px", marginRight:"0px"}}>
                                                    <div className="col-sm-12 mt-3 mb-1" >
                                                        <FormInput 
                                                            label={"Vehicle ID"}
                                                            placeholder={"Enter No Of the Vehicle"}
                                                            value={this.state.vehical_id}
                                                            type="number"
                                                            name="vehical_id"
                                                            required
                                                            onChange={(e) => this.formValueChange(e)}
                                                        />

                                                    </div>
                                                </div>
                                                <div className="row" style={{marginLeft:"0px", marginRight:"0px"}}>
                                                    <div className="col-sm-12 mt-1 mb-1" >
                                                        <FormInput 
                                                            label={"Assign a Cash Collector *"}
                                                            placeholder={"Enter Emp ID Of the CC"}
                                                            type="number"
                                                            required
                                                            value={this.state.cash_collector}
                                                            name="cash_collector"
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

                                    <Card style={{marginLeft:"20px", marginRight:"20px"}}>

                                        <div className="row">

                                            <div className="col-sm-9">
                                                <h6 style={{ padding:"20px",marginBottom:"0px", fontFamily:"Roboto, sans-serif", fontStyle:"initial",display: this.state.searchState == false ? 'block' : 'none' }}>All Vehicles</h6>
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
                                                    {vehicleList && vehicleList.map((name) => this.renderAllVehicles(name))}
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


                    {/* print gate pass */}
                    <div className="row" style={{ display: this.state.printSupplierState == true ? 'block' : 'none', marginBottom:"15px" }}>
                    <GatePass
                        proid={this.props.auth.token}
                        id= {this.props.match.params.id}
                        HRname = {this.props.auth.user.user_details.username}
                        ref={el => (this.componentRef = el)} />
                    </div>

                    </div>
                </div>
            </div>
        );
    }

    renderAllVehicles = (item, i) => {

        const { search } = this.state;
        if( search !== "" && item.vehicle_number.toLowerCase().indexOf(search.toLowerCase()) === -1  && item.vehicle_name.toLowerCase().indexOf(search.toLowerCase()) === -1){
            return null;
        }

        return(
            <div className="row" key={item.id}  >
                <div className="col-sm-4">
                    <Image src="/images/isaiah_1.jpg" className="d-none d-lg-block" style={{width:"50px", marginLeft:"10px"}} rounded />
                </div>
                <div className="col-sm-8" >
                    <div className="row">
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>{item.vehicle_number}</p></div>
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466",  marginBottom:"0px"}}> {item.vehicle_year}</p></div>
                    </div>
                    <p style={{fontSize:"14px", color:"#18A0FB",fontFamily:"sans-serif" , marginBottom:"0px"}}>{item.vehicle_name}</p>
                    <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginTop:"0px",  marginBottom:"0px"}}>Vehicle ID : {item.id}</p>

                    <hr></hr>
                </div>
            </div>
        );
    }


    // single Order card view
    // renderPending = (item) => {

    //     return(
    //         <Card style={{padding:"15px",marginLeft:"10px", marginRight:"10px", marginBottom:"10px"}} key={item.id} >
    //             <div className="row">
    //                     <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>Job Card ID : {item.jobcard_id}</p></div>
    //                     <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466",  marginBottom:"0px"}}>Order ID : {item.order_id} </p></div>
    //             </div>
    //             <div className="row">
    //             <div className="col"><p className="d-none d-lg-block" style={{fontSize:"14px", color:"#00FF00", marginTop:"0px",  marginBottom:"0px"}}>Selling Price : {item.order.customer_id} LKR</p></div>
    //             <div className="col"><p className="d-none d-lg-block" style={{fontSize:"14px", color:"#00FF00", marginTop:"0px",  marginBottom:"0px"}}>Purchase Price : {item.order.customer_tcode} LKR</p></div>
    //         </div>
    //         <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginTop:"20px",  marginBottom:"0px"}}>Delivery Date :{moment(new Date(item.order.delivery_date)).format("YYYY MMM DD")} </p>
    //         <div className="row">
    //             <div className="col-sm">
    //                 <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>Total : {item.order.total}</p>
    //                 <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>Pending Balance : {item.order.pending_balance}</p>
    //             </div>
    //         </div>
                
           
    //         </Card>
    //     );
    // }


    
    
   
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
 
  
export default connect(mapStateToProps, null)(withRouter(SingleJobCard));