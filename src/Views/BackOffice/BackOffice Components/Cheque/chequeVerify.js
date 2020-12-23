import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import BackOfficeSidebar from "../../Sidebar.Backoffice";
import { connect } from 'react-redux';
import ChequeController from '../../../../Controllers/BackOffice/Cheque.Controller';
import {Button, Card, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEllipsisV, faTrash} from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";
import moment from 'moment';
import {Link} from 'react-router-dom'
import CONFIG from '../../../../Controllers/Config.controller';

class ChequeVerify extends Component {  
    
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            AllCheque:[],
            isLoading:'',
        }
    }

    async componentDidMount() {
        this.loadAllCheques();
    }

    //GET all cheques
    loadAllCheques = async () => {
        this.setState({
            isLoading : true,
        })
        let data = await ChequeController.getAllCheques(this.props.auth.token);
        console.log("all cheque",data );
        this.setState({
            isLoading : false,
            AllCheque: data.data.rows,
        });
    }

    render() {
        const {AllCheque} = this.state;
        return (
            <div className="bg-light wd-wrapper">
                <BackOfficeSidebar activemenu={'CHEQUE_VERIFY'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">


                        {/* Title */}
                        <div className="row" style={{marginTop:"5px", fontFamily:"sans-serif", marginBottom:"15px"}}>
                            <div className="col-sm-9">
                                <div className="row">
                                    <div className="col-sm">
                                        <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Cheque Verifications<br></br>
                                        <span className="text-muted small">Dashboard / Cheque Verify</span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                          {/*All cheques in  table */}
                        <div className="row" style={{ marginBottom:"15px" }}>
                            <div className="col-sm">
                                <Card className="shadow">
                                    <Table striped bordered hover variant="light">
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Custmer</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Load ID</th>
                                                <th>Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {AllCheque && AllCheque.map((name) => this.renderAllUserBene(name))}
                                            <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto'}}>
                                                <span className="sr-only">Loading...</span>
                                            </Spinner>
                                        </tbody>
                                    </Table>
                                </Card>
                            </div>
                        </div>




                    </div>
                </div>
            </div>
        );
    }

   //reander all user benef
   renderAllUserBene = (item) => {
        const { search } = this.state;

        return(
            <tr key={item.id}>
                <td>{item.order_id}</td>
                <td>{item.customer.name}</td>
                <td>LKR {CONFIG.numberWithCommas(parseInt(item.amount))}                </td>
                <td>
                    <span className={`bg-${item.state == 0 ? 'primary' : 0 || item.state == 1 ? 'success' : 0  || item.state == 2 ? 'danger' : 0  } px-2 text-white rounded small`}>
                        {item.state == 0 ? 'Pending' : '' }
                        {item.state == 1 ? 'Approved' : '' }
                        {item.state == 2 ? 'Rejected' : '' }
                    </span>
                </td>
                <td>{item.load_id}</td>
                <td>{moment(new Date(item.createdAt)).format("YYYY MMM DD")}</td>
                <td>
                    <div className="row" >
                        <Link to={"/backOffice/ChequeVerify/" + item.id}>
                            <span className={`px-2 text-white rounded small`} style={{backgroundColor:"#475466"}}>View more</span>                        
                        </Link>
                    </div>                    
                </td>
            </tr>
        );
    }





   
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});
 
  
export default connect(mapStateToProps, null)(withRouter(ChequeVerify));