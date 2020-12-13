import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import HODsidebar from "../Sidebar.HeadDept";
import { Table, Card, InputGroup , FormControl } from 'react-bootstrap';
import moment from 'moment';
import Spinner from "react-bootstrap/Spinner";
import Employee_CONTROLLER from '../../../Controllers/HR Staff/Employee.controller';

class AllEmployeesCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AllEmployeesList:[],
            search: '',
            isLoading: '',

        };
    }

    async componentDidMount() {
        this.loadAllEmployees();
    }

    //GET all Employees
    loadAllEmployees = async () => {
        this.setState({
            isLoading : true,
        })
        const res = await Employee_CONTROLLER.getAllEmployee(this.props.auth.token);
        console.log("ell emplotyee", res);
        this.setState({
            isLoading : false,
            AllEmployeesList: res.data.rows,
        });
    }

    //Search input text
    onChange = e =>{
        this.setState({search : e.target.value });
    }


    render() {
        const { AllEmployeesList } = this.state;
        return (
            <div className="bg-light wd-wrapper">
                <HODsidebar activemenu={'EMPLOYEES'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">
                        <div className="row" style={{marginTop:"5px", fontFamily:"sans-serif", marginBottom:"15px"}}>
                            <div className="col-sm-9">
                                <div className="row">
                                    <div className="col-sm-9">
                                        <h6 style={{paddingTop:"10px", paddingLeft:"5px"}}>All Employee Details<br></br>
                                        <span className="text-muted small">Dashboard / All Employees</span></h6>
                                    </div> 
                                    <div className="col-sm-3">
                                    <InputGroup className="" >
                                                    <FormControl
                                                    style={{height:"35px", marginTop:"10px"}}
                                                    aria-label="Username"
                                                    placeholder="Search by Name"
                                                    onChange={ this.onChange}
                                                    aria-describedby="basic-addon1"
                                                    />
                                                </InputGroup>
                                    </div>   
                                </div>
                            </div>
                        </div>

                        {/* employee table */}
                        <div className="row" >
                            <div className="col-sm">
                                        <Card>
                                    <Table striped bordered hover variant="light">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Emp NO</th>
                                                <th>Employee Name</th>
                                                <th>Department</th>
                                                <th>Designation</th>
                                                <th>Salary</th>
                                                <th>Joined Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {AllEmployeesList && AllEmployeesList.map((name) => this.renderAllEmployeedetails(name))}
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

    renderAllEmployeedetails = (item) => {
        const { search } = this.state;
        if( search !== "" && item.full_name.toLowerCase().indexOf(search.toLowerCase()) === -1 ){
        return null;
        }
        return(
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.emp_no}</td>
                    <td>{item.full_name}</td>
                    <td>{item.department}</td>
                    <td>{item.designation}</td>
                    <td>{item.basic_salary}</td>
                    <td>{moment(new Date(item.joined_date)).format("YYYY MMM DD")}</td>
                </tr>
        );
    }

   







}


const mapStateToProps = state => ({
    auth: state.auth || {},
});
 
  
export default connect(mapStateToProps, null)(withRouter(AllEmployeesCom));