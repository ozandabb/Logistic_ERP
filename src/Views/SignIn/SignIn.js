/*  eslint-disable */
import React, { Component } from 'react';
import '../../assersts/signin/css/main.css'
import '../../assersts/signin/css/util.css';
import '../../hello.scss'
import img_1 from '../../assersts/signin/img/img-03.jpg'
import { connect } from 'react-redux';
import CommonController from '../../Controllers/Common.controller';
import { setCurrentUser } from "../../Redux/Action/authAction";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope ,  faLock} from '@fortawesome/free-solid-svg-icons'

  
class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            error : false , 

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
            this.clear();
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
        }else if(status === 406){
            this.clear();
        }else{
            this.clear();
        }
    }

    clear = ()=>{
        this.setState({
            username:'',
            password:'',
            error: true,
        })
    }
    
    render() {

        return (
                    <div class="back-gradient">  
                        <div class="hexagon1 slide-top"></div>
                        <div class="hexagon2 fe-pulse"></div>
                        <div class="hexagon3 shimmer"></div>
                        <div class="hexagon4"></div>
                        <div class="hexagon5"></div>

                        <div className="container-login100">
                        <div className="wrap-login100">
                       <form className="login100-form validate-form" onSubmit={e => {this.onLogin(e);}} style={{justifyContent:"center"}}>
                                <span className="login100-form-title font-weight-bold">
                                    Welcome!<br></br>
                                    <span className="text-muted small"><h6>Login Portal</h6></span>
                                </span>
                                <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                        <input className="input100" type="text" name="username" 
                                        value={this.state.username}
                                        placeholder="Username" 
                                        name="username"
                                        onChange={e => this.onChangeuEmail(e)}
                                        required />
                                        <span className="focus-input100"></span>
                                        <span className="symbol-input100">
                                            <FontAwesomeIcon  icon={faEnvelope} />
                                        </span>

                                </div>
                                <div className="wrap-input100 validate-input" data-validate="Password is required">
                                    <input className="input100" type="password" name="password" 
                                        placeholder="Password" 
                                        value={this.state.password} 
                                        placeholder="Enter Password" 
                                        name="password"
                                        onChange={e => this.onChangeuPass(e)}
                                        required/>
                                    <span className="focus-input100"></span>
                                    <span className="symbol-input100">
                                        <FontAwesomeIcon  icon={faLock} />
                                    </span>
                                </div>

                                {/* ------------------------------ error message-------------------------- */}
                                {  this.state.error &&
                                    <h4 className="small text-danger mt-2 font-weight-bold mb-0">Invalid Username or Password</h4>
                                }
                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn">
                                        Login
                                    </button>
                                </div>
                            </form>
                            </div>

                            </div>

                            {/* <div className="login100-pic js-tilt" data-tilt> */}
                                {/* <img src={img_1} alt="IMG" /> */}
                                    {/* <div class="content">
                                        <div class="content__container">
                                            <p class="content__container__text">
                                            Hello
                                            </p>
                                            
                                            <ul class="content__container__list">
                                            <li class="content__container__list__item">world !</li>
                                            <li class="content__container__list__item">bob !</li>
                                            <li class="content__container__list__item">users !</li>
                                            <li class="content__container__list__item">everybody !</li>
                                            </ul>
                                        </div>
                                    </div> */}
                            {/* </div> */}



                        </div>
        )
    }








}


export default connect(null, { setCurrentUser })(
    withRouter(SignIn)
);
