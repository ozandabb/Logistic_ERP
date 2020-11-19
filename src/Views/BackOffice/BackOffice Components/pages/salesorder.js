import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import {SampleTabel} from '../shared/table';
import {BaseBtn} from '../shared/button'
import Backoffice_Sidebar from "../../Sidebar.Backoffice";
import { ViewSaleOrder } from './viewsaleorder';
import SalesOrdercontroller from '../../../../Controllers/BackOffice/SalesOrder.controller';
import PurchaseOrderObject from '../../../../Controllers/Purchasing Order/PurchaseOrder.controller';
import { Tab, Tabs } from 'react-bootstrap';
import { DetailPopup } from '../../../Management/Sales Order/DetailPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import {Spinner} from '../../../../Components/smallspinner';






class SalesOrder extends Component {


    constructor(props) {
        super(props);
        this.state={
            disable:false,
            showOrder:false,
            showCustomer:false,
            spinner:0,
            pendingRequests:[],
            acceptedRequests:[],
            rejectedRequests:[],
            customers:[],
            selectedCustomer:null,
            selectedOrder:null,
            items:[],
        };
    }
    componentDidMount(){
        PurchaseOrderObject.getAllCustomners(this.props.auth.token,
            (error,data)=>{
                if(!error){
                    this.setState(pre=>{

                        return{
                            ...pre,
                            spinner:pre.spinner++,
                            customers:data.data.rows
                        }
                    });
                }
            }
        );
        SalesOrdercontroller.getAllItems(this.props.auth.token,
            (error,data)=>{
                if(!error){
                    this.setState(pre=>{

                        return{
                            ...pre,
                            spinner:pre.spinner++,
                            items:data.data.rows
                        }
                    });
                }
            }
        );
        SalesOrdercontroller.getAllAcceptedRequests(this.props.auth.token,(error,data)=>{
            if(!error){
                this.setState(pre=>{

                    return{
                        ...pre,
                        spinner:pre.spinner++,
                        acceptedRequests:data.data.rows
                    }
                });
            }else{
                this.setState(pre=>{
                    return{
                        ...pre,
                        spinner:pre.spinner++,
                    }
                });
            }
            
        });
        SalesOrdercontroller.getAllPendingRequests(this.props.auth.token,(error,data)=>{
            if(!error){
                this.setState(pre=>{

                    return{
                        ...pre,
                        spinner:pre.spinner++,
                        pendingRequests:data.data.rows
                    }
                });
            }else{
                this.setState(pre=>{
                    return{
                        ...pre,
                        spinner:pre.spinner++,
                    }
                });
            }
        });
        SalesOrdercontroller.getAllRejectedRequests(this.props.auth.token,(error,data)=>{
            if(!error){
                this.setState(pre=>{
                    return{
                        ...pre,
                        spinner:pre.spinner++,
                        rejectedRequests:data.data.rows
                    }
                });
            }else{
                this.setState(pre=>{
                    return{
                        ...pre,
                        spinner:pre.spinner++,
                    }
                });
            }
        });
    }
    

    getCustomer=(id)=>{
        const customer=this.state.customers.find(element=>element.id===id);
        return (
            <Fragment>
            {customer?
            <Fragment><div style={{position:"absolute"}}>
            {customer.name} 
            </div>
            <div style={{textAlign:'right'}}>
            <BaseBtn
                size='sm'
                btnVarient='light'
                btnText={<FontAwesomeIcon icon={faExternalLinkAlt} />}
                onClickFn={()=>{
                    this.setState(pre=>{
                        return{
                            ...pre,
                            selectedCustomer:customer,
                            showCustomer:true
                        };
                    });
                }}
            />
            </div></Fragment>:''}    
        </Fragment>
        );
    }
    viewItems=(order,disable=false)=>{
        return (

            <Fragment> 
                <BaseBtn
                    size='sm'
                    btnVarient='info'
                    btnText={<Fragment>
                                Items
                                {/* <FontAwesomeIcon icon={faExternalLinkAlt} /> */}
                            </Fragment>}
                    onClickFn={()=>{
                        this.setState(pre=>{
                            return{
                                ...pre,
                                disable,
                                selectedOrder:order,
                                showOrder:true,
                            };
                        });
                    }}
                />
                
            </Fragment>
        );
    }

