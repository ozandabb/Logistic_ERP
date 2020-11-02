/*  eslint-disable */
import React, { Component } from 'react';
import '../../Asserts/signin/css/main.css'
import '../../Asserts/signin/css/util.css'
import img_1 from '../../Asserts/signin/img/img-03.jpg'
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../Redux/Action/authAction';
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

    // email start
    onChangeuEmail(e) {
        this.setState({
        username: e.target.value,
        });
    }

    // password  start
    onChangeuPass(e) {
        this.setState({
        password: e.target.value,
        });
    }

    async onLogin(e) {
        e.preventDefault();

        var status = await CommonController.common_sign(this.state.username, this.state.password);
        
        console.log("status", status);
        if(status.status == 200){
            this.props.setCurrentUser(status.data.data );
            if(status.data.data.user_details.role === 12 ){
                  this.props.history.push("/hr/dashboard");
            }else if(status.data.data.user_details.role == 5 ){
                this.props.history.push("/backOffice/dashboard");
            }  
        }


        // CommonController.common_sign(this.state.username, this.state.password).then(response=>{
            // if(response.code == 200){
            //     console.log("login eka" ,response );
            //     this.props.setCurrentUser(response.data.data.user_details);
            //     if(response.data.data.user_details.role === 12 ){
            //          this.props.history.push("/hr/dashboard");
            //     }else if(response.data.data.user_details.role == 5 ){
            //         this.props.history.push("/backOffice/dashboard");
            //     }  
            // }
        // }).catch(err =>{

        // })
    }

    // async onLogin(e) {
    //     e.preventDefault();
    //     const userDate = {
    //         username: this.state.username,
    //         password: this.state.password,
    //     };
        // const res = await this.props.loginUser(userDate);

        // if(res.code === 200){
        //     if(res.data.data.user_details.role === 12 ){
        //          this.props.history.push("/hr/dashboard");
        //     }else{
        //         this.props.history.push("/");
        //     }
   
           
        // }
    //}

    
    render() {
        const { username, password } = this.state
        return (
            <div className="container-fluid bg-light" >
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100 bg-light"> 
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
// SignIn.PropType = {
//     loginUser: PropType.func.isRequired,
//     auth: PropType.object.isRequired,
//   };
  
//   const mapStateToProps = state => ({
//     auth: state.auth,
//   });
  
//   export default connect(mapStateToProps, { loginUser })(SignIn);
      