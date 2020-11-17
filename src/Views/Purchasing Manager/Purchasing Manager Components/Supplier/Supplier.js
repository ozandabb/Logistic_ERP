import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Purchase_Sidebar from "../../sidebar.purchase";
import PurchaseOrder from '../../../../Controllers/Purchasing Order/PurchaseOrder.controller'
import { FormSelect } from '../../../../Components/Form';
import { Spinner } from '../../../../Components/smallspinner';
import '../../../../assersts/sharedcss/spinner.css';
import { ItemCard } from './itemCard';
import { AddOrderPopUp } from './AddOrder/PopUp';
import { AddSupplierClaim } from './Add Claims/AddSupplierDiscounts';
import { Tab, Tabs } from 'react-bootstrap';
import { SupplierGift } from './Gifts/gift';



class Supplier extends React.Component  {
    constructor(props){
        super(props);
        // console.log(this.props.auth.token);
        this.state={
            supplierLoader:true,
            selectedItem:null,
            addOrderModal:false,
            addDiscountModal:false,
            items:[],
            itemLoader:false,
            supplier:"",
            customers:[ { label : 'Select the Customers', value : '' }],
            suppliers:[{ label : 'Select the Supplier', value : '' }],
        }
    }
    componentDidMount(){
        PurchaseOrder.getAllSupliers(this.props.auth.token,(error,data)=>{  
            if(!error){
                console.log(data.data.rows);
                this.setState(pre=>{
                    return {
                        ...pre,
                        supplierLoader:false,
                        suppliers:[{ label : 'Select the Supplier' ,value : '' } , 
                        ...data.data.rows.map( i => {
                            return{
                                label : i.name  ,
                                value : i.id 
                            }
                        })],
                    }
        
                });
            }
        });
        PurchaseOrder.getAllCustomners(this.props.auth.token,(error,data)=>{  
            console.log(error)
            if(!error){
                console.log(data.data.rows);
                this.setState(pre=>{
                    return {
                        ...pre,
                        supplierLoader:false,
                        customers:[{ label : 'Select the Customers' ,value : '' } , 
                        ...data.data.rows.map( i => {
                            return{
                                label : i.name  ,
                                value : i.id 
                            }
                        })],
                    }
                });
            }
        });
    }

    setItems=(id)=>{
        PurchaseOrder.getItemsBySuplier(this.props.auth.token,id,(error,items)=>{
            console.log(items);
            if(!error){
                this.setState(pre=>{
                    return{
                        ...pre,
                        items:items.data.rows,
                        itemLoader:false,
                    }
                })
            }
            console.log(error);
        });
    }
    onChangeHandler=(name,value)=>{
        this.setItems(value);
        this.setState(pre=>{
            return{
                ...pre,
                itemLoader:true
            };
        });

        this.setState(pre=>{
            return{
                ...pre,
                [name]:value
            };
        })
    }
    render(){
        return(
            <div className="bg-light wd-wrapper">
                <AddOrderPopUp
                    token={this.props.auth.token}
                    supplier={this.state.supplier}
                    item={this.state.selectedItem}
                    submitBtnTxt="Purchase"
                    cancelBtnTxt="Cancel"
                    show={this.state.addOrderModal}
                    handleClose={()=>{
                        this.setState(pre=>{
                            return{
                                ...pre,
                                addOrderModal:false
                            }

                        })
                    }}
                />
                <AddSupplierClaim
                    token={this.props.auth.token}
                    supplier={this.state.supplier}
                    customers={this.state.customers}
                    item={this.state.selectedItem}
                    submitBtnTxt="Submit"
                    cancelBtnTxt="Cancel"
                    show={this.state.addDiscountModal}
                    handleCloseFn={()=>{
                        this.setState(pre=>{
                            return{
                                ...pre,
                                addDiscountModal:false
                            }

                        })
                    }}
                />
                <Purchase_Sidebar activemenu={'CreatePurchasingOrder'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid" style={{paddingLeft:30}}>
                        <Tabs defaultActiveKey="gifts" id="uncontrolled-tab-example">
                            <Tab eventKey="items" title="Items">
                                <div className="col-sm-9">
                                    <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Suppliers<br></br>
                                    <span className="text-muted small">Dashboard / Suppliers / Items</span></h6>
                                </div>
                                <div class="card" style={{width:"100%",padding:20}}>        
                                    <div className="row">
                                        <div className="col-4">
                                            <FormSelect
                                                name={"supplier"}
                                                onChange={(e)=>{
                                                    this.onChangeHandler(e.target.name,e.target.value);
                                                }}
                                                disabled={this.state.supplierLoader}
                                                label={'Select A Supplier'}
                                                options={this.state.suppliers}
                                            />  
                                        </div>
                                        <div className="col-2">
                                            {
                                                this.state.supplierLoader?
                                            <div className="get-supplier">
                                                <Spinner/>
                                            </div>:""
                                            }

                                        </div>
                                    </div>

                                    <div className="row" style={{marginTop:30,textAlign:"center"}}>
                                        {
                                            this.state.itemLoader?
                                            <div style={{width:'100%'}}>
                                                <Spinner size={100} />
                                            </div>
                                            :
                                            this.state.items.map((item,index)=>{
                                                return (
                                                    <ItemCard
                                                        key={index}
                                                        item={item}
                                                        discountFn={()=>{
                                                            this.setState(pre=>{
                                                                return{
                                                                    ...pre,
                                                                    addDiscountModal:true,
                                                                    selectedItem:item
                                                                }
                                                            })
                                                        }}
                                                        buyFn={()=>{
                                                            this.setState(pre=>{
                                                                return{
                                                                    ...pre,
                                                                    addOrderModal:true,
                                                                    selectedItem:item
                                                                }
                                                            })
                                                        }}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="gifts" title="Gifts">
                                <SupplierGift
                                    token={this.props.auth.token}
                                    suppliers={this.state.suppliers}
                                />
                            </Tab>
                        </Tabs> 
                        
                        
                    </div>
                </div>
            </div>
        );
    }
    
}
const mapStateToProps = state => ({
    auth: state.auth || {},
  });
 
  
export default connect(mapStateToProps, null)(withRouter(Supplier));

