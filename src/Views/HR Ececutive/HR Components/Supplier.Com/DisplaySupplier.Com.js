import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Tab , Row , Col, Nav , Card , InputGroup , FormControl, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import ScrollArea from 'react-scrollbar'
import moment from 'moment';
import SUPPLIER_CONTROLLER from '../../../../Controllers/HR Staff/Supplier.controller';

import DetailsEachSupplierCom from './DetailaEachSupplier.Com'

class DisplatSupplierCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchState: false, 


            supplierList: [],
            search: '',
            oneCusID: '',
            SupplierByID : [],
            UserByUsername: [],


        };
    }

    async componentDidMount() {
        const res = await SUPPLIER_CONTROLLER.getAllSuppliers(this.props.auth.token);
        this.setState({
            supplierList: res.data.rows,
        });
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

    //Get customer by t_code - function
    loadSupplierData = async (id) => {
        const resSup = await SUPPLIER_CONTROLLER.getSupplierByID( id , this.props.auth.token );

        if( resSup.status == 200 ){
            this.setState({
                SupplierByID: resSup.data.data,
            });
        }
    }


    //Clear all input details
    clear = ()=>{
        this.setState({
            username:'' ,
            email:'' ,
            nic:'' ,
            phone: '',
            //image : this.state.image,
            credit_limit: '',
            city: '',
            address: '',
            name: '',
            lat: '',
            long : '',
            //signature: this.state.signature,
            //dob: this.state.dob,
            postal_code : '',
        })

    }

    render() {
        const {supplierList , UserByUsername, SupplierByID , oneCusID} = this.state;
        return (
            <div>

                {/* Customer details display here with the tab view */}
                <Tab.Container id="left-tabs-example">
                    <Row>

                        <Col sm={9}>
                            <Card >
                                {/* Each customer tab section DetailsEachCus.Com.js  */}
                                <DetailsEachSupplierCom
                                    Cus_phone={SupplierByID.phoneNo}
                                    CusName={SupplierByID.name}
                                    cus_address={SupplierByID.address}
                                    cus_email={SupplierByID.email}
                                />
                            </Card>
                        </Col>

                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column bg-white">
                                <Card>
                                <Nav.Item>
                                    <Row>
                                        <Col xs={12} md={8}>
                                            <h6 style={{display: this.state.searchState == false ? 'block' : 'none' ,paddingBottom:"15px", paddingTop:"19px", paddingLeft:"15px", paddingRight:"15px", color:"#475466", fontFamily:"Roboto, sans-serif"}}>Suppliers</h6>
                                            <div className="col" style={{ display: this.state.searchState == true ? 'block' : 'none' , paddingTop:"15px"}}>
                                                <InputGroup className="mb-3" >
                                                    <FormControl
                                                    style={{height:"30px"}}
                                                    aria-label="Username"
                                                    placeholder="Search"
                                                    onChange={ this.onChange}
                                                    aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                            </div>
                                        </Col>
                                        {/* <Col xs={6} md={4}> */}
                                        <Col md="auto"  style={{paddingTop:"15px"}}>
                                            <FontAwesomeIcon onClick={() => this.change_search_toggle()}  icon={faSearch} style={{cursor: 'pointer', alignContent:"flex-end", alignItems:"flex-end"}} />
                                        </Col>
                                    </Row>
                                </Nav.Item>
                                
                                <Nav.Item  >
                                    <Nav.Link >
                                        <ScrollArea
                                        speed={1}
                                        className="area"
                                        style={{height:"500px"}}
                                        contentClassName="content"
                                        horizontal={false}
                                        >
                                        {supplierList && supplierList.map((name) => this.renderOneCustomer(name))}
                                        </ScrollArea>
                                    </Nav.Link>
                                </Nav.Item>
                                </Card>
                            </Nav>
                        </Col>

                    </Row>

                </Tab.Container>
                
            </div>
        );
    }

    renderOneCustomer = (item, i) => {
        const { search } = this.state;
        if( search !== "" && item.name.toLowerCase().indexOf(search.toLowerCase()) === -1 ){
        return null;
        }

        return(
            <div style={{paddingLeft:"20px"}} key={item.id} onClick={() => this.loadSupplierData(item.id)}>
                 <div className="row">
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginBottom:"0px"}}>{item.id}</p></div>
                        <div className="col"><p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466",  marginBottom:"0px"}}> {moment(new Date(item.createdAt)).format("YYYY MMM DD")}</p></div>
                </div>
                <p style={{fontSize:"18px", color:"#18A0FB",fontFamily:"sans-serif", marginBottom:"0px"}}>{item.name}</p>
                <p className="d-none d-lg-block" style={{fontSize:"11px", color:"#475466", marginTop:"0px",  marginBottom:"0px"}}> {item.address}</p>
                <hr></hr>
            </div>
        );
    } 
    



















}


const mapStateToProps = state => ({
    auth: state.auth || {},
  });
 
  
export default connect(mapStateToProps, null)(withRouter(DisplatSupplierCom));