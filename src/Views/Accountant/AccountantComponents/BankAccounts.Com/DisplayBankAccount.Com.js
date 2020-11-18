import React from "react";
import { withRouter } from "react-router-dom";
import {FormInput  } from '../../../../Components/Form'
import {Button, Card, Form, Image, OverlayTrigger, Table, Tooltip} from 'react-bootstrap';
import { connect } from 'react-redux';
import CONFIG from '../../../../Controllers/Config.controller';
import Accountant_CONTROLLER from "../../../../Controllers/Accountant/BankAccount.Controller";
import Pagination from 'react-bootstrap/Pagination'

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

let active = 2;
let items = [];

class DisplayBankAccountCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bank_accounts: [],
            no_of_pages : ''
        }

    }

    onChange = e =>{
        this.setState({search : e.target.value });
    };

    async componentDidMount() {
        this.loadAllBankAccounts();
        // this.paginations();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    //Function for search icon to toggle
    change_search_toggle = () => {
        if (this.state.searchState) {
            this.setState({ searchState: false })
        } else {
            this.setState({ searchState: true })
        }
    };

    //GET all bank accounts
    loadAllBankAccounts = async () => {
        const res = await Accountant_CONTROLLER.getAllBankAccounts(this.props.auth.token);
        this.setState({
            bank_accounts: res.data.rows,
            no_of_pages : res.data.pages
        });
        this.paginations();
        console.log("load"+this.state.no_of_pages);
    };

    paginations = async () => {
        var pages = this.state.no_of_pages;
        console.log("hello" + this.state.no_of_pages);
        for (let number = 1; number <= pages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active}>
                    {number}
                </Pagination.Item>,
            );
        }
    };



    render() {
        return (

            <div>
                <div className="row" style={{marginTop:"20px"}}>
                    <div className="col-sm">
                        <Card>
                            <Table striped bordered hover variant="light">
                                <thead>
                                <tr>
                                    <th>Bank Name</th>
                                    <th>Account Type</th>
                                    <th>Account Number</th>
                                    <th>Holder Name </th>
                                    <th>Branch Name</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.bank_accounts.map((value , ) =>  {
                                        return(
                                            <tr key={value.id}>
                                                <td>{value.bank_name}</td>
                                                <td>{value.account_type}</td>
                                                <td>{value.account_number}</td>
                                                <td>{value.holder_name}</td>
                                                <td>{value.branch_name}</td>
                                                <td></td>
                                            </tr>
                                        )
                                    })
                                }



                                </tbody>
                            </Table>
                            <div >
                                <Row>

                                    <Col md={{ span: 3, offset: 3 }}>
                                        {/*<ReactBootstrapStyle/>*/}
                                        <Pagination>{items}</Pagination>
                                        <br />
                                    </Col>
                                </Row>


                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    auth: state.auth || {},
});

export default connect(mapStateToProps, null)(withRouter(DisplayBankAccountCom));