    render() {
        return (
            <div className="bg-light wd-wrapper">
            <Backoffice_Sidebar activemenu={'backOffice_salesOrder'} />

            <div  className="wrapper-wx" style={{height:"100hv"}}>
            {/* {JSON.stringify(this.getCustomer(2))} */}
                <div className="container-fluid" style={{paddingLeft:30}}>
                    <ViewSaleOrder
                        disable={this.state.disable}
                        token={this.props.auth.token}
                        items={this.state.items}
                        show={this.state.showOrder}
                        order={this.state.selectedOrder}
                        handleClose={()=>this.setState(
                            pre=>{
                                return{
                                    ...pre,
                                    showOrder:false,
                                }
                            }
                        )}
                    />

                    <DetailPopup
                        customer={this.state.selectedCustomer}
                        show={this.state.showCustomer}
                        handleClose={()=>this.setState(
                            pre=>{
                                return{
                                    ...pre,
                                    showCustomer:false,
                                }
                            }
                        )}
                    />
                    <Tabs defaultActiveKey="Accepted Requests" id="uncontrolled-tab-example">
                        
                        <Tab eventKey="Accepted Requests" title="Accepted Requests">
                                <SampleTabel
                                    columns={[
                                        {name:"Customer Name",key:"customerName"},
                                        {name:"Deliver Date",key:"delivery_date"},
                                        {name:"Total Amount",key:"total"},
                                        {name:"Pending Amount",key:"pending_balance"},
                                        {name:"",key:"item_btn"},

                                    ]}
                                    rows={[
                                        ...this.state.acceptedRequests.map(order=>{
                                            return{
                                                ...order,
                                                delivery_date:(new Date(order.delivery_date)).toDateString(),
                                                customerName:this.getCustomer(order.customer_id),
                                                item_btn:this.viewItems(order,true)
                                            }
                                        })
                                    ]}
                                />
                        </Tab>
                        <Tab eventKey="Pending Requests" title="Pending Requests">
                            <SampleTabel
                                    columns={[
                                        {name:"Customer Name",key:"customerName"},
                                        {name:"Deliver Date",key:"delivery_date"},
                                        {name:"Total Amount",key:"total"},
                                        {name:"Pending Amount",key:"pending_balance"},
                                        {name:"",key:"item_btn"},

                                    ]}
                                    rows={[
                                        ...this.state.pendingRequests.map(order=>{
                                            return{
                                                ...order,
                                                delivery_date:(new Date(order.delivery_date)).toDateString(),
                                                customerName:this.getCustomer(order.customer_id),
                                                item_btn:this.viewItems(order)
                                            }
                                        })
                                    ]}
                                />
                            
                        </Tab>
                        <Tab  eventKey="Rejected Requests" title="Rejected Requests">
                            <SampleTabel
                                    columns={[
                                        {name:"Customer Name",key:"customerName"},
                                        {name:"Deliver Date",key:"delivery_date"},
                                        {name:"Total Amount",key:"total"},
                                        {name:"Pending Amount",key:"pending_balance"},
                                        {name:"",key:"item_btn"},

                                    ]}
                                    rows={[
                                        ...this.state.rejectedRequests.map(order=>{
                                            return{
                                                ...order,
                                                delivery_date:(new Date(order.delivery_date)).toDateString(),
                                                customerName:this.getCustomer(order.customer_id),
                                                item_btn:this.viewItems(order,true)
                                            }
                                        })
                                    ]}
                                />
                        </Tab>
                        
                    </Tabs>
                    
                    {this.state.spinner!==5?
                        <div className="row" style={{textAlign:'center',backgroundColor:'white'}}>
                            {JSON.stringify(this.state.spinner)}
                            <Spinner
                                size={160}
                                style={{margin:'auto',marginTop:200}}
                            />
                        </div>
                        
                        
                        :""}
                    
                </div>
            </div>
           
        </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth || {},
  });
 
  
export default connect(mapStateToProps, null)(withRouter(SalesOrder));
