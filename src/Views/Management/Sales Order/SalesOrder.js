import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import ManageTeam_Sidebar from "../Sidebar.Mangement";
import {SampleTabel} from    '../../BackOffice/BackOffice Components/shared/table';
import ManagmentTeamOrderControllerObject from '../../../Controllers/Managment Team/ManagmentTeamOrder.controller';
import { DetailPopup } from './DetailPopup';
import { BaseBtn } from '../../BackOffice/BackOffice Components/shared/button';
import {faCheck,faTimes,faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spinner } from '../../../Components/smallspinner';
import { Tab, Tabs } from 'react-bootstrap';
import get from 'lodash.get';
import { ConfirmBox } from './confirmBox';


class SalesOrder extends Component{
    constructor(props) {
        super(props);
        this.state={
            detailPopup:true,
            requestStatus:0,
            selectedId:0,
            selectedCustomer:null,
            pendingRequest:[],
            acceptedRequest:[],
            rejetedRequest:[],
            spinner:true,
            smallspinner:false,
            showCustomer:false,
            tab:'Pending Request',
            confirmPopup:false,
            comment:'',
        }
    }

    componentDidMount(){
        ManagmentTeamOrderControllerObject.getAllPendingOLA(this.props.auth.token,(error,data)=>{
            console.log(error);
            console.log(data);
            if(!error){
                this.setState(pre=>{
                    return{
                        ...pre,
                        pendingRequest:data.data.rows,
                        spinner:false,
                    };
                });
            }
            
        });
        ManagmentTeamOrderControllerObject.getAllAccept(this.props.auth.token,(error,data) => {
            console.log(error);
            console.log(data);
            if(!error){
                this.setState(pre => {
                    return{
                        ...pre,
                        acceptedRequest:data.data.rows,
                    };
                });
            }
        });
        ManagmentTeamOrderControllerObject.getAllReject(this.props.auth.token,(error,data) => {
            console.log(error);
            console.log(data);
            this.setState(pre => {

                return{
                    ...pre,
                    rejetedRequest:data.data.rows,
                };
            });
        });
      
    }
    requestAccept=(index)=>{
        this.setState(pre=>{
            return{
                ...pre,
                smallspinner:true,
            }
        })
        ManagmentTeamOrderControllerObject.acceptOLA(
            this.state.comment,
            this.state.pendingRequest[index].id,
            this.props.auth.token,
            (err,data)=>{
                console.log(data);
                console.log(err);
                if(!err){
                    let temp=this.state.pendingRequest;
                    temp.splice(index,1);
                    console.log(temp);
                    this.setState(pre=>{
                        return{
                            ...pre,
                            smallspinner:false,
                            confirmPopup:false,
                            comment:'',
                            acceptedRequest:[
                                                ...(pre.acceptedRequest),
                                                {
                                                    ...(pre.pendingRequest[index]),
                                                    comment:pre.comment
                                                }
                                            ],
                            pendingRequest:temp,
                        };
                    });
                }

            });
    }
    requestReject=(index)=>{
        ManagmentTeamOrderControllerObject.rejectOLA(
            this.state.comment,
            this.state.pendingRequest[index].id,
            this.props.auth.token,
            (err,data)=>{
                console.log(data);
                console.log(err);
                if(!err){
                    let temp=this.state.pendingRequest;
                    temp.splice(index,1);
                    this.setState(pre=>{
                        return{
                            ...pre,
                            smallspinner:false,
                            confirmPopup:false,
                            comment:'',
                            rejetedRequest:[
                                                ...(pre.rejetedRequest),
                                                {
                                                    ...(pre.pendingRequest[index]),
                                                    comment:pre.comment
                                                }
                                            ],
                            pendingRequest:temp,
                            
                        };
                    });
                }

            }
        );
    }
    getBtns=(index)=>{
        return(
            <Fragment>
                
                <BaseBtn
                    style={{marginRight:20}}
                    size='sm'
                    btnVarient='success'
                    btnText={<FontAwesomeIcon icon={faCheck} />}
                    onClickFn={()=>{
                        this.setState(pre=>{
                            return{
                                ...pre,
                                confirmPopup:true,
                                requestStatus:1,
                                selectedId:index,
                            };
                        });
                    }}
                />
                <BaseBtn
                    size='sm'
                    btnVarient='danger'
                    btnText={<FontAwesomeIcon icon={faTimes} />}
                    onClickFn={()=>{
                        this.setState(pre=>{
                            return{
                                ...pre,
                                confirmPopup:true,
                                requestStatus:2,
                                selectedId:index,
                            };
                        });

                    }}
                />

                
                    
            </Fragment>
            
            
        );
    }
    
