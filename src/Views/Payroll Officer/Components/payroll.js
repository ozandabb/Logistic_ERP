import React from "react";
import { withRouter } from "react-router-dom";
import {FormInput, FormSelect  } from '../../../Components/Form'
import {  Button, Card , FormControl , InputGroup , Table , Tooltip , Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrash } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import CONFIG from '../../../Controllers/Config.controller';
import runpayroll_controller from '../../../Controllers/Payroll/runPayroll.controller'
import PAYROLL_Sidebar from '../sidebar.payroll';
import Spinner from "react-bootstrap/Spinner";
import moment from 'moment';

 
class runPayroll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addSupplierState: false,
            printSupplierState: false,
            search: '',

            AllPayroll:[],
            PayrollByEmpID:[],

            emp_id:'',
            year:'',
            month:'',
            one: 1,
            errors : {},
            error_message : '',

            id:'',

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
  

     //GET all Earnings
    loadAllEarnings = async () => {
        this.setState({
            isLoading : true,
        })
        const res = await runpayroll_controller.getAllPayrolls(this.props.auth.token);
        this.setState({
            isLoading : false,
            AllPayroll: res.data,
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
        const resultID = await runpayroll_controller.getpayrollByID(data.id, this.props.auth.token);
        if(resultID.status == 200){
            this.setState({
                isLoading : false,
                PayrollByEmpID: resultID.data.data,
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
                date : this.state.year+"-"+this.state.month+"-"+"01",
            }
            const result = await runpayroll_controller.runPayroll(data, this.props.auth.token);

            if(result.status == 201){
                CONFIG.setToast("Successfully Added");
                this.clear();
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
            year:'',
            month:'',
        })

        this.change_toggle();
    }

    render() {
        const {errors , AllEarnList , AllPayroll , PayrollByEmpID , year, month } = this.state;
        return (
            <div className="bg-light wd-wrapper">
            <PAYROLL_Sidebar activemenu={'PAYROLL'} />
            <div className="wrapper-wx" style={{height:"100hv"}}>
                <div className="container-fluid">

                {/* Title and the add new customer button */}
                <div className="row" style={{marginTop:"5px", fontFamily:"sans-serif", marginBottom:"15px"}}>
                    <div className="col-sm-9">
                        <div className="row">
                            <div className="col-sm">
                                <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Run Payroll for Employees<br></br>
                                <span className="text-muted small">Dashboard / Run Payroll</span></h6>
                            </div> 
                            
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <Button variant="" style={{backgroundColor:"#475466" , color:"#FFFFFF", width:"100%",  cursor: 'pointer'}} onClick={() => this.change_toggle()}>Add New Payroll</Button>
                    </div>
                </div>

                    {/* Add customer form toggle */}
                    <div className="row" style={{display: this.state.addSupplierState == true ? 'block' : 'none',  marginBottom:"15px" }}>
                        <div className="col-12">
                            <Card className="col-12 shadow" style={{paddingBottom:"15px"}}>
                                <Card.Body>

                                        <div className="col-12 bg-white mt-1 pb-1" >
                                            <form onSubmit={(e) => this.onFormSubmit(e)}>
                                                    <h6 className="text-header py-3 mb-0 font-weight-bold line-hight-1">Enter Employee Payroll Details<br></br>
                                                    <span className="text-muted small">You can add Payroll for the Employee by filling relavant Information</span></h6>
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
                    <div className="row" >
                    <div className="col-12">
                    <Card className="shadow" >
                                 <nav>
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                        <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">All Payrolls</a>
                                        <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Payroll by Employee ID </a>
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
                                                                <th>Payroll ID</th>
                                                                <th>Emp ID</th>
                                                                <th>Amount</th>
                                                                <th>Unique Key</th>
                                                                <th>Paid Date</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {AllPayroll && AllPayroll.map((name) => this.renderAllEarndetails(name))}
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
                                                                required
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
                                                        {PayrollByEmpID && PayrollByEmpID.map((name) => this.renderAllpayrollbyempid(name))}
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
                <td>{item.amount} LKR</td>
                <td>{item.unique_key}</td>
                <td>{moment(new Date(item.payed_date)).format("YYYY MMM DD")}</td>
            </tr>
        );
    }

    //reander payroll byy emp id
    renderAllpayrollbyempid = (item) => {
        const { search } = this.state;
        // if( search !== "" && item.emp_id.indexOf(search) === -1 ){
        //     return null;
        // }

        return(
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.emp_id}</td>
                <td>{item.amount} LKR</td>
                <td>{item.unique_key}</td>
                <td>{moment(new Date(item.payed_date)).format("YYYY MMM DD")}</td>
            </tr>
        );
    }



    validate = () => {
        let { errors, emp_id , year, month} = this.state;
        let count = 0;

        if (emp_id.length === 0) {
            errors.emp_id =  'Employee ID can not be empty !'
            count++
        } else {
            errors.emp_id = ''
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
 
  
export default connect(mapStateToProps, null)(withRouter(runPayroll));