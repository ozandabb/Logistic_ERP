import React from "react";
import { withRouter } from "react-router-dom";
import {FormInput  } from '../../../../Components/Form'
import {  Button, Card , Form , Image , OverlayTrigger , Tooltip  } from 'react-bootstrap';
import { connect } from 'react-redux';
import CONFIG from '../../../../Controllers/Config.controller';
import Accountant_CONTROLLER from "../../../../Controllers/Accountant/BankAccount.Controller";



class AddBankAccountCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addBankAccountState: false,
            bank_name:'',
            account_type:'',
            account_number:'',
            holder_name:'',
            branch_name:'',
            added_by:''
        };
    }

    change_toggle = () => {
        if (this.state.addBankAccountState) {
            this.setState({ addBankAccountState: false })
        } else {
            this.setState({ addBankAccountState: true })
        }
    };

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    };

    onFormSubmit = async (e) => {
        e.preventDefault();
        console.log(this.props.auth.user.user_details.username);
        var data = {
            bank_name: this.state.bank_name,
            account_type: this.state.account_type,
            account_number: this.state.account_number,
            holder_name: this.state.holder_name,
            branch_name: this.state.branch_name,
            added_by: this.props.auth.user.user_details.id
        };
        console.log(data);
        const result = await Accountant_CONTROLLER.addBankAccount(data, this.props.auth.token);

        if(result.status == 201){
            CONFIG.setToast("Successfully Added");
            this.clear();
        }else{
            CONFIG.setErrorToast(" Somthing Went Wrong!");
            this.clear();
        }
    };

    clear = ()=>{
        this.setState({
            bank_name:'',
            account_type:'',
            account_number:'',
            holder_name:'',
            branch_name:'',
            added_by: ''
        });

        this.change_toggle();
    };

    render() {
        return (
            <div>
                {/* Title and the add new customer button */}
                <div className="row" style={{marginTop:"5px", fontFamily:"sans-serif", marginBottom:"15px"}}>
                    <div className="col-sm-9">
                        <div className="row">
                            <div className="col-sm">
                                <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Bank Account Details<br></br>
                                    <span className="text-muted small">Dashboard / Bank Accounts</span></h6>
                            </div>
                            {/*<div className="col-sm">*/}
                            {/*    {['bottom'].map((placement) => (*/}
                            {/*        <OverlayTrigger*/}
                            {/*            key={placement}*/}
                            {/*            placement={placement}*/}
                            {/*            overlay={*/}
                            {/*                <Tooltip id={`tooltip-${placement}`}>*/}
                            {/*                    Print All Bank Accounts*/}
                            {/*                </Tooltip>*/}
                            {/*            }*/}
                            {/*        >*/}
                            {/*            <Image src="/images/printer.png" className="d-none d-lg-block" style={{width:"40px", marginTop:"10px", marginLeft:"10px"}} rounded />*/}
                            {/*        </OverlayTrigger>*/}
                            {/*    ))}*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <Button variant="" style={{backgroundColor:"#475466" , color:"#FFFFFF", width:"100%",  cursor: 'pointer'}} onClick={() => this.change_toggle()}>Add New Bank Account</Button>
                    </div>
                </div>

                {/* Add customer form toggle */}
                <div className="row" style={{ display: this.state.addBankAccountState == true ? 'block' : 'none', marginBottom:"15px" }}>
                    <div className="col-12">
                        <Card className="col-12">
                            <Card.Body>

                                <div className="col-12 bg-white mt-1 pb-1" >
                                    <form onSubmit={(e) => this.onFormSubmit(e)}>
                                        <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Bank Account Details<br></br>
                                            <span className="text-muted small">You can add a new Bank Account by filling relavant Information</span></h6>
                                        <div className="row" >
                                            <div className="col-sm-8">

                                                <div className="row">
                                                    <div className="col-sm-6 mt-1 mb-1" >
                                                        <FormInput
                                                            label={'Bank Name *'}
                                                            placeholder={"Enter Bank Name"}
                                                            //error={ errors.group_mo}
                                                            value={this.state.bank_name}
                                                            name="bank_name"
                                                            onChange={this.formValueChange}
                                                            //error_meesage={'*Group Number required'}
                                                        />
                                                    </div>
                                                    <div className="col-sm-6 mt-1 mb-1" >
                                                        <FormInput
                                                            label={'Account Type *'}
                                                            placeholder={"Enter Account Type "}
                                                            //error={ errors.group_mo}
                                                            value={this.state.account_type}
                                                            name="account_type"
                                                            onChange={this.formValueChange}
                                                            //error_meesage={'*Group Number required'}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-12 mt-1 mb-1" >
                                                        <FormInput
                                                            label={'Account Number *'}
                                                            placeholder={"Enter Account Number"}
                                                            //error={ errors.group_mo}
                                                            value={this.state.account_number}
                                                            name="account_number"
                                                            onChange={this.formValueChange}
                                                            //error_meesage={'*Group Number required'}
                                                        />
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="col-sm-4">

                                                <div className="row">
                                                    <div className="col-12 mt-1 mb-1" >
                                                        <FormInput
                                                            label={"Holder Name *"}
                                                            placeholder={"Enter Holder Name"}
                                                            //error={ errors.group_mo}
                                                            value={this.state.holder_name}
                                                            name="holder_name"
                                                            onChange={this.formValueChange}
                                                            //error_meesage={'*Group Number required'}
                                                        />
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="col-sm-4">

                                                <div className="row">
                                                    <div className="col-12 mt-1 mb-1" >
                                                        <FormInput
                                                            label={"Branch Name *"}
                                                            placeholder={"Enter Branch Name"}
                                                            //error={ errors.group_mo}
                                                            value={this.state.branch_name}
                                                            name="branch_name"
                                                            onChange={this.formValueChange}
                                                            //error_meesage={'*Group Number required'}
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-6 mt-3 mb-1" >
                                                <button type="submit" style={{backgroundColor:"#475466" , color:"#FFFFFF",  cursor: 'pointer'}} className="btn mt-2 btn btn-sm px-5">Submit</button>
                                                <button type="button" style={{backgroundColor:"red",marginLeft:"10px", color:"#FFFFFF", cursor: 'pointer'}} onClick={() => this.clear()} className="btn mt-2 btn btn-sm px-5">Cancel</button>
                                            </div>
                                        </div>


                                    </form>
                                </div>

                            </Card.Body>
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

export default connect(mapStateToProps, null)(withRouter(AddBankAccountCom));
