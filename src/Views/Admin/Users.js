import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AdminSidebar from "./Sidebar.Admin";
import { connect } from 'react-redux';

class Users extends Component {   
    render() {
        return (
            <div className="bg-light wd-wrapper">
                <AdminSidebar activemenu={'USERS'} />
                <div className="wrapper-wx" style={{height:"100hv"}}>
                    <div className="container-fluid">

    

                    </div>
                </div>
            </div>
        );
    }
   
}

const mapStateToProps = state => ({
    auth: state.auth || {},
});
 
  
export default connect(mapStateToProps, null)(withRouter(Users));