import React from "react";
import BACKOFFICE from '../../../../Controllers/BackOffice/backoffice';
import { Card , Image ,Button , InputGroup , FormControl , Modal } from 'react-bootstrap';
import {FormInput  } from '../../../../Components/Form'
import Vehicle_CONTROLLER from '../../../../Controllers/HR Staff/Vehicle.controller';


export class GatePass extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            curTime : new Date().toLocaleString(),

            singleJobCrad: [],
            vehicleID:'',
            CCID : '',
            vehicleNo:'',
        };
    }

    async componentDidMount() {
        this.loadsingleJobCard();
    }



    //GET single order
    loadsingleJobCard = async () => {
        const resFuel2 = await BACKOFFICE.getOneJobCrad( this.props.id ,this.props.proid);
        const resVehicleDetails = await Vehicle_CONTROLLER.getOneVehicleByID(resFuel2.data.data.vehical_id, this.props.proid);


        console.log("Order detaisl", resFuel2);
        
        this.setState({
            singleJobCrad: resFuel2.data.data,
            vehicleID : resFuel2.data.data.vehical_id,
            CCID : resFuel2.data.data.cash_collector,
            vehicleNo: resVehicleDetails.data.data.vehicle_number,
        });    
    }


    render() {
        const {singleJobCrad , vehicleID , CCID , vehicleNo } = this.state;

        return (
            <div className="container-fluid" >
                <Card style={{margin:"20px"}}>
                <div className="col-sm" style={{marginTop:"50px"}}>
                    <div className="row">
                        <div className="col">
                            <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Gate Pass<br></br>
                            <span className="text-muted small">Printed by : {this.props.HRname} </span></h6>
                        </div>
                        <div className="col" style={{justifyContent:"right"}}>
                            <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Printed Date<br></br>
                            <span className="text-muted small">{this.state.curTime}</span></h6>
                        
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row" style={{justifyContent:"center", alignContent:"center", backgroundColor:"#000000"}}>
                        <h1 style={{fontWeight:"bold", alignContent:"center", justifyContent:"center", color:"#ffffff"}}>Gate Pass</h1>
                    </div>

                    <div className="row" style={{marginBottom:"20px"}}>
                        <div className="col">
                            <div className="row" style={{marginTop:"20px"}}>
                                <div className="col-sm-6 mt-1 mb-1" >
                                    <FormInput 
                                        label={'Vehicle ID *'}
                                        value={vehicleID}
                                    />
                                </div>
                                <div className="col-sm-6 mt-1 mb-1" >
                                    <FormInput 
                                        label={'Driver ID *'}
                                    />
                                </div>
                                <div className="col-sm-6 mt-1 mb-1" >
                                    <FormInput 
                                        label={'Driver Name *'}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="row" style={{marginTop:"20px"}}>
                                <div className="col-sm-6 mt-1 mb-1" >
                                    <FormInput 
                                        label={'Vehicle Number *'}
                                        value={vehicleNo}
                                    />
                                </div>
                                <div className="col-sm-6 mt-1 mb-1" >
                                    <FormInput 
                                        label={'Cash Collector ID *'}
                                    />
                                </div>
                                <div className="col-sm-6 mt-1 mb-1" >
                                    <FormInput 
                                        label={'Cash Collector Name *'}
                                        value={CCID}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row" style={{marginBottom:"20px"}}>
                        <div className="col-sm">
                            <div className="row">
                                <div className="col-sm-12 mt-1 mb-1" >
                                    <FormInput 
                                        label={'Description  *'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row" style={{marginBottom:"100px"}}>
                        <div className="col-sm">
                            <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Special Notes <br></br></h6>
                        </div>
                    </div>

                    <div className="row" style={{marginTop:"100px", marginBottom:"100px"}}>
                        <div className="col-sm">
                            <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Approved by<br></br></h6>
                        </div>
                    </div>
                
                </div>
                </Card>
            </div>
        );
    }

    renderOneCustomer = (item, i) => {
        const { search } = this.state;
        return(
            <div>
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>
                    <td>{item.phoneNo}</td>
                    <td>{item.createdAt}</td>
                    <td>{item.updatedAt}</td>
                </tr>
            </div>
        
        );
    }











}


  