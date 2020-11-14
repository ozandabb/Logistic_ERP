/*  eslint-disable */
import React, { Component } from 'react';
import '../../assersts/signin/css/main.css'
import '../../assersts/signin/css/util.css'
import img_1 from '../../assersts/signin/img/img-03.jpg'
import { connect } from 'react-redux';
import CommonController from '../../Controllers/Common.controller';
import { setCurrentUser } from "../../Redux/Action/authAction";
import { withRouter } from "react-router-dom";

  
class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        };
    }

    // Email
    onChangeuEmail(e) {
        this.setState({
        username: e.target.value,
        });
    }

    // Password  
    onChangeuPass(e) {
        this.setState({
        password: e.target.value,
        });
    }

    // Login Function
    async onLogin(e) {
        e.preventDefault();

        var status = await CommonController.common_sign(this.state.username, this.state.password);
        
        if(status.status === 200){
            this.props.setCurrentUser(status.data.data );
            if(status.data.data.user_details.role === 18 ){
                this.props.history.push("/AdminTeam/dashboard");
            }else if(status.data.data.user_details.role === 16 ){
                this.props.history.push("/Accountant/dashboard");
            }else if(status.data.data.user_details.role === 15 ){
                this.props.history.push("/AssistantAccountant/dashboard");
            }else if(status.data.data.user_details.role === 14 ){
                this.props.history.push("/HeadOfDept/dashboard");
            } else if(status.data.data.user_details.role === 13 ){
                this.props.history.push("/PayrollOfficer/dashboard");
            }else if(status.data.data.user_details.role === 12 ){
                this.props.history.push("/hr/dashboard");
            }else if(status.data.data.user_details.role === 10 ){
                this.props.history.push("/PurchasingManager/dashboard");
            }else if(status.data.data.user_details.role === 9 ){
                this.props.history.push("/Cashier/dashboard");
            }else if(status.data.data.user_details.role === 8 ){
                this.props.history.push("/SalesPerson/dashboard");
            }else if(status.data.data.user_details.role === 7 ){
                this.props.history.push("/Warehouse/dashboard");
            }else if(status.data.data.user_details.role === 6 ){
                this.props.history.push("/AccountsExecutives/dashboard");
            }else if(status.data.data.user_details.role === 4 ){
                this.props.history.push("/backOffice/dashboard");
            }else if(status.data.data.user_details.role === 3 ){
                this.props.history.push("/ManagementTeam/dashboard");
            }else{
                this.props.history.push("/");
            }   
        }
    }
    
    render() {
        return (
            <div className="container-fluid" style={{backgroundColor:"#ffffff"}} >
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100"> 
                            <form className="login100-form validate-form" onSubmit={e => {this.onLogin(e);}}>
                                <span className="login100-form-title font-weight-bold">
                                    Welcome!<br></br>
                                    <span className="text-muted small"><h6>Login Portal</h6></span>
                                </span>
                                <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                        <input className="input100" type="text" name="username" 
                                        value={this.state.username}
                                        placeholder="Username" 
                                        onChange={e => this.onChangeuEmail(e)}
                                        required />
                                        <span className="focus-input100"></span>
                                        <span className="symbol-input100">
                                            <i className="fa fa-envelope" aria-hidden="true"></i>
                                        </span>
                                </div>
                                <div className="wrap-input100 validate-input" data-validate="Password is required">
                                    <input className="input100" type="password" name="password" 
                                        placeholder="Password" 
                                        value={this.state.password} 
                                        placeholder="Enter Password" 
                                        onChange={e => this.onChangeuPass(e)}
                                        required/>
                                    <span className="focus-input100"></span>
                                    <span className="symbol-input100">
                                        <i className="fa fa-lock" aria-hidden="true"></i>
                                    </span>
                                </div>
                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn">
                                        Login
                                    </button>
                                </div>
                            </form>

                            <div className="login100-pic js-tilt" data-tilt>
                                <img src={img_1} alt="IMG" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(null, { setCurrentUser })(
    withRouter(SignIn)
);

      