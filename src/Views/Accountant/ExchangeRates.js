import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AccountantSidebar from "./Sidebar.Accountant";
import { connect } from 'react-redux';
import ExchangeRates_CONTROLLER from "../../Controllers/Accountant/ExchangeRates.Controller";
import {Button, Card, Col, FormControl, InputGroup, Table} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import CONFIG from "../../Controllers/Config.controller";

class ExchangeRates extends Component {
    constructor(props) {
        super( props);
        this.state = {
            exchange_rates: [],
            date:'',
            search: '',

        }
    }

    async componentDidMount() {
        this.getAllExchangeRates();
    }

    getAllExchangeRates = async () => {
        const res = await ExchangeRates_CONTROLLER.getAllExchangeRates();
        this.setState({
            exchange_rates: res.data.rates
        });
        console.log(this.state.exchange_rates);
    };

    onChange = e =>{
        this.setState({search : e.target.value });
        console.log(this.state.search);
    };

    onChangeDate = e =>{
        this.setState({date : e.target.value });
        console.log(this.state.date);
    };


    getAllExchangeRatesForDate = async () => {

        const res = await ExchangeRates_CONTROLLER.getAllExchangeRatesForDate(this.state.date);

        if(res.success == true){
            this.setState({
                exchange_rates: res.data.rates
            });
            console.log(this.state.exchange_rates);
        }
        else{
            CONFIG.setErrorToast(" Please Select a Previous Date");
        }

    };



    render() {
        const {search,exchange_rates } = this.state;

        //Search
        const filteredCurrencies  = exchange_rates.filter(Currency => {
            return Currency.code.toLowerCase().indexOf(search.toLowerCase()) !== -1
        });

        return (
            <div className="bg-light wd-wrapper">
                <AccountantSidebar activemenu={'Exchange_Rates'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">
                        <div>
                            {/* Title and the add new bank account button */}
                            <div className="row" style={{marginTop:"5px", fontFamily:"sans-serif", marginBottom:"15px"}}>
                                <div className="col-sm-9">
                                    <div className="row">
                                        <div className="col-sm">
                                            <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Exchange Rates<br></br>
                                                <span className="text-muted small">Dashboard / Exchange Rates</span></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Row>
                                    {/*search bar*/}
                                    <Col md={2} style ={{}}>
                                        <InputGroup className="" >


                                            <FormControl
                                                style={{height:"38px"}}
                                                aria-label="search"
                                                placeholder="Search"
                                                onChange={ this.onChange}
                                                aria-describedby="basic-addon1"
                                            />
                                            <InputGroup.Append>
                                                <Button variant="outline-secondary"  onClick ={() => this.search()}>
                                                    <i className="fas fa-search"></i>
                                                </Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Col>


                                    {/*browse by data*/}
                                    <Col md={{ span: 3, offset: 7 }} style ={{}}>

                                        <InputGroup className="mb-3" >

                                            <FormControl
                                                type="date"
                                                style={{height:"38px"}}
                                                aria-label="date"
                                                placeholder="Select Date"
                                                value={this.state.date}
                                                onChange={ this.onChangeDate}
                                                aria-describedby="basic-addon1"
                                            />
                                            <InputGroup.Append>
                                                <Button variant="outline-secondary"  onClick ={() => this.getAllExchangeRatesForDate()}>Get</Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Col>

                                </Row>
                            </div>


                            {/*
                            Display All Bank Accounts
                        */}
                            <div>
                                <div className="row" style={{marginTop:"20px"}}>
                                    <div className="col-sm">
                                        <Card>
                                            <Table striped bordered hover variant="light">
                                                <thead>
                                                <tr>
                                                    <th>Currency</th>
                                                    <th>Exchange Rate</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    filteredCurrencies.map((value , ) =>  {
                                                        return(
                                                            <tr key={value.code}>
                                                                <td>{value.code}</td>
                                                                <td>{value.rate}</td>

                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </Table>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});

export default connect(mapStateToProps, null)(withRouter(ExchangeRates));


