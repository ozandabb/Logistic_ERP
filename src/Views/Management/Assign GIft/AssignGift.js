import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import ManageTeam_Sidebar from "../Sidebar.Mangement";
import AssignGiftControllerObject from '../../../Controllers/Managment Team/AssignGift.controller';
import { SampleTabel } from '../../BackOffice/BackOffice Components/shared/table';
import { GiftCard } from './GiftCard';
import { BaseBtn } from '../../BackOffice/BackOffice Components/shared/button';
import {faPencilAlt,faTimes,faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GiftSupplier } from './Supplier';
import { Spinner } from '../../../Components/smallspinner';
import { AssignCustomer } from './AssignToCustomer';
import get from 'lodash.get';
class AssignGift extends Component {

    constructor(props) {
        super(props);
        this.state={
            spinner:true,
            giftShow:false,
            assingShow:false,
            supplierShow:false,
            selectedGift:null,
            selectedSupplier:null,
            gifts:[],
            customers:[],
            
        }
    }


    componentDidMount(){
        AssignGiftControllerObject.getAllGift(this.props.auth.token,((error,data)=>{
            console.log(data);
            console.log(error);
            if(!error){
                this.setState(pre=>{
                    return{
                        ...pre,
                        spinner:false,
                        gifts:data.data.rows
                    };
                });
            }
        }));
        AssignGiftControllerObject.getAllCustomers(this.props.auth.token,((error,data)=>{
            console.log(data);
            console.log(error);
            if(!error){
                this.setState(pre=>{
                    return{
                        ...pre,
                        spinner:false,
                        customers:data.data.rows,
                    };
                });
            }
        }));
    }
    getSupplier=(supplier)=>{
        return(
            <Fragment>
                {supplier?
                <Fragment><div style={{position:"absolute"}}>
                {supplier.name} 
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
                                selectedSupplier:supplier,
                                supplierShow:true
                            };
                        });
                    }}
                />
                </div></Fragment>:''}    
            </Fragment>
        );
    }
    getGift=(gift)=>{
        return(
            <div style={{position:'relative'}}>
                <div style={{position:"absolute",paddingRight:20}}>
                {gift.name} 
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
                                selectedGift:gift,
                                giftShow:true
                            };
                        });
                    }}
                />
                </div>    
            </div>
        );
    }

    getAction=(index,q) => {
        return(
            <BaseBtn
                size='sm'
                disabled={q===0}
                btnVarient='info'
                btnText={'Assign'}
                onClickFn={()=>{
                    this.setState(pre=>{
                        return{
                            ...pre,
                            selectedGift:index,
                            assingShow:true
                        };
                    });
                }}
            />
        );
    }

    render() {
        return (
            <div className="bg-light wd-wrapper">
                <ManageTeam_Sidebar activemenu={'AssignGift'} />
                <GiftCard
                    gift={this.state.selectedGift}
                    show={this.state.giftShow}
                    handleClose={()=>{
                        this.setState(pre=>{
                            return{
                                ...pre,
                                giftShow:false,
                            };
                        });
                    }}
                
                />
                <GiftSupplier
                    show={this.state.supplierShow}
                    supplier={this.state.selectedSupplier}
                    handleClose={()=>{
                        this.setState(pre=>{
                            return{
                                ...pre,
                                supplierShow:false,
                            }
                        });
                    }}
                />
                <AssignCustomer
                    token={this.props.auth.token}
                    customers={this.state.customers}
                    show={this.state.assingShow}
                    quantity={get(this.state.gifts,`${this.state.selectedGift}.quantity`,0)}
                    gift={get(this.state.gifts,`${this.state.selectedGift}`,null)}
                    handleClose={(q)=>{
                        const temp=this.state.gifts;
                        temp[this.state.selectedGift].quantity=q; 
                        this.setState(pre=>{
                            return {
                                ...pre,
                                gifts:temp,
                                assingShow:false,
                            };
                        });
                    }}
                />
                {!this.state.spinner?<div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="col-sm-9" style={{marginBottom:60}}>
                        <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>
                            Assign Gift <br></br>
                            <span className="text-muted small">
                                Dashboard / Managment Team / Assign Gift 
                            </span>
                        </h6>
                    </div>
                    <SampleTabel
                        columns={[
                            {name:"Supplier",key:'supplier_name'},
                            {name:"Gift",key:'gift'},
                            {name:"Quantity",key:'quantity'},
                            {name:"",key:'action'},

                        ]}
                        rows={
                            this.state.gifts.map((gift,index) => {
                                return{
                                    ...gift,
                                    supplier_name:this.getSupplier(gift.supplier),
                                    'gift':this.getGift(gift),
                                    action:this.getAction(index,gift.quantity)
                                };
                            })
                        }
                    
                    />


                </div>:
                        <div className="row" style={{backgroundColor:'white'}}>
                            <Spinner
                                 size={150}
                                 style={{margin:'auto',marginTop:300}}
                            />
                        </div>
                    }
            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth || {},
  });
export default connect(mapStateToProps, null)(withRouter(AssignGift));
