import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ManageTeam_Sidebar from "../Sidebar.Mangement";
import Employee_CONTROLLER from '../../../Controllers/HR Staff/Employee.controller';
import SalaryIncremt_CONTROLLER from '../../../Controllers/Managment Team/SalaryIncrement.controller';
import Dept_CONTROLLER from '../../../Controllers/Department/Department.controller';
import { connect } from 'react-redux';
import {Button , Image, Card, Table} from "react-bootstrap";
import CONFIG from '../../../Controllers/Config.controller';
import moment from 'moment';
import {Link} from 'react-router-dom';
import Spinner from "react-bootstrap/Spinner";
import {FormInput  } from '../../../Components/Form'

class SalaryIncrement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeList: [],
            allSalaryIncrement:[],
            deptID:'',
            departWise:[],
            dept:[],
            depyEmployees:[],
            deptSalary:[0],
            TestArray:[],
        };
    }

    async componentDidMount() {
        this.loadAllEmployee();
        this.loadAllSalaryIncrements();
      }

    //GET all supplliers
    loadAllEmployee = async () => {
        this.setState({
            isLoading : true,
        })
        const res = await Employee_CONTROLLER.getAllEmployee(this.props.auth.token);

        this.setState({
            isLoading : false,
            employeeList: res.data.rows,
        });
    }

    //GET all salary increment
    loadAllSalaryIncrements = async () => {
        this.setState({
            isLoading : true,
        })
        let data00 = await SalaryIncremt_CONTROLLER.getAllSalryIncrment(this.props.auth.token);

        this.setState({
            isLoading : false,
            allSalaryIncrement: data00.data.rows,
        });
    }

    //get dept wise 
    onFormSubmitDeptWise = async (e) => {
        e.preventDefault();

        this.setState({
            isLoading : true,
        })

        var data2 = {
            id: this.state.deptID,
        }

        const result = await SalaryIncremt_CONTROLLER.getDeptWise(data2, this.props.auth.token);
        const resultDept = await Dept_CONTROLLER.getOneDeptByID(this.state.deptID, this.props.auth.token);
        const res = await Employee_CONTROLLER.getAllEmployee(this.props.auth.token);

        console.log("emp", res);

        this.state.TestArray = res.data.rows

        this.setState({
            isLoading : false,
            departWise: result.data.data.rows,
            dept: resultDept.data.data,
            depyEmployees: this.state.TestArray.filter( (auto) => auto.department == resultDept.data.data.name),

        });

        console.log("fileter" , this.state.depyEmployees);
    
    }

    formValueChange = (e) => {
        this.setState({[e.target.name] : e.target.value  });
    }


    render() {
        const {employeeList , allSalaryIncrement , departWise , dept , depyEmployees , deptSalary} = this.state;
        const AllEmpl = employeeList.length;
        const ddd = depyEmployees.length;
        let total_count = 0 ;

        // depyEmployees.forEach((item) => {
        //     total_count = total_count + depyEmployees[item].basic_salary;
        //   });

        for(let i = 0 ; i < depyEmployees.length; i++ ){
            deptSalary[i] = depyEmployees[i].basic_salary;
        }

        for(let i = 0 ; i < depyEmployees.length; i++ ){
            total_count = total_count + parseInt(depyEmployees[i].basic_salary);
        }

        return (
            <div className="bg-light wd-wrapper">
                <ManageTeam_Sidebar activemenu={'SALARY'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">

                        {/* Title */}
                        <div className="row" style={{marginTop:"5px", fontFamily:"sans-serif", marginBottom:"15px"}}>
                            <div className="col-sm-9">
                                <div className="row">
                                    <div className="col-sm">
                                        <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>Salary Increments<br></br>
                                        <span className="text-muted small">Dashboard / Salary</span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* dashborad cards */}
                        <div className="row" style={{marginTop:"10px"}}>
                            <div className="col-sm shadow" style={{ backgroundColor:"#FFFFFF", marginLeft:"20px", marginRight:"20px", marginBottom:"30px", padding:"20px"}}>
                                <div className="row" >
                                    <div className="col-sm-3">
                                    <Image src="/images/money.png" style={{width:"50px",height:"50px" }} rounded />
                                    </div>
                                    <div className="col-sm-9">
                                        <h6 style={{fontFamily:"sans-serif", fontWeight:"bold",  color:"#9F9F9F"}}>Total Payroll</h6>
                                        <h3 style={{fontFamily:"sans-serif", fontWeight:"bold",  color:"#00D19D", marginTop:"0px"}}>230,890 LKR</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm shadow" style={{ backgroundColor:"#FFFFFF", marginLeft:"20px", marginRight:"20px", marginBottom:"30px", padding:"20px"}}>
                                <div className="row" >
                                    <div className="col-sm-3">
                                    <Image src="/images/Annual.png" style={{width:"50px",height:"50px" }} rounded />
                                    </div>
                                    <div className="col-sm-9">
                                        <h6 style={{fontFamily:"sans-serif", fontWeight:"bold",  color:"#9F9F9F"}}>Total Employees</h6>
                                        <h3 style={{fontFamily:"sans-serif", fontWeight:"bold",  color:"#F94700", marginTop:"0px"}}>0{AllEmpl}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm shadow" style={{ backgroundColor:"#FFFFFF",marginLeft:"20px", marginRight:"20px", marginBottom:"30px", padding:"20px"}}>
                                {/* <div className="row" >
                                    <div className="col-sm-3">
                                    <Image src="/images/smartphone.png" style={{width:"50px",height:"50px" }} rounded />
                                    </div>
                                    <div className="col-sm-9">
                                        <h6 style={{fontFamily:"sans-serif", fontWeight:"bold",  color:"#9F9F9F"}}>Employee Deductions</h6>
                                        <h3 style={{fontFamily:"sans-serif", fontWeight:"bold",  color:"#5301F5", marginTop:"0px"}}>230,890 LKR</h3>
                                    </div>
                                </div> */}
                            </div>
                            <div className="col-sm shadow" style={{ backgroundColor:"#FFFFFF", marginLeft:"20px", marginRight:"20px", marginBottom:"30px", padding:"20px"}}>
                                {/* <div className="row" >
                                    <div className="col-sm-3">
                                    <Image src="/images/admin.Categories.png" style={{width:"50px",height:"50px" }} rounded />
                                    </div>
                                    <div className="col-sm-9">
                                        <h6 style={{fontFamily:"sans-serif", fontWeight:"bold",  color:"#9F9F9F"}}>This Month Payroll</h6>
                                        <h3 style={{fontFamily:"sans-serif", fontWeight:"bold",  color:"#F4E102", marginTop:"0px"}}>230,890 LKR</h3>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        {/* tab panel start here */}
                        <Card className="shadow">
                                <nav>
                                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                        <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">All Salary Increments</a>
                                        <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Department Wise</a>
                                        {/* <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Assign Job Card</a> */}
                                    </div>
                                </nav>

                                <div class="tab-content" id="nav-tabContent">

                                    {/* All salary increment details table */}
                                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">

                                        <div className="row" style={{ marginBottom:"15px" }}>
                                            <div className="col-sm">
                                                    <Table striped bordered hover variant="light">
                                                        <thead>
                                                            <tr>
                                                                <th>ID</th>
                                                                <th>Dept ID</th>
                                                                <th>percentage</th>
                                                                <th>Description</th>
                                                                <th>State</th>
                                                                <th>Date</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {allSalaryIncrement && allSalaryIncrement.map((name) => this.renderAllUserBene(name))}
                                                            <Spinner animation="border" role="status" style={{display: this.state.isLoading == true ? 'block' : 'none',  margin:'auto'}}>
                                                                <span className="sr-only">Loading...</span>
                                                            </Spinner>
                                                        </tbody>
                                                    </Table>
                                            </div>
                                        </div>

                                    </div>

                                    {/* Department wise salary incrementss */}
                                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"> 
                                        <form onSubmit={(e) => this.onFormSubmitDeptWise(e)}>
                                            <div className="row" style={{paddingRight:"20px"}} >
                                                <div className="col-sm-6">
                                                    
                                                    <div className="row">
                                                        <div className="col-sm-6 mt-0 ml-3 mb-1" >
                                                            <FormInput 
                                                                placeholder={"Enter Department ID"}
                                                                required
                                                                type="number"
                                                                value={this.state.deptID}
                                                                name="deptID"
                                                                onChange={this.formValueChange}
                                                            />
                                                        </div>
                                                        <div className="col-sm mt-3 mb-1" >
                                                            <button type="submit" style={{backgroundColor:"#475466" , color:"#FFFFFF",  cursor: 'pointer'}} className="btn mt-2 btn btn-sm px-5">Search</button>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="col-sm-3 mt-2">
                                                    <Card>
                                                        <div className="row">
                                                            <div className="col-sm ml-3">
                                                            Department - {dept.name}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm ml-3">
                                                            Total Salary - LKR {CONFIG.numberWithCommas(parseInt(total_count))}

                                                            </div>
                                                        </div>
                                                    </Card>

                                                </div>
                                                <div className="col-sm-3 mt-2">
                                                    <Card>
                                                        <div className="row">
                                                            <div className="col-sm ml-3">
                                                            Department - {dept.name}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm ml-3">
                                                            No Of Employees - {departWise.length}
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </div>
                                            </div>
                                        </form>

                                        <div className="row" style={{marginTop:"10px"}}>
                                            <div className="col-sm-12">
                                            <div className="row" style={{ marginBottom:"15px" }}>
                                            <div className="col-sm">
                                                    <Table striped bordered hover variant="light">
                                                        <thead>
                                                            <tr>
                                                                <th>ID</th>
                                                                <th>Dept ID</th>
                                                                <th>percentage</th>
                                                                <th>Description</th>
                                                                <th>State</th>
                                                                <th>Date</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {departWise && departWise.map((name) => this.renderAllUserBene(name))}
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
                                </div>

                        </Card>

                      
                    </div>
                </div>
            </div>
        );
    }

     //reander all salary increments
   renderAllUserBene = (item) => {

    return(
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>
                {item.department_id == 1 ? 'IT' : '' }
                {/* {item.department_id} */}
            </td>
            <td>{item.percentage} %</td>
            <td>{item.description}</td>
            <td>
                <span className={`bg-${item.state == 1 ? 'primary' : 0 || item.state == 2 ? 'success' : 0  || item.state == 3 ? 'danger' : 0  } px-2 text-white rounded small`}>
                    {item.state == 1 ? 'Pending' : '' }
                    {item.state == 2 ? 'Approved' : '' }
                    {item.state == 3 ? 'Rejected' : '' }
                </span>
            </td>
            <td>{moment(new Date(item.createdAt)).format("YYYY MMM DD")}</td>
            <td>
                <div className="row" >
                    <Link to={"/ManagementTeam/SingleSalaryIncrement/" + item.id}>
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

export default connect(mapStateToProps, null)(withRouter(SalaryIncrement));

