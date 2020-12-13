import React from "react";
import { withRouter } from "react-router-dom";
import {FormInput, FormSelect  } from '../../../Components/Form'
import {  Button, Card , FormControl , InputGroup , Table , Tooltip , Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrash } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import CONFIG from '../../../Controllers/Config.controller';
import earning_controller from '../../../Controllers/Payroll/Earnings.controller'
import PAYROLL_Sidebar from '../sidebar.payroll';
import Spinner from "react-bootstrap/Spinner";
import moment from 'moment';

 
class earning extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addSupplierState: false,
            printSupplierState: false,
            search: '',

            AllEarnList:[],
            EarnByEmpID:[],
            id:'',
            emp_id:'',
            amount:'',
            reason:'',
            year:'',
            month:'',
            errors : {},
            error_message : '',

            isLoading: '',
        };
    }

    async componentDidMount() {
        this.loadAllEarnings();
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }

    change_toggle = () => {
        if (this.state.addSupplierState) {
            this.setState({ addSupplierState: false })
        } else {
            this.setState({ addSupplierState: true })
        }
    }

    //delete Earning details
    onClickFuelDelete = (id) => {
        CONFIG.setDeleteConfirmAlert(
            "",
            "Are you sure you want to delete this Earning ?",
            () => this.clickDeleteFuelVehicle(id),
            () => {}
        );
    }
    clickDeleteFuelVehicle = async (id) => {
        const resultDeleteFuel = await earning_controller.DeleteEarnigs( id , this.props.auth.token );

        if(resultDeleteFuel.status == 200){
            CONFIG.setToast("Successfully Deleted!");
            this.loadAllEarnings();
        }else{
            CONFIG.setErrorToast("Somthing Went Wrong!");
            this.loadAllEarnings();
        }
    };

     //GET all Earnings
    loadAllEarnings = async () => {
        this.setState({
            isLoading : true,
        })
        const res = await earning_controller.getAllEarning(this.props.auth.token);
        console.log("ell emplotyee", res);
        this.setState({
            isLoading : false,
            AllEarnList: res.data.rows,
        });
    }

    //payroll by emp id
    onFormSubmitPayrollByID = async (e) => {
        e.preventDefault();

        this.setState({
            isLoading : true,
        })

        var data = {
            id: this.state.id,
        }
        const earnbyid = await earning_controller.getEarnByID(data.id, this.props.auth.token);
        console.log("loooooooooooooo",earnbyid.data.data );
        if(earnbyid.status == 200){
            this.setState({
                isLoading : false,
                EarnByEmpID: earnbyid.data.data,
            });
        }else{
            CONFIG.setErrorToast("Somthing Went Wrong! ");
        }
    }

    //add earning 
    onFormSubmit = async (e) => {
        e.preventDefault();

        if (this.validate()) {
            var data = {
                emp_id: this.state.emp_id,
                amount: this.state.amount,
                reason: this.state.reason,
                year: this.state.year,
                month: this.state.month,

            }

            const result = await earning_controller.addEarnings(data, this.props.auth.token);

            if(result.status == 201){
                CONFIG.setToast("Successfully Added");
                this.clear();
                this.loadAllEarnings();
            }else{
                CONFIG.setErrorToast("Somthing Went Wrong! Please check Details");
                this.clear();
            }
        }
    }

     //Search input text
     onChange = e =>{
        this.setState({search : e.target.value });
    }

    //clear
    clear = ()=>{
        this.setState({
            emp_id:'',
            amount:'',
            reason:'',
            year:'',
            month:'',
        })

        this.change_toggle();
    }

    render() {
        const {errors , AllEarnList , EarnByEmpID , reason , year, month } = this.state;
        return (
            <div className="bg-light wd-wrapper">
            <PAYROLL_Sidebar activemenu={'EARNING'} />
            <div className="wrapper-wx" style={{height:"100hv"}}>
                <div className="container-fluid">

                {/* Title and the add new customer button */}
                <div className="row" style={{marginTop:"5px", fontFamily:"sans-serif", marginBottom:"15px"}}>
                    <div className="col-sm-9">
                        <div className="row">
                            <div className="col-sm">
                                <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Employee Earnings<br></br>
                                <span className="text-muted small">Dashboard / Earnings</span></h6>
                            </div> 

                            {/* <div className="col-sm">
                                <InputGroup className="" >
                                    <FormControl
                                    style={{height:"35px", marginTop:"5px"}}
                                    placeholder="Search by Employee ID"
                                    onChange={ this.onChange}
                                    aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                            </div>  */}
                            
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <Button variant="" style={{backgroundColor:"#475466" , color:"#FFFFFF", width:"100%",  cursor: 'pointer'}} onClick={() => this.change_toggle()}>Add new Earnings</Button>
                    </div>
                </div>

                    {/* Add customer form toggle */}
                    <div className="row" style={{display: this.state.addSupplierState == true ? 'block' : 'none',  marginBottom:"15px" }}>
                        <div className="col-12">
                            <Card className="col-12 shadow" style={{paddingBottom:"15px"}}>
                                <Card.Body>

                                        <div className="col-12 bg-white mt-1 pb-1" >
                                            <form onSubmit={(e) => this.onFormSubmit(e)}>
                                                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Employee Earnings<br></br>
                                                    <span className="text-muted small">You can add Earning from the Employee by filling relavant Information</span></h6>
                                                <div className="row" >
                                                    <div className="col-sm-8">
                                                        
                                                        <div className="row">
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'Employee ID *'}
                                                                        placeholder={"Enter Employee ID"}
                                                                        value={this.state.emp_id}
                                                                        name="emp_id"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                    {errors.emp_id && errors.emp_id.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.emp_id}</h4>}
                                                                </div>
                                                                <div className="col-sm-6 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'Year *'}
                                                                        placeholder={"Enter Yeaar"}
                                                                        value={this.state.year}
                                                                        name="year"
                                                                        type="Number"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                    {errors.year && errors.year.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.year}</h4>}
                                                                </div>
                                                        </div>

                                                        <div className="row">
                                                                <div className="col-12 mt-1 mb-1" >
                                                                    <FormInput 
                                                                        label={'Reason *'}
                                                                        placeholder={"Enter Reason"}
                                                                        value={this.state.reason}
                                                                        name="reason"
                                                                        onChange={this.formValueChange}
                                                                    />
                                                                    {errors.reason && errors.reason.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.reason}</h4>}
                                                                </div>
                                                        </div>
    
                                                    </div>

                                                    <div className="col-sm-4">

                                                        <div className="row">
                                                            <div className="col-12 mt-1 mb-1" >
                                                           
                                                                <FormInput 
                                                                    label={"Month *"}
                                                                    type="Number"
                                                                    placeholder={"Enter number of the month"}
                                                                    value={this.state.month}
                                                                    name="month"
                                                                    onChange={this.formValueChange}
                                                                />
                                                                {errors.month && errors.month.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.month}</h4>}
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-12 mt-1 mb-1" >
                                                                <FormInput 
                                                                    label={"Amount *"}
                                                                    type="Number"
                                                                    placeholder={"Enter Amount"}
                                                                    value={this.state.amount}
                                                                    name="amount"
                                                                    onChange={this.formValueChange}
                                                                />
                                                                {errors.amount && errors.amount.length > 0 &&
                                                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">{errors.amount}</h4>}
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
                    
                    {/* All earnings from  all Employees */}
                     {/* All earnings from  all Employees */}
                     <div className="row" >
                    <div className="col-12">
                    <Card className="shadow" >
                                 <nav>
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                        <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">All Earnings</a>
                                        <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Earnings by Earn ID </a>
                                        {/* <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Statistics</a> */}
                                    </div>
                                </nav>
                                <div className="tab-content" id="nav-tabContent">
                                    {/* basic information tab start here */}
                                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                        <div className="row ml-3 mt-1">
                                        <div className="col-sm" style={{paddingRight:"50px"}}>
                                            <div className="row">
                                                <div className="col-sm">
                                                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">All Recent Payroll Details<br></br></h6>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <Table striped bordered hover variant="light">
                                                    <thead>
                                                        <tr>
                                                            <th>Earn ID</th>
                                                            <th>Emp ID</th>
                                                            <th>Amount</th>
                                                            <th>Reason</th>
                                                            <th>Date</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {AllEarnList && AllEarnList.map((name) => this.renderAllEarndetails(name))}
                                                        <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto'}}>
                                                            <span className="sr-only">Loading...</span>
                                                        </Spinner>
                                                    </tbody>
                                                </Table>
                                            </div>
                                        

                                               


                                        </div>
                                        </div>
                                
                                    </div>
                                
                                {/* payroll by eemployee id */}
                                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"> 
                                        <div className="row ml-3 mt-1">
                                            <div className="col-sm" style={{paddingRight:"50px"}}>

                                            <form onSubmit={(e) => this.onFormSubmitPayrollByID(e)}>
                                                <div className="row">
                                                        <div className="col-sm-3 mt-0 mb-3" >
                                                            <FormInput 
                                                                placeholder={"Enter Employee ID"}
                                                                value={this.state.id}
                                                                name="id"
                                                                requireds
                                                                onChange={this.formValueChange}
                                                            />
                                                        </div> 
                                                </div>
                                                <button type="submit" style={{ color:"#FFFFFF",  cursor: 'pointer', marginBottom:"10px"}} className="btn btn-success btn-sm px-5">Search</button>
                                            </form>


                                                <div className="row">
                                                    <Table striped bordered hover variant="light">
                                                        <thead>
                                                            <tr>
                                                                <th>Payroll ID</th>
                                                                <th>Emp ID</th>
                                                                <th>Amount</th>
                                                                <th>Unique Key</th>
                                                                <th>Paid Date</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {EarnByEmpID && EarnByEmpID.map((name) => this.renderPayrollbyid(name))}
                                                            <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto'}}>
                                                                <span className="sr-only">Loading...</span>
                                                            </Spinner>
                                                        </tbody>
                                                    </Table>
                                            </div>
                                        

                                            </div>
                                        </div>
                                    </div>
                                 
                                </div>
                            </Card>

                            </div>
                            
                    </div>
                    {/* <div className="row" >
                            <div className="col-sm">
                                        <Card>
                                    <Table striped bordered hover variant="light">
                                        <thead>
                                            <tr>
                                                <th>Earn ID</th>
                                                <th>Emp ID</th>
                                                <th>Amount</th>
                                                <th>Reason</th>
                                                <th>Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {AllEarnList && AllEarnList.map((name) => this.renderAllEarndetails(name))}
                                            <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto'}}>
                                                <span className="sr-only">Loading...</span>
                                            </Spinner>
                                        </tbody>
                                    </Table>
                                </Card>
                            </div>
                        </div> */}



                    </div>
                    </div>
            </div>
        );
    }

    //reander all earnings
    renderAllEarndetails = (item) => {
        const { search } = this.state;
        // if( search !== "" && item.emp_id.indexOf(search) === -1 ){
        //     return null;
        // }

        return(
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.emp_id}</td>
                <td>{item.amount}</td>
                <td>{item.reason}</td>
                <td>{moment(new Date(item.date)).format("YYYY MMM DD")}</td>
                <td><FontAwesomeIcon icon={faTrash} onClick={() => this.onClickFuelDelete(item.id)} style={{color:"red" , cursor: 'pointer'}} /></td>
            </tr>
        );
    }

     //reander payroll byy emp id
     renderPayrollbyid = (item) => {
        const { search } = this.state;
        // if( search !== "" && item.emp_id.indexOf(search) === -1 ){
        //     return null;
        // }

        return(
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.emp_id}</td>
                <td>{item.amount}</td>
                <td>{item.unique_key}</td>
                <td>{moment(new Date(item.payed_date)).format("YYYY MMM DD")}</td>
            </tr>
        );
    }



    validate = () => {
        let { errors, emp_id , amount , reason , year, month} = this.state;
        let count = 0;

        if (emp_id.length === 0) {
            errors.emp_id =  'Employee ID can not be empty !'
            count++
        } else {
            errors.emp_id = ''
        }

        if (amount.length === 0) {
            errors.amount =  'Amount can not be empty !'
            count++
        } else {
            errors.amount = ''
        }

        if (reason.length === 0) {
            errors.reason =  'Reason can not be empty !'
            count++
        } else {
            errors.reason = ''
        }

        if (year.length === 0) {
            errors.year =  'Year can not be empty !'
            count++
        } else {
            errors.year = ''
        }

        if (month.length === 0) {
            errors.month =  'Enter number of the month !'
            count++
        } else {
            errors.month = ''
        }

        this.setState({ errors });
        return count == 0;
    }





}




const mapStateToProps = state => ({
    auth: state.auth || {},
});
 
  
export default connect(mapStateToProps, null)(withRouter(earning));