    getCustomer=(customer)=>{
        return(
            customer?
            <Fragment>
                <div style={{position:"absolute"}}>
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
                        })
                    }}
                />
                </div>    
            </Fragment>:""
        );
    }
    noData=()=>{
        return(
            <div style={{textAlign:'center',margin:30}}>
                No Data Found!!!
            </div>
        );

    }
    render() {
        return (
            <div className="bg-light wd-wrapper">
                
                <ManageTeam_Sidebar activemenu={'SalesOrder'} />

                <div className="wrapper-wx" style={{height:"100hv"}}>
                {/* {JSON.stringify(this.state.rejectedRequest)} */}


                    {!this.state.spinner?<div className="container-fluid">
                        <div className="col-sm-9" style={{marginBottom:60}}>
                            <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>
                                Sales Order<br></br>
                                <span className="text-muted small">
                                    Dashboard / Managment Team / Sales Order / {this.state.tab}
                                </span>
                            </h6>
                        </div>
                        <Tabs 
                            onSelect={(k) =>
                                 this.setState(pre=>{
                                    return{
                                        ...pre,
                                        tab:k
                                    };
                                }
                            )}
                        >
                            <Tab eventKey="Pending Request" title="Pending Request" >
                                {this.state.pendingRequest.length!==0?<SampleTabel
                                    columns={[
                                        {name:'Customer',key:'customerName'},
                                        {name:'Request Amount',key:'request_amount'},
                                        {name:'Order',key:'order_id'},
                                        {name:'',key:'actions'},
                                    ]}
                                    rows={this.state.pendingRequest.map((item,index)=>{
                                        return{
                                            ...item,
                                            customerName:this.getCustomer(item.customer),
                                            actions:this.getBtns(index),
                                        }
                                    })}
                                />:this.noData()}
                            </Tab>
                            <Tab eventKey="Accepted Request" title="Accepted Request">
                               {this.state.acceptedRequest.length!==0? <SampleTabel
                                    columns={[
                                        {name:'Customer',key:'customerName'},
                                        {name:'Request Amount',key:'request_amount'},
                                        // {name:'Order',key:'order_id'},
                                        {name:'Comment',key:'comment'},
                                    ]}
                                    rows={this.state.acceptedRequest.map((item,index)=>{
                                        return{
                                            ...item,
                                            customerName:this.getCustomer(get(item,'customer',null)),
                                        }
                                    })}
                                />:this.noData()}
                            </Tab>
                            <Tab eventKey="Rejected Request" title="Rejected Request">
                                {this.state.rejetedRequest.length!==0?<SampleTabel
                                    columns={[
                                        {name:'Customer',key:'customerName'},
                                        {name:'Request Amount',key:'request_amount'},
                                        // {name:'Order',key:'order_id'},
                                        {name:'Comment',key:'comment'},
                                    ]}
                                    rows={this.state.rejetedRequest.map((item,index)=>{
                                        return{
                                            ...item,
                                            customerName:this.getCustomer(get(item,'customer',null)),
                                        }
                                    })}
                                />:this.noData()}
                            </Tab>
                        </Tabs>
                        <DetailPopup
                            show={this.state.showCustomer}
                            customer={this.state.selectedCustomer}
                            handleClose={()=>{
                                this.setState(pre=>{
                                    return{
                                        ...pre,
                                        showCustomer:false
                                    }
                                })
                            }}
                        />
                        <ConfirmBox
                            handleClose={()=>{
                                this.setState(pre=>{
                                    return{
                                        ...pre,
                                        confirmPopup:false,
                                        comment:'',
                                    }
                                })
                            }}
                            onSubmitFn={()=>{
                                this.setState(pre=>{
                                    return {
                                        ...pre,
                                        smallspinner:true
                                    };
                                })
                                this.state.requestStatus==1?
                                this.requestAccept(this.state.selectedId):
                                this.requestReject(this.state.selectedId)

                            }}
                            show={this.state.confirmPopup}
                            commnent={this.state.comment}
                            spinner={this.state.smallspinner}
                            onChangeHandler={(value)=>{
                                this.setState(pre=>{
                                    return{
                                        ...pre,
                                        comment:value
                                    };
                                });
                            }}
                        />
                        
                    </div>:
                        <div className="row text-center" style={{backgroundColor:'white'}}>
                            <Spinner
                                size={150}
                                style={{margin:'auto',marginTop:300}}

                            />
                        </div>
                    
                    }
                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth || {},
  });
export default connect(mapStateToProps, null)(withRouter(SalesOrder));
